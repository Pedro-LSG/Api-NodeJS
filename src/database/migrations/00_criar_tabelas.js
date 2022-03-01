const knex = require('knex');

exports.up = async(knex) => {
    return knex.schema
    .createTable('cursos', (table) => {
        table.uuid('codigo').primary
        table.string('nome', 25).notNullable()
        table.string('area', 25).notNullable()
        table.string('dataInicio', 10).notNullable()
        table.string('dataTermino', 10).notNullable()
        table.string('preRequisito', 25).notNullable()
    })
    .createTable('usuarios', (table) => {
        table.uuid('codigo').primary
        table.string('nome', 25).notNullable()
        table.string('email', 80).unique().notNullable()
        table.string('senha', 15).notNullable()
    });
}

exports.down = async(knex) => {
    return knex.schema
            .dropTable('cursos')
            .dropTable('usuarios')
}