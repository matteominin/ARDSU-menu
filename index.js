const fs = require("fs");
const express = require("express");
const { getPdfUrl, parseData, loadPdf } = require("./parser.js");
const { parse } = require("path");
const app = express();
const port = process.env.PORT || 3000;
const months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno","luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

/* REGEX */
const getLunch = /(?<=P\s+R\s+A\s+N\s+\s+Z\s+O)(.*)(?=C\s+E\s+N\s+A)/gms;
const getDinner = /(?<=C\s+E\s+N\s+A)(.*)(?=Nei menù)/gms;

app.get("/", async (req, res) => {
  const url = await getPdfUrl();
  let month = url.match(/\+\w+\+/g)[0].replace(/\+/g, "");
  month = months.indexOf(month.toLocaleLowerCase());
  const buffer = await loadPdf(url);
  let lunch = await parseData(buffer, getLunch, month);
  let dinner = await parseData(buffer, getDinner, month);

  res.json({lunch, dinner});
})

app.get("/lunch", async (req, res) => {
    const url = await getPdfUrl();
    let month = url.match(/\+\w+\+/g)[0].replace(/\+/g, "");
    month = months.indexOf(month.toLocaleLowerCase());
    const buffer = await loadPdf(url);
    let obj = await parseData(buffer, getLunch, month);

    res.json(obj);
})

app.get("/dinner", async (req, res) => {
    const url = await getPdfUrl();
    let month = url.match(/\+\w+\+/g)[0].replace(/\+/g, "");
    month = months.indexOf(month.toLocaleLowerCase());
    const buffer = await loadPdf(url);
    let obj = await parseData(buffer, getDinner, month);

    res.send(obj);
})

app.get("/today/lunch", async (req, res) => {
  const url = await getPdfUrl();
  let today = new Date().getDate();
  const buffer = await loadPdf(url);
  let obj = await parseData(buffer, getLunch, today);
  let resObj = {};

  for(let i=0; i<obj.length; i++) {
    let tmpDate = new Date(obj[i].date).getUTCDate();

    if(today == tmpDate) {
      resObj = obj[i];
      break;
    }
  }

  res.json(resObj)
})

app.get("/today/dinner", async (req, res) => {
  const url = await getPdfUrl();
  let today = new Date().getDate();
  const buffer = await loadPdf(url);
  let obj = await parseData(buffer, getDinner, today);
  let resObj = {};
  
  for(let i=0; i<obj.length; i++) {
    let tmpDate = new Date(obj[i].date).getUTCDate();

    if(today == tmpDate) {
      resObj = obj[i];
      break;
    }
  }

  res.json(resObj)
})


app.listen(port, () => {
  console.log(`PORT: ${port} online`);
})
