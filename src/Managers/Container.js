const fs = require ('fs');


/* Schema
        product ={
            title:String (required),
            price:Number (required),
            thumbnail: String
        }
*/

const pathToProducts = __dirname+'/../files/products.json'

class container{
    addProduct = async (product) =>{
        if(!product.title||!product.price) return {status:"error", error: "missing data"}
        try{
            if(fs.existsSync(pathToProducts)){
                const data = await fs.promises.readFile(pathToProducts, 'utf-8')
                const products = JSON.parse(data);
                if (products.length === 0){
                    product.id = 1;
                }else{
                    const id = products[products.length-1].id+1;
                    product.id = id;
                }
                products.push(product);
                await fs.promises.writeFile(pathToProducts,JSON.stringify(products,null,2))
                return {status:"success",message:"Product inserted"}

            }else{
                product.id = 1
                await fs.promises.writeFile(pathToProducts,JSON.stringify([product],null,2))
                return {status:"success",message:"Product inserted"}
            }   
        }catch(error){
            return {status: "error",message:error}
        }
    }
    getAll = async () => {
        if(fs.existsSync(pathToProducts)){
            try{
                const data = await fs.promises.readFile(pathToProducts, 'utf-8')
                const products = JSON.parse(data);
                return {status: "success", productList:products}
                }catch(error){
                    return {status: "error",error:error}
            }
            
        }
    }
    getById = async (id) => {
        if(!id) return {status:"error", error:"Missing Id"};
        if(fs.existsSync(pathToProducts)){
            const data = await fs.promises.readFile(pathToProducts, 'utf-8')
            const products = JSON.parse(data);
            const product = products.find(p =>p.id===Number(id));
            if (product) return {status:"success", productList:product} 
            else return {status:"error", error:"Product not found"}
        }
    }
    deleteById = async (id) =>{
        if(!id || " ") return {status:"error", error:"Missing Id"};
        if(fs.existsSync(pathToProducts)){
            const data = await fs.promises.readFile(pathToProducts, 'utf-8')
            const products = JSON.parse(data);
            const newProducts = products.filter(p =>p.id!==Number(id))
            console.log(newProducts);
            await fs.promises.writeFile(pathToProducts,JSON.stringify(newProducts,null,2))
            return {status: "success", message:"Product deleted"}
        }
    }
    deleteAll = async () => {
        if(fs.existsSync(pathToProducts)){
            const data = await fs.promises.readFile(pathToProducts, 'utf-8')
            const products = JSON.parse(data);
            const emptyList = products
            emptyList.splice(0, products.length); 
            await fs.promises.writeFile(pathToProducts,JSON.stringify(emptyList,null,2)) 
            return {status: "success", message:"List deleted"}      
        }
    }
    randomProduct = async () => {
        if(fs.existsSync(pathToProducts)){
            const data = await fs.promises.readFile(pathToProducts, 'utf-8')
            const products = JSON.parse(data);
            const randomProd = ~~(Math.random()*products.length);
            const randomValue = products[randomProd];
            return {status: "success", randomProducts:randomValue}
        }
    }
    updateProduct = async (id,dataToUpdate) =>{
        if(!id) return {status:"error", error:"Missing Id"};
        if(fs.existsSync(pathToProducts)){
            const data = await fs.promises.readFile(pathToProducts, 'utf-8')
            const products = JSON.parse(data);
            const productToUpdate = products.find(p=>p.id===Number(id));
            const productUpdated = {...productToUpdate, ...dataToUpdate}
            const index = products.findIndex(p=>p.id===Number(id))
            products[index] = productUpdated
            await fs.promises.writeFile(pathToProducts,JSON.stringify(products,null,2))
            return {status:"success",message:"Product updated"}
        }
    }
}

module.exports = container;