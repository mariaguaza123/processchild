const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const filePath = path.resolve(__dirname,"../../src/listOfProducts.json");

module.exports = class ProductController{
    constructor(){

    }

getAllProducts = async()=> {
    const products = await fs.promises.readFile(filePath, "utf-8");
    console.log('pasando por controller products');
    return JSON.parse(products);
}

getByIdProducto = async(id) =>{
    const products = await this.getAllProducts();
    return new Promise((res, rej)=>{
        if(products != null && id != null){
           const produtoEncontrado = products.findIndex((unProducto) => unProducto.id == id);
           if(produtoEncontrado < 0){
            throw new Error('El producto no existe');
          }
           res(products[produtoEncontrado]);
          
        }else{ 
          return rej('Error no se encontro el Id');
        }
    });
}


saveProduct = async(req) =>{
    
    const products = await this.getAllProducts();
    const {timeStamp,nameProduct,description,code,photoUrl,price,stock} = req.body;
    const newProduct = {
        id: uuidv4(),
        timeStamp: new Date(),
		nameProduct,
        description,
        code,
        photoUrl,
		price,
        stock,

    }
    if(!newProduct){
        return ('Campos invalidos');
    }else{
        products.push(newProduct);
        const data = JSON.stringify(products, null, '\t');
        fs.writeFile(filePath, data, (err)=>{
            if(err){
                console.log("No se pudo guardar");
            }
            return ('El producto fue guardado con exito');
        });
        
    }
    
    
}

updateProduct = async(req,res)=> {
    const id = req.params.id;
	const {timeStamp,nameProduct,description,code,photoUrl,price,stock} = req.body;
    const products = await this.getAllProducts();
    const index = products.findIndex(aProduct => aProduct.id == id);
    if(index < 0){
		return res.status(404).json({
			msg: "el producto no existe"
		})
	}
    
    const updateProduct = {
		id: products[index].id,
		timeStamp: new Date(),
		nameProduct,
        description,
        code,
        photoUrl,
		price,
        stock,
	}
    products.splice(index, 1, updateProduct);

	fs.writeFile(filePath, JSON.stringify(products, null, '\t'),(err)=>{
        if(err){
            return "Error no se puede actualizar el producto";
        }
        return "Producto actualizado";
    });
}

deleteProduct = async(req,res)=>{
    const id = req.params.id;
    const products = await this.getAllProducts();
    const index = products.findIndex(aProduct => aProduct.id == id);

    if(index < 0){return res.json({msg: "ok"})}

    products.splice(index,1);
    fs.writeFile(filePath, JSON.stringify(products,null, '\t'), (err)=>{
            if(err){
                console.log("No se pudo eliminar");
            }
            return ('El producto fue eliminado con exito');
        });
}


}