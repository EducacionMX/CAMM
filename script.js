async function buscarRegistros() {
  const curp = document.getElementById("text-box-curp").value.trim().toUpperCase();

  // Validar CURP ingresado
  if (!curp) {
    alert("Por favor, ingresa un CURP válido.");
    return;
  }

  const curpPattern = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]{2}$/i;
  if (!curpPattern.test(curp)) {
    alert("Por favor, ingresa un CURP válido en formato correcto.");
    return;
  }

  const spreadsheetId = "1a9M2I2lcpy4u7AlRZXMwYRx2AYGwhKLJNeCr8LPu42U";
  const sheetName = "Hoja1";
  const apiKey = "TU_CLAVE_API_AQUI"; // Coloca tu clave de la API de Google

  // URL de Google Sheets API
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener los datos.");
    const data = await response.json();

    // Filtrar registros que coincidan con el CURP
    const rows = data.values || [];
    const results = rows.filter(row => row[0] === curp);

    const tableBody = document.getElementById("resultsTableBody");
    tableBody.innerHTML = ""; // Limpiar resultados anteriores

    if (results.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="3">No se encontraron constancias para el CURP ingresado.</td></tr>`;
    } else {
      results.forEach(row => {
        const rowHtml = `
          <tr>
            <td>${row[2]}</td> <!-- Folio -->
            <td>${row[3]}</td> <!-- Curso/Diplomado -->
            <td><a href="${row[4]}" target="_blank">Ver constancia</a></td> <!-- URL -->
          </tr>`;
        tableBody.innerHTML += rowHtml;
      });
    }
  } catch (error) {
    console.error("Error al buscar constancias:", error);
    alert("Ocurrió un error al buscar las constancias. Inténtalo de nuevo.");
  }
}
