// backend/src/auth.ts
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_change_me_please";
const COOKIE_NAME = "hungry_token";

type JWTPayload = { uid: number };

export function registerAuthRoutes(app: Express, prisma: any) {
  /* ---------------- REGISTER ---------------- */
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { name, email, password } = (req.body || {}) as {
        name?: string;
        email?: string;
        password?: string;
      };

      if (!email || !password) {
        return res.status(400).json({ error: "email & password required" });
      }

      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) {
        return res.status(409).json({ error: "Email already registered" });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const created = await prisma.user.create({
        data: {
          email,
          name: name ?? null,
          passwordHash,
          isVerified: true,
        },
      });

      const token = jwt.sign({ uid: created.id } as JWTPayload, JWT_SECRET, {
        expiresIn: "7d",
      });

      res
        .cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: "lax" })
        .json({ id: created.id, email: created.email, name: created.name });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  });

  /* ---------------- LOGIN ---------------- */
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = (req.body || {}) as {
        email?: string;
        password?: string;
      };

      if (!email || !password) {
        return res.status(400).json({ error: "email & password required" });
      }

      const u = await prisma.user.findUnique({ where: { email } });
      if (!u || !u.passwordHash) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const ok = await bcrypt.compare(password, u.passwordHash);
      if (!ok) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ uid: u.id } as JWTPayload, JWT_SECRET, {
        expiresIn: "7d",
      });

      res
        .cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: "lax" })
        .json({ id: u.id, email: u.email, name: u.name });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  });

  /* ---------------- LOGOUT ---------------- */
  app.post("/api/auth/logout", (_req: Request, res: Response) => {
    res
      .clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: "lax" })
      .json({ ok: true });
  });

  /* ---------------- ME ---------------- */
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      const token = req.cookies?.[COOKIE_NAME];
      if (!token) return res.json(null);

      let payload: JWTPayload;
      try {
        payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
      } catch {
        return res.json(null);
      }

      const u = await prisma.user.findUnique({ where: { id: payload.uid } });
      if (!u) return res.json(null);

      res.json({ id: u.id, email: u.email, name: u.name });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  });
}
