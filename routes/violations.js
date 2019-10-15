const express = require('express');
const db = require('../models');
const logger = require('../logger');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { limit, includeInspections } = req.query;

    const allViolations = await db.violation.findAll({
      limit,
      include: includeInspections === 'true' ? [{
        model: db.inspection,
      }] : [],
    });

    res.json(allViolations);
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      error: e.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { includeInspections } = req.query;

    const violation = await db.violation.findByPk(req.params.id, {
      include: includeInspections === 'true' ? [{
        model: db.inspection,
      }] : [],
    });

    const responseObject = { data: violation || [], message: violation ? 'success' : `No record id ${req.params.id} found` };
    const status = violation ? 200 : 404;

    res.status(status).json(responseObject);
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      error: e.message,
    });
  }
});

module.exports = router;
