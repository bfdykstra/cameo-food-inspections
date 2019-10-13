
module.exports = (sequelize, DataTypes) => {
  const Inspection = sequelize.define('inspection', {
    inspection_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    dba_name: DataTypes.TEXT,
    aka_name: DataTypes.TEXT,
    license_: DataTypes.INTEGER,
    facility_type: DataTypes.TEXT,
    risk: DataTypes.TEXT,
    address: DataTypes.TEXT,
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    zip: DataTypes.INTEGER,
    inspection_date: DataTypes.DATE,
    inspection_type: DataTypes.TEXT,
    results: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
  }, {
    timestamps: false,
    tableName: 'inspection',
  });
  Inspection.associate = function associate(models) {
    console.log('models: ', models);
    const { inspection, violation } = models;
    inspection.hasMany(violation, {
      foreignKey: 'inspection_id',
      sourceKey: 'inspection_id',

    });
  };
  return Inspection;
};
