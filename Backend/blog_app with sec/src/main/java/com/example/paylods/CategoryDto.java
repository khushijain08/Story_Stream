package com.example.paylods;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CategoryDto {

    private Integer categoryid;
    @NotBlank
    @Size(min = 4,message = "Min Size of category is 4")
    private String categoryTitle;
    @NotBlank
    @Size(min = 10,message = "Min Size of category desc is 10")
    private String categoryDescription;
}
