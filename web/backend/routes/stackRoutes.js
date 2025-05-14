const express = require('express');
const Stack = require('../models/Stack');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/all', async (req, res, next) => {
  try {
    const stack = await Stack.findAll();
    if (!stack)
      return res.status(404).json({ error: 'No record in Stack table.' });
    res.status(200).json(stack);
  } catch (error) {
    next(error);
  }
});

router.get('/strong', async (req, res, next) => {
  try {
    const stacks = await Stack.findAll({
      where: {
        weight: {
          [Op.gte]: 5,
        },
      },
      order: [['weight', 'DESC']],
    });

    if (!stacks || stacks.length === 0) {
      return res
        .status(404)
        .json({ error: 'No stacks found with weight >= 5' });
    }

    res.status(200).json(stacks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
