function Fundo(context, imagem) {
    this.context = context;
    this.imagem = imagem;
    this.velocidade = 0;
    this.posicaoEmenda = 0;
}

Fundo.prototype = {
    atualizar: function() {
        // Somamos a velocidade à posição da emenda calculada com base nos ciclos
        this.posicaoEmenda += this.velocidade * this.animacao.decorrido / 1000;
        
        // Verifica se a emenda passou da posição
        if (this.posicaoEmenda > this.imagem.height)
            this.posicaoEmenda = 0;
    },
    
    desenhar: function() {
        // Criamos uma variavel menor para facilitar a escrita
        var img = this.imagem;
        
        // Fazemos uma primeira cópia da imagem
        var posicaoY = this.posicaoEmenda - img.height;
        this.context.drawImage(img, 0, posicaoY, img.width, img.height);
        
        // E a segunda cópia
        posicaoY = this.posicaoEmenda;
        this.context.drawImage(img, 0, posicaoY, img.width, img.height);
    }
}