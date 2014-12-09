$(function () {
    nextQuestion();
});

var nextQuestion = function() {
    var poem = window.poemPool[randomInt(window.poemPool.length)];
    $("#video").empty().append("<iframe width=420 height=315 class='embed-responsive-item' src='"+ poem.videoRef
    +"&showinfo=0&modestbranding=1&rel=0&fs=0&start=20' frameborder='0'></iframe>");

    $("#options").empty();
    for (var i = 0; i < poem.options.length; i++) {
        $("#options").append("<button type=button class='btn btn-success btn-lg "
        + (poem.correctKey === i ? "yes'" : "no'") + ">"+poem.options[i]+"</button>&nbsp;");
    }
    $(".btn.no").click(function () {
        new PNotify({
            title: window.errMessages[randomInt(window.errMessages.length)],
            text: 'Это же '+poem.options[poem.correctKey] +'!',
            type: 'error',
            icon: 'glyphicon glyphicon-remove'
        });
        nextQuestion();
    });
    $(".btn.yes").click(function () {
        new PNotify({
            title: window.okMessages[randomInt(window.okMessages.length)],
            text: 'А стихи читал '+poem.actorName,
            type: 'success'
        });
        nextQuestion();
    });

    $('.container').hide().show(0);
};

var randomInt = function(n) {
    return Math.floor(Math.random() * n)
};