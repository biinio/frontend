/**
 * Created by Ivan on 1/13/16.
 */
(function ($) {
    'use strict';

    if (typeof $ === 'undefined') {
        throw new Error('This site\'s JavaScript requires jQuery');
    }

    // cache common elements
    var $win = $(window);
    var $doc = $(document);
    var $body = $('body');
    var nameHeaderField = $("#nameInputHeader");
    var emailHeaderField = $("#emailInputHeader");
    var phoneHeaderField = $("#phoneInputHeader");
    var companyHeaderField = $("#companyInputHeader");

    var nameBottomField = $("#nameInputBottom");
    var emailBottomField = $("#emailInputBottom");
    var phoneBottomField = $("#phoneInputBottom");
    var companyBottomField = $("#companyInputBottom");

    $.validator.addMethod("phoneCR", function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 7 &&
            phone_number.match(/^(00)?[\s|-]?((\+)?[\s|-]?[0-9]{3})?[\s|-]?([0-9]{2})[\s|-]?([0-9]{2})[\s|-]?([0-9]{2})[\s|-]?([0-9]{2})[\s|-]?$/);
    }, "Please specify a valid phone number");

    $.extend($.validator.messages, {
        phoneCR: "Escriba un teléfono válido de Costa Rica, ej. +5068888888"
    });

    $("#headerform").validate(
        {
            debug: true
        }
    );
    $("#formBottom").validate(
        {
            debug: true
        }
    );


    function sendEmailHeader() {
        var nameHeaderValue = nameHeaderField.val();
        var emailHeaderValue = emailHeaderField.val();
        var phoneHeaderValue = phoneHeaderField.val();
        var companyHeaderValue = companyHeaderField.val();

        if ($("#headerform").valid()) {
            sendRequestEmail(nameHeaderValue, emailHeaderValue, phoneHeaderValue, companyHeaderValue);
        }
        else {
            console.log("Some or all fields in header are empty");
        }
    }

    function sendEmailBottom() {
        var nameBottomValue = nameBottomField.val();
        var emailBottomValue = emailBottomField.val();
        var phoneBottomValue = phoneBottomField.val();
        var companyBottomValue = companyBottomField.val();

        if ($("#formBottom").valid()) {
            sendRequestEmail(nameBottomValue, emailBottomValue, phoneBottomValue, companyBottomValue);
        }
        else {
            console.log("Some or all fields in bottom are empty");
        }
    }

    function validateEmail(emailField) {
        var textToTest = emailField.val();
        var regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)$/i;
        return regexEmail.test(textToTest);
    }

    function sendRequestEmail(name, email, phone, company) {
        console.log("send Email");
        $.ajax({
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': 'zjKEi4IkVNcbqJ0r0HJoYw',
                'message': {
                    'from_email': 'contact@biin.io',
                    'to': [
                        {
                            'email': 'contact@biin.io',
                            'name': 'Contacto',
                            'type': 'to'
                        }/*,
                        {
                            'email': 'carce@biin.io',
                            'name': 'Cesar Arce',
                            'type': 'to'
                        }*/
                    ],
                    'autotext': 'true',
                    'subject': name + ' is interested in trying our product!!!',
                    'html': '<h1>Great news! ' + name + ' is interested in Biin</h1><h2> Get in contact with him/her!!! </h2><p>Here is the contact information</p><p>Name: ' + name + '</p><p>Phone: ' + phone + '</p><p>Email: <a href="mailto:"' + email + '>' + email + '</a></p><p>Company: ' + company + '</p> '
                }
            }
        }).done(function (response) {
            sendClientEmail(name,email);
        });
    }

    function sendClientEmail(name, email) {
        console.log("send Email");
        $.ajax({
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': 'zjKEi4IkVNcbqJ0r0HJoYw',
                'message': {
                    'from_email': 'contact@biin.io',
                    'to': [
                        {
                            'email': email,
                            'name': name,
                            'type': 'to'
                        }
                    ],
                    'autotext': 'true',
                    'subject': 'Gracias por su interés en Biin',
                    'html': 'Estaremos pronto en contacto para conocer más de su negocio e iniciar con la puesta en marcha de Biin<br/>Saludos,<br/><br/>César Arce<br/>CEO en biin'
                }
            }
        }).done(function (response) {
            $('#headerDemoButton').text("Prueba solicitada").unbind('click');
            $('#bottomDemoButton').text("Prueba solicitada").unbind('click');
        });
    }


    $('#headerDemoButton').click(sendEmailHeader);
    $('#bottomDemoButton').click(sendEmailBottom);

})(window.jQuery);