
var myArr
var Arr = [
  [
    {label: 'DataRef', id: 'datadopib', type: 'date'}, 
    {label: 'PIB trimestre - Preços de mercado - Valores Correntes em R$ Milhões', id: 'valordopib', type: 'number'}
  ]
]

function lerJSON() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myArr = JSON.parse(this.responseText);
      //document.getElementById("demo").innerHTML = myArr[0];
      var tamanho = Object.keys(myArr).length
      for (i=0; i<tamanho; i++){
        var arrayTemp = [new Date(myArr[i].ano, myArr[i].mes-1, myArr[i].dia), myArr[i].valor];
        //console.log(arrayTemp)
        Arr.push(arrayTemp)
      }
    }
  };
  xmlhttp.open("GET", ".\\graph\\PIB_Mercado_Corrente\\Row1PIB_bruno.json", true);
  xmlhttp.send();
}

lerJSON()
console.log(Arr)

google.charts.load('current', {
    'packages': ['annotationchart','corechart']
});

google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = new google.visualization.arrayToDataTable(Arr);

  
  var chart = new google.visualization.LineChart(document.getElementById('graf_PIB'));

  var options = {
    title: 'Evolução do Produto Interno Bruto do Brasil por Trimestre desde 1995 até 2020.',
    hAxis: {
      title: 'Data do último dia do trimestre de referência',
      titleTextStyle: {
        color: '#333'
      },
      gridlines: {
        color: '#fff'
      }

    },
    vAxis: {
      title: 'Valores correntes em milhões de Reais',
      minValue: 0,
      viewWindowMode: 'maximized',
      gridlines: {
        count: 4
      }
    },
    legend: {
      alignment: 'center',
      position: 'top'
    },
    explorer: {
       actions: ['dragToZoom', 'rightClickToReset'],
    },
    pointSize: 3
  };

  chart.draw(data, options);
}




