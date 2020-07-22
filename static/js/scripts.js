getText = () => document.getElementById('mainText').value;    
setText = (text) => document.getElementById('mainText').value = text;

getSelectedText = () => {
    if (document.getSelection().toString() != '' && document.getSelection().anchorNode.id == 'mainText_div') {
        return document.getSelection().toString();
    } else {
        return false;
    }
}

function upper(){
    var selText = getSelectedText();
    var text = getText();
    var selectionStart = document.getElementById('mainText').selectionStart

    if (selText) {
        setText(subsStr(text, selectionStart, selText.toUpperCase()));
    } else {
        setText(getText().toUpperCase());
    }
}

function lower(){    
    var selText = getSelectedText();
    var text = getText();
    var selectionStart = document.getElementById('mainText').selectionStart

    if (selText) {
        setText(subsStr(text, selectionStart, selText.toLowerCase()));
    } else {
        setText(getText().toLowerCase());
    }
}


function finder(text, str) { // Recebe duas strings(text e str) e retorna os índices de ocorrência de str em text; Falta testar e implementar o caso em q str é uma string maior que 1.
    // Falta tratar os possíveis erros: reveber balores que não sejam strings, str ser maior que text, etc.

    var list = [];
    var regExp = RegExp(str,'g');    
    
    while ((result = regExp.exec(text))) {
        list.push(result.index);        
    }
    
    return list;
}

function subsStr(str, index, subs) { // Substitui uma substring em uma string, recebe a string, o indice onde será substituido e a substring. 
// Falta tratar quando não recebe os argumentos, ou eles são do tipo errado.
// Quando passa os índices finais retorna uma string maior
    intex = parseInt(index);
    return index >= str.length ? str : str.substr(0, index) + subs + str.substr(index + subs.length, str.length - 1);
}

function upperPhrases() { // Coloca a primeira letra de uma frase em maiúscula, mas falta implementar a separação de frases por pontuação.
    var separators = [ // Strings que indicam o fim de uma frase e o seu tamanho no texto.
        {text: '\n', len: 1},
        {text: '\\. ', len: 2},
        {text: '\\! ', len: 2},
        {text: '\\? ', len: 2},
        {text: '\t', len: 1},      
    ];
    var text = getText();
    var endPh = [];

    for(let i in separators) {
        endPh = finder(text, separators[i].text);        
        for(let j in endPh) {
            let index = endPh[j] + separators[i].len; // O endPh[j] tem o índice do separador, mas o que desejamos substituir é a primeira letra após esse separador por isso a soma.          
            text = subsStr(text, index, text[index].toUpperCase());
        }
    }

    text = subsStr(text, 0, text[0].toUpperCase());

    setText(text);
}

function upperWords() {
    var text;
    var spaces;
    
    upperPhrases();
    text = getText();
    spaces = finder(text, ' ');

    for(var i in spaces) {
        let index = spaces[parseInt(i)] + 1;             
        text = subsStr(text, index, text[index].toUpperCase());
    }

    text = subsStr(text, 0, text[0].toUpperCase());

    setText(text);
}

function alternateLetters() {
    var text = getText();

    for(var i in text) {
        if(parseInt(i) % 2 == 0) {
            text = subsStr(text, parseInt(i), text[parseInt(i)].toUpperCase());
        }        
    }

    setText(text);
}

function alternateWords() {
    var text;
    var spaces;
    
    text = getText();
    spaces = finder(text, ' ');

    for(var i in spaces) {
        let index = spaces[parseInt(i)] + 1;
       
        if(parseInt(i) % 2 == 0) {
            let tam;

            if(parseInt(i) == spaces.length - 1) {
                tam = text.length - spaces[parseInt(i)] - 1;                
            } else {
                tam = spaces[parseInt(i) + 1] - spaces[parseInt(i)] - 1;
            }

            text = subsStr(text, index, text.substr(index, tam).toUpperCase());        
        }           
    }

    setText(text);
}

document.getElementById('btn-1').addEventListener('click', upper);
document.getElementById('btn-2').addEventListener('click', lower);
document.getElementById('btn-3').addEventListener('click', upperWords);
document.getElementById('btn-4').addEventListener('click', upperPhrases);
document.getElementById('btn-5').addEventListener('click', alternateLetters);
document.getElementById('btn-6').addEventListener('click', alternateWords);
