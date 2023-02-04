// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { importFromString } from "module-from-string";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { func } = req.query;
  console.log(func);

  let payload = req.body;
  if (typeof payload === "string") {
    payload = JSON.parse(payload);
  }

  const mod = await getMod(func as string);
  const data = await callMod(mod, payload);

  res.status(200).json({ name: data });
}

async function getMod(name: string) {
  const funcs = await db.findByName(name);
  const code = funcs[0].content;
  console.log(code);
  return await importFromString(code);
}

async function callMod(mod: any, payload: any) {
  return await mod.handler(payload);
}
