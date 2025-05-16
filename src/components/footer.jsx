import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './footer.css'; 

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-4">
      <Container>
        <Row>
          {/* Logo et informations de contact */}
          <Col lg={4} md={6} className="mb-4">
            <div className="footer-brand">
              <h2 className="text-primary mb-3">LIVRE PLUS<span className="text-light">*</span></h2>
              <h5 className="text-muted mb-3">MARKETPLACE</h5>
            </div>
            <address className="footer-contact">
              <p className="mb-2">
                <i className="bi bi-geo-alt-fill me-2"></i>
                22 Rue Amine Abbasi 1002 Le Belvedère Tunis
              </p>
              <p className="mb-2">
                <i className="bi bi-envelope-fill me-2"></i>
                info@livreplus.tn
              </p>
              <p className="mb-3">
                <i className="bi bi-telephone-fill me-2"></i>
                +216 31 575 307
              </p>
            </address>
            <div className="social-icons">
              <a href="#" className="text-white me-3"><FaFacebook size={20} /></a>
              <a href="#" className="text-white me-3"><FaInstagram size={20} /></a>
              <a href="#" className="text-white me-3"><FaTwitter size={20} /></a>
              <a href="#" className="text-white"><FaLinkedin size={20} /></a>
            </div>
          </Col>

          {/* À propos */}
          <Col lg={4} md={6} className="mb-4">
            <h5 className="text-uppercase mb-4">À propos de nous</h5>
            <p className="text-muted">
              Le site LIVRE PLUS propose plus de 25 000 livres dans différentes langues telles que l'arabe, l'anglais et le français. Achetez des livres de divers domaines.
            </p>
            <button className="btn btn-link text-primary p-0">Lire la suite...</button>
          </Col>

          {/* Liens rapides */}
          <Col lg={2} md={6} className="mb-4">
            <h5 className="text-uppercase mb-4">Liens rapides</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-muted">Accueil</a></li>
              <li className="mb-2"><a href="#" className="text-muted">Livres</a></li>
              <li className="mb-2"><a href="#" className="text-muted">Catégories</a></li>
              <li className="mb-2"><a href="#" className="text-muted">Nouveautés</a></li>
              <li className="mb-2"><a href="#" className="text-muted">Contact</a></li>
            </ul>
          </Col>

          {/* Newsletter */}
          <Col lg={2} md={6} className="mb-4">
            <h5 className="text-uppercase mb-4">Newsletter</h5>
            <p className="text-muted mb-3">Abonnez-vous pour recevoir nos offres</p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Votre email" 
                aria-label="Votre email" 
              />
              <button className="btn btn-primary" type="button">
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </Col>
        </Row>

        <hr className="my-4 bg-secondary" />

        {/* Copyright */}
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p className="text-muted mb-0">
              © {new Date().getFullYear()} <strong>LIVRE PLUS</strong>. Tous droits réservés.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item"><a href="#" className="text-muted">Conditions générales</a></li>
              <li className="list-inline-item mx-2">·</li>
              <li className="list-inline-item"><a href="#" className="text-muted">Politique de confidentialité</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;