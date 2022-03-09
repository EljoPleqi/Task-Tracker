module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    avatar: { type: DataTypes.STRING, allowNull: false },
    password: {
      type: DataTypes.STRING(),
      validate: {
        min: 12,
        max: 64,
      },
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      validate: { is: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ },
      allowNull: false,
      unique: true,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Tasks, {
      onDelete: 'cascade',
    });
  };
  return Users;
};
