function Animacao(context) {
    // Passamos um contexto para podermos limpar a tela
    this.context = context;
    
    // Cria um array de sprites para armazenar os elementos da tela
    this.sprites = [];
    
    // Variavel para definir se a animação estará ligada ou desligada
    this.ligado = false;
}

Animacao.prototype = {
    novoSprite: function(sprite) {
        // Adiciona um novo elemento no array de sprites
        this.sprites.push(sprite);
    },
    
    ligar: function() {
        // Define a animação como ligada
        this.ligado = true;
        
        // Chama o próximo frame para atualizar a tela
        this.proximoFrame();
    },
    
    desligar: function() {
        // Define a animação como desligada
        this.ligado = false;
    },
    
    proximoFrame: function() {
        // Verifica se está ligada a animação para atulizar
        if (!this.ligado) return;
        
        // Limpa a tela para o próximo frame (a cada ciclo)
        this.limparTela();
        
        // Para cada sprite, chamamos o metodo que atulizada o estado dos mesmos
        // Como se fosse o "próximo frame" para aquele sprite
        for (var i in this.sprites)
            this.sprites[i].atualizar();
        
        // Desenha cada sprite na sua nova posição/frame.
        for (var i in this.sprites)
            this.sprites[i].desenhar();
        
        // Chamamos o próximo ciclo com o requestAnimationFrame
        // Foi definido assim, pois não podemos invocar a função proximoFrame()
        // Diretamente dentro do requestAminationFrame
        var animacao = this;
        requestAnimationFrame(function() {
            animacao.proximoFrame();
        });
    },
    
    limparTela: function() {
        // Facilita a escrita
        var c = this.context;
        
        // Apaga todo o quadrado ocupado pelo canvas
        c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    }
}