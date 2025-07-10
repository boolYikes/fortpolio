const express = require('express');
const Trait = require('../models/Trait');

const router = express.Router();

router.get('/all', async (req, res, next) => {
  try {
    const traits = await Trait.findAll();
    if (!traits)
      return res.status(404).json({ error: 'No record in Traits table.' });
    res.status(200).json(traits);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
