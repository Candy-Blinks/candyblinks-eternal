import { Hono } from "hono";
import { prisma } from "../../database.js";

const app = new Hono();

app.post("/", async (ctx) => {
  const body = await ctx.req.json();
  try {
    if (body?.data?.trim() == "") {
      throw Error("Data inavlid");
    }
    const comment = await prisma.candyStoreComment.create({
      data: {
        candyStoreAddress: body?.candyStore,
        user: body?.user,
        data: body?.data,
      },
    });

    console.log(comment);

    return ctx.json(
      {
        data: [comment],
      },
      201
    );
  } catch (_) {
    return ctx.json({}, 500);
  }
});

app.get("/candy-store/:id", async (ctx) => {
  const candyStoreAddress = ctx.req.param("id");

  try {
    const candyStoreComments = await prisma.candyStoreComment.findMany({
      where: {
        candyStoreAddress: candyStoreAddress,
      },
    });

    return ctx.json(
      {
        data: candyStoreComments,
      },
      201
    );
  } catch (_) {
    console.log(_);

    return ctx.json({}, 500);
  }
});

export default app;
