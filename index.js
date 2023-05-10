const fs = require("fs");
const express = require("express");
const { getPdfUrl, parseData, loadPdf } = require("./parser.js");
const app = express();
const port = process.env.PORT;
const months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno","luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

/* REGEX */
const getLunch = /(?<=P\s+R\s+A\s+N\s+\s+Z\s+O)(.*)(?=C\s+E\s+N\s+A)/gms;
const getDinner = /(?<=C\s+E\s+N\s+A)(.*)(?=Nei menù)/gms;

app.get("/lunch", async (req, res) => {
    const url = await getPdfUrl();
    let month = url.match(/\+\w+\+/g)[0].replace(/\+/g, "");
    month = months.indexOf(month.toLocaleLowerCase());
    const buffer = await loadPdf(url);
    let obj = await parseData(buffer, getLunch, month);

    res.json({obj});
})

app.get("/dinner", async (req, res) => {
    const url = await getPdfUrl();
    let month = url.match(/\+\w+\+/g)[0].replace(/\+/g, "");
    month = months.indexOf(month.toLocaleLowerCase());
    const buffer = await loadPdf(url);
    let obj = await parseData(buffer, getDinner, month);

    res.send({obj});
})


app.listen(port, () => {
  console.log(`PORT: ${port} online`);
})
