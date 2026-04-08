const n=`---
name: Aria CMB Model
date: 2024-02-01
tags: [python, pytorch, docker, cuda]
summary: Dementia risk assessment neural model
---

# CMB Detection for Dementia Risk Assessment

*The repo is company-owned and is set to private*

A deep learning project for detecting **Cerebral Microbleeds (CMB)** from brain imaging data using **nnU-Net**.

## 📌 Overview

This project aims to build a neural network model that identifies **dementia-related brain anomalies (CMBs)** from medical imaging.

*The doc is more faced toward the team rather than general viewers.*

### 💡 Motivation

Early dementia screening often requires expensive procedures such as PET scans.
This model is designed to:

* Reduce **upfront diagnostic costs**
* Enable **early risk assessment**
* Provide a **scalable AI-based alternative** for screening

## ⚙️ Environment Setup

*Project includes a poc folder. Don't mind it!*

### 🐳 Docker Images

* **Training Environment**

  * CUDA 10.1, x86_64 (DGX-1 server)
  * \`\`\`bash
    docker pull <training-image>
    \`\`\`

* **Inference Environment**

  * CUDA 12.0, x86_64
  * Built using Dockerfile in \`nnUNet_Workspace\`

### 📦 Inside Docker

* Environment variables and scripts are configured in:

  * \`/scripts\`
  * \`~/.bashrc\`

## 🚀 Training Pipeline

### 1. Run Docker Container (DGX Server)

\`\`\`bash
docker run -it --rm \\
  --name nnunet \\
  --gpus all \\
  -p 8888:8888 \\
  -v /storage2:/workspace \\
  --ipc=host \\
  user/image:tag /bin/bash
\`\`\`

### 2. Activate Environment

\`\`\`bash
conda activate nnunet01
\`\`\`

### 3. Prepare Dataset

Ensure dataset exists at:

\`\`\`
/storage2/dwseon/dat/raw/...
\`\`\`

### 4. Dataset Conversion

You can:

* Use built-in nnU-Net scripts, OR
* Manually structure dataset + create \`dataset.json\`

Custom script used:

\`\`\`
dataset_conversion/Task999_CMB.py
\`\`\`

### 5. Preprocessing

\`\`\`bash
nnUNet_plan_and_preprocess -t 999 --verify_dataset_integrity
\`\`\`

* Output saved to:

\`\`\`
/storage2/dwseon/dat/pre
\`\`\`

### 6. Train Model

\`\`\`bash
/scripts/train.py
\`\`\`

* Modify parameters (e.g., GPU settings) inside the script

## 🔍 Inference Pipeline

> Run all commands **inside the Docker container**

### 1. Set Environment Variables

\`\`\`bash
export nnUNet_raw_data_base="/workspace/dwseon/dat/raw"
export nnUNet_preprocessed="/workspace/dwseon/dat/pre"
export RESULTS_FOLDER="/workspace/dwseon/dat/res"
\`\`\`

### 2. Prepare Dataset

Edit a dataset conversion script:

\`\`\`
dataset_conversion/Task999_CMB.py
\`\`\`

Then run:

\`\`\`bash
python Task999_CMB.py
\`\`\`

### 3. Preprocess Dataset

\`\`\`bash
nnUNet_plan_and_preprocess -t 999 --verify_dataset_integrity
\`\`\`

### 4. Train (if needed)

\`\`\`bash
/scripts/train.py
\`\`\`

### 5. Find Best Configuration

\`\`\`bash
nnUNet_find_best_configuration -t 999 -m 2d --disable_ensembling
\`\`\`

Optional (multi-plan evaluation):

\`\`\`bash
nnUNet_find_best_configuration -t 999 -m 2d 3d_fullres --disable_ensembling
\`\`\`

### 6. Run Inference

\`\`\`bash
nnUNet_predict \\
 -i FOLDER_WITH_TEST_CASES \\
 -o OUTPUT_FOLDER_MODEL1 \\
 -tr nnUNetTrainerV2 \\
 -ctr nnUNetTrainerV2CascadeFullRes \\
 -m 3d_fullres \\
 -p nnUNetPlansv2.1 \\
 -t Task999_CMB \\
 --save_npz
\`\`\`

* GPU memory usage: ~2500MB
* \`--save_npz\` is required for ensembling

### 7. Ensembling

⚠️ Important:

* Do **NOT** run this in the DGX environment (version mismatch issues)
* Use Gwangju server or compatible environment

\`\`\`bash
nnUNet_ensemble \\
 -f FOLDER1 FOLDER2 ... \\
 -o OUTPUT_FOLDER \\
 -pp POSTPROCESSING_FILE
\`\`\`

## 🧪 Notes & Tips

* Dataset ID \`999\` must:

  * Be ≤ 999
  * Not conflict with existing tasks
* Ensure consistent folder structure before preprocessing
* Ensembling may require manual handling depending on environment

## 📄 References

* nnU-Net: https://github.com/MIC-DKFZ/nnUNet
* Internal documentation: (notion)
`;export{n as default};
