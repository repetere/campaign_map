
let Highcharts = require('highcharts/highmaps'); 
// let Highcharts = require('highcharts');
let data = require('../../scripts/nycsv.json');
import React, { Component, } from 'react';
import ReactDOM from 'react-dom';

window.addEventListener('load', (e)=>{
  // console.log('windowloaded');

  var countiesMap = window.Highcharts.geojson(window.Highcharts.maps['countries/us/us-all-all']),
    lines = window.Highcharts.geojson(window.Highcharts.maps['countries/us/us-all-all'], 'mapline'),
    options;

  // Add state acronym for tooltip
  window.Highcharts.each(countiesMap, function (mapPoint) {
    mapPoint.name = mapPoint.name + ', ' + mapPoint.properties['hc-key'].substr(3, 2).toUpperCase();
  });

  options = {
    chart: {
        borderWidth: 1,
        marginRight: 50, // for the legend
      },

    title: {
        text: 'Volunteers by Zip',
      },

    legend: {
        title: {
            text: 'Number of<br>Volunteers',
            style: {
                color: (window.Highcharts.theme && window.Highcharts.theme.textColor) || 'black',
              },
          },
        layout: 'vertical',
        align: 'right',
        floating: true,
        valueDecimals: 0,
        // valueSuffix: '%',
        backgroundColor: (window.Highcharts.theme && window.Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)',
        symbolRadius: 0,
        symbolHeight: 14,
      },

    mapNavigation: {
        enabled: true,
      },

    colorAxis: {
        dataClasses: [{
            from: 0,
            to: 2,
            color: '#F1EEF6',
          }, {
            from: 2,
            to: 4,
            color: '#D4B9DA',
          }, {
            from: 4,
            to: 6,
            color: '#C994C7',
          }, {
            from: 6,
            to: 8,
            color: '#DF65B0',
          }, {
            from: 8,
            to: 10,
            color: '#DD1C77',
          }, {
            from: 10,
            color: '#980043',
          },],
      },

    plotOptions: {
      mapline: {
        showInLegend: false,
        enableMouseTracking: false,
      },
    },

    series: [{
      mapData: countiesMap,
      data: data,
      joinBy: ['fips', 'fips',],
        // joinBy: ['hc-key', 'code'],
      name: 'Volunteers',
      tooltip: {
        // valueSuffix: '%',
      },
      borderWidth: 0.5,
      states: {
        hover: {
          color: '#bada55',
        },
      },
    }, {
      type: 'mapline',
      name: 'State borders',
      data: [lines[0],],
      color: 'white',
    }, {
      type: 'mapline',
      name: 'Separator',
      data: [lines[1],],
      color: 'gray',
    },],
  };

        // Instanciate the map
        // document.querySelector('#root').window.highcharts('Map', options);
  window.Highcharts.mapChart('root', options);
});

// console.log({ Highcharts, data, });
// ReactDOM.render(<GroceryList />,document.getElementById('root'));

