function Tiro(context, nave){
    // Passamos um contexto para podermos desenhar no canvas
    this.context = context;
    
    // Passamos a nave para calcular o ponto de início do tiro
    this.nave = nave;
    
    // Largura e altura da bala
    this.largura = 3;
    this.altura = 15;
    
    // Posiciona o tiro no bico da nave
    this.x = nave.x + nave.imagem.width / 2 - this.largura / 2;
    this.y = nave.y;
    
    // Velocidade da bala
    this.velocidade = 10;
    
    // Cor do tiro
    this.cor = 'yellow';
}

Tiro.prototype = {
    atualizar: function() {
        // Subtraimos Y para a bala subir
        this.y -= this.velocidade;
    },
    
    desenhar: function() {
        // Variavel do context, para facilitar a escrita
        var c = this.context;
        
        // Salvamos as configurações do contexto
        c.save();
        
        // Setamos a cor
        c.fillStyle = this.cor;
        
        // Desenhamos o tiro
        c.fillRect(this.x, this.y, this.largura, this.altura);
        
        // Restauramos as configurações para não perder o contexto anterior
        c.restore();
    }
}