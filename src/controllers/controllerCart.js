const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const productController = require('../controllers/controllerProducts');
let listProductsController = new productController();


const filePath = path.resolve(__dirname,"../../src/listOfCarts.json");

module.exports =  class controllerCart{  

    constructor(){
        this.cart = [];
    }
    getAllCarts = async()=> {
        const cart = await fs.promises.readFile(filePath, "utf-8");
        return JSON.parse(cart);
    }

    myCartShopping = async()=> {
        console.log('pasando por get products');
        const cartShop = await this.getAllCarts();
            if(cartShop == []|| cartShop.length == 0){
                return  `El carrito esta vacio, agrega un producto a este carrito`;
            }
                
            return cartShop;
    }

    addProductToCart = async(id) =>{
        let findProduct = await listProductsController.getByIdProducto(id);
        
        const cartShoppingFinal = [{
            id: uuidv4(),
            timeStamp : new Date(),
            products: findProduct
        }]
        this.cart.push(cartShoppingFinal);
        const data = JSON.stringify(cartShoppingFinal, null, '\t');
        fs.promises.appendFile(filePath, data, (err)=>{
            if(err){
                console.log("No se pudo añadir");
            }
            return ('El producto fue añadido con exito');
        });  
        return cartShoppingFinal;
    }

    deleteProductOfCart =async(req)=>{
        const id = req.params.id;
        console.log(id);
        const products = this.cart
        const index = products.findIndex(aProduct => aProduct.id == id);
        products.splice(index,1);
        return this.cart;
    }

    deleteAllProductsOfCart = async()=>{
        const products = this.cart;
        products.splice(products);
        return 'Se vacio el carrito de compras, agregue productos si desea comprar';
    }


    
}