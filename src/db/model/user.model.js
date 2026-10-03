import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { blogModel } from "./blog.model.js";

export let userModel = sequelize.define("user",{
  firstName : {
    type : DataTypes.STRING(255),
    allowNull : false,
    get(){
      let prefix ="MR/" 
      if(this.getDataValue("gender") == "female"){
        prefix = "MRS/"
      }
      return prefix + " " + this.getDataValue("firstName")
    },
    validate:{
      len: [2,20],
      isAlpha:true,
      notAdmin(value){
        if(value == "admin") throw new Error("wrong first name" , {cause : 400})
      }
    }
  },
  lastName:{
    type : DataTypes.STRING(255),
    allowNull:false,
    validate:{
      len : [2,20],
      isAlpha:true,
    }
  },
  userName:{
    type : DataTypes.VIRTUAL,
    get(){
      return this.getDataValue("firstName")+ " " + this.getDataValue("lastName")
    },

    set(value){
      let [firstName , lastName] = value.split(" ")
      this.setDataValue("firstName" ,firstName )
      this.setDataValue("lastName" ,lastName )
    }
    
  }, 
  email : {
    type : DataTypes.STRING(255),
    allowNull : false,
    unique : true,
    validate:{
      isEmail : true
    }
  },
  password:{
    type : DataTypes.STRING(255),
    allowNull : false,
  },
  gender:{
    type : DataTypes.STRING(255),
    enum : ["male" , "female"],
    defaultValue : "male"
  },
  DOB :{
    type : DataTypes.DATE,
    get(){
      return new Date().getFullYear() - new Date(this.getDataValue("DOB")).getFullYear()
    }
  }
},{
  timestamps : true,
  paranoid : true,
  validate:{
    checkName(){
      if(this.getDataValue("firstName") == this.getDataValue("lastName")) throw new Error("identical name" , { cause :400 })
    }
  }
}) 






