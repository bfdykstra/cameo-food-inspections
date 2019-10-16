const { assert, expect } = require('chai');
const {
  parseInspections,
} = require('../services/inspectionServices');
const mockInspections = require('./mockData/mockInspections.json');

describe('functional tests for parseInspectionsModule: ', () => {
  describe('parseInspections function: ', () => {
    const inspectionsOb = parseInspections(mockInspections);
    it('should return an object', () => {
      assert.isTrue(inspectionsOb !== null && typeof inspectionsOb === 'object');
    });

    it('should have two properties: inspectionsArr and allViolationsArr', () => {
      expect(inspectionsOb).to.have.keys(['inspectionsArr', 'allViolationsArr']);
    });

    it('inspectionsArr and allViolationsArr should be arrays: ', () => {
      assert.isArray(inspectionsOb.inspectionsArr);
      assert.isArray(inspectionsOb.allViolationsArr);
    });

    it('each object in the arrays should have the correct properties', () => {
      const { inspectionsArr, allViolationsArr } = inspectionsOb;
      inspectionsArr.forEach((insp) => {
        expect(insp).to.have.keys(['inspection_id',
          'dba_name',
          'aka_name',
          'license_',
          'facility_type',
          'risk',
          'address',
          'city',
          'state',
          'zip',
          'inspection_date',
          'inspection_type',
          'results',
          'latitude',
          'longitude']);
      });

      allViolationsArr.forEach((vio) => {
        expect(vio).to.have.keys(['inspection_id', 'name', 'comments']);
      });
    });
  });
});
