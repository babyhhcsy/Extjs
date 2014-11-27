var CommonQueryTrigger = Ext.extend(Ext.form.TriggerField,{
	winWidth : null,
	winHeight : null,
	dataTarget : null,
	formItems : null,//表单布局
	_record : null,//
	_cm : null,
	writeBackId : null,
	valueName : null,
	constructor : function(config){
		this.winWidth = config.winWidth;
		this.winHeight = config.winHeight;
		this.formHeight = config.formHeight;
		this.dataTarget = config.dataTarget;
		this.formItems = config.formItems;
		this._record = config._record;
		this._cm = config._cm;
		this.writeBackId = config.writeBackId;
		this.valueName = config.valueName;
		var config = Ext.apply({
			hasEntered : true,
			setEnter_OnSelect : Ext.emptyFn,
			setEnter_OnEnter : Ext.emptyFn,
			triggerClass : 'x-form-search-trigger',
			maxLength : '50'
		},config)
		CommonQueryTrigger.superclass.constructor.call(this,config);
	},
	onTriggerClick : function(){
//		alert('triggerclick');
		
		var _win = new CommonQueryWin({
//			id : "common_query_win",//不需要id，千万别在需要重复使用的组件中加id
			width : this.winWidth?this.winWidth:380,
//			height : this.winHeight?this.winHeight:500,
			formHeight : this.formHeight,
			dataTarget : this.dataTarget,
			formItems : this.formItems,
			_record : this._record,
			_cm : this._cm,
			valueName : this.valueName,
			writeBackId : this.writeBackId,
			trigger : this
		});
		_win.show();
	}
})


var CommonQueryWin = Ext.extend(Ext.Window,{
	queryFormPanel : null,
	centerPanel : null,
	writeBackId : null,
	valueName : null,
	constructor : function(config){
		var ME = this;
		this.writeBackId = config.writeBackId;
		this.valueName = config.valueName;
		this.queryForm = new CommonQueryForm({
//			id : config.id + "_queryForm",
			height : config.formHeight?config.formHeight:80,
			formItems : config.formItems
		});
		this.submitBtn = new Ext.Button({
//			id : config.id + "_submitBtn",
			text : "确认",
			width : 60,
			iconCls : "icons_accept"
		});
		this.gridPanel = new CommonGridPanel({
//			id : config.id + "_gridPanel",
			_record : config._record,
			_cm : config._cm,
			dataTarget : config.dataTarget,
			height : 300,
			submitBtn : this.submitBtn,
			listeners : {
				"celldblclick" : function(){
					ME.submitFun();
				}
			}
		});
		this.centerPanel = new Ext.Panel({
//			id : config.id + "_centerPanel",
			_record : config._record,
			_cm : config._cm,
			dataTarget : config.dataTarget,
			title : "查询结果",
			layout : "fit",
//			hidden : true,
			items : [this.gridPanel]
		});
		this.cancelBtn = new Ext.Button({
//			id : config.id + "_cancelBtn",
			text : "取消",
			width : 60,
			iconCls : "icons_cancel",
			handler : function(){
				ME.hide();
			}
		})
		var config = Ext.apply({
			title : "查询",
			width : 200,
			onEsc : function(){
				ME.hide();
			},
			closeAction : 'hide',
			autoHeight : true,
			layout : "form",
			items : [this.queryForm,this.centerPanel],
			bbar : [this.submitBtn,'-',this.cancelBtn]
		},config)
		this.queryForm.queryBtn.on("click",this.queryFun,this);
		this.submitBtn.on("click",this.submitFun,this);
		CommonQueryWin.superclass.constructor.call(this,config);
	},
	queryFun : function(){
		var ME = this;
		var vs = ME.queryForm.getForm().getValues();
//		console.log(vs);
		var mask = new Ext.LoadMask(Ext.getBody(),{
			msg : "Load..."
		})
		mask.show();
		var store = ME.gridPanel.getStore();
		store.setBaseParam('vs',Ext.encode(vs));
		store.reload();
		ME.centerPanel.show();
		mask.hide();
	},
	submitFun : function(){
		var ME = this;
		var select = ME.gridPanel.getSelectionModel().getSelected();
		if(ME.valueName&&ME.writeBackId){
			var value;
			var ids = ME.writeBackId.split(";");
			var vs = ME.valueName.split(";");
			for(var i=0;i<ids.length;i++){
				value = select.get(vs[i]);
				if(Ext.getCmp(ids[i])){
					Ext.getCmp(ids[i]).setValue(value);
				}
			}
		}
		ME.hide();
		ME.trigger.focus();
	}
})

var CommonQueryForm = Ext.extend(Ext.form.FormPanel,{
	queryBtn : null,
	constructor : function(config){
		this.formItems  = config.formItems;
		this.queryBtn = new Ext.Button({
//			id : config.id + "_queryBtn",
			text : "查询",
			width : 60,
			iconCls : "icons_search"
		})
		var config = Ext.apply({
			frame : true,
			layout : "form",
			items : this.formItems,
			bbar : [this.queryBtn]
		},config)
		CommonQueryForm.superclass.constructor.call(this,config);
	}
}) 


var CommonGridPanel = Ext.extend(Ext.grid.EditorGridPanel,{
	constructor : function(config){
		this._record = Ext.data.Record.create(config._record?config._record:[{
			name : "id"
		},{
			name : "text"
		}]);
		this._sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect : true
		});
		this._cm = new Ext.grid.ColumnModel(config._cm?config._cm:[this._sm,new Ext.grid.RowNumberer(),{
//			id : config.id + "_id",
			header : "ID",
			dataIndex : "id",
			autoWidth : true
		},{
//			id : config.id + "_text",
			header : "TEXT",
			dataIndex : "text",
			autoWidth : true
		}]);
		var pageSize = 10;
		this._store = new Ext.data.Store({
			autoLoad : false,
			baseParams : {
				limit : pageSize,
				start : 0
			},
			url : "base.do?action="+config.dataTarget,
			method : "post",
			reader : new Ext.data.JsonReader({
				totalProperty : "total",
				root : 'data'
			},this._record)
		})
		
		var config = Ext.apply({
			sm : this._sm,
			cm : this._cm,
			store : this._store,
			clicksToEdit : 1,
			bbar : [new Ext.PagingToolbar({
				pageSize : pageSize,
				store : this._store,
				displayMsg : '{0}条到{1}条-共{2}条',
				emptyMsg : "无相关记录",
				displayInfo : true
			})]
		},config)
		CommonGridPanel.superclass.constructor.call(this,config);
	}
}) 