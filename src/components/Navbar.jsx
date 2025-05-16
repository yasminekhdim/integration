import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaHome, FaBook, FaBlog, FaPhoneAlt, FaShoppingCart, FaUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // ✅ Contexte panier
import './Navbar.css';

function CustomNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { panier } = useCart(); // ✅ Le panier se met à jour dynamiquement

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // ✅ Calcul dynamique du nombre total d’articles
  const totalArticles = panier.reduce((total, item) => total + (item.quantite || 1), 0);

  return (
    <Navbar bg="primary" expand="lg" sticky="top" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <div className="logo-placeholder me-2">
            <span className="logo-text">LP</span>
          </div>
          <span className="brand-text">LIVRE PLUS</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" className="border-0" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="/"><FaHome className="me-1" /> Accueil</Nav.Link>
            <Nav.Link href="/livres"><FaBook className="me-1" /> Livres</Nav.Link>
            <Nav.Link href="/collections">Collections</Nav.Link>
            <Nav.Link href="/blog"><FaBlog className="me-1" /> Blog</Nav.Link>
            <Nav.Link href="/contact"><FaPhoneAlt className="me-1" /> Contact</Nav.Link>
          </Nav>

          <Form className="d-flex search-bar mx-lg-3" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Rechercher un livre..."
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="light" className="search-button" type="submit">
              <FiSearch />
            </Button>
          </Form>

          <div className="d-flex">
            <Nav.Link href="/cart" className="nav-icon position-relative">
              <FaShoppingCart />
              {totalArticles > 0 && (
                <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalArticles}
                </span>
              )}
            </Nav.Link>
            <Nav.Link href="/login" className="nav-icon">
              <FaUser />
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
