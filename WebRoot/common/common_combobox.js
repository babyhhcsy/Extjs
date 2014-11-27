
//
var Common_Combobox = Ext.extend(Ext.form.ComboBox,{
	storeLoaded : false,
	actionName : null,
	params : null,
	url : null,
	dependId : null,
	grid : null,
	dependValue : null,
	dependValueOld : null,
	writeBackText : null,
	constructor : function(config){
		var ME = this;
		this.actionName = config.actionName;
		this.params = config.params;
		this.dependId = config.dependId;
		this.grid = config.grid;
		this.writeBackText = config.writeBackText;
		this.fields = !Ext.isEmpty(config.fields) && Ext.isArray(config.fields)
				? config.fields
				: ['id', 'text'];
		this.url = config.url?config.url:getRootPath()+"/base.action?action="+this.actionName;
		
		this.jsonRead = Ext.extend(Ext.data.JsonReader,{
			read : function(response){
				var result = Ext.decode(response.responseText);
				console.log(result);
				return this.readRecords(result);
			}
		});
		this._store = new Ext.data.Store({
			url : this.url,
			baseParams : {
				params : this.params
			},
			reader : new this.jsonRead({
				totalProperty : 'count',
				root : "data",
				fields : this.fields
			})//,
//			autoLoad : true
		});
		var config = Ext.apply({
			id : config.id,
			valueField: ME.fields[0],
    		displayField: ME.fields[1],
    		emptyText: '请选择',
    		mode : 'local',
			readOnly : true,
			triggerAction : 'all',
    		store : new Ext.data.SimpleStore({
				fields : ME.fields,
				data : []
			})
		});
		Common_Combobox.superclass.constructor.call(this,config);
	},
	afterRender : function(){
		Common_Combobox.superclass.afterRender.call(this);
	},
	storeLoad : function(){
		var ME = this;
		this._store.setBaseParam("dependValue",this.getDependValue());
		if(this.dependId&&(!this.dependValue||this.dependValue.toString().trim().length<=0)){
			Ext.Msg.show({
				title : "提示！",
				msg : "请先选择依赖选项！"
			})		
			return;
		}
		if(!this.storeLoaded||(this.grid&&this.dependValue!=this.dependValueOld)){
			if(this.grid&&this.storeLoaded){
				this.dependValueOld = this.dependValue;
				this.dependValue = "";
			}
			this._store.load({
				callback : function(records, options, success){
					if(success){
						var data = [];
						ME.storeLoaded = true;
						ME._store.each(function(record){
							data.push([record.get(ME.valueField),/*record.get(ME.valueField)+"-"+*/record.get(ME.displayField)]);
						});
						ME.store.loadData(data);
						
	//					Ext.Msg.alert("提示","嘿嘿");
					}
				}
			});
		}
	},
	listeners : {
		// expand
		'focus' : function(combo) {
//			if (!this.storeLoaded) {
//				this.url = this.getUrl();
				
				if(this.url){
					this.storeLoad();
				}
//			}
		},
		'select' : function(){
			var ME = this;
			var value = this.getValue();
			var record = this.findRecord(this.valueField,value)
			var text = record.get(this.displayField);
			if(ME.writeBackText){
				if(ME.grid){
					ME.grid.getSelectionModel().getSelected().set(ME.writeBackText,text);
				}
			}
		}
	},
	getDependValue : function(){
		var url;
		if(this.dependId){
			if(this.grid){
				a = this.grid.getSelectionModel().getSelected();
				console.log(a);
				this.dependValue = a.get(this.dependId)
			}else{
				this.dependValue = Ext.getCmp(this.dependId).getValue();
			}
//			this.depemdValueOld = this.dependValue;
			console.log(this.dependValue);
//			if(this.dependValue){
//				url = getRootPath()+"/base.action?action="+this.actionName+"&dependValue="+dependValue;
//			}
		}/*else{
			url = getRootPath()+"/base.action?action="+this.actionName;
		}
		return url;*/
		return this.dependValue;
	}
});

var LocalDataCombobox = Ext.extend(Ext.form.ComboBox,{
	constructor : function(config){
		this.url = config.url;
		this.record = config.record;
		this.root = config.root;
		var config = Ext.apply({
			fieldLabel : "选择",
			width : 80,
			store : new Ext.data.Store({
				url: this.url,
				reader : new Ext.data.JsonReader({
					root : this.root==null?'data':this.root
				},this.record==null?new Ext.data.Record.create([{
					name : 'id'
				},{
					name : 'text'
				}]):this.record),
				autoLoad : true
			}),
			valueField : "id",
			displayField : "text",
			triggerAction : 'all'
		},config);
		LocalDataCombobox.superclass.constructor.call(this,config);
	},
	afterRender : function(){
		LocalDataCombobox.superclass.afterRender.call(this);
	}
});