import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import {Link} from 'react-router-dom';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import './login.css';

class TeacherLogin extends Component {
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
                <Button color="primary" className="px-4">Acessar como aluno</Button>
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
                    <h1>Login do Professor</h1>
                    <label> Usuário </label>
                    <InputGroup className="mb-3">
                      <Input type="text"/>
                    </InputGroup>

                    <label> Senha </label>
                    <InputGroup className="mb-4">
                      <Input type="text"/>
                    </InputGroup>
                    <Row className="action-buttons">
                      <Col xs="3" className="student-login-button teacher-toggle">
                        <label>
                          <Toggle
                            className='custom-classname'
                            icons={false}
                            onChange={this.handleAubergineChange} />
                        </label>
                      </Col>
                      <Col xs="6" className="student-login-button">
                        <Link to={'/contato'}>
                          <Button color="primary" className="px-4">Acessar</Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardBody>
                  <Row>
                    <Col xs="12" className="teacher-register-button">
                      <Link to={'/register'}>
                        <Button color="primary" className="px-4">Criar conta</Button>
                      </Link>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="12" className="forgot-password-button">
                      <Link to={'/forgot_password'}>
                        <Button color="primary" className="px-4">Esqueceu a senha</Button>
                      </Link>
                    </Col>
                  </Row>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TeacherLogin;
