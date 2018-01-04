import { validateToken } from '../api/signIn';

export function storeCurrentUserCredentials(res){
  const credentials = {
    accessToken: res.headers.get('access-token'),
    client: res.headers.get('client'),
    uid: res.headers.get('uid'),
    expiry: res.headers.get('expiry')
  }
  localStorage.setItem('currentUserCredentials', JSON.stringify(credentials));
}

export function removeCurrentUserCredentials(){
  localStorage.removeItem('currentUserCredentials');
}

export function storeCurrentUser(data){
  localStorage.setItem('currentUser', JSON.stringify(data));
}

export function getCurrentUserCredentials(){
  let result = localStorage.getItem('currentUserCredentials')

  return JSON.parse(result)
}

export function getCurrentUserStored(){
  let result = localStorage.getItem('currentUser')

  return JSON.parse(result)
}

export function isSignedIn(){
  return new Promise((resolve, reject) => {
    let credentials = getCurrentUserCredentials()

    if(credentials){
      validateToken(credentials)
        .then((res) => {
          if(res.ok){
            resolve(res.json())
          }else{
            reject(res)
          }
        })
    }else{
     reject()
    }
  });
}
