"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.post, { as: "userPosts", foreignKey: "userId" }); //kalo mau banyak posting dalam 1 id, hasOne ganti jadi hasMany
    //as untuk ganti nama post jd userposts, tambahin juga foreignKey untuk kasih tau kalo key di models namanya "userId"
    user.hasMany(models.comments, { as: "userComments" });
  };
  return user;
};
