$(function () {
    window.qn = 5;
    initScore();
    nextQuestion();
});

function initScore() {
    $("#score").empty();
    for (var i = 0; i < window.qn; i++) {
        $("#score").append("<span class='score-glyph glyphicon glyphicon-star'></span>");
    }
    window.step = 0;
    window.ok = 0;
}

function nextQuestion() {
    var poem = window.poemPool[randomInt(window.poemPool.length)];
    $("#video").empty().append("<iframe width='420' height='315' class='embed-responsive-item' src='"+ poem.videoRef
    +"&showinfo=0&modestbranding=1&rel=0&fs=0&start=20' frameborder='0'></iframe>");

    $("#options").empty();
    for (var i = 0; i < poem.options.length; i++) {
        $("#options").append("<button type=button class='btn btn-success btn-lg "
        + (poem.correctKey === i ? "yes'" : "no'") + ">"+poem.options[i]+"</button>&nbsp;");
    }
    $(".btn.no").click(function () {
        new PNotify({
            title: window.errMessages[randomInt(window.errMessages.length)],
            text: "Ведь это же <a href='"+ poem.poetLink +"' target='_blank'>" +poem.options[poem.correctKey] + "</a>&nbsp;!",
            type: 'error',
            icon: 'glyphicon glyphicon-remove',
            buttons: {
                sticker: false,
                closer: false
            }
        });
        initScore();
        nextQuestion();
    });
    $(".btn.yes").click(function () {
        window.ok++;
        new PNotify({
            title: window.okMessages[randomInt(window.okMessages.length)],
            text: 'А стихи читал '+poem.actorName,
            type: 'success',
            buttons: {
                sticker: false,
                closer: false
            }
        });
        $(".score-glyph").eq(window.step).addClass("score-success");
        window.step++;
        if (window.step == window.qn) {
            show_stack_info();
        } else {
            nextQuestion();
        }
    });

    $('.container').hide().show(0);
}

function randomInt(n) {
    return Math.floor(Math.random() * n)
}

function show_stack_info() {
    var modal_overlay;
    if (typeof info_box != "undefined") {
        info_box.open();
        return;
    }
    info_box = new PNotify({
        title: 'Поздравляем!',
        text: "Вы отлично разбираетесь в русской поэзии! \n Вы можете \n &nbsp; <a href='index.html'>Сыграть еще раз</a> \n &nbsp; <a href='http:\\vk.com' target='_blank'>Рассказать друзьям</a>",
        type: 'success',
        icon: 'glyphicon glyphicon-flag',
        hide: false,
        stack: false,
        width: "500px",
        buttons: {
            closer: false,
            sticker: false
        },
        before_open: function(PNotify) {
            // Position this notice in the center of the screen.
            PNotify.get().css({
                "top": ($(window).height() / 2) - (PNotify.get().height() / 2),
                "left": ($(window).width() / 2) - (PNotify.get().width() / 2)
            });
            // Make a modal screen overlay.
            if (modal_overlay) modal_overlay.fadeIn("fast");
            else modal_overlay = $("<div />", {
                "class": "ui-widget-overlay",
                "css": {
                    "display": "none",
                    "position": "fixed",
                    "top": "0",
                    "bottom": "0",
                    "right": "0",
                    "left": "0"
                }
            }).appendTo("body").fadeIn("fast");
        },
        before_close: function() {
            modal_overlay.fadeOut("fast");
        }
    });
}