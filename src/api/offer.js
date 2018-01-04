import constants from '../config/constants';
import { getCurrentUserCredentials } from '../services/AuthService'

export function index(params=[]){
  let urlParams = `?${params.join('&')}`
  let headers = getCurrentUserCredentials()
  const url   = `${constants.api.path}/api/v1/admin/offers${urlParams}`;

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
  }).then((res) => {
    if(res.status === 200 || res.status === 201){
      return res.json()
    }else{
      return Promise.reject(res)
    }
  })
}

export function create(options={}){
  let headers = getCurrentUserCredentials()
  const url   = `${constants.api.path}/api/v1/admin/offers`;

  return fetch(url,{
    method: 'POST',
    headers: {
      'uid': headers.uid,
      'client': headers.client,
      'access-token': headers.accessToken,
      'expiry': headers.expiry
    },
    body: options
  }).then((res) => {
    if(res.status === 200 || res.status === 201){
      return res.json()
    }else{
      return Promise.reject(res)
    }
  })
}

export function update(id, options={}){
  let headers = getCurrentUserCredentials()
  const url   = `${constants.api.path}/api/v1/admin/offers/${id}`;

  return fetch(url,{
    method: 'PUT',
    headers: {
      'uid': headers.uid,
      'client': headers.client,
      'access-token': headers.accessToken,
      'expiry': headers.expiry
    },
    body: options
  }).then((res) => {
    if(res.status === 200 || res.status === 201){
      return res.json()
    }else{
      return Promise.reject(res)
    }
  })
}

export function destroy(id){
  let headers = getCurrentUserCredentials()
  const url   = `${constants.api.path}/api/v1/admin/offers/${id}`;

  return fetch(url,{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'uid': headers.uid,
      'client': headers.client,
      'access-token': headers.accessToken,
      'expiry': headers.expiry
    },
  }).then((res) => {
    if(res.status === 200 || res.status === 201){
      return res.json()
    }else{
      return Promise.reject(res)
    }
  })
}

export function show(id){
  let headers = getCurrentUserCredentials()
  const url   = `${constants.api.path}/api/v1/admin/offers/${id}`;

  return fetch(url,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'uid': headers.uid,
      'client': headers.client,
      'access-token': headers.accessToken,
      'expiry': headers.expiry
    },
  }).then((res) => {
    if(res.status === 200 || res.status === 201){
      return res.json()
    }else{
      return Promise.reject(res)
    }
  })
}
