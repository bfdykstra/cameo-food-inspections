
const {
  getInspections,
  parseInspections,
} = require('../services/inspectionServices');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allInspections = await getInspections(10000);
    const { inspectionsArr } = parseInspections(allInspections);
    return queryInterface.bulkInsert('inspection', inspectionsArr);
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('inspection', null, {}),
};
