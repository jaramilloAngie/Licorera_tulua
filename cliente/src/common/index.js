const backendDomin = process.env.REACT_APP_BACKEND_URL//"http://localhost:8080"

const SummaryApi = {
    sendVerificationCode: {
        url: `${backendDomin}/api/send-verification-code`, // Asegúrate de que esta URL sea correcta
        method: "post"
    },
    verifyCode: {
        url: `${backendDomin}/api/verify-code`, // Asegúrate de que esta URL sea correcta
        method: "post"
    },
    forgotPassword: {
        url: `${backendDomin}/api/forgot-password`, // Asegúrate de que esta URL sea correcta
        method: "post"
    },
    resetPassword: {
        url: `${backendDomin}/api/reset-password`, // Asegúrate de que esta URL sea correcta
        method: "post"
    },
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api//countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    deleteUser: {
        url: `${backendDomin}/api/delete-user`,
        method: 'post'
    },
    deleteProduct: {
        url: `${backendDomin}/api/delete-product`,
        method: 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    payment : {
        url : `${backendDomin}/api/checkout`,
        method : 'post'
    },
    getOrder : {
        url : `${backendDomin}/api/order-list`,
        method : 'get'
    },
    allOrder : {
        url : `${backendDomin}/api/all-order`,
        method : 'get'
    },
    uploadBanner: {
        url : `${backendDomin}/api/upload-Banner`,
        method : 'post'
    },
    deleteBanner : {
        url : `${backendDomin}/api/delete-Banner`,
        method : 'post'
    },
    allBanner : {
        url : `${backendDomin}/api/all-banners`,
        method : 'get'
    }

}


export default SummaryApi