function getText(getSelected = false) {
    var text = {
        text: '',
        selection: '',
        startSel: -1
    };

    if(getSelected == true && document.getSelection().toString() != '' && document.getSelection().anchorNode.id == 'mainText_div') {
        text.selection = document.getSelection().toString();
        text.startSel = parseInt(document.getElementById('mainText').selectionStart);
    }     
    
    text.text = document.getElementById('mainText').value;    
    
    return text;
}

setText = (text) => document.getElementById('mainText').value = text;

// function getSelectedText() {
//     if (document.getSelection().toString() != '' && document.getSelection().anchorNode.id == 'mainText_div') {
//         return document.getSelection().toString();
//     }

//     return false;
// }

function upper() {    
    var text = getText(true);    

    if (text.startSel != -1) {
        setText(subsStr(text.text, text.startSel, text.selection.toUpperCase()));
    } else {
        setText(text.text.toUpperCase());
    }
}

function lower() {    
    var text = getText(true);    

    if (text.startSel != -1) {
        setText(subsStr(text.text, text.startSel, text.selection.toLowerCase()));
    } else {
        setText(text.text.toLowerCase());
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

function upperPhrases() { 
    var separators = [ // Strings que indicam o fim de uma frase e o seu tamanho no texto.
        {text: '\n', len: 1},
        {text: '\\. ', len: 2},
        {text: '\\! ', len: 2},
        {text: '\\? ', len: 2},
        {text: '\t', len: 1},      
    ];
    var text = getText(true);
    var newText;
    var endPh = [];

    if (text.startSel != -1) {
        newText = text.selection;    
    } else {
        newText = text.text;
        text.startSel = 0;
    }

    newText = subsStr(newText, 0, newText[0].toUpperCase()); // Colocando a primeira letra da frase em maiúscula.

    for(let i in separators) {
        endPh = finder(newText, separators[parseInt(i)].text);        
        for(let j in endPh) {
            let index = endPh[parseInt(j)] + separators[parseInt(i)].len; // O endPh[j] tem o índice do separador, mas o que desejamos substituir é a primeira letra após esse separador por isso a soma.          
            if(index < newText.length) {
                newText = subsStr(newText, index, newText[index].toUpperCase());
            }
        }
    }

    setText(subsStr(text.text, text.startSel, newText)); 
}

function upperWords() {
    var text;
    var spaces;
    
    upperPhrases();
    text = getText().text;
    spaces = finder(text, ' ');

    for(var i in spaces) {
        let index = spaces[parseInt(i)] + 1;             
        text = subsStr(text, index, text[index].toUpperCase());
    }

    text = subsStr(text, 0, text[0].toUpperCase());

    setText(text);
}

function alternateLetters() {
    var text = getText(true);
    var newText;

    if (text.startSel != -1) {
        newText = text.selection;    
    } else {
        newText = text.text;
        text.startSel = 0;
    }

    for(var i in newText) {
        if(parseInt(i) % 2 == 0) {
            newText = subsStr(newText, parseInt(i), newText[parseInt(i)].toUpperCase());
        }        
    }

    setText(subsStr(text.text, text.startSel, newText));        
}

function alternateWords() {
    var text;
    var spaces;
    
    text = getText().text;
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

function alternate() {
    
    var text = getText().text;

    for(var i in text) {
        let letter = text[parseInt(i)];
        if(letter.toLowerCase() == letter) {
            text = subsStr(text, parseInt(i), letter.toUpperCase());            
        } else {
            text = subsStr(text, parseInt(i), letter.toLowerCase());        
        }
    }

    setText(text);
}

// ----------------------

function replacing(all = false) {
    var searchValue = document.getElementById('searchValue').value;
    var newValue = document.getElementById('newValue').value;
    var diff = document.getElementById('checkDiff').checked;

    var regVal = '';
    var reg;

    var text = getText().text;

    if(all == true) {
        regVal = regVal + 'g';
    }

    if(diff == false) {
        regVal = regVal + 'i';
    }
    
    reg = new RegExp(searchValue, regVal);
    text = text.replace(reg, newValue);
    setText(text);
}

document.getElementById('btn-1').addEventListener('click', upper);
document.getElementById('btn-2').addEventListener('click', lower);
document.getElementById('btn-3').addEventListener('click', upperWords);
document.getElementById('btn-4').addEventListener('click', upperPhrases);
document.getElementById('btn-5').addEventListener('click', alternateLetters);
document.getElementById('btn-6').addEventListener('click', alternateWords);
document.getElementById('btn-7').addEventListener('click', alternate);
document.getElementById('btn-8').addEventListener('click', () => {replacing(false);});
document.getElementById('btn-9').addEventListener('click', () => {replacing(true);});
