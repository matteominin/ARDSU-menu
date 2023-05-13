const { clear } = require('console');
const fs = require('fs');
const pdf = require("pdf-parse");

const getPdf = /(?<=<strong>Calamandrei&nbsp; &nbsp;<\/strong><br \/>\n<a href=")(.*)(?=")/gm
const clearUrl = /\/[^\/]+(?=\/$|$)/g;
const getLunch = /(?<=P\s+R\s+A\s+N\s+\s+Z\s+O)(.*)(?=C\s+E\s+N\s+A)/gms;
const dateExtractor = /LUNEDI\W (.*)/g;


async function getPdfUrl() {
    const res = await fetch("https://www.dsu.toscana.it/i-menu");
    let data = await res.text();
    let url = "https://www.dsu.toscana.it" + data.match(getPdf)[0];
    url = url.replace(clearUrl, "");
    return url;
}


//regex that matches the all the string before the last "/"
const getFileName = /[^\/]+(?=\/$|$)/g;
async function loadPdf(url) {
    const res = await fetch(url);
    let data = await res.arrayBuffer();
    return data;
}

// TODO: use correct data
async function parseData(dataBuffer, regex, monthNumber) {
    //scraping text from pdf
    let text = await pdf(dataBuffer);
    text = text.text;
    
    let day = text.match(dateExtractor)[0];
    day = day.match(/\d+/g);

    //filtering text
    text = text.match(regex)[0];
    text = text.split("\n");
    text = text.map(elem => elem.trim());
    text = text.filter(elem => elem != "PIZZA");

    let parsedData = [];

    //clearing the array from empty elements at the begining
    while (text[0] == " " || text[0] == "") {
        text.splice(0, 1);
    }

    let count = 0;
    let i = 0;
    let dateIndex = 0;

    let tmp = {
        meal: String(regex) == String(getLunch) ? "lunch" : "dinner",
        date: new Date(),
        first_course: [],
        second_course: [],
        side_dish: []
    };

    //populating the tmp array
    while (i < text.length) {
        while (text[i] != " " && text[i] != "") {

            switch (count) {
                case 0:
                    tmp.first_course.push(text[i].trim());
                    break;
                case 1:
                    tmp.second_course.push(text[i].trim());
                    break;

                case 2:
                    tmp.side_dish.push(text[i].trim());
                    break;
            }
            i++;
        }

        i++;
        count = (count + 1) % 3;

        if (count == 0) {
            if(dateIndex != 0 && day[dateIndex] > day[dateIndex-1])
                tmp.date = new Date(new Date().getFullYear(), monthNumber, day[dateIndex++], String(regex) == String(getLunch) ? 12 : 19).toUTCString();
            else if(dateIndex == 0)
                tmp.date = new Date(new Date().getFullYear(), monthNumber, day[dateIndex++], String(regex) == String(getLunch) ? 12 : 19).toUTCString();
            else
                //if the date is not present in the current month increase to the next one 
                tmp.date = new Date(new Date().getFullYear(), monthNumber, day[dateIndex++], String(regex) == String(getLunch) ? 12 : 19).toUTCString();
                
            parsedData.push(tmp);

            tmp = {
                meal: String(regex) == String(getLunch) ? "lunch" : "dinner",
                date: new Date(),
                first_course: [],
                second_course: [],
                side_dish: []
            };
        }

        //remove '' elements before the frist non empty
        while (text[i] == " " || text[i] == "") {
            i++;
        }
    }

    //join the strings not capitlized with the previous one
    for( let i = 0; i < parsedData.length; i++){
        for(let j = 0; j < parsedData[i].first_course.length; j++){
            if(parsedData[i].first_course[j][0] != parsedData[i].first_course[j][0].toUpperCase()){
                parsedData[i].first_course[j-1] += " " + parsedData[i].first_course[j];
                parsedData[i].first_course.splice(j, 1);
                j--;
            }
        }

        for(let j = 0; j < parsedData[i].second_course.length; j++){
            if(parsedData[i].second_course[j][0] != parsedData[i].second_course[j][0].toUpperCase()){
                parsedData[i].second_course[j-1] += " " + parsedData[i].second_course[j];
                parsedData[i].second_course.splice(j, 1);
                j--;
            }
        }

        for(let j = 0; j < parsedData[i].side_dish.length; j++){
            if(parsedData[i].side_dish[j][0] != parsedData[i].side_dish[j][0].toUpperCase()){
                parsedData[i].side_dish[j-1] += " " + parsedData[i].side_dish[j];
                parsedData[i].side_dish.splice(j, 1);
                j--;
            }
        }
    }

    return parsedData;
}

module.exports = { getPdfUrl, parseData, loadPdf };
