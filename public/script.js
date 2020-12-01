function range(int) {
  const arr = [];
  for (let num = 0; num < int; num += 1) {
    arr.push(num);
  }
  return arr;
}

function getRandomIntInclusive(min, max) {
  const min1 = Math.ceil(min);
  const max1 = Math.floor(max);
  return Math.floor(Math.random() * (max1 - min1 + 1) + min1); // The maximum is inclusive and the minimum is inclusive
}

async function createSearch(term, data) {
  $('#search').on('click', async (e) => {
    e.preventDefault();
    // return search results list
  });
}

async function generateChart() {
  $('#generate').on('click', async (e) => {
    e.preventDefault();
    // render a bar chart
  });
}

// json --> array, then array --> bar chart
function prepareData(serverJson) {
  // make an empty array
  const data = range(serverJson.length);
  
  // get attribute from submitted form data

  // map data into empty array using attribute
  const newdata = data.map((i) => {
    
  });

  // call createSearch
  // call generateChart

  createSearch(serverJson); // search button event listener
  const have = document.createElement('p');
  have.className = 'title is-uppercase is-centered';
  have.textContent = 'Our data: ';
  $('.container').append(have);
  for (let obj = 0; obj < serverJson.length; obj += 1) { 
    const payee = serverJson[obj].payee_name;
    const agency = serverJson[obj].agency;
    const zip = serverJson[obj].zip_code;
    const amount = serverJson[obj].amount;
    const description = serverJson[obj].payment_description;

    // div append just to see/check api data is present
    const API = document.createElement('div');
    API.innerHTML = `<h4><span class='is-size-4'>payee:  </span>${payee}</h4>
                      <p><span class='is-size-4'>agency:  </span>${agency}</p>
                      <p><span class='is-size-4'>zip:  </span>${zip}</p>
                      <p><span class='is-size-4'>amount:  </span>${amount}</p>
                      <p><span class='is-size-4'>description:  </span>${description}</p>
                      <p>----------------</p>
                      <br>`;
    $('.container').append(API);
  }
}

// runs on window load
$('#generate').on('click', async (e) => {
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
      console.log(err, 'error');
    });
});
