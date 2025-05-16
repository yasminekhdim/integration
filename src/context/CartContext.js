import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // 🔄 Restaurer le panier depuis localStorage
  useEffect(() => {
    const savedPanierAvantLogin = localStorage.getItem("panierAvantLogin");
    const savedPanier = localStorage.getItem("panier");

    if (savedPanierAvantLogin) {
      setPanier(JSON.parse(savedPanierAvantLogin));
      localStorage.removeItem("panierAvantLogin");
    } else if (savedPanier) {
      setPanier(JSON.parse(savedPanier));
    }
    setIsReady(true);
  }, []);

  // 💾 Sauvegarde automatique du panier
  useEffect(() => {
    if (isReady) {
      localStorage.setItem("panier", JSON.stringify(panier));
    }
  }, [panier, isReady]);

  // 🔎 Récupérer le stock actuel du livre depuis le backend
  const getStockFromBackend = async (livreId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${livreId}`);
      const data = await response.json();
      return data.details?.papier?.nombreExemplaires || 0;
    } catch (error) {
      console.error("Erreur lors de la récupération du stock :", error);
      return 0;
    }
  };

  // ➕ Ajouter un livre au panier en respectant le stock
  const ajouterAuPanier = async (livre) => {
    const livreId = livre._id || livre.livreId;
    const existant = panier.find(
      (item) => item._id === livreId || item.livreId === livreId
    );

    const stockDisponible = await getStockFromBackend(livreId);

    if (existant) {
      if (existant.quantite + 1 > stockDisponible) {
        alert(`Stock limité à ${stockDisponible} exemplaires.`);
        return;
      }
      const nouveauPanier = panier.map((item) =>
        item._id === livreId || item.livreId === livreId
          ? { ...item, quantite: item.quantite + 1 }
          : item
      );
      setPanier(nouveauPanier);
    } else {
      if (stockDisponible < 1) {
        alert("Ce livre est en rupture de stock.");
        return;
      }
      setPanier([...panier, { ...livre, quantite: 1, exemplaires: stockDisponible }]);
    }
  };

  // ➖ Retirer un livre du panier
  const retirerDuPanier = (livreId) => {
    setPanier((prev) =>
      prev.filter((item) => item._id !== livreId && item.livreId !== livreId)
    );
  };

  // 🔄 Mettre à jour la quantité d’un livre en respectant le stock
  const mettreAJourQuantite = async (livreId, nouvelleQuantite) => {
    const stockDisponible = await getStockFromBackend(livreId);
    if (nouvelleQuantite > stockDisponible) {
      alert(`Stock limité à ${stockDisponible} exemplaires.`);
      return;
    }

    setPanier((prev) =>
      prev.map((item) =>
        item._id === livreId || item.livreId === livreId
          ? { ...item, quantite: nouvelleQuantite, exemplaires: stockDisponible }
          : item
      )
    );
  };

  // 🧹 Vider le panier
  const viderPanier = () => {
    setPanier([]);
    localStorage.removeItem("panier");
  };

  return (
    <CartContext.Provider
      value={{
        panier,
        ajouterAuPanier,
        retirerDuPanier,
        viderPanier,
        mettreAJourQuantite,
        isReady,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);