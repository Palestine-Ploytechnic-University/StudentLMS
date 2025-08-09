package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;          
    private String pdfUrl;          
    private String instructorName;  
    private LocalDate createdAt;

    
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    // Getters
    public Long getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }
    public String getPdfUrl() {
        return pdfUrl;
    }
    public String getInstructorName() {
        return instructorName;
    }
    public LocalDate getCreatedAt() {
        return createdAt;
    }
    public Course getCourse() {
        return course;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }
    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }
    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
    public void setCourse(Course course) {
        this.course = course;
    }
}
