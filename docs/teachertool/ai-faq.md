# Microsoft MakeCode Code Evaluation Tool

## Responsible AI FAQ

### 1. What is the MakeCode Code Evaluation Tool?

The MakeCode Code Evaluation tool is an online tool for teachers to help them understand and evaluate student block-based coding programs. In addition to static analysis functionality, there is an optional AI component for teachers to provide additional feedback and recommendations to students. The teacher can ask specific questions about one student project at a time (i.e. "Do the variables in this program have meaningful names?"), and the AI will respond with an answer and reasoning.

### 2. What can the MakeCode Code Evaluation Tool do?

The MakeCode Code Evaluation tool will send the current student code with the teacher question to DeepPrompt (a Microsoft Azure LLM service) along with some contextual prompt information and return the resulting AI response back to the user.

### 3. What is MakeCode Code Evaluation Tool’s intended use(s)?

The MakeCode Code Evaluation tool is intended to help teachers expedite the process of giving feedback on student programs.

### 4. How was the MakeCode Code Evaluation Tool evaluated? What metrics are used to measure performance?

The system was evaluated with 1000+ prompts from multiple sources to ensure the responses are grounded and relevant to the educator’s task of assessing student code. We evaluated accuracy with red teaming and expert review of responses.

### 5. What are the limitations of the MakeCode Code Evaluation Tool? How can users minimize the impact of the Code Evaluation Tool’s limitations when using the system?

The system only supports educational scenarios related to student code. The system will not perform well for other scenarios or unrelated questions. When using this tool, educators should ask short, concise questions relating to the assessment of student code. Questions are limited to 5 per program, and 1000 characters per question. The MakeCode Code Evaluation tool cannot provide direct scores or grades for student work.

### ~reminder

#### Tool Beta

This tool is currently in Beta, and we value your feedback. Please click on the **Feedback** button to share your experiences and thoughts about the MakeCode Code Evaluation Tool.

### ~
