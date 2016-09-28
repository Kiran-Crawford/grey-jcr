var db = require('../helpers/db');
var httpError = require('http-errors');

/* Folder Object*/
var Ticket = function (data) {
    this.id = data.id;
    this.name = data.name;
    this.max_booking = data.max_booking;
    this.min_booking = data.min_booking;
    this.allow_debtors = data.allow_debtors;
    this.allow_guests = data.allow_guests;
    this.open_booking = data.open_booking;
    this.close_booking = data.close_booking;
    this.price = data.price;
    this.guest_surcharge = data.guest_surcharge;
}

Ticket.prototype.update = function(name, options) {
    return db('tickets').where({id: this.id}).update({
        name: name,
        max_booking: options.max_booking,
        min_booking: options.min_booking,
        allow_debtors: options.allow_debtors,
        allow_guests: options.allow_guests,
        open_booking: options.open_booking,
        close_booking: options.close_booking,
        price: options.price,
        guest_surcharge: options.guest_surcharge
    }).then(function(id){
        this.name = name;
        this.max_booking = options.max_booking;
        this.min_booking = options.min_booking;
        this.allow_debtors = options.allow_debtors;
        this.allow_guests = options.allow_guests;
        this.open_booking = options.open_booking;
        this.close_booking = options.close_booking;
        this.price = options.price;
        this.guest_surcharge = options.guest_surcharge;
    })
}

Ticket.prototype.delete = function() {
    return db('tickets').where({id: this.id}).del();
}

/* Static Methods */

Ticket.create = function(name) {
    return db('tickets').insert({name: name}).returning('id').then(function(id){
        return Ticket.findById(id[0]);
    })
}

Ticket.findById = function(ticket_id) {
    return db('tickets').first().where({id: ticket_id}).then(function(ticket_data) {
        return new Ticket(ticket_data);
    })
}

Ticket.getAll = function() {
    return db('tickets').select().then(function(tickets) {
        return Promise.all(
            tickets.map(function(ticket_data) {
                return new Ticket(ticket_data);
            })
        )
    })
}

module.exports = Ticket;
