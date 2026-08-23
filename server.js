const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("."));

const API_URL = "https://v3.football.api-sports.io";

async function apiFootball(endpoint) {
  const response = await fetch(API_URL + endpoint, {
    headers: {
      "x-apisports-key": process.env.API_SPORTS_KEY
    }
  });

  if (!response.ok) {
    throw new Error("Erreur API : " + response.status);
  }

  return await response.json();
}

app.get("/api/matches", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const data = await apiFootball(
      `/fixtures?from=${today}&to=${today}`
    );

    res.json(data);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Impossible de récupérer les matchs."
    });
  }
});

app.get("/api/prediction/:fixture", async (req, res) => {
  try {
    const fixtureId = req.params.fixture;

    const data = await apiFootball(
      `/predictions?fixture=${fixtureId}`
    );

    res.json(data);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Impossible de récupérer la prédiction."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Predi-Pro fonctionne sur le port ${PORT}`);
});