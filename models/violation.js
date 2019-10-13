
module.exports = (sequelize, DataTypes) => {
  const Violation = sequelize.define('violation', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    inspection_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    comments: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false,
    tableName: 'violation',
  });

  Violation.associate = function associate(models) {
    const { inspection, violation } = models;

    violation.belongsTo(inspection, {
      foreignKey: 'inspection_id',
    });
  };
  return Violation;
};
