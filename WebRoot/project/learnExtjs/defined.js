(function(){
	/**
	 * 加载一个文件，
	 * */
	Ext.Loader.setConfig({
		enabled:true,
		paths:{
			myapp:"/subassembly"
		}
	});
	Ext.onReady(function(){
		//自定义一个window，该window可以用来定义组件
/*		Ext.define("myWin",{
			extend	:"Ext.window.Window",
			width:400,
			height:300,
			newTitle:'xunyun',
			setTitle:function(){
				this.title = this.newTitle;
			},
			title:'xunyunDefine',
			initComponent:function(){
				this.setTitle();
				this.callParent(arguments);
			}
		})*/
		//注意create的对象，是define中的名称
		
		Ext.get("myButton").on("click",function(){
			var win = Ext.create("subassembly.firSub",{
				requires:['myWin'],
				price:300
			});
			alert(win.getPrice());
		})
		
	});
	
})();