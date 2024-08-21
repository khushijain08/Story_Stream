import { useEffect } from "react";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";
import { loadAllPosts } from "../services/post-service";
import {Row, Col, Container } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";

const Home =()=>{


    return(
        <Base>
            <Container className="mt-3" >
        
        <Row>
            <Col md={2} className="pt-5">
            <CategorySideMenu />
            </Col>
            <Col md={10}>
            <NewFeed />
            </Col>
        </Row>
        </Container>
        {/* </div> */}
        </Base>
    );
};
export default Home