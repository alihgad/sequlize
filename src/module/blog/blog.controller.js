import { Router } from "express"
import * as bs from "./blog.service.js"
import { successResponse } from "../../common/index.js"


export let blogRouter = Router()


blogRouter.post("/", async (req, res) => {
  let data = await bs.createBlog(req.body)
  successResponse({
    res, data, message: "blog created successfuly"
  })
})

blogRouter.get("/", async (req, res) => {
  let data = await bs.getAllBlogs(req.query)
  successResponse({
    res, data, message: "blog fetched"
  })
})


blogRouter.get("/user-blogs/:userId", async (req, res) => {
  let data = await bs.getUserBlogs(req.params.userId)
  successResponse({
    res, data, message: "blogs fetched"
  })
})


blogRouter.put("/:userId/:blogId", async (req, res) => {
  let [data] = await bs.updateBlog(req.params.userId, req.params.blogId, req.body)
  successResponse({
    res, data, message: `blog ${data ? "updated" : "not found"}`, status: data ? 200 : 404
  })
})

blogRouter.delete("/:userId/:blogId", async (req, res) => {
  let data = await bs.deleteBlog(req.params.userId, req.params.blogId)
  successResponse({
    res, data, message: `blog ${data ? "deleted" : "not found"}`, status: data ? 200 : 404
  })
})

blogRouter.delete("/hard/:userId/:blogId", async (req, res) => {
  let data = await bs.hardDeleteBlog(req.params.userId, req.params.blogId)
  successResponse({
    res, data, message: `blog ${data ? "deleted" : "not found"}`, status: data ? 200 : 404
  })
})

blogRouter.patch("/restore/:userId/:blogId", async (req, res) => {
  let data = await bs.restoreBlog(req.params.userId, req.params.blogId)
  successResponse({
    res, data, message: `blog ${data ? "restored" : "not found"}`, status: data ? 200 : 404
  })
})