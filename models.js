var Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/plantr')

const Gardener = db.define('gardener', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
})

const Plot = db.define('plot', {
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN
})

const Vegetable = db.define('vegetable', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: { type: Sequelize.DATE, defaultValue: Sequelize.NOW}
})

Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'})
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'})

//Vegetable.belongsToMany(Gardener, {through: 'favorite_vegetable'})
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})

Vegetable.create({
  name: "Beans",
  color: "Green",
}).then(() => console.log("created"))
  .catch(er => {console.log(er)})


module.exports = db
