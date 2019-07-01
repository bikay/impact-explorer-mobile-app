// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://impactexplorer.asia/wp-json/ie-api/v1/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application',
      'Content-Type': 'application/json'
    },
    // 10 second timeout...
    timeout: 60000
  })

  // ------ 
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.setHeader('Authorization', '')
  const login = (autObj) => api.post('/profile/login?username='+autObj.username+'&password='+autObj.password)
  const getUserInfo = () => api.get('/profile/userInfo')
  const userInfoUpdate = (data) => api.post('/profile/editProfile', data)
  const userRegister = (data) => api.post('/profile/register', data)
  
  const getProvincies = ()=>api.get('/blocksBelowMap')
  const getProductList = () => api.get('/productsList')
  const getTravelGuide = () => api.get('/impactTravelGuide')
  const getFindMorePages = () => api.get('/findMorePages')
  const getProject = (id) => api.get('/projectPage?id='+id)

  const getNewsTravelTip =() =>api.get('/newsTravelTips')
  // const getNewsTravelTip =() =>api.get('/travelTips')
  const getNewsBlog =() =>api.get('/newsBlog/1')
  const getBlogArticle =(id) =>api.get('/blogArticle?id='+id)
  const getNewsArticlePage =(id) =>api.get('/articlePage?id='+id)
  // const getBlogArticle =() =>api.get('/blogArticle?id=2527')
  const getBooking = () => api.get('/bookingDetails')



  // const getProductPage = () => api.get('/productDetails?id=4034')
  const getProductPage = (id) => api.get('/productDetails?id='+id)


  const getBookingProductDetail = (data) => api.get('/bookingProductDetails?id='+data)
  const getSearchResult = (data) => api.get('/searchResults/1?s='+data)
  const saveFavorite = (data) => api.post('/favorites', data)
  const getFavorite = () => api.get('/favorites?')
  // const getCheckout = (data) => api.post('/createBooking', data)
  const getCheckout = (data) => api.post('/pay-booking', data)
  const postSocialAuth = (data) => api.post('/auth/social', data)
  const postForgotPwd = (data) => api.post('auth/forgot-password', data)






  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    setAuthToken,
    removeAuthToken,
    login,
    userRegister,
    getUserInfo,
    userInfoUpdate,
    getProvincies,
    getProductList,
    getTravelGuide,
    getFindMorePages,
    getNewsTravelTip,
    getNewsBlog,
    getBlogArticle,
    getNewsArticlePage,
    getProject,
    getBooking,
    getBookingProductDetail,
    getProductPage,
    getSearchResult,
    saveFavorite,
    getFavorite,
    getCheckout,
    postSocialAuth,
    postForgotPwd

  }
}

// let's return back our create method as the default.
export default {
  create
}
