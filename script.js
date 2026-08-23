// ===============================
// PREDI-PRO — VRAIS MATCHS
// ===============================

let vraisMatchs = [];


// ===============================
// CHARGER LES MATCHS DEPUIS LE SERVEUR
// ===============================

async function chargerVraisMatchs() {

  const container = document.getElementById("matches");

  if (!container) return;

  container.innerHTML = `
    <div class="match-card">
      ⏳ Chargement des vrais matchs...
    </div>
  `;

  try {

    const response = await fetch("/api/matches");

    if (!response.ok) {
      throw new Error("Erreur du serveur");
    }

    const data = await response.json();

    if (!data.response || data.response.length === 0) {

      container.innerHTML = `
        <div class="match-card">
          📅 Aucun match trouvé aujourd'hui.
        </div>
      `;

      return;
    }

    vraisMatchs = data.response;

    afficherVraisMatchs();

  } catch (error) {

    console.error(error);

    container.innerHTML = `
      <div class="match-card">
        ❌ Impossible de récupérer les matchs.
        <br><br>
        Réessaie dans quelques instants.
      </div>
    `;
  }
}


// ===============================
// AFFICHER LES VRAIS MATCHS
// ===============================

function afficherVraisMatchs() {

  const container =
    document.getElementById("matches");

  if (!container) return;

  container.innerHTML = "";

  vraisMatchs.forEach((match, index) => {

    const home = match.teams.home;
    const away = match.teams.away;

    const date = new Date(match.fixture.date);

    const dateTexte =
      date.toLocaleDateString("fr-FR");

    const heureTexte =
      date.toLocaleTimeString(
        "fr-FR",
        {
          hour: "2-digit",
          minute: "2-digit"
        }
      );

    container.innerHTML += `

      <div class="match-card">

        <div class="league">
          🏆 ${match.league.name}
        </div>

        <div class="match-date">
          📅 ${dateTexte} • ${heureTexte}
        </div>

        <div class="teams">

          <div class="team">

            <img
              src="${home.logo}"
              width="45"
              height="45"
              alt="${home.name}"
            >

            <div>
              ${home.name}
            </div>

          </div>

          <div class="vs">
            VS
          </div>

          <div class="team">

            <img
              src="${away.logo}"
              width="45"
              height="45"
              alt="${away.name}"
            >

            <div>
              ${away.name}
            </div>

          </div>

        </div>

        <div class="match-actions">

          <button
            class="analyse-btn"
            onclick="analyserVraiMatch(${index})">

            📊 Analyser le match

          </button>

          <button
            class="favorite-btn"
            onclick="ajouterVraiFavori(${index})">

            ⭐

          </button>

        </div>

      </div>

    `;
  });
}


// ===============================
// ANALYSER UN VRAI MATCH
// ===============================

async function analyserVraiMatch(index) {

  const match = vraisMatchs[index];

  if (!match) return;

  showPage("analysePage");

  const content =
    document.getElementById("analyseContent");

  content.innerHTML = `

    <button
      class="back-btn"
      onclick="showPage('matchs')">

      ← Retour aux matchs

    </button>

    <div class="analysis-header">

      <div class="league">
        🏆 ${match.league.name}
      </div>

      <div class="match-date">
        📅 ${new Date(match.fixture.date)
          .toLocaleString("fr-FR")}
      </div>

      <div class="teams">

        <div class="team">

          <img
            src="${match.teams.home.logo}"
            width="55"
            height="55"
            alt="${match.teams.home.name}"
          >

          ${match.teams.home.name}

        </div>

        <div class="vs">
          VS
        </div>

        <div class="team">

          <img
            src="${match.teams.away.logo}"
            width="55"
            height="55"
            alt="${match.teams.away.name}"
          >

          ${match.teams.away.name}

        </div>

      </div>

    </div>

    <div class="analysis-section">

      <h2>🤖 Predi-Pro</h2>

      <p>
        Analyse statistique en cours...
      </p>

      <div id="predictionResult">
        ⏳ Récupération de la prédiction...
      </div>

    </div>

  `;


  // Récupérer la prédiction

  try {

    const response = await fetch(
      `/api/prediction/${match.fixture.id}`
    );

    const data = await response.json();

    afficherPrediction(data);

  } catch (error) {

    console.error(error);

    const result =
      document.getElementById("predictionResult");

    if (result) {

      result.innerHTML = `
        ❌ Impossible de récupérer
        la prédiction pour ce match.
      `;

    }
  }
}


// ===============================
// AFFICHER LA PRÉDICTION
// ===============================

function afficherPrediction(data) {

  const result =
    document.getElementById("predictionResult");

  if (!result) return;

  const prediction =
    data.response &&
    data.response[0] &&
    data.response[0].predictions;

  if (!prediction) {

    result.innerHTML = `
      ℹ️ Aucune prédiction disponible
      pour ce match.
    `;

    return;
  }

  const home =
    prediction.percent.home || "-";

  const draw =
    prediction.percent.draw || "-";

  const away =
    prediction.percent.away || "-";

  const winner =
    prediction.winner &&
    prediction.winner.name
      ? prediction.winner.name
      : "Aucun favori déterminé";


  result.innerHTML = `

    <div class="analysis-section">

      <h2>🎯 Probabilités</h2>

      <div class="probability-box">

        <div class="probability">

          <span>Domicile</span>

          <strong>
            ${home}
          </strong>

        </div>

        <div class="probability">

          <span>Nul</span>

          <strong>
            ${draw}
          </strong>

        </div>

        <div class="probability">

          <span>Extérieur</span>

          <strong>
            ${away}
          </strong>

        </div>

      </div>

    </div>


    <div class="analysis-section final-prediction">

      <h2>🤖 Prédiction Predi-Pro</h2>

      <h3>
        ${winner}
      </h3>

      <p class="confidence">
        Probabilités fournies par les données
        sportives disponibles.
      </p>

    </div>

  `;
}


// ===============================
// FAVORIS
// ===============================

function ajouterVraiFavori(index) {

  const match = vraisMatchs[index];

  if (!match) return;

  let favoris =
    JSON.parse(
      localStorage.getItem(
        "predipro_vrais_favoris"
      ) || "[]"
    );

  const existe =
    favoris.some(
      item =>
        item.fixture.id === match.fixture.id
    );

  if (existe) {

    alert(
      "⭐ Ce match est déjà dans tes favoris."
    );

    return;
  }

  favoris.push(match);

  localStorage.setItem(
    "predipro_vrais_favoris",
    JSON.stringify(favoris)
  );

  alert(
    "⭐ Match ajouté aux favoris !"
  );
}


// ===============================
// NAVIGATION
// ===============================

function showPage(page) {

  document.querySelectorAll(".page")
    .forEach(element => {

      element.classList.add("hidden");

    });

  const selected =
    document.getElementById(page);

  if (selected) {

    selected.classList.remove("hidden");

  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ===============================
// DÉMARRAGE
// ===============================

chargerVraisMatchs();