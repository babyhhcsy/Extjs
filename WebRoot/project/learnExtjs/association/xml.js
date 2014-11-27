(function(){
	Ext.onReady(function(){
		Ext.regModel("user",{
			fields:[{
				name:'sex'
			},{
				name:'id'
			},{
				name:'firName'
			}],
			proxy:{
				type:'ajax',
				url:'learnExtjs/association/user.xml',
				reader:{
					type:'xml',
					record:'user'
				}
			}
		});
		var user = Ext.ModelManager.getModel('user');
		user.load(00101,{
			success:function(model){
				console.log(model.get('sex') + model.get("id") + model.get('firName'));
			}
		});
	});	
})();