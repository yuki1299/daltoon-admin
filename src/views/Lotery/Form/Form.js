import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class Form extends Component {

  componentDidMount () {
    moment.locale('br');
  }

  constructor(props) {
    super(props);
  
    this.state = {
      startDate: moment(),
      success: false,
    };

    this.toggleSuccess = this.toggleSuccess.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Sorteio</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg="8">
                    <FormGroup>
                      <Label htmlFor="company">Nome</Label>
                      <Input name="title" type="text" id="lotery-name" placeholder="Nome do Sorteio"/>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label htmlFor="vat">Data do Sorteio</Label>
                      <DatePicker
                          selected={this.state.startDate}
                          name={"raffle_at"}
                          locale={'pt'}
                          className={'form-control'}
                          onChange={this.handleChange.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup row>
                  <Col xs="12" lg="8">
                    <FormGroup>
                      <Label htmlFor="textarea-input">Descrição</Label>
                      <Input type="textarea" name="description" id="lotery-description" rows="9" placeholder="Descrição"/>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label htmlFor="city">Locais</Label>
                      <Input type="textarea" name="places" id="lotery-locale" rows="9" placeholder="Locais de Sorteio"/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col xs="12" md="5">
                    <Label htmlFor="file-input">Adicionar Imagem</Label>
                    <Input type="file" id="file-input" name="cover"/>
                  </Col>
                </FormGroup>
                <div className="form-actions d-flex align-items-center justify-content-end">
                  <Button className="mr-3" type="submit" color="primary">Salvar</Button>
                  <Button color="secondary">Cancelar</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="8" sm="6">
            <Card>
              <CardHeader>
                Realizar Sorteio
              </CardHeader>
              <CardBody>
                <div className="mb-4">
                  Sorteio do cupom da pizza de graça no Habibs
                </div>
                <Card>
                  <CardHeader className="bg-success">
                    Ganhador
                  </CardHeader>
                  <CardBody>
                    <div>
                      Ganhador Imagem
                    </div>
                    <div>
                      Ganhador Nome
                    </div>
                    <div>
                      Ganhador Facebook
                    </div>
                    <div>
                      Ganhador Instagram
                    </div>
                    <div>
                      Ganhador id
                    </div>

                    <Button className="form-actions d-flex align-items-center justify-content-end float-right" color="success" onClick={this.toggleSuccess}>Enviar Mensagem</Button>
                    <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                           className={'modal-success ' + this.props.className}>
                      <ModalHeader toggle={this.toggleSuccess}>Notificação para ganhador</ModalHeader>
                      <ModalBody>
                        <FormGroup row>
                          <Col xs="12" lg="12">
                            <FormGroup>
                              <Label htmlFor="textarea-input">Mensagem</Label>
                              <Input type="textarea" name="description" id="lotery-description" rows="9" placeholder="Instruções para contato com ganhador do sorteio"/>
                            </FormGroup>
                          </Col>
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="success" onClick={this.toggleSuccess}>Enviar</Button>
                        <Button color="secondary" onClick={this.toggleSuccess}>Cancelar</Button>
                      </ModalFooter>
                    </Modal>
                  </CardBody>
                </Card>
                <div className="form-actions d-flex align-items-center">
                  <Button type="submit" color="primary">Sortear Ganhador</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form;
