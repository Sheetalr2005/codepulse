package com.interviewplatform.backend.repository;

import com.interviewplatform.backend.model.SolvedQuestion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SolvedQuestionRepository
        extends JpaRepository<SolvedQuestion, Long> {

    List<SolvedQuestion> findByUserIdOrderBySolvedDateDesc(
            Long userId
    );

    List<SolvedQuestion> findByUserId(Long userId);

    @Transactional
    @Modifying
    @Query(
        value = "DELETE FROM solved_questions WHERE problem_id = :problemId",
        nativeQuery = true
    )
    void deleteByProblemId(
            @Param("problemId") Long problemId
    );

    Long countByUserId(Long userId);

    Long countByUserIdAndProblemDifficulty(
            Long userId,
            String difficulty
    );

    @Query("""
           SELECT AVG(s.timeTaken)
           FROM SolvedQuestion s
           WHERE s.user.id = :userId
           """)
    Double getAverageSolveTime(
            @Param("userId") Long userId
    );
}