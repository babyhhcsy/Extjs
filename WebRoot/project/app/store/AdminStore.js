Ext.define("app.store.AdminStore",{
	extend:"Ext.data.Store",
	model:"app.model.AdminModel",
	pageSize:5,
 	proxy:{
		type:"ajax",
		url:"/ssh_extjs/csdn/findAdmins.action",
		
		reader:{
			type:"json",
			root:"datas",
			totalProperty :'total'		
		},
		
		writer:{
			type:"json"
		}
	},
	autoLoad:true
});