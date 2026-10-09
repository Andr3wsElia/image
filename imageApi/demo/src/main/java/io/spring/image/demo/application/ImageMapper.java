package io.spring.image.demo.application;

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

        return Image.builder()
                .name(name)
                .tags(String.join(",", normalizedTags))
                .size(file.getSize())
                .extension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())))
                .file(file.getBytes())
                .build();
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

        return ImageDTO.builder()
                .id(image.getId())
                .url(url)
                .extension(image.getExtension().name())
                .name(image.getName())
                .size(image.getSize())
                .tags(parsedTags)
                .uploadDate(image.getUploadDate().toLocalDate())
                .build();
    }
}
