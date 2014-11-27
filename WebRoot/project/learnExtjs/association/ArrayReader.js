(function(){
	Ext.onReady(function(){
		Ext.regModel("Person",{
			fields:[{
				name:'name'
			},{
				name:'age'
			}],
			proxy:{
				type:'ajax',
				url:'learnExtjs/dataJSp/person.jsp',
				reader:{
					type:'array'
				}
			}
		});
		var person1 = Ext.ModelManager.getModel('Person');
		person1.load(1,{
			success:function(model){
				console.log(model.get('name'));
			}
		});
	});
	
})();