import React, {Component} from 'react';
import { Badge } from 'reactstrap';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/br';

const UserItem = (props) => {
  return (
    <tr>
      <td className="text-center">
        <div className="avatar">
          <img src={props.user.avatar.url} className="img-avatar" alt={props.user.email}/>
          <span className={`avatar-status badge-${props.user.status === 'online' ? 'success' : 'danger'}`}></span>
        </div>
      </td>
      <td><Link to={`/usuarios/${props.user.id}`}>{props.user.name}</Link></td>
      <td>{props.user.sign_to_human}</td>
      <td>{props.user.relationship_to_human}</td>
    </tr>
  )
}

export default UserItem
