function carregarHora () {
    let i = document.getElementById('image')
    let msg = document.getElementById('msg')
    let hora = new Date().getHours()
    msg.innerText = `Agora são ${hora} horas.` 
    hora = 10
    if (hora < 12){
        i.src = 'manha.png' //forma mais fácil 
        document.body.style.background = '#ffdd43' // i.innerHTML = '<img src="manha.png" alt="Foto do dia">' forma mais difícil
                                                    // (id= 'image' fica na div e não na tag img)
    } else if (hora < 18) {
        i.src = 'tarde.png'
        document.body.style.background = '#508dfd' // i.innerHTML = '<img src="tarde.png" alt="Foto da tarde">'
    } else {
        i.src = 'noite.png'
        document.body.style.background = '#332a44' // i.innerHTML = '<img src="noite.png" alt="Foto do noite">'
    }
}