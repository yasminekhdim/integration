// src/pages/CollectionDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, ListGroup, Button, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CollectionDetail = () => {
  const { id } = useParams();
  const [livres, setLivres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { panier, ajouterAuPanier } = useCart();
  useEffect(() => {
    const fetchLivres = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/collections/${id}/livres`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Erreur inconnue');

        setLivres(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLivres();
  }, [id]);

  const handleAddToCart = (book) => {
    if (!book) return;
    const livreAjoute = {
      _id: book._id,
      titre: book.titre,
      prix: book.prix || 0,
      couverture: book.couverture,
      exemplaires: book.details?.papier?.nombreExemplaires || 1,
      quantite: 1,
    };
    ajouterAuPanier(livreAjoute);
    alert(`"${book.titre}" a été ajouté au panier.`);
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Livres de cette collection</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-danger">Erreur: {error}</p>
      ) : livres.length > 0 ? (
        <ListGroup variant="flush">
          {livres.map(livre => (
            <ListGroup.Item key={livre._id} className="mb-3 p-3 border rounded">
              <Row className="align-items-center">
                <Col xs={3} md={2}>
                  {/* Couverture du livre (assume que livre.couverture est une URL) */}
                  <Image
                    src={livre.couverture || 'https://via.placeholder.com/100x150?text=Pas+de+couverture'}
                    alt={`Couverture de ${livre.titre}`}
                    thumbnail
                    fluid
                    style={{ maxHeight: '150px', objectFit: 'cover' }}
                  />
                </Col>
                <Col xs={9} md={7}>
                  <h5>{livre.titre}</h5>
                  <p className="mb-1">{livre.description}</p>
                  <p className="fw-bold">Prix: {livre.prix}€</p>
                </Col>
                <Col xs={12} md={3} className="d-flex flex-column gap-2">
                  <Button variant="primary" as={Link} to={`/détail/${livre._id}`}>
                    Voir Détails
                  </Button>
                  <Button variant="success" onClick={() => handleAddToCart(livre)}>
                    <FaShoppingCart className="me-2" />
                    Ajouter au panier
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>Aucun livre trouvé pour cette collection.</p>
      )}
    </Container>
  );
};

export default CollectionDetail;
