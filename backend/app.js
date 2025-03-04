const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const serviceAccount = require("./serviceaccountkey.json"); 
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const models = [
  { id: 1, name: "AIR JORDAN", url: "https://d3ecp0do4cosz.cloudfront.net/assets/3Dmodels/nullAir%20Jordan%201%20Low-v-0-v-.glb" },
  { id: 2, name: "AIR JORDAN", url: "https://d3ecp0do4cosz.cloudfront.net/assets/3Dmodels/nullJordan%20Hex%20Mule-v-0-v-.glb" },
  { id: 3, name: "AIR JORDAN", url: "https://d3ecp0do4cosz.cloudfront.net/assets/3Dmodels/nullNike%20Air%20Max%2097%20SE-v-0-v-.glb" },
  { id: 4, name: "AIR JORDAN", url: " https://d3ecp0do4cosz.cloudfront.net/assets/3Dmodels/nullNike%20Oneonta%20Next%20Nature-v-0-v-.glb" },
  { id: 5, name: "AIR JORDAN", url: "https://d3ecp0do4cosz.cloudfront.net/assets/3Dmodels/nullTrue%20Blue%20and%20Copper-v-0-v-.glb" },
];

app.get("/models", async (req, res) => {
  try {
    const snapshot = await db.collection("models").get();
    const modelList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(modelList.length ? modelList : models); 
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

app.post("/upload", async (req, res) => {
  const { name, description, url } = req.body;
  if (!name || !url) return res.status(400).json({ error: "Name and URL are required" });

  try {
    const docRef = await db.collection("models").add({ name, description, url });
    res.status(201).json({ id: docRef.id, name, description, url });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload model" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
