import {User} from "../models/user.models.js"
import { ApiResponse } from "../utils/api-response.js"
import {ApiError } from "../utils/api-error.js"
import { asyncHandler } from "../utils/asynchandler.js"
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js"


const generateAccessTokenAndRefreshToken = async (userId) => {

  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken
    await user.save({vaildateBeforeSave: false})


    return {accessToken,refreshToken}


  } catch (error){
    throw new ApiError(500, "Something went wrong while generating access and refresh token.")

  }    
}


const registerUser = asyncHandler(async (req,res) =>{
  const {email,username,password,role} = req.body

  const existingUser = User.findOne({
    $or : [{username}, {email}]
  })

  if(existingUser){
    throw new ApiError(409, "User with the same email or username already exists.", [])
  }
  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified : false
  })


  const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken
  user.emailVerficationExpiry = tokenExpiry
  
  await user.save({vaildateBeforeSave : false})

  await sendEmail({
      email : user?.email,
      subject : "Please verify your E-mail",
      mailgenContent : emailVerificationMailgenContent(
        user.username,
        `${req.protoocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
      ),
    })
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerficationExpiry"
  )
  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user.")
  }
   return res.status(201).json(new ApiResponse(200,{user : createdUser, message : "User registered successfully and verification E-mail has been sent to your E-mail."}))
})




export {registerUser}
