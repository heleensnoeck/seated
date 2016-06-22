// Adding Counter [Preview-2]
$(document).ready(function(){

    // book


    $('.book, .remove').click(function (e) {
        e.stopPropagation();
    });

    //om full text in html te plaatse  
    $('.book').click(function () {
        var increased = $('.number').text();
        if (increased == 15) {
            $('.number').html().replace('full'); 
        } else {

        }
    });

    $('.book').click(function () {
        $('.remove').removeClass('hide');
        $('.book').addClass('hide');
        var increased = $('.number').text();
        if (isNaN(increased) || increased > 0) {
            $('.number').html(function (k, val) {
                return val * 1 - 1
            });
        } 
    });

    $('.remove').click(function () {
      $('.remove').addClass('hide');
      $('.book').removeClass('hide');
      $('.number').html(function (p, val) {
          return val * 1 + 1
      });
    });

    // agenda
     $("#01-12-15").click(function() {
       if (document.getElementById("01-12-15").checked) {
          $(".book_desk , .vacation , .reset").removeClass('hide');
      // not gonna work
          $(".book_desk , .vacation , .reset").removeClass(".book_desk , .vacation , .reset").addClass(".book_desk , .vacation , .reset");
       } else {
          $(".book_desk , .vacation , .reset").addClass('hide');
       }
    })

    $('.book_desk').click(function(e) {
        e.preventDefault();
      $('.vink_book').removeClass('hide');
      $('.vink_book').removeClass('vink').addClass('vink');
      $('.vink_reset').addClass('hide');
    });

    $('.vacation').click(function(e) {
        e.preventDefault();
      $('.vink_vacation').removeClass('hide');
      $('.vink_vacation').removeClass('vink').addClass('vink');
      $('.vink_reset').addClass('hide');
    });


    $('.reset').click(function() {
      $('.vink_reset').removeClass('hide');
      $('.vink_book').addClass('hide');
      $('.vink_vacation').addClass('hide');
      $('.vink_reset').removeClass('vink').addClass('vink'); 
    });

});

