// Variaveis para guardar a direção atual do herói
var DIRECAO_ESQUERDA = 1;
var DIRECAO_DIREITA = 2;

function Heroi(context, teclado, animacao) {
    // Passamos o contexto para podermos desenhar na tela
    this.context = context;
    
    // Passamos o teclado para capturamos as teclas pressionadas
    this.teclado = teclado;
    
    // Passamos a animação para adicionarmos novos elementos na tela (tiros)
    this.animacao = animacao;
    
    // Posicao X do nosso herói no canvas
    this.x = 0;
    
    // Posicao Y do nosso herói no canvas
    this.y = 0;
    
    // Direção do nosso heroi com valor padrao para a direita
    this.direcao = DIRECAO_DIREITA;
}

Heroi.prototype = {
    atualizar: function() {
        // Verifica se a tecla para a esquerda está pressionada
        // e se o herói está dentro do limite à esqueda do canvas
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
            // Marca a direção como sendo para a esqueda
            this.direcao = DIRECAO_ESQUERDA;
            
            // Move a posição X do personagem subtraindo um valor
            this.x -= 10;
        
        // Verifica se a tecla para a direita está pressionada
        // e se o herói está dentro do limite à direita do canvas
        // subtraindo 20px, que é a lagura do nosso herói quadrado
        } else if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 20) {
            // Marca a direção como sendo para a direita
            this.direcao = DIRECAO_DIREITA;
            
            // Move a posição X do personagem adicionando um valor
            this.x += 10;
        }
    },
    
    desenhar: function() {
        // Desenha nosso herói na tela, no caso um quadrado preto
        this.context.fillRect(this.x, this.y, 20, 50);
    },
    
    atirar: function() {
        // Cria um objeto bola que será nosso tiro
        var tiro = new Bola(this.context);
        
        // Define a posição x do nosso tiro para a mesma do herói + 10
        // para não sair do meio dele ou de longe
        tiro.x = this.x + 10;
        
        // Define a posição y do nosso tiro para a mesma do herói + 10
        // para o tiro não sair "da cabeça" dele.
        tiro.y = this.y + 10;
        
        // Define o raio do nosso tiro
        tiro.raio = 2;
        
        // Define uma cor para o nosso tiro
        tiro.cor = 'red';
        
        // Verifica a posição em que o herói está
        if (this.direcao == DIRECAO_ESQUERDA)
            // Define a velocidade de movimento do tiro em X para -20
            // fazendo-o andar para a esquerda
            tiro.velocidadeX = -20;
        else
            // Define a velocidade de movimento do tiro em X para 20
            // fazendo-o andar para a direita
            tiro.velocidadeX = 20;
        
        // Registra o tiro para ser desenhado na classe de animação
        this.animacao.novoSprite(tiro);
    }
}