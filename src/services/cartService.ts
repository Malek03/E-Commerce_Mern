import cartModel from "../models/cartModel";
import productModel from "../models/productModel";

    interface CreateCartForUser {
    userId: string;
    }
    const createCartForUser = async ({ userId }: CreateCartForUser) => {
    const cart = await cartModel.create({ userId });
    await cart.save();
    return cart;
    };

    interface GetActiveCartForUser {
    userId: string;
    }
    export const getActiveCartForUser = async ({
    userId,
    }: GetActiveCartForUser) => {
    let cart = await cartModel.findOne({ userId, status: "active" });
    if (!cart) {
        cart = await createCartForUser({ userId });
    }
    return cart;
    };

    interface AddItemToCart {
    productId: any;
    quantity: number;
    userId: string;
    }

    export const additemToCart = async ({
    productId,
    quantity,
    userId,
    }: AddItemToCart) => {
    const cart = await getActiveCartForUser({ userId });
    const existsInCart = cart.items.find((p) => p.product.toString() === productId);
    if (existsInCart) {
        return { data: "Item aleardy exists in cart!", statusCode: 400 };
    }
    const product = await productModel.findById(productId);
    if (!product) {
        return { data: "Product not found!", statusCode: 400 };
    }
    if(product.stock < quantity){
        return { data: "Low Stock For Item!", statusCode: 400 };
    }
    cart.items.push({
        product: productId,
        unitPrice: product.price,
        quantity
    });
    cart.totalAmount += product.price * quantity;
    product.stock -= quantity;
    product.save();
    const updateCart = await cart.save();
    return { data: updateCart, statusCode: 200 };
    };
