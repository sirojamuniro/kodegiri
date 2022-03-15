const bcrypt = require("bcrypt");
const sequelizeSoftDelete = require('sequelize-soft-delete');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		photo: DataTypes.STRING,
		name: DataTypes.STRING,
		gender: DataTypes.STRING,
		place_dob: DataTypes.STRING,
		dob: DataTypes.DATEONLY,
        email: DataTypes.STRING,
		phone: DataTypes.STRING,
        password: DataTypes.STRING,
		idnumber: DataTypes.STRING,
		nik:DataTypes.STRING,
        token: DataTypes.TEXT,
		verification_code:DataTypes.STRING,
		status: DataTypes.STRING,
        role: DataTypes.STRING,
		email_verified_at:DataTypes.DATE,
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
	},{
		indexes: [
			{
				unique: true,
				fields: ['status','title']
			}
		]
	})
	

	User.prototype.toJSON =  function () {
		var values = Object.assign({}, this.get());

		delete values.password;
		delete values.confirm_password;
		return values;
	}

	const options = {field: 'deleted', deleted: 1}
  	sequelizeSoftDelete.softDelete(User, options)

    return User
}