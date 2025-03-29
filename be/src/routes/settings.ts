import { Hono } from "hono";
import { prisma } from "../../database.js";

const app = new Hono();

app.get("/", async (ctx) => {
  try {
    const setting = await prisma.setting.findMany({
      take: 1,
    });
    // console.log(setting);

    return ctx.json({ data: setting }, 201);
  } catch (_) {
    console.log(_);

    return ctx.json({}, 500);
  }
});

export default app;
