package com.interviewplatform.backend.service;

import com.interviewplatform.backend.dto.ProblemRequest;
import com.interviewplatform.backend.model.Problem;
import com.interviewplatform.backend.model.User;

import com.interviewplatform.backend.repository.ProblemRepository;
import com.interviewplatform.backend.repository.SolvedQuestionRepository;
import com.interviewplatform.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProblemService {

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SolvedQuestionRepository solvedQuestionRepository;

    // ADD PROBLEM

   public String addProblem(ProblemRequest request) {

    Problem problem = new Problem();

    problem.setTitle(request.getTitle());

    problem.setDifficulty(request.getDifficulty());

    problem.setTopic(request.getTopic());

    problem.setPlatform(request.getPlatform());

    problem.setLink(request.getLink());

    problem.setSolved(request.getSolved());

    // SAVE SOLVED DATE

    if (request.getSolved()) {

        problem.setSolvedDate(
                LocalDate.now()
        );
    }

    problem.setFavorite(request.getFavorite());

    problem.setCoreSubject(request.getCoreSubject());

    User user = userRepository.findById(
            request.getUserId()
    ).orElseThrow();

    problem.setUser(user);

    problemRepository.save(problem);

    return "Problem added successfully";
}

    // GET ALL PROBLEMS

    public List<Problem> getAllProblems() {

        return problemRepository.findAll();
    }

    // GET PROBLEMS BY USER ID

    public List<Problem> getProblemsByUserId(Long userId) {

        return problemRepository.findByUserId(userId);
    }

    // DELETE PROBLEM

    public void deleteProblem(Long id) {

        solvedQuestionRepository.deleteByProblemId(id);

        problemRepository.deleteById(id);
    }

    // UPDATE PROBLEM

    public String updateProblem(
            Long id,
            ProblemRequest request
    ) {

        Problem problem =
                problemRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Problem not found"
                                )
                        );

        problem.setTitle(request.getTitle());

        problem.setDifficulty(request.getDifficulty());

        problem.setTopic(request.getTopic());

        problem.setPlatform(request.getPlatform());

        problem.setLink(request.getLink());

        problem.setSolved(request.getSolved());

        problem.setFavorite(request.getFavorite());

        problem.setCoreSubject(request.getCoreSubject());

        problemRepository.save(problem);

        return "Problem updated successfully";
    }
}