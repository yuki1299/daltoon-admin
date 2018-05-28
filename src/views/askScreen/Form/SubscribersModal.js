import React, { Component } from 'react';

import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
} from 'reactstrap';
import ContentLoader from 'react-content-loader'

class SubscribersModal extends Component {
  renderTable = () => {
    return(
      <Table responsive striped>
        <thead>
        <tr>
          <th>Avatar</th>
          <th>Nome</th>
          <th>Facebook</th>
          <th>Instagram</th>
        </tr>
        </thead>
        <tbody>
          {
            this.props.isFetching
              ? this.renderContentLoader()
              : this.props.users.map((user) => this.renderTableItem(user))
          }
          {
            this.props.users.length === 0
            ? this.renderNoTableContent()
            : null
          }
        </tbody>
      </Table>
    )
  }

  renderTableItem = (user) => {
    return(
      <tr key={user.id}>
        <td className={'text-center'}>
          <img className={'w-50 img-avatar'} src={user.avatar.thumb.url} />
        </td>
        <td className={'text-center'}>{user.name}</td>
        <td className={'text-center'}>
          <a href={`http://www.facebook.com.br/${user.uid}`} target="_blank"> <i className="fa fa-facebook-official fa-lg mt-4"></i></a>
        </td>
        <td className={'text-center'}>
          <a href={`http://www.instagram.com/${user.instagram}`} target="_blank"> <i className="fa fa-instagram fa-lg mt-4"></i></a>
        </td>
      </tr>
    )
  }

  renderContentLoader = () => {
    return(
      <tr>
        <td colSpan="4">
          <ContentLoader type="bullet-list"/>
        </td>
      </tr>
    )
  }

  renderNoTableContent = () => {
    return(
      <tr>
        <td colSpan="4">
          <p className="text-center mb-0">
            Nenhum participante encontrado
          </p>
        </td>
      </tr>
    )
  }

  renderPagination = () => {
    return(
      <Pagination>
        {
          this.props.current_page > 1
          ? <PaginationItem><PaginationLink previous onClick={(evt) => this.props.onChangePage(evt, this.props.current_page - 1)}></PaginationLink></PaginationItem>
          : null
        }
        {Array.from(Array(this.props.totalPages).keys()).map((index) => {
          return(
            <PaginationItem key={index} active={this.props.current_page === (index+1)}>
              <PaginationLink onClick={(evt) => this.props.onChangePage(evt, index+1)}>{index+1}</PaginationLink>
            </PaginationItem>
          )
        })}
        {
          this.props.current_page !== this.props.totalPages
          ? <PaginationItem><PaginationLink next onClick={(evt) => this.props.onChangePage(evt, this.props.current_page + 1)}></PaginationLink></PaginationItem>
          : null
        }
      </Pagination>
    )
  }

  render(){
    return(
      <Modal isOpen={this.props.modal} toggle={this.props.toggleModal}className={'modal-primary'}>
        <ModalHeader toggle={this.toggleModal}>Participantes</ModalHeader>
        <ModalBody>
          {this.renderTable()}
          {
            this.props.totalPages > 1
            ? this.renderPagination()
            : null
          }
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggleModal}>Fechar</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default SubscribersModal
