package com.example.backend.controller;

import com.example.backend.model.Assessment;
import com.example.backend.model.Course;
import com.example.backend.repository.AssessmentRepository;
import com.example.backend.repository.CourseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createAssessment(@RequestBody Assessment assessment) {
        try {
            
            if (assessment.getCourse() != null && assessment.getCourse().getId() != null) {
                Optional<Course> courseOpt = courseRepository.findById(assessment.getCourse().getId());
                if (!courseOpt.isPresent()) {
                    return ResponseEntity.badRequest().body("الدورة غير موجودة");
                }
                assessment.setCourse(courseOpt.get());
            } else {
                return ResponseEntity.badRequest().body("يجب اختيار دورة");
            }

            Assessment saved = assessmentRepository.save(assessment);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("خطأ في إنشاء التقييم");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAssessment(@PathVariable Long id, @RequestBody Assessment assessmentData) {
        Optional<Assessment> optionalAssessment = assessmentRepository.findById(id);
        if (!optionalAssessment.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Assessment assessment = optionalAssessment.get();
     assessment.setTitle(assessmentData.getTitle());
;
        assessment.setDate(assessmentData.getDate());

        if (assessmentData.getCourse() != null && assessmentData.getCourse().getId() != null) {
            Optional<Course> courseOpt = courseRepository.findById(assessmentData.getCourse().getId());
            if (!courseOpt.isPresent()) {
                return ResponseEntity.badRequest().body("الدورة غير موجودة");
            }
            assessment.setCourse(courseOpt.get());
        } else {
            return ResponseEntity.badRequest().body("يجب اختيار دورة");
        }

        Assessment updated = assessmentRepository.save(assessment);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAssessment(@PathVariable Long id) {
        if (!assessmentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        assessmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
