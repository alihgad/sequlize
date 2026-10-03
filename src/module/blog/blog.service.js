
import { blogModel, userModel } from "../../db/model/index.js"
export const createBlog = async (data) => {
  return await blogModel.create(data)
}

export const getAllBlogs = async(data)=>{
  return await blogModel.findAll({
    include : [{model : userModel  ,attributes :  ["firstName" , "lastName"]}]
  })
}

export const getUserBlogs = async(userId)=>{
  return await blogModel.findAll({
    where : {
      authorId : userId
    } 
  }) 
}

export const updateBlog = async (uId , bId , data)=>{
  return await blogModel.update(data , {
    where : {
      id : bId ,
      authorId : uId
    }
  })
}


export const deleteBlog = async (uId , bId )=>{
  return await blogModel.destroy({
    where : {
      id : bId ,
      authorId : uId
    }
  })
}
export const hardDeleteBlog = async (uId , bId )=>{
  return await blogModel.destroy({
    where : {
      id : bId ,
      authorId : uId
    },
    force : true
  })
}

export const restoreBlog = async (uId , bId )=>{
  return await blogModel.restore({
    where : {
      id : bId ,
      authorId : uId
    }
  })
}