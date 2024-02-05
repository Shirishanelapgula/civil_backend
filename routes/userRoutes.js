const express = require("express")

const router = express.Router()

const {getLoggedInUser,userSignUp , userlogin,getInactiveUsers,getVisitedCheckoutPageUsers,updateCheckoutuserData,updatePurchasedUserData,sendPurchaseNotification,sendInactiveNotification} = require("../controlers/userControler")

router.post("/sign-up" ,userSignUp)

router.post("/login" ,userlogin)

router.post("/get-logged-in-user",getLoggedInUser)

router.get("/inactive-users/:days",getInactiveUsers)

router.get("/visited-checkout-page-users",getVisitedCheckoutPageUsers)

router.post("/update-checkout-page",updateCheckoutuserData)

router.post("/update-purchase-page",updatePurchasedUserData)

router.post("/purchase-remainder",sendPurchaseNotification)

router.post("/login-remainder",sendInactiveNotification)

module.exports = router

