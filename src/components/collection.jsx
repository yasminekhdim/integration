import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Dropdown } from 'react-bootstrap';
import { FaFilter, FaSearch, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './collection.css';

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['Toutes', 'Roman', 'Jeunesse', 'Science-Fiction', 'Histoire', 'Poésie'];

  // Fetch des collections depuis le backend avec filtres
  useEffect(() => {
    const fetchFilteredCollections = async () => {
      setLoading(true);
      setError('');

      try {
        let url = 'http://localhost:5000/api/collections/search?';

        if (searchTerm) {
          url += `q=${encodeURIComponent(searchTerm)}&`;
        }

        if (selectedCategory && selectedCategory !== 'Toutes') {
          url += `categorie=${encodeURIComponent(selectedCategory)}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur lors de la récupération des collections');

        const data = await response.json();
        setCollections(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFilteredCollections();
  }, [searchTerm, selectedCategory]);

  return (
    <Container className="collections-page py-5">
      <h1 className="text-center mb-5">Nos Collections</h1>

      {/* Barre de filtres */}
      <div className="filter-bar mb-5 p-4 bg-light rounded">
        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <Form.Control
                type="text"
                placeholder="Rechercher une collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Col>
          <Col md={3} className="mb-3 mb-md-0">
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" className="w-100">
                <FaFilter className="me-2" />
                {selectedCategory}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.map((category, index) => (
                  <Dropdown.Item
                    key={index}
                    active={category === selectedCategory}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={3}>
            <Button
              variant="primary"
              className="w-100"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Toutes');
              }}
            >
              Réinitialiser
            </Button>
          </Col>
        </Row>
      </div>

      {/* Affichage des collections */}
      {loading ? (
        <div className="text-center py-5">
          <h4>Chargement...</h4>
        </div>
      ) : error ? (
        <div className="text-center py-5">
          <h4>Erreur: {error}</h4>
        </div>
      ) : collections.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {collections.map(collection => (
            <Col key={collection._id}>
              <Card className="h-100 collection-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg="info">{collection.categorie}</Badge>
                    <div className="rating">
                      <FaStar className="text-warning" />
                      <span className="ms-1">{collection.rating || 'N/A'}</span>
                    </div>
                  </div>
                  <Card.Title>{collection.nom}</Card.Title>
                  <Card.Text>{collection.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      variant="outline-primary"
                      as={Link}
                      to={`/collection/${collection._id}`}
                    >
                      Voir
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <h4>Aucune collection trouvée</h4>
          <p>Essayez de modifier vos critères de recherche</p>
        </div>
      )}
    </Container>
  );
};

export default Collections;
