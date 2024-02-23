// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(":::::::::::::", fs.readFileSync("datas/test.json", "utf8"));

  res.status(200).send(fs.readFileSync("datas/test.json", "utf8"));
}
