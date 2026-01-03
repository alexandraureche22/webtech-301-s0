// PUT - actualizare persoană după ID
router.route("/update/:id").put((req, res) => {
    const id = parseInt(req.params.id);
    const index = array.findIndex(p => p.id === id);
  
    if (index === -1) {
      return res.status(404).send({ message: "Persoana nu a fost găsită" });
    }
  
    // Actualizare date
    array[index].name = req.body.name || array[index].name;
    array[index].age = req.body.age || array[index].age;
  
    res.json({ message: "Persoana a fost actualizată cu succes", updated: array[index] });
  });
  
  
  // DELETE - ștergere persoană după ID
  router.route("/delete/:id").delete((req, res) => {
    const id = parseInt(req.params.id);
    const index = array.findIndex(p => p.id === id);
  
    if (index === -1) {
      return res.status(404).send({ message: "Persoana nu a fost găsită" });
    }
  
    const deleted = array.splice(index, 1);
    res.json({ message: "Persoana a fost ștearsă cu succes", deleted: deleted[0] });
  });
  