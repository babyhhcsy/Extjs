/**
 * 定义组件的方式，define当中的内容是文件夹的路径
 * 配置在config中的内容，Extj会自动的添加相应的set和get方法
 * 创建该对象的时候可以直接配置config中的属性就可以更改其中的内容；
 * 可以通过对象.getPrice()获得对象
 * 
 * */
Ext.define("subassembly.firSub",{
	extend	:"Ext.window.Window",
	width:400,
	height:300,
	newTitle:'xunyun',
	config:{
		price:400
	},
	setTitle:function(){
		this.title = this.newTitle;
	},
	title:'xunyunDefine',
	initComponent:function(){
		this.setTitle();
		this.callParent(arguments);
	}
})