package com.interviewplatform.backend.service;

import com.interviewplatform.backend.dto.SolvedQuestionRequest;
import com.interviewplatform.backend.model.Problem;
import com.interviewplatform.backend.model.SolvedQuestion;
import com.interviewplatform.backend.model.User;
import com.interviewplatform.backend.repository.ProblemRepository;
import com.interviewplatform.backend.repository.SolvedQuestionRepository;
import com.interviewplatform.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.time.temporal.ChronoUnit;

import java.time.LocalDate;

@Service

public class SolvedQuestionService {
    public int getCurrentStreak(Long userId) {

    List<SolvedQuestion> solvedQuestions =
            solvedQuestionRepository
                    .findByUserIdOrderBySolvedDateDesc(userId);

    if (solvedQuestions.isEmpty()) {
        return 0;
    }

    int streak = 1;

    for (int i = 0; i < solvedQuestions.size() - 1; i++) {

        LocalDate current =
                solvedQuestions.get(i).getSolvedDate();

        LocalDate next =
                solvedQuestions.get(i + 1).getSolvedDate();

        long daysBetween =
                ChronoUnit.DAYS.between(next, current);

        if (daysBetween == 1) {
            streak++;
        } else if (daysBetween > 1) {
            break;
        }
    }

    return streak;
}

    public String getRecommendation(Long userId) {

    String weakestTopic =
            getWeakestTopic(userId);

    return "Practice more "
            + weakestTopic
            + " problems";
}
    

    public String getWeakestTopic(Long userId) {

    List<SolvedQuestion> solvedQuestions =
            solvedQuestionRepository.findByUserId(userId);

    Map<String, Integer> topicCount =
            new HashMap<>();

    for (SolvedQuestion solvedQuestion :
            solvedQuestions) {

        String topic =
                solvedQuestion.getProblem().getTopic();

        topicCount.put(
                topic,
                topicCount.getOrDefault(topic, 0) + 1
        );
    }

    String weakestTopic = "";
    int minCount = Integer.MAX_VALUE;

    for (Map.Entry<String, Integer> entry :
            topicCount.entrySet()) {

        if (entry.getValue() < minCount) {

            minCount = entry.getValue();
            weakestTopic = entry.getKey();
        }
    }

    return weakestTopic;
}

    public Map<String, Integer> getReadinessScore(
        Long userId
) {

    List<SolvedQuestion> solvedQuestions =
            solvedQuestionRepository.findByUserId(userId);

    Map<String, Integer> topicCount =
            new HashMap<>();

    for (SolvedQuestion solvedQuestion :
            solvedQuestions) {

        String topic =
                solvedQuestion.getProblem().getTopic();

        topicCount.put(
                topic,
                topicCount.getOrDefault(topic, 0) + 1
        );
    }

    Map<String, Integer> readinessScore =
            new HashMap<>();

    for (Map.Entry<String, Integer> entry :
            topicCount.entrySet()) {

        int solvedCount = entry.getValue();

        int score = Math.min(solvedCount * 20, 100);

        readinessScore.put(
                entry.getKey(),
                score
        );
    }

    return readinessScore;
}


    public String getMostPracticedTopic(Long userId) {

    List<SolvedQuestion> solvedQuestions =
            solvedQuestionRepository.findByUserId(userId);

    Map<String, Integer> topicCount = new HashMap<>();

    for (SolvedQuestion solvedQuestion : solvedQuestions) {

        String topic =
                solvedQuestion.getProblem().getTopic();

        topicCount.put(
                topic,
                topicCount.getOrDefault(topic, 0) + 1
        );
    }

    String mostPracticedTopic = "";
    int maxCount = 0;

    for (Map.Entry<String, Integer> entry :
            topicCount.entrySet()) {

        if (entry.getValue() > maxCount) {

            maxCount = entry.getValue();
            mostPracticedTopic = entry.getKey();
        }
    }

    return mostPracticedTopic;
}

    public Double getAverageSolveTime(Long userId) {

    return solvedQuestionRepository
            .getAverageSolveTime(userId);
}


    public Long getEasyCount(Long userId) {

    return solvedQuestionRepository
            .countByUserIdAndProblemDifficulty(
                    userId,
                    "Easy"
            );
}

public Long getMediumCount(Long userId) {

    return solvedQuestionRepository
            .countByUserIdAndProblemDifficulty(
                    userId,
                    "Medium"
            );
}

public Long getHardCount(Long userId) {

    return solvedQuestionRepository
            .countByUserIdAndProblemDifficulty(
                    userId,
                    "Hard"
            );
}

    public Long getSolvedCount(Long userId) {

    return solvedQuestionRepository.countByUserId(userId);
}

    public List<SolvedQuestion> getSolvedQuestionsByUser(Long userId) {

    return solvedQuestionRepository.findByUserId(userId);
}

    @Autowired
    private SolvedQuestionRepository solvedQuestionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProblemRepository problemRepository;

    public List<SolvedQuestion> getAllSolvedQuestions() {

    return solvedQuestionRepository.findAll();
}

    public String addSolvedQuestion(SolvedQuestionRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Problem problem = problemRepository.findById(request.getProblemId())
                .orElseThrow(() -> new RuntimeException("Problem not found"));

        SolvedQuestion solvedQuestion = new SolvedQuestion();

        solvedQuestion.setUser(user);
        solvedQuestion.setProblem(problem);
        solvedQuestion.setTimeTaken(request.getTimeTaken());
        solvedQuestion.setNotes(request.getNotes());
        solvedQuestion.setSolvedDate(
                LocalDate.parse(request.getSolvedDate())
        );

        solvedQuestionRepository.save(solvedQuestion);

        return "Solved question added successfully";
    }
}