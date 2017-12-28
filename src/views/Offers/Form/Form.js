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
      endDate: moment(),
      offer: {},
      errors: {},
    };
  }

  handleDatePickerChange = (date, fieldName) => {
    let options = {}
    options[fieldName] = date
    
    this.setState({
      offer: {
        ...this.state.offer,
        ...options
      }
    })
  }

  handleChangeEndDate(date) {
    this.setState({
      endDate: date
    });
  }

  handleInputChange = (evt, value) => {
    let options = {}
    options[evt.target.name] = evt.target.value

    this.setState({
      offer: {
        ...this.state.offer,
        ...options
      }
    })
  }

  isValidForm = () => {
    let blankMessage = 'não pode ficar em branco'
    let errors = {}
    let offer = this.state.offer
    let isValid = true

    if(!offer.title || offer.title.length === 0){
      isValid = false
      errors.title = blankMessage
    }

    if(!offer.started_at || offer.started_at.length === 0){
      isValid = false
      errors.started_at = blankMessage
    }

    if(!offer.description || offer.description.length === 0){
      isValid = false
      errors.description = blankMessage
    }

    if(!offer.places || offer.places.length === 0){
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
      console.log('submiting...', this.state.offer)
    }

  }

  renderErrorMessageFor = (fieldName) => {
    if(this.isValidField(fieldName)){ return null }

    return(
      <small className='text-danger active'>{this.state.errors[fieldName]}</small>
    )
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
                <form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <Label htmlFor="name">Nome {this.renderErrorMessageFor('title')}</Label>
                        <Input className={`${this.isValidField('title') ? '' : 'is-invalid'}`} name="title" type="text" id="offer-name" placeholder="Nome da Oferta" onChange={this.handleInputChange} value={this.state.offer.title || ''}/>
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label htmlFor="vat">Data de Início {this.renderErrorMessageFor('started_at')}</Label>
                        <DatePicker
                            className={`${this.isValidField('started_at') ? '' : 'is-invalid'} form-control`}
                            selected={this.state.offer.started_at}
                            name={"started_at"}
                            locale={'pt'}
                            onChange={(date) => this.handleDatePickerChange(date, 'started_at')}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <Label htmlFor="vat">Data de Término</Label>
                        <DatePicker
                            selected={this.state.offer.finished_at}
                            name={"finished_at"}
                            locale={'pt'}
                            className={'form-control'}
                            onChange={(date) => this.handleDatePickerChange(date, 'finished_at')}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup row>
                    <Col xs="12" lg="6">
                      <FormGroup>
                        <Label htmlFor="textarea-input">Descrição {this.renderErrorMessageFor('description')} </Label>
                        <Input className={`${this.isValidField('description') ? '' : 'is-invalid'}`} type="textarea" name="description" id="offer-description" rows="9" placeholder="Descrição" onChange={this.handleInputChange} value={this.state.offer.description || ''}/>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Label htmlFor="city">Locais {this.renderErrorMessageFor('places')}</Label>
                        <Input className={`${this.isValidField('places') ? '' : 'is-invalid'}`} type="textarea" name="places" id="offer-locale" rows="9" placeholder="Locais de Oferta" onChange={this.handleInputChange} value={this.state.offer.places || ''}/>
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
                    <Link to={'/ofertas'}>
                      <Button color="secondary">Cancelar</Button>
                    </Link>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form;
