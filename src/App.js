import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Home from './components/home';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Contact from './components/contact'; 
import BookList from './components/bookList';
import Collections from './components/collection';
import Blog from './components/blog';
import SearchPage from './components/SearchPage';
import Login from './components/login';
import Inscription from './components/inscription';
import ConfirmationPage from './components/Confirmation';
import OrdersPage from './components/OrdersPage';
import CartPage from './components/CartPage';
import BookDetail from './components/bookDetails';
import CollectionDetail from './components/collectionDetails';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Barre de navigation */}
      <Navbar />

      {/* Contenu principal */}
      <main className="flex-grow-1 py-4">
        <Container fluid="xxl" className="px-3 px-md-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/livres" element={<BookList />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Inscription />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/mes-commandes" element={<OrdersPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/détail/:id" element={<BookDetail/>}/>
            <Route path="/collection/:id" element={<CollectionDetail />} />
          </Routes>
        </Container>
      </main>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}

export default App;
