const Category = require('../dtos/categoryDTO');

async function createCategory(req, res){
    const category = new Category({
        categoryName: req.body.categoryName
    });
    category.save()
    .then((result) => {
        res.status(201).json({
        error: false,
        message: "The Category has been created",
        data: result,
        });
    }).catch((error) => {
        res.status(404).json({
            error: true,
            message: `Server error: ${error}`,
        });
    });
}

async function getCategory(req, res){
    try{
        const category = await Category.findOne({_id: req.body._id});
        res.status(200).json({category});
    } catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function updateCategory (req, res){
    const categoryId = req.params.id;

    const updatedData = {
        categoryName: req.body.categoryName
    };

    try{
        const result = await Category.findOneAndUpdate({ _id: categoryId}, { $set: updatedData });
        console.log(result);
        if (result) {
            res.status(200).json({
                result: true,
                message: 'The news category has been modified'
            });
        } else {
            res.status(404).json({
                result: false,
                message: 'fatal error'
            });
        }
    } catch(error){
        res.status(500).json({
            result: false,
            message: 'An error has been ocurred while the news category was modified',
            error: error
        })
    }
}

async function deleteCategory(req, res){
    const categoryId = req.params.id;

    const deleteData = {
        status: false
    }

    try{
        const result = await Category.findOneAndUpdate({ _id: categoryId}, { $set: deleteData });
        console.log(result);
        if (result) {
            res.status(200).json({
                result: true,
                message: 'The news category has been deleted'
            });
        } else {
            res.status(404).json({
                result: false,
                message: 'fatal error'
            });
        }
    } catch(error){
        res.status(500).json({
            result: false,
            message: 'An error has been ocurred while the news category was deleted',
            error: error 
        });
    }
}

module.exports={
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}