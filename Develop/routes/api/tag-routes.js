const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [
        {
          model: Category,
          model: Tag,
          through: ProductTag
          
        }
      ]
    })
      res.status(200).json(tagData)
  } catch(err) {
  res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'productName', 'price', 'stock', 'categoryId'],
      }
    ]
  })
    .then(dbTag => {
      if (!dbTag) {
        res.status(404).json({ message: 'did not find id'});
        return;
      }
      res.json(dbTag);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbTag => res.json(dbTag))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(dbTag => {
        if (!dbTag[0]) {
            res.status(404).json({ message: 'did not find id'});
            return;
        }
        res.json(dbTag);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
        id: req.params.id
    }
  })
    .then(dbTag => {
        if (!dbTag) {
            res.status(404).json({ message: 'did not find id'});
            return;
        }
        res.json(dbTag);
  })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
  });
});

module.exports = router;


//done just need to edit so you can turn it in do github