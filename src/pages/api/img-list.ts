import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const directoryPath = path.join(process.cwd(), "public/imgs");
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    res.status(200).json(files);
  });
}
