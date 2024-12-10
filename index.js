const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper functions to read/write JSON
const readData = () => JSON.parse(fs.readFileSync("storage.json", "utf-8"));
const writeData = (data) => fs.writeFileSync("storage.json", JSON.stringify(data, null, 2));

// Utility to log arrays
const logArrays = (data) => {
  console.log("Current Fruit List:", JSON.stringify(data.fruitList));
  console.log("Current Recycle Bin:", JSON.stringify(data.recycleBin));
  console.log("Current Users:", JSON.stringify(data.users));
};

// Routes
// 1. Signup
app.post("/signup", (req, res) => {
  const { username, password, confirmPassword } = req.body;
  const data = readData();

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  // Check if user already exists
  if (data.users.some((user) => user.username === username)) {
    return res.status(400).send({ message: "User already exists" });
  }

  // Register user
  data.users.push({ username, password });
  writeData(data);
  console.log(`New user registered: ${username}`);
  logArrays(data);
  res.status(201).send({ message: "Signup successful" });
});

// 2. Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const data = readData();

  const user = data.users.find((user) => user.username === username && user.password === password);
  if (user) {
    console.log(`User logged in: ${username}`);
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

// 3. Add Fruit
app.post("/fruits", (req, res) => {
  const { fruit } = req.body;
  const data = readData();

  // Add fruit with its original index
  data.fruitList.push({ fruit, originalIndex: data.fruitList.length });
  writeData(data);

  console.log(`Fruit added: ${fruit}`);
  logArrays(data);
  res.status(201).send({ message: `Fruit "${fruit}" added successfully` });
});

// 4. Delete Fruit (Move to Recycle Bin)
app.delete("/fruits", (req, res) => {
  const { index } = req.body;
  const data = readData();

  const [deletedFruit] = data.fruitList.splice(index, 1);
  data.recycleBin.push(deletedFruit);
  writeData(data);

  console.log(`Fruit moved to recycle bin: ${deletedFruit.fruit}`);
  logArrays(data);
  res.status(200).send({ message: `Fruit "${deletedFruit.fruit}" moved to recycle bin` });
});

// 5. Restore Fruit from Recycle Bin
app.post("/recyclebin/restore", (req, res) => {
  const { index } = req.body;
  const data = readData();

  const { fruit, originalIndex } = data.recycleBin[index];
  data.recycleBin.splice(index, 1);

  // Find the correct insertion index to maintain order
  let insertionIndex = data.fruitList.length;
  for (let i = 0; i < data.fruitList.length; i++) {
    if (originalIndex < data.fruitList[i].originalIndex) {
      insertionIndex = i;
      break;
    }
  }

  data.fruitList.splice(insertionIndex, 0, { fruit, originalIndex });
  writeData(data);

  console.log(`Fruit restored: ${fruit}`);
  logArrays(data);
  res.status(200).send({ message: `Fruit "${fruit}" restored to fruit list` });
});

// 6. Permanently Delete Fruit from Recycle Bin
app.delete("/recyclebin", (req, res) => {
  const { index } = req.body;
  const data = readData();

  const [deletedFruit] = data.recycleBin.splice(index, 1);
  writeData(data);

  console.log(`Fruit permanently deleted: ${deletedFruit.fruit}`);
  logArrays(data);
  res.status(200).send({ message: `Fruit "${deletedFruit.fruit}" permanently deleted` });
});

// 7. Empty Recycle Bin
app.delete("/recyclebin/empty", (req, res) => {
  const data = readData();

  data.recycleBin = [];
  writeData(data);

  console.log("Recycle bin emptied");
  logArrays(data);
  res.status(200).send({ message: "Recycle bin emptied" });
});

// 8. Get Data for Frontend
app.get("/data", (req, res) => {
  const data = readData();
  res.status(200).send(data);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});