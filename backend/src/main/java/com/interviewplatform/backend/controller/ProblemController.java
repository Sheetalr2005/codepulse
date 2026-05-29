package com.interviewplatform.backend.controller;

import com.interviewplatform.backend.dto.ProblemRequest;
import com.interviewplatform.backend.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.interviewplatform.backend.model.Problem;

import java.util.List;

@CrossOrigin(
    origins = "http://localhost:5173",
    allowedHeaders = "*",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.DELETE,
        RequestMethod.OPTIONS
    }
)



@RestController
@RequestMapping("/api/problems")

public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @PostMapping
    public String addProblem(
            @RequestBody ProblemRequest request
    ) {

        return problemService.addProblem(request);
    }

   @GetMapping
public List<Problem> getAllProblems() {

    return problemService.getAllProblems();
}

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProblem(
            @PathVariable Long id
    ) {

        problemService.deleteProblem(id);

        return ResponseEntity.ok(
                "Problem deleted successfully"
        );
    }

    @GetMapping("/user/{userId}")
public List<Problem> getProblemsByUserId(
        @PathVariable Long userId
) {

    return problemService.getProblemsByUserId(userId);
}

    @PutMapping("/{id}")
    public String updateProblem(
            @PathVariable Long id,
            @RequestBody ProblemRequest request
    ) {

        return problemService.updateProblem(id, request);
    }
}