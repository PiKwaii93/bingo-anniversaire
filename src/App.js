import React, { useState, useEffect } from "react";
import "./App.css";

// Liste d'actions fictives
const actions = [
    "Quelqu’un galoche",
    "Verre tombé",
    "Slow lancer",
    "Claquer le cul de clemsow",
    "Claquer le cul de Maxence",
    "Lucie perd au beerpong",
    "Camille et Hortense perdent au beerpong",
    "Quelqu’un vomi ou dans le mal",
    "Maxence prend des selfies de la soirée",
    "Quelqu’un demande une musique spécifique",
    "Adam devient dj",
    "Camille devient dj",
    "Maxence devient dj",
    "Qui veut jouer au beerpong",
    "Elodie parle de quand elle était jeune",
    "Matthis fait son vieux",
    "Baba rentre tôt",
    "Quelqu’un triche",
    "Quelqu’un se prend pour le dj de la soirée",
    "Quelqu’un sort se balader longtemps",
    "Camille passe sa soirée plus dehors que dedans",
    "Quelqu’un fait une déclaration d'amour trop exagérée",
    "Quelqu’un commande à manger ou à boire",
    "Quelqu’un dit je bois pas beaucoup ce soir",
    "Maxence fait une blague raciste",
    "Matteo parle de lalaland",
    "Matteo parle de rock/metal",
    "Clemsow bourré",
    "Matthis porte un vêtement à son frère",
    "Maxence trashtalk au beerpong",
    "Elodie dit qu’elle est fatiguée",
    "Lycia bourré",
    "Ethan en Spiderman",
    "Ethan bourré",
    "Lycia rigole pour rien",
    "Ambroise gagne au beerpong",
    "Ambroise parle de science avec Joris",
    "Camille lance une choré",
    "Alex dit qu’elle est fatiguée (comme d’hab)",
    "Baba montre ses bras",
    "Quelqu’un lance un jeu d'alcool",
    "Quelqu’un triche",
    "Quelqu’un se trompe de prénom",
    "Une musique nostalgique passe",
    "C’était mieux avant (notre époque)",
    "Quelqu’un prend un selfie collectif",
    "Joyeux anniversaire",
    "Quelqu’un dit faut qu’on se voit bientôt",
    "Quelqu’un arrive en retard",
    "Quelqu’un chante faux",
    "Quelqu’un parle de son boulot",
    "Quelqu’un parle de ses projets futurs",
    "Léo est bourré",
    "Léo parle comme un bauf",
    "Elodie raconte la fois où elle était mono avec Matthis"
];

// Fonction pour générer une grille unique
const generateGrid = () => {
  let shuffled = [...actions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 16);
};

const App = () => {
  const [grid, setGrid] = useState([]);
  const [marked, setMarked] = useState(Array(16).fill(false));
  const [isWinner, setIsWinner] = useState(false);

  // Charger la grille sauvegardée au démarrage
  useEffect(() => {
    const savedGrid = localStorage.getItem("bingoGrid");
    const savedMarked = localStorage.getItem("bingoMarked");

    if (savedGrid && savedMarked) {
      setGrid(JSON.parse(savedGrid));
      setMarked(JSON.parse(savedMarked));
    } else {
      const newGrid = generateGrid();
      setGrid(newGrid);
      localStorage.setItem("bingoGrid", JSON.stringify(newGrid));
      localStorage.setItem("bingoMarked", JSON.stringify(Array(16).fill(false)));
    }
  }, []);

  // Vérifie si toutes les cases sont cochées
  useEffect(() => {
    if (marked.every((m) => m)) {
      setIsWinner(true);
    }
  }, [marked]);

  // Marquer une case et sauvegarder
  const toggleMark = (index) => {
    setMarked((prev) => {
      const newMarked = [...prev];
      newMarked[index] = !newMarked[index];
      localStorage.setItem("bingoMarked", JSON.stringify(newMarked));
      return newMarked;
    });
  };

  // Génère une nouvelle grille
  const newGrid = () => {
    const newGridData = generateGrid();
    setGrid(newGridData);
    setMarked(Array(16).fill(false));
    localStorage.setItem("bingoGrid", JSON.stringify(newGridData));
    localStorage.setItem("bingoMarked", JSON.stringify(Array(16).fill(false)));
    setIsWinner(false); // Réinitialise la victoire
  };

  // Fonction pour calculer la taille de la police en fonction du texte
  const getFontSize = (text) => {
    const baseSize = 14; // Taille de base
    if (text.length > 40) return "10px"; // Texte très long
    if (text.length > 25) return "12px"; // Texte moyen
    return `${baseSize}px`; // Texte court
  };

  return (
    <div className="container">
      <h1>🎉 Bingo Anniversaire 🎂</h1>
      <div className="grid">
        {grid.map((action, index) => (
          <div
            key={index}
            className={`cell ${marked[index] ? "marked" : ""}`}
            onClick={() => toggleMark(index)}
            style={{ fontSize: getFontSize(action) }} // Appliquer la taille dynamiquement
          >
            {action}
          </div>
        ))}
      </div>
      <button onClick={newGrid}>🔄 Nouvelle Grille</button>

      {/* Modale de victoire */}
      {isWinner && (
        <div className="modal">
          <div className="modal-content">
            <h2>🎊 Bravo ! 🎊</h2>
            <p>Tu as complété tout le bingo ! 🎂✨</p>
            <button onClick={() => setIsWinner(false)}>🎈 Continuer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
