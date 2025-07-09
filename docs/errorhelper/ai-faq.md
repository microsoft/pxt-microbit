# Microsoft MakeCode Error Helper

## Responsible AI FAQ

### 1. What is the MakeCode Error Helper?

The MakeCode Error Helper is an AI-powered tool to help students understand coding errors in their projects. When an exception occurs, students can click an "Explain with AI" button in the problems window to get an AI-generated walkthrough of the issue. The tool analyzes the student's code and the specific exception to provide detailed, educational feedback about what went wrong and how to fix it.

### 2. What can the MakeCode Error Helper do?

The MakeCode Error Helper sends the student's current code along with the exception details to a Microsoft Azure LLM service. It returns a detailed walkthrough of the error in student-friendly language.

### 3. What is MakeCode Error Helper's intended use?

The MakeCode Error Helper is intended to help students learn from their coding mistakes by providing educational walkthroughs of exceptions. It aims to transform frustrating error messages into learning opportunities by explaining what went wrong and how to fix it in an understandable way.

### 4. How was the MakeCode Error Helper evaluated? What metrics are used to measure performance?

The system was evaluated with hundreds of coding errors and exceptions from student projects to ensure the responses are accurate, educational, and grounded. We evaluated accuracy with red teaming and expert review of responses.

### 5. What are the limitations of the MakeCode Error Helper? How can users minimize the impact of the Error Helper's limitations when using the system?

The Error Helper is designed specifically for compile-time and runtime exceptions in MakeCode programming environments. It may not perform well for complex or niche errors, and cannot be invoked for issues that don't generate exceptions. Students should still be encouraged to think through problems independently and to verify responses from the AI, using the Error Helper as a learning aid rather than a replacement for developing debugging skills.
