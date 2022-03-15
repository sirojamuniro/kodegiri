const bcrypt = require("bcrypt");
const sequelizeSoftDelete = require('sequelize-soft-delete');

module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('events', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING,
		start_time:{
			type: DataTypes.DATE
		},
		location: DataTypes.STRING,
		is_active:{
			type: DataTypes.BOOLEAN,
			defaultValue: false
        },
        image: DataTypes.STRING,
		deleted: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
		}
	}
	, {
		freezeTableName: true,
        timestamps: false,
		defaultScope: {
			where: {
				deleted: false
			}
		}
	})
	

	const options = {field: 'deleted', deleted: 1}
  	sequelizeSoftDelete.softDelete(Event, options)

    return Event
}