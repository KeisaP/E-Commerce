const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  })
  .then((categories) => {
    res.json(categories)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

router.get('/:id', async (req, res) => { 
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [Product]
    });

    if (!catData) {
      res.status(404).json({ message: 'No categories found with this id'});
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(postCat => res.json(postCat))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedCat => {
    if (!updatedCat[0]) {
      res.status(404).json({ message: 'No categories found with this id' });
      return;
    }
    res.json(updatedCat);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

router.delete('/:id', async (req, res) => {
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!catData) {
      res.status(404).json({ message: 'No categories found with this id!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
