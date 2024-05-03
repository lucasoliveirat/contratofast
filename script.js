// BUSCA
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function() {
        let searchTerm = this.textContent.toLowerCase().trim();
        const categorias = document.querySelectorAll('.dv-lista-variaveis');
        let nenhumItemEncontrado = true;

        categorias.forEach(function(categoria) {
            let categoriaTemItensVisiveis = false;

            const listaItens = categoria.querySelectorAll('.ul-lista-variaveis li');
            listaItens.forEach(function(item) {
                const itemDataText = item.getAttribute('data-text').toLowerCase();
                let isVisible = itemDataText.trim() !== ''; // Checa se o item está vazio

                if (isVisible && searchTerm !== '') {
                    const searchTerms = searchTerm.split(/\s+/);

                    searchTerms.forEach(term => {
                        if (term.startsWith('#')) {
                            const tag = term.slice(1);
                            if (tag.length >= 2 && !Array.from(item.classList).some(cl => cl.startsWith(tag))) {
                                isVisible = false;
                            }
                        } else if (term.startsWith('-')) {
                            const excludedTerm = term.slice(1);
                            if (excludedTerm.length >= 2 && itemDataText.includes(excludedTerm)) {
                                isVisible = false;
                            }
                        } else {
                            if (!itemDataText.includes(term)) {
                                isVisible = false;
                            }
                        }
                    });
                }

                item.style.display = isVisible ? '' : 'none';
                if (isVisible) {
                    categoriaTemItensVisiveis = true;
                    nenhumItemEncontrado = false;
                }
            });

            // Atualiza a visibilidade da categoria
            categoria.style.display = categoriaTemItensVisiveis ? '' : 'none';

            // Atualiza as subcategorias
            const subcategorias = categoria.querySelectorAll('.detalhes-subcategoria');
            subcategorias.forEach(function(subcategoria) {
                let subcategoriaTemItensVisiveis = false;
                const listaItensSubcategoria = subcategoria.querySelectorAll('li');

                listaItensSubcategoria.forEach(function(item) {
                    if (item.style.display !== 'none') {
                        subcategoriaTemItensVisiveis = true;
                    }
                });

                subcategoria.style.display = subcategoriaTemItensVisiveis ? '' : 'none';
                subcategoria.open = subcategoriaTemItensVisiveis && searchTerm !== '';
            });
        });

        const imagemNaoEncontrado = document.getElementById('imagemNaoEncontrado');
        imagemNaoEncontrado.style.display = nenhumItemEncontrado && searchTerm !== '' ? 'block' : 'none';
    });
});

//////RASCUNHO WINDOW OPEN
var defaultWidth = '220px'; // Largura mínima
var defaultHeight = '35px'; // Altura mínima

function toggleTextarea() {
    var textarea = document.getElementById("myRascunho");
    var resizer = document.getElementById("resizerRascunho");
    var copyButton = document.querySelector('.copy-button');
    var copyMessage = document.getElementById("copyMessage");
    var clearText = document.getElementsByClassName("clearRascunho")[0];

    if (textarea.style.display === "none" || textarea.style.display === "") {
        // Aplicar o tamanho mínimo como padrão
        textarea.style.width = defaultWidth;
        textarea.style.height = defaultHeight;

        textarea.style.display = "block";
        resizer.style.display = "block";
        copyButton.style.display = "block";
        copyMessage.style.display = "none";
        toggleClearTextVisibility();
    } else {
        textarea.style.display = "none";
        resizer.style.display = "none";
        copyButton.style.display = "none";
        copyMessage.style.display = "none";
        clearText.style.display = "none";
    }
}


function initDrag(e) {
    var textarea = document.getElementById("myRascunho");
    var startX = e.clientX;
    var startY = e.clientY;
    var startWidth = parseInt(document.defaultView.getComputedStyle(textarea).width, 10);
    var startHeight = parseInt(document.defaultView.getComputedStyle(textarea).height, 10);

    function doDrag(e) {
        var textarea = document.getElementById("myRascunho");
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
    
        // Calcular % da largura e altura da tela
        var maxWidth = windowWidth * 0.91;
        var maxHeight = windowHeight * 0.7;
    
        // Definir tamanho mínimo
        var minWidth = 239;
        var minHeight = 35;
    
        // Calcular a nova largura e altura do textarea
        var newWidth = Math.min(maxWidth, Math.max(minWidth, startWidth + e.clientX - startX));
        var newHeight = Math.min(maxHeight, Math.max(minHeight, startHeight + startY - e.clientY));
    
        // Definir a nova largura e altura
        textarea.style.width = newWidth + 'px';
        textarea.style.height = newHeight + 'px';
    }
    

    function stopDrag() {
        window.removeEventListener('mousemove', doDrag, false);
        window.removeEventListener('mouseup', stopDrag, false);
    }

    window.addEventListener('mousemove', doDrag, false);
    window.addEventListener('mouseup', stopDrag, false);
    e.preventDefault();
}

function copyText() {
    var textarea = document.getElementById("myRascunho");
    var copyMessage = document.getElementById("copyMessage");
    if (textarea.value.trim() === "") {
        copyMessage.innerText = "Não há texto para copiar";
    } else {
        textarea.select();
        document.execCommand('copy');
        copyMessage.innerText = "Copiado!";
    }
    copyMessage.style.display = "inline"; // Mostra a mensagem de "Copiado!" ou "Não há texto para copiar"
    setTimeout(function() {
        copyMessage.style.display = "none"; // Esconde a mensagem após 2 segundos
    }, 2000);
}

function toggleClearTextVisibility() {
    var textarea = document.getElementById("myRascunho");
    var clearText = document.getElementsByClassName("clearRascunho")[0];
    if (textarea.style.display !== "none" && textarea.value.trim() !== "") {
        clearText.style.display = "block";
    } else {
        clearText.style.display = "none";
    }
}


function clearRascunho() {
    var textarea = document.getElementById("myRascunho");
    textarea.value = "";
    toggleClearTextVisibility(); // Atualiza a visibilidade após limpar
}


/////WINDOW OPEN
function openWindow(topRightCornerX, topRightCornerY) {
    var screenWidth = window.screen.width;
    var newWindowWidth = screenWidth * 0.23; // Definindo a largura como 23% da largura da tela
    var windowHeight = 650; // Definindo a altura para cerca de 650 pixels
    var distanceFromTop = 100; // Ajuste conforme necessário

    // Abrir uma nova janela
    var newWindow = window.open("", "_blank", "left=0,top=" + distanceFromTop + ",width=" + newWindowWidth + ",height=" + windowHeight);

    if (newWindow) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', window.location.href, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var content = xhr.responseText;
                var doc = new DOMParser().parseFromString(content, 'text/html');

                // Remover o botão e outros elementos, conforme necessário
                var openWindowBtn = doc.querySelector('#openWindowBtn');
                if (openWindowBtn) {
                    openWindowBtn.remove();
                }
                var substituicaoBtn = doc.querySelector('#substituicao');
                if (substituicaoBtn) {
                    substituicaoBtn.remove();
                }
                var editorDiv = doc.querySelector('.editor');
                if (editorDiv) {
                    editorDiv.remove();
                }

                // Modificar o estilo da div .variaveis
                var variaveisDiv = doc.querySelector('.variaveis');
                if (variaveisDiv) {
                    variaveisDiv.style.width = 'auto'; // Ajustando a largura para auto
                }

                // Tornar a div textareaRascunho visível
                var textareaRascunho = doc.querySelector('.textareaRascunho');
                if (textareaRascunho) {
                    textareaRascunho.style.display = 'block';
                }

                // Serializar e escrever o conteúdo modificado na nova janela
                var serializer = new XMLSerializer();
                var modifiedContent = serializer.serializeToString(doc);
                newWindow.document.open();
                newWindow.document.write(modifiedContent);
                newWindow.document.close();
            }
        };
        xhr.send();
    } else {
        console.error('Falha ao abrir a nova janela.');
    }
}

$("#openWindowBtn").click(function() {
    var topRightCornerX = $(window).width() - 650;
    var topRightCornerY = 50;
    openWindow(topRightCornerX, topRightCornerY);
});

// ARRASTAR ENTR CATEGORIAS
        $(function() {
            function setupSortable() {
                $(".dv-lista-variaveis").sortable({
                    handle: "h2",
                    connectWith: ".dv-lista-variaveis",
                    cursor: "move",
                    start: function(event, ui) {
                        ui.item.startPos = ui.item.index();
                    },
                    stop: function(event, ui) {
                        var startPos = ui.item.startPos;
                        var endPos = ui.item.index();
        
                        if (startPos !== endPos) {
                            // Moveu entre categorias, coloque seu código aqui se necessário
                            console.log("Item movido de posição " + startPos + " para " + endPos);
                        }
                    }
                });
            }
        
            // Configurar a ordenação ao carregar a página
            setupSortable();
        });
        

///////////////////////////// LISTA CATEGORIAS
function construirLista(variaveis) {
    var listaVariaveis = document.getElementById('lista-variaveis');

    // Limpa o conteúdo da lista antes de adicionar os novos itens
    listaVariaveis.innerHTML = '';

    // Objeto para armazenar categorias já criadas
    var categoriasCriadas = {};

    // Percorre todos os itens no objeto variaveis
    variaveis.forEach(function(item) {
        var categoria = item.categoria;
        var subcategoria = item.subcategoria;

        // Verifica se a categoria já foi criada antes
        if (!categoriasCriadas[categoria]) {
            // Cria a estrutura HTML para a nova categoria
            var divCategoria = document.createElement('div');
            divCategoria.className = 'dv-lista-variaveis';
            divCategoria.setAttribute('data-categoria', categoria);

            var h2 = document.createElement('h2');
            h2.className = 'h2-lista-variaveis';
            h2.draggable = true;
            h2.onclick = function() { toggleCategoria(this); };
            h2.ondragstart = function(event) { dragStart(event); };
            h2.innerHTML = '<span>' + categoria + '</span>';

            var ul = document.createElement('ul');
            ul.className = 'ul-lista-variaveis';

            divCategoria.appendChild(h2);
            divCategoria.appendChild(ul);

            listaVariaveis.appendChild(divCategoria);

            // Marca a categoria como criada
            categoriasCriadas[categoria] = { div: divCategoria, subcategorias: {} };
        }

        // Encontra a UL correspondente à categoria
        var ulCategoria = categoriasCriadas[categoria].div.querySelector('ul');

        // Verifica se existe uma subcategoria
        if (subcategoria) {
            // Verifica se a subcategoria já foi adicionada à categoria
            if (!categoriasCriadas[categoria].subcategorias[subcategoria]) {
                // Cria a estrutura HTML para a nova subcategoria
                var detalhes = document.createElement('details');
                detalhes.setAttribute('data-subcategoria', subcategoria);
                detalhes.classList.add('detalhes-subcategoria'); // Adiciona a classe

                var summary = document.createElement('summary');
                summary.textContent = subcategoria;
                summary.classList.add('summary-subcategoria'); // Adicione esta linha para adicionar a classe
                detalhes.appendChild(summary);

                var ulSubcategoria = document.createElement('ul');
                ulSubcategoria.className = 'ul-lista-subcategoria';
                detalhes.appendChild(ulSubcategoria);

                ulCategoria.appendChild(detalhes);

                // Marca a subcategoria como criada
                categoriasCriadas[categoria].subcategorias[subcategoria] = ulSubcategoria;

                // Fecha a subcategoria por padrão
                detalhes.open = false; // ou detalhes.removeAttribute('open');
            }

            // Adiciona o item à subcategoria correspondente
            var ulSubcategoria = categoriasCriadas[categoria].subcategorias[subcategoria];
            var li = criarItemLista(item);
            ulSubcategoria.appendChild(li);
        } else {
            // Se não houver subcategoria, adiciona o item à categoria principal
            var li = criarItemLista(item);
            ulCategoria.appendChild(li);
        }
    });
}


//LIMPAR CAMPOS AO ALTERNAR SWITCH / ORDENAÇÃO DE CATEGORIAS
var switchState = false;

// Função para limpar as caixas de texto e o campo de pesquisa
function limparCampos() {
    document.getElementById('caixaTextoN').value = '';
    document.getElementById('caixaTextoM').value = '';
    document.getElementById('caixaTextoP').value = '';
    document.getElementById('caixaTextoO').value = '';
    document.getElementById('caixaTextoI').value = '';
    document.getElementById('caixaTextoG').value = '';
    
    var searchInput = document.getElementById('searchInput');
    searchInput.innerHTML = ''; // Limpa o campo de pesquisa quando ele é contenteditable

    // Simula um evento de entrada de teclado vazio no campo de pesquisa
    var event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    searchInput.dispatchEvent(event);

    // Chama a função para carregar os resultados novamente
    carregarJSONAutomaticamente();
}


// Função para alternar o estado do switch e carregar o JSON automaticamente
function toggleSwitch() {
    switchState = !switchState;
    // Limpa as caixas de texto e o campo de pesquisa quando o estado do switch é alterado
    limparCampos();
}

// Função para carregar os dados JSON automaticamente (substitua por sua lógica real)
function carregarJSONAutomaticamente() {
    // Aqui você coloca a lógica para carregar seus dados JSON e exibi-los
    // Certifique-se de mostrar todos os resultados quando nenhum termo de pesquisa está presente
}


// Função para ordenar os dados
function ordenarDados(dados) {
    const ordemCategorias = {
        "Cliente": 1,
        "Associado": 2,
        "Reserva": 3,
        "Série de pagamento": 4,
        "Condicionais": 5,
        "Repetição": 6,
        "Empreendimento": 7,
        "Imobiliária": 8,
        "Corretor": 9,
        "Forma de pagamento": 10,
        "Assinatura Eletrônica": 11,
        "Pré-cadastro": 12,
        // Adicione outras categorias aqui, se necessário
    };

    function compararEntradas(a, b) {
        const ordemCategoriaA = ordemCategorias[a.categoria] || Infinity;
        const ordemCategoriaB = ordemCategorias[b.categoria] || Infinity;

        if (ordemCategoriaA !== ordemCategoriaB) {
            return ordemCategoriaA - ordemCategoriaB;
        }

        const temSubcategoriaA = !!a.subcategoria;
        const temSubcategoriaB = !!b.subcategoria;
        if (temSubcategoriaA !== temSubcategoriaB) {
            return temSubcategoriaA ? 1 : -1;
        }

        return 0;
    }

    dados.sort(compararEntradas);

    return dados;
}

// Função para carregar o JSON automaticamente
function carregarJSONAutomaticamente() {
    fetch('dados_jason.json')
        .then(response => response.json())
        .then(data => {
            const dadosOrdenados = ordenarDados(data);
            construirLista(dadosOrdenados);
        })
        .catch(error => {
            console.error('Erro ao carregar JSON:', error);
        });
}

// Chama a função para carregar o JSON automaticamente quando o DOM estiver completamente carregado
document.addEventListener("DOMContentLoaded", function() {
    carregarJSONAutomaticamente();
    // Adiciona um evento ao switch para alternar o estado
    document.getElementById('fs').addEventListener('change', toggleSwitch);
});






////////////// ITENS CATEGORIAS
var ultimoSelecionado = null; // Variável para armazenar o último item clicado

function criarItemLista(item, fontSize, imageMaxHeight) {
    var li = document.createElement('li');
    li.draggable = true;
    li.setAttribute('data-id', item.objectID); // Adiciona o objectID como um atributo de dados
    li.setAttribute('data-text', switchState ? item.variavel_word : item.variavel);

    // Adiciona classe se a tag estiver presente
    if (item.tag) {
        li.classList.add(item.tag.substring(1)); // Adiciona a classe sem o '#'
    }

    li.onclick = function() {
        if (ultimoSelecionado !== null) {
            ultimoSelecionado.classList.remove('copiado');
        }
        this.classList.add('copiado');
        ultimoSelecionado = this;
        setTimeout(() => {
            this.classList.remove('copiado');
        }, 5000);
        copiarNome(this);
    };

    li.ondragstart = function(event) {
        if (ultimoSelecionado !== null) {
            ultimoSelecionado.classList.remove('copiado');
        }
        this.classList.add('copiado');
        ultimoSelecionado = this;
        setTimeout(() => {
            this.classList.remove('copiado');
        }, 5000);
        dragStart(event);
    };

    var textContainer = document.createElement('span');
    var textContent = switchState ? item.variavel_word.replace(/\n/g, '<br>') : item.variavel.replace(/\n/g, '<br>');
    textContainer.innerHTML = textContent;
    textContainer.classList.add('nome-variavel');

    var infoContainer = document.createElement('span');
    infoContainer.className = 'info-icon-container';

    var infoIcon = document.createElement('i');
    infoIcon.className = 'fas fa-info-circle';

    var hoverContent = document.createElement('div');
    hoverContent.className = 'hover-content';
    var p = document.createElement('p');
    p.textContent = item.descricao;
    p.style.fontSize = fontSize + 'px'; // Define o tamanho da fonte do parágrafo
    hoverContent.appendChild(p);

    infoIcon.addEventListener('mouseover', (event) => {
        hoverContent.style.display = 'block';
        const iconRect = infoIcon.getBoundingClientRect();
        const mouseX = iconRect.left + window.pageXOffset;
        const mouseY = iconRect.bottom + window.pageYOffset - window.scrollY;
        const offsetLeft = 20; // Ajuste para a direita
        const offsetTop = 0; // Ajuste para cima reduzido
        hoverContent.style.left = (mouseX + offsetLeft) + 'px';
        hoverContent.style.top = (mouseY - offsetTop) + 'px';

        if (item.img) {
            var imgElement = document.createElement('img');
            imgElement.src = item.img;
            imgElement.style.maxHeight = imageMaxHeight + 'px'; // Define a altura máxima da imagem
            imgElement.style.width = 'auto';
            hoverContent.appendChild(imgElement);
        }
    });
    
    infoIcon.addEventListener('mouseout', () => {
        hoverContent.style.display = 'none';
        const imgElement = hoverContent.querySelector('img');
        if (imgElement) {
            hoverContent.removeChild(imgElement);
        }
    });

    infoIcon.style.marginLeft = '5px';

    infoContainer.appendChild(infoIcon);

    li.appendChild(textContainer);
    li.appendChild(infoContainer);
    li.appendChild(hoverContent);

    return li;
}

// Exemplo de uso:
// var item = {objectID: '1', variavel_word: 'Word', variavel: 'Variable', tag: '#class', descricao: 'Descrição', img: 'imagem.jpg'};
// document.body.appendChild(criarItemLista(item, 14, 200)); // fontSize de 14px e imageMaxHeight de 200px





 // EXPANDIR/CONTRAIR CATEGORIAS

 function toggleCategoria(element) {
    var lista = element.nextElementSibling;
    var aberta = lista.style.display === 'block';

    // Fecha todas as outras listas
    var listas = document.querySelectorAll('.ul-lista-variaveis');
    listas.forEach(function(outraLista) {
        if (outraLista !== lista) {
            outraLista.style.display = 'none';
        }
    });

    // Se a lista estiver fechada, abre ela e fecha as outras
    if (!aberta) {
        lista.style.display = 'block';
    } else {
        lista.style.display = 'none';
    }
}

///////////////// COR TAGS BUSCA

function highlightTags() {
    let div = document.getElementById('searchInput');
    let text = div.innerText;
    let caretPos = getCaretPosition(div);
    // Expressão regular para dividir o texto ao redor de espaços
    let words = text.split(/(\s+)/); 

    let formattedText = words.map(word => {
        // Aplica destaque em vermelho imediatamente para "-"
        if (word === '-') {
            return `<span class="highlight-red">${word}</span>`;
        } else if (word.startsWith('#')) {
            return `<span class="highlight-green">${word}</span>`;
        } else if (word.startsWith('-')) {
            return `<span class="highlight-red">${word}</span>`;
        } else {
            return word;
        }
    }).join('');

    div.removeEventListener('input', highlightTags);
    div.innerHTML = formattedText;
    setCaretPosition(div, caretPos);
    div.addEventListener('input', highlightTags);
}

function getCaretPosition(element) {
    var caretOffset = 0, sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            var tempRange = range.cloneRange();
            tempRange.selectNodeContents(element);
            tempRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = tempRange.toString().length;
        }
    }
    return caretOffset;
}

function setCaretPosition(element, offset) {
    var charCount = 0, found = false;
    function setRange(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (charCount + node.length >= offset && !found) {
                var range = document.createRange();
                range.setStart(node, offset - charCount);
                range.collapse(true);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                found = true;
            }
            charCount += node.length;
        } else {
            for (var i = 0; i < node.childNodes.length; i++) {
                setRange(node.childNodes[i]);
                if (found) return;
            }
        }
    }
    setRange(element);
}



//LIMPAR BUSCA
// Função para limpar o conteúdo do campo de entrada editável e esconder o botão limpar
function clearSearch() {
    var searchInput = document.getElementById('searchInput');
    searchInput.innerHTML = ''; // Limpa o conteúdo interno do elemento editável
    document.querySelector('.clearSearch').style.display = 'none'; // Esconde o botão Limpar
    searchInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true })); // Dispara o evento de entrada para ativar quaisquer ouvintes
}

// Função para destacar tags ou realizar outras ações durante a digitação e atualizar a visibilidade do botão limpar
function highlightLimpar() {
    console.log('Digitando...'); // Exemplo de ação, implemente a lógica de destaque de tags conforme necessário
    var searchInput = document.getElementById('searchInput');
    var clearBtn = document.querySelector('.clearSearch');
    if (searchInput.innerHTML.trim() === '') {
        clearBtn.style.display = 'none'; // Esconde o botão Limpar
    } else {
        clearBtn.style.display = 'block'; // Mostra o botão Limpar
    }
}

// Adiciona o ouvinte de evento de entrada ao elemento editável
document.getElementById('searchInput').addEventListener('input', highlightLimpar);

// Inicializa a visibilidade do botão Limpar corretamente ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    highlightLimpar(); // Chama a função para definir o estado inicial do botão Limpar
});


//


// COPIAR PARA ÁREA DE TRANSFERÊNCIA E TAMBÉM ARRASTAR PARA ÁREA DE TRANSFERÊNCIA
var nomeSelecionado = null;

function copiarTexto(texto) {
    var input = document.createElement('textarea');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = texto;
    document.body.appendChild(input);
    input.focus();
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}


function copiarNome(elemento) {
    limparSelecaoAnterior();
    var texto = (elemento.value || elemento.textContent || elemento.innerText).trim();
    var dataText = elemento.dataset.text;
    var textoSubstituido = substituirPadroesNoTexto(dataText);
    copiarTexto(textoSubstituido);
    adicionarClasseSelecionado(elemento);
    exibirMensagemCopiado();
}

function handleTransfer(event, isDrop) {
    event.preventDefault();

    var data;
    if (isDrop) {
        data = event.dataTransfer.getData("text/plain");
    } else {
        data = event.target.dataset.text;
    }

    var element = document.getElementById('story');

    var cursorPos = element.selectionStart;
    var textBefore = element.value.substring(0, cursorPos);
    var textAfter = element.value.substring(cursorPos);

    // Aplicar substituições de padrões
    data = substituirPadroesNoTexto(data);

    // Atualizar o texto antes de inseri-lo
    element.value = textBefore + data + textAfter;

    // Chamar copiarNome após a atualização do texto
    if (!isDrop) {
        copiarNome(event.target);
    }
    else {
        limparSelecaoAnterior();
    }

    if (!isDrop) {
        adicionarClasseSelecionado(event.target);
    }
}

function limparSelecaoAnterior() {
    if (nomeSelecionado) {
        nomeSelecionado.classList.remove('selected');
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    handleTransfer(event, true);
}

function dragStart(event) {
    var dataText = event.target.dataset.text;

    // Aplicar substituições de padrões no texto antes de iniciar o arraste
    dataText = substituirPadroesNoTexto(dataText);

    event.dataTransfer.setData('text/plain', dataText);
    copiarNome(event.target); // Chama a função para copiar o texto ao iniciar o arraste
    adicionarClasseSelecionado(event.target);
}

function mudarCor(elemento, novaCor) {
    elemento.style.color = novaCor;
}

///////////// TESTE ORDENAÇÃO DE DADOS
var nomeSelecionado = null;
var reordenarInterval;

function copiarTexto(texto) {
    var input = document.createElement('textarea');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = texto;
    document.body.appendChild(input);
    input.focus();
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

function copiarNome(elemento) {
    limparSelecaoAnterior();
    var texto = (elemento.value || elemento.textContent || elemento.innerText).trim();
    var dataText = elemento.dataset.text;
    var textoSubstituido = substituirPadroesNoTexto(dataText);  
    copiarTexto(textoSubstituido);
    incrementarContagemDeCopias(elemento);
    adicionarClasseSelecionadoTemporariamente(elemento);
    exibirMensagemCopiado();
}

function adicionarClasseSelecionadoTemporariamente(elemento) {
    elemento.classList.add('copiado');
    nomeSelecionado = elemento;
    setTimeout(() => {
        elemento.classList.remove('copiado');
    }, 3000);
}

function reordenarItens() {
    var lists = document.querySelectorAll('.ul-lista-variaveis');
    lists.forEach(list => {
        var items = Array.from(list.children);
        items.sort((a, b) => (parseInt(b.dataset.copyCount) || 0) - (parseInt(a.dataset.copyCount) || 0));
        items.forEach(item => list.appendChild(item));
    });
    console.log('Itens reordenados.');
}

function incrementarContagemDeCopias(elemento) {
    var copyCount = parseInt(elemento.dataset.copyCount) || 0;
    copyCount += 1;
    elemento.dataset.copyCount = copyCount;
    localStorage.setItem(elemento.dataset.id + '_copyCount', copyCount.toString());  
    console.log("Salvando: " + elemento.dataset.id + '_copyCount = ' + copyCount);
}

function limparSelecaoAnterior() {
    if (nomeSelecionado && nomeSelecionado.classList.contains('copiado')) {
        nomeSelecionado.classList.remove('copiado');
    }
}

function exibirMensagemCopiado() {
    console.log("Texto copiado!");
}

function setupReordenarIntervalo() {
    clearInterval(reordenarInterval);
    reordenarInterval = setInterval(reordenarItens, 1000);
}

function handleTransfer(event, isDrop) {
    event.preventDefault();

    var data;
    if (isDrop) {
        data = event.dataTransfer.getData("text/plain");
    } else {
        data = event.target.dataset.text;
    }

    var element = document.getElementById('story');

    var cursorPos = element.selectionStart;
    var textBefore = element.value.substring(0, cursorPos);
    var textAfter = element.value.substring(cursorPos);

    data = substituirPadroesNoTexto(data);

    element.value = textBefore + data + textAfter;

    if (!isDrop) {
        copiarNome(event.target);
        adicionarClasseSelecionado(event.target);
    } else {
        limparSelecaoAnterior();
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    handleTransfer(event, true);
}

function dragStart(event) {
    var dataText = event.target.dataset.text;
    dataText = substituirPadroesNoTexto(dataText);

    event.dataTransfer.setData('text/plain', dataText);
    copiarNome(event.target);
    adicionarClasseSelecionado(event.target);
}

window.onload = function() {
    setupReordenarIntervalo();

    var lists = document.querySelectorAll('.ul-lista-variaveis');
    lists.forEach(list => {
        Array.from(list.children).forEach(item => {
            var storedCount = localStorage.getItem(item.dataset.id + '_copyCount');
            console.log("Recuperando: " + item.dataset.id + '_copyCount = ' + storedCount);
            if (storedCount !== null) {
                item.dataset.copyCount = storedCount;
            }
        });
    });
};








