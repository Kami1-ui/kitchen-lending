

/*
Скролл
*/
function scroll_top() {
    if ($(window).scrollTop() == 0) {
        $('.header').css('background', 'rgba(56, 55, 55, 0.9)');
    } else {
        $('.header').css('background', '#383737');
    }
}
scroll_top();

$(window).scroll(function () {
    scroll_top();
});

/*
Картинка фоном
*/
function ibg() {
    $.each($('.ibg'), function (index, val) {
        if ($(this).find('img').length > 0) {
            $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
        }
    });
}
ibg();

$(document).ready(function () {
    /*
    Меню бургер
    */

    $('.header__burger,.header__item').click(function (event) {
        $('.header__burger,.header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });



    /*
    Слайдер
    */

    $('.slider').slick({
        arrows: false,
        dots: true,
        //adeptiveHight: true, //flex-start
        speed: 500,
        //easing: 'ease',
        //autoplay: true,
        autoplaySpeed: 500,
    });

    $('.comments__slider').slick({
        arrows: false,
        dots: true,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        speed: 500,
        autoplaySpeed: 500,
    });


});


/*Якори*/
(function (document, history, location) {
    var HISTORY_SUPPORT = !!(history && history.pushState);

    var anchorScrolls = {
        ANCHOR_REGEX: /^#[^ ]+$/,
        //OFFSET_HEIGHT_PX: 100,

        /**
         * Establish events, and fix initial scroll position if a hash is provided.
         */
        init: function () {
            this.scrollToCurrent();
            $(window).on('hashchange', $.proxy(this, 'scrollToCurrent'));
            $('body').on('click', 'a', $.proxy(this, 'delegateAnchors'));
        },

        /**
         * Return the offset amount to deduct from the normal scroll position.
         * Modify as appropriate to allow for dynamic calculations
         */
        getFixedOffset: function () {
            return $("header").height();//this.OFFSET_HEIGHT_PX;
        },

        /**
         * If the provided href is an anchor which resolves to an element on the
         * page, scroll to it.
         * @param  {String} href
         * @return {Boolean} - Was the href an anchor.
         */
        scrollIfAnchor: function (href, pushToHistory) {
            var match, anchorOffset;

            if (!this.ANCHOR_REGEX.test(href)) {
                return false;
            }

            match = document.getElementById(href.slice(1));

            if (match) {
                anchorOffset = $(match).offset().top - this.getFixedOffset();
                $('html, body').animate({ scrollTop: anchorOffset });

                // Add the state to history as-per normal anchor links
                if (HISTORY_SUPPORT && pushToHistory) {
                    history.pushState({}, document.title, location.pathname + href);
                }
            }

            return !!match;
        },

        /**
         * Attempt to scroll to the current location's hash.
         */
        scrollToCurrent: function (e) {
            if (this.scrollIfAnchor(window.location.hash) && e) {
                e.preventDefault();
            }
        },

        /**
         * If the click event's target was an anchor, fix the scroll position.
         */
        delegateAnchors: function (e) {
            var elem = e.target;

            if (this.scrollIfAnchor(elem.getAttribute('href'), true)) {
                e.preventDefault();
            }
        }
    };

    $(document).ready($.proxy(anchorScrolls, 'init'));
})(window.document, window.history, window.location);




