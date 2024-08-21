import { Link, useParams } from "react-router-dom";
import Base from "../../components/Base";
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap";
import { useEffect, useState, useRef } from "react";
import { createComment, loadPost } from "../../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../../services/helper";
import { isLoggedIn } from "../../auth";

const PostPage = () => {
    const { postid } = useParams(); 
    const [post, setPost] = useState(null);
    const [comment,setComment] = useState({
        comment:''
    });
    
console.log(post,"post")
    useEffect(() => {
        loadPost(postid)
            .then(data => {
                setPost(data);
            })
            .catch(error => {
                console.error("Error loading post:", error);
                toast.error("Error loading post");
            });
    }, [postid]); 

    const printDate = (numbers) => {
        return new Date(numbers).toLocaleString();
    };

    const submitPost = ()=>{

        if(!isLoggedIn()){
            toast.error("Need to login first !!")
            return
        }
        if(comment.comment.trim()==='')
        {
            return
        }
        createComment(comment,post.postid)
        .then(data=>{
            console.log(data);
    
            toast.success("Comment added.")
            setPost({
                ...post,
                comments:[...post.comments,data.data]
            })
            setComment({
                comment:''
    
            })
        }).catch(error=>{
            console.log(error);
        })
      }
    
       
    return (
        <Base>
            <Container className="mt-4">
                <Link to="/">Home</Link> / {post && <Link to={`/posts/${postid}`}>{post.title}</Link> }

                <Row>
                    <Col md={12}>
                        <Card className="mt-3 ps-2">
                            {post && (
                                <CardBody>
                                    <CardText>
                                        Posted By <b>{post.user.name}</b> on <b>{printDate(post.addedDate)}</b>
                                    </CardText>
                                    <CardText>
                                        <span className="text-muted">{post.category.categoryTitle}</span>
                                    </CardText>
                                    <div className="divider" style={{
                                        width:'100%',
                                        height:'1px',
                                        background:'#e2e2e2'
                                    }}></div>
                                    <CardText className="mt-3">
                                        <h3>{post.title}</h3>
                                    </CardText>
                                    <div className="image-container mt-4 container text-center" style={{maxWidth:'50%'}}>
                                        <img className="img-fluid" src={`${BASE_URL}/post/image/${post.imageName}`} alt="" />
                                    </div>
                                    <CardText className="mt-4" dangerouslySetInnerHTML={{__html:post.content}}></CardText>
                                </CardBody>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row className="my-4">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
            <h3>Comments ({post ? post.comments.length : 0})</h3>

            {post &&
              post.comments.map((c, index) => (
                <Card key={index} className="mt-4 border-0">
                  <CardBody>
                    <CardText>{c.comment}</CardText>
                  </CardBody>
                </Card>
              ))}
            <Card className="mt-4 border-0">
              <CardBody>
               <Input
                type="textarea"
                 placeholder="Enter comment here"
                 value={comment.comment}
                 onChange={(event)=>setComment({comment:event.target.value})}
                 />
                <Button onClick={submitPost} className="mt-2" color="primary" >Submit</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
            </Container>
        </Base>
    );
};

export default PostPage;
