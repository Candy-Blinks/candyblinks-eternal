import { Hono } from "hono";
import { prisma } from "../../database.js";

const app = new Hono();

app.get("/users/:id", async (ctx) => {
  const userAddress = ctx.req.param("id");
  try {
    const userTransactions = await prisma.userTransaction.findMany({
      where: { userAddress: userAddress },
    });

    console.log(userTransactions);

    return ctx.json(
      {
        data: userTransactions,
      },
      201
    );
  } catch (_) {
    return ctx.json({}, 500);
  }
});

export default app;
