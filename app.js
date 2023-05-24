import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables

app.use(express.static('public'))

app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

// create a search route
app.get('/words', (request, response) => {
  console.log(request)
  fetch(
    `https://api.datamuse.com/words?rel_trg=${request.query.rel_trg}&max=40`
  )
    .then(response => {
      return response.text();
    })
    .then(body => {
      let results = JSON.parse(body);
      response.send(results);
    });
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`)
})
