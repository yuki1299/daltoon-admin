import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { signIn } from '../../api/signIn'
import { storeCurrentUserCredentials } from '../../services/AuthService'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: {
        email: '',
        password: '',
      },
      isFetching: false,
      modal: false,
      errors: {},
    };
  }

  isValidForm = () => {
    let blankMessage = 'não pode ficar em branco'
    let errors = {}
    let admin = this.state.admin
    let isValid = true

    if(!admin.email || admin.email.length === 0){
      isValid = false
      errors.email = blankMessage
    }

    if(!admin.password || admin.password.length === 0){
      isValid = false
      errors.password = blankMessage
    }

    this.setState({
      errors
    })

    return isValid
  }

  isValidField = (fieldName) => {
    return this.state.errors[fieldName] === undefined
  }

  handleInputChange = (evt, value) => {
    let options = {}
    options[evt.target.name] = evt.target.value

    this.setState({
      admin: {
        ...this.state.admin,
        ...options
      }
    })
  }

  processSignIn = () => {
    this.setState({
      isFetching: true
    })

    let params = JSON.stringify({
      email: this.state.admin.email,
      password: this.state.admin.password
    })

    signIn(params)
      .then((res) => {
        this.setState({
          isFetching: false
        })

        if(res.status === 200 || res.status === 201){
          storeCurrentUserCredentials(res)

          this.redirectAfterSignIn()
        }else{
          this.handleToggleModal()
        }
      }).catch((error) => {
        this.setState({
          isFetching: false
        })
      })
  }

  redirectAfterSignIn = () => {
    this.props.history.push('/sorteios')
  }

  handleToggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleSubmit = (evt) => {
    if(evt){
      evt.preventDefault()
    }

    if(this.isValidForm()){
      console.log('submiting...', this.state.admin)

      this.processSignIn()
    }
  }

  renderErrorMessageFor = (fieldName) => {
    if(this.isValidField(fieldName)){ return null }

    return(
      <small className='text-danger active'>{this.state.errors[fieldName]}</small>
    )
  }

  renderModal = () => {
    return(
      <Modal isOpen={this.state.modal} toggle={this.handleToggleModal}
             className={'modal-danger ' + this.props.className}>
        <ModalHeader toggle={this.handleToggleModal}>Falha no Login</ModalHeader>
        <ModalBody>
          <p>Seu usúario ou senha estão incorretos.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleToggleModal}>Ok</Button>
        </ModalFooter>
      </Modal>
    )
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <form onSubmit={this.handleSubmit}>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <h1>Login</h1>
                      <p className="text-muted">Acesse sua conta</p>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                          <Input type="email" name={'email'} placeholder="E-mail" onChange={this.handleInputChange}/>
                        </InputGroup>
                        {this.renderErrorMessageFor('email')}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                          <Input type="password" name={'password'} placeholder="Senha" onChange={this.handleInputChange}/>
                        </InputGroup>
                        {this.renderErrorMessageFor('password')}
                      </FormGroup>
                      <Row>
                        <Col xs="6">
                          <Button className="px-4" type="submit" color="primary" disabled={this.state.isFetching}>{this.state.isFetching ? '...' : 'Login'}</Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                    <CardBody className="text-center">
                      <div>
                        <h2>Admin Matchmapp</h2>
                        <p>Area exclusiva aos administradores do sistema.</p>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </form>
          {this.renderModal()}
        </Container>
      </div>
    );
  }
}

export default Login;
