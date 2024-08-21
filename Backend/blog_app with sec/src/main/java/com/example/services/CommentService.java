package com.example.services;

import com.example.paylods.CommentDto;

public interface CommentService {

    CommentDto createComment(CommentDto commentDto,Integer postId);
    void deleteComment(Integer commentId);

    interface RoleService {
    }
}
