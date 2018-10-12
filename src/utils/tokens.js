import Vue from 'vue'

export function parseJWT(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

export function getToken(vueAuth) {
  return vueAuth.getToken()
}

export function currentUserId(vueAuth) {
  let token = getToken(vueAuth)
  let userId = parseJWT(token).sub
  return userId
}
