import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import { PrismaClient } from "@prisma/client";

import { registerAuthRoutes } from "./auth";
import { registerOAuthRoutes } from "./oauth";
import { registerItemRoutes } from "./items"; // 🔸 menü uçları

const app = express();
const prisma = new PrismaClient();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const PORT = Number(process.env.PORT || 8080);

// --- middleware ---
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// --- feature routes ---
registerAuthRoutes(app, prisma);   // email+password
registerOAuthRoutes(app, prisma);  // google/microsoft oauth
registerItemRoutes(app, prisma);   // 🔸 items (menu)

// (isteğe bağlı) yorumlar end-point'leri
app.get("/api/comments", async (_req: Request, res: Response) => {
  const data = await prisma.comment.findMany({
    take: 100,
    orderBy: { id: "desc" },
  });
  res.json(data);
});

app.post("/api/comments", async (req: Request, res: Response) => {
  const { name, text } = req.body || {};
  if (!name || !text) return res.status(400).json({ error: "name/text required" });
  const row = await prisma.comment.create({ data: { name, text } });
  res.json(row);
});

app.get("/", (_req, res) => res.send("API OK"));

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
