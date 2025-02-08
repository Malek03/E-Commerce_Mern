import productModel from '../models/productModel';

export const getAllProduct=async ()=>{
    return await productModel.find();
};

export const seedInitialProducts=async ()=>{
    try{
        const productsinit=[
            {title:"Asus Laptop",image:'/AssusLab.avif',price:"1000",stock:100},
            {title:"HP Laptop",image:'/hplab.jpg',price:"400",stock:10},
            {title:"Lanavo Laptop",image:'/LanavoLab.webp',price:"1500",stock:40},
            {title:"Dell Laptop",image:'/DellLab.webp',price:"900",stock:50},
        ];
        const products=await getAllProduct();
        if(products.length===0){
            await productModel.insertMany(productsinit);
        }
    }
    catch(err){
        console.error(`Cannot Seed The Product ${err}`);
    }
};
