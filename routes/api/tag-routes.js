const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
	try {
		// find all tags and include associated Product data
		const tags = await Tag.findAll({
			include: [{ model: Product, through: ProductTag }],
		});

		res.status(200).json(tags);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
			message: error.message,
		});
	}
});

router.get("/:id", async (req, res) => {
	// find a single tag by its `id` and include associated Product data
	const tagId = req.params.id;
	try {
		const tag = await Tag.findOne({
			where: { id: tagId },
			include: [{ model: Product, through: ProductTag }],
		});
		if (!tag) {
			return res.status(404).json({ message: "Tag not found" });
		}
		res.status(200).json(tag);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
			message: error.message,
		});
	}
});

router.post("/", async (req, res) => {
	try {
		// create a new tag using data from the request body
		const newTag = await Tag.create(req.body);
		res.status(200).json(newTag);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
			message: error.message,
		});
	}
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
	const tagId = req.params.id;
	try {
		const existingTag = await Tag.findByPk(tagId);
		// If the tag doesn't exist, return a 404 error
		if (!existingTag) {
			return res.status(404).json({ message: "Tag not found" });
		}
		await Tag.update(
			{ tag_name: req.body.tag_name },
			{
				where: { id: tagId },
			}
		);
		// Fetch updated tag
		const updatedTag = await Tag.findByPk(tagId);

		res.status(200).json({ message: "Tag updated successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
			message: error.message,
		});
	}
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
	
	try {
	const existingTag = await Tag.destroy({
    where: {id: req.params.id}
  })

  if (!existingTag) {
    res.status(404).json( {message: "No tag found with that id"});
    return;
  }

  res.status(200).json({message: "Tag deleted successfully"})
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
			message: error.message,
		});
	}
});

module.exports = router;
