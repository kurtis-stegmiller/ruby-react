//= require rails-ujs
//= require jquery3
//= require 'toastr/toastr'
// require popper
// require bootstrap

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            // console.log('Service worker registered!');
        });
}