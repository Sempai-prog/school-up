# Skoolup Backend Server

This is the Node.js/Express backend for the Skoolup Super-App.

## Setup

1.  **Install Dependencies:**
    ```bash
    cd server
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env` file in the `server/` directory with the following:
    ```env
    PORT=5000
    DATABASE_URL=postgres://user:password@localhost:5432/skoolup_db
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

3.  **Run Server:**
    ```bash
    npm start &
    # or for development
    node index.js
    ```

## API Endpoints

*   **GET /api/health**: Check server status.
*   **POST /api/chat**: Send a message to the AI Assistant.
    *   Body: `{ "message": "Hello", "history": [...] }`

## Database

The app uses PostgreSQL.
*   Schema definition is in `schema.sql`.
*   Connects using `pg` pool.
