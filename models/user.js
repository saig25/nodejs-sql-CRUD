module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
      user_id: {
        type: DataTypes.STRING,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_image: {
        type: DataTypes.STRING,
      },
      total_orders: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      last_login: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }

    });
    return user;
  };