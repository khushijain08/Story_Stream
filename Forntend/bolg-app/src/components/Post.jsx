import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardText } from 'reactstrap';
import { getCurrentUserDetail, isLoggedIn } from '../auth';
import userContext from '../context/userContext';

function Post({ post = { id: -1, postid: 0, title: "This is default post title", content: "This is default post content" }, deletePost }) {
    // Check if post content is a string before applying substring
    const truncatedContent = typeof post.content === 'string' ? post.content.substring(0, 50) + "....." : post.content;
    const userContextData = useContext(userContext);
    const [user, setUser] = useState(null);
    const [login, setLogin] = useState(null);

    useEffect(() => {
        setUser(getCurrentUserDetail());
        setLogin(isLoggedIn());
    }, []);

    return (
        <Card className='border-0 shadow-sm mt-4'>
            <CardBody>
                <h1>{post.title}</h1>
                <CardText dangerouslySetInnerHTML={{ __html: truncatedContent }} />
                <div>
                    <Link className="btn btn-secondary border-0" to={'/posts/' + post.postid}>Read More</Link>
                    {userContextData.user.login && (user && user.id === post.user.id) && (
                        <Button onClick={() => deletePost(post.postid)} color='danger' className='ms-2'>Delete</Button>
                    )}
                    {userContextData.user.login && (user && user.id === post.user.id) && (
                        <Button tag={Link} to={`/user/update-blog/${post.postid}`} color='warning' className='ms-2'>Update</Button>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

export default Post;
