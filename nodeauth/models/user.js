var mongoose = require('mongoose');

mongoose.connect('mongodb://tuan:123123@ds151993.mlab.com:51993/nodeauth01');
var db = mongoose.connection;
var userSchema = mongoose.Schema({
	username:{
		type:String,
		index: true
	},
	password:{
		type:String,
	},
	name:{
		type:String,
	},
	image:{
		type:String,
	},
	email:{
		type:String,
	}
});

var User = module.exports = mongoose.model('Users',userSchema);

module.exports.createUser = function (newUser, callback) {
	newUser.save(callback);
}