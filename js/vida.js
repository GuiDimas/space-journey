function Vida(context, imagem) {
    // Passamos um contexto para desenharmos
    this.context = context;
    
    // Passamos a imagem da vida
    this.imagem = imagem;
    
    // Definimos a posição x
    this.x = 0;
    
    // Definimos a posição y
    this.y = 0;
    
    // Definimos uma velocidade padrão
    this.velocidade = 150;
}

Vida.prototype = {
    atualizar: function() {
        // Acrescentamos em y a velocidade baseada no tempo
        this.y += this.velocidade * this.animacao.decorrido / 1000;
        
        // Caso a vida tenha passado do limite inferior
        if (this.y > this.context.canvas.height) {
            // Adicionamos ela na lista de exclusão
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    
    desenhar: function() {
        // Desenhamos a imagem, nu e crua.
        this.context.drawImage(this.imagem, this.x, this.y);
    },
    
    retangulosColisao: function() {
        return [
            { x: this.x + 18, y: this.y + 3, largura: 1, altura: 3 },
            { x: this.x + 16, y: this.y + 5, largura: 4, altura: 8 },
            { x: this.x + 15, y: this.y + 15, largura: 6, altura: 15 },
            { x: this.x + 7, y: this.y + 23, largura: 2, altura: 6 },
            { x: this.x + 11, y: this.y + 20, largura: 4, altura: 9 },
            { x: this.x + 22, y: this.y + 20, largura: 4, altura: 9 },
            { x: this.x + 27, y: this.y + 23, largura: 2, altura: 6 }
        ];
        
        /*Para exibir os bounding-boxes de colisao
            
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
        // Verifica se a colisao ocorreu com um ovini
        if (outro instanceof Nave) {
            // Excluimos a instancia da vida
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    }
}