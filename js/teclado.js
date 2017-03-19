// Códigos das teclas que podem ser usadas
var SETA_ESQUERDA = 37;
var SETA_DIREITA = 39;
var ESPACO = 32;

function Teclado(elemento){
    // Passamos o elemento qual queremos atribuir um listener
    this.elemento = elemento;
    
    // Array que guarda as teclas pressionadas no momento
    this.pressionadas = [];
    
    // Array que guarda as teclas que foram disparadas com suas funções
    this.disparadas = [];
    
    // Array com todas as funções de disparo das teclas respectivas
    this.funcoesDisparo = [];
    
    // Variavel da classe para acessar os atributos
    var teclado = this;
    
    // Adiciona o listener no keydown do elemento
    elemento.addEventListener('keydown', function(evento) {
        // Armazena o keycode da tecla
        var tecla = evento.keyCode;
        
        // Registra a tecla como pressionada no array
        teclado.pressionadas[tecla] = true;
        
        // Dispara a função de disparo da tecla apenas se for o
        // primeiro keydown da mesma.
        // Verificação:
        //   - Se existir uma função de disparo para a tecla 
        //     E
        //   - A tecla não tiver sido disparada ainda
        if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {
            // Registra a tecla como disparada, assim só é executada a
            // função de disparo uma vez
            teclado.disparadas[tecla] = true;
            
            // Executa a função de disparo da tecla
            teclado.funcoesDisparo[tecla]();
        }
    });
    
    // Adiciona o listener no keyup do elemento
    elemento.addEventListener('keyup', function(evento) {
        // Registra a tecla como não pressionada mais
        teclado.pressionadas[evento.keyCode] = false;
        
        // Registra a tecla como não disparada para poder
        // ser disparada novamente
        teclado.disparadas[evento.keyCode] = false;
    });
}

Teclado.prototype = {
    pressionada: function(tecla){
        // Retorna o boolean que diz se a tecla está
        // ou não pressionada no momento
        return this.pressionadas[tecla];
    },
    
    disparou: function(tecla, callback){
        // Registra a função de disparo para a tecla
        this.funcoesDisparo[tecla] = callback;
    }
}