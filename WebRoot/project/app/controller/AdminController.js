Ext.define("app.controller.AdminController", {
	extend : "Ext.app.Controller",
	init : function() {
		this.getGrid = function(button) {
			return button.ownerCt.ownerCt;
		};
		this.control({
			"admingrid button[id=add]" : {
				click : function(button) {
					var grid = this.getGrid(button);
					var store = grid.getStore();
					var edit = grid.editing;
					var model = store.model;
					var modelObj = {
						userName : "",
						password : ""
					};
					var adminObj = new model(modelObj);
					edit.cancelEdit();
					store.insert(0, adminObj);
					edit.startEditByPosition({
								row : 0,
								column : 2
							});
				}
			},
			"admingrid button[id=delete]" : {
				click : function(button) {
					var grid = this.getGrid(button);
					var store = grid.getStore();
					var records = grid.getSelectionModel().getSelection();
					var data = [];
					Ext.Array.each(records, function(model) {
								data.push(model.get("id"));
							});
					alert(data.join(","));
					if (data.length > 0) {
						Ext.Ajax.request({
									url : "/ssh_extjs/csdn/deleteAdmins.action",
									params : {
										ids : "" + data.join(",") + ""
									},
									method : "POST",
									timeout : 4000,
									success : function(response, opts) {
										Ext.Array.each(records,
												function(model) {
													store.remove(model);;
												});
										Ext.Msg.alert("提示", "删除成功！");
									}
								});
					} else {
						Ext.Msg.alert("提示", "你没有选中数据，不能执行操作！");
					}
				}
			},
			"admingrid button[id=save]" : {
				click : function(button) {

				}
			},
			"admingrid button[id=excel]" : {
				click : function(button) {

				}
			}
		});
	},
	views : ["AdminGrid","LeftPanel"],
	stores : ["AdminStore"],
	models : ["AdminModel"]
});