// Som do tiro
var SOM_TIRO = new Audio();

// Setamos o caminho do arquivo
SOM_TIRO.src = 'assets/sounds/fire.mp3';

// Definimos um volume
SOM_TIRO.volume = 0.05;

// Carregamos o som
SOM_TIRO.load();

function Tiro(context, nave, imagem){
    // Passamos um contexto para podermos desenhar no canvas
    this.context = context;
    
    // Passamos a nave para calcular o ponto de início do tiro
    this.nave = nave;
    
    // Passamo a imagem do tiro, para desenharmos na tela
    this.imagem = imagem;
    
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
    
    // Reiniciamos o som
    SOM_TIRO.currentTime = 0.0;
    
    // Tocamos o som
    SOM_TIRO.play();
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
        // Desenhamos o tiro na tela
        this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
    },
    
    retangulosColisao: function() {
        return [
                { x: this.x + 2, y: this.y + 4, largura: 2, altura: 4 },
                { x: this.x + this.imagem.width / 2 - 1, y: this.y + 2, largura: 2, altura: this.imagem.height - 7 },
                { x: this.x + this.imagem.width / 2 + 1, y: this.y + 4, largura: 2, altura: 4 },
        ];
    },
    
    colidiuCom: function(outro) {
        
    }
}