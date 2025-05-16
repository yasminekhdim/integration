import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";

const BookDetail = () => {
  const { id } = useParams();
  const [livre, setLivre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ajouterAuPanier } = useCart();

  useEffect(() => {
    const fetchLivre = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        setLivre(res.data);
      } catch (err) {
        setError("Erreur lors de la récupération du livre.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLivre();
  }, [id]);

  if (loading) return (
    <Container className="text-center my-5">
      <Spinner animation="border" role="status" />
      <p>Chargement...</p>
    </Container>
  );

  if (error) return (
    <Container className="my-5">
      <Alert variant="danger" className="text-center">{error}</Alert>
    </Container>
  );

  if (!livre) return (
    <Container className="my-5">
      <Alert variant="warning" className="text-center">Livre introuvable.</Alert>
    </Container>
  );

  const stock = livre.details?.papier?.nombreExemplaires ?? 0;
  const stockEnRisque = stock > 0 && stock < 10;

  return (
    <Container className="my-5">
      <Card className="shadow-sm p-4">
        <Row>
          {/* Couverture du livre */}
          <Col md={4} className="mb-4 d-flex justify-content-center align-items-center">
            <Card.Img
              src={livre.couverture || "https://via.placeholder.com/300x450?text=Pas+de+couverture"}
              alt={`Couverture de ${livre.titre}`}
              style={{ maxHeight: "450px", borderRadius: "6px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
            />
          </Col>

          {/* Détails du livre */}
          <Col md={8}>
            <h3 className="mb-3 fw-bold">{livre.titre}</h3>

            <div className="mb-3">
              <p><strong>Auteur :</strong> {livre.auteur}</p>
              <p><strong>Catégorie :</strong> {livre.genre || "Non spécifiée"}</p>
              <p><strong>Prix :</strong> {livre.prix ? `${livre.prix.toFixed(2)} DT` : "Non spécifié"}</p>
            </div>

            <div className="mb-3">
              <p
                className={`fw-bold fs-5 ${stockEnRisque ? "text-danger" : ""}`}
                style={{ letterSpacing: "0.05em" }}
              >
                Stock disponible : {stock}
              </p>
              {stockEnRisque && (
                <Alert variant="warning" className="py-1 px-2" style={{ maxWidth: "fit-content" }}>
                  Attention, stock faible !
                </Alert>
              )}
            </div>

            <div className="mb-3">
              <p><strong>Nombre de Pages :</strong> {livre.details?.papier?.nombrePages || "N/A"}</p>
              <p><strong>Édition :</strong> {livre.details?.papier?.edition || "N/A"}</p>
              <p><strong>Année publication :</strong> {livre.anneePublication || "N/A"}</p>
            </div>

            <hr />

            <h5>Description :</h5>
            <p className="mb-4">{livre.description || "Aucune description disponible."}</p>

            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                size="lg"
                disabled={stock <= 0}
                onClick={() => ajouterAuPanier(livre)}
                style={{ minWidth: "220px" }}
              >
                {stock > 0 ? "Ajouter au panier" : "Stock épuisé"}
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default BookDetail;
