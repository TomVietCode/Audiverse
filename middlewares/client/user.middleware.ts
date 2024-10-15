import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model";

export const userInfo = async (req: Request, res: Response, next: NextFunction) => {
  if(req.cookies.authToken){
    const user = await User.findOne({
      authToken: req.cookies.authToken
    }).select("_id fullName authToken")

    if(user){
      res.locals.user = user
    }
  }

  next()
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authToken: string = req.cookies.authToken
  
  if(authToken){
    const validUser = await User.findOne({
      authToken: authToken
    }).select("_id fullName authToken")

    if(!validUser){
      res.redirect("/user/login")
      return
    }

    res.locals.user = validUser

    next()
  }else{
    res.redirect("/user/login")
  }
}