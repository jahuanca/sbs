const r=require('../services/request')
const rutas=require('./../rutas')

module.exports={
    llenarSBS,
}

async function llenarSBS(){

    let headers={
        'Authorization': 'Bearer '+rutas.token,
        'Accept': 'application/json '
    };

    let headersODATA={
        'X-CSRF-Token': 'Fetch',
        'Authorization': 'Basic bnNvc2E6TmVzdG9yLjIwMjI=',
    }
    
    try {
        let resultODATA=await r.get(rutas.rutaODATA, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Éxito al consultar el TOKEN.');
            headersODATA['x-csrf-token']=resultODATA.response.headers['x-csrf-token']; 
            headersODATA['cookie']=resultODATA.response.headers['set-cookie']; 

            let resultSBS=await r.get(rutas.rutaSBS, headers);
            if(resultSBS.response.statusCode>= 200 && resultSBS.response.statusCode <= 299){
                console.log('Éxito al consultar los datos.');
                let resultPOST=await r.post(rutas.rutaODATA, resultSBS.body, headersODATA);
                if(resultPOST.response.statusCode>= 200 && resultPOST.response.statusCode <= 299){
                    console.log('Éxito al enviar los datos.');
                    console.log(resultPOST.body);
                }else{
                    console.log('Hubo un error al enviar los datos.');    
                    return;
                }
            }else{
                console.log('Hubo un error al conectarse a SBS');
                return;
            }
        }else{
            console.log('Hubo un error al obtener el TOKEN')
            return;
        }
        console.log('terminado...   ')
                  
    } catch (error) {
        console.log('Error general '+error)
    }
}

function get(promise) {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
  }
