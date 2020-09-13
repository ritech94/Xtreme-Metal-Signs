// Fade Functions
function fadeIn(el) {
    el.classList.add('show');
    el.classList.remove('hide');
}
function fadeOut(el) {
    el.classList.add('hide');
    el.classList.remove('show');
}

// Navbar and Footer Objects
let nav = document.getElementById('navController');
let footer = document.getElementById('footerController');

// Control .navbar and footer visibility by scrolling
(function($) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var landingHeight = 10;
    } else {
        var landingHeight = 50;
    }

    console.log(landingHeight);

    $(document).ready(function() {
        nav.classList.add('visible');
        footer.classList.add('visible');

        if ($(window).scrollTop() > landingHeight) {
            fadeIn(nav);
            fadeIn(footer);
        }

        $(window).scroll(function() {
            if ($(this).scrollTop() > landingHeight) {
                fadeIn(nav);
                fadeIn(footer);
            } else {
                fadeOut(nav);
                fadeOut(footer);
            }
        });
    });
})(jQuery);

$(document).ready(() => {
    // Auto Populate Copyright Year
    let year = new Date().getFullYear();
    $('#year').text(year);
})

// Auto-Detect Text Change
$('#stencil_phrase_input').on('keyup', () => {
    let phrase = $('#stencil_phrase_input').val();
    $('#stencil_text_container span').text(phrase);

    if (phrase === '') {
        $('#stencil_text_container span').text('Name goes here...');
    }
})

// Auto-Detect Select Change
$('#design_select').on('change', () => {
    let val = $('#design_select').val();
    let img_src = val !== '' && val < 7 ? `./assets/Horse${val}.png` : `./assets/Horse1.png`;
    $('#stencil_image').attr('src', img_src);
})

// Smooth Scroll to Anchor
$('.navbar a[href*="#"]').on('click', function(event) {
    if (this.hash != "") {
        event.preventDefault();
        $('.navbar-collapse').collapse('hide');
        let hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800)
    }
})

// jQuery Onload and Onresize
$(window).on('resize', () => {
    // Auto Main Top Padding
    let nav_height = $('.navbar').outerHeight();
    console.log(`Nav Height: ${nav_height}px`)
    // $('main').css('padding-top', nav_height);

    // Auto Main Bottom Padding
    let footer_height = $('footer').outerHeight();
    console.log(`Footer Height: ${footer_height}px`);
    $('main').css('padding-bottom', footer_height);
}).resize(); // Invoke resize event immediately