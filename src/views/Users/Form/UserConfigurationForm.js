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
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const UserConfigurationForm = (props) => {
  console.log(props.googlePlaces)
  return (
    <Col lg="6" sm="6">
      <Card>
        <CardHeader className={"d-flex justify-content-between align-items-center"}>
          <strong>Configuração Ativa</strong>
        </CardHeader>
        <CardBody>
          <Row>
            {/*LOCATION NAME*/}
            <Col lg="12">
              <FormGroup>
                <Label htmlFor="name">Nome da Página {props.renderErrorMessageFor('location_name')}</Label>
                <Input className={`${props.isValidField('location_name') ? '' : 'is-invalid'}`} name="location_name" type="text" id="user-name" placeholder="Nome da Página" onChange={props.handleInputConfigurationChange} value={props.configuration.location_name || ''}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/*MATCH | INTEREST | INTEREST GENDER*/}
            <Col lg="2">
              <FormGroup>
                <Label htmlFor="vat">Match</Label>
                <br />
                <Label className="switch switch-icon switch-pill switch-danger">
                  <Input type="checkbox" className="switch-input" name="match_active" checked={props.configuration.match_active} onChange={props.handleInputConfigurationChange}/>
                  <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                  <span className="switch-handle"></span>
                </Label>
              </FormGroup>
            </Col>

            <Col lg="5">
              <FormGroup>
                <Label htmlFor="vat">Interesse por Match{props.renderErrorMessageFor('interest')}</Label>
                <Input type="select" name="interest" id="select" onChange={props.handleInputChange} value={props.user.interest || 'neutral'}>
                  <option value="male">Homem</option>
                  <option value="female">Mulher</option>
                  <option value="neutral">Indefinido</option>
                </Input>
              </FormGroup>
            </Col>

            <Col lg="5">
              <FormGroup>
                <Label htmlFor="vat">Interesse por Amigos{props.renderErrorMessageFor('interest_gender')}</Label>
                <Input type="select" name="interest_gender" id="select" onChange={props.handleInputConfigurationChange} value={props.configuration.interest_gender || 'neutral'}>
                  <option value="male">Homem</option>
                  <option value="female">Mulher</option>
                  <option value="neutral">Indefinido</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/*DISTANCE_RANGE | AGE_MIN | AGE_MAX*/}
            <Col lg="7">
              <FormGroup>
                <Label htmlFor="name">Distancia {props.configuration.distance_range || 20} km {props.renderErrorMessageFor('distance_range')}</Label>
                <Slider min={1} max={100} value={props.configuration.distance_range || 20} onChange={(value) => props.handleInputConfigurationSliderChange('distance_range', value)}/>
              </FormGroup>
            </Col>

            <Col lg="5">
              <FormGroup>
                <Label htmlFor="name">Idade {props.configuration.age_min} à {props.configuration.age_max}</Label>
                <Range pushable={true} value={[props.configuration.age_min || 18, props.configuration.age_max || 50]} onChange={(values) => props.handleInputConfigurationRangeChange('age', values)} min={18} max={50}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/*SINGLE | SINGLE_POINTS_MIN |  SINGLE_POINTS_MAX*/}
            <Col lg="2">
              <FormGroup>
                <Label htmlFor="vat">Solteiras</Label>
                <br />
                <Label className="switch switch-icon switch-pill switch-danger">
                  <Input type="checkbox" className="switch-input" name="single" checked={props.configuration.single} onChange={props.handleInputConfigurationChange}/>
                  <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                  <span className="switch-handle"></span>
                </Label>
              </FormGroup>
            </Col>

            <Col lg="5">
              <FormGroup>
                <Label htmlFor="name">Pontos {props.configuration.single_points_min} à {props.configuration.single_points_max}</Label>
                <Range pushable={true} value={[props.configuration.single_points_min || 1, props.configuration.single_points_max || 100]} onChange={(values) => props.handleInputConfigurationRangeChange('single_points', values)} min={0} max={100} step={50}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/*ROLLED | ROLLED_POINTS_MIN |  ROLLED_POINTS_MAX |*/}
            <Col lg="2">
              <FormGroup>
                <Label htmlFor="vat">Enroladas</Label>
                <br />
                <Label className="switch switch-icon switch-pill switch-danger">
                  <Input type="checkbox" className="switch-input" name="rolled" checked={props.configuration.rolled} onChange={props.handleInputConfigurationChange}/>
                  <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                  <span className="switch-handle"></span>
                </Label>
              </FormGroup>
            </Col>

            <Col lg="5">
              <FormGroup>
                <Label htmlFor="name">Pontos {props.configuration.rolled_points_min} à {props.configuration.rolled_points_max}</Label>
                <Range pushable={true} value={[props.configuration.rolled_points_min || 1, props.configuration.rolled_points_max || 100]} onChange={(values) => props.handleInputConfigurationRangeChange('rolled_points', values)} min={0} max={100} step={50}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/*ENGAGED | OBSERVER |*/}
            <Col lg="2">
              <FormGroup>
                <Label htmlFor="vat">Obervadoras</Label>
                <br />
                <Label className="switch switch-icon switch-pill switch-danger">
                  <Input type="checkbox" className="switch-input" name="observer" checked={props.configuration.observer} onChange={props.handleInputConfigurationChange}/>
                  <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                  <span className="switch-handle"></span>
                </Label>
              </FormGroup>
            </Col>
            <Col lg="2">
              <FormGroup>
                <Label htmlFor="vat">Casadas</Label>
                <br />
                <Label className="switch switch-icon switch-pill switch-danger">
                  <Input type="checkbox" className="switch-input" name="engaged" checked={props.configuration.engaged} onChange={props.handleInputConfigurationChange}/>
                  <span className="switch-label" data-on={'\uf00c'} data-off={'\uf00d'}></span>
                  <span className="switch-handle"></span>
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default UserConfigurationForm;
