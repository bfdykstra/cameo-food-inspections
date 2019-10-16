
const {
  getInspections,
  parseInspections,
} = require('../services/inspectionServices');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allInspections = await getInspections(10000);
    const { allViolationsArr } = parseInspections(allInspections);
    return queryInterface.bulkInsert('violation', allViolationsArr);
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('violation', null, {}),
};
