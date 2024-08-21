import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
const Login = () => {

    const userContextData=useContext(userContext);

    const navigate=useNavigate()
    
    const [loginDetail, setLoginDetail] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event, field) => {
        let actualValue = event.target.value;
        setLoginDetail({
            ...loginDetail,
            [field]: actualValue
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (loginDetail.email.trim() === '' || loginDetail.password.trim() === '') {
            toast.error("email or password is required");
            return;
        }

        // Submit the data to the server to generate token
        loginUser(loginDetail)
            .then((data) => {
        
                console.log(data);

                //save the data to local storage
                doLogin(data,()=>{
                    console.log("Login detail is saved to localstorage")

                    //redirect to user dashboard page

                    userContextData.setUser({
                        data:data.user,
                        login:true
                    })
                    navigate("/user/dashboard")
                })

                toast.success("Login success");
            })
            .catch((error) => {
                console.error(error);
                if (error.response && (error.response.status === 400 || error.response.status === 404)) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Something went wrong on the server");
                }
            });
    };

    const handleReset = () => {
        setLoginDetail({
            email: '',
            password: ''
        });
    };

    return (
        <Base>
            <Container>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card className="shadow">
                            <CardHeader>
                                <h3>Login Here !!</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleFormSubmit}>
                                    {/* Email field */}
                                    <FormGroup>
                                        <Label for="email">Enter email</Label>
                                        <Input
                                            type="email"
                                            placeholder="Enter here"
                                            id="email"
                                            value={loginDetail.email}
                                            onChange={(e) => handleChange(e, 'email')}
                                        />
                                    </FormGroup>
                                    {/* Password field */}
                                    <FormGroup>
                                        <Label for="password">Enter password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Enter here"
                                            id="password"
                                            value={loginDetail.password}
                                            onChange={(e) => handleChange(e, 'password')}
                                        />
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button color="dark" outline type="submit">
                                            Login
                                        </Button>
                                        <Button className="ms-2" color="dark" outline onClick={handleReset}>
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

export default Login;