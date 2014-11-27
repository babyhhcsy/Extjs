/**
 * @fileDescription -供应商列表查询相关
 */

/**
 * 引入命名空间
 */
Ext.namespace('EAI.supplier');

/**
 * @description -供应商列表查询
 * @class EAI.supplier.SupplierListQuery
 * @extends EAI.DisableTriggerField
 * @param cfg -{}配置项
 * <br>. (可选的)String id -该组件的id,其子组件id前缀;
 * <br>. (可选的)String fieldLabel -该组件的标签,默认'供应商';
 * <br>. (可选的)String allowBlank -组件是否可以为空;
 * <br>. (可选的)int maxLength -设置组件可以输入的最大长度,默认200;
 * <br>. (可选的)int width -设置组件宽度,默认100px;
 * <br>. (可选的)Array writeFrom -回写数据目的地,指需要回写的组件的id组成的数组;
 * <br>. (可选的)Array writeFrom -回写数据来源,指ColumnModel中的dataIndex组成的数组;
 * <br>. (可选的)int pageSize -设置gridPanel分页大小;
 * <br>. (可选的)String targetGrid -回写数据目的地的Grid ID
 * <br>. (可选的)String gridWirteBackName -回写数据的ColumnModel ID
 * @notice EAI/common/combo/DisableTriggerField.js
 * <br>. EAI/common/util/StaticFn.js
 */
EAI.supplier.SupplierListQuery = Ext.extend(EAI.DisableTriggerField,{
	pageSize : 50, // 分页大小;
	supplierCode : null, //供应商
	name1_CN : null, // 中文名1
	name1_EN : null, // 英文名1
	sort1 : null, // 检索项1
	sort2 : null, // 检索项2
	queryBtn : null, // 供应商查询器-查询按钮
	okBtn : null, // 供应商GridPanel-确定按钮
	cancelBtnSearch : null, // 供应商查询器-查询按钮
	cancelBtnGrid : null, // 供应商查询-GridPanel取消按钮
	searchForm : null, // 供应商查询器FormPanel
	searchWindow : null, // 供应商查询器Window
	targetGrid : null,
	addTip : null,
	gridWirteBackName : null,
	formWirteBackName : null,
	sm : null,
	cm : null,
	store : null,
	gridPanel : null,
	pagingToolbar : null,
	gridWindow : null,
	setEnter_OnEnter : Ext.emptyFn, // 再回车模式,指定已经通过验证;
	setEnter_OnSelect : Ext.emptyFn, // 在选择模式,指定已经通过了验证;
	hasEntered : true, // 是否回车,检验供应商正确;
	extendParam : [], // String-组件Id-用于特别需求下扩展请求参数(通过getValue()获取目标组件的值作为参数);
 	constructor : function(cfg) {
 		this.idlabel=cfg.idlabel;
		var ME = this;
		
		this.pageSize = cfg.pageSize!=null? cfg.pageSize : 50; // 设置gridPanel分页大小;
		
		var config = Ext.apply({
			/*
			 * 若cfg.id存在,则会覆盖;若不存在,则生成一个以supplier为前缀的唯一id;
			 */
			id : cfg.id? cfg.id : Ext.id(this,'supplier_'),
			allowBlank : false,
			blankText : '必输项',
			/*
			 * Array writeBack -回写数据目的地,指需要回写的组件的id组成的数组;
			 * 需要和Array writeFrom配合使用;当数组索引位对应writeFrom中没有
			 * 相应的数据来源来源将,报数组下标越界;
			 * 注意: 默认为[],表示回写'supplierCode'字段到自己上,但是却不是通过writeBack和writeFrom来实现,
			 * 不过可以在writeBack指定自己的id和对应的writeFrom来回写到自己;
			 */
			writeBack : [],
			/*
			 * Array writeFrom -回写数据来源,指ColumnModel中的dataIndex组成的数组;
			 * 需要和Array writeBack配合使用;
			 * 默认[]
			 */
			writeFrom : [],
			//regex : /^[0-9]+$/,
			//regexText : '只能输入数字',
			maxLength: 10,
			width : 100,
			enableKeyEvents : true,
			fieldLabel : '供应商',
			onTriggerClick : function(){
				if(ME.searchWindow ==null){
					ME.initSearchWindow();
				}
				ME.searchWindow.show();
			},
			listeners : {
				'specialkey' : function(field,e){ // 特殊键事件处理: field组件系使用specialkey事件,panel组件系使用keys配置项,不能混用;
					if(e.keyCode == Ext.EventObject.ENTER && field !=null && field !=''){
						ME.onEnterFn();
					}
					e.stopPropagation(); // 停止冒泡;
				}
			}
		},cfg);
		EAI.supplier.SupplierListQuery.superclass.constructor.call(this,config);
	},
	onEnterFn : function(){ // 回车事件处理方法;
		var ME = this;
		Ext.Ajax.request({
			url : 'supplier.do?action=getSupplierList',
			method : 'post',
			params : {
				supplierCode : ME.getValue(),
				isPagingQuery : 'false'
			},
			timeout : 60000,
			success : function(response,options){
				var jsonData = Ext.decode(response.responseText);
				if(jsonData != null){
					if(jsonData.success && jsonData.rows < 2){
						if(jsonData.rows == 0){
							self.parent.msgWindow('供应商<'+EAI.util.StaticFn.numberAutoFillZero(10,ME.getValue())+'>不存在!');
							ME.focus(true);
						}else {
							if(ME.writeBack.indexOf(ME.id) == -1){ // 判断没有指定回写到自己身上的数据来源;
								var v = jsonData.data[0]['supplierCode'];
								ME.setEnter_OnEnter(v);
								ME.setValue(v); // 则回写'supplierCode'字段到自身;
								if(Ext.getCmp(ME.formWirteBackName)){
									Ext.getCmp(ME.formWirteBackName).setValue(jsonData.data[0]['name1_cn']);
								}
								var tagert = ME.addTip;//添加悬浮说明
								if(tagert){
									Ext.QuickTips.register({
										id : '_supText_ag',
										target : ME,
										title : '供应商名称:',
										text : jsonData.data[0]['name1_cn'],
										enabled : true,
										autoHeight : true,
										anchor : 'right'
									});
								}
								if(Ext.getCmp(ME.idlabel)){
									Ext.getCmp(ME.idlabel).setText(jsonData.data[0]['name1_cn']);
								}
								ME.focus(true);
							}
							for(var i =0; i<ME.writeBack.length; i++){ // 其他回写目标回写;
								var tValue = jsonData.data[0][ME.writeFrom[i]];
								if(ME.writeBack[i] == ME.id){
									ME.setEnter_OnEnter(tValue); 
									ME.focus(true);
								}
								Ext.getCmp(ME.writeBack[i]).setValue(tValue);
							}
						}
					}else {
						self.parent.msgWindow('服务器异常');
					}
				}
			},
			failure : function(response,options){
				self.parent.msgWindow('请求发送失败或者服务器异常!');
			}
		});
	},
	writeBackFn : function(){ // 回写方法;
		if (this.multSelect) {
			var record = this.sm.getSelected();
			if(this.targetGrid!=null){
				var obj = Ext.getCmp(this.targetGrid);
				var selectRecords = obj.getSelectionModel().getSelections();
				if(obj&&selectRecords){
					var logrtstore = obj.getStore();
					var arrNull=[];
					//去除空行
					if(logrtstore&&logrtstore.getCount()>0){
						for(var j=0;j<logrtstore.getCount();j++){
							var logrt=logrtstore.getAt(j).get('matnr');
							if(logrt==''||logrt==undefined){
								arrNull.push(j);//保存为空的索引
								//removedata.push(matrnstore.getAt(j));//将空行添加到数组
							}
					       //去除重复行数据
							for(var k=0;k<selectRecords.length;k++){
								if(logrt==selectRecords[k].id){
									var d=selectRecords[k].id;
									selectRecords.remove(selectRecords[k]);
								}
							}
						}
						//返回数据到表格
						for(var i=0;i<selectRecords.length;i++){
							var v = record.get('supplierCode');
							if(arrNull.length>=1){
							     logrtstore.getAt(arrNull[0]).set("matnr",v);
							     arrNull.remove(arrNull[0]);
							}else{
								var record=new matrecord({
									matnr:selectRecords[i].id
								});
								logrtstore.add(record);
							}
						}
						this.gridWindow.hide();
						this.searchWindow.hide();
						return; 
					}
				}
			}
		}
		if(this.sm.hasSelection()){
			var record = this.sm.getSelected();
			if(this.targetGrid!=null&&this.gridWirteBackName!=null){
				var obj = Ext.getCmp(this.targetGrid);
				var seledRecord_target = obj.getSelectionModel().getSelected();
				
				var v = record.get('supplierCode');
	        	seledRecord_target.set(this.gridWirteBackName,v);
			}
			
			if(this.writeBack.indexOf(this.id) == -1){ // 判断没有指定回写到自己身上的数据来源;
				var v = record.get('supplierCode');
				this.setEnter_OnSelect(v);
				this.setValue(v); // 则回写'supplierCode'字段到自身;
				var tagert = this.addTip;//添加悬浮说明
				if(tagert){
					Ext.QuickTips.register({
						id : '_supText_ag',
						target : this,
						title : '供应商名称:',
						text : record.get('name1_cn'),
						enabled : true,
						autoHeight : true,
						anchor : 'right'
					});
				}
				if(Ext.getCmp(this.formWirteBackName)){
					Ext.getCmp(this.formWirteBackName).setValue(record.get('name1_cn'));
				}
				if(Ext.getCmp(this.idlabel)){
					Ext.getCmp(this.idlabel).setText(record.get('name1_cn'));
				}

			}
			for(var i =0; i<this.writeBack.length; i++){ // 其他需要回显的目的地的数据回显;
				var tValue = record.get(this.writeFrom[i]);
				if(this.writeBack[i] == this.id){
					this.setEnter_OnSelect(tValue);
                   
				}
				Ext.getCmp(this.writeBack[i]).setValue(tValue);
			}
			this.gridWindow.hide();
			this.searchWindow.hide();
		}
	},
	initSearchWindow : function(){ // 实例化搜索条件窗口;
		var ME = this;
		
		this.supplierCode = new MaxLengthTextField({
					id : ME.id + "_supplierCode",
					name : 'supplierCode',
					//regex : /^[0-9]+$/,
					//regexText : '只能输入数字',
					maxLength: 10,
					width : 200,
					fieldLabel : '供应商'
				});
							
		this.name1_CN = new MaxLengthTextField({
					id : ME.id + "_name1_cn",
					name : "name1_cn",
					fieldLabel : 'Name2',
					width : 200,
					maxLength : 40
				});
				
		this.name1_EN = new MaxLengthTextField({
						id : ME.id + "_name1_en",
						name : "name1_en",
						width : 200,
						fieldLabel : 'Name1',
						maxLength : 40
					});
					
		this.sort1 = new MaxLengthTextField({
					id : ME.id + "_sort1",
					name : 'sort1',
					fieldLabel : '检索项1',
					width : 200,
					maxLength : 20
				});
				
		this.sort2 = new MaxLengthTextField({
					id : ME.id + "_sort2",
					name : 'sort2',
					width : 200,
					fieldLabel : '检索项2',
					maxLength : 20
				});
					
		this.queryBtn = new Ext.Button({
						text : '查询',
						iconCls : 'icons_search'
					});
					
		this.queryBtn.on('click',function(){
				if(ME.searchForm.getForm().isValid()){
					if(ME.gridWindow == null){ // 延迟实例化-代价
						ME.initGridWindow();
					}
					ME.store.removeAll();
					ME.gridWindow.show();
					ME.store.load({
						params : Ext.apply(ME.searchForm.getForm().getValues(),{
							limit : ME.pageSize,
							start : 0,
							isPagingQuery : 'false' // 是否是分页请求
						})
					});
				}
			});
					
		this.cancelBtnSearch = new Ext.Button({
						text : '取消',
						iconCls : 'icons_cancel',
						handler : function(){
							ME.searchWindow.hide();
						}
					});
					
		this.searchForm = new Ext.FormPanel({
				frame : true,
				labelWidth : 60,
				items : [
					ME.supplierCode,
					ME.name1_EN,
					ME.name1_CN,
					ME.sort1,
					ME.sort2
				],
			    keys : [{
		            key : Ext.EventObject.ENTER,   
		            fn : function(){
	            		ME.queryBtn.fireEvent('click');
		            }, 
		            scope : this
		        }] 
			});
					
		this.searchWindow = new Ext.Window({
			title : '供应商-查询器',
			border : false,
			width : 300,
			layout : 'fit',
			height : 200,
			closeAction : 'hide',
			draggable : true,
			resizable : false,
			modal : false,
			items : [ME.searchForm],
			bbar : [ME.queryBtn, ME.cancelBtnSearch],
			listeners : {
				'beforehide' : function(){
					ME.searchForm.getForm().reset();
					ME.focus(true);
					return true;
				},
				'beforeshow' : function(win){ // 控制每次显示后弹出窗口居中(子页面)
					win.center();
				}
			}
		});
	},
	initGridWindow : function(){
		var ME = this;
		
		this.sm = new Ext.grid.RowSelectionModel({
			singleSelect : true
		});
					
		this.cm = new Ext.grid.ColumnModel({
			defaultSortable : true,
			columns : [new Ext.grid.RowNumberer({}),{ // 供应商编号-LIFNR
				id : 'supplierCode', 
				header : '供应商',
				width : 70,
				dataIndex : 'supplierCode'
			},{ // 英文名1-NAME1
				id : 'name1_en', 
				header : 'Name1',
				width : 200,
				dataIndex : 'name1_en'
			},{ // 中文名1-NAME2
				id : 'name1_cn', 
				header : 'Name2',
				width : 180,
				dataIndex : 'name1_cn'
			}/*,{ // 检索项1-SORT1
				id : 'sort1', 
				header : '检索项1',
				width : 100,
				dataIndex : 'sort1'
			},{ // 检索项1-SORT2
				id : 'sort2', 
				header : '检索项2',
				width : 100,
				dataIndex : 'sort2'
			}*/]
		});			
		
		this.store = new Ext.data.JsonStore({
			url : 'supplier.do?action=getSupplierList',
			totalProperty : "rows",
			successProperty : "success",
			fields : ['supplierCode','name1_en','name1_cn'/*,'sort1','sort2'*/],
			root: 'data'
		});
		
		this.okBtn = new Ext.Button({
						text : '确定',
						iconCls : 'icons_accept'
					});
		this.okBtn.on('click',ME.writeBackFn,this);
					
		this.cancelBtnGrid = new Ext.Button({
						text : '取消',
						iconCls : 'icons_cancel',
						handler : function(){
							ME.gridWindow.hide();
						}
					});
		
		this.pagingToolbar = new Ext.PagingToolbar({
					store : ME.store,
					pageSize : ME.pageSize,
					displayMsg : '{0}条到{1}条,共{2}条',
					emptyMsg : "无相关记录",
					displayInfo : true
				});
				
		this.gridPanel = new Ext.grid.GridPanel({ 
				autoExpandColumn : 'name1_cn',
				height : 450,
				width : 550,
				frame : true,
				border : false,
				columnLines : false,
				stripeRows : true,
				loadMask : true,
				autoScroll : true,
				store : ME.store,
				sm : ME.sm,
				cm : ME.cm
		});
		this.gridPanel.on('rowdblclick',ME.writeBackFn,this);
		
		this.pagingToolbar.insertButton(0,"->");
		this.pagingToolbar.insertButton(0,ME.cancelBtnGrid);
		this.pagingToolbar.insertButton(0,ME.okBtn);
		
		this.gridWindow = new Ext.Window({
			title : '供应商-查询',
			border : false,
			width : 510,
			layout : 'fit',
			loadMask : true,
			height : 460,
			closeAction : 'hide',
			draggable : true,
			modal : false,
			maximizable : true,
			items : [ME.gridPanel],
			bbar : ME.pagingToolbar,
			listeners : {
				'beforehide' : function(){
					ME.supplierCode.focus(true); // 窗口隐藏后,聚焦父组件可输入的首个组件;
				},
				'beforeshow' : function(win){ // 控制每次显示后弹出窗口居中(子页面)
					win.center();
				}
			}
		});
	}
});

EAI.supplier.SupplierListQuery_OnForm = Ext.extend(EAI.supplier.SupplierListQuery, {
	multSelect : null,
	constructor : function(_config) {
		this.multSelect = _config.multSelect;
		var config = Ext.apply({
			hasEntered : true, // 用于输入时 是否验证成功
			triggerClass : 'x-form-search-trigger',
			validationEvent : false,
			invalidText : '供应商不正确!',
			validator : this.validateOK,
			setEnter_OnEnter : function(value) { // 在回车请求成功时,调用;
				this.hasEntered = true;
				this.startValue = value;
				this.fireEvent("validateenter",value);
			},
			setEnter_OnSelect : function(value) { // 在选取成功时,调用;
				this.setEnter_OnEnter(value);
			}
		}, _config);
		this.addEvents(
			/**
			 * @event -validateenter;
			 * @description -编号选取/输入正确后触发事件;
			 * @param String value -组件的值;
			 */
			"validateenter"
		);
		EAI.supplier.SupplierListQuery_OnForm.superclass.constructor.call(this, config);
	},
	afterRender : function(){
		EAI.supplier.SupplierListQuery_OnForm.superclass.afterRender.call(this);
		this.on('blur',function(){
			if(this.multSelect){
				var record = this.sm.getSelected();
				return;
			}
			if (this.getValue() != String(this.startValue)){
				this.hasEntered = false;
				this.validate();
			}
		});
	},
	validateOK : function() {
		var v = this.getValue();
		if (this.allowBlank && (!v || v == "")) {
			return true;
		}
		return this.hasEntered;
	}
});