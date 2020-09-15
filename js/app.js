// Calculate Rem Value
function rem(x = 1) {    
    return x * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

$(document).ready(() => {
    // Auto Populate Copyright Year
    let year = new Date().getFullYear();
    $('#year').text(year);

    // Auto-Change Order Text
    $('#stencil-phrase-input').on('keyup', () => {
        let text = $('#stencil-phrase-input').val();
        $('#stencil-text-container span').text(`${text}`);

        if (text === '') {
            $('#stencil-text-container span').text('Name goes here...');
        }
    })

    // Auto-Change Stencil Design
    $('#design-select').on('change', () => {
        let val = $('#design-select').val();
        let img_src = val != '' && val < 7 ? `./assets/Horse${val}.png` : `./assets/Horse1.png`;
        $('#stencil-image').attr('src', img_src);
    })

    // Show Delivery Info on Delivery Radio Click
    $('#order_radio_1').on('click', () => {
        $('#order-delivery').removeClass('hidden');
    })  
    $('#order_radio_2').on('click', () => {
        $('#order-delivery').addClass('hidden');
    })

    // Open Order Modal on Form Submit
    $('#order-form').on('submit', event => {
        // Prevent default submit actions
        event.preventDefault();

        // Pre-populate modal
        let image_src = ($('#design-select').val() > 0) ? `./assets/Horse${$('#design-select').val()}.png` : `./assets/Horse1.png`;
        let design = ($('#design-select').val() > 0) ? $('#design-select option:selected').text() : 'Grazing Horse';
        let name = $('#stencil-phrase-input').val();

        $('#modal-design-image').attr('src', image_src);
        $('#modal-design-name').html(design);
        $('#modal-custom-name').html(name);

        // Show Order Modal
        $('#order-modal').modal('show');
    })
})

// Smooth Scroll to Anchor
$('.navbar a[href*="#"]').on('click', function(event) {
    if (this.hash != "") {
        event.preventDefault();
        $('.navbar-collapse').collapse('hide');
        let hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top - rem()
        }, 800)
    }
})