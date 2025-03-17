import React, { useState, useEffect } from "react";
import "./App.css";

// Liste d'actions fictives
const actions = [
  "Danser une minute",
  "Raconter une blague",
  "Imiter un animal",
  "Dire un souvenir drôle",
  "Faire un compliment",
  "Chanter un refrain",
  "Faire une grimace",
  "Taper dans les mains",
  "Dire son âge à l'envers",
  "Faire un high-five",
  "Se lever et tourner sur soi",
  "Nommer 3 desserts",
  "Faire un dab",
  "Nommer une couleur au hasard",
  "Frapper 3 fois dans ses mains",
  "Faire un vœu secret",
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
