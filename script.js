// ===============================
// PREDI-PRO
// ===============================

const matchs = [
  {
    league: "🏆 Ligue des Champions",
    date: "25 août 2026 • 19:00",
    team1: "Équipe A",
    team2: "Équipe B",
    icon1: "🔵",
    icon2: "🔴",
    cote1: "1.85",
    nul: "3.40",
    cote2: "4.20",
    prediction: "Victoire Équipe A",
    confiance: "52%"
  },

  {
    league: "🌍 Premier League",
    date: "26 août 2026 • 18:30",
    team1: "Équipe C",
    team2: "Équipe D",
    icon1: "🟢",
    icon2: "⚫",
    cote1: "2.10",
    nul: "3.20",
    cote2: "3.10",
    prediction: "Les deux équipes marquent",
    confiance: "64%"
  },

  {
    league: "🇪🇸 Liga",
    date: "27 août 2026 • 20:00",
    team1: "Équipe E",
    team2: "Équipe F",
    icon1: "🟡",
    icon2: "🔵",
    cote1: "1.70",
    nul: "3.60",
    cote2: "4.80",
    prediction: "Plus de 1,5 buts",
    confiance: "71%"
  }
];


// ===============================
// CRÉER UNE CARTE DE MATCH
// ===============================

function createMatch(match, index) {

  return `
    <div class="match-card">

      <div class="league">
        ${match.league}
      </div>

      <div class="match-date">
        📅 ${match.date}
      </div>

      <div class="teams">

        <div class="team">
          <div class="team-icon">
            ${match.icon1}
          </div>

          ${match.team1}
        </div>

        <div class="vs">
          VS
        </div>

        <div class="team">
          <div class="team-icon">
            ${match.icon2}
          </div>

          ${match.team2}
        </div>

      </div>

      <div class="odds">

        <div class="odd">
          <span>1</span>
          <strong>${match.cote1}</strong>
        </div>

        <div class="odd">
          <span>N</span>
          <strong>${match.nul}</strong>
        </div>

        <div class="odd">
          <span>2</span>
          <strong>${match.cote2}</strong>
        </div>

      </div>

      <div class="prediction">

        <div class="prediction-title">
          🤖 PRÉDICTION PREDI-PRO
        </div>

        <strong>
          ${match.prediction}
        </strong>

        <small>
          Confiance estimée : ${match.confiance}
        </small>

      </div>

      <div class="match-actions">

        <button
          class="analyse-btn"
          onclick="analyser(${index})">

          📊 Voir les statistiques

        </button>

        <button
          class="favorite-btn"
          onclick="ajouterFavori(${index})">

          ⭐

        </button>

      </div>

    </div>
  `;
}


// ===============================
// AFFICHER LES MATCHS
// ===============================

function afficherMatchs() {

  const container =
    document.getElementById("matches");

  if (!container) return;

  container.innerHTML = "";

  matchs.forEach((match, index) => {

    container.innerHTML +=
      createMatch(match, index);

  });
}


// ===============================
// MATCHS POPULAIRES
// ===============================

function afficherPopulaires() {

  const container =
    document.getElementById("popularMatches");

  if (!container) return;

  container.innerHTML =
    createMatch(matchs[0], 0) +
    createMatch(matchs[1], 1);
}


// ===============================
// CHANGER DE PAGE
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
// ANALYSE D'UN MATCH
// ===============================

function analyser(index) {

  const match = matchs[index];

  document.querySelectorAll(".page")
    .forEach(page => {

      page.classList.add("hidden");

    });

  const analysePage =
    document.getElementById("analysePage");

  analysePage.classList.remove("hidden");

  const content =
    document.getElementById("analyseContent");

  content.innerHTML = `

    <div class="analysis-header">

      <div class="league">
        ${match.league}
      </div>

      <div class="match-date">
        📅 ${match.date}
      </div>

      <div class="teams">

        <div class="team">

          <div class="team-icon">
            ${match.icon1}
          </div>

          ${match.team1}

        </div>

        <div class="vs">
          VS
        </div>

        <div class="team">

          <div class="team-icon">
            ${match.icon2}
          </div>

          ${match.team2}

        </div>

      </div>

    </div>


    <div class="analysis-section">

      <h2>📈 Forme récente</h2>

      <h3>${match.team1}</h3>

      <div class="form-row">

        <div class="form win">V</div>
        <div class="form win">V</div>
        <div class="form draw">N</div>
        <div class="form win">V</div>
        <div class="form loss">D</div>

      </div>

      <br>

      <h3>${match.team2}</h3>

      <div class="form-row">

        <div class="form loss">D</div>
        <div class="form win">V</div>
        <div class="form draw">N</div>
        <div class="form loss">D</div>
        <div class="form win">V</div>

      </div>

    </div>


    <div class="analysis-section">

      <h2>⚽ Statistiques</h2>

      <div class="stat-line">

        <div class="stat-top">

          <span>Buts marqués</span>

          <strong>
            12 - 8
          </strong>

        </div>

        <div class="progress">

          <div
            class="progress-bar"
            style="width:65%">
          </div>

        </div>

      </div>


      <div class="stat-line">

        <div class="stat-top">

          <span>Buts encaissés</span>

          <strong>
            6 - 10
          </strong>

        </div>

        <div class="progress">

          <div
            class="progress-bar"
            style="width:55%">
          </div>

        </div>

      </div>


      <div class="stat-line">

        <div class="stat-top">

          <span>Possession moyenne</span>

          <strong>
            58% - 42%
          </strong>

        </div>

        <div class="progress">

          <div
            class="progress-bar"
            style="width:58%">
          </div>

        </div>

      </div>

    </div>


    <div class="analysis-section">

      <h2>🎯 Probabilités</h2>

      <div class="probability-box">

        <div class="probability">

          <span>${match.team1}</span>

          <strong>52%</strong>

        </div>

        <div class="probability">

          <span>Nul</span>

          <strong>27%</strong>

        </div>

        <div class="probability">

          <span>${match.team2}</span>

          <strong>21%</strong>

        </div>

      </div>

    </div>


    <div class="analysis-section">

      <h2>🤝 Confrontations</h2>

      <p>
        ${match.team1} et ${match.team2}
        se sont affrontées récemment.
      </p>

      <div class="stat-line">
        ${match.team1} :
        <strong>3 victoires</strong>
      </div>

      <div class="stat-line">
        Matchs nuls :
        <strong>1</strong>
      </div>

      <div class="stat-line">
        ${match.team2} :
        <strong>1 victoire</strong>
      </div>

    </div>


    <div class="analysis-section final-prediction">

      <h2>🤖 Prédiction Predi-Pro</h2>

      <h3>
        ${match.prediction}
      </h3>

      <p class="confidence">
        Confiance estimée :
        ${match.confiance}
      </p>

    </div>

  `;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ===============================
// FAVORIS
// ===============================

function ajouterFavori(index) {

  const match = matchs[index];

  let favoris =
    JSON.parse(
      localStorage.getItem("predipro_favoris") || "[]"
    );

  const existe =
    favoris.some(item =>
      item.team1 === match.team1 &&
      item.team2 === match.team2
    );

  if (!existe) {

    favoris.push(match);

    localStorage.setItem(
      "predipro_favoris",
      JSON.stringify(favoris)
    );

    alert(
      "⭐ Match ajouté aux favoris !"
    );

  } else {

    alert(
      "Ce match est déjà dans tes favoris."
    );

  }

  afficherFavoris();
}


// ===============================
// AFFICHER LES FAVORIS
// ===============================

function afficherFavoris() {

  const container =
    document.getElementById("favorites");

  if (!container) return;

  const favoris =
    JSON.parse(
      localStorage.getItem("predipro_favoris") || "[]"
    );

  if (favoris.length === 0) {

    container.innerHTML = `
      <p class="empty">
        Aucun match ajouté aux favoris.
      </p>
    `;

    return;
  }

  container.innerHTML = "";

  favoris.forEach(match => {

    container.innerHTML += `

      <div class="match-card">

        <div class="league">
          ${match.league}
        </div>

        <div class="teams">

          <div class="team">

            <div class="team-icon">
              ${match.icon1}
            </div>

            ${match.team1}

          </div>

          <div class="vs">
            VS
          </div>

          <div class="team">

            <div class="team-icon">
              ${match.icon2}
            </div>

            ${match.team2}

          </div>

        </div>

        <div class="prediction">

          <div class="prediction-title">
            🤖 PREDI-PRO
          </div>

          <strong>
            ${match.prediction}
          </strong>

        </div>

      </div>

    `;

  });
}


// ===============================
// UTILISATEUR
// ===============================

function chargerUtilisateur() {

  const nom =
    localStorage.getItem("predipro_user");

  if (nom) {

    const userName =
      document.getElementById("userName");

    const profileName =
      document.getElementById("profileName");

    if (userName) {
      userName.textContent = nom;
    }

    if (profileName) {
      profileName.textContent = nom;
    }

  }
}


// ===============================
// DÉCONNEXION
// ===============================

function logout() {

  localStorage.removeItem("predipro_user");

  alert("Tu es déconnecté.");

  window.location.href = "login.html";
}


// ===============================
// DÉMARRAGE
// ===============================

afficherMatchs();

afficherPopulaires();

afficherFavoris();

chargerUtilisateur();