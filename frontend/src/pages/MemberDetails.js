import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import axios from 'axios'; // ✅ Added
import { Container, Card, Button } from 'react-bootstrap'; // ✅ Combined import

function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Added
  const [member, setMember] = useState(null);

  useEffect(() => {
    API.get(`/members/${id}`).then(res => setMember(res.data));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`http://localhost:5000/api/members/${id}`);
        navigate('/view'); // ✅ Go back to view list
      } catch (error) {
        console.error("Failed to delete member:", error);
      }
    }
  };

  if (!member) return <p>Loading...</p>;

  return (
    <Container className="my-4">
      <Card>
        <Card.Img variant="top" src={`http://localhost:5000/uploads/${member.image}`} />
        <Card.Body>
          <Card.Title>{member.name}</Card.Title>
          <p><strong>Roll Number:</strong> {member.rollNumber}</p>
          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>Phone:</strong> {member.phone}</p>
          <p><strong>Address:</strong> {member.address}</p>
          <p><strong>Degree:</strong> {member.degree}</p>
          <p><strong>Year:</strong> {member.year}</p>
          <p><strong>Certifications:</strong> {member.certifications}</p>
          <p><strong>About:</strong> {member.about}</p>
          <p><strong>Hobbies:</strong> {member.hobbies}</p>
        </Card.Body>
      </Card>
      <div className="mt-3 text-center">
        <Button variant="danger" onClick={handleDelete}>Delete Member</Button>
      </div>
    </Container>
  );
}

export default MemberDetails;
