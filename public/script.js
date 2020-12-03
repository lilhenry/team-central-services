// main thread
async function mainthread() {

  // data retrieval
  const data = await fetch('https://data.princegeorgescountymd.gov/resource/uh6s-izyj.json');
  const json = await data.json();

  // *********************
  // generate button click
  const generatebutton = document.querySelector('#generate');
  generatebutton.addEventListener('click', (e) => {

    // prevent default
    e.preventDefault();

    // debugging
    const outputheader = document.querySelector('#breakdown');
    outputheader.innerHTML = 'GENERATE WAS CLICKED';

    // radio button value
    const attribute = document.querySelector('input[name="chart-list"]:checked').value;
    console.log('attribute ', attribute);
  });

  // *******************
  // search button click
  const searchbutton = document.querySelector('#search-btn');
  searchbutton.addEventListener('click', (e) => {

    // prevent default
    e.preventDefault();

    // debugging
    const outputheader = document.querySelector('#breakdown');
    outputheader.innerHTML = 'SEARCH WAS CLICKED';

    // search bar value, debugging
    const searchquery = document.querySelector('#search').value;
    console.log('search query = ', searchquery);
  });
}

window.onload = mainthread;


// NOTES & TO DO
//   - app token from pg county (1000 records issue)
//   - hit pg county when server turns on
//   - presentation: note difficulties with api records
//   - https://dev.socrata.com/foundry/data.princegeorgescountymd.gov/p32t-azw8