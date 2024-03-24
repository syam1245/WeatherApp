const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session); // Correct import
const helmet = require("helmet");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");
const compression = require("compression");
const jwt = require("jsonwebtoken");
const User = require("./model");

dotenv.config();

const app = express();

app.use(compression());

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
          "https://weather-app-zr2a.onrender.com/",
          "http://localhost:5000",
        ],
      },
    },
  })
);

// Static files serving
app.use(express.static(path.join(__dirname, "front-end", "build")));

mongoose
  .connect(process.env.MONGO_URI, {
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
    store: new MongoStore({ mongooseConnection: mongoose.connection }), // Initialize MongoStore correctly
    cookie: { maxAge: 1000 * 60 * 60 * 1 }, // 1 hour
  })
);

app.use("/api", routes);

app.get("/api/profile", async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    next(error);
  }
});

// Token validation endpoint
app.get("/api/validate-token", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get the token from the header
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).send(decoded);
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
});

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
