// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const helmet = require("helmet");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");
const compression = require("compression");

dotenv.config();

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "wss://wft-geo-db.p.rapidapi.com",
          "https://wft-geo-db.p.rapidapi.com",
          "https://api.openweathermap.org",
          "http://localhost:5000",
          "https://weather-app-ackf.onrender.com",
        ],
      },
    },
  })
);

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "front-end", "build")));

mongoose
  .connect(process.env.mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 1000 * 60 * 60 * 1 }, // 1 hour
  })
);

app.use("/api", routes);

// Serve the React app
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "front-end", "build", "index.html"),
    (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res
          .status(500)
          .send("An error occurred while trying to serve the page.");
      }
    }
  );
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "production" ? " " : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
