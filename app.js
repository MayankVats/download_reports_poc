const express = require("express");
const path = require("path");

const generateAnalyticsCSV = require("./generateCsv.js");
const generateAnalyticsXls = require("./generateExcel.js");

const app = express();

app.get("/download-csv-report", async (req, res) => {
  // Generate the CSV file
  await generateAnalyticsCSV();

  // Send the CSV file as a response
  const filePath = path.join(__dirname, "analytics.csv");
  res.download(filePath, "task-breakown-report.csv");
});

app.get("/download-xls-report", async (req, res) => {
  await generateAnalyticsXls();

  const filePath = path.join(__dirname, "analytics.xlsx");
  res.download(filePath, "task-breakown-report.xlsx");
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
