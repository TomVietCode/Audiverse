import { Request, Response } from "express";
import unidecode from "unidecode"
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

export const searchResult = async (req: Request, res: Response) => {
  const type: string = req.params.type
  const keyword: string = `${req.query.keyword}`
  try {
    if(keyword){
      const decodeKeyword = unidecode(keyword).trim()
      const slugKeyword = decodeKeyword.replace(/\s+/g, "-")
      const regex = new RegExp(slugKeyword, "i")
      
      const songResult = await Song.find({
        slug: regex
      }).select("title singerId avatar slug like").lean()
  
      if(songResult.length > 0){
        for (const song of songResult) {
          const singer = await Singer.findOne({
            _id: song.singerId
          }).select("name")
  
          song["singer"] = singer?.name || "No data"
        }
      }

      switch (type) {
        case "result":
          res.render("client/pages/search/result", {
            pageTitle: `Tìm kiếm: ${keyword}`,
            keyword: keyword,
            result: songResult 
          })
          break;
        case "suggest":
          res.json({
            code: 200,
            suggests: songResult
          })
          break
        default:
          break;
      }
    }
  } catch (error) {
    res.redirect("back")
  }
}