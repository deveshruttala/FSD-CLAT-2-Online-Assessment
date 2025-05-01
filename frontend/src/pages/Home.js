// src/pages/Home.js
import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Container className="text-center">
        <h1 className="app-title">Team : GOCoder</h1>
        <p className="app-subtitle">Welcome to the Student Team Management</p>
        <div className="d-flex justify-content-center">
          <Card className="manage-card shadow">
            <Card.Body>
              <Card.Title className="mb-4 fw-bold">Manage Team</Card.Title>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="primary" onClick={() => navigate('/add')}>
                  Add Member
                </Button>
                <Button variant="success" onClick={() => navigate('/view')}>
                  View Members
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default Home;
