import { Request, Response } from "express";
import md5 from 'md5';
import { generateRandomString } from "../../helpers/generate.helper";
import User from "../../models/user.model";

// [GET] /user/register
export const register = (req: Request, res: Response) => {
  res.render("client/pages/users/register", {
    pageTitle: "Đăng ký"
  })
}

// [POST] /user/register
export const registerPost = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body

    if(!fullName || !email || !password) {
      res.redirect("back")
    }
    
    try { 
      const existEmail = await User.findOne({
        email: email
      })

      if(existEmail){
        res.redirect("back")
        return
      }

      
      const data = {
        fullName: fullName,
        email: email,
        password: md5(password)
      }
      
      const authToken = generateRandomString(30)
      data["authToken"] = authToken

      const newUser = new User(data)
      await newUser.save()

      res.cookie("authToken", authToken)

      res.redirect("/topics")
      
    } catch (error) {
      res.location("back")
    }
}

// [GET] /user/login
export const login = (req: Request, res: Response) => {
  res.render("client/pages/users/login", {
    pageTitle: "Đăng nhập"
  })
}

// [POST] /user/login
export const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if(!email || !password){
    res.redirect("back")
    return
  }

  const existUser = await User.findOne({
    email: email
  })
  
  if(existUser){
    if(md5(password) === existUser.password){
      res.cookie("authToken", existUser.authToken)
      res.redirect("/topics")
      return
    }
    res.redirect("back")
    return
  }
  res.redirect("back")
}

// [GET] /user/logout
export const logout = (req: Request, res: Response) => {
  if(req.cookies.authToken){
    res.clearCookie("authToken")
    res.redirect("back")
  }
}