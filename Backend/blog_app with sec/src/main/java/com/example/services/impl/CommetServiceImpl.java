package com.example.services.impl;

import com.example.entities.Comment;
import com.example.entities.Post;
import com.example.exceptions.ResourceNotFoundException;
import com.example.paylods.CommentDto;
import com.example.repositories.CommentRepo;
import com.example.repositories.PostRepo;
import com.example.services.CommentService;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommetServiceImpl implements CommentService {

    @Autowired
    private PostRepo postRepo;
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public CommentDto createComment(CommentDto commentDto, Integer postId) {
        Post post =this.postRepo.findById(postId)
                .orElseThrow(()->new ResourceNotFoundException("Post","post id",postId));

        Comment comment = this.modelMapper.map(commentDto, Comment.class);
        comment.setPost(post);
        Comment savedComment = this.commentRepo.save(comment);


        return this.modelMapper.map(savedComment, CommentDto.class);
    }

    @Override
    public void deleteComment(Integer commentId) {
        Comment com = this.commentRepo.findById(commentId)
                .orElseThrow(()-> new ResourceNotFoundException("Comment","comment id",commentId));

        this.commentRepo.delete(com);

    }
}
