const { Parser, AsyncParser, parseAsync } = require('json2csv');
const fs = require('fs');

/**
 *
 * @param {String} fileName the filename that you want to name the csv.
 * @param {Array<Objects>} data The array of objects that you want to output to the csv.
 * @param {String} outputDirectory The file path relative to the root of this project that
 * you would like to write your file to
 * Each object in the array should have the column names as properties.
 *
 */
const writeCsv = (fileName, data, outputDirectory) => {
  // output directory relative to the root of the project
  const filePath = `${__dirname}/../${outputDirectory}/${fileName}.csv`;
  if (!fs.existsSync(filePath)) throw Error(`The given file path: ./${outputDirectory}/${fileName}.csv, does not exist`);
  const csvParser = new Parser();
  fs.writeFileSync(filePath, csvParser.parse(data));
};

// TODO: implement this
/**
 *
 * @param {string} fileName filename string
 * @param {Array<Objects>} data readfilestream?
 */
const writeStreamCsv = (fileName, data) => {
  const transformOpts = { highWaterMark: 8192 };

  // Using the promise API
  // const asyncParser = new AsyncParser(undefined, transformOpts);

  const output = fs.createWriteStream(outputPath, { encoding: 'utf8' });
  parseAsync(data).then((csv) => console.log('csv string: ', csv));
};


module.exports = {
  writeCsv,
};
