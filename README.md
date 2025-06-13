# Calendar Backend API

A RESTful API for managing calendar events with authentication and refresh token support.

## Features

- User authentication with JWT and refresh tokens
- CRUD operations for calendar events
- Event importance levels (Normal, Important, Critical)
- Secure password hashing
- PostgreSQL database with Prisma ORM

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT for authentication
- bcryptjs for password hashing

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd calendar-back
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5433/calendar_app"
JWT_SECRET="your-jwt-secret"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Refresh Token
```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Logout
```http
POST /api/auth/logout
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

### Events

All event endpoints require authentication. Include the access token in the Authorization header:
```http
Authorization: Bearer your-access-token
```

#### Get All Events
```http
GET /api/events
```

#### Get Single Event
```http
GET /api/events/:id
```

#### Create Event
```http
POST /api/events
Content-Type: application/json

{
  "title": "Team Meeting",
  "description": "Weekly sync",
  "date": "2024-03-20T10:00:00Z",
  "importance": "NORMAL"
}
```

#### Update Event
```http
PUT /api/events/:id
Content-Type: application/json

{
  "title": "Updated Meeting",
  "description": "New description",
  "date": "2024-03-21T10:00:00Z",
  "importance": "IMPORTANT"
}
```

#### Delete Event
```http
DELETE /api/events/:id
```

## Event Importance Levels

- `NORMAL`: Regular events
- `IMPORTANT`: High-priority events
- `CRITICAL`: Urgent events

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

ISC 