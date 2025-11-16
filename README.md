# Sweet Shop Management System

A full-stack web application for managing a sweet shop, built with Node.js/TypeScript backend and React frontend.

## Features

- User authentication (register/login) with JWT
- CRUD operations for sweets
- Inventory management (purchase/restock)
- Search functionality for sweets
- Responsive UI

## Tech Stack

### Backend
- Node.js
- TypeScript
- Express.js
- MongoDB
- Prisma ORM
- JWT Authentication
- Jest for testing

### Frontend
- React (TypeScript)
- Vite
- React Testing Library

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database connection:
   - Update the `DATABASE_URL` in `backend/.env` with your MongoDB connection string
   - Example local: `mongodb://localhost:27017/sweet_shop_db`
   - Example Atlas: `mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority`

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Sync schema to MongoDB:
   ```bash
   npx prisma db push
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Sweets
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/:id` - Get sweet by ID
- `POST /api/sweets` - Create a new sweet
- `PUT /api/sweets/:id` - Update sweet
- `DELETE /api/sweets/:id` - Delete sweet
- `GET /api/sweets/search/:query` - Search sweets

### Inventory
- `GET /api/inventory/:sweetId` - Get inventory for a sweet
- `POST /api/inventory/purchase` - Purchase sweet (decrease stock)
- `POST /api/inventory/restock` - Restock sweet (increase stock)

## Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## AI Usage in Development

This project was developed with assistance from AI tools, specifically BLACKBOXAI, which helped in:
- Generating initial project structure and boilerplate code
- Writing clean, maintainable code following best practices
- Implementing authentication and CRUD operations
- Setting up testing frameworks
- Creating comprehensive documentation

The AI was used to accelerate development while ensuring code quality and adherence to SOLID principles.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
