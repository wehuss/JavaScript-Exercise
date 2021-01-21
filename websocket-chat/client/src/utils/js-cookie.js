import cookie from 'js-cookie'

export function setUser (data) {
  // const keys = Object.keys(data)
  for (const k in data) {
    cookie.set(k, data[k], { expires: 1 })
  }
}
