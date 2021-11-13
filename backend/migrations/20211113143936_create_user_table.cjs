exports.up = knex => knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('firstname', 50);
    t.string('lastname', 50);
    t.string('middlename', 100);
    t.string('user_name', 50);
    t.string('email', 50);
    t.string('profile_picture');
    t.string('password');
});

exports.down = knex => knex.schema.dropTableIfExists('users');
