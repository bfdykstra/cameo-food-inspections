const rp = require('request-promise-native');

const INSPECTION_URL = 'https://data.cityofchicago.org/resource/4ijn-s7e5.json';

/**
 * Hit the SODA api to retrieve inspection data
 * @param {Integer} limit the number of records to retrieve
 * @param {Object} sodaAPIOptions any options that you would like to pass to the
 * SODA api. More info here: https://dev.socrata.com/consumers/getting-started.html
 * @returns {Promise<Array<Object>>} returns an array of inspection objects
 * @throws will throw an error if the API call is rejected, error handling should
 * be implemented in the calling context
 */
const getInspections = async (limit, sodaAPIOptions) => {
  const options = {
    uri: INSPECTION_URL,
    qs: {
      $limit: limit || 1000,
      ...sodaAPIOptions,
    },
    json: true,
  };

  return rp(options);
};


/**
 * Parse the raw inspection objects returned from the api. Get any violations
 * and comments with those violations from the objects.
 * @param {Array<Object>} allInspections An array of inspection objects
 * @returns {Object} return an object with fields inspectionsArr and allViolationsArr,
 * where each array is an array of objects that holds inspection and violations objects
 */
const parseInspections = (allInspections) => allInspections.reduce((accum, inspection) => {
  const {
    violations,
    location,
    ...inspectionOb
  } = inspection;

  accum.inspectionsArr.push(inspectionOb);

  if (violations) {
    // need to get each separate violation;
    const violationsArr = inspection.violations.split('|');
    // for each violation, there could be comments
    violationsArr.forEach((violation) => {
      const [name, comments] = violation.split('- Comments:');

      accum.allViolationsArr.push({
        inspection_id: parseInt(inspectionOb.inspection_id, 10),
        name,
        comments,
      });
    });
  }

  return accum;
}, { inspectionsArr: [], allViolationsArr: [] });


module.exports = {
  getInspections,
  parseInspections,
};
