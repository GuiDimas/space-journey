function Spritesheet(context, imagem, linhas, colunas){
    this.context = context;
    this.imagem = imagem;
    this.numLinhas = linhas;
    this.numColunas = colunas;
    this.intervalo = 0;
    this.linha = 0;
    this.coluna = 0;
    this.ultimoTempo = 0;
}

Spritesheet.prototype = {
    proximoQuadro: function() {
        // Quarda o momento atual
        var agora = new Date().getTime();
        
        // Verifica se ainda não tem um ultimo tempo medido
        if (!this.ultimoTempo) this.ultimoTempo = agora;
        
        // Verifica se já é hora de mudar a posição X (mudar de coluna)
        // Caso não seja, retorna antes de fazer a mudança
        if (agora - this.ultimoTempo < this.intervalo) return;
        
        // Se a coluna não estiver excedendo o limite da imagem, incrementa
        if (this.coluna < this.numColunas - 1)
            // Incrementa a coluna, para o próximo frame ser desenhado
            this.coluna++;
        // Senão reseta a coluna
        else
            // Reseta a coluna para reiniciar a animação
            this.coluna = 0;
        
        // Guarda a hora da ultima mudanca no atributo
        this.ultimoTempo = agora;
    },
    desenhar: function(x, y) {
        // Calcula a largura de cada quadro
        var larguraQuadro = this.imagem.width / this.numColunas;
        
        // Calcula a altura de cada quadro
        var alturaQuadro = this.imagem.height / this.numLinhas;
        
        // Desenha na posição passada por parametro
        // o frame atual
        this.context.drawImage(this.imagem, larguraQuadro * this.coluna, alturaQuadro * this.linha, larguraQuadro, alturaQuadro, x, y, larguraQuadro, alturaQuadro);
        
    }
}