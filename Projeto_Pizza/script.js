let cart = []
let pizzaKey = 0
let contadorPizza = 1
const dqall = (element) => { // reduz a repetição de caracteres Do queryselector
    return document.querySelectorAll(element)
}
const dq = (element) => { // reduz a repetição de caracteres Do queryselector
    return document.querySelector(element)
}
pizzaJson.map((item, index)=>{      /* vai mapear o objeto em questão, repetindo a função para 
                                        cada item e index passado como parametro (7 vezes - 7 elementos)|
                                        Nesse caso pode ser substituido por um for ou forEach */
    let pizzaItem = dq('.models .pizza-item').cloneNode(true) /* clonenode pega o item e tudo
                                                                                    e todo seu conteúdo e faz uma cópia*/
    pizzaItem.setAttribute('pizza-key', index)
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `${item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}` 
    pizzaItem.querySelector('img').src = item.img    
    
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{ // primeiro parametro: tipo do evento; segundo parametro: o evento em si 'e'
        e.preventDefault()
        pizzaKey = Number(pizzaItem.getAttribute('pizza-key')) //pizza-key é um atributo com valor de string
        //a variavel pizzaKey recebe como valor a posição do elemento de pizzaJson aberto            
        contadorPizza = 1
        dq('.pizzaInfo--qt').innerHTML = contadorPizza        
        dq('.pizzaWindowArea').style.display = 'flex'
        dq('.pizzaInfo h1').innerHTML = pizzaJson[index].name
        dq('.pizzaInfo--desc').innerHTML = pizzaJson[index].description
        dq('.pizzaBig img').src = pizzaJson[index].img
        dq('.pizzaInfo--actualPrice').innerHTML = `${(pizzaJson[index].price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}` 
        dq('.pizzaInfo--size.selected').classList.remove('selected')
        dqall('.pizzaInfo--size').forEach((size, sizeIndex)=>{ //size é o elemento html acessado e sizeIndex é a sua posição
            size.querySelector('span').innerHTML = pizzaJson[index].sizes[sizeIndex]
            if (sizeIndex == 2){
                size.classList.add('selected')
            }
            /* pega o tamanho no pizzaJson.sizes, de acordo com o elemento 
             html acessado. A ordem esta na mesma dos elementos html (menor para o maior)*/
        })

        setTimeout(()=>{
            dq('.pizzaWindowArea').style.opacity = 1 // o 'transition' só funciona em alterações feitas apos o carregamento total da pagina
        }, 200)        
    })                
        dq('.pizza-area').append(pizzaItem)/* Ou appendChild já que o parametro é
 um elemento */        
})


function closeWIndowArea(){
    dq('.pizzaWindowArea').style.opacity = 0
    setTimeout(()=>{
        dq('.pizzaWindowArea').style.display = 'none';
    }, 500)    
}
dqall('.pizzaInfo--cancelButton, .pizzInfo--cancelMobileButton').forEach((item)=>{ // pega todos as tags com a classe X e Y e
    // adiciona um evento de click que chama a função de fechar a loja. 
    item.addEventListener('click', closeWIndowArea)
})
dq('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    contadorPizza++
    dq('.pizzaInfo--qt').innerHTML = contadorPizza
})
dq('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if (contadorPizza > 1){
        contadorPizza--
        dq('.pizzaInfo--qt').innerHTML = contadorPizza
    }    
})

dqall('.pizzaInfo--size').forEach((size, sizeIndex)=>{
   size.addEventListener('click', (e)=>{
        dq('.pizzaInfo--size.selected').classList.remove('selected') 
        size.classList.add('selected')
/* se o mesmo elemento que for clicado for o que possuir selected,
a função simplesmente vai remover e adicionar instantaneamente como se  nada tivesse acontecido */        
   })
   
})
dq('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let s = Number(dq('.pizzaInfo--size.selected').getAttribute('data-key'))
    let indentifier = `${pizzaJson[pizzaKey].id}@${s}`
    let key = cart.findIndex((item)=>item.indentifier == indentifier) //findindex retorna -1 quando o elemento não é encontrado    
    // key recebe a posição do elemento quando encontrado
    if (key > -1){
        cart[key].qt += contadorPizza
    } else {
        cart.push({
            indentifier,
            pizza: pizzaJson[pizzaKey].id,// recebe o id do pizzaJson "adicionado" no carrinho
            size: s,
            qt: contadorPizza 
        })
    }
   
    closeWIndowArea();
    updateCart();
})
function updateCart() {
    let size, subt, desc, total
    
    dq('.menu-openner').innerHTML = cart.length
    dq('.menu-openner').addEventListener('click', ()=>{
        if (cart.length>0){
            dq('aside').style.left = '0' // o evento de click só é adicionado se houver algum elemento em cart. Quando não houver elemento em cart o evento de click não vai existir.
        }        
    })
    dq('.cart--area .menu-closer').addEventListener('click', ()=>{
        dq('aside').style.left = '100%' 
    })

    if (cart.length > 0){
        dq('aside').classList.add('show')
        dq('.cart').innerHTML = ''
        cart.forEach((item, i)=>{
            let pizzaItem = pizzaJson.find((element)=>element.id==item.pizza) //retorna o elemento de pizzaJson que possui id da pizza que está no carrinho
            let cartItem = dq('.models .cart--item').cloneNode(true)            
            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item--qt').innerHTML =  cart[i].qt                        
            switch (item.size){
                case 0: 
                    cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (P)`;
                    size = 1
                    break;
                case 1:
                    cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (M)`;
                    size = 1.65
                    break;
                case 2:
                    cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (G)`;
                    size = 1.65*1.65
                    break;        

            }
            
            subt = (pizzaItem.price*size)*cart[i].qt            
            desc = subt*0.1
            total = subt-desc 
            
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if (cart[i].qt>1){
                    cart[i].qt--
                } else {                     
                    cart.splice(i, 1)
                }                
                updateCart()
            })            
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++
                updateCart()                                
            })
            dq('.cart').append(cartItem)
        })
        dq('.subtotal span:last-child').innerHTML = `${subt.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
        dq('.desconto span:last-child').innerHTML = `${desc.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
        dq('.big span:last-child').innerHTML = `${total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
    } else {
        dq('aside').classList.remove('show')
        dq('aside').style.left = '100%'
    }
}

