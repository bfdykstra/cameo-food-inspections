const express = require('express');
const db = require('../models');
const logger = require('../logger');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { limit, includeInspection } = req.query;

    const allViolations = await db.violation.findAll({
      limit,
      include: includeInspection === 'true' ? [{
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
    const { includeInspection } = req.query;

    const violation = await db.violation.findByPk(req.params.id, {
      include: includeInspection === 'true' ? [{
        model: db.inspection,
      }] : [],
    });

    const responseObject = { data: violation || [], success: !!violation, ...!violation && { message: `No violation found for id: ${req.params.id}` } };
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
