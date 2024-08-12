# TheCodeBox

TheCodeBox is a blogging platform for programmers. It allows users to create, share, and read blog posts related to programming. The project is divided into a frontend built with React and Vite, and a backend built with Node.js and Express.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features

- User authentication and authorization
- Create, edit, and delete blog posts
- View and comment on blog posts
- Responsive design

## Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Backend

1. Navigate to the `backend` directory:

    ```sh
    cd backend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your MongoDB credentials:

    ```env
    SECRET=your_jwt_secret
    MONGO_NAME=your_mongo_username
    MONGO_PASSWORD=your_mongo_password
    ```

4. Start the backend server:

    ```sh
    npm run dev
    ```

### Frontend

1. Navigate to the `frontend` directory:

    ```sh
    cd frontend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` for the frontend.
2. The backend server runs on `http://localhost:5555`.

## Project Structure

```sh
.
├── .gitignore
├── backend
│   ├── .env
│   ├── app.js
│   ├── config.js
│   ├── index.js
│   ├── model
│   │   ├── blogModel.js
│   │   └── userModel.js
│   ├── package.json
│   ├── routes
│   │   ├── authRoute.js
│   │   └── blogsRoute.js
│   └── vercel.json
├── frontend
│   ├── .eslintrc.cjs
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   ├── README.md
│   ├── src
│   │   ├── App.jsx
│   │   ├── assets
│   │   ├── components
│   │   │   ├── Feed.jsx
│   │   │   └── Logo.jsx
│   │   ├── config.js
│   │   ├── context
│   │   │   └── alertContext.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── MUIComponents.jsx
│   │   │   ├── BootstrapTooltip.jsx
│   │   │   └── ...
│   │   └── pages
│   │       └── ...
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

### Backend

- [`backend/config.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2FtheCodeBox%2Fbackend%2Fconfig.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/theCodeBox/backend/config.js"): Configuration file for environment variables.
- [`backend/model/`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2FtheCodeBox%2Fbackend%2Fmodel%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/theCodeBox/backend/model/"): Contains Mongoose models for blog posts and users.
- [`backend/routes/`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2FtheCodeBox%2Fbackend%2Froutes%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/theCodeBox/backend/routes/"): Contains route handlers for authentication and blog-related operations.
- [`backend/index.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2FtheCodeBox%2Fbackend%2Findex.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/theCodeBox/backend/index.js"): Entry point for the backend server.

### Frontend

- [`frontend/src/components/`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2FtheCodeBox%2Ffrontend%2Fsrc%2Fcomponents%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/theCodeBox/frontend/src/components/"): Contains React components like `Feed` and `Logo`.
- [`frontend/src/context/`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2FtheCodeBox%2Ffrontend%2Fsrc%2Fcontext%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/theCodeBox/frontend/src/context/"): Contains context providers like `alertContext`.
- [`frontend/src/index.css`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2FtheCodeBox%2Ffrontend%2Fsrc%2Findex.css%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/theCodeBox/frontend/src/index.css"): Global CSS styles.
- [`frontend/src/main.jsx`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2FtheCodeBox%2Ffrontend%2Fsrc%2Fmain.jsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/theCodeBox/frontend/src/main.jsx"): Entry point for the frontend application.
