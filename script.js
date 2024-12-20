function buscarRegistros(){
    const numeroInventario = document.getElementById("text-box-numero-inventario").value;
    console.log("CURP ingresado:", numeroInventario); // Depuración

    google.script.run
    .withSuccessHandler(info => {
        console.log("Resultados devueltos:", info); // Depuración
        let tableBody = document.getElementById("mantenimientosTableBody");
        tableBody.innerHTML = "";
        if(info.length > 0){
            info.forEach(mantenimiento => {
                const template = document.getElementById("mantenimientosRow");
                const templateRow = template.content;

                let tr = templateRow.cloneNode(true);
                let colFecha = tr.querySelector(".mantenimientosFecha");
                let colDescripcion = tr.querySelector(".mantenimientosDescripcion");
                let colAtendido = tr.querySelector(".mantenimientosAtendio");

                colFecha.textContent = mantenimiento[2];
                colDescripcion.textContent = mantenimiento[3];

                if (mantenimiento[4] && mantenimiento[4].startsWith("http")) {
                    let enlace = document.createElement("a");
                    enlace.href = mantenimiento[4];
                    enlace.textContent = "Ver enlace";
                    enlace.target = "_blank";
                    colAtendido.appendChild(enlace);
                } else {
                    colAtendido.textContent = mantenimiento[4];
                }

                tableBody.appendChild(tr);
            });
        } else {
            alert("No se encontraron registros.");
        }
    })
    .buscarMantenimientos(numeroInventario);
}
