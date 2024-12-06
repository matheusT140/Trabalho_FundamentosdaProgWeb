let botaoTabuada = document.getElementById('tabuada')
let inputNumber = document.getElementById('numero')
let select_Result = document.getElementById('select')
botaoTabuada.addEventListener("click", function(){multiply(inputNumber.value, select_Result)})
function multiply (numero, result){
    let str = ''
    if (numero.length == 0) {
        window.alert('[ERRO] - Nenhum valor foi digitado. Tente novamente.')
    } else {
        for (let i = 0; i <= 10; i++){            
            str += `<option value="${i}">${(numero)} x ${i} = ${parseInt(numero)*i} </option>`
            /* ou por createElement : let item = document.createElement('option') 
                                      item.text = `${(numero)} x ${i} = ${parseInt(numero)*i}`
                                      item.value = `${i}`
                                      result.appendChild(item)  
            */
        }
        result.innerHTML = str
    }    
}
/*sempre pegar o html element somente. Não pegar seus valores diretamente,
pois não da certo jogar tudo direto para uma variavel*/