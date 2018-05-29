import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, CardHeader, Button, Input, InputGroup, InputGroupAddon, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import SearchInput, {createFilter} from 'react-search-input'
import emails from './Mails'
import './login.css';

const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name']

const pie = {
  labels: [
    'Errado',
    'Certo',
  ],
  datasets: [
    {
      data: [300, 50],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
      ],
    }],
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: true,
      searchTerm: ''
    };

    this.toggleLarge = this.toggleLarge.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this)
  }

  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }

  render() {
    const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

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
                <h2> PESQUISAR SALA </h2>
                <Card className="p-4 search-class-box">
                  <SearchInput className="search-input" onChange={this.searchUpdated} />
                  <i className="icon-magnifier icons font-2xl d-block mt-4"></i>
                </Card>

                <Card className="p-4 student-bg-color">
                  {filteredEmails.map(email => {
                    return (
                      <Card className="p-4 class-list-item">
                        <div className="mail" key={email.id}>
                          <div className="from">
                            <p> {email.user.name} </p>
                          </div>
                          <div className="subject">
                            <p> {email.subject} </p>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </Card>
                <div class="add-class-button">
                  <Button> ADICIONAR TURMA </Button>
                </div>
                <div className="bubbles-bottom-box">
                  <img className="bubbles-bottom" src={"/img/bubbles-img.png"} alt={"bubbles-bottom"}/>
                </div>
              </CardGroup>
            </Col>

            <Col md="7" className="question-container">
              <CardGroup>
                <div className="p-4">
                  <div className="bubbles-teacher-box">
                    <img className="bubbles-teacher" src={"/img/bubbles-img.png"} alt={"bubbles-teacher"}/>
                  </div>
                  <div className="question_box">
                    <h1>Turma do bairro</h1>
                  </div>

                  <div>
                    <div className="class-list-students">
                      <ul>
                        <li>
                          José Bezerra
                        </li>

                        <li>
                          Merida da Silva
                        </li>

                        <li>
                          Beatriz Leonardo
                        </li>

                        <li>
                          Aurora Boreal
                        </li>
                      </ul>

                      <Link to={'/contato'}>
                        <Button color="primary" className="px-4">ATIVAR CÓDIGO</Button>
                      </Link>
                    </div>

                    <Card>
                      <div> 
                        <h2> José Bezerra </h2>
                      </div>
                      <div>
                        <CardBody>
                          <div className="chart-wrapper">
                            <Pie data={pie} />
                          </div>
                          <div className="student-daltonism-percentage"> 
                            <p>
                              80% de chance de ter DALTONISMO
                            </p>
                          </div>
                        </CardBody>
                        <div className="student-answers">
                          <ul>
                            <li>
                              Pergunta 1
                            </li>

                            <li>
                              Pergunta 2
                            </li>

                            <li>
                              Pergunta 3
                            </li>

                            <li>
                              Pergunta 4
                            </li>

                            <li>
                              Pergunta 5
                            </li>

                            <li>
                              Pergunta 6
                            </li>

                            <li>
                              Pergunta 7
                            </li>

                            <li>
                              Pergunta 8
                            </li>

                            <li>
                              Pergunta 9
                            </li>

                            <li>
                              Pergunta 10
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardGroup>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}

export default Login;
