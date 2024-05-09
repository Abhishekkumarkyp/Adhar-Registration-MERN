import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import UserList from './UserList'; // Import UserList component

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    address: '',
    phone_no: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear validation error on input change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full Name is required';
    }
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Date of Birth is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.phone_no.trim()) {
      newErrors.phone_no = 'Phone Number is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const [reloadFlag, setReloadFlag] = useState(false);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    setSubmitting(true);

    try {

      // formData.email =formData.email.user.date_of_birth.split('T')[0];

      const response = await fetch('http://localhost:3001/makeuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setFormData({
          full_name: '',
          date_of_birth: '',
          address: '',
          phone_no: '',
          email: ''
        });

        // const [reloadFlag, setReloadFlag] = useState(false);
        setReloadFlag(!reloadFlag);
      } else {
        throw new Error('Failed to save user details');
      }
    } catch (error) {
      console.error('Error saving user details:', error);
      // Handle error state or display error message
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <h3 className="text-center">Aadhar Card Registration and Display System</h3>
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Aadhar Card Registration</h3>
                {showSuccessMessage && (
                  <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
                    User details saved successfully!
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="full_name">
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      isInvalid={!!errors.full_name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.full_name}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="date_of_birth">
                    <Form.Label>Date Of Birth:</Form.Label>
                    <Form.Control
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleInputChange}
                      isInvalid={!!errors.date_of_birth}
                    />
                    <Form.Control.Feedback type="invalid">{errors.date_of_birth}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="address">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                  </Form.Group>

                  <div className="text-center mt-2">Contact Information</div>

                  <Form.Group controlId="phone_no">
                    <Form.Label>Phone No:</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleInputChange}
                      isInvalid={!!errors.phone_no}
                    />
                    <Form.Control.Feedback type="invalid">{errors.phone_no}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-2" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Register'}
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserList reloadFlag={reloadFlag} />
    </section>
  );
};

export default UserRegistrationForm;
