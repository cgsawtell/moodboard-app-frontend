import {post} from 'axios';

async function login(username,password){
  try {
    const loginRequest = await post('api/login',{username,password})
    if(loginRequest.status === 200){
      return true
    }
  } catch (error) {
    return false    
  }
}

function isLoggedIn(){
  const decodedCookie = decodeURIComponent(document.cookie)
  console.log('decodedCookie',decodedCookie);
}

export {login,isLoggedIn}