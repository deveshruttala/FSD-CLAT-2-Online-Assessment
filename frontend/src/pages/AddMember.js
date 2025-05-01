import React, { useState } from 'react';
import API from '../api';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import '../styles/AddMember.css'; // Optional for custom styling

function AddMember() {
  const [formData, setFormData] = useState({
    name: '', rollNumber: '', address: '', phone: '', email: '',
    degree: '', year: '', certifications: '', about: '', hobbies: '', image: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const validate = () => {
    const { name, rollNumber, email, phone } = formData;
    if (!name || !email || !phone || !rollNumber) return 'Please fill all required fields.';
    if (!/^\d{7}$/.test(rollNumber)) return 'Roll number must be exactly 7 digits.';
    if (!/^\d{10}$/.test(phone)) return 'Phone number must be exactly 10 digits.';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Enter a valid email address.';
    return '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const err = validate();
    if (err) return setError(err);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    try {
      await API.post('/members', data);
      setSuccess('Team member added successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed');
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h3 className="text-center text-primary mb-4">Add Team Member</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label>Full Name *</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Roll Number *</Form.Label>
            <Form.Control name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone *</Form.Label>
            <Form.Control name="phone" value={formData.phone} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control name="address" value={formData.address} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Degree</Form.Label>
            <Form.Control name="degree" value={formData.degree} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control name="year" value={formData.year} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Certifications</Form.Label>
            <Form.Control name="certifications" value={formData.certifications} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hobbies (comma-separated)</Form.Label>
            <Form.Control name="hobbies" value={formData.hobbies} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>About</Form.Label>
            <Form.Control as="textarea" rows={3} name="about" value={formData.about} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit" className="mt-2 px-4">Submit</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default AddMember;
