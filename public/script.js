while (true) {
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  }) 
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => {
      const API = document.createElement('div');
      API.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(jsonFromServer)}<br /><br />`;
      $('body').append(API);
    })
    .catch((err) => {
      console.log(err);
    });
}