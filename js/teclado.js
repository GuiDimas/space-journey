// Teclas
var SETA_ESQUERDA = 37;
var SETA_DIREITA = 39;

// Classe
function Teclado(elemento) {
    this.elemento = elemento;
    
    // Array das teclas pressionadas
    this.pressionadas = [];
    
    // Registrando os estado das teclas no array
    var teclado = this;
    elemento.addEventListener('keydown', function(evento) {
        teclado.pressionadas[evento.keyCode] = true;
    });
    
    elemento.addEventListener('keyup', function(evento) {
        teclado.pressionadas[evento.keyCode] = false;
    });
}

Teclado.prototype = {
    pressionada: function(tecla) {
        return this.pressionadas[tecla];
    }
}