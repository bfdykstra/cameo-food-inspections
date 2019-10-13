const args = require('minimist')(process.argv.slice(2));
const {
  getInspections,
  parseInspections,
} = require('./services/parseInspections');

const { writeCsv } = require('./services/csvServices');

const {
  limit,
  l,
} = args;

getInspections(limit || l)
  .then((inspections) => parseInspections(inspections))
  .then(({ inspectionsArr, allViolationsArr }) => {
    const inspectionsFileName = args['inspections-file-name'] || 'inspections_test';
    const violationsFileName = args['violations-file-name'] || 'violations_test';

    writeCsv(inspectionsFileName, inspectionsArr);
    writeCsv(violationsFileName, allViolationsArr);
    console.log(`\nWrote inspections and violations to data/${inspectionsFileName}.csv and data/${violationsFileName}.csv!\n`);
  })
  .catch((e) => console.error('error getting tables: ', e));
