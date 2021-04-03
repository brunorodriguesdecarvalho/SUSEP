
//  _                     _   _      _ _          
// | |                   | | | |    (_) |         
// | |     ___   __ _  __| | | |     _| |__       
// | |    / _ \ / _` |/ _` | | |    | | '_ \      
// | |___| (_) | (_| | (_| | | |____| | |_) | _ _ 
// |______\___/ \__,_|\__,_| |______|_|_.__(_|_|_)                           
// Load the Visualization API and the corechart package.
google.charts.load('current', 
{
  'packages': ['controls', 'bar', 'table'],
  'language': 'ru'
});



//   _____                      _____        _              
//  |  __ \                    |  __ \      | |             
//  | |__) |_ _ _ __ ___  ___  | |  | | __ _| |_ __ _       
//  |  ___/ _` | '__/ __|/ _ \ | |  | |/ _` | __/ _` |      
//  | |  | (_| | |  \__ \  __/ | |__| | (_| | || (_| |_ _ _ 
//  |_|   \__,_|_|  |___/\___| |_____/ \__,_|\__\__,_(_|_|_)
// https://www.papaparse.com/
var dataRows = [];
Papa.parse("data1.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    // dynamicTyping: true,
    step: function(row) {
      // populate data
      dataRows.push([row.data.name, row.data.value, row.data.group]);
    },
    complete: function() {
      // load chart when data is loaded
      google.charts.setOnLoadCallback(drawDashboard);
    }
});

var changeFilter, releaseFilter; // globally available functions


// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawDashboard() {

  //    _____      _     _____        _        
  //   / ____|    | |   |  __ \      | |       
  //  | (___   ___| |_  | |  | | __ _| |_ __ _ 
  //   \___ \ / _ \ __| | |  | |/ _` | __/ _` |
  //   ____) |  __/ |_  | |__| | (_| | || (_| |
  //  |_____/ \___|\__| |_____/ \__,_|\__\__,_|
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'name');
  data.addColumn('number', 'value');
  data.addColumn('string', 'group');
  data.addRows(dataRows);


  //    _____      _     _____            _     ____                      _ 
  //   / ____|    | |   |  __ \          | |   |  _ \                    | |
  //  | (___   ___| |_  | |  | | __ _ ___| |__ | |_) | ___   __ _ _ __ __| |
  //   \___ \ / _ \ __| | |  | |/ _` / __| '_ \|  _ < / _ \ / _` | '__/ _` |
  //   ____) |  __/ |_  | |__| | (_| \__ \ | | | |_) | (_) | (_| | | | (_| |
  //  |_____/ \___|\__| |_____/ \__,_|___/_| |_|____/ \___/ \__,_|_|  \__,_| 
  // Create a dashboard.
  var dashboard = new google.visualization.Dashboard(
      document.getElementById('dashboard_div'));



  //    _____      _      _____            _             _     
  //   / ____|    | |    / ____|          | |           | |    
  //  | (___   ___| |_  | |     ___  _ __ | |_ _ __ ___ | |___ 
  //   \___ \ / _ \ __| | |    / _ \| '_ \| __| '__/ _ \| / __|
  //   ____) |  __/ |_  | |___| (_) | | | | |_| | | (_) | \__ \
  //  |_____/ \___|\__|  \_____\___/|_| |_|\__|_|  \___/|_|___/
  // Create a range slider, passing some options
  var valueRangeSlider = new google.visualization.ControlWrapper({
    'controlType': 'NumberRangeFilter',
    'containerId': 'filter_div',
    'options': {
      'filterColumnLabel': 'value', // column name from data       
      'ui': {
          'label': 'Value',
            step: 10000,
            format: {pattern:'#,###'},
            labelStacking: 'vertical',
            cssClass: 'slidecontainer'
      }
    }
  });
  // name filter
  var filterName = new google.visualization.ControlWrapper({
    'controlType': 'CategoryFilter',
    'containerId': 'name_filter_div',
    'options': {
      'filterColumnLabel': 'name'
    }
  });


  //   _    _ _     _     _              _        _     _      
  //  | |  | (_)   | |   | |            | |      | |   | |     
  //  | |__| |_  __| | __| | ___ _ __   | |_ __ _| |__ | | ___ 
  //  |  __  | |/ _` |/ _` |/ _ \ '_ \  | __/ _` | '_ \| |/ _ \
  //  | |  | | | (_| | (_| |  __/ | | | | || (_| | |_) | |  __/
  //  |_|  |_|_|\__,_|\__,_|\___|_| |_|  \__\__,_|_.__/|_|\___|
  // use this table for all depandencies
  var tableWrapper = new google.visualization.ChartWrapper({
    chartType: 'Table',
    containerId: 'hidden_table_div',
  });



  //    _____ _                _             
  //   / ____| |              | |        _   
  //  | |    | |__   __ _ _ __| |_ ___ _| |_ 
  //  | |    | '_ \ / _` | '__| __/ __|_   _|
  //  | |____| | | | (_| | |  | |_\__ \ |_|  
  //   \_____|_| |_|\__,_|_|   \__|___/      
  //   / ____|                               
  //  | |  __ _ __ ___  _   _ _ __  ___      
  //  | | |_ | '__/ _ \| | | | '_ \/ __|     
  //  | |__| | | | (_) | |_| | |_) \__ \     
  //   \_____|_|  \___/ \__,_| .__/|___/     
  //                         | |             
  //                         |_|             
  // Charts with a grouped data. These charts are placed
  // outside the dashboard. Interaction is made by the 
  // listener.

  // Create a pie chart, passing some options
  var barChart = new google.visualization.ChartWrapper({
    'chartType': 'Bar',
    'containerId': 'chart_div',
    'options': {
      'width': 750,
      'height':230,
      bars: 'horizontal',
      hAxis: {
          title: 'Total Population',
          minValue: 0
        },
      vAxis: {
          title: 'City'
      }
    },
    dataTable: getGroupedData(data)
  });


  

  // Establish dependencies, declaring that 'filter' drives 'barChart',
  // so that the pie chart will only display entries that are let through
  // given the chosen slider range.
  dashboard.bind([valueRangeSlider, filterName], [tableWrapper]);
  dashboard.bind(filterName, valueRangeSlider);

  //   _______    _     _                
  //  |__   __|  | |   | |       ______  
  //     | | __ _| |__ | | ___  |______| 
  //     | |/ _` | '_ \| |/ _ \  ______  
  //     | | (_| | |_) | |  __/ |______| 
  //   __|_|\__,_|_.__/|_|\___|          
  //  |  ____(_) | |                     
  //  | |__   _| | |_ ___ _ __           
  //  |  __| | | | __/ _ \ '__|          
  //  | |    | | | ||  __/ |             
  //  |_|    |_|_|\__\___|_|             

  // Standalone table. Serves as a filter, changes values in the
  // real filter control by the listener
  var table = new google.visualization.Table(document.getElementById('standalone_table_div'));
  // add handler to the table
  // Add our selection handler.
  google.visualization.events.addListener(table, 'select', selectHandler);
  // Draw the dashboard.
  var tableProperties = 
  {
    showRowNumber: true, 
    width: '100%', 
    height: '100%',
    cssClassNames: {headerRow:'columnTitle'}
  };
  


  //   _____                     
  //  |  __ \                    
  //  | |  | |_ __ __ ___      __
  //  | |  | | '__/ _` \ \ /\ / /
  //  | |__| | | | (_| |\ V  V / 
  //  |_____/|_|  \__,_| \_/\_/  
  barChart.draw();
  table.draw(data, tableProperties);
  dashboard.draw(data);



  //   _______    _     _                   
  //  |__   __|  | |   | |                  
  //     | | __ _| |__ | | ___ ______       
  //     | |/ _` | '_ \| |/ _ \______|      
  //     | | (_| | |_) | |  __/             
  //   _ |_|\__,_|_.__/|_|\___| _           
  //  | |  | |               | | |          
  //  | |__| | __ _ _ __   __| | | ___ _ __ 
  //  |  __  |/ _` | '_ \ / _` | |/ _ \ '__|
  //  | |  | | (_| | | | | (_| | |  __/ |   
  //  |_|  |_|\__,_|_| |_|\__,_|_|\___|_|   
  // The selection handler.
  // Loop through all items in the selection and concatenate
  // a single message from all of them.
  function selectHandler() {
    var selection = table.getSelection();
    var values = [];
    for (var i = 0; i < selection.length; i++) {
      var item = selection[i];
      if (item.row != null && item.column != null) {
        var str = data.getFormattedValue(item.row, item.column);
      } else if (item.row != null) {
        var str = data.getFormattedValue(item.row, 0);
      } else if (item.column != null) {
        var str = data.getFormattedValue(0, item.column);
      }
      values.push(str);
    }
    if (values.length > 0) {
      changeFilter(values);
    }
    else
    {
      // select all values
      releaseFilter();
    }
    return 0;
  } 


//    _____                                   
//   / ____|                                  
//  | |  __ _ __ ___  _   _ _ __              
//  | | |_ | '__/ _ \| | | | '_ \             
//  | |__| | | | (_) | |_| | |_) |            
//   \_____|_|  \___/ \__,_| .__/             
//                         | |                
//   _    _                |_|_               
//  | |  | |               | | |              
//  | |__| | __ _ _ __   __| | | ___ _ __ ___ 
//  |  __  |/ _` | '_ \ / _` | |/ _ \ '__/ __|
//  | |  | | (_| | | | | (_| | |  __/ |  \__ \
//  |_|  |_|\__,_|_| |_|\__,_|_|\___|_|  |___/
   // on picker change
  google.visualization.events.addListener(
    tableWrapper, 
    'ready', 
    updateView_);  
  
  
  
  // save basic filter state to restore it in the future
  var state = filterName.getState();  
  //   ______                _   _                 
  //  |  ____|              | | (_)                
  //  | |__ _   _ _ __   ___| |_ _  ___  _ __  ___ 
  //  |  __| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
  //  | |  | |_| | | | | (__| |_| | (_) | | | \__ \
  //  |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|___/

  // grouped data for some visual elements
  function getGroupedData(data)
  {
    var dt_grouped = google.visualization.data.group(
      data,
      [2],
      [
        {
          column: 1,
          aggregation: google.visualization.data.sum,
          type: 'number',
        },
      ]);
    return dt_grouped;   
  } 

  // changes the filter, used outside the function             
  changeFilter = function(values) {
    filterName.setState({selectedValues: values});
    filterName.draw();
  }; 
  // changes the filter, used outside the function
  releaseFilter = function() {
    filterName.setState(state);
    filterName.draw();
    table.setSelection();
  };  

  // update all dependent charts with grouped data
  function updateView_(event)
  {
    var data = tableWrapper.getDataTable();
    barChart.setDataTable(getGroupedData(data));
    // redraw the pie chart to reflect changes
    barChart.draw();
  }                                       


}     



