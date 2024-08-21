import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service";
import { getCurrentUserDetail } from "../auth";
import { toast } from "react-toastify";

const AddPost = () => {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);
  const [post, setPost] = useState({
    title: '',
    content: '',
    categoryid: ''
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const contentFieldChanged = (data) => {
    setPost({ ...post, 'content': data });
  };

  const createPost = (event) => {
    event.preventDefault();

    if (post.title.trim() === '') {
      toast.error("post title is required !!");
      return;
    }
    if (post.content.trim() === '') {
      toast.error("post content is required !!");
      return;
    }
    if (post.categoryid === '') {
      toast.error("select some category !!");
      return;
    }

    post['userId'] = user.id;
    doCreatePost(post)
      .then(data => {
        if (image) {
          uploadPostImage(image, data.postid)
            .then(() => {
              toast.success("Image uploaded");
            })
            .catch(error => {
              toast.error("Error in Upload Image");
              console.log(error);
            });
        }
        toast.success("post created");
        setPost({
          title: '',
          content: '',
          categoryid: ''
        });
        setImage(null);
      })
      .catch((error) => {
        toast.error("Post not created due to some error !!");
        console.log(error);
      });
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="wrapper">
      <Card className="shadow-sm border-0 mt-2">
        <CardBody>
          <h3>What's going on in your mind?</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                name="title"
                onChange={fieldChanged}
                value={post.title}
              />
            </div>

            <div className="my-3">
              <Label for="content">Post Content</Label>
              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={contentFieldChanged}
              />
            </div>

            <div className="mt-3">
              <Label for="image">Select Your Image</Label>
              <Input id="image" type="file" onChange={handleFileChange} />
            </div>

            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Enter here"
                className="rounded-0"
                name="categoryid"
                onChange={fieldChanged}
                value={post.categoryid}
              >
                <option disabled value="">--Select category--</option>
                {categories.map((category) => (
                  <option value={category.categoryid} key={category.categoryid}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button type="submit" className="rounded-0" color="primary">
                Create Post
              </Button>
              <Button className="rounded-0 ms-2" color="danger" onClick={() => setPost({ title: '', content: '', categoryid: '' })}>
                Reset Content
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
