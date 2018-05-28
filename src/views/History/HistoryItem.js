import React, {Component} from 'react';
import { Badge } from 'reactstrap';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/br';

const HistoryItem = (props) => {
  return (
    <tr>
      <td><Link to={`/sorteios/${props.raffle.id}`}>{props.raffle.title}</Link></td>
      <td><Moment parse="YYYY-MM-DD" format="DD/MM/YYYY">{props.raffle.raffle_at}</Moment></td>
      <td>{props.raffle.places}</td>
      <td>
        <Badge color="success">Ativo</Badge>
      </td>
    </tr>
  )
}

export default HistoryItem
