import React, { useContext, useEffect, useState } from 'react';
import Base from '../../components/Base';
import userContext from '../../context/userContext';
import { useParams } from 'react-router-dom';
import { getUser } from '../../services/user-service';
import { Col, Row} from 'reactstrap';
import ViewUserProfile from '../../components/ViewUserProfile';

function ProfileInfo() {
  const object = useContext(userContext);
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    getUser(userId)
      .then(data => {
        // console.log("hello");
        setUser(data);
      })
      .catch(error => {
        console.error("Error fetching user:", error);
      });
  }, [userId]);

  const userView = () => {

    return (
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
         <ViewUserProfile user={user} />
        </Col>
      </Row>
    );
  };

  return (
    <Base>
      {user ? userView() : 'Loading user data..'}
    </Base>
  );
}

export default ProfileInfo;
