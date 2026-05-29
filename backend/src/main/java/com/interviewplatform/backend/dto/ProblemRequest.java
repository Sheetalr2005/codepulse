package com.interviewplatform.backend.dto;

public class ProblemRequest {

    private Long userId;

    public Long getUserId() {
    return userId;
}

public void setUserId(Long userId) {
    this.userId = userId;
}

    private String title;

    private String difficulty;

    private String topic;

    private String platform;

    private String link;

    // NEW FIELDS

    private Boolean solved;

    private Boolean favorite;

    private String coreSubject;

    // GETTERS AND SETTERS

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
}