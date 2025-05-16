import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const {
    panier,
    retirerDuPanier,
    viderPanier,
    isReady,
    mettreAJourQuantite,
  } = useCart();
  const navigate = useNavigate();

  if (!isReady) return <p>Chargement du panier...</p>;

  const total = panier.reduce(
    (sum, item) => sum + item.prix * item.quantite,
    0
  );

  const handleCommander = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem("panierAvantLogin", JSON.stringify(panier));
      return navigate("/login");
    }

    try {
      await axios.post(
        "/api/cart/commander",
        { panier, total },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      viderPanier();
      localStorage.removeItem("panierAvantLogin");
      navigate("/confirmation");
    } catch (err) {
      console.error("Erreur lors de la commande :", err);
      alert("Erreur lors de la commande. Veuillez réessayer.");
    }
  };

  const handleQuantiteChange = (livreId, nouvelleQuantite) => {
    const quantite = parseInt(nouvelleQuantite);
    if (quantite >= 1) {
      mettreAJourQuantite(livreId, quantite);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Votre Panier</h2>

      {panier.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="list-group">
            {panier.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ gap: "15px" }}
              >
                {/* Couverture */}
                <img
                  src={item.couverture || "https://via.placeholder.com/60x90?text=Pas+de+couverture"}
                  alt={item.titre}
                  style={{ width: "60px", height: "90px", objectFit: "cover", borderRadius: "4px" }}
                />

                {/* Titre, Prix, Quantité */}
                <div style={{ flexGrow: 1 }}>
                  <strong>{item.titre}</strong> — {item.prix} DT ×{" "}
                  <input
                    type="number"
                    value={item.quantite}
                    min="1"
                    onChange={(e) =>
                      handleQuantiteChange(item.livreId ?? item._id, e.target.value)
                    }
                    style={{ width: "60px", marginLeft: "10px" }}
                  />
                </div>

                {/* Bouton supprimer */}
                <button
                  onClick={() => retirerDuPanier(item.livreId ?? item._id)}
                  className="btn btn-danger btn-sm"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <h4>Total : {total.toFixed(2)} DT</h4>
            <button onClick={handleCommander} className="btn btn-success mt-3">
              Commander
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
