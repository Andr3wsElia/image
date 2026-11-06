package io.spring.image.demo.application.images;

import io.spring.image.demo.domain.entity.Image;
import io.spring.image.demo.domain.enums.ImageExtension;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Component
public class ImageMapper {

    public Image mapToImage(MultipartFile file, String name, List<String> tags) throws IOException {
        List<String> normalizedTags = tags == null ? List.of() : tags.stream()
                .filter(tag -> tag != null && !tag.isBlank())
                .map(tag -> tag.trim().toLowerCase())
                .distinct()
                .toList();

        Image image = new Image();
        image.setName(name);
        image.setTags(String.join(",", normalizedTags));
        image.setSize(file.getSize());
        image.setExtension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())));
        image.setFile(file.getBytes());
        return image;
    }

    public ImageDTO imageToDTO(Image image, String url) {
        List<String> parsedTags = image.getTags() == null || image.getTags().isBlank()
                ? List.of()
                : List.of(image.getTags().split(","))
                        .stream()
                        .map(String::trim)
                        .filter(tag -> !tag.isBlank())
                        .map(String::toLowerCase)
                        .toList();

        return new ImageDTO(
                image.getId(),
                url,
                image.getName(),
                image.getExtension().name(),
                image.getSize(),
                parsedTags,
                image.getUploadDate().toLocalDate()
        );
    }
}
