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
import LoteryBox from './LoteryBox'
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Link} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { create, update, destroy, show, winner, winnerMessage } from '../../../api/lotery'

class Form extends Component {

  componentDidMount () {
    moment.locale('br');

    if(this.props.match.params.id){
      this.setState({ mode: 'update' })

      this.loadRaffle(this.props.match.params.id)
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      success: false,
      raffle: {},
      winnerMessages: [],
      isFetchingWinnerMessage: false,
      errors: {},
      mode: 'create',
      isFetching: false,
      isRemoving: false,
      isFetchingWinner: false,
      coverFile: undefined,
      removeModal: false,
    };
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

  handleInputChangeCover = (evt, value) => {
    this.setState({
      coverFile: evt.target.files[0]
    })
  }

  handleGetWinner = () => {
    this.setState({
      isFetchingWinner: true
    })

    winner(this.state.raffle.id)
      .then((json) => {
        this.displaySuccessMessage('Sorteado Escolhido com Sucesso')

        this.setState({
          raffle: {
                    ...json,
                    raffle_at: moment(json.raffle_at),
                  },
          isFetchingWinner: false,
        })

      }).catch((error) => {
        this.setState({
          isFetchingWinner: false
        })

        this.displayErrorMessage()
      })
  }

  handleWinnerMessage = (message) => {
    this.setState({
      isFetchingWinnerMessage: true
    })

    winner(this.state.raffle.id)
      .then((json) => {
        this.displaySuccessMessage('Mensagem enviada com Sucesso')

        this.setState({
          winnerMessages: this.state.winnerMessages.concat(jsonq) ,
          isFetchingWinnerMessage: false,
        })

      }).catch((error) => {
        this.setState({
          isFetchingWinnerMessage: false
        })

        this.displayErrorMessage()
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

  loadRaffle = (id) => {
    show(id)
      .then((json) => {
        this.setState({
          raffle: {
            ...json,
            raffle_at: moment(json.raffle_at),
          },
          winnerMessages: json.winner_messages
        })
      }).catch((error) => {
        this.displayErrorMessage()
        console.log('error', error)
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

  updateRaffleCover = (raffle) => {
    this.coverInput.value = "";

    this.setState({
      raffle: {
        ...this.state.raffle,
        cover: raffle.cover,
      },
      mode: 'update',
      coverFile: undefined
    })
  }

  createRaffle = (params) => {
    create(params)
      .then((json) => {
        this.props.history.replace({pathname: `/sorteios/${json.id}`})

        this.displaySuccessMessage('Criado com Sucesso.')

        this.updateRaffleCover(json)

        this.toggleFetching()
      }).catch((error) => {
        this.displayErrorMessage()

        this.toggleFetching()

        console.log('error...', error)
      })
  }

  updateRaffle = (params) => {
    update(this.state.raffle.id, params)
      .then((json) => {
        this.displaySuccessMessage('Atualizado com Sucesso.')

        this.updateRaffleCover(json)

        this.toggleFetching()
      }).catch((error) => {
        this.displayErrorMessage()

        this.toggleFetching()

        console.log('error...', error)
      })
  }

  handleRemove = () => {
    destroy(this.state.raffle.id)
      .then((json) => {
        this.toggleIsRemoving()

        this.props.history.push('/sorteios')
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
        this.createRaffle(params)
      }else{
        this.updateRaffle(params)
      }
    }
  }

  buildFormData = () => {
    const data = new FormData()

    data.append('raffle[title]', this.state.raffle.title)
    data.append('raffle[places]', this.state.raffle.places)
    data.append('raffle[description]', this.state.raffle.description)
    data.append('raffle[raffle_at]', this.state.raffle.raffle_at)

    if(this.state.coverFile){
      data.append('raffle[cover]', this.state.coverFile)
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
    if(!this.state.raffle || !this.state.raffle.cover ){ return null }

    return(
      <img src={this.state.raffle.cover.thumb.url} className="img-thumbnail mt-3" />
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
              <p>Você confirma a exclusão deste Sorteio?</p>
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
                <strong>Sorteio</strong>

                {
                  this.state.mode === 'create'
                  ? null
                  : <Button color="primary" onClick={this.toggleRemoveModal} className={'mt-0'} disabled={this.state.isRemoving}>{this.state.isRemoving ? '...' : 'Remover'}</Button>
                }
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
                      <Input type="file" id="file-input" name="cover" onChange={this.handleInputChangeCover} ref={ref=> this.coverInput = ref}/>
                      {this.renderCoverImage()}
                    </Col>
                  </FormGroup>
                  <div className="form-actions d-flex align-items-center justify-content-end">
                    <Button className="mr-3" type="submit" color="primary" disabled={this.state.isFetching}>{this.state.isFetching ? '...' : 'Salvar'}</Button>
                    <Link to={'/sorteios'}>
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

        {
          this.state.mode === 'update'
          ? <LoteryBox
              raffle={this.state.raffle}
              isFetchingWinner= {this.state.isFetchingWinner}
              onPressChooseWiner={this.handleGetWinner}
              onSendWinnerMessage={this.state.handleWinnerMessage}
              winnerMessages={this.state.winnerMessages}
              isFetchingWinnerMessage={this.state.isFetchingWinnerMessage} />
          : null
        }
      </div>
    )
  }
}

export default Form;
