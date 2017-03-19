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
    // Interface  de animação
    atualizar: function() {
        // Contexto
        var c = this.context;
        
        // Estourou o limite da borda horizontal
        if (this.x < this.raio || this.x > c.canvas.width - this.raio)
            this.velocidadeX *= -1;
        
        // Estourou o limite da borda vertical
        if (this.y < this.raio || this.y > c.canvas.height - this.raio)
            this.velocidadeY *= -1;

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
    },
    
    // Interface de colisão
    retangulosColisao: function() {
        // Retornamos um objeto anonimo dentro de um array
        return [
            {
                x: this.x - this.raio, // this.x é o centro da bola
                y: this.y - this.raio, // mesma coisa com o this.y
                largura: this.raio * 2,
                altura: this.raio * 2
            }
        ];
    },
    
    colidiuCom: function(sprite) {
        // Verifica se a bola está à esqueda da outra
        if (this.x < sprite.x) this.velocidadeX = -Math.abs(this.velocidadeX);
        else this.velocidadeX = Math.abs(this.velocidadeX);
        
        // Verifica se a bola está acima da outra
        if (this.y < sprite.y) this.velocidadeY = -Math.abs(this.velocidadeY);
        else this.velocidadeY = Math.abs(this.velocidadeY);
    }
}