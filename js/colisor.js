function Colisor(){
    // Array de sprites que devem ser processados pelo colisor
    this.sprites = [];
    
    // Inicializacao da funcao aoColidir
    this.aoColidir = null;
}

Colisor.prototype = {
    novoSprite: function(sprite) {
        // Adicionamos o novo sprite à lista de sprites
        this.sprites.push(sprite);
    },
    
    processar: function(){
        // Iniciamos um objeto vazio
        var jaTestados = new Object();
        
        // Para cada sprite no array
        for (var i in this.sprites) {
            // Testamos sua colisão com todos os outros sprites
            for (var j in this.sprites) {
                // Anula o teste de colisão com ele mesmo
                if (i == j) continue;
                
                // Geramos identificadores únicos para os sprites
                var id1 = this.stringUnica(this.sprites[i]);
                var id2 = this.stringUnica(this.sprites[j]);
                
                // Cria os arrays se não existirem
                if (!jaTestados[id1]) jaTestados[id1] = [];
                if (!jaTestados[id2]) jaTestados[id2] = [];
                
                // Realiza o teste de repetição
                if (!(jaTestados[id1].indexOf[id2] >= 0 || jaTestados[id2].indexOf[id1] >= 0)) {
                    // Realiza o teste de colisão entre os dois sprites
                    this.testarColisao(this.sprites[i], this.sprites[j]);
                    
                    // Adiciona os sprites no array de colisoes já testadas
                    jaTestados[id1].push(id2);
                    jaTestados[id2].push(id1);
                }                
            }
        }
    },
    
    testarColisao: function(sprite1, sprite2) {
        // Obtemos os retangulos de colisão de cada sprite
        var rets1 = sprite1.retangulosColisao();
        var rets2 = sprite2.retangulosColisao();
        
        // Realiza o teste de colisões entre os retângulos
        colisoes:
        // Para cada retangulo no sprite1
        for (var i in rets1) {
            // Para cada retangulo no sprite2
            for (var j in rets2) {
                // Realiza o teste de colisão entre os dois retangulos
                if (this.retangulosColidem(rets1[i], rets2[j])) {
                    // Avisa o sprite 1 que colidiu com o 2
                    sprite1.colidiuCom(sprite2);
                    
                    // Avisa o sprite 2 que colidiu com o 1
                    sprite2.colidiuCom(sprite1);
                    
                    // Chama o método de tratamento geral
                    if (this.aoColidir) this.aoColidir(sprite1, sprite2);
                    
                    // Dá um break para não ter que testar todas as outras colisões
                    break colisoes;
                }
            }
        }
    },
    
    retangulosColidem: function(ret1, ret2) {
        // Realiza o teste de interseção entre retângulos
        return (ret1.x + ret1.largura) > ret2.x && ret1.x < (ret2.x + ret2.largura) &&
                (ret1.y + ret1.altura) > ret2.y && ret1.y < (ret2.y + ret2.altura);
    },
    
    stringUnica: function(sprite) {
        // Criamos uma string vazia
        var str = '';
        
        // Capturamos os retangulos de colisão do sprite
        var retangulos = sprite.retangulosColisao();
        
        // Para cada retangulo de colisao
        for (var i in retangulos) {
            str += 'x:' + retangulos[i].x + ',' +
                   'y:' + retangulos[i].y + ',' +
                   'l:' + retangulos[i].largura + ',' +
                   'a:' + retangulos[i].altura + '\n';
        }
        
        // Retornamos a string unica
        return str;
    }
}