// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col, Button, Card } from 'react-bootstrap';
// import { useProductContext } from '../context/ProductContext';

// const Home: React.FC = () => {
//     const { products } = useProductContext();

//     const featuredProducts = products.slice(0, 3);

//     return (
//         <Container>
//             {/* Hero Section */}
//             <Row className="my-5 text-center">
//                 <Col>
//                     <h1>Welcome to Our Store</h1>
//                     <p>Your one-stop shop for amazing products at unbeatable prices.</p>
//                     <Button variant="primary" as={Link as any} to="/products">
//                         Shop Now
//                     </Button>
//                 </Col>
//             </Row>

//             {/* Featured Products Section */}
//             <Row className="my-5">
//                 <Col>
//                     <h2>Featured Products</h2>
//                 </Col>
//             </Row>
//             <Row md={3} xs={1} lg={3} className="g-3">
//                 {featuredProducts.map(product => (
//                     <Col key={product.productId}>
//                         <Card>
//                             <Card.Img variant="top" src={product.image} alt={product.productName} />
//                             <Card.Body>
//                                 <Card.Title>{product.productName}</Card.Title>
//                                 <Card.Text>{`$${product.price.toFixed(2)}`}</Card.Text>
//                                 <Button as={Link as any} to={`/product/${product.productId}`} variant="primary">
//                                     View Product
//                                 </Button>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>

//             {/* Categories Section */}
//             <Row className="my-5">
//                 <Col>
//                     <h2>Shop by Category</h2>
//                 </Col>
//             </Row>
//             <Row className="text-center">
//                 <Col md={4}>
//                     <Link to="/category/electronics" className="text-decoration-none">
//                         <Card className="p-3">
//                             <Card.Body>
//                                 <Card.Title>Electronics</Card.Title>
//                                 <Card.Text>Latest gadgets and devices</Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </Link>
//                 </Col>
//                 <Col md={4}>
//                     <Link to="/category/clothing" className="text-decoration-none">
//                         <Card className="p-3">
//                             <Card.Body>
//                                 <Card.Title>Clothing</Card.Title>
//                                 <Card.Text>Fashionable and affordable</Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </Link>
//                 </Col>
//                 <Col md={4}>
//                     <Link to="/category/home" className="text-decoration-none">
//                         <Card className="p-3">
//                             <Card.Body>
//                                 <Card.Title>Home & Garden</Card.Title>
//                                 <Card.Text>Essentials for your home</Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </Link>
//                 </Col>
//             </Row>

//             {/* Footer Section */}
//             <Row className="my-5 text-center">
//                 <Col>
//                     <p>&copy; 2024 Your Store. All rights reserved.</p>
//                     <p>
//                         Follow us on{' '}
//                         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//                             Facebook
//                         </a>,{' '}
//                         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//                             Twitter
//                         </a>, and{' '}
//                         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//                             Instagram
//                         </a>.
//                     </p>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Container, Card } from 'react-bootstrap';
import StoreItem from './StoreItem';
import { useProductContext } from '../context/ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: React.FC = () => {
    const { products, error } = useProductContext();

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
                        <Card.Img variant="top" src={product.image} height="200px" style={{ objectFit: "cover" }} alt={product.productName} />
                                         <Card.Body>
                     <Card.Title>{product.productName}</Card.Title>
                     <Card.Text>{`$${product.price.toFixed(2)}`}</Card.Text>
                     <Button as={Link as any} to={`/product/${product.productId}`} variant="primary">
                         View Product
                     </Button>
                 </Card.Body>
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
                    <Link to="/category/electronics" className="text-decoration-none">
                        <Card className="p-3">
                            <Card.Body>
                                <Card.Title>Electronics</Card.Title>
                                <Card.Text>Latest gadgets and devices</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to="/category/clothing" className="text-decoration-none">
                        <Card className="p-3">
                            <Card.Body>
                                <Card.Title>Clothing</Card.Title>
                                <Card.Text>Fashionable and affordable</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to="/category/home" className="text-decoration-none">
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

