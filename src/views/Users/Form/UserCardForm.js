import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {Link} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import GoogleMapLoader from "react-google-maps-loader"
import GooglePlacesSuggest from "react-google-places-suggest"
const MY_API_KEY = "AIzaSyDCyH08dVEqstJJmZjC65OPKSSPnD32Ohk"


const UserCardForm = (props) => {
  return (
    <Col lg="6" sm="6">
      <Card>
        <CardHeader className={"d-flex justify-content-between align-items-center"}>
          <strong>Usuário</strong>

          {
            props.mode === 'create'
            ? null
            : <Button color="primary" onClick={props.toggleRemoveModal} className={'mt-0'} disabled={props.isRemoving}>{props.isRemoving ? '...' : 'Remover'}</Button>
          }
        </CardHeader>
        <CardBody>
          {/*NOME | NASCIMENT | PROFISSAO*/}
          <Row>
            <Col lg="4">
              <FormGroup>
                <Label htmlFor="name">Nome {props.renderErrorMessageFor('name')}</Label>
                <Input className={`${props.isValidField('name') ? '' : 'is-invalid'}`} name="name" type="text" id="user-name" placeholder="Nome do usuario" onChange={props.handleInputChange} value={props.user.name || ''}/>
              </FormGroup>
            </Col>

            <Col lg="4">
              <FormGroup>
                <Label htmlFor="vat">Data de Nascimento {props.renderErrorMessageFor('birthday')}</Label>
                <DatePicker
                    className={`${props.isValidField('birthday') ? '' : 'is-invalid'} form-control`}
                    selected={props.user.birthday}
                    name={"birthday"}
                    locale={'pt'}
                    onChange={(date) => props.handleDatePickerChange(date, 'birthday')}
                />
              </FormGroup>
            </Col>

            <Col lg="4">
              <FormGroup>
                <Label htmlFor="name">Profissão {props.renderErrorMessageFor('profession')}</Label>
                <Input className={`${props.isValidField('profession') ? '' : 'is-invalid'}`} name="profession" type="text" id="user-profession" placeholder="Profissão" onChange={props.handleInputChange} value={props.user.profession || ''}/>
              </FormGroup>
            </Col>
          </Row>

          {/*SEXO | RELACIONAMENTO | SIGNO*/}
          <Row>
            <Col lg="4">
              <FormGroup>
                <Label htmlFor="vat">Sexo {props.renderErrorMessageFor('gender')}</Label>
                <Input type="select" name="gender" id="select" onChange={props.handleInputChange} value={props.user.gender || 'neutral'}>
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                  <option value="neutral">Indefinido</option>
                </Input>
              </FormGroup>
            </Col>

            <Col lg="4">
              <FormGroup>
                <Label htmlFor="vat">Relacionamento {props.renderErrorMessageFor('relationship')}</Label>
                <Input type="select" name="relationship" id="select" onChange={props.handleInputChange} value={props.user.relationship || 'single'}>
                  <option value="single">Solteiro</option>
                  <option value="rolled">Enrolado</option>
                  <option value="observer">Observador</option>
                  <option value="engaged">Casado</option>
                </Input>
              </FormGroup>
            </Col>

            <Col lg="4">
              <FormGroup>
                <Label htmlFor="vat">Signo {props.renderErrorMessageFor('sign')}</Label>
                <Input type="select" name="sign" id="select" onChange={props.handleInputChange} value={props.user.sign || 'not_show'}>
                  <option value="aries">Aries</option>
                  <option value="taurus">Touro</option>
                  <option value="gemini">Gêmeos</option>
                  <option value="cancer">Cancêr</option>
                  <option value="leo">Leão</option>
                  <option value="virgo">Virgem</option>
                  <option value="libra">Libra</option>
                  <option value="scorpion">Escopião</option>
                  <option value="sagittarius">Sargitário</option>
                  <option value="capricornius">Capricórnio</option>
                  <option value="aquarius">Aquário</option>
                  <option value="pisces">Peixes</option>
                  <option value="not_show">Não Definido</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

          {/*STATUS | INTAGRAM*/}
          <Row>
            <Col lg="4">
              <FormGroup>
                <Label htmlFor="vat">Status {props.renderErrorMessageFor('status')}</Label>
                <Input type="select" name="status" id="select" onChange={props.handleInputChange} value={props.user.status || 'online'}>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="invisible">Invisível</option>
                </Input>
              </FormGroup>
            </Col>

            <Col lg="8">
              <FormGroup>
                <Label htmlFor="instagram">Intagram {props.renderErrorMessageFor('instagram')}</Label>
                <Input className={`${props.isValidField('instagram') ? '' : 'is-invalid'}`} name="instagram" type="text" id="user-instagram" placeholder="Conta do Instagram" onChange={props.handleInputChange} value={props.user.instagram || ''}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/*LOCATION*/}
            <Col lg="4">
              <GoogleMapLoader
                params={{
                  key: MY_API_KEY,
                  libraries: "places,geocode",
                }}
                render={googleMaps =>
                  googleMaps && (
                    <GooglePlacesSuggest
                      googleMaps={googleMaps}
                      autocompletionRequest={{
                          input: props.googlePlaces.search,
                          // Optional options
                          // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                      }}
                      // Optional props
                      onSelectSuggest={props.onGooglePlacesSelectSuggest}
                      textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                      customRender={prediction => (
                          <div className="customWrapper">
                              {prediction
                                  ? prediction.description
                                  : "My custom no results text"}
                          </div>
                      )}
                    >
                      <FormGroup>
                        <Label htmlFor="vat">Localização do Usuário</Label>
                        <input
                            className={"form-control"}
                            type="text"
                            value={props.googlePlaces.value}
                            placeholder="Search a location"
                            onChange={props.onGooglePlacesInputChange}
                        />
                      </FormGroup>
                    </GooglePlacesSuggest>
                  )
                }
              />
            </Col>

            <Col lg="4">
              <FormGroup>
                <Label htmlFor="name">Latitude {props.renderErrorMessageFor('latitude')}</Label>
                <Input className={`${props.isValidField('latitude') ? '' : 'is-invalid'}`} name="latitude" type="text" id="user-latitude" placeholder="Latitude" onChange={props.handleInputChange} value={props.user.latitude || ''}/>
              </FormGroup>
            </Col>

            <Col lg="4">
              <FormGroup>
                <Label htmlFor="name">Longitude {props.renderErrorMessageFor('longitude')}</Label>
                <Input className={`${props.isValidField('longitude') ? '' : 'is-invalid'}`} name="longitude" type="text" id="user-longitude" placeholder="Longitude" onChange={props.handleInputChange} value={props.user.longitude || ''}/>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <div className="form-actions d-flex align-items-center justify-content-end">
            <Button className="mr-3" type="submit" color="primary" disabled={props.isFetching}>{props.isFetching ? '...' : 'Salvar'}</Button>
            <Link to={'/usuarios'}>
              <Button color="secondary">Voltar</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default UserCardForm;
