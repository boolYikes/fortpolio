const e=`---
name: Double Shot
date: 2025-08-01
tags: [python, java, mysql, sql, opencv]
summary: Ordering kiosk app for the disadvantaged
---

# Double Shot

## Overview

A kiosk ordering web application utilizing computer vision and speech recognition technologies for accessibility.

## Architecture

![Controller](/fortpolio/md-images/classroom-dee_DoubleShot/Controller.png)
    
![Usecase](/fortpolio/md-images/classroom-dee_DoubleShot/usecase.png)


## Contributions

Improved model accuracy from 60% to 85% by analyzing dataset balance and narrowing down the age group classification to 3 categories.

Optimized inference efficiency by using Haar Cascade to recognize only frontal images, preventing unnecessary resource consumption.

Overcame Google Colab memory limitations by splitting and compressing photo data into NPZ format for efficient loading.

Selected as the Best Team during the final presentation.

## Future Improvements

The Flask server architecture presents several opportunities for refinement. Currently, it handles a wide range of responsibilities—including voice recognition, face recognition, and API routing—within a single codebase. Refactoring the application to modularize these components and separate concerns would enhance maintainability, scalability, and reusability. Ideally, certain functionalities could be decoupled into dedicated microservices or even hosted in separate repositories.

In addition, the admin interface could be significantly enhanced by integrating a delivery management system, streamlining operational workflows and providing a more comprehensive end-to-end solution.

## Results

### Admin page

![Admin page](/fortpolio/md-images/classroom-dee_DoubleShot/admin.png)

### Model training

![Training graph](/fortpolio/md-images/classroom-dee_DoubleShot/training.png)
`;export{e as default};
