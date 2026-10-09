package io.spring.image.demo.application;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class ImageDTO {
    private String id;
    private String url;
    private String name;
    private String extension;
    private Long size;
    private List<String> tags;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate uploadDate;
}
