import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Container, Table } from 'reactstrap';
import {getCurrentUserDetail, isLoggedIn} from '../auth'
const ViewUserProfile = ({ user }) => {

  const[currentUser,setCurrentUser]=useState(null)
  const[login,setLogin]=useState(false)
  useEffect(()=>{
    setCurrentUser(getCurrentUserDetail())
    setLogin(isLoggedIn)
  },[])

  return (
    <Card className='mt-5 border-0 rounded-0 shadow-sm'>
      <CardBody>
        <h3 className='text-uppercase'>User Information</h3>
        <Container className='text-center'>
          <img
            style={{ maxWidth: '200px', maxHeight: '150px' }}
            src={user.image ? user.image : 'https://img.freepik.com/premium-vector/art-illustration_530521-130.jpg'}
            alt='user profile picture'
            className='img-fluid rounded-circle'
          />
        </Container>
        <Table responsive striped hover bordered={true} className='text-center mt-5'>
          <tbody>
            <tr>
              <td>LCWDBLOGS ID</td>
              <td>LCWD{user.id}</td>
            </tr>
            <tr>
              <td>USER NAME</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>USER EMAIL</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>USER ABOUT</td>
              <td>{user.about}</td>
            </tr>
            <tr>
              <td>USER ROLE</td>
              <td>
                {user.email === 'khushi@yahoo.com' ? (
                  <span>ADMIN_USER</span>
                ) : (
                  <span>NORMAL_USER</span>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
        {currentUser ? (currentUser.id==user.id) ?
        (<CardFooter className='text-center'>
          <Button color='warning'>Update Profile</Button>
        </CardFooter>):'':'' }
      </CardBody>
    </Card>
  );
};

export default ViewUserProfile;
