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
    
    // Configuramos a spritesheet da nave
    this.spritesheet = new Spritesheet(context, imagem, 3, 2);
    
    // Selecionamos a linha da spritesheet
    this.spritesheet.linha = 0;
    
    // Selecionamos o intervalo entre um frame e outro
    this.spritesheet.intervalo = 100;
}

Nave.prototype = {
    atualizar: function(){
        // Variavel baseada no tempo para incremento
        var incremento = this.velocidade * this.animacao.decorrido / 1000;
        
        // Se pressionarmos a seta para cima
        if (this.teclado.pressionada(SETA_CIMA) && this.y > 5) {
            // Decrementamos Y para ir para cima
            this.y -= incremento;
        }
        
        // Se pressionarmos a tecla para baixo                                         // .- Tamanho da imagem
        if (this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - 48 - 5) {
            // Incrementamos Y para ir para baixo
            this.y += incremento;
        }
        
        // Se pressionarmos a tecla para a esquerda
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 5) {
            // Decrementamos X para ir para a esquerda
            this.x -= incremento;      
        }
        
        // Se pressionarmos a tecla para a direita                                      // .- Tamanho da imagem
        if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 36 - 5) {
            // Incrementamos X para ir para a direita
            this.x += incremento;
        }
    },
    
    desenhar: function() {
        // Lemos qual tecla está pressionada
        if (this.teclado.pressionada(SETA_ESQUERDA)) this.spritesheet.linha = 1;
        else if (this.teclado.pressionada(SETA_DIREITA)) this.spritesheet.linha = 2;    
        else this.spritesheet.linha = 0;
        
        // Desenhamos a nave no canvas
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
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