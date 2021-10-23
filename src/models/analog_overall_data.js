module.exports = (sequelize, type) => {
  return sequelize.define(
    "analog_overall_data",
    {
      row_analog_overall_data: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      row_point: type.INTEGER,
      row_survey: type.INTEGER,
      aod_timestamp: type.STRING,
      aod_measure_x: type.DECIMAL,
      aod_measure_y: type.DECIMAL,
      create_user: type.STRING,
      state: {
        allowNull: false,
        type: type.BOOLEAN,
      },
      update_date: type.DATE,
      update_user: type.DATE,
      create_date: type.DATE,
    },
    {
      timestamps: false,
    }
  );
};
