const Recipe = require('../models/recipe');
const Attribute = require('../models/attribute');

module.exports = {
    index,
    show,
    new: newRecipe,
    create
};

function index(req, res) {
    Recipe.find({}, function(err, recipes) {
        res.render('recipes/index', { title: 'All Cookies', recipes });
    });
}

function show(req, res) {
    Recipe.findById(req.params.id)
    .populate('attributes')
    .exec(function(err, recipe) {
        console.log(err);
        console.log(recipe);
            res.render('recipes/show', {
                title: 'Recipe Detail',
                recipe
            });
    });
}

function newRecipe(req, res) {
    res.render('recipes/new', { title: 'Add New Recipe'});
}

function create(req, res) {
    req.body.user = req.user._id;
    console.log(req.body);
    const recipe = new Recipe(req.body);
    req.body.attributeNames.forEach(function(attributeName) {
        const attribute = new Attribute({attributeName});
        attribute.save();
        recipe.attributes.push(attribute);
    })
    recipe.save(function(err) {
        if (err) return res.redirect('/recipes/new');
        console.log(recipe);
        res.redirect(`/recipes/${recipe._id}`);
    });
}