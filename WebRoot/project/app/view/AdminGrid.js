Ext.define("app.view.AdminGrid", {
			extend : "Ext.grid.Panel",
			alias : "widget.admingrid",
			id : "admingrid",
			width:700,
			height:350,
			selModel : {
				selType : "checkboxmodel"
			},
			border : 0,
			multiSelect : true,
			frame : true,
			tbar : [{
						xtype : 'button',
						text : '添加',
						id : 'add'
					}, {
						xtype : 'button',
						text : '删除',
						id : 'delete'
					}, {
						xtype : 'button',
						text : '保存',
						id : 'save'
					}, {
						xtype : 'button',
						text : '导出excel',
						id : 'excel'
					}],
			bbar : {
				xtype : 'pagingtoolbar',
				store : 'AdminStore',
				dock : 'bottom',
				displayInfo : true
			},
			enableKeyNav : true,
			columnLines : true,
			columns : [{
						text:"序号",
						dataIndex:"id",
						width:50
					},{
						text : "帐号",
						dataIndex : "userName",
						width : 150,
						field : {
							xtype : "textfield"
						}
					}, {
						text : "密码",
						dataIndex : "password",
						width : 150,
						field : {
							xtype : "textfield"
						}
					}, {
						text : "性别",
						dataIndex : "sex",
						width : 40,
						field : {
							xtype : "textfield"
						}
					}, {
						text : "出生日期",
						xtype : "datecolumn",
						dataIndex : "birthday",
						format : "Y年m月d日",
						width : 100,
						field : {
							xtype : "datefield",
							format : "y-m-d"
						}
					}],
			initComponent : function() {
				this.editing = Ext.create("Ext.grid.plugin.CellEditing");
				this.plugins = [this.editing];
				this.callParent(arguments);
			},
			store : "AdminStore"
		});