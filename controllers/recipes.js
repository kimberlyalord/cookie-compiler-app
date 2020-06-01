const Recipe = require('../models/recipe');

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
}

function newRecipe(req, res) {
    res.render('recipes/new', { title: 'Add New Recipe'});
}

function create(req, res) {
    const recipe = new Recipe(req.body);
    recipe.save(function(err) {
        if (err) return res.redirect('/recipes/new');
        res.redirect(`/recipes/${recipe._id}`);
    });
}