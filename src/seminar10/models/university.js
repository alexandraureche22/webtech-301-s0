
// ... (Restul importurilor)
const Course = require("../models/course");
// ...
const Student = require("../models/student");
const University = require("../models/university");
// ...

// ... (Toate rutele existente) ...

// ====================================================================
// NOUA IMPLEMENTARE: GET / - EXPORT DATE COMPLETE (Părinți și Copii cu Relații M-la-M)
// ====================================================================

/**
 * GET / - Realizează un export al tuturor datelor: University -> Students -> Courses.
 * Va extrage universitățile și studenții asociați, incluzând cursurile la care sunt înscriși.
 */
router.get("/", async (req, res, next) => {
  try {
    const allData = await University.findAll({
      // Include Studenții asociați (Relația 1-la-N)
      include: [
        {
          model: Student,
          // Include Cursurile asociate Studentului (Relația N-la-M)
          include: [
            {
              model: Course,
              // Atributele din tabela de joncțiune (StudentCourses) sunt incluse implicit
              // sub forma unui array denumit 'StudentCourses' în fiecare curs.
              // Dacă vrei doar ID-urile studentului și cursului, Sequelize face asta
              // automat folosind 'through' pe care l-am definit anterior.
            },
          ],
        },
      ],
      // Dacă nu vrei să vezi atributele de timbru (createdAt, updatedAt) pentru a simplifica output-ul
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).json(allData);
  } catch (error) {
    console.error("Eroare la exportul de date:", error);
    next(error);
  }
});

module.exports = router;
