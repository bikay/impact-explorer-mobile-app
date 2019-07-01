import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { UserTypes } from '../Redux/UserRedux'
import { ProvinciesTypes } from '../Redux/ProvinciesRedux'
import { ProductListTypes } from '../Redux/ProductListRedux'
import { TravelGuideTypes } from '../Redux/TravelGuideRedux'
import { FindMorePagesTypes } from '../Redux/FindMorePagesRedux'
import { NewsTravelTipTypes } from '../Redux/NewsTravelTipRedux'
import { NewsBlogTypes } from '../Redux/NewsBlogRedux'
import { BlogArticleTypes } from '../Redux/BlogArticleRedux';
import { NewsArticlePageTypes } from '../Redux/NewsArticlePageRedux';
import { ProjectTypes } from '../Redux/ProjectRedux';
import { ProductPageTypes } from '../Redux/ProductPageRedux';
import { BookingTypes } from './../Redux/BookingRedux'
import { BookingProductDetailTypes } from './../Redux/BookingProductDetailRedux'
import { SearchResultTypes } from './../Redux/SearchResultRedux'
import { CheckoutTypes } from './../Redux/CheckoutRedux'
import { LoginTypes } from './../Redux/LoginRedux'
import { UserInfoTypes } from './../Redux/UserInfoRedux'
import { UserInfoUpdateTypes } from './../Redux/UserInfoUpdateRedux'
import { SetAuthTokenTypes } from './../Redux/SetAuthTokenRedux'
import { UserRegisterTypes } from './../Redux/UserRegisterRedux'
import { SaveFavoriteTypes } from './../Redux/SaveFavoriteRedux'
import { FavoriteItemsTypes } from './../Redux/FavoriteItemsRedux'
import { SocialAuthTypes } from './../Redux/SocialAuthRedux'
import { ForgotPwdTypes } from './../Redux/ForgotPwdRedux'


/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getUser } from './UserSagas'
import { getProvincies } from './ProvinciesSagas'
import { getProductList } from './ProductListSagas'
import { getTravelGuide } from './TravelGuideSagas'
import { getFindMorePages } from './FindMorePagesSagas'
import { getNewsTravelTip } from './NewsTravelTipSagas'
import { getNewsBlog } from './NewsBlogSagas'
import { getBlogArticle } from './BlogArticleSagas'
import { getNewsArticlePage } from './NewsArticlePageSagas'
import { getProject } from './ProjectSagas'
import { getBooking } from './BookingSagas'
import { getBookingProductDetail } from './BookingProductDetailSagas'
import { getProductPage } from './ProductPageSagas'
import { getSearchResult } from './SearchResultSagas'
import { getCheckout } from './CheckoutSagas'
import { login, logout } from './LoginSagas'
import { getUserInfo } from './UserInfoSagas'
import { userInfoUpdate } from './UserInfoUpdateSagas'
import { setAuthToken } from './SetAuthTokenSagas'
import { userRegister } from './UserRegisterSagas'
import { saveFavorite } from './SaveFavoriteSagas'
import { getFavorite } from './FavoriteItemsSagas'
import { postSocialAuth } from './SocialAuthSagas'
import { postForgotPwd } from './ForgotPwdSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(UserTypes.USER_REQUEST, getUser),
    takeLatest(ProvinciesTypes.PROVINCIES_REQUEST, getProvincies, api),
    takeLatest(ProductListTypes.PRODUCT_LIST_REQUEST, getProductList, api),
    takeLatest(TravelGuideTypes.TRAVEL_GUIDE_REQUEST, getTravelGuide, api),
    takeLatest(FindMorePagesTypes.FIND_MORE_PAGES_REQUEST, getFindMorePages, api),
    takeLatest(NewsTravelTipTypes.NEWS_TRAVEL_TIP_REQUEST, getNewsTravelTip, api),
    takeLatest(NewsBlogTypes.NEWS_BLOG_REQUEST, getNewsBlog, api),
    takeLatest(BlogArticleTypes.BLOG_ARTICLE_REQUEST, getBlogArticle, api),
    takeLatest(NewsArticlePageTypes.NEWS_ARTICLE_PAGE_REQUEST, getNewsArticlePage, api),
    takeLatest(ProjectTypes.PROJECT_REQUEST, getProject, api),
    takeLatest(ProductPageTypes.PRODUCT_PAGE_REQUEST, getProductPage, api),
    takeLatest(BookingTypes.BOOKING_REQUEST, getBooking, api),
    takeLatest(BookingProductDetailTypes.BOOKING_PRODUCT_DETAIL_REQUEST, getBookingProductDetail, api),
    takeLatest(SearchResultTypes.SEARCH_RESULT_REQUEST, getSearchResult, api),
    takeLatest(CheckoutTypes.CHECKOUT_REQUEST, getCheckout, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST,logout, api),
    takeLatest(UserInfoTypes.USER_INFO_REQUEST, getUserInfo, api),
    takeLatest(UserInfoUpdateTypes.USER_INFO_UPDATE_REQUEST, userInfoUpdate, api),
    takeLatest(SetAuthTokenTypes.SET_AUTH_TOKEN_REQUEST, setAuthToken, api),
    takeLatest(UserRegisterTypes.USER_REGISTER_REQUEST, userRegister, api),
    takeLatest(SaveFavoriteTypes.SAVE_FAVORITE_REQUEST, saveFavorite, api),
    takeLatest(FavoriteItemsTypes.FAVORITE_ITEMS_REQUEST, getFavorite, api),
    takeLatest(SocialAuthTypes.SOCIAL_AUTH_REQUEST, postSocialAuth, api),
    takeLatest(ForgotPwdTypes.FORGOT_PWD_REQUEST, postForgotPwd, api),

  ])
}



