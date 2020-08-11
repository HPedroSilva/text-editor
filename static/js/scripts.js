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
// Não funciona bem quando a string subs é maior do que a que estava no seu lugar, pois ela irá substituir, e se for maior vai consumir as prócimas palavras.
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
    var startSel = text.startSel;

    if (startSel != -1) {
        newText = text.selection;    
    } else {
        newText = text.text;
        startSel = 0;
        newText = subsStr(newText, 0, newText[0].toUpperCase()); // Colocando a primeira letra da frase em maiúscula.
    }

    for(let i in separators) {
        endPh = finder(newText, separators[parseInt(i)].text);        
        for(let j in endPh) {
            let index = endPh[parseInt(j)] + separators[parseInt(i)].len; // O endPh[j] tem o índice do separador, mas o que desejamos substituir é a primeira letra após esse separador por isso a soma.          
            if(index < newText.length) {
                newText = subsStr(newText, index, newText[index].toUpperCase());
            }
        }
    }

    setText(subsStr(text.text, startSel, newText)); 
}

function upperWords() {
    var text = getText(true);
    var spaces;
    var newText;
    var startSel = text.startSel;

    if (startSel != -1) {
        newText = text.selection;    
    } else {
        newText = text.text;
        startSel = 0;
    }

    spaces = finder(newText, ' ');
    wraps = finder(newText, '\n');

    list = spaces.concat(wraps);

     // Primeira letra
     if(startSel == 0 || text.text[startSel - 1] == ' ') {
         list.push(-1); //Primeira letra do texto (0) - 1, pois vai ser utilizado como um espaço.
     }

    for(var i in list) {
        let index = list[parseInt(i)] + 1;
        if(index < newText.length) {
            newText = subsStr(newText, index, newText[index].toUpperCase());
        }            
    }

    setText(subsStr(text.text, startSel, newText)); 
}

function alternateLetters() {
    var text = getText(true);
    var newText;
    var startSel = text.startSel;

    if (startSel != -1) {
        newText = text.selection;    
    } else {
        newText = text.text;
        startSel = 0;
    }

    for(var i in newText) {
        if(parseInt(i) % 2 == 0) {
            newText = subsStr(newText, parseInt(i), newText[parseInt(i)].toUpperCase());
        }        
    }

    setText(subsStr(text.text, startSel, newText));        
}

function alternateWords() {
    var text = getText(true);
    var spaces;
    var newText;
    var startSel = text.startSel;

    if (startSel != -1) {
        newText = text.selection;    
    } else {
        newText = text.text;
        startSel = 0;
    }

    spaces = finder(newText, ' ');

    for(var i in spaces) {
        let index = spaces[parseInt(i)] + 1;
       
        if(parseInt(i) % 2 == 0) {
            let tam;

            if(parseInt(i) == spaces.length - 1) {
                tam = newText.length - spaces[parseInt(i)] - 1;                
            } else {
                tam = spaces[parseInt(i) + 1] - spaces[parseInt(i)] - 1;
            }

            newText = subsStr(newText, index, newText.substr(index, tam).toUpperCase());        
        }           
    }

    setText(subsStr(text.text, startSel, newText)); 
}

function alternate() {
    
    var text = getText(true);
    var newText;
    var startSel = text.startSel;

    if (startSel != -1) {
        newText = text.selection;    
    } else {
        newText = text.text;
        startSel = 0;
    }

    for(var i in newText) {
        let letter = newText[parseInt(i)];
        if(letter.toLowerCase() == letter) {
            newText = subsStr(newText, parseInt(i), letter.toUpperCase());            
        } else {
            newText = subsStr(newText, parseInt(i), letter.toLowerCase());        
        }
    }

    setText(subsStr(text.text, startSel, newText)); 
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

// ----- Whatsapp Formatter -----------
function wtsFormat(mark) {

    var text = getText(true);
    var newText;
    var startSel = text.startSel;

    if (startSel != -1) {
        newText = text.selection;    
    } else {
       alert("Select some text!")
       return false
    }

    ntLength = newText.length;
    newText = mark + newText + mark;

    setText( text.text.slice(0, startSel) + newText + text.text.slice(startSel + ntLength, text.text.length) ); 
    updatePreview();
}

function tagInsert(str, ini, end, tag) { // Insere a tag na posição ini e end da string str substituindo o cód referente à essa tag na str
    return ini > str.length ? str : str.slice(0, ini) + tag[1] + str.slice(ini + tag[3], end) + tag[2] + str.slice(end + tag[3], str.length);
}

function updatePreview() { // Quando uma modificação no texto for feita pelo wtsFormat ela é chamada recebendo o marcador (mark) utilizado.
    var tags = [["\\*", "<b>", "</b>", 1], ["\_", "<i>", "</i>", 1], ["\~", "<s>", "</s>", 1], ["```", "<code>", "</code>", 3]];
    
    var text = getText(true);
    var newText = text.text;
    var ini = -1;
    var count;
    
    for (var j in tags) {
        var listTags = finder(newText, tags[parseInt(j)][0]);
        count = 0;           
        for (var i in listTags) { 
            if(ini == -1) {
                ini = listTags[parseInt(i)];
            } else {
                newText = tagInsert(newText, ini + count, listTags[parseInt(i)] + count, tags[parseInt(j)]);
                count += tags[parseInt(j)][1].length + tags[parseInt(j)][2].length - tags[parseInt(j)][3] * 2;                                
                ini = -1;                
            }            
        }
    }

    var a = document.getElementById('wtsPreview');
    a.innerHTML = newText;
    a.style = 'display: block';
    document.getElementById('mainText').style.height = "50%";
    setText(newText);
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

document.getElementById('wts-btn-1').addEventListener('click', () => {wtsFormat("_");});
document.getElementById('wts-btn-2').addEventListener('click', () => {wtsFormat("*");});
document.getElementById('wts-btn-3').addEventListener('click', () => {wtsFormat("~");});
document.getElementById('wts-btn-4').addEventListener('click', () => {wtsFormat("```");});
