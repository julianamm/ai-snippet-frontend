# AI Snippets Service

A full-stack AI-powered service to summarize raw text using **Google Gemini AI API.**
Built with a **Remix frontend**, an **Express backend**, **JWT authentication** and **MongoDB** for persistence.

---

## Features

- Create and store text snippets
- AI-powered summary generation (Google Gemini)
- Real-time streaming summaries (SSE)
- User authentication via JWT
- MongoDB data persistence
- End-to-end testing (Jest + Supertest)
- Full Dockerized stack (frontend, backend, MongoDB)

---

## Tech Stack

- **Frontend**: Remix (TypeScript)
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT
- **AI**: Google Gemini API
- **Testing**: Jest + Supertest
- **Docker**: Docker, docker-compose

---

## 🛠️ Local Setup

### Prerequisites

- Node.js v20+
- Docker & Docker Compose
- Gemini API key
- MongoDB connection URI (can be local or cloud)

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

---

## Running with Docker

Use Docker Compose to start all services:

```bash
docker-compose up --build
```

This will:
- Spin up MongoDB
- Start the backend API at http://localhost:3000
- Serve the frontend at http://localhost:3030

---

## Usage

1. Navigate to http://localhost:3030/login and log in.
2. Enter some text into the summarizer to create a snippet.
3. View the list of your snippets with AI summaries.
4. Log out and verify that the snippet list is cleared.

---

## Running Tests

Create a .env.test file for test environment:
```bash
MONGO_URI=mongodb://localhost:27017/ai_snippets_test
GOOGLE_API_KEY=your-test-gemini-key
JWT_SECRET=your-test-secret
```

Run tests with:
```bash
npm test
```

Tests will cover:
- Auth routes and protection
- Snippet creation and summary
- SSE endpoint validation
- Unauthorized access protection
- Error scenarios and edge cases

---

## API Usage (Examples with curl)

### Login:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "code": "654321"}'
```

### Create a snippet:
```bash
curl -X POST http://localhost:3000/snippets \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"text": "Some long text to summarize"}'
```

### Stream AI summary:
```bash
curl http://localhost:3000/snippets/stream?text=Test+text \
  -H "Authorization: Bearer <your_token>"
```

---

## API Key & .env.example
Add a `.env` file based on `.env.example`

You can use this as a starting point for local configuration:
```env
MONGO_URI=mongodb://localhost:27017/ai_snippets
GOOGLE_API_KEY=your-gemini-api-key
JWT_SECRET=your-secret
API_URL=http://localhost:3000
```

---

## Final Thoughts: What I Would Do With More Time 

- Implement refresh tokens and auto-expiry handling 
- User registration & passwordless login 
- Add pagination and sorting for snippet history 
- Improve accessibility and keyboard navigation 
- Deploy backend and frontend to Render/Vercel 
- Implement logout endpoint with token invalidation (blacklisting or short expiry)
- Improve error boundaries, toast notifications, loading states 
- Set up CI/CD pipeline with GitHub Actions (build, lint, test)
- Polish UI & visual feedback (typing animations, success/failure states)

---

## Author

Raphael Andrade 
Full Stack Developer
LinkedIn: https://www.linkedin.com/in/raphaelandrade1/