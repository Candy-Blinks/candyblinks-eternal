import { Hono } from "hono";
import { prisma } from "../../database.js";

const app = new Hono();

app.post("/", async (ctx) => {
  const body = await ctx.req.json();
  try {
    const candyStore = await prisma.candyStore.upsert({
      where: { address: body?.candyStore },
      update: {
        description: body?.description,
        website: body?.website,
        x: body?.x,
        telegram: body?.tg,
        instagram: body?.ig,
        youtube: body?.yt,
        discord: body?.discord,
        banner: body?.banner,
        deleted: true,
      },
      create: {
        address: body?.candyStore,
        description: body?.description,
        website: body?.website,
        x: body?.x,
        telegram: body?.tg,
        instagram: body?.ig,
        youtube: body?.yt,
        discord: body?.discord,
        banner: body?.banner,
        deleted: true,
      },
    });

    console.log(candyStore);

    return ctx.json(
      {
        data: [candyStore],
      },
      201
    );
  } catch (_) {
    return ctx.json({}, 500);
  }
});

app.patch("/:id/publish", async (ctx) => {
  const candyStoreId = ctx.req.param("id");

  const body = await ctx.req.json();
  try {
    const candyStore = await prisma.candyStore.update({
      where: { address: candyStoreId },
      data: {
        published: body?.published,
      },
    });

    console.log(candyStore);

    return ctx.json(
      {
        data: [candyStore],
      },
      201
    );
  } catch (_) {
    return ctx.json({}, 500);
  }
});

app.get("/:id", async (ctx) => {
  const candyStoreId = ctx.req.param("id");
  try {
    const candyStore = await prisma.candyStore.findFirstOrThrow({
      where: { address: candyStoreId },
      include: {
        phases: {
          include: {
            startDate: true,
            endDate: true,
            mintLimit: true,
            allocation: true,
            allowList: true,
            solPayment: true,
          },
        },
      },
    });
    return ctx.json(
      {
        data: [candyStore],
      },
      201
    );
  } catch (_) {
    return ctx.json({}, 500);
  }
});

app.get("/users/:id", async (ctx) => {
  try {
    const candyStore = await prisma.candyStore.findMany({
      where: {
        deleted: false,
      },
      include: {
        phases: {
          // include: {
          //   startDate: true,
          //   endDate: true,
          //   mintLimit: true,
          //   allocation: true,
          //   allowList: true,
          //   solPayment: true,
          // },
        },
      },
    });
    // console.log(candyStore);

    return ctx.json(
      {
        data: candyStore,
      },
      201
    );
  } catch (_) {
    console.log(_);

    return ctx.json({}, 500);
  }
});

app.get("/", async (ctx) => {
  try {
    const candyStore = await prisma.candyStore.findMany({
      where: {
        deleted: false,
        published: true,
      },
      include: {
        // phases: {
        //   // include: {
        //   //   startDate: true,
        //   //   endDate: true,
        //   //   mintLimit: true,
        //   //   allocation: true,
        //   //   allowList: true,
        //   //   solPayment: true,
        //   // },
        // },
      },
    });
    // console.log(candyStore);

    return ctx.json(
      {
        data: candyStore,
      },
      201
    );
  } catch (_) {
    console.log(_);

    return ctx.json({}, 500);
  }
});

export default app;
