(function(){
	Ext.onReady(function(){
		Ext.define("person",{
			extend:'Ext.data.Model',
			fields:[{
				name:"name"
			},{
				name:'age'
			}],
			proxy:{
				type:'ajax',
				url:'learnExtjs/association/person.jsp',
				writer:{
					type:'json'
				}
			}
		});
	var person = Ext.create('person',{
		name:'chen',
		age:1
	});
		person.save()
	});
	
})()