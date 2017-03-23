function Explosao(context, imagem, x, y) {
    // Passamos o contexto para desenharmos no canvas
    this.context = context;
    
    // Passamos a imagem da explosao que será desenhada
    this.imagem = imagem;
    
    // Passamos as coordenadas em que a explosao ocorreu
    this.x = x;
    this.y = y;
    
    // Criamos o spritesheet
    this.spritesheet = new Spritesheet(context, imagem, 1, 5);
    
    // Definimos o intervalo de troca do spritesheet
    this.spritesheet.intervalo = 75;
    
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
}

Explosao.prototype = {
    atualizar: function() {
        
    },
    
    desenhar: function(){
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    }
}