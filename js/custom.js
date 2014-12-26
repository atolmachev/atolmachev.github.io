$(function () {
    window.qn = 5;
    window.qpoems = get_random_poems(window.qn);

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
    var q = window.qpoems[window.step];
    var poem = window.poemPool[q];
    $("#video").empty().append("<iframe width='420' height='315' class='embed-responsive-item' src='"+ poem.videoRef
    +"&showinfo=0&modestbranding=1&rel=0&fs=0&start=20' frameborder='0'></iframe>");

    $("#options").empty();
    for (var i = 0; i < poem.options.length; i++) {
        $("#options").append("<button id='"+i*q+"' type='button' class='btn btn-primary btn-lg "
        + (poem.correctKey === i ? "yes'" : "no'") + ">"+poem.options[i]+"</button>&nbsp;");
    }
    $(".btn.no").click(function () {
        show_answer(window.errMessages[randomInt(window.errMessages.length)],
            "Ведь это же <a href='"+ poem.poetLink +"' target='_blank'>" +poem.options[poem.correctKey] + "</a>&nbsp;!",
            'error', 'glyphicon glyphicon-exclamation-sign');
        initScore();
        nextQuestion();
    });
    $(".btn.yes").click(function () {
        window.ok++;
        show_answer(window.okMessages[randomInt(window.okMessages.length)], 'А стихи читал '+poem.actorName, 'success',
        'glyphicon glyphicon-ok-sign');
        $(".score-glyph").eq(window.step).addClass("score-success");
        window.step++;
        if (window.step == window.qn) {
            show_congtrats();
        } else {
            setTimeout(function(){nextQuestion();}, 1000);
        }
    });

    $('.container').hide().show(0);
}

function randomInt(n) {
    return Math.floor(Math.random() * n)
}

function show_congtrats() {
    new PNotify({
        title: 'Поздравляем!',
        text: "Вы отлично разбираетесь в русской поэзии! \n Вы можете \n &nbsp; <a href='index.html'>Сыграть еще раз</a> \n &nbsp; <a href='http:\\vk.com' target='_blank'>Рассказать друзьям</a>",
        type: 'success',
        icon: 'glyphicon glyphicon-flag',
        hide: false,
        stack: false,
        width: "350px",
        buttons: {
            closer: false,
            sticker: false
        },
        before_open: function(PNotify) {
            // Position this notice in the center of the screen.
            PNotify.get().css({
                "top": (2 * $(window).height() / 5) - (PNotify.get().height() / 2),
                "left": ($(window).width() / 2) - (PNotify.get().width() / 2)
            });
            // Make a modal screen overlay.
            var modal_overlay = $("<div />", {
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
        }
    });
}

function show_answer(title, text, type, icon) {
    var stack_bar_bottom = {"dir1": "up", "dir2": "right", "spacing1": 0, "spacing2": 0};
    new PNotify({
        title: title,
        text: text,
        type: type,
        icon: icon,
        delay: 2000,
        addclass: "stack-bar-bottom",
        buttons: {
            sticker: false,
            closer: false
        },
        stack: stack_bar_bottom,
        before_open: function(PNotify) {
            // Position this notice in the center of the screen.
            PNotify.get().css({
                "left": ($(window).width() / 2) - (PNotify.get().width() / 2),
                "top": $(".footer").offset() - 10
            });
        }
    });
}

function get_random_poems(n) {
    var array = [];
    for (var i = 0; i < window.poemPool.length; i++) {
        array[i] = i;
    }
    array = shuffle(array);
    return array.slice(0, n);
}


function shuffle(array) {
    var out = array;
    for (var i = array.length-1; i >= 0; i--) {
        var r = Math.floor(Math.random() * (i+1));

        var temp = out[i];
        out[i] = out[r];
        out[r] = temp;
    }
    return out;
}
