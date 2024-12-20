async function buscarConstancias() {
  const curp = document.getElementById("curp").value.trim();
  
  if (!curp) {
    alert("Por favor, ingresa un CURP válido.");
    return;
  }

  const sheetId = "1a9M2I2lcpy4u7AlRZXMwYRx2AYGwhKLJNeCr8LPu42U"; // Cambia esto por tu ID
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tq=select * where A contains '${curp}'`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2)); // Extraer datos JSON
    const rows = json.table.rows;

    const table = document.getElementById("resultados");
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = ""; // Limpia los resultados anteriores

    if (!rows || rows.length === 0) {
      alert("No se encontraron constancias para el CURP ingresado.");
      return;
    }

    // Recorremos cada fila encontrada con validaciones más detalladas
    rows.forEach((row, index) => {
      // Depuración: Registro de cada fila
      console.log(`Procesando fila ${index + 1}:`, row);

      if (!row.c) {
        console.warn(`Fila ${index + 1} no tiene datos válidos:`, row);
        return; // Saltar filas sin datos
      }

      // Validar y asignar valores de las columnas
      const nombre = row.c[1]?.v || "N/A"; // Columna NOMBRE
      const curso = row.c[3]?.v || "N/A"; // Columna CURSO/DIPLOMADO
      const urlConstancia = row.c[4]?.v || "#"; // Columna URL

      if (!row.c[1] || !row.c[3] || !row.c[4]) {
        console.warn(
          `Fila ${index + 1} tiene columnas incompletas. Datos:`,
          row.c
        );
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${nombre}</td>
        <td>${curso}</td>
        <td><a href="${urlConstancia}" target="_blank">Ver Constancia</a></td>
      `;
      tbody.appendChild(tr);
    });

    table.style.display = "table"; // Muestra la tabla
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    alert("Hubo un error al buscar las constancias.");
  }
}
