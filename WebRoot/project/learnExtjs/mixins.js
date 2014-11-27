/**
 * mixins可以将一个对象中的属性合并到另一个对象中；
 * 相当于java中的implement，可以混合多个对象
 * */
(function(){
	Ext.onReady(function(){
		Ext.define('user',{
			canSay:function(){
				alert("hello");
			}
		})
		Ext.define("user1",{
			canDance:function(){
				alert("I can dance");
			}
		});
		Ext.define('person',{
					mixins:{
						say:'user',
						dance:'user1'
					}		
				});
		var person = Ext.create("person",{});
		person.canSay();
		person.canDance();
	});
})();