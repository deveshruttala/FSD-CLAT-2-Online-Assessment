import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewMembers() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`http://localhost:5000/api/members/${id}`);
        setMembers(prevMembers => prevMembers.filter(member => member._id !== id));
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Team Members</h2>
      <Row>
        {members.map(member => (
          <Col md={4} sm={6} xs={12} key={member._id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={`http://localhost:5000/uploads/${member.image}`}
                alt={`${member.name}'s profile`}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
                <Link to={`/member/${member._id}`}>
                  <Button variant="primary" className="me-2">View Details</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(member._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ViewMembers;
