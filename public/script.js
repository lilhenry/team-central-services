// this function will eventually create the divs based on the returned array
async function createSearch() { // this will take the array with selected attribute as a parameter 
  // iterates over array and creates a div to store each result
}

// this function creates the chart container using the returned x and y values array
async function generateChart() { // this will take the array with selected attribute as a parameter 
  // , the {x: attribute, y: value} for canvasJS (similar to the makeOptions fxn)
  // choose canvasJS colors for the bars
}

// this is called to check if the search button is clicked (it creates the event listener for the search button)
async function searchButtonClicked(enteredInput, serverfromjson) { // takes in user entered input as parameter
  // this is where the .filter() and more will go
  $('#search-btn').on('click', (e) => { // this line makes the function run only IF the search button is clicked
    e.preventDefault();

    const filteredJsonBySearchTerm = serverfromjson.filter((budgetEntry) => {
      const srch = document.querySelector('#search').value;
      const regex = new RegExp(srch, 'gi'); // This matches case-insensitively through the whole string
      // console.log(budgetEntry.target.zip_code.match(regex), 'regex');
      // check input in all attributes -- need to condense the line however
      console.log(regex, 'in regexx');
      console.log(srch, 'in filter');
      console.log(budgetEntry.zip_code, 'in attr');

      return budgetEntry.zip_code.match(regex); 
    });

    // the rest for now is just for testing -- it creates divs to show all our data
    const have = document.createElement('p');
    have.className = 'is-size-2 is-uppercase is-centered';
    have.textContent = 'Our data: ';

    const brkdwn = document.querySelector('#breakdown');
    brkdwn.innerHTML = 'SEARCH';

    $('.search-results').append(have);
    for (let obj = 0; obj < filteredJsonBySearchTerm.length; obj += 1) {
      const payee = filteredJsonBySearchTerm[obj].payee_name;
      const agency = filteredJsonBySearchTerm[obj].agency;
      const zip = filteredJsonBySearchTerm[obj].zip_code;
      const amount = filteredJsonBySearchTerm[obj].amount;
      const description = filteredJsonBySearchTerm[obj].payment_description;

      // div append just to see/check api data is present
      const API = document.createElement('div');
      API.innerHTML = `<h4><span class='is-size-4'>payee:  </span>${payee}</h4>
                        <p><span class='is-size-4'>agency:  </span>${agency}</p>
                        <p><span class='is-size-4'>zip:  </span>${zip}</p>
                        <p><span class='is-size-4'>amount:  </span>${amount}</p>
                        <p><span class='is-size-4'>description:  </span>${description}</p>
                        <p>----------------</p>
                        <br>`;
      $('.search-results').append(API);
    }
    createSearch(); // creates search results divs, takes in array (.filter fxn) from search bttn as parameter
    const searchquery = document.querySelector('#search').value;
    console.log('search query post ', searchquery);
  });
}

// this is called to check if the generate button is clicked (it creates the event listener for the generate button)
async function generateButtonClicked(serverJson) { // takes in json data from server as parameter
  // this  is where the .reduce() will go
  $('#generate').on('click', (e) => {
    e.preventDefault();

    const gen = document.querySelector('#breakdown');
    gen.innerHTML = 'GENERATE WAS CLICKED!';

    // render a bar chart
    // returns the array with the attribute and count
    generateChart(); // takes in array (.reduce fxn) from button and render chart container
    const attribute = document.querySelector('input[name="chart-list"]:checked').value;
    console.log('attribute post', attribute);
  });
}
 
function main(jsonFromServer) {

  for (let obj = 0; obj < jsonFromServer.length; obj += 1) {
  console.log(jsonFromServer[obj].zip_code, 'jsnzip');
  }
  // radio button attribute value
  const attribute = document.querySelector('input[name="chart-list"]:checked').value;
  console.log('attribute ', attribute);

  // search bar value
  const searchquery = document.querySelector('#search').value;
  console.log('search query ', searchquery);

  // creates button listeners and runs fxn with selected/entered data attribute
  generateButtonClicked(jsonFromServer); // runs once generate button is clicked
  searchButtonClicked(searchquery, jsonFromServer); // runs once search button is clicked
}



// runs on window load: gets api data from server
$(window).on('load', async (e) => {

  e.preventDefault();
  const div = $(e.target).serializeArray();
  fetch('http://localhost:3000/api', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(div),
  }) 
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => main(jsonFromServer))
    .catch((err) => {
      console.log(err, 'error');
    });
});
// questions: 
// is it better to call a fxn with a listener inside or run the fxn inside a listener?
// change generateChart() to renderChart()?