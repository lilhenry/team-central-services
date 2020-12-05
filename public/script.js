// this gives us an array to map our json object over
function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

// returns chartOptions to be rendered
function renderChart(attributeArray) {
  // initialize and return chart configuration 
  CanvasJS.addColorSet('customColorSet1', [
    '#003f5c',
    '#58508d',
    '#ff6361',
    '#ffa600',
    '#ff3616'// canvasJS colorsets: https://canvasjs.com/docs/charts/chart-options/colorset/
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: document.querySelector('input[name="chart-list"]:checked').value
    },
    data: [{
      type: 'column',
      name: 'attribute',
      axisYType: 'primary',
      dataPoints: attributeArray
    }]
  };
}

// main thread
async function mainThread() {
  const form = $(this).serializeArray();
  // data retrieval
  const data = await fetch('/api', { // don't forget to change from http://localhost:3000/api
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // need to figure out how to pass the token in the post headers 
      // 'X-App-Token': '1ukZDsQi4C3DQhMJusKqTZD1s'
    },
    body: JSON.stringify(form)
  })
    .catch((err) => {
      console.log(err);
    });
  const json = await data.json(); // raw json data

  // *********************  
  // now that we have our data, we can run our button functioning below
  // *********************

  // grab our buttons from DOM using jQuery
  const searchBtn = $('#search-btn');
  const generateBtn = $('#generate');

  // this will fire once the search button is clicked
  searchBtn.on('click', (e) => {
    console.log('e search ', e);
    e.preventDefault(); // prevent event web default
    const srchHdr = document.querySelector('#breakdown');
    srchHdr.innerHTML = 'SEARCH WAS CLICKED';

    // grab search input value
    const searchquery = document.querySelector('#search').value; // search bar value
    console.log('search query ', searchquery);

    // pass search query into fxn to create container divs for results
    // createSearch(searchquery, json);
  });

  // this will fire once the generate button is clicked
  generateBtn.on('click', (e) => {
    e.preventDefault(); // prevent event web default

     // remove search options if generate clicked?
    // do we want the split screen the entire time?
    // or do we want the chart to take up most of the space?
    if (document.querySelector('#searchForm')) {
      $('#searchForm').remove();
    }
    
    // for testing generateBtn functionality
    const outputheader = document.querySelector('#breakdown');
    outputheader.innerHTML = 'GENERATE WAS CLICKED, check console for *correct* array (use agency until we get the token working)';

        // radio button (attribute) value
        const attribute = document.querySelector('input[name="chart-list"]:checked').value;

        // create array with json.length and map over it with json object
        const arrayWithJsonLength = range(json.length);
        const newArray = arrayWithJsonLength.map((arrayElement) => json[arrayElement]); // this converts our json object to an array
      
        // our final array reduces the array to the attribute and amount total spent per unique attribute chosen
        const FinalArray = newArray.reduce((newChartDataArray, currentValue, index) => {
          // find first value where label is same as xx attribute
          const calculateAttributeCount = newChartDataArray.find((value) => value.label === currentValue[attribute]);
          const budgetAmountFloat = parseFloat(currentValue.amount);
          // checks if it is not in our chart data array
          if (!calculateAttributeCount) {
            newChartDataArray.push({
              // append attribute and its value is the total amount spent
              label: currentValue[attribute],
              y: budgetAmountFloat
            });
          } else {
            // if it's already in the array, update the value by adding the new (currentValue[attribute]) amount
            const currentIndex = newChartDataArray.findIndex((value) => value.label === currentValue[attribute]);
            newChartDataArray[currentIndex].y += budgetAmountFloat;
          }
          return newChartDataArray;
        }, []);
      
        // prevents charts from piling on top of each other 
        if (document.querySelector('#chartcontainer')) {
          $('#chartcontainer').remove();
        }
        // create new div chart container and render chart
        const chartDiv = document.createElement('div');
        chartDiv.id = 'chartcontainer';
        const chartOptions = renderChart(FinalArray);
        const chart = new CanvasJS.Chart(chartDiv, chartOptions);
        chart.render();
        // append chart container to end of the chart form
        $('#chartForm').append(chartDiv)
});
}

window.onload = mainThread;
// NOTES & TO DO
//   - app token from pg county (1000 records issue)
//   - hit pg county when server turns on
//   - presentation: note difficulties with api records
//   - https://dev.socrata.com/foundry/data.princegeorgescountymd.gov/p32t-azw8
