document.body.addEventListener('click', async (e) => {
  e.preventDefault();
  const div = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(div)
  }) 
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => {
      const API = document.querySelector('div');
      API.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(jsonFromServer)}<br /><br />`;
      console.log(jsonFromServer);
      console.log(API);
    })
    .catch((err) => {
      console.log(err);
    });
});