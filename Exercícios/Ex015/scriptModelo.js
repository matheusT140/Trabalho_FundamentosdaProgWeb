function verificarIdade () {
    let anoNascimento = document.getElementById('ano').value
    let anoAtual = new Date().getFullYear()
    let idade = anoAtual-anoNascimento
    let genero = document.querySelector('input[name="sex"]:checked').value
    if (anoNascimento<= anoAtual && idade < 120 ){
        switch (genero) {
            case 'Masculino':              
                document.getElementsByClassName('resultado').innerText = `Detectamos um homem com ${idade} anos.`
                if (idade < 10) {
                    document.getElementById('fotoDaPessoa').src = 'criançaM.png'
                } else if (idade < 29) {
                    document.getElementById('fotoDaPessoa').src = 'jovemM.png'
                } else if (idade < 56) {
                    document.getElementById('fotoDaPessoa').src = 'adulto.png'
                } else {
                    document.getElementById('fotoDaPessoa').src = 'idoso.png'
                }
                break
            case 'Feminino':
                document.getElementsByClassName('resultado').innerText = `Detectamos uma mulher com ${idade} anos.`
                if (idade < 10) {
                    document.getElementById('fotoDaPessoa').src = 'criançaF.png'
                } else if (idade < 29) {
                    document.getElementById('fotoDaPessoa').src = 'jovemF.png'
                } else if (idade < 56) {
                    document.getElementById('fotoDaPessoa').src = 'adulta.png'
                } else {
                    document.getElementById('fotoDaPessoa').src = 'idosa.png'
                }
                break
            default: document.getElementsByClassName('resultado').innerText = 'Sexo não selecionado'  
    
        }
    } else {
        window.alert(`Idade inválida. Digite um ano menor ou igual a ${anoAtual}`)
    }
    
}