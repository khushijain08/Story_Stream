import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Container, FormGroup, Input, Label, Form, Button, Row, Col, FormFeedback } from "reactstrap";
import Base from "../components/Base";
import { signup } from "../services/user-service";
import { toast } from "react-toastify";
const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    about: '',
  });

  const [error, setError] = useState({
    errors: {},
    isError: false
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  // Handle change
  const handleChange = (event, property) => {
    // Dynamic setting the value
    setData({ ...data, [property]: event.target.value });
  };

  // Reset form
  const resetData = () => {
    setData({
      name: '',
      email: '',
      password: '',
      about: '',
    });
  };

  // Submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    if(error.isError)
    {
        toast.error("Form data is invalid,correct all details and submit");
        setError({...error,isError:false})
        return;
    }
    console.log(data);
    // Data validation

    // Call server API for sending data
    signup(data)
      .then((resp) => {
        console.log(resp);
        console.log("Success log");
        toast.success("User is registerd successfully !! user id"+resp.id)
        setData({name: '',
        email: '',
        password: '',
        about: '',})
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
    
        //handle errors in proper way
        setError({
            errors:error,
            isError:true
        })
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
         {/* // {JSON.stringify(data)} */}
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" outline className="shadow">
              <CardHeader>
                <h3>Fill Information to Register !!</h3>
              </CardHeader>
              <CardBody>
                {/* Creating form */}
                <Form onSubmit={handleSubmit}>
                  {/* Name field */}
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={error.errors?.response?.data?.name ? true:false}
                    />
                    <FormFeedback>
                    {error.errors?.response?.data?.name }
                    </FormFeedback>
                  </FormGroup>
                  {/* Email field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={error.errors?.response?.data?.email ? true:false}
                    />
                    <FormFeedback>
                    {error.errors?.response?.data?.email }
                    </FormFeedback>

                  </FormGroup>
                  
                  {/* Password field */}
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={error.errors?.response?.data?.password ? true:false}
                    />
                    <FormFeedback>
                    {error.errors?.response?.data?.password }
                    </FormFeedback>
                  </FormGroup>
                  

                  {/* About field */}
                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter here"
                      id="about"
                      style={{ height: "250px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={error.errors?.response?.data?.about ? true:false}
                    />
                    <FormFeedback>
                    {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>
                
                  <Container className="text-center">
                    <Button color="dark" outline type="submit">
                      Register
                    </Button>
                    <Button
                      onClick={resetData}
                      color="secondary"
                      outline
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Signup;
