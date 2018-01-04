import React, {Component} from 'react';
import { Badge } from 'reactstrap';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/br';

const OfferItem = (props) => {
  return (
    <tr>
      <td><Link to={`/ofertas/${props.offer.id}`}>{props.offer.title}</Link></td>
      <td><Moment parse="YYYY-MM-DD" format="DD/MM/YYYY">{props.offer.started_at}</Moment></td>
      <td>
        {
          props.offer.finished_at
          ? <Moment parse="YYYY-MM-DD" format="DD/MM/YYYY">{props.offer.finished_at}</Moment>
          : 'Sem data definida'
        }
      </td>
      <td>{props.offer.places}</td>
      <td>
        <Badge color="success">Ativo</Badge>
      </td>
    </tr>
  )
}

export default OfferItem
