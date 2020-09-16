// Calculate Rem Value
function rem(x = 1) {    
    return x * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

$(document).ready(() => {
    // Auto Populate Copyright Year
    let year = new Date().getFullYear();
    $('#copyright_year').text(year);

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
        let img_src = val != '' && val < 7 ? `./assets/products/Horse${val}.png` : `./assets/products/Horse1.png`;
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
        let image_src = ($('#design-select').val() > 0) ? `./assets/products/Horse${$('#design-select').val()}.png` : `./assets/products/Horse1.png`;
        let design = ($('#design-select').val() > 0) ? $('#design-select option:selected').text() : 'Grazing Horse';
        let name = $('#stencil-phrase-input').val();

        $('#modal-design-image').attr('src', image_src);
        $('#modal-design-name').html(design);
        $('#modal-custom-name').html(name);

        // Show Order Modal
        $('#order-modal').modal('show');
    })

    // Manual Order Submission
    $('#order_modal_submit').on('click', () => {
        $('#order_modal_form').submit();
    })

    // Order Submission
    $('#order_modal_form').on('submit', event => {
        // Prevent default submission actions
        event.preventDefault();

        // Default EmailJS Parameters
        let subject = '';
        let message = '';
        let to_email = '';
        let from_name = '';

        // Load order form details
        let delivery_type = 'PICKUP';
        let name = $('#order-name').val();
        let email = $('#order_email').val();
        let tel = $('#order_tel').val();
        let street = '';
        let city = '';
        let province = '';
        let postal_code = '';

        if ($('#order_radio_1').is(':checked')) {
            delivery_type = 'DELIVERY';
            street = $('#order-street').val();
            city = $('#order-city').val();
            province = $('#order-province').val();
            postal_code = $('#order-postal-code').val();
        }

        subject = `Incoming Order [${delivery_type}]`;
        if (delivery_type === 'PICKUP') {
            message = `Customer Name: ${name}<br>Phone Number: ${tel}<br>Email: ${email}<br><br>Horse Type: ${$('#modal-design-name').html()}<br>Custom Name: ${$('#modal-custom-name').html()}`;
        } else {
            message = `Customer Name: ${name}<br>Phone Number: ${tel}<br>Email: ${email}<br><br>Shipping:<br>Address: ${street}, ${city}, ${province}<br>Postal Code: ${postal_code}<br><br>Horse Type: ${$('#modal-design-name').html()}<br>Custom Name: ${$('#modal-custom-name').html()}`;
        }
        to_email = `farrier.rik@gmail.com`;
        from_name = `Website Order Form`;

        // console.log(`${subject}\n${message}\n${to_email}\n${from_name}`);

        let templateParams = {
            subject: subject,
            message: message,
            to_email: to_email,
            from_name: from_name
        }

        emailjs.send('gmail', 'template_4ql2coAj', templateParams)
            .then(response => {
                console.log('SUCCESS!', response.status, response.text);
            }, error => {
                console.log('FAILED...', error);
            });

        // Add extra messages for clients
        subject = `Order Receipt`;
        to_email = to_email;
        message += `<br><br><hr><br>Price:<br>Cost: $20.00<br>HST: $2.60<br>Total: $22.60<br><br>If you have any inqueries, please email Rik at farrier.rik@gmail.com.`;

        templateParams = {
            subject: subject,
            message: message,
            to_email: email,
            from_name: from_name
        }

        emailjs.send('gmail', 'template_4ql2coAj', templateParams)
            .then(response => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Order Submitted');
                location.reload();
            }, error => {
                console.log('FAILED...', error);
            });
    })

    $('#contact-form').on('submit', event => {
        event.preventDefault();

        // Collect contact information
        let name = $('#contact_name').val();
        let email = $('#contact_email').val();
        let message = $('#contact_message').val();

        let templateParams = {
            subject: `Message from ${name}`,
            message: `Name: ${name}<br>Email: ${email}<br>Message: ${message}`,
            to_email: `farrier.rik@gmail.com`,
            from_name: name
        }

        emailjs.send('gmail', 'template_4ql2coAj', templateParams)
            .then(response => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Message Sent!');
                location.reload();
            }, error => {
                console.log('FAILED...', error);
            });
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