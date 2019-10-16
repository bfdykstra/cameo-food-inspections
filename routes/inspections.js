const express = require('express');
const db = require('../models');
const logger = require('../logger');

const router = express.Router();


/* GET inspections listing. */
router.get('/', async (req, res, next) => {
  try {
    const { limit, includeViolations } = req.query;
    const allInspections = await db.inspection.findAll({
      limit,
      include: includeViolations === 'true' ? [{
        model: db.violation,
      }] : [],
    });

    res.json({ data: allInspections, success: true });
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});


/* GET inspections by id */
router.get('/:id', async (req, res, next) => {
  try {
    const { includeViolations } = req.query;

    const inspection = await db.inspection.findByPk(req.params.id, {
      include: includeViolations === 'true' ? [{
        model: db.violation,
      }] : [],
    });

    const responseObject = { data: inspection || [], success: !!inspection, ...!inspection && { message: `No inspection found for id: ${req.params.id}` } };
    const status = inspection ? 200 : 404;

    res.status(status).json(responseObject);
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

module.exports = router;
