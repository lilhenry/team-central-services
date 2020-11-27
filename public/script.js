$('#breakdown').on('click', async (e) => {
  e.preventDefault();
  const div = $(e.target).serializeArray();
  fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(div)
  }) 
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => {
      const API = document.createElement('div');
      API.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(jsonFromServer)}<br /><br />`;
      $('.container').append(API);
    })
    .catch((err) => {
      console.log(err);
    });
});