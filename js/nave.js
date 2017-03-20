function Nave(context, teclado, imagem) {
    // Passamos o contexto para desenhar no canvas
    this.context = context;
    
    // Passamos o teclado para capturar os botoes
    this.teclado = teclado;
    
    // Passamos a imagem para carregar no canvas
    this.imagem = imagem;
    
    // Posicao de inicio em X
    this.x = 0;
    
    // Posicao de inicio em Y
    this.y = 0;
    
    // Velocidade de movimento da nave
    this.velocidade = 0;
}

Nave.prototype = {
    atualizar: function(){
        // Se pressionarmos a seta para cima
        if (this.teclado.pressionada(SETA_CIMA) && this.y > 5) {
            // Decrementamos Y para ir para cima
            this.y -= this.velocidade;
        }
        
        // Se pressionarmos a tecla para baixo
        if (this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - this.imagem.height - 5) {
            // Incrementamos Y para ir para baixo
            this.y += this.velocidade;
        }
        
        // Se pressionarmos a tecla para a esquerda
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 5) {
            // Decrementamos X para ir para a esquerda
            this.x -= this.velocidade;
        
        }
        
        // Se pressionarmos a tecla para a direita
        if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - this.imagem.width - 5) {
            // Incrementamos X para ir para a direita
            this.x += this.velocidade;
        }
    },
    
    desenhar: function() {
        // Desenhamos a nave no canvas
        this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
    },
    
    atirar: function() {
        // Criamos o objeto Tiro
        var t = new Tiro(this.context, this);
        
        // Adicionamos o tiro criado como um novo sprite
        this.animacao.novoSprite(t);
        
        // Registramos o tiro na classe colisor
        this.colisor.novoSprite(t);
    },
    
    retangulosColisao: function() {
        return [
            { x: this.x + 2, y: this.y + 19, largura: 9, altura: 13 },
            { x: this.x + 17, y: this.y + 4, largura: 2, altura: 2 },
            { x: this.x + 14, y: this.y + 8, largura: 8, altura: 6 },
            { x: this.x + 13, y: this.y + 15, largura: 10, altura: 23 },
            { x: this.x + 25, y: this.y + 19, largura: 9, altura: 13 }
        ];
    },
    
    colidiuCom: function(outro) {
        // Verifica se a colisao ocorreu com um ovini
        if (outro instanceof Ovni) {
            // Desativa a animação
            this.animacao.desligar();
            // Alerta de game over
            alert('GAME OVER!');
        }
    }
}