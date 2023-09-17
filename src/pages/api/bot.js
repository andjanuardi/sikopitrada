// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Telegraf } from "telegraf";

export default function handler(req, res) {
  const bot = new Telegraf(process.env.BOT_TOKEN);
  bot.command("info", async (ctx) => {
    await ctx.reply("Paik");
  });
  res.status(200).json({ name: "Telegram" });
}
