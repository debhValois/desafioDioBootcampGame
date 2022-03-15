// Desafio DIO | HTML Web Developer | Jogo da Cobrinha | Debh Valois | 15/03/2022 
// OLÁ UNIVERSO LINDO!!!!! <🚀>Bootcamp Game<🚀>

window.onload = function () {

    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");
    let imagemBackground = new Image();
    imagemBackground.src = "./img/bg-image.jpg";
    let imageTarget = new Image();
    imageTarget.src = "./img/imageTarget.png";
    document.addEventListener("keydown", keyPush); // input das teclas utilizadas
    setInterval(game, 120); //velocidade do jogo 
    const vel = 1; // movimente de 1 em 1 casa
    var vx = 0; // velocidade x 
    var vy = 0; // velocidade y
    var px = 1; // posição x inicial do caminho
    var py = 1; // posição y inicial do caminho
    var tp = 30; // tamanho de cada quadradinho
    var qp = 20; // quantidade de quadradinhos
    var ax = 15; // posição x inicial do alvo
    var ay = 15; // posição y inicial do alvo
    var trail = []; // rastro começa como array vazia
    tail = 5; // tamanho inicia com 5

    function game() {
        // TODA VEZ QUE O RASTRO PASSAR DAS BORDAS, ELE SERÁ ENVIADO PARA A BORDA OPOSTA.
        px += vx;
        py += vy;
        if (px < 0) {
            px = qp - 1;
        }
        if (px > qp - 1) {
            px = 0;
        }
        if (py < 0) {
            py = qp - 1;
        }
        if (py > qp - 1) {
            py = 0;
        }

        // OBS: TODA VEZ QUE O CAMINHO ANDAR UM POUCO, VAI REPITAR TODA A PARTE DA TELA.
        // IMAGEM DE TELA = GALAXIA
        ctx.fillRect(0, 0, stage.width, stage.height);
        ctx.drawImage(imagemBackground, 0, 0); // RECEBE A IMAGEM

        // ALVO = FOGUETINHO
        ctx.fillStyle = "rgba(74, 35, 90, 0)"; // COR DO ALVO
        ctx.fillRect(ax * tp, ay * tp, tp, tp);
        ctx.drawImage(imageTarget, ax * tp, ay * tp); // RECEBE A IMAGEM 

        // PINTAR RASTRO DO CAMINHO
        ctx.fillStyle = "rgba(124, 252, 0, 0.9)"; // COR DO RASTRO #7CFC00 
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);

            // VERIFICA SE O CAMINHO BATE NELE MESMO
            if (trail[i].x == px && trail[i].y == py) {
                vx = vy = 0;
                tail = 5;
            }
        }

        // CRIAR MOVIMENTO DO CAMINHO
        trail.push({ x: px, y: py })
        while (trail.length > tail) {
            trail.shift();
        }

        // AUMENTA O CAMINHO
        if (ax == px && ay == py) {
            tail++;
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }
    }

    // FUNÇÃO PARA IDENTIFICAR QUAL TECLA FOI PRESSIONADA
    function keyPush(event) {
        switch (event.keyCode) {
            case 37: // TECLA LEFT
                vx = -vel;
                vy = 0;
                break;
            case 38: // TECLA UP
                vx = 0;
                vy = -vel;
                break;
            case 39: // TECLA RIGHT
                vx = vel;
                vy = 0;
                break;
            case 40: // TECL DOWN
                vx = 0;
                vy = vel;
                break;
            default:

                break;
        }
    }
}