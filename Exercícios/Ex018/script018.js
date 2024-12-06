let buttonAdd = document.getElementById('add')
let buttonFinish = document.getElementById('finish')
let n = document.getElementById('input')
let d = document.getElementById('data')
let divResult = document.getElementById('finishResults')
let array = []
let i = 0
buttonAdd.addEventListener("click", function(){add(n.value, d)})
buttonFinish.addEventListener("click", function(){showAll(divResult, array)}) 
function add (number, data){    
    if (number.length == 0) {
        window.alert('[ERRO] - Nenhum valor foi digitado. Tente novamente.')
    } else if (parseInt(number) < 1 || parseInt(number)> 100) {
        window.alert(`O número digitado: ${number}, está fora da margem permitida.`)
    }
    else {
        array[i] = parseInt(number)
        i++                             
        let item = document.createElement('option') 
        item.text = `Valor ${number} adicionado.`         
        data.appendChild(item)
        array.sort(function (a, b){
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        })        
    }    
}
function showAll (result, a){
    result.innerHTML = ''    
    if (a.length == 0){
        window.alert('Nenhum valor adicionado ainda.')
    } else {        
        result.innerHTML += `<p>Ao todo temos ${a.length} números cadastrados.</p>`
        result.innerHTML += `<p>O maior valor informado foi ${a[a.length-1]}.</p>`
        result.innerHTML += `<p>O menor valor informado foi ${a[0]}.</p>`
        let media = 0
        for (let position in a){            
            media += a[position]
            console.log( typeof(a[position]))                                               
        }
        result.innerHTML += `<p>Somando todos os valores, temos ${media}.</p>`        
        media = media/(a.length)
        result.innerHTML += `<p>A média dos valores é ${media}.</p>`        
    }
}
