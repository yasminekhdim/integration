import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; // Ajuste le chemin si besoin
import './bookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { panier, ajouterAuPanier } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/books/')
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des livres:', error);
        setError('Impossible de charger les livres.');
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (book) => {
    if (!book) return;
    console.log(book);
    const livreAjoute = {
      _id: book._id,
      titre: book.titre,
      prix: book.prix || 0,
      couverture: book.couverture,  // ajout de la couverture ici
      quantite: 1,
    };

    ajouterAuPanier(livreAjoute);
    console.log('Ajouté au panier :', livreAjoute);
    alert(`"${book.titre}" a été ajouté au panier.`);
  };

  useEffect(() => {
    console.log("Panier mis à jour :", panier);
  }, [panier]);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;

  return (
    <Container className="book-list-page py-5">
      <h1 className="text-center mb-5">Nos Livres</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {books.map((book) => (
          <Col key={book._id}>
            <Card className="h-100 d-flex flex-column shadow-sm custom-card">
              <div className="image-container">
                <Card.Img
                  variant="top"
                  src={book.couverture || book.image || 'https://via.placeholder.com/300x450?text=Pas+de+couverture'}
                  alt={book.titre}
                  className="card-img-top"
                />
              </div>
              <Card.Body className="d-flex flex-column p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title className="fs-6 text-dark">{book.titre}</Card.Title>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleAddToCart(book)}
                    title="Ajouter au panier"
                  >
                    <FaShoppingCart />
                  </Button>
                </div>
                <Card.Subtitle className="text-muted mb-2">{book.auteur}</Card.Subtitle>
                <div className="text-danger fw-bold mb-3">
                  {book.prix ? `${book.prix.toFixed(2)} €` : 'Non spécifié'}
                </div>
                <Button variant="primary" className="mt-auto" as={Link} to={`/book/${book._id}`}>
                  Voir détails
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList;
