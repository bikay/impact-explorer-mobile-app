import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  header: require('./HeaderRedux').reducer,
  user: require('./UserRedux').reducer,
  province: require('./ProvinciesRedux').reducer,
  productList: require ('./ProductListRedux').reducer,
  travelGuide: require ('./TravelGuideRedux').reducer,
  findMorePages: require ('./FindMorePagesRedux').reducer,
  newsTravelTip:require ('./NewsTravelTipRedux').reducer,
  newsBlog:require ('./NewsBlogRedux').reducer,
  blogArticle:require ('./BlogArticleRedux').reducer,
  newsArticlePage:require ('./NewsArticlePageRedux').reducer,
  project: require('./ProjectRedux').reducer,
  productPage: require('./ProductPageRedux').reducer,
  booking: require('./BookingRedux').reducer,
  bookingProDetail: require('./BookingProductDetailRedux').reducer,
  searchResult: require('./SearchResultRedux').reducer,
  checkout: require('./CheckoutRedux').reducer,
  forgotPwd: require('./ForgotPwdRedux').reducer,


  login: require('./LoginRedux').reducer,
  userInfo: require('./UserInfoRedux').reducer,
  userUpdate: require('./UserInfoUpdateRedux').reducer,
  getAuthToken: require('./SetAuthTokenRedux').reducer,
  clearToken: require('./SetAuthTokenRedux').reducer,
  register: require('./UserRegisterRedux').reducer,
  saveFav: require('./SaveFavoriteRedux').reducer,
  favoriteItems: require('./FavoriteItemsRedux').reducer,
  socialAuth: require('./SocialAuthRedux').reducer,
  statusConnection: require('./StatusConnectionRedux').reducer,


})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
