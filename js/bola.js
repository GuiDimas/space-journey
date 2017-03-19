function Bola(context) {
    // Passamos um contexto para conseguirmos desenhar a bola
    this.context = context;
    
    // Posição X que a bola estará no canvas
    this.x = 0;
    
    // Posição Y que a bola estará no canvas
    this.y = 0;
    
    // Velocidade de movimento no eixo X
    this.velocidadeX = 0;
    
    // Velocidade de movimento no eixo Y
    this.velocidadeY = 0;
    
    // Atributos com valores padrões (para não desenhar "nada" na tela)
    
    // Cor da bola
    this.cor = 'black';
    
    // Raio da bola
    this.raio = 10;
}

Bola.prototype = {
    atualizar: function() {
        // "Anda com a posição da bola em X"
        this.x += this.velocidadeX;
        // "Anda com a posição da bola em Y"
        this.y += this.velocidadeY;
    },
    
    desenhar: function() {
        // Variavel do contexto para facilitar a escrita
        var c = this.context;
        
        // Guarda as configurações do contexto para não serem sobrescritas
        // Como a cor, borda entre outros.
        c.save();
        
        // Muda a cor da bola
        c.fillStyle = this.cor;
        
        // Inicia o pincel
        c.beginPath();
        
        // Define as configurações do arco
        c.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, false);
        
        // Faz o desenho da bola
        c.fill();
        
        // Restaura as configurações do contexto para as "originais"
        c.restore();
    }
}