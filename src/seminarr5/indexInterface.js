const apiUrl = "http://localhost:8000/api/";

async function getById(id) {
  try {
    const response = await axios.get(apiUrl + "getList/" + id);
    return response.data;
  } catch (error) {
    console.error("Eroare la cerere:", error);
    return null;
  }
}

document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("searchId").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "<p>Caut...</p>";

  const data = await getById(id);

  if (!data) {
    resultDiv.innerHTML = "<p style='color:red;'>Resursa nu a fost găsită.</p>";
    return;
  }

  resultDiv.innerHTML = `
    <table border="1">
      <tr><th>ID</th><th>Name</th><th>Age</th></tr>
      <tr><td>${data.id}</td><td>${data.name}</td><td>${data.age}</td></tr>
    </table>
  `;
});
