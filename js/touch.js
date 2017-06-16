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
    this.tocadas = [];
    
    // Variável do touch para acessar os atributos
    var touch = this;
    
    // Adicionamos o listener no elemento
    elemento.addEventListener('touchstart', function(evento) {
        // Testamos a esquerda
        for (var i in evento.changedTouches) {
            touch.tocadas[TOUCH_ESQUERDA] = (evento.changedTouches[i].clientX < (tela.innerWidth / 2));
            if (touch.tocadas[TOUCH_ESQUERDA]) break;
        }
        
        // Testamos a direita
        for (var i in evento.changedTouches) {
            touch.tocadas[TOUCH_DIREITA] = (evento.changedTouches[i].clientX > (tela.innerWidth / 2));
            if (touch.tocadas[TOUCH_DIREITA]) break;
        }
        
        // Testamos a cima
        for (var i in evento.changedTouches) {
            touch.tocadas[TOUCH_CIMA] = (evento.changedTouches[i].clientY < (tela.innerHeight / 2));
            if (touch.tocadas[TOUCH_CIMA]) break;
        }
        
        // Testamos a baixo
        for (var i in evento.changedTouches) {
            touch.tocadas[TOUCH_BAIXO] = (evento.changedTouches[i].clientY > (tela.innerHeight / 2));
            if (touch.tocadas[TOUCH_BAIXO]) break;
        }
        
        console.log(touch.tocadas);
        
        evento.preventDefault();
    });
    
    elemento.addEventListener('touchend', function(evento) {
        for (var i in touch.tocadas) {
            touch.tocadas[i] = false;
        }
        evento.preventDefault();
    });
}

Touch.prototype = {
    tocando: function(posicao) {
        return this.tocadas[posicao];
    },
    
    reiniciar: function() {
        for (var i in this.tocadas) {
            //touch.tocadas[i] = false;
        }
    }
}