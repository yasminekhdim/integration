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
      "http://localhost:5000/api/cart/commander",
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
    // Vérifie si l'erreur vient d'un token expiré
    if (
      err.response?.status === 401 &&
      err.response.data.error === "Token expiré, veuillez vous reconnecter."
    ) {
      alert("Votre session a expiré. Veuillez vous reconnecter.");
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      console.error("Erreur lors de la commande :", err);
      alert("Erreur lors de la commande. Veuillez réessayer.");
    }
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
                <img
                  src={item.couverture || "https://via.placeholder.com/60x90?text=Pas+de+couverture"}
                  alt={item.titre}
                  style={{ width: "60px", height: "90px", objectFit: "cover", borderRadius: "4px" }}
                />

                <div style={{ flexGrow: 1 }}>
                  <strong>{item.titre}</strong> — {item.prix} DT ×{" "}
                  <input
                    type="number"
                    min={1}
                    max={item.exemplaires}
                    value={item.quantite}
                    onChange={(e) =>
                      handleQuantiteChange(item._id, parseInt(e.target.value))
                    }
                  />
                  {item.quantite > item.exemplaires && (
                    <span className="text-danger">
                      Stock limité à {item.exemplaires} exemplaires.
                    </span>
                  )}
                </div>

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
