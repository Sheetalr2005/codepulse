package com.interviewplatform.backend.controller;

import com.interviewplatform.backend.dto.DashboardResponse;
import com.interviewplatform.backend.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/dashboard")

public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/{userId}")
    public DashboardResponse getDashboard(
            @PathVariable Long userId
    ) {

        return dashboardService
                .getDashboard(userId);
    }
}