// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { importFromString } from "module-from-string";

type Data = {
  name: string;
};

type Body = {
  content: string;
  payload: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const body: Body = req.body;
  const mod = await getMod(body.content);
  const data = await callMod(mod, body.payload);
  res.status(200).json(data);
}

async function getMod(code: string) {
  return await importFromString(code);
}

async function callMod(mod: any, payload: any) {
  return await mod.handler(payload);
}
