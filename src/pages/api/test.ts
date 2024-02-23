// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    a: "hello",
    b: "안녕하세요",
  };

  fs.writeFile("datas/test.json", JSON.stringify(data), "utf-8", (err: any) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
    }
  });

  res.status(200).json({ data });
}
