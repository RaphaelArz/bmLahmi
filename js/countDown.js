// Date du mariage (année, mois - 1, jour)
var weddingDate = new Date(2025, 3, 23); // Mois est 0-indexé (0 = janvier, 1 = février, etc.)

// Fonction pour mettre à jour le compteur
function updateCountdown() {
  var now = new Date();
  var difference = weddingDate - now;

  if (difference <= 0) {
    // Le mariage est déjà passé
    document.getElementById('decompte').innerHTML = "Le mariage est passé!";
  } else {
    var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('jour').innerHTML = days;
    document.getElementById('heure').innerHTML = hours;
    document.getElementById('minute').innerHTML =  minutes;
    document.getElementById('seconde').innerHTML =seconds;
  }
}

// Mettre à jour le compteur toutes les secondes
setInterval(updateCountdown, 1000);

// Mettre à jour le compteur immédiatement au chargement de la page
updateCountdown();
