# YooClaw: Your AI Agent Unleashed

**YooClaw** is a professional, high-end AI productivity dashboard built to run directly in your browser. It integrates seamlessly with the **Anthropic Claude API** to provide institutional-grade intelligence for developers, researchers, and communicators.

![YooClaw Welcome Screen](screenshots/01_welcome.png)

## 🚀 Key Features

### 1. Secure Setup & Connectivity
YooClaw prioritizes your security. On the first launch, you are greeted with a dedicated settings modal to securely input your Anthropic API Key (saved only to your local storage). The dashboard includes a built-in "Connection Tester" to verify your credentials.

![Agent Settings](screenshots/02_settings.png)

### 2. Specialized Intelligence Modules
The dashboard is divided into 6 core operational sectors, each featuring custom-tuned system prompts for optimized Claude responses:

#### **Productivity**
Task Prioritizer (Eisenhower Matrix), Meeting Prep, Daily Standup.
![Productivity Section](screenshots/03_productivity.png)

#### **Research**
Web Summary, Competitor Monitoring, Price Strategies.
![Research Section](screenshots/04_research.png)

#### **Communication**
Email Drafter, Reply Suggester, Tone Fixer.
![Communication Section](screenshots/05_communication.png)

#### **Developer Tools**
GitHub PR Reviewer, Error Explainer, Commit Gen.
![Dev Tools Section](screenshots/06_dev_tools.png)

#### **Data & Reports**
CSV Analyst, Weekly Report Builder.
![Data Section](screenshots/07_data_reports.png)

#### **Security**
Prompt Injection Detector, Skill Chainer.
![Security Section](screenshots/08_security.png)

## 🛠️ Technical Stack
- **Architecture**: Single-file HTML/CSS/JS (no build steps required).
- **Styling**: Vanilla CSS with modern design tokens (Electric Indigo theme).
- **Engine**: Direct `fetch()` integration with the Anthropic API.
- **Micro-Interactions**: CSS Shimmer loading skeletons, Pulsing status indicators, and Fade-in transitions.
- **Interactivity**: 
    - `Cmd/Ctrl + Enter`: Run current module
    - `Esc`: Clear workspace

## 📥 Getting Started
1. Open `index.html` in any modern web browser.
2. Enter your **Anthropic API Key** in the settings modal.
3. Select a module from the sidebar and start generating intelligence.

---
*Created by Antigravity for YooClaw 2026.*
