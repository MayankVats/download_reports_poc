const exceljs = require("exceljs");
const { taskBreakdown } = require("./database");

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

module.exports = generateAnalyticsXls;
