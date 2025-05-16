import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Axios config
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
axios.defaults.withCredentials = true;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    mot_de_passe: ""
  });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      setMessage({ text: "❌ Veuillez saisir un email valide.", type: "danger" });
      return false;
    }

    if (!formData.mot_de_passe || formData.mot_de_passe.length < 8) {
      setMessage({ text: "❌ Le mot de passe doit contenir au moins 8 caractères.", type: "danger" });
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", formData);

      // ✅ Stocker token et user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Vérifier si un panier temporaire existe (avant login)
      const panierAvant = JSON.parse(localStorage.getItem("panierAvantLogin"));

      if (panierAvant && panierAvant.length > 0) {
        const token = data.token;

        // ✅ Envoyer la commande au backend
        await axios.post("/api/cart/commander", {
          panier: panierAvant,
          total: panierAvant.reduce((sum, item) => sum + item.prix * item.quantite, 0)
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // ✅ Nettoyer le panier temporaire
        localStorage.removeItem("panierAvantLogin");

        // ✅ Redirection vers confirmation
        navigate("/confirmation");
      } else {
        // ✅ Pas de commande à passer → rediriger vers le tableau de bord
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.error || "❌ Une erreur est survenue.",
        type: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg" style={{ width: "400px" }}>
        <div className="card-body p-4">
          {message && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}

          <h2 className="text-center mb-4">Connexion</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Mot de passe</label>
              <input
                type="password"
                name="mot_de_passe"
                className="form-control"
                value={formData.mot_de_passe}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </button>
            <p className="mt-3 text-center">
              Tu n'as pas un compte ? <a href="/register">Créer un compte</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
