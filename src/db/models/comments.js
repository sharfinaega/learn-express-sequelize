"use strict";
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define(
    "comments",
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {}
  );
  comments.associate = function(models) {
    comments.belongsTo(models.user);
    comments.belongsTo(models.post);
    // associations can be defined here
  };
  return comments;
};
