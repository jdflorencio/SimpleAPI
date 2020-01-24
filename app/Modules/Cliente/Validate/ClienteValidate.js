class Validation{
  boot(body) {

  }

  validate(date) {
  
  } 

}

let validation = new Validation()

module.exports = validation


var test= {nome: "João Diego"}

var funcoes = {
  min: function(paramConfig, value) 	{
    console.log(paramConfig)
    if(value.length >= paramConfig)
    {      
		  console.log("==>>>", 'maior')
    }
 },
  max: function(paramConfig, value){
  	if(value.length <= paramConfig){
      console.log('menor')
    }
  },
  required: function(paramConfig, value){ 
    if ()
  
  



  
  

}

var validate =  {
	nome: {
    min:1,
    max:10
  }
}

// var validate =  {
// 	nome: {
//     required: true,
//     min:1,
//     max: 10,
//     rex: '/[:alnum:]/',
//     type: '',
//     isUndefined: false,
//     isNull: false,    
//   }
// }

fields = Object.keys(validate)

fields.map( field => {
  console.log(field)
  
  console.log(test[field])  
//   console.warn(validate[field])
  let attributeArray = Object.keys(validate[field])
  attributeArray.map((method) => {
    console.log('xxxx', method, validate[field][attributeArray])
		funcoes[method](  validate[field][method], test[field] )
	}
                     
                    )
 console.log(attributeArray)
  
  