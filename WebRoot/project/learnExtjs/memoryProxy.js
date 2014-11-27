(function(){
	Ext.onReady(function(){
		//1、定义一个数据模型
		Ext.regModel('Person',{
			fields:[
				{name:"name",type:'string'},
				{name:'age',type:'int'}
			]
		});
		//2、创建数据
		var personData = [
			{name:'陈三勇',age:25},
			{name:'李欢丽',age:24}
		] ;
		//3、创建读取器
		var memoryProxy  = new Ext.data.proxy.Memory({
			data:personData,
			model:'Person'
		});
		
		//更新操作
		memoryProxy.update(new Ext.data.Operation()({
			action:'test',
			data:'personData'
		}),function(reslut){},this);
		
		
		//读取内容
		memoryProxy.read(new Ext.data.Operation(),function(result){
			var datas =  result.resultSet.records;
			Ext.Array.each(datas,function(model){
				alert(model.get("name"));
			});
		});
	});
	
})();