(function(){
	Ext.data.validations.lengthMessage="长度错误";
	Ext.onReady(function(){
		//拓展一个validations用于自定义校验类，用了覆盖类
		Ext.apply(Ext.data.validations,{
			/**
			 * 定义一个校验age的方法，在以后定义组件的时候可以利用重写的方法
			 * 来增加校验能力；
			 * ageMessage可以用了定义不满足要求是的提示信息
			 * config 配置的基本信息；
			 * 在定义类的时候可以使用，validations:[{type:'age',field:'age',min:8,max:10}]
			 * 中括号内的内容就是config配置信息，是个数组，可以通过点属性的形式进行访问；
			 * 
			 * */
			age:function(config,value){
				var min = config.min;
				var max = config.max;
				if(min<=value && value<=max){
					return true;
				}else{
					this.ageMessage='年龄的范围应该在'+min +"到"+max+"之间2";
					return false;
				}
			},	
			ageMessage:'age数据错误1'
		});
		//声明一个对象
		Ext.regModel("User",{
			fields:[
				{name:'name',type:'string'},
				{name:'age',type:'int'},
				{name:'email',type:'auto'}
			],
			//添加校验的信息，type表示校验的类型，field 表示的是属性的名称，min是最小值，max最大值
			validations:[
				{type:'length',field:'name',min:2,max:6},
				{type:'age',field:'age',min:8,max:10}
			]
		});
		//创建该对象
		var user1 = Ext.create("User",{
			name:'babyhhcsy',
			age:'12',
			email:'babychensanyong@163.com'
		});
		//定义错误类型
		var errors = user1.validate();
		var errorInfo = [];
		errors.each(function(item){
			errorInfo.push(item.field+"Message"+item.message);
		})
		alert(errorInfo.join("\n"));
	});	
})();