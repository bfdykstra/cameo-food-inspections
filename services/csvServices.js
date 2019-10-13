const { Parser, AsyncParser, parseAsync } = require('json2csv');
const { createWriteStream, writeFileSync } = require('fs');

/**
 *
 * @param {String} fileName the filename that you want to name the csv.
 * @param {Array<Objects>} data The array of objects that you want to output to the csv.
 * Each object in the array should have the column names as properties.
 *
 */
const writeCsv = (fileName, data) => {
  const filePath = `${__dirname}/../data/${fileName}.csv`;

  const csvParser = new Parser();
  try {
    writeFileSync(filePath, csvParser.parse(data));
  } catch (err) {
    console.error(`error writing ${filePath}: `, err);
  }
};

// TODO: implement this
/**
 *
 * @param {string} fileName filename string
 * @param {Array<Objects>} data readfilestream? idk
 */
const writeStreamCsv = (fileName, data) => {
  const transformOpts = { highWaterMark: 8192 };

  // Using the promise API
  // const asyncParser = new AsyncParser(undefined, transformOpts);

  const output = createWriteStream(outputPath, { encoding: 'utf8' });
  parseAsync(data).then((csv) => console.log('csv string: ', csv));
};


module.exports = {
  writeCsv,
};
