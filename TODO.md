# UI Polish Updates - Progress

## Planned edits

(Work in progress)

- [ ] Problems.jsx
  - [ ] Replace empty-state section for filteredProblems.length === 0
  - [ ] Add framer-motion import
  - [ ] Wrap outer <div className="text-white"> with motion.div and close with </motion.div>
- [ ] Dashboard.jsx
  - [ ] Add framer-motion import
  - [ ] Wrap outer <div className="text-white"> with motion.div and close with </motion.div>
  - [ ] Replace empty-state logic for Recent Problems with problems.length===0
  - [ ] Add subtle hover glow class to dashboard stat cards and recent problems cards
- [ ] Analytics.jsx
  - [ ] Add framer-motion import (if missing)
  - [ ] Wrap outer <div className="text-white"> with motion.div and close with </motion.div>
  - [ ] Add empty-state block above recommendations when totalProblems===0
  - [ ] Add subtle hover glow class to analytics stat cards
- [ ] AddProblem.jsx
  - [ ] Add framer-motion import
  - [ ] Wrap first main content wrapper with motion.div per instructions
- [ ] MainLayout.jsx
  - [ ] Add background blur gradient decorations after opening div for main content

## After code changes

- [ ] Run frontend build/lint if available
