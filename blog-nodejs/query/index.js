const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(cors());

posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = {
            id, title, comments: []
        };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        posts[postId].comments.push({
            id, content, status
        });
    }

    if (type === 'CommentUpdated') {
        const { postId, id, content, status } = data;
        const comment = posts[postId].comments.find(comment => comment.id == id);
        comment.status = status;
        comment.content = content;
    }

};

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);
    // console.log(posts);
    res.send({});
});

app.listen(4002, async () => {
    console.log(`Query listening on port 4002`);
    const res = await axios.get('http://piercingstripes-linux:4005/events');

    for (let event of res.data) {
        console.log('Processing event: ', event.type);
        handleEvent(event.type, event.data);
    }
});