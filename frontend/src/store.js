import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReducer,
    productReviewsReducer,
    productsReducer,
    reviewReducer,
} from "./reducers/productReducer";
import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
} from "./reducers/orderReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "cart"], // specify which reducers to persist
};

const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newReview: newReviewReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Retrieve user authentication state from localStorage
const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

let initialState = {
    user: {
        isAuthenticated,
        // Add other user properties here if needed
    },
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const middleware = [thunk];

const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
