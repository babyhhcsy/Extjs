function user(){
	this.username = "xunyun";
	this.age = 11;
	var email = "babyhhcsy@163.com";
	this.getEmail = function(){
		return email;
	}
}
var u = new user();
alert(u.age);
alert(u.getEmail());