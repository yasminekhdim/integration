import React from 'react';
import { Container, Row, Col, Card, Button, Carousel, Badge } from 'react-bootstrap';
import { FaTruck, FaShieldAlt, FaUndo, FaHeadset } from 'react-icons/fa';
import './home.css';

const Home = () => {
  // Images de livres en ligne (URLs)
  const bookImages = {
    livre1: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    livre2: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    livre3: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    livre4: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    livre5: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    livre6: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    livre7: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    livre8: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  };

  // Carousel Hero
  const carouselItems = [
    {
      id: 1,
      title: "Le Secret des Étoiles",
      author: "Claire Dubois",
      price: "24.99 DT",
      image: bookImages.livre1,
      badge: "Nouveauté"
    },
    {
      id: 2,
      title: "L'Odyssée du Savoir",
      author: "Marc Lévy",
      price: "19.99 DT",
      image: bookImages.livre2,
      badge: "Best-seller"
    },
    {
      id: 3,
      title: "Le Jardin des Mots",
      author: "Sophie Martin",
      price: "22.50 DT",
      image: bookImages.livre3,
      badge: "Coup de cœur"
    }
  ];

  // Catégories de livres
  const categories = [
    { name: "Roman", icon: "📖", count: 156, image: bookImages.livre4 },
    { name: "Jeunesse", icon: "🧒", count: 89, image: bookImages.livre5 },
    { name: "Développement personnel", icon: "💪", count: 72, image: bookImages.livre6 },
    { name: "Science-Fiction", icon: "🚀", count: 64, image: bookImages.livre7 },
    { name: "Histoire", icon: "🏛️", count: 58, image: bookImages.livre8 },
    { name: "Poésie", icon: "✒️", count: 42, image: bookImages.livre1 }
  ];

  // Nouveautés
  const newReleases = [
    {
      id: 1,
      title: "L'Ombre du Vent",
      author: "Carlos Ruiz Zafón",
      price: "28.00 DT",
      originalPrice: "35.00 DT",
      image: bookImages.livre4,
      rating: 4.5,
      category: "Roman"
    },
    {
      id: 2,
      title: "Le Château des Étoiles",
      author: "Alex Alice",
      price: "25.50 DT",
      originalPrice: "32.00 DT",
      image: bookImages.livre5,
      rating: 4.2,
      category: "Jeunesse"
    },
    {
      id: 3,
      title: "La Jeune Fille et la Nuit",
      author: "Guillaume Musso",
      price: "23.75 DT",
      originalPrice: "29.90 DT",
      image: bookImages.livre6,
      rating: 4.7,
      category: "Roman"
    },
    {
      id: 4,
      title: "Le Royaume de Pierre",
      author: "N.K. Jemisin",
      price: "26.25 DT",
      originalPrice: "34.50 DT",
      image: bookImages.livre7,
      rating: 4.8,
      category: "Science-Fiction"
    },
    {
      id: 5,
      title: "Les Fleurs du Mal",
      author: "Charles Baudelaire",
      price: "18.90 DT",
      originalPrice: "24.00 DT",
      image: bookImages.livre8,
      rating: 4.9,
      category: "Poésie"
    },
    {
      id: 6,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      price: "31.50 DT",
      originalPrice: "39.00 DT",
      image: bookImages.livre1,
      rating: 4.6,
      category: "Histoire"
    }
  ];

  // Best-sellers (top 3 des mieux notés)
  const bestSellers = [...newReleases]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Données pour les services
  const services = [
    {
      id: 1,
      icon: <FaTruck size={30} className="text-primary" />,
      title: "Livraison gratuite",
      description: "Commandes supérieures à 100 DT"
    },
    {
      id: 2,
      icon: <FaShieldAlt size={30} className="text-primary" />,
      title: "Paiement sécurisé",
      description: "Paiement 100% Sécurisé"
    },
    {
      id: 3,
      icon: <FaUndo size={30} className="text-primary" />,
      title: "Garantie de remboursement",
      description: "Dans les 30 jours"
    },
    {
      id: 4,
      icon: <FaHeadset size={30} className="text-primary" />,
      title: "Soutien",
      description: "Sous 1 jour ouvrable"
    }
  ];

  return (
    <Container fluid className="px-0">
      {/* Carousel Hero */}
      <Carousel fade interval={3000} className="hero-carousel">
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <div className="carousel-content">
              <img
                className="d-block w-100"
                src={item.image}
                alt={item.title}
              />
              <Carousel.Caption>
                <Badge bg="warning" className="mb-2">{item.badge}</Badge>
                <h3>{item.title}</h3>
                <p>{item.author} - {item.price}</p>
                <Button variant="light" size="lg">Découvrir</Button>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Section Services */}
      <section className="py-4 bg-light">
        <Container>
          <Row className="g-4">
            {services.map((service) => (
              <Col key={service.id} xs={6} md={3}>
                <div className="service-card text-center p-3 h-100">
                  <div className="mb-3">{service.icon}</div>
                  <h5 className="mb-2">{service.title}</h5>
                  <p className="text-muted mb-0">{service.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Section Catégories */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Explorez nos catégories</h2>
          <Row xs={2} md={3} lg={6} className="g-4">
            {categories.map((category, index) => (
              <Col key={index}>
                <Card className="h-100 border-0 text-center category-card">
                  <Card.Img variant="top" src={category.image} className="category-image" />
                  <Card.Body>
                    <div className="category-icon">{category.icon}</div>
                    <Card.Title>{category.name}</Card.Title>
                    <Card.Text className="text-muted">
                      {category.count} livres
                    </Card.Text>
                    <Button variant="outline-primary" size="sm">Explorer</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Section Nouveautés */}
      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2>Nouveautés</h2>
            <Button variant="outline-primary">Voir tout</Button>
          </div>
          
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {newReleases.map((book) => (
              <Col key={book.id}>
                <Card className="h-100 book-card">
                  <div className="book-badge">-{Math.round((1 - book.price/book.originalPrice) * 100)}%</div>
                  <Card.Img variant="top" src={book.image} alt={book.title} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                    <Badge bg="info" className="mb-2">{book.category}</Badge>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div>
                        <span className="text-danger fw-bold">{book.price}</span>
                        <span className="text-decoration-line-through text-muted ms-2">{book.originalPrice}</span>
                      </div>
                      <div className="text-warning">
                        {'★'.repeat(Math.floor(book.rating))}
                        {'☆'.repeat(5 - Math.floor(book.rating))}
                        <span className="text-muted ms-1">({book.rating})</span>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0">
                    <Button variant="primary" className="w-100">Ajouter au panier</Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Section Best-sellers */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Nos Best-sellers</h2>
          <Row className="g-4">
            {bestSellers.map((book) => (
              <Col md={4} key={book.id}>
                <Card className="h-100 border-0 shadow-sm best-seller-card">
                  <Row className="g-0">
                    <Col md={5} className="d-flex align-items-center">
                      <Card.Img 
                        src={book.image} 
                        alt={book.title} 
                        className="h-100" 
                        style={{objectFit: 'cover', maxHeight: '200px'}} 
                      />
                    </Col>
                    <Col md={7}>
                      <Card.Body>
                        <div className="best-seller-badge">#1 Bestseller</div>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text className="text-muted">{book.author}</Card.Text>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-danger fw-bold">{book.price}</span>
                          <div className="text-warning">
                            {'★'.repeat(Math.floor(book.rating))}
                          </div>
                        </div>
                        <Button variant="primary" size="sm" className="w-100">
                          Acheter maintenant
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Section Promotion */}
      <section className="py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="mb-4">Promotion spéciale - Jusqu'à 50% de réduction</h2>
          <p className="lead mb-4">Profitez de nos offres exceptionnelles sur une sélection de livres</p>
          <Button variant="light" size="lg">Voir les promotions</Button>
        </Container>
      </section>
    </Container>
  );
};

export default Home;