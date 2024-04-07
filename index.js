import express from "express";
import fs from "fs";
import { format } from "date-fns";
import path from "path";

let PORT = 3000;
let app = express();

app.use(express.json());

app.get("/create", (req, res) => {
  try {
    let present = format(new Date(), "dd-MM-yyyy-HH-mm-ss");
    fs.writeFileSync(`timestamps/${present}.txt`, `${present}`, "utf8");
    let data = fs.readFileSync(`timestamps/${present}.txt`, "utf8");

    res.status(200).send(data);
  } catch (error) {
    console.log(error);

    res.status(500).send("error retrieving data");
  }
});

app.get("/files", (req, res) => {
  let filesDir = "timestamps";
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("error");
    } else {
      const textFiles = files.filter((file) => path.extname(file) === ".txt");
      res.status(200).json(textFiles);
    }
  });
});

app.listen(PORT, () => console.log(`app listening ${PORT}`));
