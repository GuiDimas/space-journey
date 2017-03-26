// Som do tiro
var SOM_NAVE = new Audio();

// Setamos o caminho do arquivo
SOM_NAVE.src = 'assets/sounds/spaceship.mp3';

// Definimos um volume
SOM_NAVE.volume = 0.05;

// Setamos como loop
SOM_NAVE.loop = true;

// Carregamos o som
SOM_NAVE.load();

function Nave(context, teclado, imagem, imgExplosao) {
    // Passamos o contexto para desenhar no canvas
    this.context = context;
    
    // Passamos o teclado para capturar os botoes
    this.teclado = teclado;
    
    // Passamos a imagem para carregar no canvas
    this.imagem = imagem;
    
    // Passamos a imagem da explosao que será executada
    this.imgExplosao = imgExplosao;
    
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
    
    // Reiniciamos o som
    SOM_NAVE.currentTime = 0.0;
    
    // Tocamos o som
    //SOM_NAVE.play();
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
        
        if (this.teclado.pressionada(SETA_CIMA) || this.teclado.pressionada(SETA_ESQUERDA) || this.teclado.pressionada(SETA_DIREITA)) {
            if (SOM_NAVE.volume < 0.4) SOM_NAVE.volume += 0.01;
        } else if (this.teclado.pressionada(SETA_BAIXO)) {
            if (SOM_NAVE.volume > 0.035) SOM_NAVE.volume -= 0.01;
        } else {
            if (SOM_NAVE.volume > 0.05) SOM_NAVE.volume -= 0.008;
            else if (SOM_NAVE.volume < 0.05) SOM_NAVE.volume += 0.008;
        }
    },
    
    desenhar: function() {
        // Lemos qual tecla está pressionada
        if (this.teclado.pressionada(SETA_ESQUERDA)) this.spritesheet.linha = 1;
        else if (this.teclado.pressionada(SETA_DIREITA)) this.spritesheet.linha = 2;    
        else this.spritesheet.linha = 0;
        
        // Desenhamos a nave no canvas
        this.spritesheet.desenhar(this.x, this.y);
        
        // Verifica se está indo para trás
        if (this.teclado.pressionada(SETA_BAIXO)) {
            this.spritesheet.coluna = 1;
        } else {
            this.spritesheet.proximoQuadro();
        }
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
            // Pausamos os sons antes de exlcuir a nave
            SOM_NAVE.pause();
            
            // Excluimos a nave e o ovni da animação
            this.animacao.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            
            // Excluimos a nave e o ovni do colisor
            this.colisor.excluirSprite(this);
            this.colisor.excluirSprite(outro);
            
            // Criamos 2 explosoes
            var explosao1 = new Explosao(this.context, this.imgExplosao, this.x, this.y);
            var explosao2 = new Explosao(this.context, this.imgExplosao, outro.x, outro.y);
            
            // Registramos as explosoes para serem exibidas
            this.animacao.novoSprite(explosao1);
            this.animacao.novoSprite(explosao2);
            
            // Registramos um callback para quando a segunda explosao terminar,
            // mostrar a mensagem de game over
            explosao1.fimDaExplosao = function() {
                // Para  animação
                this.animacao.desligar();
                
                // Mensagem de game over
                //alert('GAME OVER');
            }
        }
    }
}