const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    await Category.create(req.body)
    res.json('Category created').status(201)
  } catch (e) {
    res.json(e).status(400)
  }
 
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
   const category = await Category.update(req.body,{
      where: {
        id: req.params.id
      }
    })
    res.json(category).status(201)

  } catch (e) {
    res.json(e).status(400)
  }

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
