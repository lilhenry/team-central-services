// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get((req, res) => {
    res.send(`Team Project for ${process.env.NAME}`);
  })
  .post(async(req, res) => {
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/uh6s-izyj.json');
    const json = await data.json();
    console.log(json);
    res.json(json);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
