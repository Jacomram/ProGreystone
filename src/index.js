const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { insertOrder } = require("./Controllers/OrderController");
const flatRoutes = require("./routes/FlatRoutes");

const { createProduct } = require("./Controllers/ProductController");
const {
  getProducts,
  updateProduct,
  getProductByFilter,
} = require("./Controllers/ProductController");
const { signup ,login,profile} = require("./Controllers/UserController"); 
const {verifyToken} = require("./middleware/ValidToken")
//----
dotenv.config();//----

const app = express();
app.use(express.json());

// Servir archivos estáticos desde la carpeta public (si existe)
app.use(express.static('public'));

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ 
    message: "ProGreystone API is running", 
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      users: "/api/signup, /api/login, /api/profile",
      orders: "/api/orders",
      flats: "/api/flats"
    }
  });
});

const mongoURI = process.env.MONGO_URI || "mongodb://mongo:27017/testdb";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/products", createProduct);
app.get("/api/products", getProducts);
app.post("/api/products/:id", updateProduct);
app.get("/api/products/filter", getProductByFilter);
app.post("/api/signup", signup);
app.post("/api/login", login);//----
app.get("/api/profile", verifyToken,profile);

// insert order
app.post("/api/orders", insertOrder);
app.use("/api/flats", flatRoutes);

// Middleware para manejar rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({ 
    error: "Route not found", 
    message: `The route ${req.originalUrl} does not exist`,
    availableRoutes: [
      "GET /",
      "GET /api/products",
      "POST /api/products", 
      "POST /api/products/:id",
      "GET /api/products/filter",
      "POST /api/signup",
      "POST /api/login",
      "GET /api/profile",
      "POST /api/orders",
      "/api/flats/*"
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
