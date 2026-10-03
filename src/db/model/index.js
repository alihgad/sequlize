export { userModel } from "./user.model.js"
export { blogModel } from "./blog.model.js"


import { blogModel } from "./blog.model.js"
import { userModel } from "./user.model.js"

blogModel.belongsTo(userModel, {
  foreignKey: {
    name: "authorId",
    allowNull: false
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

userModel.hasMany(blogModel, {
  foreignKey: {
    name: "authorId",
    allowNull: false
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})