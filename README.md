# AWS Certification Notes & Study Platform

This repository is designed to be a highly interactive, responsive, and gamified study platform for AWS Certifications. It is built purely with static files (HTML, CSS, JavaScript) and is natively ready to be hosted via GitHub Pages!

## 🚀 Publishing to GitHub Pages

Because this project relies entirely on relative paths (e.g., `../../assets/css/style.css`), it is incredibly easy to deploy.

1. Go to your repository on GitHub.
2. Click on the **Settings** tab at the top.
3. On the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**, set the **Source** to **Deploy from a branch**.
5. Select the **main** branch, and keep the folder set to **`/ (root)`**.
6. Click **Save**.

GitHub will automatically queue a deployment. In a minute or two, your interactive study guide will be live on the internet! 

## Repository Structure

*   `index.html`: The root dashboard that links to all available certification guides.
*   `.nojekyll`: Instructs GitHub Pages to serve the files completely statically, speeding up the build process.
*   `assets/`: Centralized hub for styling and interactive logic.
    *   `css/style.css`: The massive, Vercel-inspired CSS file handling Dark/Light mode, grid layouts, and typography.
    *   `js/script.js`: Handles gamification tracking, global search (Ctrl+K), right-side TOC dynamic rendering, and MCQ rendering.
*   `exams/`: The content layer.
    *   `aws-saa-c03/`: Holds the monolithic study guide HTML, along with `mcqs.json` for injecting scenario-based exam questions.
