'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let sql = `
      CREATE TABLE "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
      )
      WITH (OIDS=FALSE);
      ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
    `

    return queryInterface.sequelize.query(sql)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('session');
  }
};
