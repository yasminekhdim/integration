import React from "react";

const ConfirmationPage = () => {
  return (
    <div className="container mt-5 text-center">
      <h2>Merci pour votre commande !</h2>
      <p>Votre commande a bien été enregistrée.</p>
      <a href="/" className="btn btn-primary mt-3">Retour à l'accueil</a>
    </div>
  );
};

export default ConfirmationPage;
