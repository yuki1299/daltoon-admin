import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';
import './history.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: true,
    };

    this.toggleLarge = this.toggleLarge.bind(this);
  }

  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }

  render() {
    return (
      <div className="app flex-row default-bg">
        <Container>
          <Row>
            <Col xs="1" className="teacher-login-button">
              <div className="bubbles-teacher-box">
                <img className="bubbles-teacher" src={"/img/bubbles-img.png"} alt={"bubbles-teacher"}/>
              </div>
              <Link to={'/teacher-login'}>
                <Button color="primary" className="px-4">SAIR</Button>
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="5">
              <div className="login-img-box">
                <img className="logo-img" src={"/img/daltoon-logo.png"} alt={"logo"}/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <CardGroup className="student-login-container">
                <Card className="p-4 student-bg-color">
                  <div className="bubbles-top-box">
                    <img className="bubbles-top" src={"/img/bubbles-img.png"} alt={"bubbles-top"}/>
                  </div>
                  <div className="bubbles-bottom-box">
                    <img className="bubbles-bottom" src={"/img/bubbles-img.png"} alt={"bubbles-bottom"}/>
                  </div>
                  <CardBody>
                    <Button onClick={this.toggleLarge} className="play_button_box">
                      <img className="bubbles-top" src={"/img/play_button.png"} alt={"play_button"}/>
                    </Button>

                    <label> ASSISTIR NOVAMENTE </label>

                    <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                         className={'modal-lg ' + this.props.className}>
                    <ModalHeader toggle={this.toggleLarge}>Questão 1</ModalHeader>
                    <ModalBody>
                      <iframe width="100%" height="678" src="https://www.youtube.com/embed/A7qGNzzqXA4?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggleLarge}>Fechar</Button>
                    </ModalFooter>
                  </Modal>
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

            <Col md="7" className="question-container question_1">
              <CardGroup>
                <Card className="p-4">
                  <div className="question_box">
                    <h1>Questão 1</h1>
                    <p> Lorem ipsum pellentesque curabitur porta maecenas pretium ipsum velit aptent vestibulum, pellentesque per euismod</p>
                  </div>
                  <CardBody>
                    <div>A</div>
                    <div>B</div>
                    <div>C</div>
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
