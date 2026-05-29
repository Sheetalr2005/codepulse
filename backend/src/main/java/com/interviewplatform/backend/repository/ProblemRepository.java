package com.interviewplatform.backend.repository;

import com.interviewplatform.backend.model.Problem;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ProblemRepository
        extends JpaRepository<Problem, Long> {

    List<Problem> findByUserId(Long userId);
}