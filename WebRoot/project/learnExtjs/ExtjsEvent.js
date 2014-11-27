(function(){
	Ext.onReady(function(){
		var win =new Ext.window.Window({
			width:400,
			height:300,
			title:'xunyun'
		});
		Ext.get("myButton").on("click",function(){
			win.show();
		});
	});
})();