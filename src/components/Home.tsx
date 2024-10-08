import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Container, Card } from 'react-bootstrap';
import { useProductContext } from '../context/ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: React.FC<{ setCategory: (category: string) => void }> = ({ setCategory }) => {
    const { products, error } = useProductContext();

    const handleCategory = (category: string) => {
        setCategory(category);
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const featuredProducts = products.slice(0, 3);

    return (
        <Container className="mt-4">
            <h1>Welcome to Our Store!</h1>
            <p>Your one-stop shop for the best products.</p>

            <h2>Featured Products</h2>
            <Row md={2} xs={1} lg={3} className="g-3">
                {featuredProducts.map(product => (
                    <Col key={product.productId}>
                        <Card>
                            <Card.Img variant="top" src={product.image} height="200px" style={{ objectFit: "cover" }} alt={product.productName} />
                            <Card.Body>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text>{`$${product.price.toFixed(2)}`}</Card.Text>
                                <Button as={Link as any} to={`/product/${product.productId}`} variant="primary">
                                    View Product
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="mt-5 text-center">
                <Link to="/store">
                    <Button variant="primary" as={Link as any} to="/products">
                        Shop Now
                    </Button>
                </Link>
            </div>

            <Row className="my-5">
                <Col>
                    <h2>Shop by Category</h2>
                </Col>
            </Row>
            <Row className="text-center">
                <Col md={4}>
                    <Link to="/products-category" className="text-decoration-none" onClick={() => handleCategory('Electronics')}>
                        <Card className="p-3">
                            <Card.Body>
                                <Card.Title>Electronics</Card.Title>
                                <Card.Text>Latest gadgets and devices</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to="/products-category" className="text-decoration-none" onClick={() => handleCategory('Clothing')}>
                        <Card className="p-3">
                            <Card.Body>
                                <Card.Title>Clothing</Card.Title>
                                <Card.Text>Fashionable and affordable</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to="/products-category" className="text-decoration-none" onClick={() => handleCategory('Home & Garden')}>
                        <Card className="p-3">
                            <Card.Body>
                                <Card.Title>Home & Garden</Card.Title>
                                <Card.Text>Essentials for your home</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>

            <Row className="my-5 text-center">
                <Col>
                    <p>&copy; 2024 Your Store. All rights reserved.</p>
                    <p>
                        Follow us on{' '}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            Facebook
                        </a>,{' '}
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            Twitter
                        </a>, and{' '}
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            Instagram
                        </a>.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
