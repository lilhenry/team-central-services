/* const generatechart= document.querySelector('.generate');

generatechart.onclick = function() {
    console.log('generate was clicked! now get data in here')
} */

const { json } = require("express");

// generate bar chart
function generatechart(jsonfromserver) {
    console.log('in generatechart function, data has presumably been passed in:');
    console.log(jsonfromserver);
}

document.body.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = $(e.target).serializeArray();

    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    .then((datafromserver) => datafromserver.json())
    .then((jsonfromserver) => generatechart(jsonfromserver))
    .catch((err) => {
        console.log(err);
    });
});