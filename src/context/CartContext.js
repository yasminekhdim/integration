import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // 🔄 Restaurer depuis localStorage
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

  // 💾 Sauvegarde automatique
  useEffect(() => {
    if (isReady) {
      localStorage.setItem("panier", JSON.stringify(panier));
    }
  }, [panier, isReady]);

  const ajouterAuPanier = (livre) => {
    const livreId = livre._id || livre.livreId;
    const existant = panier.find(
      (item) => item._id === livreId || item.livreId === livreId
    );

    if (existant) {
      const nouveauPanier = panier.map((item) =>
        item._id === livreId || item.livreId === livreId
          ? { ...item, quantite: item.quantite + 1 }
          : item
      );
      setPanier(nouveauPanier);
    } else {
      setPanier([...panier, { ...livre, quantite: 1 }]);
    }
  };

  const retirerDuPanier = (livreId) => {
    setPanier((prev) =>
      prev.filter(
        (item) => item._id !== livreId && item.livreId !== livreId
      )
    );
  };

  const mettreAJourQuantite = (livreId, nouvelleQuantite) => {
    setPanier((prev) =>
      prev.map((item) =>
        item._id === livreId || item.livreId === livreId
          ? { ...item, quantite: nouvelleQuantite }
          : item
      )
    );
  };

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
