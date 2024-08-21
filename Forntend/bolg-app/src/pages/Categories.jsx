import React, { useEffect, useState } from 'react';
import Base from '../components/Base';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import NewFeed from '../components/NewFeed';
import CategorySideMenu from '../components/CategorySideMenu';
import { loadPostCategoryWise } from '../services/post-service';
import { toast } from 'react-toastify';
import Post from '../components/Post';

function Categories() {
    const [posts, setPosts] = useState([]);
    const { categoryid } = useParams();

    useEffect(() => {
        console.log(categoryid);
        // Load posts category-wise only if categoryid changes
        loadPostCategoryWise(categoryid)
            .then(data => {
                setPosts([...data]);
            })
            .catch(error => {
                console.log(error);
                toast.error("Error in loading posts");
            });
    }, [categoryid]); // Add categoryid to the dependency array to ensure useEffect runs when it changes

    return (
        <Base>
            <Container className="mt-3">
                <Row>
                    <Col md={2} className="pt-5">
                        <CategorySideMenu />
                    </Col>
                    <Col md={10}>
                        <h1>Blogs Count ({posts.length})</h1>
                        {posts.map((post, index) => (
                            <Post key={index} post={post} />
                        ))}
                        {posts.length<=0?<h1>No post in this category</h1> :''}
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default Categories;
