import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/cart/mes-commandes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCommandes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCommandes();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📦 Mes Commandes</h2>
      {commandes.length === 0 ? (
        <p>Vous n'avez pas encore passé de commande.</p>
      ) : (
        commandes.map((commande, i) => (
          <div key={i} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Commande du {new Date(commande.date).toLocaleDateString()}</h5>
              <ul>
                {commande.livres.map((livre, idx) => (
                  <li key={idx}>
                    {livre.titre} × {livre.quantite} — {livre.prix} DT
                  </li>
                ))}
              </ul>
              <strong>Total : {commande.total} DT</strong>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
