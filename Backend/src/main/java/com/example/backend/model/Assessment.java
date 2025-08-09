package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)  
    @JoinColumn(name = "course_id")     
    private Course course;

    // Getters
    public Long getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }
    public LocalDate getDate() {
        return date;
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
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public void setCourse(Course course) {
        this.course = course;
    }
}
