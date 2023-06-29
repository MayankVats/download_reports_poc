const express = require("express");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const exceljs = require("exceljs");
const path = require("path");
const fs = require("fs");

// Generate or fetch your analytics data
const taskBreakdown = [
  { task: "Housekeeping", occurence: 1500 },
  { task: "Check-out", occurence: 880 },
  { task: "Laundry", occurence: 501 },
  { task: "Toiletries", occurence: 341 },
  { task: "Mini-Bar", occurence: 273 },
];

async function generateAnalyticsXls() {
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet("Analytics");

  const columns = [];
  for (const prop in taskBreakdown[0]) {
    columns.push({
      header: prop,
      key: prop,
    });
  }

  worksheet.columns = columns;

  worksheet.addRows(taskBreakdown);

  await workbook.xlsx.writeFile("analytics.xlsx");
}

async function generateAnalyticsCSV() {
  // Define the CSV file path and header configuration
  const csvWriter = createCsvWriter({
    path: "analytics.csv",
    header: [
      { id: "task", title: "Task" },
      { id: "occurence", title: "Occurence" },
    ],
  });

  // Write the data to the CSV file
  await csvWriter.writeRecords(taskBreakdown);
}

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
