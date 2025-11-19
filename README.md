# Portfolio & Blog API

A complete RESTful API for managing portfolio projects, blog posts, and contact messages.

## Tech Stack

- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-blog
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

## Installation

```bash
cd backend
npm install
npm run dev
```

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/users/register`
- **Access:** Public
- **Body:**
  ```json
  {
    "username": "john",
    "email": "john@example.com",
    "password": "123456"
  }
  ```

#### Login User
- **POST** `/api/users/login`
- **Access:** Public
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "123456"
  }
  ```

#### Get Current User
- **GET** `/api/users/me`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

### Projects

#### Get All Projects
- **GET** `/api/projects`
- **Access:** Public

#### Get Single Project
- **GET** `/api/projects/:id`
- **Access:** Public

#### Create Project
- **POST** `/api/projects`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "My Project",
    "description": "Project description",
    "imageUrl": "https://example.com/image.jpg",
    "repoUrl": "https://github.com/user/repo",
    "liveUrl": "https://example.com"
  }
  ```

#### Update Project
- **PUT** `/api/projects/:id`
- **Access:** Private (Owner only)
- **Headers:** `Authorization: Bearer <token>`

#### Delete Project
- **DELETE** `/api/projects/:id`
- **Access:** Private (Owner only)
- **Headers:** `Authorization: Bearer <token>`

### Blog Posts

#### Get All Blog Posts
- **GET** `/api/blog`
- **Access:** Public

#### Get Single Blog Post
- **GET** `/api/blog/:id`
- **Access:** Public

#### Create Blog Post
- **POST** `/api/blog`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "My Blog Post",
    "content": "Blog post content..."
  }
  ```

#### Update Blog Post
- **PUT** `/api/blog/:id`
- **Access:** Private (Author only)
- **Headers:** `Authorization: Bearer <token>`

#### Delete Blog Post
- **DELETE** `/api/blog/:id`
- **Access:** Private (Author only)
- **Headers:** `Authorization: Bearer <token>`

### Comments

#### Get Comments for a Post
- **GET** `/api/blog/:postId/comments`
- **Access:** Public

#### Create Comment
- **POST** `/api/blog/:postId/comments`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "body": "This is a comment"
  }
  ```

### Contact Messages

#### Send Contact Message
- **POST** `/api/contact`
- **Access:** Public
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I would like to connect..."
  }
  ```

#### Get All Messages
- **GET** `/api/contact`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`
