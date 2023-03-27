const {Router} = require('express');
const productController = require('../controllers/controllerProducts');
let newProductController = new productController();

const productsRoute = Router();
const config = require('../config/index');

const login = (req, res ,next)=>{
    if(!config.administrator)
    return res.status(401).json({
      msg:'No tienes autorizacion'
    })
    
    next();
}

productsRoute.get('/', async(req, res)=>{
    let listOfProducts = await newProductController.getAllProducts();
    res.json(listOfProducts);
});

productsRoute.get('/:id',  async(req,res) =>{
    id = req.params.id;
    console.log(id);
    let findProduct = await newProductController.getByIdProducto(id);
    res.send(findProduct);
 });

 productsRoute.post('/',login, (req,res)=>{
    newProduct = newProductController.saveProduct(req);
    res.send(newProduct);
  });

  productsRoute.put('/:id',login, async (req,res)=> {
    let productUpdate = await newProductController.updateProduct(req);
    res.send(productUpdate);
 });

 productsRoute.delete('/:id',login,async (req,res)=> {
    let deleteProduct = await newProductController.deleteProduct(req);
    res.send(deleteProduct);
 });



module.exports = productsRoute;