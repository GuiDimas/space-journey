function Bomba(context, imagem, imgExplosao) {
    // Passamos um contexto para desenhar a bomba na tela
    this.context = context;
    
    // Passamos a imagem do ovni que será desenhado na tela
    this.imagem = imagem;
    
    // Passamos a imagem da explosao da bomba
    this.imgExplosao = imgExplosao;
    
    // Posicao da bomba na tela
    this.x = 0;
    this.y = 0;
    
    // velocidade de movimento da bomba em Y
    this.velocidadeY = 0;
    
    // velocidade de movimento da bomba em X
    this.velocidadeX = 5;
    
    // Configuramos a spritesheet da bomba
    this.spritesheet = new Spritesheet(context, imagem, 1, 2);
    
    // Selecionamos a linha da spritesheet
    this.spritesheet.linha = 0;
    
    // Definimos o intervalo entre um frame e outro
    this.spritesheet.intervalo = 200;
}

Bomba.prototype = {
    atualizar: function() {
        // Incrementa a posição Y, fazendo- se mover para baixo, baseado no tempo
        this.y += this.velocidadeY * this.animacao.decorrido / 1000;
        
        // Faz o bouncing da bomba
        if (this.x + this.velocidadeX < 0 || this.x + this.imagem.width / 2 + this.velocidadeX > this.context.canvas.width) this.velocidadeX *= -1;
        
        // Velocidade em X
        this.x += this.velocidadeX;
        
        // Verifica se o sprite já pode ser excluído
        if (this.y > this.context.canvas.height) {
            // Executa a função de exclusao da animação
            this.animacao.excluirSprite(this);
            
            // Executa a função de exclusao do colisor
            this.colisor.excluirSprite(this);
        }
    },
    
    desenhar: function() {
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
        //this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
    },
    
    retangulosColisao: function() {
        return [
            // Ponta esquerda up
            { x: this.x + 14, y: this.y + 12, largura: 5, altura: 5 },
            { x: this.x + 12, y: this.y + 11, largura: 1, altura: 1 },
            
            // Ponta direita up
            { x: this.x + 46, y: this.y + 12, largura: 5, altura: 5 },
            { x: this.x + 52, y: this.y + 11, largura: 1, altura: 1 },
            
            // Ponta esquerda down
            { x: this.x + 14, y: this.y + 45, largura: 5, altura: 5 },
            { x: this.x + 12, y: this.y + 51, largura: 1, altura: 1 },
            
            // Ponta direita down
            { x: this.x + 46, y: this.y + 45, largura: 5, altura: 5 },
            { x: this.x + 52, y: this.y + 51, largura: 1, altura: 1 },
            
            // Meio cima-baixo
            { x: this.x + this.imagem.width / 4 - 1, y: this.y + 1, largura: 1, altura: this.imagem.height - 1 },
            { x: this.x + this.imagem.width / 4 - 2, y: this.y + 8, largura: 3, altura: this.imagem.height - 16 },
            
            // Meio esquerda-direita
            { x: this.x + 1, y: this.y + this.imagem.height / 2 - 2, largura: this.imagem.width / 2 - 1, altura: 1 },
            { x: this.x + 9, y: this.y + this.imagem.height / 2 - 3, largura: this.imagem.width / 2 - 18, altura: 4 },
            
            // Meio
            { x: this.x + 18, y: this.y + 20, largura: 27, altura: 23 }
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
            // Executa a função de exclusao da animação desta bomba
            this.animacao.excluirSprite(this);
            
            // Executa a função de exclusao do colisor desta bomba
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