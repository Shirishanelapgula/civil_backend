const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"shirishanelapogula1999@gmail.com",
        pass:"oidyntjezpphjnws"

    }
})

const userSignUp = async(req,res) =>{
    try{
        const {password} = req.body

        const hashedPassword = await bcrypt.hash(password,10)
        
        const user = await User.create({username:req.body.username,email:req.body.email,password:hashedPassword})
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message:error.message})

    }

}

const userlogin = async(req,res) =>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message:"User not found"})

        }else{
            const isPasswordMatched = await bcrypt.compare(password , user.password)

            if (isPasswordMatched){
                await User.findByIdAndUpdate(user._id,{logintime:new Date()})
                res.status(200).json({message:"User logged in successfully"})

            }else{
                res.status(401).json({message:"User password entered incorrectly"})
            }

        }
    }catch(error){
        res.status(500).json({message:error.message})

    }

}

const getInactiveUsers = async(req,res)=>{
    try{
        const days = parseInt(req.params.days,10);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days)

        const inactiveUserData = await User.find({logintime :{$lt:cutoffDate}});

        res.status(200).json(inactiveUserData)

    }catch(error){
        res.status(500).json({message:error.message})

    }
}

const getVisitedCheckoutPageUsers = async(req,res)=>{
    try{
        const visitedCheckoutPageData = await User.find({});

        const visitedReturnData = visitedCheckoutPageData.filter((each)=>each.visitedCheckoutPage === true && each.purchasedCourse === false)

        res.status(200).json(visitedReturnData)

    }catch(error){
        res.status(500).json({message:error.message})

    }
}


const updateCheckoutuserData = async(req,res)=>{
    try{
        const {email} = req.body

        const user = await User.findOne({email})
        
        const status = user.visitedCheckoutPage

        await User.findByIdAndUpdate(user._id,{visitedCheckoutPage:!status});

        res.status(200).json({message:`status updated successfully as ${!status}`})

    }catch(error){
        res.status(500).json({message:error.message})

    }
}

const updatePurchasedUserData = async(req,res)=>{
    try{

        
        const {email} = req.body

        const user = await User.findOne({email})

        const status = user.purchasedCourse

        await User.findByIdAndUpdate(user._id,{purchasedCourse:!status});

        res.status(200).json({message:`status updated successfully as ${!status}`})

    }catch(error){
        res.status(500).json({message:error.message})

    }
}

const sendPurchaseNotification = async(req,res)=>{

    try{
        const {email} = req.body

        const user = await User.findOne({email})

        const mailOptions={
            from:"shirishanelapogula1999@gmail.com",
            to:user.email,
            subject:"Remainder:Complete Your Purchase",
            text:`Hello ${user.username}, you have not completed purchase, please complete`
        }

        await transporter.sendMail(mailOptions)

        res.status(200).json({message:"Purchase Remainder Sent Successfully"})

    }catch(error){
        res.status(500).json({message:error.message})

    }
}

const sendInactiveNotification = async(req,res)=>{

    try{
        
        const {email} = req.body

        const user = await User.findOne({email})

        const mailOptions={
            from:"shirishanelapogula1999@gmail.com",
            to:user.email,
            subject:"Remainder:You have not logged in to your Account these days",
            text:`Hello ${user.username}, Its been a while, Checkout the latest updates from our website`
        }

        await transporter.sendMail(mailOptions)

        res.status(200).json({message:"Login Remainder Sent Successfully"})

    }catch(error){
        res.status(500).json({message:error.message})

    }
}


const getLoggedInUser = async(req,res)=>{
    try{
        const {email} = req.body

        const user = await User.findOne({email})

        res.status(200).json(user)

    }catch(error){
        res.status(500).json({message:error.message})

    }
}


module.exports = {userSignUp , userlogin, getInactiveUsers,getVisitedCheckoutPageUsers,updateCheckoutuserData,updatePurchasedUserData,sendPurchaseNotification,sendInactiveNotification,getLoggedInUser}