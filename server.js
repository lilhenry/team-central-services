import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // checks everything in public for matching directory

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-App-Token, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get(async (req, res) => {
     const data = await fetch('https://data.princegeorgescountymd.gov/resource/uh6s-izyj.json$$app_token=APP_TOKEN');
     const json = await data.json();
     console.log('GET request detected');
     // res.header('Access-Control-Allow-Headers', 'X-App-Token');
     res.json(json);
     console.log('GET request detected');
  })
  
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', res.body); // req.body would contain info from form 
    // feeding our server the json 
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/uh6s-izyj.json');
    const json = await data.json();
    res.json(json);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});