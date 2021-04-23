var options = {
    series: [{
    name: 'PIB - Valores Correntes',
    type: 'bar',
    color: '#004D86',
    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6, 1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6, 3.8, 4.6, 1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
  }, {
    name: 'Prêmio Direto',
    type: 'bar',
    color: '#FFC000',
    data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5, 1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5, 6.5, 8.5, 1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
  }, {
    name: 'Índice de Penetração',
    type: 'line',
    color: '#C00000',
    data: [20, 29, 37, 36, 44, 45, 50, 58, 20, 29, 37, 36, 44, 45, 50, 58, 20, 29, 37, 36, 44, 45, 50, 58, 20, 29]
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
    width: [1, 3, 4]
  },
  title: {
    text: 'PIB e Penetração do Mercado',
    align: 'left',
    offsetX: 110
  },
  xaxis: {
    categories: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
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
        text: "PIB (R$ Mio)",
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
        text: "Prêmio Direto (R$ Mil)",
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