(function(){
	Ext.onReady(function(){
		//利用Ext.define的方式来创建一个类
		Ext.define("person",{
			extend:'Ext.data.Model',
			fields:[
				{name:'name',type:'string'},
				{name:'age',type:'int'},
				{name:'email',type:'auto'}
			]
		});
		//使用regModel的方法创建一个类
		Ext.regModel("user",{
			fields:[
				{name:'name',type:'string'},
				{name:'age',type:'int'},
				{name:'email',type:'auto'}
			],
			validations:[
				{type:'length',filed:'name',min:2,max:6}
			]
		});
		//实例化该累
		var user1 = new user({
			name:'chensanyong',
			age:11,
			email:'babychensanyong@163.com'
		});
		alert(user1.get('age'));
		//推荐使用的方法
		var person1 = Ext.create("person",{
				name:'chensanyong',
				age:11,
				email:'babychensanyong@163.com'	
		});
		alert(person1.get('name'));
		//使用ModelManager进行创建对象
		var p2 = Ext.ModelManager.create({
			name:'chensanyong',
			age:11,
			email:'babychensanyong@163.com'	
		},"user");
		alert(p2.get('email'));//获得该对象的名称
		alert(user.getName());//获得对象的类名
		
	});
})();