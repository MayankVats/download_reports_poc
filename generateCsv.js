const { taskBreakdown } = require("./database");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

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

module.exports = generateAnalyticsCSV;
