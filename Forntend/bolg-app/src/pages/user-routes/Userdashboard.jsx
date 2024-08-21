import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import AddPost from "../../components/AddPost";
import { Container } from "reactstrap";
import { getCurrentUserDetail } from "../../auth";
import { loadPostUserWise, deletePostService } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";

const Userdashboard = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setUser(getCurrentUserDetail());
        loadPostData();
    }, []);

    function loadPostData() {
        loadPostUserWise(getCurrentUserDetail().id)
            .then(data => {
                setPosts([...data]);
            })
            .catch(error => {
                console.log(error);
                toast.error("Error loading posts");
            });
    }

    // Function to delete post
    const deletePost = (postid) => {
        deletePostService(postid)
            .then(res => {
                console.log(res);
                toast.success("Post is deleted...");
                let newPosts = posts.filter(p => p.postid !== postid);
                setPosts([...newPosts]);
            })
            .catch(error => {
                console.log(error);
                toast.error("Error deleting post");
            });
    };

    return (
        <Base>
            <Container>
                <AddPost />
                <h1 className="my-3">Post Count: ({posts.length})</h1>
                {posts.map((post, index) => (
                    <Post key={index} post={post} deletePost={deletePost} />
                ))}
            </Container>
        </Base>
    );
};

export default Userdashboard;
