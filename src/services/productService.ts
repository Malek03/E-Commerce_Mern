import productModel from '../models/productModel';

export const getAllProduct=async ()=>{
    return await productModel.find();
};

export const seedInitialProducts=async ()=>{
    try{
        const productsinit=[
            {title:"Product 1",image:'image1.jpg',price:10,stock:100},
        //     {title:"Product 2",image:'image2.jpg',price:20,stock:200},
        //     {title:"Product 3",image:'image3.jpg',price:30,stock:300},
        //     {title:"Product 4",image:'image4.jpg',price:40,stock:400},
        //     {title:"Product 5",image:'image5.jpg',price:50,stock:500},
        //     {title:"Product 6",image:'image6.jpg',price:60,stock:600},
        //     {title:"Product 7",image:'image7.jpg',price:70,stock:700},
        //     {title:"Product 8",image:'image8.jpg',price:80,stock:800},
        //     {title:"Product 9",image:'image9.jpg',price:90,stock:900},
        //     {title:"Product 10",image:'image10.jpg',price:100,stock:1000},
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