function Bola(context){
    this.context = context;
    this.x = 0;
    this.y = 0;
    this.velocidadeX = 0;
    this.velocidadeY = 0;
    
    // Atributos de desenho padrao
    this.cor = 'black';
    this.raio = 10;
}

Bola.prototype = {
    desenhar: function() {
        // Contexto
        var c = this.context;
        
        // Guarda as configuracoes atuais do contexto
        c.save();
        
        // Configa a cor
        c.fillStyle = this.cor;
        
        // Desenha a bola
        c.beginPath();
        c.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, false);
        c.fill();
        
        // Volta as configuracoes anteriores
        c.restore();
    },
    
    atualizar: function() {
        // Contexto
        var c = this.context;
        
        // Estourou o limite da borda horizontal
        if (this.x < this.raio || this.x > c.canvas.width - this.raio)
            this.velocidadeX *= -1;
        
        // Estourou o limite da borda vertical
        if (this.y < this.raio || this.y > c.canvas.height - this.raio)
            this.velocidadeY *= -1;
        
        // Move a bola
        this.x +=  this.velocidadeX;
        this.y +=  this.velocidadeY;
    }
}