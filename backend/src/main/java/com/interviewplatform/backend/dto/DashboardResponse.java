package com.interviewplatform.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class DashboardResponse {

    private long currentStreak;


    private Long totalSolved;

    private Long easyCount;

    private Long mediumCount;

    private Long hardCount;

    private Double averageSolveTime;

    private String mostPracticedTopic;

    private String weakestTopic;

    private String recommendation;

    
}