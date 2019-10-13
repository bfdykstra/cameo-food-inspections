const express = require('express');
const db = require('../models');

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

    res.json({ data: allInspections });
  } catch (e) {
    console.error(e);
    res.status(500).json({
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

    const responseObject = { data: inspection || [], message: inspection ? 'success' : `No record id ${req.params.id} found` };
    const status = inspection ? 200 : 404;

    res.status(status).json(responseObject);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: e.message,
    });
  }
});

module.exports = router;
