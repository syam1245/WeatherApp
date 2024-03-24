# MERN Stack Weather Dashboard App


## Table of Contents
- [MERN Stack Weather Dashboard App](#mern-stack-weather-dashboard-app)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Frontend Components](#frontend-components)
    - [index.js](#indexjs)
    - [App.js](#appjs)
    - [api.js](#apijs)
    - [Search.jsx](#searchjsx)
    - [Current-weather.js](#current-weatherjs)
    - [forecast.js](#forecastjs)
    - [Footer.jsx](#footerjsx)
    - [Header.jsx](#headerjsx)
    - [SignIn.jsx](#signinjsx)
    - [SignUpForm.jsx](#signupformjsx)
    - [Profile.jsx](#profilejsx)
- [Weather Dashboard App (Backend)](#weather-dashboard-app-backend)
  - [Table of Contents (Backend)](#table-of-contents-backend)
  - [Overview](#overview-1)
  - [Server Configuration](#server-configuration)
    - [server.js](#serverjs)
  - [Routes](#routes)
    - [routes.js](#routesjs)
  - [Database Model](#database-model)
    - [model.js](#modeljs)
  - [Environment Configuration](#environment-configuration)
    - [.env](#env)

## Overview
The Weather Dashboard application allows users to search for weather forecasts for various cities. It leverages the MERN stack, with MongoDB for data storage, Express.js for handling HTTP requests, React.js for the frontend, and Node.js for server-side operations. The application integrates with external APIs to fetch weather data and utilizes React Router for client-side routing.

## Frontend Components
### index.js
- **Description:** This file serves as the entry point for the frontend application. It configures the React Router for navigation and renders the main application component wrapped in a Router.
- **Dependencies:** React, ReactDOM, react-router-dom, App, Footer, Header, SignUpForm, SignIn, Profile.
- **Routes:**
    - `/` - Renders the main application component (`<App />`).
    - `/signup` - Renders the SignUpForm component.
    - `/login` - Renders the SignIn component.
    - `/profile` - Renders the Profile component.
  
### App.js
- **Description:** The main application component responsible for rendering the search bar, current weather, and forecast components. It handles user input for city search and fetches weather data from external APIs.
- **Dependencies:** React, Search, CurrentWeather, Forecast.
- **State:**
    - `currentWeather`: Stores the current weather data for the searched city.
    - `forecast`: Stores the weather forecast data for the searched city.
- **Functions:**
    - `handleOnSearchChange`: Handles the search input change event and fetches weather data for the entered city.

### api.js
- **Description:** Contains constants for API endpoints and keys used in the application. It abstracts away API details for better maintainability.
- **APIs:**
    - Geo API: Used for fetching city coordinates.
    - Weather API: Used for fetching weather data.

### Search.jsx
- **Description:** Renders a searchable dropdown for city selection. It asynchronously fetches city data based on user input and calls the parent component's callback with selected city coordinates.
- **Dependencies:** React, react-select-async-paginate, geoApiOptions.

### Current-weather.js
- **Description:** Displays the current weather information for a selected city. It includes details like temperature, wind speed, humidity, and pressure.
- **Dependencies:** React.
- **Props:**
    - `data`: Object containing current weather data fetched from the API.

### forecast.js
- **Description:** Renders a daily weather forecast for the selected city. It displays weather details for the upcoming days, including temperature, pressure, humidity, wind speed, and cloud cover.
- **Dependencies:** React, react-accessible-accordion.
- **Props:**
    - `data`: Object containing forecast data fetched from the API.

### Footer.jsx
- **Description:** Displays the footer section of the application, containing copyright information.
- **Dependencies:** React.

### Header.jsx
- **Description:** Renders the header section of the application, including the navigation bar with links to sign up.
- **Dependencies:** React, react-bootstrap, react-router-dom.

### SignIn.jsx
- **Description:** Provides a form for users to sign in. It handles form submission, validates user input, and redirects to the profile page upon successful login.
- **Dependencies:** React, react-bootstrap, axios, useNavigate.

### SignUpForm.jsx
- **Description:** Allows users to sign up for the application. It collects user details such as name, email, and password, validates the input, and displays relevant error/success messages.
- **Dependencies:** React, react-bootstrap, axios, useNavigate.

### Profile.jsx
- **Description:** Displays the user's profile page with options for account settings and logout functionality.
- **Dependencies:** React, react-bootstrap.


# Weather Dashboard App (Backend)

This documentation covers all backend components of the MERN (MongoDB, Express.js, React.js, Node.js) stack Weather Dashboard application. It provides detailed insights into each component's functionalities, structure, and interactions.

## Table of Contents (Backend)
1. [Overview](#overview)
2. [Server Configuration](#server-configuration)
    - [server.js](#serverjs)
3. [Routes](#routes)
    - [routes.js](#routesjs)
4. [Database Model](#database-model)
    - [model.js](#modeljs)
5. [Environment Configuration](#environment-configuration)
    - [.env](#env)

## Overview
The backend of the Weather Dashboard application is built using Node.js and Express.js. It handles HTTP requests, manages user authentication, interacts with the MongoDB database, and serves the frontend application.

## Server Configuration
### server.js
- **Description:** This file configures the Express.js server. It sets up middleware for compression, security, CORS, parsing JSON, and serving static files. It establishes a connection to the MongoDB database and defines routes for handling API requests.
- **Dependencies:** Express, mongoose, dotenv, session, connect-mongo, helmet, cors, path, compression.
- **Middleware:**
    - `compression()`: Compresses HTTP responses.
    - `helmet()`: Sets security-related HTTP headers.
    - `cors()`: Enables Cross-Origin Resource Sharing.
    - `express.json()`: Parses JSON request bodies.
    - `express.urlencoded()`: Parses URL-encoded request bodies.
    - `session()`: Configures session handling with MongoDB store.
- **Routes:**
    - `/api`: Routes for handling user authentication (`/signup`, `/login`).

## Routes
### routes.js
- **Description:** Defines API routes for user authentication (sign up and login). It utilizes Express.js Router to handle HTTP requests and interacts with the User model for data manipulation.
- **Dependencies:** Express, bcrypt, jwt, User model.
- **Endpoints:**
    - `POST /api/signup`: Registers a new user.
    - `POST /api/login`: Authenticates a user.
- **Middleware:**
    - `body()`: Validates request body parameters using express-validator.
- **Error Handling:** Utilizes `handleErrors()` function to handle validation and server errors.

## Database Model
### model.js
- **Description:** Defines the user schema and model for MongoDB. It specifies the structure of user documents, including fields like username, email, and password.
- **Dependencies:** Mongoose.
- **Schema:**
    - `username`: String field for storing user's username.
    - `email`: String field for storing user's email.
    - `password`: String field for storing hashed password.

## Environment Configuration
### .env
- **Description:** Contains environment variables used in the application, including MongoDB connection URI, JWT secret key, Bcrypt secret key, and server port.
- **Variables:**
    - `mongo_URI`: MongoDB connection URI with authentication credentials.
    - `JWT_SECRET`: Secret key for JWT token generation.
    - `BCRYPT_SECRET`: Secret key for bcrypt hashing.
    - `PORT`: Port number for the Express.js server.

---
