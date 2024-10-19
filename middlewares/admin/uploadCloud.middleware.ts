import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

let streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream({
      resource_type: "auto"
    },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const uploadToCloudinary = async (buffer: any) => {
  let result = await streamUpload(buffer) || "";
  return result["url"];
}

export const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if(req["file"]) {
    const link = await uploadToCloudinary(req["file"].buffer);
    req.body[req["file"].fieldname] = link;
    next();
  } else {
    next();
  }
}

export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log('oke')
  for (const key in req["files"]) {
    const links = [];
    for (const item of req["files"][key]) {
      try {
        const link = await uploadToCloudinary(item.buffer);
        links.push(link);
      } catch (error) {
        console.log(error);
      }
    }
    req.body[key] = links;
  }
  next();
}