import React, { useState } from 'react';
import axios from 'axios';

const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    numero_telephone: '',
    adresse: '',
    code_postal: '',
    avatar_url: '',
    newsletter_abonne: false,
    role: 'client',
    preferences: {
      theme: 'systeme',
      notifications: {
        email: true,
        sms: false
      }
    }
  });

  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Validation frontend
  const validate = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';

    if (!formData.email.trim()) {
      newErrors.email = 'L’email est requis';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Format de l’email invalide';
    }

    if (!formData.mot_de_passe.trim()) {
      newErrors.mot_de_passe = 'Le mot de passe est requis';
    } else if (formData.mot_de_passe.length < 8) {
      newErrors.mot_de_passe = '8 caractères minimum';
    }

    if (formData.mot_de_passe !== confirmationMotDePasse) {
      newErrors.confirmation_mot_de_passe = 'Les mots de passe ne correspondent pas';
    }

    if (formData.numero_telephone && !/^\d{8}$/.test(formData.numero_telephone)) {
  newErrors.numero_telephone = 'Numéro invalide (8 chiffres requis)';
}

if (formData.code_postal && !/^\d{4}$/.test(formData.code_postal)) {
  newErrors.code_postal = 'Code postal invalide (4 chiffres requis)';
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('preferences.notifications.')) {
      const key = name.split('.')[2];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          notifications: {
            ...prev.preferences.notifications,
            [key]: checked
          }
        }
      }));
    } else if (name.startsWith('preferences.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [key]: value
        }
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setMessage('❌ Veuillez corriger les erreurs.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      setMessage('✅ Inscription réussie !');
      setErrors({});
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || 'Erreur lors de l’inscription'}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Créer un compte</h2>

      {message && <div className="alert alert-info text-center">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Nom</label>
            <input type="text" name="nom" className="form-control" onChange={handleChange} />
            {errors.nom && <div className="text-danger">{errors.nom}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">Prénom</label>
            <input type="text" name="prenom" className="form-control" onChange={handleChange} />
            {errors.prenom && <div className="text-danger">{errors.prenom}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input type="password" name="mot_de_passe" className="form-control" onChange={handleChange} />
          {errors.mot_de_passe && <div className="text-danger">{errors.mot_de_passe}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmation_mot_de_passe"
            className="form-control"
            value={confirmationMotDePasse}
            onChange={(e) => setConfirmationMotDePasse(e.target.value)}
          />
          {errors.confirmation_mot_de_passe && (
            <div className="text-danger">{errors.confirmation_mot_de_passe}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Numéro de téléphone</label>
          <input type="text" name="numero_telephone" className="form-control" onChange={handleChange} />
          {errors.numero_telephone && <div className="text-danger">{errors.numero_telephone}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Adresse</label>
          <input type="text" name="adresse" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Code postal</label>
          <input type="text" name="code_postal" className="form-control" onChange={handleChange} />
          {errors.code_postal && <div className="text-danger">{errors.code_postal}</div>}
        </div>

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" name="newsletter_abonne" onChange={handleChange} />
          <label className="form-check-label">S’abonner à la newsletter</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Notifications</label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="preferences.notifications.email" defaultChecked onChange={handleChange} />
            <label className="form-check-label">Par Email</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="preferences.notifications.sms" onChange={handleChange} />
            <label className="form-check-label">Par SMS</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
        <p>Vous avez déja un compte? <a href="/login">Se Connecter</a></p>
      </form>
    </div>
  );
};

export default Inscription;
