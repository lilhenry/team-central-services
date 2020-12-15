 async function createSearch(query, json) {
  if (query === '' || query.startsWith('')) {
    searchWord = 'null'
  } 
  const regx = json.filter((jsonObj) => {
      const regex = new RegExp(query, 'gi');
      return jsonObj.zip_code.match(regex) || jsonObj.agency.match(regex) || jsonObj.payee_name.match(regex);
  });
  console.log(regx);
  return regx;
}
// this gives us an array to map our json object over
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
   // for testing
  console.log(attributeArray, 'this should contain the array with the selected attribute');
  // initialize and return chart configuration 
  CanvasJS.addColorSet('customColorSet1', [
    '#ffa600',
    '#58508d',
    '#ff6361',
    '#003f5c',
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
  const data = await fetch('http://localhost:3000/api', { // don't forget to change from http://localhost:3000/api
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // need to figure out how to pass the token in the post headers 
      'app-token': '1ukZDsQi4C3DQhMJusKqTZD1s'
    },
    body: JSON.stringify(form)
  })
    .catch((err) => {
      console.log(err);
    });
  const json = await data.json(); // raw json data
  console.log(json.length , '<=if this is < 1000 the app token isnt working');

  // *********************  
  // now that we have our data, we can run our button functioning below
  // *********************

  // grab our buttons from DOM using jQuery
  const searchBtn = $('#search-btn');
  const generateBtn = $('#generate');

  // this will fire once the search button is clicked
  searchBtn.on('click', async(e) => {
    console.log('e search ', e);
    e.preventDefault(); // prevent event web default

    // grab search input value
    const searchQuery = document.querySelector('#search').value; // search bar value
    console.log('search query ', searchQuery);

    // pass search query into fxn to create container divs for results
    const searchResults = await createSearch(searchQuery, json); 
    const srchHdr = document.querySelector('#breakdown');
    const numResults = searchResults.length;
    srchHdr.innerHTML = `Searching.. # of matches: ${numResults}`;

    if (document.querySelector('#chartForm')) {
      $('#chartForm').remove();
    }

    const resultDiv = document.createElement('div');
      resultDiv.className = 'targetDiv is-centered';
      $('#searchForm').append(resultDiv);

      for (let obj = 0; obj < searchResults.length; obj += 1) { 	
        const payee = searchResults[obj].payee_name;	
        const agency = searchResults[obj].agency;	
        const zip = searchResults[obj].zip_code;	
        const amount = searchResults[obj].amount;	
        const description = searchResults[obj].payment_description;	

        // div append just to see/check api data is present	
        const API = document.createElement('div');	
        API.innerHTML = `<h4><span class='is-size-4'>payee:  </span>${payee}</h4>	
                          <p><span class='is-size-4'>agency:  </span>${agency}</p>	
                          <p><span class='is-size-4'>zip:  </span>${zip}</p>	
                          <p><span class='is-size-4'>amount:  </span>${amount}</p>	
                          <p><span class='is-size-4'>description:  </span>${description}</p>
                          <br> `
        API.className = 'box'
        resultDiv.append(API);
      }
  });
  
  // this will fire once the generate button is clicked
  generateBtn.on('click', async(e) => {
    e.preventDefault(); // prevent event web default

     // remove search options if generate clicked?
    // do we want the split screen the entire time?
    // or do we want the chart to take up most of the space?
    if (document.querySelector('#searchForm')) {
      $('#searchForm').remove();
    }
    
    // for testing generateBtn functionality
    const outputheader = document.querySelector('#breakdown');
    outputheader.innerHTML = 'Generating bar chart..';

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
              y: Math.trunc(budgetAmountFloat)
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
        chartDiv.className = 'is-vcentered';
        const chartOptions = renderChart(FinalArray);
        const chart = new CanvasJS.Chart(chartDiv, chartOptions);
        chart.render();
        // append chart container to end of the chart form
        await $('#chartForm').append(chartDiv);
});
}

window.onload = mainThread;
// NOTES & TO DO
//   - app token from pg county (1000 records issue)
//   - hit pg county when server turns on
//   - presentation: note difficulties with api records
//   - https://dev.socrata.com/foundry/data.princegeorgescountymd.gov/p32t-azw8