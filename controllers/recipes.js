const Recipe = require('../models/recipe');
const Attribute = require('../models/attribute');

module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    edit,
    update,
    delete: deleteRecipe
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
    const recipe = new Recipe(req.body);
    req.body.attributeNames.forEach(function(attributeName) {
        const attribute = new Attribute({attributeName});
        attribute.save();
        recipe.attributes.push(attribute);
    })
    recipe.save(function(err) {
        if (err) return res.redirect('/recipes/new');
        res.redirect(`/recipes/${recipe._id}`);
    });
}

function edit(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        if (!recipe.user.equals(req.user._id)) return res.redirect(`/recipes/${recipe._id}`);
        res.render('recipes/edit', {title: 'Edit Recipe', recipe});
    });
}

function update(req, res) {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, recipe) {
        res.redirect(`/recipes/${recipe._id}`);
    });
}

function deleteRecipe(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        if (!recipe.user.equals(req.user._id)) return res.redirect(`/recipes/${recipe._id}`);
        Recipe.findByIdAndRemove(req.params.id, function(err, recipe) {
            res.redirect('/recipes');
        });
    });
}