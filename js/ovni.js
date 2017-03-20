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
        this.y += this.velocidade;
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
        
    }
}