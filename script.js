document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    let data = document.getElementById("data").value;
    let balcao = document.getElementById("balcao").value.split(" ").map(Number);
    let drivethru = document.getElementById("drivethru").value.split(" ").map(Number);
    let mcEntrega = document.getElementById("mc_entrega").value.split(" ").map(Number);

    // Calculando os totais por segmento
    let totaisSegmentos = {
        "Balcão": balcao.reduce((acc, val) => acc + val, 0),
        "Drive Thru": drivethru.reduce((acc, val) => acc + val, 0),
        "Mc Entrega": mcEntrega.reduce((acc, val) => acc + val, 0)
    };

    // Calculando os totais por horário e segmento
    let totaisHorariosPorSegmento = {
        "Balcão": balcao,
        "Drive Thru": drivethru,
        "Mc Entrega": mcEntrega
    };

    let totaisHorariosGerais = balcao.map((_, i) => balcao[i] + drivethru[i] + mcEntrega[i]);

    // Exibindo os resultados
    document.getElementById("resultado").style.display = "block";

    // Exibindo totais por segmento
    let totaisSegmentosTable = document.getElementById("totais-segmentos").getElementsByTagName("tbody")[0];
    totaisSegmentosTable.innerHTML = "";
    for (let segmento in totaisSegmentos) {
        let row = totaisSegmentosTable.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.textContent = segmento;
        cell2.textContent = totaisSegmentos[segmento];
    }

    // Exibindo totais por horário
    let totaisHorariosTable = document.getElementById("totais-horarios").getElementsByTagName("tbody")[0];
    totaisHorariosTable.innerHTML = "";
    for (let i = 0; i < 24; i++) {
        let row = totaisHorariosTable.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        cell1.textContent = `${i}:00`;
        cell2.textContent = totaisHorariosPorSegmento["Balcão"][i];
        cell3.textContent = totaisHorariosPorSegmento["Drive Thru"][i];
        cell4.textContent = totaisHorariosPorSegmento["Mc Entrega"][i];
        cell5.textContent = totaisHorariosGerais[i];
    }
});

function imprimirResultado() {
    let conteudo = document.getElementById("resultado").innerHTML;
    let janelaImpressao = window.open('', '', 'height=800, width=600');
    janelaImpressao.document.write('<html><head><title>Imprimir Resultados</title>');
    janelaImpressao.document.write('<style>body { font-family: Arial, sans-serif; } table { width: 100%; border-collapse: collapse; margin-top: 20px; } th, td { padding: 10px; border: 1px solid #ddd; text-align: center; } th { background-color: #f4f4f4; }</style>');
    janelaImpressao.document.write('</head><body>');
    janelaImpressao.document.write('<h1>Totais Calculados</h1>');
    janelaImpressao.document.write(conteudo);
    janelaImpressao.document.write('</body></html>');
    janelaImpressao.document.close();
    janelaImpressao.print();
}
