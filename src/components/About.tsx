import React from 'react';
import { Container, Card } from 'react-bootstrap';

function About() {
    return (
        <Container className="mt-4">
            <h2 className="mt-5">About Us</h2>
        <Card className="p-3">
            <Card.Body>
                <Card.Text>
                    We are dedicated to providing the best products at the best prices. Browse our store and find something you love.
                </Card.Text>
            </Card.Body>
        </Card>
        </Container>
    )
}

export default About;