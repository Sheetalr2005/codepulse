package com.interviewplatform.backend.service;

import com.interviewplatform.backend.dto.DashboardResponse;
import com.interviewplatform.backend.model.Problem;
import com.interviewplatform.backend.repository.ProblemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private ProblemRepository problemRepository;

    public DashboardResponse getDashboard(Long userId) {

        DashboardResponse response =
                new DashboardResponse();

        List<Problem> problems =
                problemRepository.findByUserId(userId);

        long totalSolved = problems.stream()
                .filter(problem ->
                        Boolean.TRUE.equals(
                                problem.getSolved()
                        )
                )
                .count();

        long easyCount = problems.stream()
                .filter(problem ->
                        Boolean.TRUE.equals(
                                problem.getSolved()
                        ) &&
                        "Easy".equalsIgnoreCase(
                                problem.getDifficulty()
                        )
                )
                .count();

        long mediumCount = problems.stream()
                .filter(problem ->
                        Boolean.TRUE.equals(
                                problem.getSolved()
                        ) &&
                        "Medium".equalsIgnoreCase(
                                problem.getDifficulty()
                        )
                )
                .count();

        long hardCount = problems.stream()
                .filter(problem ->
                        Boolean.TRUE.equals(
                                problem.getSolved()
                        ) &&
                        "Hard".equalsIgnoreCase(
                                problem.getDifficulty()
                        )
                )
                .count();

        response.setTotalSolved(totalSolved);

        response.setEasyCount(easyCount);

        response.setMediumCount(mediumCount);

        response.setHardCount(hardCount);

        response.setAverageSolveTime(0.0);

        response.setMostPracticedTopic("Coming Soon");

        response.setWeakestTopic("Coming Soon");

        long currentStreak;

                if (totalSolved >= 15) {

                currentStreak = 10;

                } else if (totalSolved >= 10) {

                currentStreak = 7;

                } else if (totalSolved >= 5) {

                currentStreak = 3;

                } else if (totalSolved >= 1) {

                currentStreak = 1;

                } else {

                currentStreak = 0;
                }

        response.setCurrentStreak(currentStreak);

        

        String recommendation;

        if (totalSolved < 5) {

            recommendation =
                    "Solve more Easy problems to build consistency 🚀";

        } else if (hardCount == 0) {

            recommendation =
                    "Start attempting Hard problems 💪";

        } else if (mediumCount < easyCount) {

            recommendation =
                    "Practice more Medium problems 🔥";

        } else if (currentStreak < 3) {

            recommendation =
                    "Maintain daily consistency 🔥";

        } else {

            recommendation =
                    "Excellent progress! Keep pushing 🚀";
        }

        response.setRecommendation(recommendation);

        return response;
    }
}