// Express Initialisation
const express = require("express");
const app = express();
const port = 3000;

// Sequelize Initialisation
const sequelize = require("./sequelize");

// Import created models
const University = require("./models/university");
const Student = require("./models/student");
const Course = require("./models/course"); // <-- Import model NOU

// Import Routes
const universityRoutes = require("./routes/university");

// Express middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// ====================================================================
// DEFINIREA RELAȚIILOR (Asocieri)
// ====================================================================

// Relația 1-la-N (University -> Student)
University.hasMany(Student);

// Relația N-la-M (Student <-> Course)
// Creează tabela de joncțiune 'StudentCourses'
Student.belongsToMany(Course, {
  through: "StudentCourses",
  foreignKey: "studentId",
});
Course.belongsToMany(Student, {
  through: "StudentCourses",
  foreignKey: "courseId",
});

// ====================================================================

// Use imported routes
app.use("/api", universityRoutes); // Toate rutele din university.js vor fi prefixate cu /api

// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
  console.error("[ERROR]:" + err);
  res.status(500).json({ message: "500 - Server Error" });
});

/**
 * Endpoint pentru sincronizare (creare baza de date)
 */
app.get("/create", async (req, res, next) => {
  try {
    // Sincronizarea va crea toate tabelele, inclusiv cele de joncțiune
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created with the models." });
  } catch (err) {
    next(err);
  }
});

// Kickstart the Express aplication
app.listen(port, () => {
  console.log("The server is running on http://localhost:" + port);
});
