exports.up = function (knex) {
  return knex.schema.createTable('credit_cards', (t) => {
    t.increments('cardID').primary();
    t.bigInteger('cardNo').notNullable().unique();
    t.date('expired_date').notNullable().defaultTo(knex.fn.now());
    t.bigInteger('accountNo').notNullable().references('bank_accounts.accountNo').onDelete('CASCADE');
    t.integer('customerID').notNullable().references('customers.customerID').onDelete('CASCADE');
    t.specificType('CVV', 'smallint').notNullable();
    t.text('card_holder', 100).notNullable();
    t.text('hash_pin', 60).notNullable();
    t.text('card_type', 20).notNullable();
    t.specificType('failure_score', 'smallint').defaultTo(0);
    t.boolean('is_blocked').defaultTo(false);
    t.date('blocked_date');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('credit_cards');
};
