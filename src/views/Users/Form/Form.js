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
import UserCardForm from './UserCardForm'
import UserConfigurationForm from './UserConfigurationForm'
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Link} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { create, update, destroy, show } from '../../../api/user'

class Form extends Component {

  componentDidMount () {
    moment.locale('br');

    if(this.props.match.params.id){
      this.setState({ mode: 'update' })

      this.loadUser(this.props.match.params.id)
    }

    this.coverInput = ""
  }

  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment(),
      user: {},
      configuration: {},
      errors: {},
      mode: 'create',
      isFetching: false,
      isRemoving: false,
      avatarFile: undefined,
      removeModal: false,
      googlePlaces: {
        search: '',
        value: ''
      }
    };
  }

  handleSetCoverInput = (component) => {
    this.coverInput = component
  }

  handleDatePickerChange = (date, fieldName) => {
    let options = {}
    options[fieldName] = date

    this.setState({
      user: {
        ...this.state.user,
        ...options
      }
    })
  }

  handleInputChange = (evt, value) => {
    let options = {}
    options[evt.target.name] = evt.target.value

    console.log('---> options', {
        ...this.state.user,
        ...options
      })

    this.setState({
      user: {
        ...this.state.user,
        ...options
      }
    })
  }

  handleInputConfigurationChange = (evt, value) => {
    let options    = {}
    let valueField = evt.target.value

    if(evt.target.name === 'match_active'){
      valueField = !this.state.configuration.match_active
    }else if(evt.target.name === 'single'){
      valueField = !this.state.configuration.single
    }else if(evt.target.name === 'rolled'){
      valueField = !this.state.configuration.rolled
    }else if(evt.target.name === 'observer'){
      valueField = !this.state.configuration.observer
    }else if(evt.target.name === 'engaged'){
      valueField = !this.state.configuration.engaged
    }

    options[evt.target.name] = valueField

    console.log('---> options', evt.target.name, {
        ...this.state.configuration,
        ...options
      })

    this.setState({
      configuration: {
        ...this.state.configuration,
        ...options
      }
    })
  }

  handleInputConfigurationSliderChange = (name, value) => {
    this.handleInputConfigurationChange({target: {name: name, value: value}})
  }

  handleInputConfigurationRangeChange = (name, values) => {
    let options = {}

    if(values[0] === 0){
      values[0] = 1
    }

    if(values[1] === 101){
      values[1] = 100
    }

    options[`${name}_min`] = values[0]
    options[`${name}_max`] = values[1]

    this.setState({
      configuration: {...this.state.configuration, ...options}
    })
  }

  handleInputChangeCover = (evt, value) => {
    this.setState({
      avatarFile: evt.target.files[0]
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

  handleGooglePlacesInputChange = e => {
    this.setState({googlePlaces: {search: e.target.value, value: e.target.value}})
  }

  handleGooglePlacesSelectSuggest = (geocodedPrediction, originalPrediction) => {
    // console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
    this.setState(
      {
        googlePlaces: {search: "", value: originalPrediction.structured_formatting.main_text},
        user: {
                ...this.state.user,
                latitude: geocodedPrediction.geometry.location.lat(),
                longitude: geocodedPrediction.geometry.location.lng(),
                lolcation_name: originalPrediction.structured_formatting.main_text
              }
     }
    )
  }

  toggleRemoveModal = () => {
    this.setState({
      removeModal: !this.state.removeModal
    })
  }

  loadUser = (id) => {
    show(id)
      .then((json) => {
        this.setState({
          user: {
            ...json,
            birthday: json.birthday ? moment(json.birthday) : undefined,
          },
          configuration: json.configuration,
          googlePlaces: {...this.state.googlePlaces, value: json.lolcation_name}
        })
      }).catch((error) => {
        this.displayErrorMessage()
        console.log('error', error)
      })
  }

  isValidForm = () => {
    let blankMessage = 'não pode ficar em branco'
    let errors = {}
    let user = this.state.user
    let isValid = true

    if(!user.name || user.name.length === 0){
      isValid = false
      errors.name = blankMessage
    }

    if(!user.birthday || user.birthday.length === 0){
      isValid = false
      errors.birthday = blankMessage
    }

    if(!user.latitude || user.latitude.length === 0){
      isValid = false
      errors.latitude = blankMessage
    }

    if(!user.longitude || user.longitude.length === 0){
      isValid = false
      errors.longitude = blankMessage
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

  updateUserCover = (user) => {
    this.coverInput.value = "";

    this.setState({
      user: {
        ...this.state.user,
        avatar: user.avatar,
      },
      mode: 'edit',
      avatarFile: undefined
    })
  }

  createUser = (params) => {
    create(params)
      .then((json) => {
        this.props.history.replace({pathname: `/usuarios/${json.id}`})

        this.displaySuccessMessage('Criado com Sucesso.')

        this.updateUserCover(json)

        this.toggleFetching()
      }).catch((error) => {
        this.displayErrorMessage()

        this.toggleFetching()

        console.log('error...', error)
      })
  }

  updateUser = (params) => {
    update(this.state.user.id, params)
      .then((json) => {
        this.displaySuccessMessage('Atualizado com Sucesso.')

        this.updateUserCover(json)

        this.toggleFetching()
      }).catch((error) => {
        this.displayErrorMessage()

        this.toggleFetching()

        console.log('error...', error)
      })
  }

  handleRemove = () => {
    destroy(this.state.user.id)
      .then((json) => {
        this.toggleIsRemoving()

        this.props.history.push('/users')
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
        this.createUser(params)
      }else{
        this.updateUser(params)
      }
    }
  }

  buildFormData = () => {
    const data = new FormData()

    // user
    data.append('user[name]'          , this.state.user.name)
    data.append('user[birthday]'      , this.state.user.birthday)
    data.append('user[interest]'      , this.state.user.interest)
    data.append('user[profession]'    , this.state.user.profession || '')
    data.append('user[gender]'        , this.state.user.gender)
    data.append('user[relationship]'  , this.state.user.relationship)
    data.append('user[sign]'          , this.state.user.sign)
    data.append('user[status]'        , this.state.user.status)
    data.append('user[instagram]'     , this.state.user.instagram || '')
    data.append('user[latitude]'      , this.state.user.latitude)
    data.append('user[longitude]'     , this.state.user.longitude)
    data.append('user[lolcation_name]', this.state.user.lolcation_name || '')
    data.append('user[about]'         , this.state.user.about || '')

    // configuration
    data.append(`user[configurations_attributes][][id]`               , this.state.configuration.id)
    data.append(`user[configurations_attributes][][location_name]`    , this.state.configuration.location_name)
    data.append(`user[configurations_attributes][][match_active]`     , this.state.configuration.match_active)
    data.append(`user[configurations_attributes][][interest_gender]`  , this.state.configuration.interest_gender)
    data.append(`user[configurations_attributes][][distance_range]`   , this.state.configuration.distance_range)
    data.append(`user[configurations_attributes][][age_min]`          , this.state.configuration.age_min)
    data.append(`user[configurations_attributes][][age_max]`          , this.state.configuration.age_max)
    data.append(`user[configurations_attributes][][single]`           , this.state.configuration.single)
    data.append(`user[configurations_attributes][][single_points_min]`, this.state.configuration.single_points_min)
    data.append(`user[configurations_attributes][][single_points_max]`, this.state.configuration.single_points_max)
    data.append(`user[configurations_attributes][][rolled]`           , this.state.configuration.rolled)
    data.append(`user[configurations_attributes][][rolled_points_min]`, this.state.configuration.rolled_points_min)
    data.append(`user[configurations_attributes][][rolled_points_max]`, this.state.configuration.rolled_points_max)
    data.append(`user[configurations_attributes][][engaged]`          , this.state.configuration.engaged)
    data.append(`user[configurations_attributes][][observer]`         , this.state.configuration.observer)

   // avatar
    if(this.state.avatarFile){
      data.append('user[avatar]', this.state.avatarFile)
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
    if(!this.state.user || !this.state.user.avatar ){ return null }

    return(
      <img src={this.state.user.avatar.thumb.url} className="img-thumbnail mt-3" />
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
        <form onSubmit={this.handleSubmit}>
          <Row>
            <UserCardForm
              user={this.state.user}
              mode={this.state.mode}
              toggleRemoveModal={this.toggleRemoveModal}
              isRemoving={this.state.isRemoving}
              renderErrorMessageFor={this.renderErrorMessageFor}
              isValidField={this.isValidField}
              handleDatePickerChange={this.handleDatePickerChange}
              isFetching={this.state.isFetching}
              renderCoverImage={this.renderCoverImage}
              handleInputChangeCover={this.handleInputChangeCover}
              handleInputChange={this.handleInputChange}
              setCoverInput={this.handleSetCoverInput}
              googlePlaces={this.state.googlePlaces}
              onGooglePlacesInputChange={this.handleGooglePlacesInputChange}
              onGooglePlacesSelectSuggest={this.handleGooglePlacesSelectSuggest}
            />
            <UserConfigurationForm
              user={this.state.user}
              configuration={this.state.configuration}
              mode={this.state.mode}
              toggleRemoveModal={this.toggleRemoveModal}
              isRemoving={this.state.isRemoving}
              renderErrorMessageFor={this.renderErrorMessageFor}
              isValidField={this.isValidField}
              handleDatePickerChange={this.handleDatePickerChange}
              isFetching={this.state.isFetching}
              renderCoverImage={this.renderCoverImage}
              handleInputChangeCover={this.handleInputChangeCover}
              handleInputChange={this.handleInputChange}
              handleInputConfigurationChange={this.handleInputConfigurationChange}
              handleInputConfigurationSliderChange={this.handleInputConfigurationSliderChange}
              handleInputConfigurationRangeChange={this.handleInputConfigurationRangeChange}
              setCoverInput={this.handleSetCoverInput}
            />
          </Row>
        </form>
        <ToastContainer autoClose={3000} />
      </div>
    )
  }
}

export default Form;
