Node.js + TypeScript Clean Architecture Backend Template
This is a production-ready Node.js and TypeScript monolith backend template designed with clean architecture principles to ensure modularity, scalability, and maintainability. It provides a robust foundation for building feature-rich applications, with a focus on authentication, error handling, and database management using Prisma. The template is ideal for developers aiming to build scalable APIs with industry-standard practices.
Table of Contents

Features
Technologies
Clean Architecture
Project Structure
Prerequisites
Setup Instructions
Running the Application
Testing the API
Extending the Template
Scripts
Environment Variables
Contributing
License

Features

Clean Architecture: Organized into layers (entities, use cases, controllers, infrastructure) for separation of concerns, testability, and scalability.
Authentication: Basic login functionality with bcrypt for password hashing, ready for expansion to full auth flow (register, refresh tokens, password reset).
Error Handling: Centralized error management with custom AppError class and async error wrapper (catchAsync).
Logging: Winston for error and combined logs, Morgan for HTTP request logging.
Database: Prisma ORM with PostgreSQL for type-safe database operations.
Code Quality: Prettier for formatting, ESLint for linting, and TypeScript for type safety.
Modular Design: Feature-based structure to support multiple features (e.g., auth, user management, posts).
Standardized Responses: Consistent API response format { status, message, data, errors }.

Technologies

Node.js: Runtime for server-side JavaScript.
TypeScript: Static typing for improved developer experience and code reliability.
Express: Web framework for building RESTful APIs.
Prisma: ORM for database management with PostgreSQL.
Winston & Morgan: Logging libraries for debugging and monitoring.
Bcrypt: Password hashing for secure authentication.
Prettier & ESLint: Code formatting and linting for consistent style.
ts-node-dev: Development server with hot reloading.

Clean Architecture
This template follows clean architecture principles to ensure a maintainable and testable codebase:

Entities: Core business models (e.g., User) in src/domain/entities, independent of frameworks or databases.
Use Cases: Business logic (e.g., loginUser) in src/domain/use-cases, organized by feature, interacting with entities and repository interfaces.
Controllers/Routes: HTTP handling in src/interfaces/controllers and src/interfaces/routes, calling use cases for business logic.
Infrastructure: External services (e.g., Prisma, logging) in src/infrastructure, implementing repository interfaces.
Dependency Rule: Dependencies flow inward—controllers depend on use cases, use cases depend on entities, and infrastructure depends on use cases via interfaces.
Interfaces: Repository interfaces (e.g., IUserRepository) in src/domain/use-cases/interfaces decouple use cases from infrastructure.

This structure makes the codebase modular, testable, and easy to extend, aligning with industry standards used by top companies.
Project Structure
project-root/
├── src/
│ ├── domain/ # Core business logic
│ │ ├── entities/ # Business models
│ │ │ └── user.ts # User entity
│ │ └── use-cases/ # Business logic
│ │ ├── auth/ # Auth feature
│ │ │ └── loginUser.ts # Login use case
│ │ └── interfaces/ # Repository interfaces
│ │ └── userRepository.ts
│ ├── interfaces/ # HTTP layer
│ │ ├── controllers/ # Express controllers
│ │ │ └── authController.ts # Auth controller
│ │ └── routes/ # Express routes
│ │ └── authRoutes.ts # Auth routes
│ ├── infrastructure/ # External services
│ │ ├── database/ # Prisma client
│ │ │ └── prisma.ts # Singleton Prisma client
│ │ └── logger/ # Logging
│ │ └── logger.ts # Winston logger
│ ├── middleware/ # Express middleware
│ │ ├── errorHandler.ts # Global error handler
│ │ └── responseHandler.ts # Response formatter
│ ├── types/ # TypeScript interfaces
│ │ └── index.ts # Custom types
│ ├── utils/ # Shared utilities
│ │ ├── catchAsync.ts # Async error wrapper
│ │ └── appError.ts # Custom error class
│ └── app.ts # Main Express app
├── prisma/
│ └── schema.prisma # Prisma schema
├── .env # Environment variables
├── .eslintrc.js # ESLint config
├── .prettierrc # Prettier config
├── .prettierignore # Prettier ignore
├── tsconfig.json # TypeScript config
├── package.json # Dependencies and scripts
└── README.md # This file

Prerequisites

Node.js: v18 or higher
PostgreSQL: v13 or higher, running locally or remotely
npm: v8 or higher
Git: For cloning and version control
VS Code (recommended): With Prettier and ESLint extensions for code formatting and linting

Setup Instructions

Clone the Repository:
git clone https://github.com/your-username/backend-template.git
cd backend-template

Install Dependencies:
npm install

Configure Environment Variables:Create a .env file in the project root with the following:
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
PORT=3000
NODE_ENV=development

Replace user, password, and dbname with your PostgreSQL credentials.

Set Up Prisma:Initialize the database schema and generate the Prisma client:
npx prisma migrate dev --name init
npx prisma generate

Seed Initial Data (optional):If you want to seed initial users, create a prisma/seed.ts file and run:
npx prisma db seed

Running the Application

Development Mode (with hot reloading):npm run dev

Production Mode:npm run build
npm start

The server will run on http://localhost:3000 (or the port specified in .env).
Testing the API
Test the login endpoint using curl or a tool like Postman:
curl -X POST http://localhost:3000/api/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email": "test@example.com", "password": "password"}'

Expected Response (Success):
{
"status": "success",
"message": "Login successful",
"data": { "user": { "id": 1, "email": "test@example.com" } },
"errors": null
}

Expected Response (Error):
{
"status": "fail",
"errors": [{ "message": "Invalid email or password" }],
"data": null
}

Note: You need to create a user in the database with a hashed password (using bcrypt) for the login to work. This can be done via a registration endpoint (to be added) or manually via Prisma Studio (npx prisma studio).
Extending the Template
To add new features (e.g., user management, posts):

Create a Feature Module:
Add a new folder in src/domain/use-cases (e.g., user).
Define use cases (e.g., getUser.ts, updateUser.ts).
Create corresponding controllers in src/interfaces/controllers (e.g., userController.ts).
Add routes in src/interfaces/routes (e.g., userRoutes.ts).

Update Prisma Schema:
Modify prisma/schema.prisma for new models (e.g., Post).
Run npx prisma migrate dev to apply migrations.

Add Middleware:
Implement authentication or RBAC in src/middleware (e.g., authMiddleware.ts).

Write Tests:
Add unit tests in src/tests using Jest (e.g., user.test.ts).

Example: To add a Post feature, create src/domain/use-cases/post/createPost.ts, src/interfaces/controllers/postController.ts, and src/interfaces/routes/postRoutes.ts, and update schema.prisma with a Post model.
Scripts

npm start: Run the compiled app in production.
npm run build: Compile TypeScript to JavaScript.
npm run dev: Run in development with hot reloading.
npm run format: Format code with Prettier.
npm run format:check: Check code formatting.
npm run lint: Run ESLint for code quality.
npm run prisma:generate: Generate Prisma client.
npm run prisma:migrate: Apply database migrations.

Environment Variables

Variable
Description
Default

DATABASE_URL
PostgreSQL connection string

-

PORT
Server port
3000

NODE_ENV
Environment (development or production)
development

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

Please ensure your code follows the Prettier and ESLint rules (npm run format and npm run lint) and includes tests where applicable.
License
This project is licensed under the MIT License. See the LICENSE file for details.
