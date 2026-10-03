import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { userModel } from "./user.model.js";


export let blogModel = sequelize.define("blog" , {
  title : {
    type : DataTypes.STRING,
    allowNull :false
  },
  content : {
    type : DataTypes.STRING,
    allowNull :false
  }
} ,{
  timestamps : true,
  paranoid : true
})

