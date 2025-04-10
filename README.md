# Career Analyst AI

This is a very simple example of how you can leverage Angular, C#, SignarR, and OpenAI to build a tailored AI chatbot. In this example this chat bot is tailored to be a career analyst and give detailed no-BS information when prompted about a carrer. 
## Frontend
This is built in Angular and connects to SignalR on a localhost. Super simple page with limited styling. The data comes back fine but needs some refinement through specific formating from OpenAI/LLMs.

## Backend
C# API that acts as a middleman to communicate with OpenAI and stream tokens to the frontend when it is called.
