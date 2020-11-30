// get json data and return bar chart data list
function prepareData(serverJson) {
  for (let obj = 0; obj < serverJson.length; obj += 1) { 
    const payee = serverJson[obj].payee_name;
    const agency = serverJson[obj].agency;
    const zip = serverJson[obj].zip_code;
    const amount = serverJson[obj].amount;
    const description = serverJson[obj].payment_description;

    // div append just to see/check api data is present
    const API = document.createElement('div');
    API.innerHTML = (`<h4>${payee}</h4>
                      <p>${agency}</p>
                      <p>${zip}</p>
                      <p>${amount}</p> 
                      <p>${description}</p>`);
    $('.section').append(API);
  }
}

// create bar chart
function generateChart(chartData) {

}

// get and produce search results
function createSearch(term, data) {

}

// generate button click -- run server
$('#generate').on('click', async (e) => {
  console.log('generate');
  e.preventDefault();
  const div = $(e.target).serializeArray();
  fetch('/api', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(div),
  }) 
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => prepareData(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});
