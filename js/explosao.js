// Som da explosao
var SOM_EXPLOSAO = new Audio();

// Setamos o caminho do arquivo
SOM_EXPLOSAO.src = 'assets/sounds/explosion.mp3';

// Definimos um volume
SOM_EXPLOSAO.volume = 0.2;

// Carregamos o som
SOM_EXPLOSAO.load();

function Explosao(context, imagem, x, y) {
    // Passamos o contexto para desenharmos no canvas
    this.context = context;
    
    // Passamos a imagem da explosao que será desenhada
    this.imagem = imagem;
    
    // Passamos as coordenadas em que a explosao ocorreu
    this.x = x;
    this.y = y;
    
    // Criamos o spritesheet
    this.spritesheet = new Spritesheet(context, imagem, 1, 17);
    
    // Definimos o intervalo de troca do spritesheet
    this.spritesheet.intervalo = 20;
    
    // Definimos uma variavel que receberá uma função
    // que deve ser executada assim que a explosao terminar
    this.fimDaExplosao = null;
    
    // Criamos uma variável para acessar a classe
    var explosao = this;
    
    // Definimos o callback que será executado após o fim da spritesheet
    this.spritesheet.fimDoCiclo = function() {
        // Requisitamos a exclusao do sprite da classe de animação
        explosao.animacao.excluirSprite(explosao);
        
        // Executamos a função de callback definida para o fim da explosao
        if (explosao.fimDaExplosao) explosao.fimDaExplosao();
    }
    
    // Reiniciamos o som
    SOM_EXPLOSAO.currentTime = 0.0;
    
    // Tocamos o som
    SOM_EXPLOSAO.play();
}

Explosao.prototype = {
    atualizar: function() {
        
    },
    
    desenhar: function(){
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    }
}