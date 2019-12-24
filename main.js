$(document).ready(function() {

    $(function() {
      var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0;
      slideCount = $('.slide').length;

      $('.slide').on('mousedown touchstart', slideStart);
      $('.slide').on('mouseup touchend', slideEnd);
      $('.slide').on('mousemove touchmove', slide);

      /**
      Triggers when slide event started
      */
      function slideStart(event) {
        // If it is mobile device redefine event to first touch point
        if (event.originalEvent.touches)
          event = event.originalEvent.touches[0];
        // If sliding not started yet store current touch position to calculate distance in future.
        if (sliding == 0) {
          sliding = 1; // Status 1 = slide started.
          startClientX = event.clientX;
        }
      }

      /** Occurs when image is being slid.
      */
      function slide(event) {
        event.preventDefault();
        if (event.originalEvent.touches)
          event = event.originalEvent.touches[0];
        // Distance of slide.
        var deltaSlide = event.clientX - startClientX;
        // If sliding started first time and there was a distance.
        if (sliding == 1 && deltaSlide != 0) {
          sliding = 2; // Set status to 'actually moving'
          startPixelOffset = pixelOffset; // Store current offset
        }

        //  When user move image
        if (sliding == 2) {
          // Means that user slide 1 pixel for every 1 pixel of mouse movement.
          var touchPixelRatio = 1;
          // Check for user doesn't slide out of boundaries
          if ((currentSlide == 0 && event.clientX > startClientX) ||
             (currentSlide == slideCount - 1 && event.clientX < startClientX))
            // Set ratio to 3 means image will be moving by 3 pixels each time user moves it's pointer by 1 pixel. (Rubber-band effect)
            touchPixelRatio = 3;
          // Calculate move distance.
          pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
          // Apply moving and remove animation class
          $('#slider').css('transform', 'translateX(' + pixelOffset + 'px').removeClass();
        }
      }

      /** When user release pointer finish slide moving.
      */
      function slideEnd(event) {
        if (sliding == 2){
          // Reset sliding.
          sliding = 0;
          // Calculate which slide need to be in view.
          currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide -1;
          // Make sure that unexisting slides weren't selected.
          currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
          // Since in this example slide is full viewport width offset can be calculated according to it.
          pixelOffset = currentSlide * -$('body').width();
          // Remove style from DOM (look below)
          $('#temp').remove();
          // Add a translate rule dynamically and asign id to it
          $('<style id="temp">#slider.animate{transform:translateX(' + pixelOffset + 'px)}</style>').appendTo('head');
          // Add animate class to slider and reset transform prop of this class.
          $('#slider').addClass('animate').css('transform', '');
        }
      }
    });

    $('.next').click(function() {

        // immagine corrente
        var img_corrente = $('.slide.active');
        // pallino corrente
        var pallino_corrente = $('i.active');

        // recupero l'immagine successiva
        var img_successiva = img_corrente.next('.slide');
        // recupero il pallino successivo
        var pallino_successivo = pallino_corrente.next('i');

        if(img_successiva.length == 0) {
            // se non c'è un img successiva => recupero la prima!
            img_successiva = $('.slide.first');
            // se non c'è un pallino successivo => recupero il primo!
            pallino_successivo = $('i.first');
        }


        // toglo la classe active all'img corrente => diventa con display none
        img_corrente.removeClass('active');
        // toglo la classe active al pallino corrente => riprende il colore di default
        pallino_corrente.removeClass('active');

        // aggiungo la classe active all'img successiva => viene visualizzata
        img_successiva.addClass('active');
        // aggiungo la classe active al pallino successivo => diventa rosso
        pallino_successivo.addClass('active');

    });

    $('.prev').click(function() {
        // immagine corrente
        var img_corrente = $('.slide.active');
        // pallino corrente
        var pallino_corrente = $('i.active');

        // recupero l'immagine precedente
        var img_precedente = img_corrente.prev('.slide');
        // recupero il pallino precedente
        var pallino_precedente = pallino_corrente.prev('i');

        if(img_precedente.length == 0) {
            // se non c'è un img precedente => recupero l'ultima!
            img_precedente = $('.slide.last');
            // se non c'è un pallino precedente => recupero l'ultimo!
            pallino_precedente = $('.slide.last');
        }

        // toglo la classe active all'img corrente => diventa con display none
        img_corrente.removeClass('active');
        // toglo la classe active al pallino corrente => ritorna grigio
        pallino_corrente.removeClass('active');

        // aggiungo la classe active all'img precedente => viene visualizzata
        img_precedente.addClass('active');
        // aggiungo la classe active al pallino precedente => diventa rosso
        pallino_precedente.addClass('active');
    });


    var clock = setInterval(function() {
        var img_corrente = $('.slide.active');
        var pallino_corrente = $('i.active');
        var img_successiva = img_corrente.next('.slide');
        var pallino_successivo = pallino_corrente.next('i');
        if(img_successiva.length == 0) {
            img_successiva = $('.slide.first');
            pallino_successivo = $('i.first');
        }
       img_corrente.removeClass('active');
       pallino_corrente.removeClass('active');
       img_successiva.addClass('active');
       pallino_successivo.addClass('active');
   },3000);

    $('img, i').click(function() {
        clearInterval(clock);
    });

    //Bonus: cliccando sul pallino si apre img corrispondente
    $('.fas.fa-circle').click(function(){
        //prendo l'i del pallino
        var indexBullet = $(this).index();
        console.log('hai cliccato sul pallino in posizione: ' + indexBullet);

        var bulletCurrent = $('i.active');
        bulletCurrent.removeClass('active');
        $(this).addClass('active');

        //deve diventare active la img con i uguale a indexBullet
        var fotoCurrent = $('.slide.active');
        fotoCurrent.removeClass('active');
        var fotoCorrispondente = $('#slider .slide').eq(indexBullet);
        fotoCorrispondente.addClass('active');
    });

});

//QUERY string funziona per il GET ma non si può usare per tutti i metodi
//Con le password in GET chiunque la può leggere

//preparo la funzione per il template di handlebars
// var source = $('#any-template').html();
// var template = Handlebars.compile(source);


//preparo le variabili per il template di handlebars
// var context = {
//     copertina: "Img/Ten_Summoner's_Tales.jpg",
//     titolo: "New Jersey",
//     artista: "Bon Jovi",
//     anno: "1988" };
// var html = template(context);
//
// //appendo l'html compilato con le variabili
// $('#dischi').append(html);

// chiamata ajax per recuperare i dicshi da visualizzare
// $.ajax({
//     'url': 'insert-url',
//     'method': 'get',
//     'success': function(data) {
//         //recupero l'array che contiene tutti i dischi
//         var x = data.response;
//         console.log(data.response);
//         console.log(x);
//         //ciclo tutte le x
//         for (var i = 0; i < x.length; i++) {
//             //per ogni disco recupero le varie informazione /artista, disco img di copertina ecc)
//
//             var singleX = x[i];
//             console.log(singleX);
//
//             //for in serve per stampare generalmente
//             // for (var chiave in disco) {
//             //     console.log(chiave + ': ' + disco[chiave]);
//             // }
//             var keywordTwo = singleX.poster;
//             var keywordThree = singleX.title;
//             var keywordFour = singleX.author;
//             var keywordFive = singleX.year;
//             var keywordOne = singleX.genre;
//             //creo le variabili di handlebars
//
//             var context = {
//                 htmlKeywordTwo: keywordTwo,
//                 htmlKeywordThree: keywordThree,
//                 htmlKeywordFour: keywordFour,
//                 htmlKeywordFive: keywordFive,
//                 htmlKeywordOne: keywordOne,
//             };
//
//             //creo il template
//             var html = template(context);
//
//             // appendo l'html compilato con le variabili
//             // lo appendo al container dei dischi
//             $('#dischi').append(html);
//
//         }
//     },
//     'error': function() {
//         alert('errore');
//     }
// });

//https://flynn.boolean.careers/exercises/api/array/music
//https://bitbucket.org/booleancareers/ex-dischi-musicali-layout/src/master/
