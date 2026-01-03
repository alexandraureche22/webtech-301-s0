import fs from "fs";

// fct compresie rle
function compressRLE(inputText) {
  if (!inputText) return "";

  let compressed = "";
  let count = 1;

  for (let i = 1; i <= inputText.length; i++) {
    if (inputText[i] === inputText[i - 1]) {
      count++;
    } else {
      compressed += inputText[i - 1] + count;
      count = 1;
    }
  }

  return compressed;
}

function compressFile(inputPath, outputPath) {
  try {
    const data = fs.readFileSync(inputPath, "utf8");
    const compressed = compressRLE(data);
    fs.writeFileSync(outputPath, compressed);
    console.log(`✅ Fișierul a fost comprimat cu succes: ${outputPath}`);
  } catch (err) {
    console.error("❌ Eroare la procesarea fișierului:", err.message);
  }
}

// --- testare ---
compressFile("input.txt", "output_rle.txt");
