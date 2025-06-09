const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 4000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);

const bcrypt = require("bcrypt");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("location-update", (data) => {
    // console.log("Location received from driver:", data);
    io.emit("location-update", data);
  });

  socket.on("disconnect", () => {});
});

const Bus = require("./Models/bus.js");
const Admin = require("./Models/admin.js");
const { log } = require("console");

app.get("/", (req, res) => {
  res.send("hello world");
});

mongoose
  .connect(
    "mongodb+srv://rbasavaraj0312:Basavaraj1234@node.zy6xw.mongodb.net/?retryWrites=true&w=majority&appName=Node"
  )
  .then(() => {
    console.log("Connected to database");
    server.listen(port, "0.0.0.0", () => {
      console.log(`Server running on ${port} port at localhost`);
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });

app.post("/addstop/:busNumber", async (req, res) => {
  const busNumber = req.params.busNumber;
  const { stopName, latitude, longitude } = req.body;

  try {
    const bus = await Bus.findOne({ number: busNumber });
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    bus.stop.push({
      stopname: stopName,
      reached: false,
      latitude: latitude,
      longitude: longitude,
    });
    await bus.save();

    return res.status(201).json({ message: "Stop added successfully", bus });
  } catch (error) {
    console.error("Error adding stop:", error);
    return res.status(500).json({ error: "Failed to add stop" });
  }
});

app.put("/updatestop/:id", async (req, res) => {
  const { id } = req.params;
  const { reached } = req.body;

  try {
    const bus = await Bus.findOne({ "stop._id": id });
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const stop = bus.stop.id(id);
    if (!stop) {
      return res.status(404).json({ message: "Stop not found" });
    }

    stop.reached = reached;
    await bus.save();

    res.status(200).json({ message: "Stop updated successfully", stop });
  } catch (error) {
    console.error("Error updating stop:", error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/bus", async (req, res) => {
  try {
    const Buses = await Bus.find();
    res.status(200).json(Buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/addbus", async (req, res) => {
  const { number } = req.body;
  try {
    const existBus = await Bus.findOne({ number });
    if (existBus) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newBus = new Bus(req.body);
    const savedBus = await newBus.save();
    res.status(200).json(savedBus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/stops/:busNumber", async (req, res) => {
  const busNumber = req.params.busNumber;

  try {
    const bus = await Bus.findOne({ number: busNumber });

    if (bus) {
      return res.json({ stop: bus.stop });
    } else {
      return res.status(404).json({ error: "Bus number not found" });
    }
  } catch (error) {
    console.error("Error fetching stops:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateLocation/:busNumber", async (req, res) => {
  const { busNumber } = req.params;
  const { latitude, longitude } = req.body;

  try {
    const bus = await Bus.findOneAndUpdate(
      { number: busNumber },
      { latitude, longitude },
      { new: true }
    );

    bus.latitude = latitude;
    bus.longitude = longitude;

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json({ message: "Bus location updated", bus });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/getLocation/:busNumber", async (req, res) => {
  const { busNumber } = req.params;

  try {
    const bus = await Bus.findOne({ number: busNumber });

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Return the bus object directly
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Admin({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.status(200).json({ message: "Login successful", user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

app.post("/loginbus", async (req, res) => {
  const { busnumber, password } = req.body;
  try {
    const user = await Bus.findOne({ number: busnumber });
    if (!user) {
      return res.status(404).json({ message: "bus not found" });
    } else {
      if (password === user.password) {
        res.status(200).json({ message: "Login successful", user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

app.put("/reorderstops/:busNumber", async (req, res) => {
  const { busNumber } = req.params;
  const { stops } = req.body; // Stops should be an array of objects { _id, order }

  try {
    // Validate input
    if (!stops || !Array.isArray(stops)) {
      return res.status(400).json({ message: "Invalid stop data" });
    }

    // Find bus
    const bus = await Bus.findOne({ number: busNumber });
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Update stop order inside the Bus document
    bus.stop = stops; // Replace with new sorted order
    await bus.save();

    res
      .status(200)
      .json({ message: "Stops reordered successfully", stops: bus.stop });
  } catch (error) {
    console.error("Error reordering stops:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
