(function(){
	Ext.onReady(function(){
		Ext.define('User',{
			extend:'Ext.data.Model',
			fields:['id','name','email'],
			hasMany:{model:'Order',name:'orders'}
		});
		Ext.define('Order',{
			extend:'Ext.data.Model',
			fields:['id','user_id','status','price'],
			belongsTo:'User'
		});
//		var user = Ext.create(User,{
//			id:'1',
//			name:'chen',
//			email:'babychensanyong@163.com',
//			Orders:[{
//				id:'order1',
//				user_id:'1',
//				status:'true',
//				price:'111'
//			},{
//				id:'order1',
//				user_id:'1',
//				status:'true',
//				price:'111'
//			}]
//		});
		var userData = {
				//total:200,
				count:250,
				myResult:'123',
				users:[{
					auditor:'chensy',
					info:{
						id:'1',
						name:'chen',
						email:'babychensanyong@163.com',
						orders:[{
							id:'order1',
							user_id:'1',
							status:'true',
							price:'111'
						},{
							id:'order2',
							user_id:'1',
							status:'true',
							price:'112'
						}]
					}
				}]
			};
		//直接用user.id 无法或得到对象中的属性
//		console.log(user.id+" 222 	"+user.name+"   email：  "+ user.email);
//		console.log("id :" + user.get('id') + "	name :" + user.get('name') + " email: " + user.get('email'));
		//这样是无法获得到对应的orders对象的
		//var Orders = user.get('orders');
		var memroy = Ext.create('Ext.data.proxy.Memory',{
			autoLoad:true,
			model:'User',
			data:userData,
			reader:{
				type:'json',
				root:'users',
				implicitIncludes:true,
				totalProperty:'count',//如果配置了这个属性，那么在返回的数据中可以使用自定义的字段
				record:'info'//定义开始读取信息的位置，
			}
		});
		memroy.read(new Ext.data.Operation(),function(result){
			var datas = result.resultSet.records;
			//自定义的属性是无法进行加载的
			console.log("自定义的某个属性，查看是否能够进行加载"+datas.myResult);
			//total获得条数
			console.log("数据的条数有："+result.resultSet.total);
			//返回的records是一个数组，数组内放着对象Model，通过对象.orders()获得的是store，store内是record
			Ext.Array.each(datas, function(model){
				console.log(model.get('name'));
				var orderStore = model.orders();
				//store的遍历方式
				for(var i = 0 ;i < orderStore.getCount(); i++){
					var tempRec = orderStore.getAt(i);
					console.log(tempRec.get("id") + tempRec.get("price"));
				}
			});
			//order的另一种遍历方式
			var user = datas[0];
			var orders = user.orders();
			orders.each(function(order){
				console.log(order.get("price"));
			});
		});

		
	});
})();