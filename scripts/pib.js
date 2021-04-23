url = "/pib"

requestIni = new XMLHttpRequest();
requestIni.open('GET', url, true);

const Ano = []
const PIBvalor = []
const PDvalor = []
const IDXPen = []

fetch(url).then(response => {
    return response.json();
}).then(data => {
    for(i=0;i<data.length;i++){
        Ano.push(data[i].ano);
        PIBvalor.push(data[i].PibValor);
        PDvalor.push(data[i].PreDirValor);
        IDXPen.push(data[i].IdxPen);
        //document.getElementById("PIBdata").innerHTML += data[i].ano;
        //document.getElementById("PIBdata").innerHTML += "<br>";
    }
    
}).then(() => {
    console.log(Ano)
    console.log(PIBvalor)
}).then(() => {


    var options = {
        series: [{
        name: 'PIB a preços de mercado - Valores Correntes (R$ Trilhões) ',
        type: 'bar',
        color: '#004D86',
        data: PIBvalor
    }, {
        name: 'Prêmio Direto (R$ Bilhões)',
        type: 'bar',
        color: '#FFC000',
        data: PDvalor
    }, {
        name: 'Índice de Penetração (% = Prêmio Direto / PIB)',
        type: 'line',
        color: '#C00000',
        data: IDXPen
    }],
        chart: {
        height: 325,
        type: 'line',
        stacked: false
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [1, 1, 3]
    },
    xaxis: {
        categories: Ano,
    },
    yaxis: [
        {
        axisTicks: {
            show: true,
        },
        axisBorder: {
            show: true,
            color: '#004D86'
        },
        labels: {
            style: {
            colors: '#004D86',
            }
        },
        title: {
            text: "PIB (R$ Tri)",
            style: {
            color: '#004D86',
            }
        },
        tooltip: {
            enabled: true
        }
        },
        {
        seriesName: 'PIB',
        opposite: true,
        axisTicks: {
            show: true,
        },
        axisBorder: {
            show: true,
            color: '#FFC000'
        },
        labels: {
            style: {
            colors: '#FFC000',
            }
        },
        title: {
            text: "Prêmio Direto (R$ Bi)",
            style: {
            color: '#FFC000',
            }
        },
        },
        {
        seriesName: 'Prêmio',
        opposite: true,
        axisTicks: {
            show: true,
        },
        axisBorder: {
            show: true,
            color: '#C00000'
        },
        labels: {
            style: {
            colors: '#C00000',
            },
        },
        title: {
            text: "Penetração (% do PIB)",
            style: {
            color: '#C00000',
            }
        }
        },
    ],
    tooltip: {
        fixed: {
        enabled: true,
        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60
        },
    },
    legend: {
        horizontalAlign: 'left',
        offsetX: 40
    }
    };
    
    var chart = new ApexCharts(document.querySelector("#PIBgraph"), options);
    
    chart.render();

})
