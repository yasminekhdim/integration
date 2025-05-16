import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SearchPage.css';

function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);
      // Utilisation de encodeURIComponent pour encoder le caractère spécial
    const encodedQuery = encodeURIComponent(query);
      fetch(`/api/books/search?q=${query}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur serveur');
          }
          return response.json();
        })
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Erreur de recherche:', err);
          setError("Une erreur est survenue lors de la recherche.");
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <Container className="search-results-container">
      <h2 className="search-title">Résultats pour "{query}"</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : results.length > 0 ? (
        <Row>
          {results.map((book) => (
            <Col key={book._id} md={4} className="mb-4">
              <Card className="book-card h-100">
                <Card.Img
                  variant="top"
                  src={book.couverture || 'https://via.placeholder.com/300x450?text=Image+non+disponible'}
                  className="book-image"
                />
                <Card.Body>
                  <Card.Title>{book.titre}</Card.Title>
                  <Card.Text className="text-muted">{book.auteur}</Card.Text>
                  <Button variant="primary" className="mt-auto" as={Link} to={`/détail/${book._id}`}>
                  Voir détails
                </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="text-center">
          Aucun résultat trouvé pour "{query}"
        </Alert>
      )}
    </Container>
  );
}

export default SearchPage;
