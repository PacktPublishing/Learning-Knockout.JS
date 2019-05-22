var app = window.app || {};
app.Media = function (isbn, mediaType, name) {
    'use strict';
    this.ISBN = isbn;
    this.MediaType = mediaType;
    this.Name = name;
};