import constants from '../config/constants';

export function signIn(params){
  const url = `${constants.api.path}/api/v1/admin/auth/sign_in`;

  return fetch(url,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: params
  }).then((res) => res);
}

export function signOut(headers){
  const url = `${constants.api.path}/api/v1/admin/auth/sign_out`;

  return fetch(url,{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'uid': headers.uid,
      'client': headers.client,
      'access-token': headers.accessToken,
      'expiry': headers.expiry
    }
  }).then((res) => res);
}

export function validateToken(headers){
  const url = `${constants.api.path}/api/v1/admin/auth/validate_token`;

  return fetch(url,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'uid': headers.uid,
      'client': headers.client,
      'access-token': headers.accessToken,
      'expiry': headers.expiry
    }
  }).then((res) => res);
}
