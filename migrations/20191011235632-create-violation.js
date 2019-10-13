
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('violation', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    inspection_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    comments: {
      type: Sequelize.TEXT,
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('violation'),
};
