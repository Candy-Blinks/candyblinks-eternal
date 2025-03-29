import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { PORT } from "./environment";
import { prisma } from "./database";
import {
  fetchTransactions,
  initializeListeners,
  resetOnchain,
  syncEvents,
} from "./indexer";
import candyStore from "./src/routes/candy-stores";
import settings from "./src/routes/settings";
import transactions from "./src/routes/transactions";
import users from "./src/routes/users";
import assets from "./src/routes/assets";
import candyStoreComments from "./src/routes/candy-store-comments";

const app = new Hono();

app.use("/*", cors());
app.route("/candy-stores", candyStore);
app.route("/settings", settings);
app.route("/transactions", transactions);
app.route("/users", users);
app.route("/assets", assets);
app.route("/candy-store-comments", candyStoreComments);

console.log(`Server is running on http://localhost:${PORT}`);

async function main() {
  await resetOnchain();
  await fetchTransactions();

  const events = await prisma.event.findMany({
    where: {
      parsed: false,
    },
    orderBy: {
      slot: "asc",
    },
  });

  await syncEvents(events);
  await initializeListeners();

  serve({
    fetch: app.fetch,
    port: PORT,
  });

  setInterval(async () => {
    const events = await prisma.$transaction(async (tx) => {
      return await tx.event.findMany({
        orderBy: {
          slot: "asc",
        },
        where: {
          synced: false,
        },
      });
    });

    console.log(events);

    await syncEvents(events);
  }, 5000);
}

main()
  .then((e) => {
    console.log("Server started");
  })
  .catch((e) => {
    console.log(e);

    console.log("Server stopped");
  });
