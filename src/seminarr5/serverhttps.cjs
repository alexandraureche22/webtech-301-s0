// let express = require('express');
// let bodyParser = require('body-parser');
// let cors = require('cors');
// let app = express();
// let router = express.Router();

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(cors());
// app.use("/api", router);

// const array = [
//     {id: 1, name: "Ionut", age: 25},
//     {id: 2, name: "Alex", age: 18},
//     {id: 3, name: "Mihai", age: 13},
//     {id: 4, name: "Marcel", age: 12},
//     {id: 5, name: "Marius", age: 22}
//   ];
  
//   router.route("/getList").get((req, res) => {
//     res.json(array);
//   });

//   router.route("/postList").post((req, res) => {
//     let el = req.body;
//     array.push(el);
//     res.json(el);
//   });
  
//   let port = 8000;
//   app.listen(port);
  
//   console.log("API is running.");

// // endpoint pentru a obține o resursă după id
// // router.route("/getById/:id").get((req, res) => {
// //   const id = parseInt(req.params.id); // luăm id-ul din URL
// //   const item = array.find(el => el.id === id); // căutăm în array

// //   if (!item) {
// //     return res.status(404).json({ message: "Resursa nu a fost găsită." });
// //   }

// //   res.json(item);
// // });


// router.route("/getList/:id").get((req, res) => {
//   const id = parseInt(req.params.id);
//   const person = array.find(p => p.id === id);

//   if (!person) {
//     res.status(404).send({ message: "Persoana nu a fost găsită" });
//   } else {
//     res.json(person);
//   }
// });

let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

const array = [
  { id: 1, name: "Ionut", age: 25 },
  { id: 2, name: "Alex", age: 18 },
  { id: 3, name: "Mihai", age: 13 },
  { id: 4, name: "Marcel", age: 12 },
  { id: 5, name: "Marius", age: 22 },
];

// GET toate persoanele
router.route("/getList").get((req, res) => {
  res.json(array);
});

// GET persoană după ID
router.route("/getList/:id").get((req, res) => {
  const id = parseInt(req.params.id);
  const person = array.find(p => p.id === id);

  if (!person) {
    res.status(404).send({ message: "Persoana nu a fost găsită" });
  } else {
    res.json(person);
  }
});

// POST - adaugă o persoană nouă
router.route("/postList").post((req, res) => {
  let el = req.body;
  array.push(el);
  res.json(el);
});

// PUT - actualizează o persoană
router.route("/update/:id").put((req, res) => {
  const id = parseInt(req.params.id);
  const index = array.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).send({ message: "Persoana nu a fost găsită" });
  }

  array[index].name = req.body.name || array[index].name;
  array[index].age = req.body.age || array[index].age;

  res.json({ message: "Persoana a fost actualizată cu succes", updated: array[index] });
});

// DELETE - șterge o persoană
router.route("/delete/:id").delete((req, res) => {
  const id = parseInt(req.params.id);
  const index = array.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).send({ message: "Persoana nu a fost găsită" });
  }

  const deleted = array.splice(index, 1);
  res.json({ message: "Persoana a fost ștearsă cu succes", deleted: deleted[0] });
});

let port = 8000;
app.listen(port);
console.log("API is running on port " + port);
