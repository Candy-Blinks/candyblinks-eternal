import { Hono } from "hono";
import { prisma } from "../../database.js";

const app = new Hono();

app.get("/collection/:id", async (ctx) => {
  const colledtionAddress = ctx.req.param("id");

  try {
    const assets = await prisma.asset.findMany({
      where: {
        collection: colledtionAddress,
      },
    });

    return ctx.json(
      {
        data: assets,
      },
      201
    );
  } catch (_) {
    console.log(_);

    return ctx.json({}, 500);
  }
});

export default app;
