// src/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient() as any; // (editör cache'ine takılırsan geçici çözüm)

async function main() {
  // temizle (child -> parent)
  await prisma.comment.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.user.deleteMany({}); // User modeli ekleneceği için

  // demo kullanıcı
  await prisma.user.create({
    data: {
      email: "demo@example.com",
      name: "Demo User",
      // local login için (bcrypt hash'i örnek):
      passwordHash: "$2a$10$Qmo2WmfuUWrT0m0c5q2wWeyH9r7wq2wO8k7L8uJxG2QmJ0m8vXJ6K", // "password123"
      provider: "local"
    },
  });

  // ürünler
  const items = [
    {
      name: "Classic Burger",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&auto=format&fit=crop&q=80",
      price: 9.49,
      description: "Simple and delicious, with beef patty, lettuce, tomato.",
      category: "Burgers",
      rating: 4.6,
    },
    {
      name: "Bacon Burger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=80",
      price: 11.49,
      description: "Beef + crispy bacon + cheddar + BBQ.",
      category: "Burgers",
      rating: 4.7,
    },
    {
      name: "Mushroom Swiss Burger",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
      price: 12.99,
      description: "Mushrooms + Swiss cheese + creamy sauce.",
      category: "Burgers",
      rating: 4.8,
    },
    {
      name: "Chicken Wrap",
      image:
        "https://images.unsplash.com/photo-1604908177073-714db778fe9a?w=900&auto=format&fit=crop&q=80",
      price: 8.99,
      description: "Grilled chicken wrap with veggies.",
      category: "Wraps",
      rating: 4.4,
    },
    {
      name: "Veggie Delight",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
      price: 7.49,
      description: "Fresh veggie salad bowl.",
      category: "Salads",
      rating: 4.3,
    },
  ];

  await prisma.item.createMany({ data: items });

  await prisma.comment.createMany({
    data: [
      { name: "George Michael", text: "Great burgers, loved it!" },
      { name: "Joe Dev", text: "5 stars for the tasty burgers." },
    ],
  });

  console.log("Seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
