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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Link} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { create, update, destroy, show } from '../../../api/offer'

class Form extends Component {

  componentDidMount () {
    moment.locale('br');

    if(this.props.match.params.id){
      this.setState({ mode: 'update' })

      this.loadOffer(this.props.match.params.id)
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment(),
      offer: {},
      errors: {},
      mode: 'create',
      isFetching: false,
      isRemoving: false,
      coverFile: undefined,
      removeModal: false,
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

  handleInputChangeCover = (evt, value) => {
    this.setState({
      coverFile: evt.target.files[0]
    })
  }

  toggleFetching = () => {
    this.setState({
      isFetching: !this.state.isFetching
    })
  }

  toggleIsRemoving = () => {
    this.setState({
      isRemoving: !this.state.isRemoving
    })
  }

  toggleRemoveModal = () => {
    this.setState({
      removeModal: !this.state.removeModal
    })
  }

  loadOffer = (id) => {
    show(id)
      .then((json) => {
        this.setState({
          offer: {
            ...json,
            started_at: moment(json.started_at),
            finished_at: moment(json.finished_at)
          }
        })
      }).catch((error) => {
        this.displayErrorMessage()
        console.log('error', error)
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

  displaySuccessMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  displayErrorMessage = (message="Algum erro aconteceu, tente novamente") => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  updateOfferCover = (offer) => {
    this.coverInput.value = "";

    this.setState({
      offer: {
        ...this.state.offer,
        cover: offer.cover,
      },
      mode: 'edit',
      coverFile: undefined
    })
  }

  createOffer = (params) => {
    create(params)
      .then((json) => {
        this.props.history.replace({pathname: `/ofertas/${json.id}`})

        this.displaySuccessMessage('Criado com Sucesso.')

        this.updateOfferCover(json)

        this.toggleFetching()
      }).catch((error) => {
        this.displayErrorMessage()

        this.toggleFetching()

        console.log('error...', error)
      })
  }

  updateOffer = (params) => {
    update(this.state.offer.id, params)
      .then((json) => {
        this.displaySuccessMessage('Atualizado com Sucesso.')

        this.updateOfferCover(json)

        this.toggleFetching()
      }).catch((error) => {
        this.displayErrorMessage()

        this.toggleFetching()

        console.log('error...', error)
      })
  }

  handleRemove = () => {
    destroy(this.state.offer.id)
      .then((json) => {
        this.toggleIsRemoving()

        this.props.history.push('/ofertas')
      }).catch((error) => {
        this.displayErrorMessage()

        this.toggleIsRemoving()

        console.log('error...', error)
      })
  }

  handleSubmit = (evt) => {
    if(evt){
      evt.preventDefault()
    }

    if(this.isValidForm()){
      this.toggleFetching()

      let params = this.buildFormData()

      if(this.state.mode === 'create'){
        this.createOffer(params)
      }else{
        this.updateOffer(params)
      }
    }
  }

  buildFormData = () => {
    const data = new FormData()

    data.append('offer[title]', this.state.offer.title)
    data.append('offer[places]', this.state.offer.places)
    data.append('offer[description]', this.state.offer.description)
    data.append('offer[started_at]', this.state.offer.started_at)
    data.append('offer[finished_at]', this.state.offer.finished_at)

    if(this.state.coverFile){
      data.append('offer[cover]', this.state.coverFile)
    }

    return data
  }

  renderErrorMessageFor = (fieldName) => {
    if(this.isValidField(fieldName)){ return null }

    return(
      <small className='text-danger active'>{this.state.errors[fieldName]}</small>
    )
  }

  renderCoverImage = () => {
    if(!this.state.offer || !this.state.offer.cover ){ return null }

    return(
      <img src={this.state.offer.cover.thumb.url} className="img-thumbnail mt-3" />
    )
  }

  renderRemoveModal = () => {
    return(
      <Modal isOpen={this.state.removeModal} toggle={this.toggleRemoveModal}
             className={'modal-darger ' + this.props.className}>
        <ModalHeader toggle={this.toggleRemoveModal}>Alerta</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Col xs="12" lg="12">
              <p>Você confirma a exclusão desta Oferta?</p>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.handleRemove}>Confirmar</Button>
          <Button color="secondary" onClick={this.toggleRemoveModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    )
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="12" sm="6">
            <Card>
              <CardHeader className={"d-flex justify-content-between align-items-center"}>
                <strong>Oferta</strong>

                {
                  this.state.mode === 'create'
                  ? null
                  : <Button color="primary" onClick={this.toggleRemoveModal} className={'mt-0'} disabled={this.state.isRemoving}>{this.state.isRemoving ? '...' : 'Remover'}</Button>
                }
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
                      <Input type="file" id="file-input" name="cover" onChange={this.handleInputChangeCover} ref={ref=> this.coverInput = ref}/>
                      {this.renderCoverImage()}
                    </Col>
                  </FormGroup>
                  <div className="form-actions d-flex align-items-center justify-content-end">
                    <Button className="mr-3" type="submit" color="primary" disabled={this.state.isFetching}>{this.state.isFetching ? '...' : 'Salvar'}</Button>
                    <Link to={'/ofertas'}>
                      <Button color="secondary">Voltar</Button>
                    </Link>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {this.renderRemoveModal()}
        <ToastContainer autoClose={3000} />
      </div>
    )
  }
}

export default Form;
