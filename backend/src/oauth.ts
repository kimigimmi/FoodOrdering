import type { Express, Request, Response } from "express";
import passport, { Profile as PassportProfile } from "passport";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

// GOOGLE
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
  VerifyCallback as GoogleVerifyCallback,
} from "passport-google-oauth20";

// MICROSOFT
import { Strategy as MicrosoftStrategy } from "passport-microsoft";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const JWT_SECRET = process.env.JWT_SECRET || "dev_change_me_please";
const COOKIE_NAME = "hungry_token";

export function registerOAuthRoutes(app: Express, prisma: PrismaClient) {
  // Prisma modeline erişim (schema farklıysa tip hatalarını engellemek için any)
  const userTable = (prisma as any).user;

  /* ------------------------ GOOGLE ------------------------ */
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    console.log("OAuth: Google enabled (routes mounted)");

    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          callbackURL:
            process.env.GOOGLE_CALLBACK_URL ||
            "http://localhost:8080/api/oauth/google/callback",
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: GoogleProfile,
          done: GoogleVerifyCallback
        ) => {
          try {
            const email =
              profile.emails?.[0]?.value || (profile._json as any)?.email || "";
            const googleId = profile.id;
            const name = profile.displayName ?? null;

            if (!email) return done(null, false);

            let u = await userTable.findUnique({ where: { email } });
            if (!u) {
              u = await userTable.create({
                data: { email, name, googleId, isVerified: true },
              });
            } else if (!u.googleId) {
              await userTable.update({ where: { id: u.id }, data: { googleId } });
            }

            return done(null, { id: u.id, email: u.email, name: u.name });
          } catch (e) {
            return done(e as any);
          }
        }
      )
    );

    app.get(
      "/api/oauth/google",
      passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
      }) as any
    );

    app.get(
      "/api/oauth/google/callback",
      passport.authenticate("google", {
        session: false,
        failureRedirect: `${FRONTEND_URL}/login?oauth=error`,
      }) as any,
      (req: Request, res: Response) => {
        const u = req.user as { id: number };
        const token = jwt.sign({ uid: u.id }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: "lax" });
        res.redirect(FRONTEND_URL);
      }
    );
  } else {
    console.log("OAuth: Google DISABLED (missing env vars)");
  }

  /* ---------------------- MICROSOFT ----------------------- */
  if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
    console.log("OAuth: Microsoft enabled (routes mounted)");

    passport.use(
      new MicrosoftStrategy(
        {
          clientID: process.env.MICROSOFT_CLIENT_ID!,
          clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
          callbackURL:
            process.env.MICROSOFT_CALLBACK_URL ||
            "http://localhost:8080/api/oauth/microsoft/callback",
          scope: ["User.Read"],
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: PassportProfile,
          done: (err: any, user?: any) => void
        ) => {
          try {
            const raw: any = (profile as any)._json || {};
            const email =
              profile.emails?.[0]?.value ||
              raw.mail ||
              raw.userPrincipalName ||
              "";
            const microsoftId = profile.id;
            const name = profile.displayName ?? null;

            if (!email) return done(null, false);

            let u = await userTable.findUnique({ where: { email } });
            if (!u) {
              u = await userTable.create({
                data: { email, name, microsoftId, isVerified: true },
              });
            } else if (!u.microsoftId) {
              await userTable.update({
                where: { id: u.id },
                data: { microsoftId },
              });
            }

            return done(null, { id: u.id, email: u.email, name: u.name });
          } catch (e) {
            return done(e as any);
          }
        }
      )
    );

    app.get(
      "/api/oauth/microsoft",
      passport.authenticate("microsoft", { session: false }) as any
    );

    app.get(
      "/api/oauth/microsoft/callback",
      passport.authenticate("microsoft", {
        session: false,
        failureRedirect: `${FRONTEND_URL}/login?oauth=error`,
      }) as any,
      (req: Request, res: Response) => {
        const u = req.user as { id: number };
        const token = jwt.sign({ uid: u.id }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: "lax" });
        res.redirect(FRONTEND_URL);
      }
    );
  } else {
    console.log("OAuth: Microsoft DISABLED (missing env vars)");
  }
}
