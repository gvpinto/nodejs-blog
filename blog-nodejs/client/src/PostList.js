import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentsList from './CommentsList';

const PostList = () => {
    const [posts, setPosts] = useState({});

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const res = await axios.get('http://piercingstripes-linux:4002/posts');
        setPosts(res.data);
    };

    const renderedPosts = Object.values(posts).map((post) => {
        console.log(post);
        return (
            <div className='card' key={post.id} style={{ width: '30%', marginBottom: '20px' }}>
                <div className='card-body'>
                    <h3>{post.title}</h3>
                    <CommentsList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });

    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            {renderedPosts}
        </div>
    );
};

export default PostList;