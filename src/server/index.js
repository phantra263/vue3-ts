import express from 'express';
import cors from 'cors';
import { today, thisMonth, thisWeek } from '../postMock.js';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const allPosts = [today, thisWeek, thisMonth];

app.get('/', (req, res) => {
  res.json(allPosts);
});

app.get('/posts', (req, res) => {
  res.json(allPosts);
});

app.post('/posts', (req, res) => {
  const post = { ...req.body, id: (Math.random() * 10000).toFixed() };
  allPosts.push(post);
  res.json(post);
});

app.listen(8000, () => {
  console.log('listening on port 8000');
});
