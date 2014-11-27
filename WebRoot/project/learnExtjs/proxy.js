(function(){
	Ext.onReady(function(){
		Ext.define("Person",{
			extend:'Ext.data.Model',
			fields:[
				{name:'name',Type:'auto'},
				{name:'age',type:'int'},
				{name:'email',type:'auto'}
			],
			//定义数据访问模型
			proxy:{
				type:'ajax',
				url:'learnExtjs/person.jsp'
			}
		})
		var p = Ext.ModelManager.getModel('Person');
		p.load(10,{
		   scope: this,
		    failure: function(record, operation) {
		        //do something if the load failed
		        //record is null
		    },
		    success: function(record, operation) {
		        var k = "";
		        alert(record.data.age);
		    },
		    callback: function(record, operation, success) {
		        //do something whether the load succeeded or failed
		        //if operation is unsuccessful, record is null
		    }
		})
	})	
})();