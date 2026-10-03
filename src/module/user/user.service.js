import { blogModel, userModel } from "../../db/model/index.js"


export const createUser = async (data) => {
  let { firstName, lastName, email, password, DOB, userName } = data
  DOB = new Date(DOB)
  let user = await userModel.create({ email, firstName, lastName, email, password, DOB, userName })
  return user
}

export const getAllUsers = async (data) => {
  let page = (data.page ? Number(data.page) : 1) || 1
  let limit = (data.limit ? Number(data.limit) : 5) || 5
  let offset = (page - 1) * limit
  console.log({
    page, limit, offset
  })
  return await userModel.findAll({
    limit,
    offset,
    order: [data.sort ?? "id"],
    include : [{model : blogModel}]
  })
}


export const getUser = async (data) => {
  return await userModel.findByPk(27)
}

export const updateUser = async (id, data) => {
  // return await userModel.update(data, { where: { id } })
  let result = await userModel.upsert({
    // id ,
    ...data
  })
  console.log(result)
  return result
}

export const deleteUser = async id => await userModel.destroy({ where: { id } })

export const hardDeleteUser = async id => await userModel.destroy({ where: { id } , force: true } )

export const restoreUser = async id => await userModel.restore({ where: { id } })

export const getUserById = async id => await userModel.findByPk(id, { paranoid: false })