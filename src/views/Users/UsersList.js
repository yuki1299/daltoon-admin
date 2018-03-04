import React, {Component} from 'react';
import {
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupButton,
  Button,
  Input,
  Badge,
  CardBody,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import {Link} from 'react-router-dom';
import ContentLoader from 'react-content-loader'
import UserItem from './UserItem'

const UsersList = (props) => {
  const renderContentLoader = () => {
    return(
      <tr>
        <td colSpan="5">
          <ContentLoader type="bullet-list"/>
        </td>
      </tr>
    )
  }

  const renderNoTableContent = () => {
    return(
      <tr>
        <td colSpan="5">
          <p className="text-center mb-0">
            Nenhum registro encontrado
          </p>
        </td>
      </tr>
    )
  }

  const renderPagination = () => {
    return(
      <nav>
        <Pagination>
          {
            props.current_page > 1
            ? <PaginationItem><PaginationLink previous onClick={(evt) => props.onChangePage(evt, props.current_page - 1)}>Ant</PaginationLink></PaginationItem>
            : null
          }
          {Array.from(Array(props.totalPages).keys()).map((index) => {
            return(
              <PaginationItem key={index} active={props.current_page === (index+1)}>
                <PaginationLink onClick={(evt) => props.onChangePage(evt, index+1)}>{index+1}</PaginationLink>
              </PaginationItem>
            )
          })}
          {
            props.current_page !== props.totalPages
            ? <PaginationItem><PaginationLink next onClick={(evt) => props.onChangePage(evt, props.current_page + 1)}>Prox</PaginationLink></PaginationItem>
            : null
          }
        </Pagination>
      </nav>
    )
  }

  const renderContent = () => {
    return(
      <CardBody>
        <Row>
          <Col md="10">
            <div className="callout callout-bordered">
              <small className="text-muted">Total de Usuários</small><br/>
              <strong className="h4">{props.total}</strong>
            </div>
          </Col>
          <Col md="2" className="d-flex align-items-center justify-content-end">
            <Link to={'usuarios/adicionar'}>
              <Button color="primary">Adicionar</Button>
            </Link>
          </Col>
        </Row>
        <Form action="" method="post" className="form-horizontal mt-4 mb-5">
          <FormGroup row>
            <Col md="12">
              <InputGroup>
                <InputGroupButton>
                  <Button color="primary"><i className="fa fa-search"></i> Procurar</Button>
                </InputGroupButton>
                <Input type="text" id="input1-group2" name="input1-group2" placeholder="Buscar" onChange={props.onSearchChange} value={props.query}/>
              </InputGroup>
            </Col>
          </FormGroup>
        </Form>

        <Table hover bordered striped responsive size="lg">
          <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Signo</th>
            <th>Relacionamento</th>
          </tr>
          </thead>
          <tbody>
          {
            props.isFetching
              ? renderContentLoader()
              : props.list.map((user) => {return <UserItem key={user.id} user={user}/>})
          }
          {
            !props.isFetching && props.list.length === 0
            ? renderNoTableContent()
            : null
          }
          </tbody>
        </Table>
        {
          props.totalPages > 1
          ? renderPagination()
          : null
        }
      </CardBody>
    )
  }

  return (
    renderContent()
  );
};

export default UsersList;
