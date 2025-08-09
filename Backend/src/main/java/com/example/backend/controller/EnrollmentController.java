package com.example.backend.controller;

import com.example.backend.model.Enrollment;
import com.example.backend.model.User;
import com.example.backend.model.Course;
import com.example.backend.repository.EnrollmentRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.CourseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    @GetMapping("/course/{courseId}")
    public List<Enrollment> getEnrollmentsByCourse(@PathVariable Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    @GetMapping("/user/{userId}")
    public List<Enrollment> getEnrollmentsByUser(@PathVariable Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<?> createEnrollment(@RequestBody Enrollment enrollment) {
        try {
            if (enrollment.getUser() == null || enrollment.getUser().getId() == null) {
                return ResponseEntity.badRequest().body("يجب تحديد المستخدم");
            }
            Optional<User> userOpt = userRepository.findById(enrollment.getUser().getId());
            if (!userOpt.isPresent()) {
                return ResponseEntity.badRequest().body("المستخدم غير موجود");
            }

            if (enrollment.getCourse() == null || enrollment.getCourse().getId() == null) {
                return ResponseEntity.badRequest().body("يجب تحديد الدورة");
            }
            Optional<Course> courseOpt = courseRepository.findById(enrollment.getCourse().getId());
            if (!courseOpt.isPresent()) {
                return ResponseEntity.badRequest().body("الدورة غير موجودة");
            }

            enrollment.setUser(userOpt.get());
            enrollment.setCourse(courseOpt.get());

            if (enrollment.getEnrollmentDate() == null) {
                enrollment.setEnrollmentDate(LocalDate.now());
            }

            Enrollment saved = enrollmentRepository.save(enrollment);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("خطأ في إنشاء التسجيل: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEnrollment(@PathVariable Long id) {
        if (!enrollmentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        enrollmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
