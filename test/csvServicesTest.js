const { assert, expect } = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const { writeCsv } = require('../services/csvServices');

describe('CsvServices module: ', () => {
  describe('writeCsv function: ', () => {
    it('should throw an error if the file does not exist', () => {
      sinon.stub(fs, 'existsSync').onCall(0).throws('The given file path: ./outputDir/afilename.csv, does not exist');

      try {
        writeCsv('afilename', [{ a: 1 }], 'outputDir/');
      } catch (e) {
        assert.equal('The given file path: ./outputDir/afilename.csv, does not exist', e.name);
      }
      sinon.restore();
    });
  });
});
