import { privateAxios, myAxios } from "./helper"; // Import both axios instances

// Create post function
export const createPost = (postData) => {
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryid}/posts`, postData)
        .then(response => response.data);
};

// Get all posts
export const loadAllPosts = (pageNumber, pageSize) => {
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
        .then(response => response.data);
};

// Load single post of given id
export const loadPost = (postid) => {
  return myAxios.get(`/posts/${postid}`)
    .then(response => response.data)
    .catch(error => {
      throw error; // Re-throw the error to be caught by the caller
    });
};


// Create a comment on a post
export const createComment = (comment,postId)=>{
    return privateAxios.post(`/post/${postId}/comments`,comment)
  }

//upload post image

export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image); // Corrected "iamge" to "image"

  return privateAxios.post(`/post/image/upload/${postId}`, formData) // Corrected URL to include postId
    .then((response) => response.data);
};

//get category wise post
export function loadPostCategoryWise(categoryId) {
  return privateAxios
    .get(`/category/${categoryId}/posts`)
    .then(response => response.data)
}

export function loadPostUserWise(userid){
  return privateAxios.get(`/user/${userid}/posts`).then(response=>response.data)
}

//delete post
// post-service.js

export const deletePostService = (postId) => {
  return privateAxios.delete(`/posts/${postId}`)
      .then(response => response.data)
      .catch(error => {
          throw new Error("Error deleting post: " + error.message);
      });
};

// export const updatePostService = async (postData) => {
//   try {
//     const response = await privateAxios.put(`/posts/${postData.postid}`, postData);
//     return response.data; // Assuming the response contains the updated post data
//   } catch (error) {
//     throw error; // Re-throw the error to be caught by the caller
//   }
// };

//update 
export function updatePost(post,postid){
  console.log(post)
  return privateAxios.put(`/posts/${postid}`,post).then((resp)=>resp.data)
}

