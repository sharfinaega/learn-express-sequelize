"use strict";
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    "post",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  post.associate = function(models) {
    // associations can be defined here
    post.belongsTo(models.user); //post dimiliki oleh user
    post.hasMany(models.comments, { as: "postComments" });
    post.hasOne(models.postImage); //post memiliki satu postimage
  };
  return post;
};
