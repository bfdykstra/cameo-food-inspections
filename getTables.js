const inquirer = require('inquirer');
const {
  getInspections,
  parseInspections,
} = require('./services/inspectionServices');
const logger = require('./logger');

const { writeCsv } = require('./services/csvServices');

/**
 * Assember the prompts to give to the user.
 * @param {Object} options arguments passed from the command line.
 * @returns {Object} returns an object with all the fields that correspond to
 * command line arguments
 */
async function promptForArguments(options) {
  const questions = [];
  if (!options.limit || !options.l) {
    questions.push({
      type: 'number',
      name: 'limit',
      message: 'How many inspections you would like to retrieve?, eg. 1000',
      default: 1000,
      validate: (input) => input > 0 || 'Limit must be greater than 0',
    });
  }

  if (!options['inspections-file-name']) {
    questions.push({
      type: 'input',
      name: 'inspections-file-name',
      message: 'What would you like to call your inspections csv file?',
      default: 'inspections',
    });
  }

  if (!options['violations-file-name']) {
    questions.push({
      type: 'input',
      name: 'violations-file-name',
      message: 'What would you like to call your violations csv file?',
      default: 'violations',
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    limit: options.limit || options.l || answers.limit,
    'inspections-file-name': options['inspections-file-name'] || answers['inspections-file-name'],
    'violations-file-name': options['violations-file-name'] || answers['violations-file-name'],
  };
}

module.exports = {
  handleInput: async (args) => {
    const { _, ...options } = args;

    if (options.h || options.help) {
      const helpText = `Usage: get-tables [arguments]\n
  -l, --limit                The number of inspection records to pull from the chicago data API. Defaults to 1000 records.\n
  -o, --output-directory     The directory to output the file to. The directory is relative to the root of the project. Default is data/\n
  --inspections-file-name    The name of the output inspections csv file. Defaults to inspections.csv\n
  --violations-file-name     The name of the output violations csv file. Defaults to violations.csv\n
      `;
      logger.message(helpText);
    } else {
      const promptInput = await promptForArguments(options);
      const { limit } = promptInput;


      try {
        if (limit < 1) throw Error('Limit must be greater than 0');
        const inspections = await getInspections(limit);

        const { inspectionsArr, allViolationsArr } = parseInspections(inspections);

        const inspectionsFileName = (promptInput['inspections-file-name'] || 'inspections_test').replace('.csv', '');

        const violationsFileName = (promptInput['violations-file-name'] || 'violations_test').replace('.csv', '');

        writeCsv(inspectionsFileName, inspectionsArr, promptInput['output-dir'] || promptInput.o || 'data/');
        if (allViolationsArr.length) writeCsv(violationsFileName, allViolationsArr, promptInput['output-dir'] || promptInput.o || 'data/');

        logger.message(`\nWrote inspections and violations to ${promptInput['output-dir'] || promptInput.o || 'data/'}${inspectionsFileName}.csv and ${promptInput['output-dir'] || promptInput.o || 'data/'}${violationsFileName}.csv!\n`);
      } catch (e) {
        logger.error('error getting tables: ', e.message);
      }
    }
  },
};
