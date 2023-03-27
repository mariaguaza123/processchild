const {Router} = require('express');
const cartController = require('../controllers/controllerCart');
let newCartController = new cartController();

const cartRoute = Router();

cartRoute.get('/', async(req, res)=>{
    let productsOnCart = await newCartController.myCartShopping();
    res.json(productsOnCart);
});

cartRoute.post('/:id',  async(req,res) =>{
    id = req.params.id;
    console.log(id);
    let addProduct = await newCartController.addProductToCart(id);
    res.send(addProduct);
 });

 cartRoute.delete('/:id', async(req,res) =>{
    let deleteProduct = await newCartController.deleteProductOfCart(req);
    res.send(deleteProduct);
 });

 cartRoute.delete('/', async(req,res) =>{
    let deleteAllProduct = await newCartController.deleteAllProductsOfCart();
    res.send(deleteAllProduct);
 });

module.exports = cartRoute;