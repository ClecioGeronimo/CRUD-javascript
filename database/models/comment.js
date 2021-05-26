
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    postId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
 
  return Comments;
};