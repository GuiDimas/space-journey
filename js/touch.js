var TOUCH_ESQUERDA = 1;
var TOUCH_DIREITA = 2;
var TOUCH_CIMA = 3;
var TOUCH_BAIXO = 4;

function Touch(elemento, tela) {
    // Passamos o elemento ao qual queremos atribuir o listener de touch
    this.elemento = elemento;
    
    // Passamos o elemento ao qual queremos referenciar a posição
    this.tela = tela;
    
    // Guardamos os dedos pressionados
    this.toque = null;
    
    // Variável do touch para acessar os atributos
    var touch = this;
    
    // Adicionamos o listener no elemento
    elemento.addEventListener('touchstart', function(evento) {
        touch.toque = evento.changedTouches[0];
        evento.preventDefault();
    });
    
    elemento.addEventListener('touchmove', function(evento) {
        touch.toque = evento.changedTouches[0];
        evento.preventDefault();
    });
    
    elemento.addEventListener('touchend', function(evento) {
        touch.toque = null;
        evento.preventDefault();
    });
}

Touch.prototype = {    
    reiniciar: function() {
        this.toque = null;
    }
}