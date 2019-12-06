"use strict";
module.exports = (sequelize, DataTypes) => {
  const postImage = sequelize.define(
    "postImage",
    {
      name: DataTypes.STRING,
      path: DataTypes.STRING,
      postId: DataTypes.INTEGER
    },
    {}
  );
  postImage.associate = function(models) {
    // associations can be defined here
    postImage.belongsTo(models.post); //postimage dimiliki oleh post
  };
  return postImage;
};
