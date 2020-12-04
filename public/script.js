// this gives us an array to map our json object over
function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

// main thread
async function mainThread() {
  const form = $(this).serializeArray();
  // data retrieval
  const data = await fetch('/api', { // dont forget to change it back to /api
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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

    // grab search input value and pass into fxn to create search Div
  // search bar value
    const searchquery = document.querySelector('#search').value;
    console.log('search query ', searchquery);
    // createSearch(searchquery, json);
  });

  // this will fire once the search button is clicked
  generateBtn.on('click', (e) => {
    console.log('e generate ', e);
    e.preventDefault(); // prevent event web default

    // for testing generateBtn functionality
    const outputheader = document.querySelector('#breakdown');
    outputheader.innerHTML = 'GENERATE WAS CLICKED, check console for *correct* array (try agency for best results for now)';

        // radio button (attribute) value
        const attribute = document.querySelector('input[name="chart-list"]:checked').value;
        console.log('attribute ', attribute);

        const arrayWithJsonLength = range(json.length);
        const newArray = arrayWithJsonLength.map((arrayElement) => json[arrayElement]); // this converts our json object to an array
      
        const FinalArray = newArray.reduce((newChartDataArray, currentValue, index) => {
          // find first value where label is same as xx attribute
          const calculateAttributeCount = newChartDataArray.find((value) => value.label === currentValue[attribute]);
          const budgetAmountFloat = parseFloat(currentValue.amount);
          // checks if it is not in our chart data array
          if (!calculateAttributeCount) {
            newChartDataArray.push({
              // add attribute and its value is the amount spent
              label: currentValue[attribute],
              y: budgetAmountFloat
            });
          } else {
            // if it's already in the array, update the value by adding the new amount
            const currentIndex = newChartDataArray.findIndex((value) => value.label === currentValue[attribute]);
            newChartDataArray[currentIndex].y += budgetAmountFloat;
          }
          return newChartDataArray;
        }, []);
      
        console.log(FinalArray, 'array with attribute data for the chart');
        // create chart container and render chart with FinalArray
});
}

window.onload = mainThread;
// NOTES & TO DO
//   - app token from pg county (1000 records issue)
//   - hit pg county when server turns on
//   - presentation: note difficulties with api records
//   - https://dev.socrata.com/foundry/data.princegeorgescountymd.gov/p32t-azw8
