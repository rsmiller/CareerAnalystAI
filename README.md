# Career Analyst AI

This is a simple example of leveraging Angular or React, C#, SignarR, and OpenAI to build a tailored AI chatbot. In this example, this chatbot is tailored to be a career analyst and give detailed, no-BS information when prompted about a career. 
## Frontend
This is built in Angular and connects to SignalR on localhost—a super simple page with limited styling. The data comes back fine, but needs some refinement through specific formatting from OpenAI/LLMs markdown. The React project has a component for this.

## Backend
C# API that acts as a middleman to communicate with OpenAI and stream tokens to the frontend when it is called.
