// Variáveis de estado do Sonic
var SONIC_DIREITA = 1;
var SONIC_ESQUERDA = 2;

function Sonic(context, teclado, imagem){
    // Passamos o contexto para podermos desenhar na tela
    this.context = context;
    
    // Passamos o teclado para capturarmos as teclas pressionadas
    this.teclado = teclado;
    
    // Passamos a imagem já carregada para colocarmos uma tela de loading
    this.imagem = imagem;
    
    // Posição inicial X
    this.x = 0;
    
    // Posição inicial Y
    this.y = 0;
    
    // Com imagem já carregada, criamos o objeto Spritesheet
    this.sheet = new Spritesheet(context, imagem, 3, 8);
    
    // Definimos o intervalo entre os frames
    this.sheet.intervalo = 60;
    
    // Estado inicial para o atributo andando
    this.andando = false;
    
    // Direção inicial do Sonic
    this.direcao = SONIC_DIREITA;
    
    // Velocidade de deslocamento do sonic
    this.velocidade = 10;
}

Sonic.prototype = {
    atualizar: function() {
        // Verifica se a seta para a direita está pressionada
        if (this.teclado.pressionada(SETA_DIREITA)) {
            // Verifica se o sonic está parado ou se a direção não está para a direita
            if (!this.andando || this.direcao != SONIC_DIREITA) {
                // Selecionamos a linha da spritesheet com a animação correndo para a direita
                this.sheet.linha = 1;
                // Selecionamos a coluna da spritesheet que inicia a animação
                this.sheet.coluna = 0;
            }
            
            // Definimos que o sonic agora está correndo
            this.andando = true;
            
            // Definimos o sentido para o qual ele está correndo
            this.direcao = SONIC_DIREITA;
            
            // Chamamos o próximo quadro da spritesheet
            this.sheet.proximoQuadro();
            
            // Movimentamos o Sonic
            this.x += this.velocidade;
        
        // Verifica se a seta para a esquerda está pressionada
        } else if (this.teclado.pressionada(SETA_ESQUERDA)) {
            // Verifica se o sonic está parado ou se a direção não está para a esquerda
            if (!this.andando || this.direcao != SONIC_ESQUERDA) {
                // Selecionamos a linha da spritesheet com a animação correndo para a esquerda
                this.sheet.linha = 2;
                // Selecionamos a coluna da spritesheet que inicia a animação
                this.sheet.coluna = 0;
            }
            
            // Definimos que o sonic está correndo
            this.andando = true;
            
            // Definimos o sentido para o qual ele está correndo
            this.direcao = SONIC_ESQUERDA;
            
            // Chamamos o próximo quadro da spritesheet
            this.sheet.proximoQuadro();
            
            // Movimentamos o Sonic
            this.x -= this.velocidade;
        
        // Caso nenhuma tecla esteja pressionada
        } else {
            
            // Caso o sonic esteja virado para a direita
            if (this.direcao == SONIC_DIREITA) {
                // Selecionamos a coluna da spritesheet que contem o sonic parado para a direita
                this.sheet.coluna = 0;
            // Caso o sonic esteja virado para a esquerda
            } else if (this.direcao == SONIC_ESQUERDA) {
                // Selecionamos a coluna da spritesheet que contem o sonic parado para a esquerda
                this.sheet.coluna = 1;
            }
            
            // Selecionamos a linha da spritesheet que contém o sonic parado
            this.sheet.linha = 0;
            
            // Resetamos a variável andando
            this.andando = false;
        }
    },
    desenhar: function() {
        this.sheet.desenhar(this.x, this.y);
    }
}