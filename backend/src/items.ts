import type { Express, Request, Response } from "express";
import type { PrismaClient } from "@prisma/client";

export function registerItemRoutes(app: Express, prisma: PrismaClient) {
  /* -------- LIST -------- */
  app.get("/api/items", async (req: Request, res: Response) => {
    try {
      const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
      const limitRaw = parseInt(String(req.query.limit ?? "12"), 10) || 12;
      const limit = Math.min(Math.max(limitRaw, 1), 50);
      const skip = (page - 1) * limit;

      const sort = String(req.query.sort ?? "newest"); // newest | price_asc | price_desc
      const category = req.query.category ? String(req.query.category) : undefined;
      const q = req.query.q ? String(req.query.q) : undefined;

      // SQLite -> 'mode: "insensitive"' tipi yok; sade contains kullanalım.
      const where: any = {};
      if (q) {
        where.OR = [
          { name: { contains: q } },
          { description: { contains: q } },
        ];
      }
      if (category && category.toLowerCase() !== "all") {
        where.category = { equals: category };
      }

      let orderBy: any = { createdAt: "desc" };
      if (sort === "price_asc") orderBy = { price: "asc" };
      else if (sort === "price_desc") orderBy = { price: "desc" };

      const [total, items] = await Promise.all([
        (prisma as any).item.count({ where }),
        (prisma as any).item.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            image: true,
            category: true,
            rating: true,
            createdAt: true,
          } as any,
        }),
      ]);

      res.json({
        items,
        data: items, // bazı frontendler data bekliyor
        total,
        page,
        limit,
        pages: Math.max(1, Math.ceil(total / limit)),
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  });

  /* -------- GET BY ID -------- */
  app.get("/api/items/:id", async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

      const row = await (prisma as any).item.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          image: true,
          category: true,
          rating: true,
          createdAt: true,
        } as any,
      });

      if (!row) return res.status(404).json({ error: "Not found" });
      res.json(row);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  });

  /* -------- DISTINCT CATEGORIES -------- */
  app.get("/api/items/categories", async (_req: Request, res: Response) => {
    try {
      const rows = await (prisma as any).item.findMany({
        where: { category: { not: null } },
        select: { category: true } as any,
        distinct: ["category"] as any,
        orderBy: { category: "asc" } as any,
      });
      res.json(rows.map((r: any) => r.category).filter(Boolean));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  });
}
