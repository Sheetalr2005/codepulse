package com.interviewplatform.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "problems")

public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private LocalDate solvedDate;

    private String title;

    private String difficulty;

    private String topic;

    private String platform;

    private String link;

    private String notes;

    // NEW FIELDS

    private Boolean solved;

    private Boolean favorite;

    private String coreSubject;
    @ManyToOne
@JoinColumn(name = "user_id")
private User user;

public User getUser() {
    return user;
}

public void setUser(User user) {
    this.user = user;
}


    // GETTERS AND SETTERS


    public String getNotes() {
    return notes;
}

public void setNotes(String notes) {
    this.notes = notes;
}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Boolean getSolved() {
        return solved;
    }

    public void setSolved(Boolean solved) {
        this.solved = solved;
    }

    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    public String getCoreSubject() {
        return coreSubject;
    }

    public void setCoreSubject(String coreSubject) {
        this.coreSubject = coreSubject;
    }

    public LocalDate getSolvedDate() {
    return solvedDate;
}

public void setSolvedDate(LocalDate solvedDate) {
    this.solvedDate = solvedDate;
}

    
}