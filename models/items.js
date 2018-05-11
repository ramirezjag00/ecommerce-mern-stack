const {Datatypes} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
	const Item = sequelize.define("items", {
		name: Datatypes.STRING,
    features: {
        type: Datatypes.ARRAY(Datatypes.STRING)
      },
    included: {
         type: Datatypes.ARRAY(Datatypes.STRING)
      },
    price: Datatypes.INTEGER,
    image: {
         type: Datatypes.ARRAY(Datatypes.STRING)
      },
    date: Datatypes.DATE
	});

	return Item;
};
