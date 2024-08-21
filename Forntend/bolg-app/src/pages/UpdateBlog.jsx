import React, { useContext, useEffect, useRef, useState } from 'react';
import Base from '../components/Base';
import { useNavigate, useParams } from 'react-router-dom';
import userContext from '../context/userContext';
import { loadPost, updatePost as doUpdatePost } from '../services/post-service';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import JoditEditor from 'jodit-react';
import { loadAllCategories } from '../services/category-service';

function UpdateBlog() {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const { blogId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    loadAllCategories()
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.log(error);
      });

    loadPost(blogId)
      .then(data => {
        setPost({ ...data, categoryid: data.category.categoryid });
      })
      .catch(error => {
        console.log(error);
        toast.error('Error in loading the blog');
      });
  }, []);

  useEffect(() => {
    if (post && post.user.id !== object.user.data.id) {
      toast.error('This is not your post');
      navigate('/');
    }
  }, [post]);

  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value
    });
  };

  const updatePost = event => {
    event.preventDefault();
    console.log(post);
    doUpdatePost(post, post.postid)
      .then(res => {
        console.log(res);
        toast.success('Post updated');
      })
      .catch(error => {
        console.log(error);
        toast.error('Error in updating post');
      });
  };

  const updateHtml = () => {
    return (
      <div className="wrapper">
        <Card className="shadow-sm border-0 mt-2">
          <CardBody>
            <h3>Update Post From Here !!</h3>
            <Form onSubmit={updatePost}>
              <div className="my-3">
                <Label for="title">Post Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter here"
                  className="rounded-0"
                  name="title"
                  value={post.title}
                  onChange={event => handleChange(event, 'title')}
                />
              </div>

              <div className="my-3">
                <Label for="content">Post Content</Label>
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  onChange={newContent => setPost({ ...post, content: newContent })}
                />
              </div>

              <div className="mt-3">
                <Label for="image">Select Post Banner</Label>
                <Input id="image" type="file" onChange={() => {}} />
              </div>

              <div className="my-3">
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="category"
                  placeholder="Enter here"
                  className="rounded-0"
                  name="categoryid"
                  onChange={event => handleChange(event, 'categoryid')}
                  value={post.categoryid}
                >
                  <option disabled value={0}>
                    --Select category--
                  </option>
                  {categories.map(category => (
                    <option value={category.categoryid} key={category.categoryid}>
                      {category.categoryTitle}
                    </option>
                  ))}
                </Input>
              </div>

              <Container className="text-center">
                <Button type="submit" className="rounded-0" color="primary">
                  Update Post
                </Button>
                <Button className="rounded-0 ms-2" color="danger">
                  Reset Content
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  };

  return <Base>{post && updateHtml()}</Base>;
}

export default UpdateBlog;
