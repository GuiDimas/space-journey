function Tiro(context, nave){
    // Passamos um contexto para podermos desenhar no canvas
    this.context = context;
    
    // Passamos a nave para calcular o ponto de início do tiro
    this.nave = nave;
    
    // Largura e altura da bala
    this.largura = 3;
    this.altura = 15;
    
    // Posiciona o tiro no bico da nave (36px que é a larg da img / 2 = 18)
    this.x = nave.x + 18 - this.largura / 2;
    this.y = nave.y;
    
    // Velocidade da bala
    this.velocidade = 700;
    
    // Cor do tiro
    this.cor = 'yellow';
}

Tiro.prototype = {
    atualizar: function() {
        // Subtraimos Y para a bala subir, baseado no tempo
        this.y -= this.velocidade * this.animacao.decorrido / 1000;
        
        // Verifica se pode ser excluido
        if (this.y < -this.altura) {
            // Executa a função de exclusao da animação
            this.animacao.excluirSprite(this);
            
            // Executa a função de exclusao do colisor
            this.colisor.excluirSprite(this);
        }
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
    },
    
    retangulosColisao: function() {
        return [
            {
                x: this.x,
                y: this.y,
                largura: this.largura,
                altura: this.altura
            }
        ];
    },
    
    colidiuCom: function(outro) {
        
    }
}