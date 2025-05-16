import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Dropdown, 
  Button,
  Badge // Ajout du composant Badge ici
} from 'react-bootstrap';
import { FaCalendarAlt, FaUser, FaChevronDown, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './blog.css';

const Blog = () => {
  // État pour la catégorie sélectionnée
  const [selectedCategory, setSelectedCategory] = useState('Tous les articles');
  
  // Catégories disponibles
  const categories = [
    'Tous les articles',
    'Actualités',
    'Critiques',
    'Rencontres',
    'Conseils de lecture',
    'Événements'
  ];

  // Données des articles de blog (exemple)
  const blogPosts = [
    {
      id: 1,
      title: "Les tendances littéraires de 2023",
      excerpt: "Découvrez les livres qui ont marqué cette année...",
      category: "Actualités",
      date: "15 Nov 2023",
      author: "Samia Ben",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Interview avec l'auteur Mohamed Dhaoui",
      excerpt: "Rencontre exclusive avec l'auteur primé...",
      category: "Rencontres",
      date: "5 Nov 2023",
      author: "Ali Karray",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    // Ajoutez d'autres articles...
  ];

  // Filtrer les articles selon la catégorie
  const filteredPosts = selectedCategory === 'Tous les articles' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <Container className="blog-page py-5">
      <h1 className="text-center mb-5">Notre Blog</h1>
      
      {/* Filtre par catégorie */}
      <Row className="justify-content-center mb-5">
        <Col md={8} lg={6}>
          <div className="category-filter">
            <Dropdown>
              <Dropdown.Toggle 
                variant="outline-primary" 
                className="w-100 d-flex justify-content-between align-items-center"
              >
                <div>
                  <FaFilter className="me-2" />
                  {selectedCategory}
                </div>
                <FaChevronDown />
              </Dropdown.Toggle>
              
              <Dropdown.Menu className="w-100">
                {categories.map((category, index) => (
                  <Dropdown.Item 
                    key={index} 
                    active={category === selectedCategory}
                    onClick={() => setSelectedCategory(category)}
                    className={category === selectedCategory ? 'active-category' : ''}
                  >
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>

      {/* Liste des articles */}
      <Row className="g-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Col key={post.id} md={6} lg={4}>
              <Card className="h-100 blog-card">
                <Card.Img variant="top" src={post.image} alt={post.title} />
                <Card.Body>
                  <Badge bg="info" className="mb-2">{post.category}</Badge>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.excerpt}</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <div className="d-flex justify-content-between text-muted small">
                    <span><FaCalendarAlt className="me-1" /> {post.date}</span>
                    <span><FaUser className="me-1" /> {post.author}</span>
                  </div>
                </Card.Footer>
                <div className="card-overlay">
                  <Button 
                    as={Link} 
                    to={`/blog/${post.id}`} 
                    variant="primary"
                    className="read-more-btn"
                  >
                    Lire l'article
                  </Button>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <h4>Aucun article trouvé</h4>
            <p>Essayez de sélectionner une autre catégorie</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Blog;