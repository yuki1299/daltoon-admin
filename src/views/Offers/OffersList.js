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

const OffersList = (props) => {
  return (
    <CardBody>
      <Row>
        <Col md="10">
          <div className="callout callout-bordered">
            <small className="text-muted">Total de Ofertas</small><br/>
            <strong className="h4">303</strong>
          </div>
        </Col>
        <Col md="2" className="d-flex align-items-center justify-content-end">
          <Link to={'ofertas/1'}>
            <Button color="primary">1</Button>
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
              <Input type="text" id="input1-group2" name="input1-group2" placeholder="Buscar"/>
            </InputGroup>
          </Col>
        </FormGroup>
      </Form>

      <Table hover bordered striped responsive size="lg">
        <thead>
        <tr>
          <th>Nome</th>
          <th>Data de Início</th>
          <th>Data de Término</th>
          <th>Locais</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><Link to={'ofertas/1'}>Dia da Pizza Grátis</Link></td>
          <td>01/01/2018</td>
          <td>22/01/2018</td>
          <td>Pizzaria do Edgar - Mooca</td>
          <td>
            <Badge color="success">Active</Badge>
          </td>
        </tr>
        <tr>
          <td><Link to={'ofertas/1'}>Pague 2 leve 1</Link></td>
          <td>20/01/2018</td>
          <td>22/01/2018</td>
          <td>Sorveteria do Edu - Mooca</td>
          <td>
            <Badge color="danger">Banned</Badge>
          </td>
        </tr>
        <tr>
          <td><Link to={'ofertas/1'}>Ganhe um pote de Nutella</Link></td>
          <td>01/01/2018</td>
          <td>02/01/2018</td>
          <td>Mercado Dia - Ipiranga</td>
          <td>
            <Badge color="secondary">Inactive</Badge>
          </td>
        </tr>
        <tr>
          <td><Link to={'ofertas/1'}>Cupom Premiado</Link></td>
          <td>30/01/2018</td>
          <td>03/02/2018</td>
          <td>WallMart - Bela Vista</td>
          <td>
            <Badge color="warning">Pending</Badge>
          </td>
        </tr>
        <tr>
          <td><Link to={'ofertas/1'}>Ingresso Grátis</Link></td>
          <td>31/02/2018</td>
          <td>03/03/2018</td>
          <td>Cinépolis - Mooca</td>
          <td>
            <Badge color="success">Active</Badge>
          </td>
        </tr>
        </tbody>
      </Table>
      <nav>
        <Pagination>
          <PaginationItem><PaginationLink previous href="#">Ant</PaginationLink></PaginationItem>
          <PaginationItem active>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink next href="#">Prox</PaginationLink></PaginationItem>
        </Pagination>
      </nav>
    </CardBody>
  );
};

export default OffersList;