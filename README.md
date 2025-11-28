# LLM Customer Support Flow Debugger

A responsive website for debugging and testing LLM-based customer support flows. This tool tests LLM responses against expected answers and business rules.

## Features

- Interactive demo to test LLM responses
- Mock LLM mode for testing without API keys
- OpenAI integration (optional)
- Responsive design that works on mobile, tablet, and desktop
- Pass/fail scoring based on keywords and text overlap

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript with Vite
- **Backend**: Node.js + Express
- **API**: OpenAI (optional)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd llm-customer-support-debugger
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. (Optional) For OpenAI integration, install the OpenAI package:
   ```bash
   cd ../backend
   npm install openai
   ```

### Running the Application

#### Option 1: Run frontend and backend separately

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   The backend will be available at http://localhost:3000

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at http://localhost:8080

#### Option 2: Run both with one command

From the root directory:
```bash
npm install
npm start
```

This will run both servers concurrently:
- Frontend: http://localhost:8080
- Backend: http://localhost:3000

### Configuring OpenAI (Optional)

To use the OpenAI API:

1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Create a `.env` file in the `backend` directory
3. Add your API key to the `.env` file:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Project Structure

```
llm-customer-support-debugger/
├── frontend/
│   ├── src/
│   │   ├── main.js       # Main application logic
│   │   └── style.css     # Styling
│   ├── index.html        # Main HTML file
│   └── package.json      # Frontend dependencies
├── backend/
│   ├── server.js         # Express server
│   ├── package.json      # Backend dependencies
│   └── .env              # Environment variables
├── package.json          # Root package.json for concurrent execution
└── README.md
```

## How It Works

1. **Input**: Provide support questions, expected answers, and required keywords
2. **LLM Response**: The system generates a response using either a mock LLM or OpenAI
3. **Analysis**: The tool calculates:
   - Missing keywords (case-insensitive)
   - Text overlap score between expected and actual answers
   - Final score (70% keyword coverage + 30% text overlap)
   - Pass/Fail status (PASS if score ≥ 75)

## Deployment

### Option 1: Traditional Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Copy the built files to the backend public directory:
   ```bash
   cp -r dist/* ../backend/public/
   ```

3. Start the backend server:
   ```bash
   cd ../backend
   npm start
   ```

4. The application will be available at http://localhost:3000

### Option 2: Docker Deployment

1. Build and run with Docker:
   ```bash
   docker build -t llm-debugger .
   docker run -p 3000:3000 -e OPENAI_API_KEY=your_key_here llm-debugger
   ```

2. Or use docker-compose:
   ```bash
   docker-compose up
   ```

### Option 3: Deploy to Cloud Providers

- **Heroku**: Push the repository to Heroku and set the OPENAI_API_KEY config var
- **Render**: Use the Dockerfile with environment variables
- **AWS**: Deploy as an ECS service or Elastic Beanstalk application
- **Google Cloud**: Deploy as a Cloud Run service

## Customization

You can customize the application by modifying:

- **Styling**: Edit `frontend/src/style.css`
- **Logic**: Edit `frontend/src/main.js`
- **Backend**: Edit `backend/server.js`

## License

This project is licensed under the MIT License.