**Node.js + TypeScript Clean Architecture Backend Template**

This is a production-ready Node.js and TypeScript monolith backend template designed with clean architecture principles to ensure modularity, scalability, and maintainability. It provides a robust foundation for building feature-rich RESTful APIs, with initial support for authentication, error handling, and database management using Prisma. The template is ideal for developers aiming to build scalable, industry-standard applications.

**Table of Contents**

-   [Features](#features)
-   [Technologies](#technologies)
-   [Clean Architecture](#clean-architecture)
-   [Project Structure](#project-structure)
-   [Prerequisites](#prerequisites)
-   [Setup Instructions](#setup-instructions)
-   [Running the Application](#running-the-application)
-   [Testing the API](#testing-the-api)
-   [Extending the Template](#extending-the-template)
-   [Scripts](#scripts)
-   [Environment Variables](#environment-variables)
-   [Contributing](#contributing)
-   [License](#license)

**Features**

-   **Clean Architecture**: Organized into layers (entities, use cases, controllers, infrastructure) for separation of concerns, testability, and scalability.
-   **Authentication**: Basic login functionality with bcrypt for password hashing, ready for expansion to full auth flow (register, refresh tokens, password reset).
-   **Error Handling**: Centralized error management with custom `AppError` class and async error wrapper (`catchAsync`).
-   **Logging**: Winston for error and combined logs, Morgan for HTTP request logging.
-   **Database**: Prisma ORM with PostgreSQL for type-safe database operations.
-   **Code Quality**: Prettier for formatting, ESLint for linting, and TypeScript for type safety.
-   **Modular Design**: Feature-based structure to support multiple features (e.g., auth, user management, posts).
-   **Standardized Responses**: Consistent API response format `{ status, message, data, errors }`.

**Technologies**

-   **Node.js**: v18 or higher, for server-side JavaScript.
-   **TypeScript**: v5.4.5, for static typing and improved developer experience.
-   **Express**: v4.18.2, for building RESTful APIs.
-   **Prisma**: v5.16.0, for database ORM with PostgreSQL.
-   **Winston & Morgan**: For comprehensive logging.
-   **Bcrypt**: v5.1.1, for secure password hashing.
-   **Prettier & ESLint**: For consistent code style and quality.
-   **ts-node-dev**: For development with hot reloading.

**Clean Architecture**

This template follows clean architecture principles to ensure a maintainable and testable codebase:

-   **Entities**: Core business models (e.g., `User`) in `src/domain/entities`, independent of frameworks or databases.
-   **Use Cases**: Business logic (e.g., `loginUser`) in `src/domain/use-cases`, organized by feature, interacting with entities and repository interfaces.
-   **Controllers/Routes**: HTTP handling in `src/interfaces/controllers` and `src/interfaces/routes`, calling use cases for business logic.
-   **Infrastructure**: External services (e.g., Prisma, logging) in `src/infrastructure`, implementing repository interfaces.
-   **Dependency Rule**: Dependencies flow inward—controllers depend on use cases, use cases depend on entities, and infrastructure depends on use cases via interfaces.
-   **Interfaces**: Repository interfaces (e.g., `IUserRepository`) in `src/domain/use-cases/interfaces` decouple use cases from infrastructure.

This structure aligns with industry standards, making the codebase scalable, testable, and easy to extend.

**Project Structure**

```plaintext
project-root/
├── src/
│   ├── domain/                     # Core business logic
│   │   ├── entities/               # Business models
│   │   │   └── user.ts             # User entity
│   │   └── use-cases/              # Business logic
│   │       ├── auth/               # Auth feature
│   │       │   └── loginUser.ts    # Login use case
│   │       └── interfaces/         # Repository interfaces
│   │           └── userRepository.ts
│   ├── interfaces/                 # HTTP layer
│   │   ├── controllers/            # Express controllers
│   │   │   └── authController.ts   # Auth controller
│   │   └── routes/                 # Express routes
│   │       └── authRoutes.ts       # Auth routes
│   ├── infrastructure/             # External services
│   │   ├── database/               # Prisma client
│   │   │   └── prisma.ts           # Singleton Prisma client
│   │   └── logger/                 # Logging
│   │       └── logger.ts           # Winston logger
│   ├── middleware/                 # Express middleware
│   │   ├── errorHandler.ts         # Global error handler
│   │   └── responseHandler.ts      # Response formatter
│   ├── types/                      # TypeScript interfaces
│   │   └── index.ts                # Custom types
│   ├── utils/                      # Shared utilities
│   │   ├── catchAsync.ts           # Async error wrapper
│   │   └── appError.ts             # Custom error class
│   └── app.ts                      # Main Express app
├── prisma/
│   └── schema.prisma               # Prisma schema
├── .env                            # Environment variables
├── .eslintrc.js                    # ESLint config
├── .prettierrc                    # Prettier config
├── .prettierignore                 # Prettier ignore
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies and scripts
└── README.md                       # This file

```

**Prerequisites**

-   **Node.js**: v18 or higher
-   **PostgreSQL**: v13 or higher, running locally or remotely
-   **npm**: v8 or higher
-   **Git**: For cloning and version control
-   **VS Code** (recommended): With Prettier (`esbenp.prettier-vscode`) and ESLint (`dbaeumer.vscode-eslint`) extensions

**Setup Instructions**

1.  Clone the repository:
    
    ```bash
    git clone https://github.com/your-username/backend-template.git
    cd backend-template
    
    ```
    
2.  Install dependencies:
    
    ```bash
    npm install
    
    ```
    
3.  Configure environment variables:  
    Create a `.env` file in the project root:
    
    ```plaintext
    DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
    PORT=3000
    NODE_ENV=development
    
    ```
    
    Replace `user`, `password`, and `dbname` with your PostgreSQL credentials.
    
4.  Set up Prisma:  
    Initialize the database schema and generate the Prisma client:
    
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    
    ```
    
5.  Seed initial data (optional):  
    Create a `prisma/seed.ts` file to seed users:
    
    ```typescript
    import { PrismaClient } from '@prisma/client';
    import bcrypt from 'bcrypt';
    
    const prisma = new PrismaClient();
    
    async function main() {
      const hashedPassword = await bcrypt.hash('password', 10);
      await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
          email: 'test@example.com',
          password: hashedPassword,
          name: 'Test User',
        },
      });
    }
    
    main()
      .then(() => prisma.$disconnect())
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
    
    ```
    
    Run:
    
    ```bash
    npx prisma db seed
    
    ```
    

**Running the Application**

-   Development mode (with hot reloading):
    
    ```bash
    npm run dev
    
    ```
    
-   Production mode:
    
    ```bash
    npm run build
    npm start
    
    ```
    

The server runs on `http://localhost:3000` (or the port specified in `.env`).

**Testing the API**

Test the login endpoint using `curl`, Postman, or any API client:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password"}'

```

**Expected Response (Success)**:

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "test@example.com"
    }
  },
  "errors": null
}

```

**Expected Response (Error)**:

```json
{
  "status": "fail",
  "errors": [
    {
      "message": "Invalid email or password"
    }
  ],
  "data": null
}

```

**Note**: Ensure a user exists in the database with a hashed password (use `prisma/seed.ts` or Prisma Studio: `npx prisma studio`).

**Extending the Template**

To add new features (e.g., user management, posts):

1.  Create a feature module:
    -   Add a folder in `src/domain/use-cases` (e.g., `user`).
    -   Define use cases (e.g., `getUser.ts`, `updateUser.ts`).
    -   Create controllers in `src/interfaces/controllers` (e.g., `userController.ts`).
    -   Add routes in `src/interfaces/routes` (e.g., `userRoutes.ts`).
    -   Mount routes in `src/app.ts` (e.g., `app.use('/api/users', userRoutes)`).
2.  Update Prisma schema:
    -   Modify `prisma/schema.prisma` for new models (e.g., `Post`).
    -   Run `npx prisma migrate dev --name add-post-model`.
3.  Add middleware:
    -   Implement authentication or RBAC in `src/middleware` (e.g., `authMiddleware.ts`).
4.  Write tests:
    -   Add unit tests in `src/tests` using Jest (e.g., `user.test.ts`).

Example: To add a `Post` feature:

-   Create `src/domain/use-cases/post/createPost.ts`.
-   Create `src/interfaces/controllers/postController.ts`.
-   Create `src/interfaces/routes/postRoutes.ts`.
-   Update `schema.prisma` with a `Post` model.
-   Add `app.use('/api/posts', postRoutes)` in `app.ts`.

**Scripts**

-   `npm start`: Run the compiled app in production.
-   `npm run build`: Compile TypeScript to JavaScript.
-   `npm run dev`: Run in development with hot reloading.
-   `npm run format`: Format code with Prettier.
-   `npm run format:check`: Check code formatting.
-   `npm run lint`: Run ESLint for code quality.
-   `npm run prisma:generate`: Generate Prisma client.
-   `npm run prisma:migrate`: Apply database migrations.

**Environment Variables**

-   `DATABASE_URL`: PostgreSQL connection string (required).
-   `PORT`: Server port (default: 3000).
-   `NODE_ENV`: Environment (`development` or `production`, default: development).

**Contributing**

Contributions are welcome! To contribute:

1.  Fork the repository.
2.  Create a feature branch:
    
    ```bash
    git checkout -b feature/your-feature
    
    ```
    
3.  Commit your changes:
    
    ```bash
    git commit -m "Add your feature"
    
    ```
    
4.  Push to the branch:
    
    ```bash
    git push origin feature/your-feature
    
    ```
    
5.  Open a pull request.

Ensure your code follows Prettier and ESLint rules (`npm run format` and `npm run lint`) and includes tests where applicable.

**License**

This project is licensed under the MIT License. See the LICENSE file for details.
