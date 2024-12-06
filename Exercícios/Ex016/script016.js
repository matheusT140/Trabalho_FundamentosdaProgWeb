function contar () {
let start = parseInt(document.getElementById('start').value)
// o input tipo number aceita só numeros na escritura mas conta como string em seus dados 
let end = parseInt(document.getElementById('end').value) 
// ou Number(document.getElementById('end').value)
let step = parseInt(document.getElementById('step').value)
// ou Number(document.getElementById('step').value)
let result = document.getElementById('result')
    if (step <= 0) {
        window.alert('Para "Passo", somente valores positivos. Por favor, tente novamente.')
    } else if (isNaN(start) || isNaN(end)) { 
// ou (document.getElementById('start').value.length == 0 || document.getElementById('start').value.length == 0) 
        window.alert('Para "Início" ou "Fim", somente valores positivos. Por favor, tente novamente.')
    } else {
        result.innerText= ''
        if (start < end) { 
            let str = ''           
            for ( let c = start; c<= end; c+=step ) {
                if (c===start){
                    str += `${c} `
                }
                else {
                    str += `👉 ${c} `    
                }
            } 
            result.innerText += `${str}🏴`
 //no final do 'for' joga tudo para a tag do resultado e o emoji da bendeira indicando o fim                       
        } else {
            let str = '' 
            for ( let c = start; c>= end; c-=step ) {
                if (c===start){
                    str += `${c} `
                }
                else {
                    str += `👉 ${c} `    
                }
            } 
            result.innerText += `${str}🏴`
//no final do 'for' joga tudo para a tag do resultado e o emoji da bendeira indicando o fim            
        }        
    }
}