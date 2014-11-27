/**
 * @fileDescription -供应商列表查询相关
 */

/**
 * 引入命名空间
 */
Ext.namespace('EAI.supplier');

/**
 * @description -供应商列表查询
 * @class EAI.supplier.SupplierListQueryMessage
 * @extends EAI.DisableTriggerField
 * @param cfg
 *            -{}配置项 <br>. (可选的)String id -该组件的id,其子组件id前缀; <br>. (可选的)String
 *            fieldLabel -该组件的标签,默认'供应商'; <br>. (可选的)String allowBlank
 *            -组件是否可以为空; <br>. (可选的)int maxLength -设置组件可以输入的最大长度,默认200; <br>.
 *            (可选的)int width -设置组件宽度,默认100px; <br>. (可选的)Array writeFrom
 *            -回写数据目的地,指需要回写的组件的id组成的数组; <br>. (可选的)Array writeFrom
 *            -回写数据来源,指ColumnModel中的dataIndex组成的数组; <br>. (可选的)int pageSize
 *            -设置gridPanel分页大小; <br>. (可选的)String targetGrid -回写数据目的地的Grid ID
 *            <br>. (可选的)String gridWirteBackName -回写数据的ColumnModel ID
 * @notice EAI/common/combo/DisableTriggerField.js <br>.
 *         EAI/common/util/StaticFn.js
 */
EAI.supplier.SupplierListQueryMessage = Ext.extend(EAI.DisableTriggerField, {
	pageSize : 50, // 分页大小;
	queryBtn : null, // 供应商查询器-查询按钮
	okBtn : null, // 供应商GridPanel-确定按钮
	cancelBtnSearch : null, // 供应商查询器-查询按钮
	cancelBtnGrid : null, // 供应商查询-GridPanel取消按钮
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
		this.idlabel = cfg.idlabel;
		var ME = this;

		this.pageSize = cfg.pageSize != null ? cfg.pageSize : 50; // 设置gridPanel分页大小;

		var config = Ext.apply({
			/*
			 * 若cfg.id存在,则会覆盖;若不存在,则生成一个以supplier为前缀的唯一id;
			 */
			id : cfg.id ? cfg.id : Ext.id(this, 'supplier_'),
			allowBlank : false,
			blankText : '必输项',
			/*
			 * Array writeBack -回写数据目的地,指需要回写的组件的id组成的数组; 需要和Array
			 * writeFrom配合使用;当数组索引位对应writeFrom中没有 相应的数据来源来源将,报数组下标越界; 注意:
			 * 默认为[],表示回写'supplierCode'字段到自己上,但是却不是通过writeBack和writeFrom来实现,
			 * 不过可以在writeBack指定自己的id和对应的writeFrom来回写到自己;
			 */
			writeBack : [],
			/*
			 * Array writeFrom -回写数据来源,指ColumnModel中的dataIndex组成的数组; 需要和Array
			 * writeBack配合使用; 默认[]
			 */
			writeFrom : [],
			// regex : /^[0-9]+$/,
			// regexText : '只能输入数字',
			maxLength : 10,
			width : 100,
			enableKeyEvents : true,
			fieldLabel : '供应商',
			onTriggerClick : function() {
				if (ME.gridWindow == null) {
					ME.initGridWindow();
				}
				ME.gridWindow.show();
				ME.searchData();
			},
			listeners : {
				'specialkey' : function(field, e) { // 特殊键事件处理:
					if (e.keyCode == Ext.EventObject.ENTER && field != null
							&& field != '') {
						//ME.onEnterFn();
					}
					e.stopPropagation(); // 停止冒泡;
				}

			}
		}, cfg);
		EAI.supplier.SupplierListQueryMessage.superclass.constructor.call(this,
				config);
	},
	onEnterFn : function() { // 回车事件处理方法;
		var ME = this;
		var dept = Ext.util.Cookies.get('dept');
		var ekorg = dept.indexOf('G1') > -1 ? '1100' : dept.indexOf('G2') > -1
				? '1200'
				: dept.indexOf('G3') > -1 ? '1300' : '';
		Ext.Ajax.request({
			url : 'supplier.do?action=getSupplierListMessage&supplierCode='
					+ ME.getValue(),
			method : 'post',
			params : {
				matnr : Ext.getCmp(this.targetGrid).getSelectionModel()
						.getSelected().get('matnr'),
				ekorg : ekorg,
				isPagingQuery : 'false'
			},
			timeout : 60000,
			success : function(response, options) {
				var jsonData = Ext.decode(response.responseText);
				if (jsonData != null) {
					if (jsonData.success && jsonData.rows < 2) {
						var seledRecord_target = Ext.getCmp(ME.targetGrid)
								.getSelectionModel().getSelected();
						if (jsonData.rows == 0) {
							self.parent.msgWindow('供应商<'
									+ EAI.util.StaticFn.numberAutoFillZero(10,
											ME.getValue()) + '>不存在!');
							seledRecord_target.set(ME.gridWirteBackName, '');
							ME.focus(true);
						} else {
							if (ME.writeBack.indexOf(ME.id) == -1) { // 判断没有指定回写到自己身上的数据来源;
								var v = jsonData.data[0]['supplierCode'];
								ME.setEnter_OnEnter(v);
								ME.setValue(v); // 则回写'supplierCode'字段到自身;
								if (Ext.getCmp(ME.formWirteBackName)) {
									Ext
											.getCmp(ME.formWirteBackName)
											.setValue(jsonData.data[0]['name1_cn']);
								}
								seledRecord_target.set('netpr',
										jsonData.data[0]['kbetr']);
								var tagert = ME.addTip;// 添加悬浮说明
								if (tagert) {
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
								if (Ext.getCmp(ME.idlabel)) {
									Ext
											.getCmp(ME.idlabel)
											.setText(jsonData.data[0]['name1_cn']);
								}
								ME.focus(true);
							}
							for (var i = 0; i < ME.writeBack.length; i++) { // 其他回写目标回写;
								var tValue = jsonData.data[0][ME.writeFrom[i]];
								if (ME.writeBack[i] == ME.id) {
									ME.setEnter_OnEnter(tValue);
									ME.focus(true);
								}
								Ext.getCmp(ME.writeBack[i]).setValue(tValue);
							}
						}
					} else {
						self.parent.msgWindow('服务器异常');
					}
				}
			},
			failure : function(response, options) {
				self.parent.msgWindow('请求发送失败或者服务器异常!');
			}
		});
	},
	searchData : function() {
		var ME = this;
		var factory = Ext.getCmp(this.targetGrid).getSelectionModel()
						.getSelected().get('werks').substring(0,1);
		var dept = Ext.util.Cookies.get('dept');
		var ekorg = dept.indexOf('G1') > -1 ? factory + '100' : dept.indexOf('G2') > -1
				? factory + '200'
				: dept.indexOf('G3') > -1 ? factory + '300' : '1100';
		ME.store.removeAll();
		ME.gridWindow.show();
		ME.store.load({
			params : Ext.apply({
				matnr : Ext.getCmp(this.targetGrid).getSelectionModel()
						.getSelected().get('matnr'),
				ekorg : ekorg
			}, {
				limit : ME.pageSize,
				start : 0,
				isPagingQuery : 'false' // 是否是分页请求
			})
		});

	},
	writeBackFn : function() { // 回写方法;
		if (this.sm.hasSelection()) {
			var record = this.sm.getSelected();
			if (this.targetGrid != null && this.gridWirteBackName != null) {
				var seledRecord_target = Ext.getCmp(this.targetGrid)
						.getSelectionModel().getSelected();
				seledRecord_target.set(this.gridWirteBackName, record
						.get('supplierCode'));
				seledRecord_target.set(this.formWirteBackName, record
						.get('kbetr'));
				seledRecord_target.set('infnr', record.get('infnr'));
				seledRecord_target.set('mwskz', record.get('mwskz'));//税码
				seledRecord_target.set('waers', record.get('kpein'));//价格单位
				var zj = parseFloat(seledRecord_target.get('menge')) * parseFloat(seledRecord_target.get('netpr')) / parseFloat(seledRecord_target.get('waers'));
				var count = Ext.getCmp("totalAmountLbl");
				count.setText(parseFloat(count.text) - seledRecord_target.get('zj') + zj);
				Ext.getCmp('poCreate_ItemGrid_currencyLbl').setText(record.get('konwa'));
				seledRecord_target.set('zj', zj);
				seledRecord_target.set('price_tax', parseFloat(seledRecord_target.get('netpr')) * (seledRecord_target.get('mwskz').indexOf(1)==2?1.03:seledRecord_target.get('mwskz').indexOf(1)==1?1.17:1));
				Ext.getCmp("lifnr").setValue(record.get('supplierCode'));
				Ext.getCmp("name").setValue(record.get('name1'));
				Ext.getCmp('factory').setValue(seledRecord_target.get('werks'));
				var flage = Ext.getCmp('poCreate_HeadForm_companyCode');	
				if(flage != null && flage != 'undefined'){	// 加载由supplierCode附带出来的数据;
					var werks = seledRecord_target.get('werks'); //工厂
					var factory = werks.substring(0,1);
					var dept = Ext.util.Cookies.get('dept');
					var ekorg = dept.indexOf('G1') > -1 ? factory + '100' : dept.indexOf('G2') > -1
							? factory + '200'
							: dept.indexOf('G3') > -1 ? factory + '300' : '1100';
					Ext.getCmp('poCreate_HeadForm_companyCode').setValue(werks);//公司代码
					Ext.getCmp('poCreate_HeadForm_purcharseOrg').setValue(ekorg);//采购组组
					Ext.getCmp('poCreate_HeadForm_factory').setValue(werks);//工厂	
					if(werks == '1000'){
						Ext.getCmp('poCreate_HeadForm_poType').setValue('ZRNB');//销售类型
					}else if(werks == '2000'){
						Ext.getCmp('poCreate_HeadForm_poType').setValue('ZANB');
					}else if(werks == '3000'){
						Ext.getCmp('poCreate_HeadForm_poType').setValue('ZJNB');
					}
                var mask = new Ext.LoadMask(Ext.getBody(), {});
				mask.show();
				Ext.Ajax.request({
					url : 'purchaseOrder.do?action=loadSupplierInfo',
					method : 'post',
					params : {
						supplier : seledRecord_target.get('supplierCode'),//供应商编号
						bukrs : werks, //公司代码
						ekorg : ekorg //采购组织
					},
					success : function(response, options) {
						var jsonData = Ext.decode(response.responseText);
						mask.hide();
						if (!jsonData) {
							self.parent.msgWindow('程序异常,jsonData为空!');
						} else if (jsonData.success) {
							Ext.getCmp('poCreate_HeadFormpayTerm').setValue(jsonData.data.zterm);	//付款条件
							Ext.getCmp('poCreate_HeadForm_currency').setValue(jsonData.data.waers);//币种
						} else {
							self.parent.msgWindow(jsonData.msg);
						}
					},
					failure : function(response, options) {
						mask.hide();
						self.parent.msgWindow("加载供应商带出数据期间,服务器或网络故障!");
					}
				});
				}
				
			}

			if (this.writeBack.indexOf(this.id) == -1) { // 判断没有指定回写到自己身上的数据来源;
				var v = record.get('supplierCode');
				this.setEnter_OnSelect(v);
				this.setValue(v); // 则回写'supplierCode'字段到自身;
				var tagert = this.addTip;// 添加悬浮说明
				if (tagert) {
					Ext.QuickTips.register({
						id : '_supText_ag',
						target : this,
						title : '供应商名称:',
						text : record.get('kbetr'),
						enabled : true,
						autoHeight : true,
						anchor : 'right'
					});
				}
				if (Ext.getCmp(this.formWirteBackName)) {
					Ext.getCmp(this.formWirteBackName).setValue(record
							.get('kbetr'));
				}
				if (Ext.getCmp(this.idlabel)) {
					Ext.getCmp(this.idlabel).setText(record.get('name1_cn'));
				}
			}
			for (var i = 0; i < this.writeBack.length; i++) { // 其他需要回显的目的地的数据回显;
				var tValue = record.get(this.writeFrom[i]);
				if (this.writeBack[i] == this.id) {
					this.setEnter_OnSelect(tValue);

				}
				Ext.getCmp(this.writeBack[i]).setValue(tValue);
			}
			this.gridWindow.hide();
		}
	},
	initGridWindow : function() {
		var ME = this;

		this.sm = new Ext.grid.RowSelectionModel({
			singleSelect : true
		});

		this.cm = new Ext.grid.ColumnModel({
			defaultSortable : true,
			viewConfig : {
				forceFit : true
			// 让grid的列自动填满grid的整个宽度，不用一列一列的设定宽度。
			},
			columns : [new Ext.grid.RowNumberer({}), { // 供应商编号-LIFNR
				id : 'supplierCode',
				header : '供应商编号',
				width : 70,
				dataIndex : 'supplierCode'
			}, {
				id : 'name1',
				header : '供应商名称',
				width : 180,
				dataIndex : 'name1'
			}, {
				id : 'ekorg',
				header : '采购组织',
				width : 60,
				dataIndex : 'ekorg'
			}, {
				id : 'infnr',
				header : '信息记录号',
				width : 70,
				dataIndex : 'infnr'
			}, {
				id : 'prdat',
				header : '最后交货期',
				width : 70,
				dataIndex : 'prdat'
			}, {
				id : 'kbetr',
				header : '单价',
				width : 40,
				dataIndex : 'kbetr'
			}, {
				id : 'kpein',
				header : '价格单位',
				width : 60,
				dataIndex : 'kpein'
			}, {
				id : 'kmein',
				header : '单位',
				width : 40,
				dataIndex : 'kmein'
			}, {
				id : 'konwa',
				header : '币别',
				width : 40,
				dataIndex : 'konwa'
			}, {
				id : 'datab',
				header : '有效起始日',
				width : 80,
				dataIndex : 'datab'
			}, {
				id : 'datbi',
				header : '有效截止日',
				width : 80,
				dataIndex : 'datbi'
			}, {
				id : 'mwskz',
				header : '税码',
				width : 80,
				dataIndex : 'mwskz'
			}]
		});

		this.store = new Ext.data.JsonStore({
			url : 'supplier.do?action=getSupplierListMessage',
			totalProperty : "rows",
			successProperty : "success",
			fields : ['supplierCode', 'name1', 'ekorg', 'infnr', 'prdat',
					'kbetr', 'kpein', 'kmein', 'konwa', 'datab',
					'datbi', 'mwskz'],
			root : 'data'
		});

		this.okBtn = new Ext.Button({
			text : '确定',
			iconCls : 'icons_accept'
		});
		this.okBtn.on('click', ME.writeBackFn, this);

		this.cancelBtnGrid = new Ext.Button({
			text : '取消',
			iconCls : 'icons_cancel',
			handler : function() {
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
			// autoExpandColumn : 'infnr',
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
		this.gridPanel.on('rowdblclick', ME.writeBackFn, this);

		this.pagingToolbar.insertButton(0, "->");
		this.pagingToolbar.insertButton(0, ME.cancelBtnGrid);
		this.pagingToolbar.insertButton(0, ME.okBtn);

		this.gridWindow = new Ext.Window({
			title : '供应商-查询',
			border : false,
			width : 950,
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
				'beforehide' : function() {
					ME.focus(true); // 窗口隐藏后,聚焦父组件可输入的首个组件;
				},
				'beforeshow' : function(win) { // 控制每次显示后弹出窗口居中(子页面)
					win.center();
				}
			}
		});
	}
});

EAI.supplier.SupplierListQuery_OnForm = Ext.extend(
		EAI.supplier.SupplierListQueryMessage, {
			constructor : function(_config) {
				var config = Ext.apply({
					hasEntered : true, // 用于输入时 是否验证成功
					triggerClass : 'x-form-search-trigger',
					validationEvent : false,
					invalidText : '供应商不正确!',
					validator : this.validateOK,
					setEnter_OnEnter : function(value) { // 在回车请求成功时,调用;
						this.hasEntered = true;
						this.startValue = value;
						this.fireEvent("validateenter", value);
					},
					setEnter_OnSelect : function(value) { // 在选取成功时,调用;
						this.setEnter_OnEnter(value);
					}
				}, _config);
				this.addEvents(
						/**
						 * @event -validateenter;
						 * @description -编号选取/输入正确后触发事件;
						 * @param String
						 *            value -组件的值;
						 */
						"validateenter");
				EAI.supplier.SupplierListQuery_OnForm.superclass.constructor
						.call(this, config);
			},
			afterRender : function() {
				EAI.supplier.SupplierListQuery_OnForm.superclass.afterRender
						.call(this);
				this.on('blur', function() {
					if (this.getValue() != String(this.startValue)) {
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