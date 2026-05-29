package com.interviewplatform.backend.controller;

import com.interviewplatform.backend.dto.SolvedQuestionRequest;
import com.interviewplatform.backend.service.SolvedQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.interviewplatform.backend.model.SolvedQuestion;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/solved")

public class SolvedQuestionController {

    @GetMapping("/streak/{userId}")
public int getCurrentStreak(
        @PathVariable Long userId
) {

    return solvedQuestionService
            .getCurrentStreak(userId);
}
    @GetMapping("/recommendation/{userId}")
public String getRecommendation(
        @PathVariable Long userId
) {

    return solvedQuestionService
            .getRecommendation(userId);
}

    @GetMapping("/weakest-topic/{userId}")
public String getWeakestTopic(
        @PathVariable Long userId
) {

    return solvedQuestionService
            .getWeakestTopic(userId);
}

    @GetMapping("/readiness-score/{userId}")
public Map<String, Integer> getReadinessScore(
        @PathVariable Long userId
) {

    return solvedQuestionService
            .getReadinessScore(userId);
}

    @GetMapping("/most-practiced-topic/{userId}")
public String getMostPracticedTopic(
        @PathVariable Long userId
) {

    return solvedQuestionService
            .getMostPracticedTopic(userId);
}

    @GetMapping("/average-time/{userId}")
public Double getAverageSolveTime(
        @PathVariable Long userId
) {

    return solvedQuestionService
            .getAverageSolveTime(userId);
}


    @GetMapping("/easy/{userId}")
public Long getEasyCount(
        @PathVariable Long userId
) {

    return solvedQuestionService.getEasyCount(userId);
}

@GetMapping("/medium/{userId}")
public Long getMediumCount(
        @PathVariable Long userId
) {

    return solvedQuestionService.getMediumCount(userId);
}

@GetMapping("/hard/{userId}")
public Long getHardCount(
        @PathVariable Long userId
) {

    return solvedQuestionService.getHardCount(userId);
}
    @GetMapping("/count/{userId}")
public Long getSolvedCount(
        @PathVariable Long userId
) {

    return solvedQuestionService.getSolvedCount(userId);
}

    @GetMapping("/user/{id}")
public List<SolvedQuestion> getSolvedQuestionsByUser(
        @PathVariable Long id
) {

    return solvedQuestionService.getSolvedQuestionsByUser(id);
}

    @GetMapping
public List<SolvedQuestion> getAllSolvedQuestions() {

    return solvedQuestionService.getAllSolvedQuestions();
}

    @Autowired
    private SolvedQuestionService solvedQuestionService;

    @PostMapping
    public String addSolvedQuestion(
            @RequestBody SolvedQuestionRequest request
    ) {

        return solvedQuestionService.addSolvedQuestion(request);
    }
}