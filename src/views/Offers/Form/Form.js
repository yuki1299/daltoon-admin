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
      endDate: moment()
    };
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEndDate(date) {
    this.setState({
      endDate: date
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Oferta</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <Label htmlFor="company">Nome</Label>
                      <Input name="title" type="text" id="offer-name" placeholder="Nome da Oferta"/>
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label htmlFor="vat">Data de Início</Label>
                      <DatePicker
                          selected={this.state.startDate}
                          name={"started_at"}
                          locale={'pt'}
                          className={'form-control'}
                          onChange={this.handleChange.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label htmlFor="vat">Data de Término</Label>
                      <DatePicker
                          selected={this.state.endDate}
                          name={"finished_at"}
                          locale={'pt'}
                          className={'form-control'}
                          onChange={this.handleChangeEndDate.bind(this)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup row>
                  <Col xs="12" lg="6">
                    <FormGroup>
                      <Label htmlFor="textarea-input">Descrição</Label>
                      <Input type="textarea" name="description" id="offer-description" rows="9" placeholder="Descrição"/>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Label htmlFor="city">Locais</Label>
                      <Input type="textarea" name="places" id="offer-locale" rows="9" placeholder="Locais de Oferta"/>
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
      </div>
    )
  }
}

export default Form;
