function Animacao(context){
    this.context = context;
    this.sprites = [];
    this.ligado = false;
}

Animacao.prototype = {
    novoSprite: function(sprite) {
        this.sprites.push(sprite);
    },
    
    ligar: function() {
        this.ligado = true;
        this.proximoFrame();
    },
    
    desligar: function() {
        this.ligado = false;
    },
    
    proximoFrame: function() {
        // Verifica se pode continuar
        if (!this.ligado) return;
        
        // Limpa a tela a cada ciclo
        this.limparTela();
        
        // Atualizamos os estados os sprites
        for (var i in this.sprites)
            this.sprites[i].atualizar();
        
        // Desenhamos os sprites
        for (var i in this.sprites)
            this.sprites[i].desenhar();
        
        // Chamamos o proximo ciclo
        var animacao = this;
        requestAnimationFrame(function() {
           animacao.proximoFrame(); 
        });
    },
    
    limparTela: function() {
        var ctx = this.context;
        // Limpa o canvas do contexto
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}