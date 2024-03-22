**StickyNote**: A Full-Stack Note App Built with Next.js and Express.

## Requirements

Before running the StickyNote application, ensure you have the following prerequisites:

- Node.js installed on your machine ([download here](https://nodejs.org/))
- MongoDB account set up for database storage ([MongoDB Atlas](https://www.mongodb.com/cloud/atlas) provides a free tier)

## Installation

1. Clone/Download the git repo.
2. Navigate to the path `client/`.
3. Create a `.env` file in this path and add the following code:

```bash
REACT_APP_BASE_URL=http://localhost:3000
JWT_SECRET={jwtSecret}
```

4. To generate a secure JWT secret `{jwtSecret}` you can use the following command:

```bash
openssl rand -base64 32
```

5. Navigate to the path `server/`.
6. Create a `.env` file in this path and add the following code:

```bash
DATABASE_URL={databaseUrl}
JWT_SECRET={jwtSecret}
SECRET={passwordEncryptSecret}
PORT="4000"
```

7. Replace `{databaseUrl}` with your MongoDB connection string. The `{jwtSecret}`, `{passwordEncryptSecret}` can be generated using the last **openssl** command.

## Using the Full Stack SickyNote App

You should start the server before the client and keep both running in separate Terminal windows.

### Start the server

1. Open a new Terminal.
2. Navigate to `server/`.
3. Run `npm install`
4. After the installation completes, run `npm run start`.
5. The server starts.

### Start the client

1. Open a new Terminal
2. Navigate to `client/`.
3. Run `npm install`
4. After the installation completes, run `npm run dev`.
5. A new web browser window opens and displays the sticky note app.
6. To run the Playwright tests for the StickyNote app, run `npm run test` or `npm run test:ui`
