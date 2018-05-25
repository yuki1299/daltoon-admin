import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import {Link} from 'react-router-dom';
import './login.css';

class Login extends Component {
  render() {
    return (
      <div className="app flex-row default-bg">
        <Container>
          <Row>
            <Col xs="6" className="teacher-login-button">
              <div className="bubbles-teacher-box">
                <img className="bubbles-teacher" src={"/img/bubbles-img.png"} alt={"bubbles-teacher"}/>
              </div>
              <Link to={'/teacher-login'}>
                <Button color="primary" className="px-4">Acessar como professor</Button>
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="login-img-box">
                <img className="logo-img" src={"/img/daltoon-logo.png"} alt={"logo"}/>
              </div>
              <CardGroup className="student-login-container">
                <Card className="p-4 student-bg-color">
                  <div className="bubbles-top-box">
                    <img className="bubbles-top" src={"/img/bubbles-img.png"} alt={"bubbles-top"}/>
                  </div>
                  <div className="bubbles-bottom-box">
                    <img className="bubbles-bottom" src={"/img/bubbles-img.png"} alt={"bubbles-bottom"}/>
                  </div>
                  <CardBody>
                    <h1>Login</h1>
                    <label> Nome </label>
                    <InputGroup className="mb-3">
                      <Input type="text"/>
                    </InputGroup>

                    <label> INSERIR CÓDIGO </label>
                    <InputGroup className="mb-4">
                      <Input type="text"/>
                    </InputGroup>
                    <Row>
                      <Col xs="6" className="student-login-button">
                        <Link to={'/contato'}>
                          <Button color="primary" className="px-4">Acessar</Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="d-none text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Cadastro</h2>
                      <p>Para se cadastrar entre em contato com a equipe do Europa!</p>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
