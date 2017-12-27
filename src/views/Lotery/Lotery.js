import React, { Component } from 'react';
import LoteryHeader from './LoteryHeader';
import LoteryList from './LoteryList';
import {
  Row,
  Col,
  Card,
} from 'reactstrap';

class Tables extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <LoteryHeader/>
              <LoteryList/>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Tables;
