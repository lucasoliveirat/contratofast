//ANIIMAÇÃO CAIXAS 
const botaoOpenCaixas = document.getElementById('openCaixas');
const caixas = document.getElementById('caixas_t_w');

botaoOpenCaixas.addEventListener('click', function() {
    if (caixas.style.display === 'none' || caixas.style.display === '') {
        caixas.style.display = 'flex'; // Ou 'block' ou 'inline-block', dependendo do seu layout
        caixas.style.animation = 'expandFromButton 0.1s forwards';
    } else {
        caixas.style.animation = 'contractToButton 0.1s forwards';
        setTimeout(() => {
            caixas.style.display = 'none';
        }, 500); // Garante que a animação de saída complete antes de ocultar
    }
});



//LIMPAR CAIXAS N/M/... AO CLICAR
 // Função para limpar caixa de texto individualmente e atualizar as funções
 function limparConteudoEAtualizarFuncoes(event) {
    var caixaTexto = event.target;
    caixaTexto.value = '';
    substituirPadroes();
}

// Adicionar um ouvinte de evento 'click' a cada caixa de texto
document.querySelectorAll('.caixaTexto').forEach(function(caixaTexto) {
    caixaTexto.addEventListener('click', limparConteudoEAtualizarFuncoes);
});

// Adicionar um ouvinte de evento 'input' a cada caixa de texto
document.querySelectorAll('.caixaTexto').forEach(function(caixaTexto) {
    caixaTexto.addEventListener('input', substituirPadroes);
});


//SUBSTITUIÇÃO DE PADRÕES N M I O G P
function substituirPadroes() {
    var caixaTextoN = document.getElementById("caixaTextoN");
    var caixaTextoM = document.getElementById("caixaTextoM");
    var caixaTextoO = document.getElementById("caixaTextoO");
    var caixaTextoG = document.getElementById("caixaTextoG");
    var caixaTextoI = document.getElementById("caixaTextoI");
    var caixaTextoP = document.getElementById("caixaTextoP");

    if (caixaTextoN && caixaTextoM && caixaTextoO && caixaTextoG && caixaTextoI && caixaTextoP) {
        var textoN = caixaTextoN.value || "N";
        var textoM = caixaTextoM.value || "M";
        var textoO = caixaTextoO.value || "O";
        var textoG = caixaTextoG.value || "G";
        var textoI = caixaTextoI.value || "I";
        var textoP = caixaTextoP.value || "P";

        var listaItems = document.querySelectorAll(".ul-lista-variaveis li");

        listaItems.forEach(function(item) {
            var dataText = item.getAttribute('data-text');

            // Substituir padrões dentro dos colchetes []
            var novoTexto = dataText.replace(/\[\s*N\s*\]/g, "[" + textoN + "]")
                                    .replace(/\[\s*M\s*\]/g, "[" + textoM + "]")
                                    .replace(/\[\s*O\s*\]/g, "[" + textoO + "]")
                                    .replace(/\[\s*G\s*\]/g, "[" + textoG + "]")
                                    .replace(/\[\s*I\s*\]/g, "[" + textoI + "]")
                                    .replace(/\[\s*P\s*\]/g, "[" + textoP + "]");

            // Substituir padrões dentro dos underscores _
            novoTexto = novoTexto.replace(/_\s*N\s*_/g, "_" + textoN + "_")
                                 .replace(/_\s*M\s*_/g, "_" + textoM + "_")
                                 .replace(/_\s*O\s*_/g, "_" + textoO + "_")
                                 .replace(/_\s*G\s*_/g, "_" + textoG + "_")
                                 .replace(/_\s*I\s*_/g, "_" + textoI + "_")
                                 .replace(/_\s*P\s*_/g, "_" + textoP + "_");

            // Substituir padrões específicos para M
            novoTexto = novoTexto.replace(/_\s*M\s*}/g, "_" + textoM + "}")
                                 .replace(/_\s*M\s*\]/g, "_" + textoM + "]");

            // Atualizar o texto visível dentro do <li>
            var textoVisivel = item.childNodes[0];
            textoVisivel.textContent = novoTexto;
        });
    }
}

// Adiciona um ouvinte de evento 'input' para qualquer mudança nos campos de entrada
document.querySelectorAll('input[type="text"]').forEach(function(input) {
    input.addEventListener("input", substituirPadroes);
});


// Função para substituir padrões dentro do texto fornecido
function substituirPadroesNoTexto(texto) {
    var caixaTextoN = document.getElementById("caixaTextoN");
    var caixaTextoM = document.getElementById("caixaTextoM");
    var caixaTextoO = document.getElementById("caixaTextoO");
    var caixaTextoG = document.getElementById("caixaTextoG");
    var caixaTextoI = document.getElementById("caixaTextoI");
    var caixaTextoP = document.getElementById("caixaTextoP");

    if (caixaTextoN && caixaTextoM && caixaTextoO && caixaTextoG && caixaTextoI && caixaTextoP) {
        caixaTextoN = caixaTextoN.value || "N";
        caixaTextoM = caixaTextoM.value || "M";
        caixaTextoO = caixaTextoO.value || "O";
        caixaTextoG = caixaTextoG.value || "G";
        caixaTextoI = caixaTextoI.value || "I";
        caixaTextoP = caixaTextoP.value || "P";

        // Substituir padrões dentro dos colchetes []
        texto = texto.replace(/\[N\]/g, "[" + caixaTextoN + "]")
                     .replace(/\[M\]/g, "[" + caixaTextoM + "]")
                     .replace(/\[O\]/g, "[" + caixaTextoO + "]")
                     .replace(/\[G\]/g, "[" + caixaTextoG + "]")
                     .replace(/\[I\]/g, "[" + caixaTextoI + "]")
                     .replace(/\[P\]/g, "[" + caixaTextoP + "]");

        // Substituir padrões dentro dos underscores _
        texto = texto.replace(/_N_/g, "_" + caixaTextoN + "_")
                     .replace(/_M_/g, "_" + caixaTextoM + "_")
                     .replace(/_O_/g, "_" + caixaTextoO + "_")
                     .replace(/_G_/g, "_" + caixaTextoG + "_")
                     .replace(/_I_/g, "_" + caixaTextoI + "_")
                     .replace(/_P_/g, "_" + caixaTextoP + "_");

        // Substituir padrões específicos para M
        texto = texto.replace(/_M}/g, "_" + caixaTextoM + "}")
                     .replace(/_M\]/g, "_" + caixaTextoM + "]");
    }

    return texto;
}

document.getElementById('caixaTextoN').addEventListener("input", substituirPadroes);
document.getElementById('caixaTextoM').addEventListener("input", substituirPadroes);
document.getElementById('caixaTextoG').addEventListener("input", substituirPadroes);
document.getElementById('caixaTextoP').addEventListener("input", substituirPadroes);
document.getElementById('caixaTextoO').addEventListener("input", substituirPadroes);
document.getElementById('caixaTextoI').addEventListener("input", substituirPadroes);

// Adiciona um ouvinte de evento 'input' apenas para as caixas de texto dentro de cada container
document.querySelectorAll('.container input[type="number"]').forEach(function(input) {
    input.addEventListener("input", function(event) {
        var container = event.target.closest('.container');
        if (container) {
            substituirPadroes(container);
        }
    });
});

////////////

// Função isolada para atualizar o conteúdo do textarea com TinyMCE
function updateTextareaContent(isChecked) {
    var editor = tinymce.get('myTextarea'); // Obter a instância do TinyMCE
    var content = editor.getContent(); // Pegar o conteúdo do TinyMCE

    if (isChecked) {
        // Remove "${" e "}" quando o switch está ativado, apenas se já estiverem presentes
        content = content.replace(/\${(\[\[(CLIENTE|ASSOCIADO|RESERVA).*?\]\])}/g, "$1");
    } else {
        // Adiciona "${" no início e "}" no final apenas se não estiverem já presentes
        content = content.replace(/(\[\[(CLIENTE|ASSOCIADO|RESERVA).*?\]\])(?<!\${(\[\[(CLIENTE|ASSOCIADO|RESERVA).*?\]\])})(?!})/g, "${$1}");
    }

    editor.setContent(content); // Atualiza o conteúdo no TinyMCE
}



//SUBSTITUIÇÃO DE PALAVRA
// Função isolada para atualizar o conteúdo do textarea com TinyMCE
$('#substituir').on('click', function() {
    var oldWord = escapeRegExp($('#palavra_antiga').val());
    var newWord = $('#palavra_nova').val();
    var editor = tinymce.get('myTextarea'); // Obtém a instância do TinyMCE
    var content = editor.getContent({format: 'html'}); // Obtém o conteúdo como HTML
    var selection = editor.selection.getContent({format: 'html'}); // Obtém o HTML selecionado

    // Verifica se o campo da palavra antiga está vazio e a palavra nova está preenchida
    if (!oldWord.trim() && newWord.trim()) {
        $('#palavra_antiga').addClass('shake').css('border', '2px solid red');
        setTimeout(function() {
            $('#palavra_antiga').removeClass('shake').css('border', '');
        }, 500);
        return;
    }

    // Verifica se ambos campos palavra antiga e nova estão vazios
    if (!oldWord.trim() && !newWord.trim()) {
        $('.input-field').addClass('shake').css('border', '2px solid red');
        setTimeout(function() {
            $('.input-field').removeClass('shake').css('border', '');
        }, 500);
        return;
    }

    // Se nada está selecionado e os campos não estão ambos vazios, alerta o usuário para selecionar o texto
    if (!selection.trim()) {
        alert('Selecione o texto que deseja substituir.');
        return;
    }

    // Executa a substituição apenas no texto selecionado se o campo da palavra antiga está preenchido
    var modifiedSelection = selection.replace(new RegExp(oldWord, 'g'), newWord);
    editor.selection.setContent(modifiedSelection); // Atualiza apenas o trecho selecionado
});

// Função para escapar caracteres especiais em uma string para uso em expressões regulares
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& significa o caractere correspondido inteiro
}


document.getElementById("substituicao").addEventListener("click", function() {
    var div = document.getElementById("substituicao_palavras");
    if (div.classList.contains('visible')) {
        div.classList.remove('visible');
        setTimeout(function() { // Espera a animação terminar para esconder o elemento
            div.style.display = 'none';
        }, 500); // Deve corresponder à duração da transição
        if (div.timeoutHandle) {
            clearTimeout(div.timeoutHandle);
            div.timeoutHandle = null;
        }
    } else {
        div.style.display = 'block'; // Mostra o elemento antes de começar a animação
        setTimeout(function() {
            div.classList.add('visible');
        }, 10); // Um pequeno delay para garantir que a transição ocorra

        if (div.timeoutHandle) {
            clearTimeout(div.timeoutHandle);
        }
        div.timeoutHandle = setTimeout(function() {
            div.classList.remove('visible');
            setTimeout(function() {
                div.style.display = 'none';
            }, 500);
            div.timeoutHandle = null;
        }, 60000);
    }
});

// Limpar os campos "palavra antiga" e "palavra nova"
document.addEventListener("DOMContentLoaded", function() {
    atualizarVisibilidadeBotaoLimpar(); // Chama a função quando a página carrega

    // Adiciona o evento de input aos campos de entrada
    document.getElementById("palavra_antiga").addEventListener("input", atualizarVisibilidadeBotaoLimpar);
    document.getElementById("palavra_nova").addEventListener("input", atualizarVisibilidadeBotaoLimpar);

    // Adiciona o evento de clique ao botão de limpar campos
    document.getElementById("limpar_campos").addEventListener("click", function() {
        document.getElementById("palavra_antiga").value = ""; // Limpa o campo da palavra antiga
        document.getElementById("palavra_nova").value = ""; // Limpa o campo da palavra nova
        atualizarVisibilidadeBotaoLimpar(); // Atualiza a visibilidade do botão
    });
});

// Função para atualizar a visibilidade do botão de limpar campos
function atualizarVisibilidadeBotaoLimpar() {
    var palavraAntiga = document.getElementById("palavra_antiga").value;
    var palavraNova = document.getElementById("palavra_nova").value;
    var botaoLimpar = document.getElementById("limpar_campos");

    // Verifica se pelo menos um dos campos está preenchido
    if (palavraAntiga.trim() || palavraNova.trim()) {
        botaoLimpar.style.display = "block"; // Mostra o botão se qualquer um dos campos está preenchido
    } else {
        botaoLimpar.style.display = "none"; // Oculta o botão se ambos os campos estão vazios
    }
}

document.getElementById("substituicao_palavras").addEventListener("input", function() {
    var div = document.getElementById("substituicao_palavras");
    if (div.timeoutHandle) {
        clearTimeout(div.timeoutHandle);
    }
    div.timeoutHandle = setTimeout(function() {
        div.classList.remove('visible');
        setTimeout(function() {
            div.style.display = 'none';
        }, 500);
        div.timeoutHandle = null;
    }, 30000);
});



// A animação de tremor para campos vazios é mantida
document.getElementById('substituir').addEventListener('click', function() {
    var palavraAntiga = document.getElementById('palavra_antiga').value;
    var palavraNova = document.getElementById('palavra_nova').value;

    if (!palavraAntiga.trim() && !palavraNova.trim()) {
        document.querySelectorAll('.input-field').forEach(function(input) {
            input.classList.add('shake');
            setTimeout(function() {
                input.classList.remove('shake');
            }, 500);
        });
    }
});