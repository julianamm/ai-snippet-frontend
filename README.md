# AI Snippets Service

A service for summarizing raw text snippets using an AI API (Google Gemini).  
Includes a **Remix frontend** and an **Express backend** with JWT authentication.

---

## Features

- Create snippets (`POST /snippets`)
- List snippets (`GET /snippets`)
- View a snippet (`GET /snippets/:id`)
- User authentication with JWT
- AI-powered summary using Google Gemini
- MongoDB persistence for snippets
- Backend and frontend containerized with Docker

---

## Tech Stack

- **Frontend**: Remix (TypeScript)
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT
- **AI**: Google Gemini
- **Testing**: Jest/Vitest + Supertest (planned)
- **Docker**: docker-compose setup

---

## Getting Started

### Prerequisites

- Node.js v20+
- Docker & Docker Compose
- Gemini API key
- MongoDB URI

### Installation

Clone the repository:
```bash
git clone https://github.com/your-username/ai-snippets-service.git
cd ai-snippets-service
```

Create a .env file at the project root:
```bash
MONGO_URI=mongodb://mongo:27017/ai_snippets
GOOGLE_API_KEY=your-gemini-api-key
JWT_SECRET=your-secret-key
API_URL=http://localhost:3000
```

### Running the Application with Docker
Build and run all services:

```bash
docker-compose up --build
```

This will:
- Spin up MongoDB
- Start the backend API on http://localhost:3000
- Serve the frontend on http://localhost:3030

---

## Usage
1. Navigate to http://localhost:3030/login and log in.
2. Enter some text into the summarizer to create a snippet.
3. View the list of your snippets with AI summaries.
4. Log out and verify that the snippet list is cleared.

---

## Tests
Run tests with:

```bash
npm test
```

Tests will cover:
- User auth routes
- Snippet CRUD
- Error handling and validations
- AI summary service

---

## Improvements & Next Steps
- Implement full TDD for all routes.
- Improve error handling and UX (loaders, toasts, etc.).
- Add streaming summaries with SSE.
- Implement a logout route on the backend to clear cookies properly.
- Add GitHub Actions for CI/CD pipeline.
- Implement role-based authorization (admin vs. regular users).
- Improve accessibility and responsive design.
- Optimize Mongo queries with indexes and pagination.

---

## Author
Raphael Andrade 
