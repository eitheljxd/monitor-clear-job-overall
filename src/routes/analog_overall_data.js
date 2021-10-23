const express = require("express");
const { overAllData } = require("../config/db");
const moment = require("moment");

const routes = express.Router({
  mergeParams: true,
});

const { Sequelize } = require("sequelize");

routes.get("/", async (req, res) => {
  const date = moment().subtract("1", "day").format("YYYY-MM-DD");
  let result = await getOverAllData(date);
  console.warn(
    `Se borrará ${result.length} registro(s) creado(s) antes de la fecha ${date}`
  );
  const ids = await getIds(result);
  await deleteOverAllData(ids);
  res.json({
    success: true,
    rows_affected: result.length,
    messages: `Se borro ${result.length} registro(s) creado(s) antes de la fecha ${date}`,
  });
});
async function getOverAllData(date) {
  const sequelize = Sequelize;
  return await overAllData.findAll({
    limit: 50000,

    where: sequelize.where(
      sequelize.fn("DATE", sequelize.col("create_date")),
      "<=",
      date
    ),

    // where: {
    //   create_date: {
    //     [Op.lte]: date,
    //   },
    // },
  });
}
async function deleteOverAllData(ids) {
  return await overAllData.destroy({
    where: {
      row_analog_overall_data: ids,
    },
  });
}
async function getIds(topics) {
  let ids = [];
  topics.forEach((element) => {
    ids.push(element.dataValues.row_analog_overall_data);
  });
  return ids;
}
module.exports = {
  routes,
};
