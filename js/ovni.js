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
    }
}