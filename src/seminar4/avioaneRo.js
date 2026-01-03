import fetch from "node-fetch";

async function getObjectFromUrl(url) {
  const response = await fetch(url);
  const text = await response.text();
  return JSON.parse(text);
}

async function getCountryBounds(country) {
  const object = await getObjectFromUrl(
    `https://nominatim.openstreetmap.org/search?country=${country}&format=json`
  );

  return {
    minLatitude: object[0].boundingbox[0],
    maxLatitude: object[0].boundingbox[1],
    minLongitude: object[0].boundingbox[2],
    maxLongitude: object[0].boundingbox[3],
  };
}

async function getPlanesAboveCountry(country) {
  const bounds = await getCountryBounds(country);
  console.log(`${country} bounds:`, bounds);

  const url = `https://opensky-network.org/api/states/all?lamin=${bounds.minLatitude}&lomin=${bounds.minLongitude}&lamax=${bounds.maxLatitude}&lomax=${bounds.maxLongitude}`;

  const planes = await getObjectFromUrl(url);

  console.log(`Avioane deasupra ${country}:`);
  if (planes.states) {
    planes.states.forEach((plane) => {
      console.log(`✈️  ${plane[1]} (${plane[2]}) — Altitudine: ${plane[13]} m`);
    });
    console.log(`Total avioane: ${planes.states.length}`);
  } else {
    console.log("Nu s-au găsit date despre avioane în acest moment.");
  }
}

// --- testare ---
getPlanesAboveCountry("Romania");
