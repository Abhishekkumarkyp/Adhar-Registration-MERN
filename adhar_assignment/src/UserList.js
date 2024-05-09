import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

const UserList = ({ reloadFlag }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, [reloadFlag]);

  const fetchUserList = async () => {
    try {
      const response = await fetch('http://localhost:3001/getusers');
      if (response.ok) {
        const userList = await response.json();
        setUsers(userList);
      } else {
        console.error('Failed to fetch user list');
      }
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  return (
    <div>
      <h3 className='text-center'>Aadhar Cards</h3>
      <div className='row p-2'>
        {users.map((user) => (
          <div className='col-md-4 '>

            <div class="card mt-2 ">
              <div class="card-header text-center">
                <Card.Title>Adhar</Card.Title>
              </div>
              <div class="card-body">
                <h5 class="card-title text-center">{user.full_name}</h5>
                <h5 class="card-title text-center">{user.user_uuid}</h5>

                <strong>Address:</strong> {user.address}
                <br />
                <strong>Phone Number:</strong> {user.phoneNo}
                <br />
                <strong>Email:</strong> {user.email}
              </div>

              <div class="card-footer text-muted">
                <strong>Date of Birth:</strong> {user.date_of_birth.split('T')[0]}
              </div>
            </div>



          </div>
        ))}
      </div>

    </div>
  );
};

export default UserList;
