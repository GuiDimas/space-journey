function Ovni(context, imagem, imgExplosao) {
    // Passamos um contexto para desenhar o ovni na tela
    this.context = context;
    
    // Passamos a imagem do ovni que será desenhado na tela
    this.imagem = imagem;
    
    // Passamos a imagem da explosao da nave
    this.imgExplosao = imgExplosao;
    
    // Posicao do ovni na tela
    this.x = 0;
    this.y = 0;
    
    // Velocidade de movimento do ovni
    this.velocidade = 0;
    
    // Configuramos a spritesheet do ovni
    this.spritesheet = new Spritesheet(context, imagem, 1, 8);
    
    // Selecionamos a linha da spritesheet
    this.spritesheet.linha = 0;
    
    // Selecionamos o intervalo entre um frame e outro
    this.spritesheet.intervalo = 90;
}

Ovni.prototype = {
    atualizar: function() {
        // Incrementa a posição Y, fazendo- se mover para baixo, baseado no tempo
        this.y += this.velocidade * this.animacao.decorrido / 1000;
        
        // Verifica se o sprite já pode ser excluído
        if (this.y > this.context.canvas.height) {
            // Executa a função de exclusao da animação
            this.animacao.excluirSprite(this);
            
            // Executa a função de exclusao do colisor
            this.colisor.excluirSprite(this);
        }
    },
    
    desenhar: function() {
        //this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    },
    
    retangulosColisao: function() {
        return [
            { x: this.x + 27, y: this.y + 20, largura: 13, altura: 4},
            { x: this.x + 7, y: this.y + 24, largura: 52, altura: 9},
            { x: this.x + 14, y: this.y + 34, largura: 38, altura: 1},
            { x: this.x + 22, y: this.y + 35, largura: 22, altura: 1},
            { x: this.x + 26, y: this.y + 36, largura: 14, altura: 3},
            { x: this.x + 30, y: this.y + 40, largura: 7, altura: 14},
            { x: this.x + 33, y: this.y + 55, largura: 1, altura: 1}
        ];
        
        /* Para exibir os bounding-boxes de colisao 
            
        // Desenhamos os retangulos para melhor visualização
        var c = this.context;
        
        for (var i in rets) {
            c.save();
            c.strokeStyle = 'red';
            c.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
            c.restore();
        }
        
        return rets;*/   
    },
    
    colidiuCom: function(outro) {
        // Verifica se a colisao foi com um tiro
        if (outro instanceof Tiro) {
            // Executa a função de exclusao da animação deste ovni
            this.animacao.excluirSprite(this);
            
            // Executa a função de exclusao do colisor deste ovni
            this.colisor.excluirSprite(this);
            
            // Executa a função de exclusao da animação do tiro
            this.animacao.excluirSprite(outro);
            
            // Executa a função de exclusao do colisor do tiro
            this.colisor.excluirSprite(outro);
            
            // Criamos uma explosao
            var explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y);
            
            // Registramos a explosao na classe de animacao
            this.animacao.novoSprite(explosao);
        }
    }
}