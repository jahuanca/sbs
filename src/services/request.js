const request = require('request')

async function get(url, headers) {
  return new Promise((resolve, reject) => {
    request.get(url, {
      json: true,
      headers: headers

    }, (error, response, body) => {
      if (error) return reject(error)
      return resolve({body: body, response: response })
    })
  })
}

/*async function post (url, data, headers) {
  return new Promise((resolve, reject) => {
    request({ url, method: 'POST', data },{
      headers: headers
    }, (error, response, body) => {
      if (error) return reject(error)

      return resolve({ body, response })
    })
  })
}*/

async function post(url, form, headers) {
  return new Promise((resolve, reject) => {
    request.post({
      url,
      body:JSON.stringify(form),
      headers: headers
    }, (error, response, b) => {
      if (error) return reject(error)

      return resolve({body: b, response: response })
    })
  })
}

module.exports = {
  get,
  post
}