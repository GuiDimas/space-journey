function Painel(context, nave) {
    // Passamos o context para conseguirmos desenhar
    this.context = context;
    
    // Passamos a nave para pegar a quantidade de vidas
    this.nave = nave;
    
    // Spritesheet da nave
    this.spritesheet = new Spritesheet(context, nave.imagem, 3, 2);
    
    // Configuramos para a primeira linha da spritesheet
    this.spritesheet.linha = 0;
    
    // Configuramos para a primeira coluna da spritesheet
    this.spritesheet.coluna = 0;
}

Painel.prototype = {
    atualizar: function() {
        
    },
    
    desenhar: function() {
        // Salvamos a configuração do contexto
        this.context.save();
        
        // Escalamos o contexto para a metade do tamanho
        this.context.scale(0.5, 0.5);
        
        // Coordenadas onde começa o desenho das vidas
        var x = 20;
        var y = 20;
        
        // Para cada vida extra, desenhamos uma nave
        for (var i = 0; i < this.nave.vidasExtras; i++) {
            this.spritesheet.desenhar(x, y);
            x += 40;
        }
        
        // Restauramos a configuração do contexto
        this.context.restore();
    }
}