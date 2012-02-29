/**
 * Logica de referencia: Simon Battersby
 * @see http://www.simonbattersby.com/blog/jquery-endless-slider/
 */
$(document).ready(function(){
    
    var slideWidth = $('.content-slider-slide').first().outerWidth();
    var slideCount = $('.content-slider-slide').length;
    
    $('#content-slider').width(slideWidth * (slideCount + 2));
    
    $('.content-slider-slide').first().addClass('content-slider-first-slide');
    $('.content-slider-slide').last().addClass('content-slider-last-slide');
    
    $('.content-slider-first-slide').clone().appendTo('#content-slider');
    $('.content-slider-last-slide').clone().prependTo('#content-slider');
    
    $('#content-slider').css({'left': - 1 * slideWidth + 'px'});
    
    var buttonsNumber = slideCount;
    while ( buttonsNumber > 0 ) {
        $('#content-slider-controls').prepend(
            '<li><a class="content-slider-quickly-access-button" id="slider-go-to-' + buttonsNumber + '" href="#ir-para-o-slide- ' + buttonsNumber + ' " title="Ir para o Slide ' + buttonsNumber + '">o</a></li>'
        );
        buttonsNumber = buttonsNumber - 1;
    }
    
    var slidingAnimationTime = 600;
    var slidePassInterval    = 5000;
    
    var sliding = setInterval(function() {
        startSliding();
    }, slidePassInterval);
    
    function startSliding() {
        $('#content-slider').stop(true, true);
        var slideTo = Math.round( $('#content-slider').position().left ) - (1 * slideWidth);
        $('#content-slider').delay(200).animate({'left' : slideTo + 'px'}, slidingAnimationTime, function() {
            if ( Math.abs(slideTo) == ((slideCount + 1) * slideWidth) ) {
                $('#content-slider').css({'left': - 1 * slideWidth + 'px'});
            }
        });
    }
    
    $('.content-slider-quickly-access-button').click(function() {                
        var slideNumber = this.id.substr( - 1);                
        slideTo(slideNumber);    
        return false;
    });
    
    function slideTo(position) {

        var slideTo = - ( position * slideWidth );
        var reset   = slideTo + slideWidth;

        $('#content-slider').stop(true, true);
        $('#content-slider').css({'left':reset + 'px'});

        $('#content-slider')
            .animate( {'left':slideTo + 'px'}, 
                slidingAnimationTime, 
                function(){
                    if (Math.abs(slideTo) == ((slideCount + 1) * slideWidth)) {
                            $('#content-slider')
                                    .css({'left': - 1 * slideWidth + 'px'});
                    }
                    clearInterval(sliding);
                    sliding = setInterval(function(){startSliding()}, slidePassInterval);
                });	
    }
    
    $('#content-slider-next-button').click(function() {
        $('#content-slider').stop(true, true);
        clearInterval(sliding);
        var slideTo = Math.round( $('#content-slider').position().left ) - (1 * slideWidth);
        $('#content-slider').delay(200).animate({'left' : slideTo + 'px'}, slidingAnimationTime, function() {
            if ( Math.abs(slideTo) == ((slideCount + 1) * slideWidth) ) {
                $('#content-slider').css({'left': - 1 * slideWidth + 'px'});
            }
            sliding = setInterval(function() {
                startSliding();
            }, slidePassInterval);
        });
        return false;
    });
    
    $('#content-slider-previous-button').click(function() {
        $('#content-slider').stop(true,true);
        clearInterval(sliding);
        var slideTo = Math.round( $('#content-slider').position().left ) + (1 * slideWidth);
        $('#content-slider').delay(200).animate({'left' : slideTo + 'px'}, slidingAnimationTime, function() {
            if ( Math.abs(slideTo) == (0) ) {
                $('#content-slider').css({'left': - (slideCount) * slideWidth + 'px'});
            }
            sliding = setInterval(function() {
                startSliding();
            }, slidePassInterval);
        });
        return false;
    });
    
    $('#content-slider-pause-button').click(function() {
        $('#content-slider').stop(true,true);
        clearInterval(sliding);
        $('#content-slider-status').text('Pausado').fadeIn('slow');
        return false;
    });
    
    $('#content-slider-play-button').click(function() {
        sliding = setInterval(function() {
            startSliding();
        }, slidePassInterval);
        $('#content-slider-status').fadeOut('slow', function() {
            $('#content-slider-status').text('Passando Slides').fadeIn('slow', function() {
                $('#content-slider-status').delay(5000).fadeOut('slow')
            });
        });
        return false;
    });
    
});