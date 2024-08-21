  package com.example.repositories;

import com.example.entities.Category;
import com.example.entities.Post;
import com.example.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepo extends JpaRepository<Post,Integer> {
        List<Post> findByUser(User user);
        List<Post> findByCategory(Category category);
        List<Post> findByTitleContaining(String title);
}
