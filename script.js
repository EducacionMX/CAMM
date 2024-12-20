async function buscarConstancias() {
  const curp = document.getElementById("curp").value.trim();
  
  if (!curp) {
    alert("Por favor, ingresa un CURP válido.");
    return;
  }

  const sheetId = "1a9M2I2lcpy4u7AlRZXMwYRx2AYGwhKLJNeCr8LPu42U"; // Cambia esto por tu ID
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tq=select * where A contains '${CURP}'`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2)); // Extraer datos JSON
    const rows = json.table.rows;

    const table = document.getElementById("resultados");
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = ""; // Limpia los resultados anteriores

    if (rows.length === 0) {
      alert("No se encontraron constancias para el CURP ingresado.");
      return;
    }

    // Recorremos cada fila encontrada y la agregamos a la tabla
    rows.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.c[1].v}</td> <!-- Columna NOMBRE -->
        <td>${row.c[3].v}</td> <!-- Columna CURSO/DIPLOMADO -->
        <td><a href="${row.c[4].v}" target="_blank">Ver Constancia</a></td> <!-- Columna URL -->
      `;
      tbody.appendChild(tr);
    });

    table.style.display = "table"; // Muestra la tabla
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    alert("Hubo un error al buscar las constancias.");
  }
}
