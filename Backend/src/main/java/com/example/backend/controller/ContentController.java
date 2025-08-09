package com.example.backend.controller;

import com.example.backend.model.Content;
import com.example.backend.model.Course;
import com.example.backend.repository.ContentRepository;
import com.example.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/contents")  
public class ContentController {

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Content> getAllContent() {
        return contentRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createContent(
            @RequestParam("title") String title,
            @RequestParam("instructorName") String instructorName,
            @RequestParam("courseId") Long courseId,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        try {
            Content content = new Content();
            content.setTitle(title);
            content.setInstructorName(instructorName);

            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            content.setCourse(course);

            if (file != null && !file.isEmpty()) {
                String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename(); // لتفادي التكرار
                Path uploadDir = Paths.get("uploads");
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                Path filepath = uploadDir.resolve(filename);
                Files.copy(file.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);
                content.setPdfUrl("/uploads/" + filename);
            }

            Content savedContent = contentRepository.save(content);
            return ResponseEntity.ok(savedContent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("خطأ في حفظ المحتوى");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateContent(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("instructorName") String instructorName,
            @RequestParam("courseId") Long courseId,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        try {
            Content content = contentRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Content not found"));

            content.setTitle(title);
            content.setInstructorName(instructorName);

            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            content.setCourse(course);

            if (file != null && !file.isEmpty()) {
                String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path uploadDir = Paths.get("uploads");
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                Path filepath = uploadDir.resolve(filename);
                Files.copy(file.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);
                content.setPdfUrl("/uploads/" + filename);
            }

            Content updatedContent = contentRepository.save(content);
            return ResponseEntity.ok(updatedContent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("خطأ في تعديل المحتوى");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContent(@PathVariable Long id) {
        try {
            contentRepository.deleteById(id);
            return ResponseEntity.ok("تم حذف المحتوى بنجاح");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("خطأ في حذف المحتوى");
        }
    }
}
