package io.spring.image.demo.application.images;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ImageDTO {

    private String id;
    private String url;
    private String name;
    private String extension;
    private Long size;
    private List<String> tags;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate uploadDate;

    public ImageDTO() {
    }

    public ImageDTO(String id, String url, String name, String extension, Long size, List<String> tags, LocalDate uploadDate) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.extension = extension;
        this.size = size;
        this.tags = tags;
        this.uploadDate = uploadDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public LocalDate getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDate uploadDate) {
        this.uploadDate = uploadDate;
    }
}
