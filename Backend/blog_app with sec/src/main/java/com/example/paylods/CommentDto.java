package com.example.paylods;

import com.example.entities.Post;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentDto {

    private int id;
    private String comment;


}
