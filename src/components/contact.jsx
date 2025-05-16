import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import './contact.css';

const Contact = () => {
  return (
    <Container className="contact-page py-5">
      <h1 className="text-center mb-5">Contactez-nous</h1>
      
      <Row className="g-4">
        {/* Carte de contact */}
        <Col md={6}>
          <Card className="contact-card h-100">
            <Card.Body>
              <h2 className="mb-4">Informations de contact</h2>
              
              <div className="contact-info">
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <div>
                    <h5>Adresse</h5>
                    <p>22 Rue Amine Abbasi, 1002 Le Belvédère, Tunis</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <div>
                    <h5>Téléphone</h5>
                    <p>+216 31 575 307</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <div>
                    <h5>Email</h5>
                    <p>contact@livreplus.tn</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <FaClock className="contact-icon" />
                  <div>
                    <h5>Heures d'ouverture</h5>
                    <p>Lundi - Vendredi: 9h - 18h</p>
                    <p>Samedi: 10h - 16h</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Formulaire de contact */}
        <Col md={6}>
          <Card className="contact-form-card h-100">
            <Card.Body>
              <h2 className="mb-4">Envoyez-nous un message</h2>
              
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nom complet</Form.Label>
                  <Form.Control type="text" placeholder="Votre nom" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Votre email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubject">
                  <Form.Label>Sujet</Form.Label>
                  <Form.Control type="text" placeholder="Sujet de votre message" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    placeholder="Votre message..." 
                    required 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="submit-btn">
                  Envoyer le message
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Carte Google Maps */}
      <Row className="mt-5">
        <Col>
          <Card className="map-card">
            <Card.Body className="p-0">
              <iframe
                title="Localisation Livre Plus"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.123456789012!2d10.123456!3d36.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDA3JzI0LjQiTiAxMMKwMDcnMjQuNiJF!5e0!3m2!1sfr!2stn!4v1234567890123"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;