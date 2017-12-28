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
import {Link} from 'react-router-dom';
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
      raffle: {},
      errors: {},
    };

    this.toggleSuccess = this.toggleSuccess.bind(this);
  }

  handleDatePickerChange = (date, fieldName) => {
    let options = {}
    options[fieldName] = date
    
    this.setState({
      raffle: {
        ...this.state.raffle,
        ...options
      }
    })
  }

  handleInputChange = (evt, value) => {
    let options = {}
    options[evt.target.name] = evt.target.value

    this.setState({
      raffle: {
        ...this.state.raffle,
        ...options
      }
    })
  }

  isValidForm = () => {
    let blankMessage = 'não pode ficar em branco'
    let errors = {}
    let raffle = this.state.raffle
    let isValid = true

    if(!raffle.title || raffle.title.length === 0){
      isValid = false
      errors.title = blankMessage
    }

    if(!raffle.raffle_at || raffle.raffle_at.length === 0){
      isValid = false
      errors.raffle_at = blankMessage
    }

    if(!raffle.description || raffle.description.length === 0){
      isValid = false
      errors.description = blankMessage
    }

    if(!raffle.places || raffle.places.length === 0){
      isValid = false
      errors.places = blankMessage
    }


    this.setState({
      errors
    })

    return isValid
  }

  isValidField = (fieldName) => {
    return this.state.errors[fieldName] === undefined
  }

  handleSubmit = (evt) => {
    if(evt){
      evt.preventDefault()
    }

    if(this.isValidForm()){
      console.log('submiting...', this.state.raffle)
    }

  }

  renderErrorMessageFor = (fieldName) => {
    if(this.isValidField(fieldName)){ return null }

    return(
      <small className='text-danger active'>{this.state.errors[fieldName]}</small>
    )
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
                <form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col lg="8">
                      <FormGroup>
                        <Label htmlFor="name">Nome {this.renderErrorMessageFor('title')}</Label>
                        <Input className={`${this.isValidField('title') ? '' : 'is-invalid'}`} name="title" type="text" id="lotery-name" placeholder="Nome do Sorteio" onChange={this.handleInputChange} value={this.state.raffle.title || ''}/>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label htmlFor="vat">Data do Sorteio {this.renderErrorMessageFor('raffle_at')}</Label>
                        <DatePicker
                            className={`${this.isValidField('raffle_at') ? '' : 'is-invalid'} form-control`}
                            selected={this.state.raffle.raffle_at}
                            name={"raffle_at"}
                            locale={'pt'}
                            onChange={(date) => this.handleDatePickerChange(date, 'raffle_at')}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup row>
                    <Col xs="12" lg="8">
                      <FormGroup>
                        <Label htmlFor="textarea-input">Descrição {this.renderErrorMessageFor('description')}</Label>
                        <Input className={`${this.isValidField('description') ? '' : 'is-invalid'}`} type="textarea" name="description" id="lotery-description" rows="9" placeholder="Descrição" onChange={this.handleInputChange} value={this.state.raffle.description || ''}/>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label htmlFor="city">Locais {this.renderErrorMessageFor('places')}</Label>
                        <Input className={`${this.isValidField('places') ? '' : 'is-invalid'}`} type="textarea" name="places" id="lotery-locale" rows="9" placeholder="Locais de Sorteio" onChange={this.handleInputChange} value={this.state.raffle.places || ''}/>
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
                    <Link to={'/sorteios'}>
                      <Button color="secondary">Cancelar</Button>
                    </Link>
                  </div>
                </form>
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
