package com.interviewplatform.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class SolvedQuestionRequest {

    private Long userId;

    private Long problemId;

    private Integer timeTaken;

    private String notes;

    private String solvedDate;
}