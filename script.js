function doGet() {
  const html = HtmlService.createTemplateFromFile("index").evaluate();
  return html;
}

function buscarMantenimientos(curp) {
  const resultados = [];
  const spreadsheetId = "1a9M2I2lcpy4u7AlRZXMwYRx2AYGwhKLJNeCr8LPu42U";
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const sheet = ss.getSheetByName("Base");
  const data = sheet.getDataRange().getValues();

  data.forEach(row => {
    if (row[0].trim().toUpperCase() === curp.trim().toUpperCase()) {
      resultados.push(row);
    }
  });

  return resultados;
}
