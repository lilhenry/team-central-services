function prepareData(serverJson) {
  for (let obj = 0; obj < serverJson.length; obj += 1) { 
    const payee = serverJson[obj].payee_name;
    const agency = serverJson[obj].agency;
    const zip = serverJson[obj].zip_code;
    const amount = serverJson[obj].amount;
    const description = serverJson[obj].payment_description;

    const API = document.createElement('div');
    API.innerHTML = `<h4>${payee}</h4>
                      <p>${agency}</p>
                      <p>${zip}</p>
                      <p>${amount}</p> 
                      <p>${description}</p>`;
    $('.container').append(API);
    document.body.style.backgroundColor = '#f3f3f3';
  }
}

$('#generate').on('click', async (e) => {
  console.log('generate');
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
    .then((jsonFromServer) => prepareData(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});    