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
import SubscribersModal from './SubscribersModal'
import { users, winner } from '../../../api/lotery'
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import Moment from 'react-moment';

class LoteryBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      modal: false,
      subscribersModal: false,
      subscribers: [],
      subscribers_total: 0,
      subscribers_total_pages: 0,
      subscribers_current_page: 0,
      subscribersIsFetching: false,
    };
  }

  toggleModal = () =>  {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleSubscribersModal = () =>  {
    this.setState({
      subscribersModal: !this.state.subscribersModal
    });
  }

  handleChangePage = (evt, page) => {
    if(evt){
      evt.preventDefault()
    }

    let params = []

    if(page > 1){
      params.push(`page=${page}`)
    }

    this.setState({
      subscribersIsFetching: true
    })

    users(this.props.raffle.id, params)
      .then((json) => {
        this.setState({
          subscribers: json.users,
          subscribers_total: json.total,
          subscribers_total_pages: json.total_pages,
          subscribers_current_page: json.current_page,
          subscribersIsFetching: false,
        })
      }).catch((error) => {
        this.setState({
          subscribersIsFetching: false
        })

        this.displayErrorMessage()
      })
  }

  handleOpenSubscribers = () => {
    this.setState({
      subscribersIsFetching: true
    })

    users(this.props.raffle.id)
      .then((json) => {
        this.setState({
          subscribers: json.users,
          subscribers_total: json.total,
          subscribers_total_pages: json.total_pages,
          subscribers_current_page: json.current_page,
          subscribersIsFetching: false,
        })

        this.toggleSubscribersModal()

        console.log(json)
      }).catch((error) => {
        this.setState({
          subscribersIsFetching: true
        })

        this.displayErrorMessage()
      })
  }

  handleSendMessage = () => {
    if(this.state.message.length === 0){
      this.displayErrorMessage('Mensagem não pode ser em branca.')

      return false
    }

    this.toggleModal()

    this.props.onSendWinnerMessage(this.state.message)
  }

  handleInputMessageChange = (evt) => {
    this.setState({
      message: evt.target.value
    })
  }

  displayErrorMessage = (message="Algum erro aconteceu, tente novamente") => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  renderChooseWinner = () => {
    return(
      <div className="form-actions d-flex align-items-center justify-content-center">
        <Button type="submit" onClick={this.props.onPressChooseWiner} color="primary" disabled={this.props.isFetchingWinner}>{this.props.isFetchingWinner ? 'Sorteando...' : 'Sortear Ganhador'}</Button>
      </div>
    )
  }

  renderWinnerInfo = () => {
    const winner = this.props.raffle.winner
    return(
      <Card>
        <CardHeader className={"bg-success"}>
          Ganhador
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" lg="6">
              <p>
                <img src={winner.avatar.thumb.url} />
              </p>
            </Col>
            <Col xs="12" lg="6">
              <p>
                {winner.name}
              </p>
              <p>
                <a href={`http://www.facebook.com.br/${winner.uid}`} target="_blank"> <i className="fa fa-facebook-official fa-lg mt-4"></i> &nbsp; Perfil </a>
              </p>
              <p>
                <a href={`http://www.instagram.com/${winner.instagram}`} target="_blank"> <i className="fa fa-instagram fa-lg mt-4"></i> &nbsp; Perfil </a>
              </p>
            </Col>
          </Row>

          <Button className="form-actions d-flex align-items-center justify-content-end float-right" color="success" onClick={this.toggleModal}>Enviar Mensagem</Button>

          {
            this.props.winnerMessages.length > 0
            ? this.renderMessages()
            : null
          }
        </CardBody>
      </Card>
    )
  }

  renderMessages = () => {
    return(
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardHeader >
              Mensagens Enviadas
            </CardHeader>
            <CardBody>
              <ul>
                {this.props.winnerMessages.map((message, index) => <li key={index}>
                                                                      <p className={'mb-0'}>{message.content}</p>
                                                                      <p className={'mt-0'}><strong>enviado em:</strong> {<Moment parse="YYYY-MM-DD HH:mm:ss" format="DD/MM/YYYY HH:mm:ss">{message.created_at}</Moment>}</p>
                                                                   </li>)}
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }

  renderModal = () => {
    return(
      <Modal isOpen={this.state.modal} toggle={this.toggleModal}
             className={'modal-success ' + this.props.className}>
        <ModalHeader toggle={this.toggleModal}>Notificação para ganhador</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Col xs="12" lg="12">
              <FormGroup>
                <Label htmlFor="textarea-input">Mensagem</Label>
                <Input type="textarea" name="description" id="lotery-description" rows="9" placeholder="Instruções para contato com ganhador do sorteio" value={this.state.message} onChange={this.handleInputMessageChange}/>
              </FormGroup>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.handleSendMessage}>Enviar</Button>
          <Button color="secondary" onClick={this.toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    )
  }

  render(){
    return(
      <Row>
        <Col lg="6" sm="6">
          <Card>
            <CardHeader className={"d-flex justify-content-between align-items-center"}>
              {
                this.props.raffle.winner
                ? "Sorteado"
                : "Realizar Sorteio"
              }

              <Button color="secondary" onClick={this.handleOpenSubscribers} className={'mt-0'}>{'Participantes'}</Button>
            </CardHeader>
            <CardBody>
              {
                this.props.raffle.winner
                ? this.renderWinnerInfo()
                : this.renderChooseWinner()
              }
            </CardBody>
          </Card>
        </Col>
        {this.renderModal()}
        <SubscribersModal
          toggleModal={this.toggleSubscribersModal}
          modal={this.state.subscribersModal}
          isFetching={this.state.subscribersIsFetching}
          users={this.state.subscribers}
          total={this.state.subscribers_total}
          totalPages={this.state.subscribers_total_pages}
          current_page={this.state.subscribers_current_page}
          onChangePage={this.handleChangePage}
        />
        <ToastContainer autoClose={3000} />
      </Row>
    )
  }
}

export default LoteryBox
