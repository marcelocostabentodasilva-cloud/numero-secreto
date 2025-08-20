let listaDeNumerosSorteaods = [];
let numeroLimite = 10
let numeroAletorio = gerarNumeroAleatorio();
let tentativa = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ("speechSynthesis" in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = "pt-BR";
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
        } else {
            console.log("Web Speech API não suportada neste navegador.");
        }
}

function exibirMenssagemInicial() {
   exibirTextoNaTela("h1", "jogo do numero secreto");
    exibirTextoNaTela("p", "Escolha um numero entre 1 a 10"); 
}

exibirMenssagemInicial();

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numeroAletorio) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativa > 1 ? "tentativas" : 
        "tentativa";
        let mensagemTentativas = `voce descobriu o numero secreto com ${tentativa} ${palavraTentativa}`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroAletorio) {
            exibirTextoNaTela("p", "O numero secreto é menor");
        } else {
            exibirTextoNaTela("p", "O numero secreto é maior");
        }
        tentativa ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroAletorioscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteaods.length;

if(quantidadeDeElementosNaLista ==  numeroLimite) {
    listaDeNumerosSorteaods = [];
}

    if (listaDeNumerosSorteaods.includes(numeroAletorioscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteaods.push(numeroAletorioscolhido)
        return numeroAletorioscolhido;
    }
}


function reniciarJogo() {
    numeroAletorio = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    exibirMenssagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}