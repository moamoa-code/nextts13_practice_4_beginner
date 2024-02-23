// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const array = [];
    const originalData = fs.readFileSync("datas/test.json", "utf8");

    // originalData의 길이가 1 이상이면 파싱을 하고,
    // 파싱한 originalData가 array면 array에 originalData를 넣어준다.
    if (originalData.length > 0) {
      const parsedData = JSON.parse(originalData);
      if (Array.isArray(parsedData)) {
        array.push(...parsedData);
      }
    }

    const dataToPush = {
      title: req.body.title,
      content: req.body.content,
    };
    array.push(dataToPush);

    console.log("::::::::::::: originalData", originalData);
    console.log("::::::::::::: array", array);

    fs.writeFile(
      "datas/test.json",
      JSON.stringify(array),
      "utf-8",
      (err: any) => {
        if (err) console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
        }
      }
    );
    res.status(200).json(array);
  } else if (req.method === "GET") {
    res.status(200).send(fs.readFileSync("datas/test.json", "utf8"));
  }
}
