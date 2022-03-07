module.exports = (sequelize, DataType) => {
  const Tasks = sequelize.define('Tasks', {
    title: { type: DataType.STRING, allowNull: false },
    image: { type: DataType.STRING, allowNull: false },
    duration: { type: DataType.INTEGER, allowNull: false },
    importance: { type: DataType.STRING, allowNull: false },
    status: { type: DataType.BOOLEAN, defaultValue: false },
  });

  return Tasks;
};
