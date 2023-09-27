const router = require("express").Router();
const { Category, Product, ProductTag } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
	try {
		// find all categories and include associated Products
		const categories = await Category.findAll({
			include: [{ model: Product, through: ProductTag }],
		});
		res.status(200).json(categories);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
			message: error.message,
		});
	}
});

router.get("/:id", async (req, res) => {
	// find one category by its `id` value and be sure to include associated Products
	const categoryId = req.params.id;
	try {
		const category = await Category.findOne({
			where: { id: categoryId },
			include: [{ model: Product, through: ProductTag }],
		});

		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}
		res.status(200).json(category);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
			message: error.message,
		});
	}
});

router.post("/", async (req, res) => {
	// create a new category
	try {
		await Category.create(req.body);
		res.json("Category created").status(201);
	} catch (e) {
		res.json(e).status(400);
	}
});

router.put("/:id", async (req, res) => {
	// update a category by its `id` value
	try {
		const category = await Category.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.json(category).status(201);
	} catch (e) {
		res.json(e).status(400);
	}
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
	const categoryId = req.params.id;

	try {
		const existingCategory = await Category.findByPk(categoryId);

		// If category does not exist, return a 404 error
		if (!existingCategory) {
			return res.status(404).json({ message: "category not found" });
		}
		await existingCategory.destroy();
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
			message: error.message,
		});
	}
});

module.exports = router;
