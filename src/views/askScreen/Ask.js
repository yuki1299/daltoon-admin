import React, { Component } from 'react';
import LoteryHeader from './LoteryHeader';
import LoteryList from './LoteryList';
import {
  Row,
  Col,
  Card,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { index } from '../../api/lotery'

class Tables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      raffles: [],
      isFetching: false,
      total: 0,
      total_pages: 0,
      current_page: 1,
      query: '',
    };
  }

  componentDidMount(){
    this.loadRaffles()
  }

  loadRaffles = (page=1, query='') => {
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
          raffles: json.raffles,
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

    this.loadRaffles(page, this.state.query)
  }

  handleSearchChange = (evt) => {
    let query = evt.target.value

    this.setState({query})

    if(query.length === 0){
      this.loadRaffles(this.state.current_page)
    }

    if(query.length < 3){ return false }

    this.loadRaffles(this.state.current_page, query)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <LoteryHeader/>
              <LoteryList
                list={this.state.raffles}
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

export default Tables;
