import React, { useEffect, useState } from 'react';
import { deletePostService, loadAllPosts } from '../services/post-service';
import { Row, Col, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap';
import Post from './Post';
import { toast } from 'react-toastify';

function NewFeed() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
    lastPage: false,
    pageNumber: 0
  });

  useEffect(() => {
    // Load all posts when the component mounts
    loadAllPosts(0, postContent.pageSize)
      .then((data) => {
        setPostContent(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading posts");
      });
  }, []);

  const changePage = (pageNumber = 0) => {
    if (pageNumber < 0 || pageNumber >= postContent.totalPages) {
      return;
    }

    loadAllPosts(pageNumber, postContent.pageSize)
      .then((data) => {
        setPostContent(data);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading posts");
      });
  };

  const handleDeletePost = (postId) => {
    deletePostService(postId)
      .then(res => {
        console.log(res);
        toast.success("Post is deleted...");
        const newContent = postContent.content.filter(post => post.postid !== postId);
        setPostContent({
          ...postContent,
          content: newContent
        });
      })
      .catch(error => {
        console.log(error);
        toast.error("Error deleting post");
      });
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 12 }}>
          <h1>Blogs Count ({postContent.totalElements})</h1>

          {postContent.content.map((post) => (
            <Post deletePost={handleDeletePost} post={post} key={post.postid} />
          ))}

          <Container className='text-center mt-3'>
            <Pagination size='lg'>
              <PaginationItem disabled={postContent.pageNumber === 0}>
                <PaginationLink previous onClick={() => changePage(postContent.pageNumber - 1)}>
                  Previous
                </PaginationLink>
              </PaginationItem>

              {[...Array(postContent.totalPages)].map((_, index) => (
                <PaginationItem active={index === postContent.pageNumber} key={index}>
                  <PaginationLink onClick={() => changePage(index)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem disabled={postContent.lastPage}>
                <PaginationLink next onClick={() => changePage(postContent.pageNumber + 1)}>
                  Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
