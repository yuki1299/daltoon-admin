import React, { Component } from 'react';
import OffersHeader from './OffersHeader';
import OffersList from './OffersList';
import {
  Row,
  Col,
  Card,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { index } from '../../api/offer'

class Offers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offers: [],
      isFetching: false,
      total: 0,
      total_pages: 0,
      current_page: 1,
      query: '',
    };
  }

  componentDidMount(){
    this.loadOffers()
  }

  loadOffers = (page=1, query='') => {
    this.toggleFetching()

    let params = []

    if(page > 1){
      params.push(`page=${page}`)
    }

    if(query !== ''){
      params.push(`query=${query}`)
    }

    index(params)
      .then((json) => {
        this.setState({
          offers: json.offers,
          total: json.total,
          total_pages: json.total_pages,
          current_page: json.current_page,
        })

        this.toggleFetching()
      }).catch((error) => {
        console.log(error)

        this.toggleFetching()
      })
  }

  toggleFetching = () => {
    this.setState({
      isFetching: !this.state.isFetching
    })
  }

  handleChangePage = (evt, page) => {
    if(evt){
      evt.preventDefault()
    }

    this.loadOffers(page, this.state.query)
  }

  handleSearchChange = (evt) => {
    let query = evt.target.value

    this.setState({query})

    if(query.length === 0){
      this.loadOffers(this.state.current_page)
    }

    if(query.length < 3){ return false }

    this.loadOffers(this.state.current_page, query)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <OffersHeader/>
              <OffersList
                list={this.state.offers}
                isFetching={this.state.isFetching}
                total={this.state.total}
                totalPages={this.state.total_pages}
                current_page={this.state.current_page}
                onChangePage={this.handleChangePage}
                onSearchChange={this.handleSearchChange}
                query={this.state.query}
              />
            </Card>
          </Col>
        </Row>
        <ToastContainer autoClose={3000} />
      </div>
    )
  }
}

export default Offers;
