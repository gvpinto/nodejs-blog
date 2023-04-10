const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');



const app = express();
app.use(bodyParser.json());
const posts = {};


app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const postsId = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[postsId] = {
        title
    };
    res.status(201).send(posts[postsId]);
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});