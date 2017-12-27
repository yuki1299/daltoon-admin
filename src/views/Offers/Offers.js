import React, { Component } from 'react';
import OffersHeader from './OffersHeader';
import OffersList from './OffersList';
import {
  Row,
  Col,
  Card,
} from 'reactstrap';

class Offers extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <OffersHeader/>
              <OffersList/>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Offers;
