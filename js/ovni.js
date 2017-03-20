function Ovni(context, imagem) {
    // Passamos um contexto para desenhar o ovni na tela
    this.context = context;
    
    // Passamos a imagem do ovni que será desenhado na tela
    this.imagem = imagem;
    
    // Posicao do ovni na tela
    this.x = 0;
    this.y = 0;
    
    // Velocidade de movimento do ovni
    this.velocidade = 0;
}

Ovni.prototype = {
    atualizar: function() {
        // Incrementa a posição Y, fazendo- se mover para baixo
        this.y += this.velocidade;
        
        // Verifica se o sprite já pode ser excluído
        if (this.y > this.context.canvas.height) {
            // Executa a função de exclusao da animação
            this.animacao.excluirSprite(this);
            
            // Executa a função de exclusao do colisor
            this.colisor.excluirSprite(this);
        }
    },
    
    desenhar: function() {
        this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
    },
    
    retangulosColisao: function() {
        return [
            { x: this.x + 20, y: this.y + 1, largura: 25, altura: 10},
            { x: this.x + 2, y: this.y + 11, largura: 60, altura: 12},
            { x: this.x + 20, y: this.y + 23, largura: 25, altura: 7}
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
        
        return rets;
        */
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
        }
    }
}