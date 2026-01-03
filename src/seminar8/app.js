app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// --- HANDLER DE ERORI PERSONALIZAT (LOG STACK) ---
app.use((err, req, res, next) => {
  console.error("STACK TRACE:");
  console.error(err.stack);
  next(err);
});

// --- HANDLER DE ERORI DEFAULT ---
app.use((err, req, res, next) => {
  res.status(500).json({ message: "A apărut o eroare în aplicație." });
});

app.listen(port, () => {
  console.log("Running on the port " + port);
});
