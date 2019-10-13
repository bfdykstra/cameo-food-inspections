
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('inspection', {
    inspection_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    dba_name: Sequelize.TEXT,
    aka_name: Sequelize.TEXT,
    license_: Sequelize.INTEGER,
    facility_type: Sequelize.TEXT,
    risk: Sequelize.TEXT,
    address: Sequelize.TEXT,
    city: Sequelize.TEXT,
    state: Sequelize.TEXT,
    zip: Sequelize.INTEGER,
    inspection_date: Sequelize.DATE,
    inspection_type: Sequelize.TEXT,
    results: Sequelize.ENUM('Pass', 'Fail', 'Pass w/ Conditions'),
    latitude: Sequelize.STRING,
    longitude: Sequelize.STRING,
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('inspection'),
};
