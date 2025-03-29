import { Hono } from "hono";
import { prisma } from "../../database.js";

const app = new Hono();

app.get("/", async (ctx) => {
  try {
    const users = await prisma.user.findMany({});

    return ctx.json(
      {
        data: users,
      },
      201
    );
  } catch (_) {
    console.log(_);

    return ctx.json({}, 500);
  }
});

export default app;
