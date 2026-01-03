const { Op } = require("sequelize");
const Employee = require("../models/employee");

const router = require("express").Router();

router
  .route("/employees")
  .get(async (req, res) => {
    // GET: Listare, Filtrare după nume ȘI Sortare
    try {
      let where = {};
      let order = [];
      const { name, orderBy } = req.query; // Extrage parametrii 'name' și 'orderBy'

      // 1. LOGICA DE FILTRARE (după nume)
      if (name) {
        where.firstName = {
          [Op.like]: `%${name}%`,
        };
      }

      // 2. LOGICA DE SORTARE (după câmpul specificat în orderBy)
      if (orderBy) {
        // Listează câmpurile permise pentru sortare pentru a preveni atacuri SQL Injection
        const allowedFields = ["firstName", "lastName", "birthYear", "salary"];

        if (allowedFields.includes(orderBy)) {
          // Aplică sortarea: [NumeCâmp, Direcție]. Folosim 'ASC' (Ascendent) ca default.
          order.push([orderBy, "ASC"]);
        }
      }

      const employees = await Employee.findAll({
        where: where,
        order: order, // Aplică sortarea
      });

      return res.status(200).json(employees);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    // POST: Creare înregistrare nouă (va declanșa validările din models/employee.js)
    try {
      const newEmployee = await Employee.create(req.body);
      return res.status(200).json(newEmployee);
    } catch (err) {
      // Prinde erorile, inclusiv cele de validare
      return res.status(500).json(err);
    }
  });

router.route("/employees/:id").delete(async (req, res) => {
  // DELETE: Ștergere înregistrare după ID
  try {
    const { id } = req.params;

    const deletedRowCount = await Employee.destroy({
      where: { id: id },
    });

    if (deletedRowCount === 0) {
      // Angajatul nu a fost găsit
      return res.status(404).json({ message: "Angajatul nu a fost găsit." });
    }

    // răspuns standard pentru ștergere reușită
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
