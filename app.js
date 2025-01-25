// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do núemro secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';


let listaNumerosSorteados = [];
let numeroLimite = 4;
let numbAleatorio = gerarNumero();
let tentativas = 1;

function exibirTextoTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

exibirMensagemInicial();
function exibirMensagemInicial(){
    exibirTextoTela('p', 'Jogo do número secreto');
    exibirTextoTela('h1', 'Escolha um número entre 1 e 10');
}

// Alternativa para caso a biblioteca ResposiveVoice nao funciona, usamos essa função que já faz parte do js
// function exibirTextoNaTela(tag, texto) {
//     let campo = document.querySelector(tag);
//     campo.innerHTML = texto;
//     if ('speechSynthesis' in window) {
//         let utterance = new SpeechSynthesisUtterance(texto);
//         utterance.lang = 'pt-BR'; 
//         utterance.rate = 1.2; 
//         window.speechSynthesis.speak(utterance); 
//     } else {
//         console.log("Web Speech API não suportada neste navegador.");
//     }
// }

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numbAleatorio){
        exibirTextoTela('h1', 'acertou mizaravel');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `parabens voce acertou o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numbAleatorio){
            exibirTextoTela('h1', 'O número secreto é menor');
        } else {
            exibirTextoTela('h1', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumero(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdNuemrosLista = listaNumerosSorteados.length;

    if(qtdNuemrosLista == numeroLimite){
        listaNumerosSorteados = [];
    }

    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumero();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
} 

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numbAleatorio = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //voltar desabilitar o botão de "novo jogo" após reiniciar o game.
}
