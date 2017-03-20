function Animacao(context) {
    // Passamos um contexto para podermos limpar a tela
    this.context = context;
    
    // Cria um array de sprites para armazenar os elementos da tela
    this.sprites = [];
    
    // Variavel para definir se a animação estará ligada ou desligada
    this.ligado = false;
    
    // Array de tarefas a serem processadas
    this.processamentos = [];
    
    // Array de elementos que podem ser excluidos
    this.spritesExcluir = [];
    
    // Array de processamentos para a exclusão
    this.processamentosExcluir = [];
    
}

Animacao.prototype = {
    novoSprite: function(sprite) {
        // Adiciona um novo elemento no array de sprites
        this.sprites.push(sprite);
        
        // Refenciamos essa classe no atributo animação
        // do sprite passado por parâmetro
        sprite.animacao = this;
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
        // Depreciado: Como as imagens de fundo são redesenhadas a todo momento
        //             não é mais necessário limpar a tela a cada novo ciclo.
        //this.limparTela();
        
        // Para cada sprite, chamamos o metodo que atulizada o estado dos mesmos
        // Como se fosse o "próximo frame" para aquele sprite
        for (var i in this.sprites)
            this.sprites[i].atualizar();
        
        // Desenha cada sprite na sua nova posição/frame.
        for (var i in this.sprites)
            this.sprites[i].desenhar();
        
        // Executa os processamentos gerais
        for (var i in this.processamentos)
            this.processamentos[i].processar();
        
        // Chama a função para processar as exclusões
        this.processarExclusoes();
        
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
    },
    
    novoProcessamento: function(processamento) {
        this.processamentos.push(processamento);
        // Definimos o atributo animação do parametro
        // processamento como sendo a classe de animação
        processamento.animacao = this;
    },
    
    exlcuirSprite: function(sprite) {
        // Adicionamos o sprite que queremos exluir
        // na lista de exclusao
        this.spritesExcluir.push(sprite);
    },
    
    excluirProcessamento: function(processamento) {
        // Adicionamos o processamento que queremos exluir
        // na lista de exclusao
        this.processamentosExcluir.push(processamento);
    },
    
    processarExclusoes: function() {
        // Criamos novos arrays
        var novoSprites = [];
        var novoProcessamentos = [];
        
        // Adicionamos apenas se não estiver na lista para exclusão
        for (var i in this.sprites) {
            if (this.spritesExcluir.indexOf(this.sprites[i]) == -1) novoSprites.push(this.sprites[i]);
        }
        
        for (var i in this.processamentos) {
            if (this.processamentosExcluir.indexOf(this.processamentos[i]) == -1) novoProcessamentos.push(this.processamentos[i]);
        }
        
        // Faz a limpeza dos arrays de exclusões
        this.spritesExcluir = [];
        this.processamentosExcluir = [];
        
        // Substitui os arrays antigos pelos novos
        this.sprites = novoSprites;
        this.processamentos = novoProcessamentos;
    }
}