const express = require('express');

const router = express.Router();

const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignin');
const userDetailsController = require('../controller/user/useDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const paymentController = require('../controller/order/paymentController');
const webhooks = require('../controller/order/webhook');
const orderController = require('../controller/order/order.controller');
const allOrderController = require('../controller/order/allOrder.controller');
const deleteUser = require('../controller/user/deleteUser');
const deleteProduct = require('../controller/product/deleteProduct');
const allBanners = require('../controller/banner/allBanner');
const DeleteBannerController = require('../controller/banner/deleteBaner');
const UploadBannerController = require('../controller/banner/uploadBaner');
const { forgotPasswordController, resetPasswordController } = require('../controller/user/forgot-password');

router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.post('/send-verification-code', userSignUpController);
router.post('/verify-code', userSignUpController); 
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);


//panel admin
router.get("/all-user",authToken,allUsers);
router.post("/update-user",authToken,updateUser);
router.post("/delete-user",authToken,deleteUser);

router.get("/all-banners",allBanners);
router.post("/upload-Banner",authToken,UploadBannerController);
router.post("/delete-Banner", authToken, DeleteBannerController); 


//subir producto
router.post("/upload-product",authToken,UploadProductController);
router.get("/get-product",getProductController);
router.post("/update-product",authToken,updateProductController);
router.get("/get-categoryProduct",getCategoryProduct);  
router.post("/category-product",getCategoryWiseProduct);
router.post("/product-details",getProductDetails);
router.get("/search",searchProduct);
router.post("/filter-product",filterProductController);
router.post("/delete-product",authToken,deleteProduct);

//carrito
router.post("/addtocart",authToken,addToCartController);
router.get("/countAddToCartProduct",authToken,countAddToCartProduct);
router.get("/view-card-product",authToken,addToCartViewProduct);
router.post("/update-cart-product",authToken,updateAddToCartProduct);
router.post("/delete-cart-product",authToken,deleteAddToCartProduct);

//pago
router.post("/checkout",authToken,paymentController);
router.post('/webhook',webhooks); // /api/webhook
router.get("/order-list",authToken,orderController);
router.get("/all-order",authToken,allOrderController);

//chat



module.exports = router;