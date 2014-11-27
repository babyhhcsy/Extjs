/**
 * 客服物料询价申请-创建(修改)
 * 
 * @author mars
 * @date : 9 21, 2012 3:40:41 PM
 */

/**
 * 引入EAI.qm.qmUpdate命名空间;
 */
Ext.namespace('EAI.qm.princingAsk');

var princingAskCreate = EAI.qm.princingAsk;

princingAskCreate.SearchForm = Ext.extend(Ext.FormPanel, {
	constructor : function(cfg) {
		var ME = this; // ME代指SearchForm类的对象

		this.materialQueryId = new MaxLengthTextField({
			fieldLabel : '询价单号',
			id : 'materialQueryId',
			emptyText : '请输入询价单号',
			maxLength : 10
		});

		var config = Ext.apply({
			frame : true,
			labelWidth : 75,
			items : [{
				layout : 'table',
				autoWidth : true,
				layoutConfig : {
					columns : 2
				},
				items : [{
					layout : 'form',
					width : 300,
					items : [ME.materialQueryId]
				}]
			}]
		}, cfg);
		princingAskCreate.SearchForm.superclass.constructor.call(this, config);
	}
});

princingAskCreate.QmInfoForm = Ext.extend(Ext.FormPanel, {
	// qmItem : null,
	constructor : function(cfg) {
		var ME = this; // ME代指QmInfoForm类的对象;
		this.initQmInfoForm(cfg);
		var config = Ext.apply({
			layout : 'form',
			frame : true,
			id : 'jbform',
			autoScroll : true,
			labelWidth : 85,
			fileUpload : true,
			autoScroll : true,
			items : [ME.jbxx, ME.jbzz, ME.jbxy, ME.jbxz]
		}, cfg);
		princingAskCreate.QmInfoForm.superclass.constructor.call(this, config);
	},
	initQmInfoForm : function(config) {
		var ME = this;
		var username = Ext.util.Cookies.get('username');
		var HaveFields = Ext.util.Cookies.get('HaveFields');
		var dept = Ext.util.Cookies.get('dept');
		var cor = Ext.util.CSS.getRule(".x-list-selected", true).style.backgroundColor;
		// 物料信息描述
		this.lbMaterial2 = new Ext.form.Field({
			name : 'lbMaterial2',
			id : 'lbMaterial2',
			anchor : '98%',
			readOnly : true,
			style : 'border:0;background:' + cor
		})
		// 物料交货日期
		this.lbMaterialjhrq = new Ext.form.Field({
			name : 'lbMaterialjhrq',
			id : 'lbMaterialjhrq',
			fieldLabel : '最后交期',
			width : 120,
			readOnly : true,
			style : 'border:0;background:' + cor
		})

		this.zplp2 = new Ext.form.Field({
			name : 'zplp2',
			id : 'zplp2',
			fieldLabel : '采购建议零售价',
			width : 120,
			readOnly : true,
			style : 'border:0;background:' + cor
		})
		this.waers = new Ext.form.Field({
			name : 'waers',
			id : 'waers',
			fieldLabel : 'MOQ',
			width : 120,
			readOnly : true,
			style : 'border:0;background:' + cor
		})
		this.mwskz = new Ext.form.Field({
			name : 'mwskz',
			id : 'mwskz',
			width : 120,
			readOnly : true,
			style : 'border:0;background:' + cor
		})
		// 计量单位描述1
		this.lb_base_unit_of_measure_1 = new Ext.form.Label({
			name : 'lb_base_unit_of_measure_1',
			id : "lb_base_unit_of_measure"
		});

		this.salesname = new Ext.form.Field({
			name : 'salesname',
			id : "salesname",
			anchor : '90%',
			readOnly : true,
			style : 'border:0;background:' + cor
		});

		// 币别类型
		this.store = new Ext.data.SimpleStore({
			fields : ['id', 'text'],
			data : [['CNY', 'CNY'], ['HKD', 'HKD'], ['USD', 'USD']]
		});
		this.lbkfbslsh = new Ext.form.Field({
			name : 'lbkfbslsh',
			id : 'lbkfbslsh',
			anchor : '90%',
			readOnly : true,
			style : 'border:0;background:' + cor
		})
		// 币别
		this.currencyType = new Ext.form.ComboBox({
			id : '_currencyType',
			name : 'currencyType',
			fieldLabel : '币别',
			width : 120,
			readOnly : true,
			store : this.store,
			triggerAction : 'all',
			valueField : 'id',
			disabled : true,
			displayField : 'text',
			// allowBlank : false,
			mode : 'local'

		});
		// 市场部币别
		this.lbscbjg = new Ext.form.ComboBox({
			id : 'lbscbjg',
			name : 'lbscbjg',
			fieldLabel : '币别',
			width : 120,
			readOnly : true,
			store : this.store,
			triggerAction : 'all',
			valueField : 'id',
			disabled : true,
			displayField : 'text',
			// allowBlank : false,
			mode : 'local'

		});
		this.lbMaterial3 = new Ext.form.Field({
			name : 'lbMaterial3',
			id : 'lbMaterial3',
			anchor : '90%',
			readOnly : true,
			style : 'border:0;background:' + cor
		})
		// 客服部计量单位1
		this.tfBaseUnitOfMeasure1 = new BaseDataAll_Trigger({
			name : 'tfBaseUnitOfMeasure1',
			fieldLabel : "单 位", // allowBlank : false,
			dataTarget : 'BaseUnit',
			wirteBackId : 'lbMaterial3',
			wirteBackTextId : 'lbMaterial3',
			disabled : true,
			maxLength : 10,
			width : 50
		});
		// 市场部计量单位
		this.lbscbsl = new BaseDataAll_Trigger({
			name : 'lbscbsl',
			fieldLabel : "单位",
			allowBlank : false,
			dataTarget : 'BaseUnit',
			maxLength : 10,
			disabled : true,
			width : 50,
			wirteBackId : 'lbscbslsh'
		});

		this.lbscbslsh = new Ext.form.Field({
			name : 'lbscbslsh',
			id : 'lbscbslsh',
			anchor : '90%',
			readOnly : true,
			disabled : true,
			style : 'border:0;background:' + cor
		})
		// 计量单位2
		this.tfBaseUnitOfMeasure2 = new Ext.form.TextField({
			name : 'tfBaseUnitOfMeasure2',
			hiddenName : 'tfBaseUnitOfMeasure2',
			fieldLabel : '单位',
			hidden : true,
			hideLabel : true,
			disabled : true,
			width : 120
		});
		this.materialQueryId = new Ext.form.Hidden({
			name : 'materialQueryId',
			hiddenName : 'materialQueryId',
			fieldLabel : '客服',
			width : 120,
			readOnly : true,
			style : 'border:0;background:' + cor,
			value : username,
			readOnly : true
		});

		this.kf1 = new Ext.form.TextField({
			name : 'kf1',
			hiddenName : 'kf1',
			fieldLabel : '',
			labelSeparator : '',
			width : 120,
			hidden : true,
			disabled : true,
			value : username,
			readOnly : true
		});
		// 客服
		this.kf = new Ext.form.TextField({
			name : 'kf',
			hiddenName : 'kf',
			fieldLabel : '客服',
			width : 100,
			value : username,
			readOnly : true,
			style : 'border:0;background:' + cor
		});

		// 组别
		this.ywyzb = new Ext.form.ComboBox({
			name : 'ywyzb',
			fieldLabel : '组别',
			store : new Ext.data.SimpleStore({
				fields : ['id', 'text'],
				data : [['BU', '3M'], ['NOTBU', '非3M']]
			}),
			triggerAction : 'all',
			readOnly : true,
			valueField : 'id',
			displayField : 'text',
			mode : 'local',
			disabled : true,
			width : 120,
			// allowBlank : false

			listeners : {
				'select' : function(combo, record, index) {
					if (combo.getValue() == 'BU') {
						ME.bu.setDisabled(false);
					} else {
						ME.bu.setDisabled(true);
						ME.bu.setValue("");
					}
				}
			}

		});

		// BU
		this.bu = new Ext.form.ComboBox({
			id : 'bu',
			name : 'bu',
			fieldLabel : 'BU',
			store : new Ext.data.SimpleStore({
				fields : ['id', 'text'],
				data : [['1', 'CONVERTER'], ['2', 'MPSD'], ['3', 'BONDING'],
						['4', 'EMMD'], ['5', 'EMC/EMI'], ['6', '3MOTHER'],
						['7', 'OTHER']]
			}),
			triggerAction : 'all',
			readOnly : true,
			disabled : true,
			valueField : 'id',
			displayField : 'text',
			mode : 'local',
			// allowBlank : false,
			width : 120
		});

		// 物料信息
		this.material1 = new MatTrigger({
			id : 'material1',
			name : 'material1',
			fieldLabel : '物料',
			width : 160,
			hideLabel : false,
			wirteBackId : 'material1',
			wirteBackTextId : 'lbMaterial2',
			wirteBackAedat : 'lbMaterialjhrq',
			disabled : true,
			maxLength : 18
		});

		this.materialsm = new Ext.form.TextField({
			name : 'materialsm',
			hiddenName : 'materialsm',
			fieldLabel : '新物料',
			readOnly : true,
			// disabled : true,
			width : 160
		});
		// 物料数量
		this.sl = new Ext.form.NumberField({
			name : 'sl',
			hiddenName : 'sl',
			decimalPrecision : 3,
			fieldLabel : '申请数量',
			disabled : true,
			// allowBlank : false,
			width : 60
		});

		// 物料应用数量
		this.yysl = new Ext.form.NumberField({
			name : 'yysl',
			hiddenName : 'yysl',
			decimalPrecision : 3,
			fieldLabel : '订单用量',
			disabled : true,
			// allowBlank : false,
			width : 60
		});

		// 目标价格
		this.mbjg = new Ext.form.NumberField({
			name : 'mbjg',
			hiddenName : 'mbjg',
			decimalPrecision : 3,
			fieldLabel : '目标价格',
			disabled : true,
			width : 120
		});

		// 客服部付款方式
		this.kffkfs = new Ext.form.Field({
			name : 'kffkfs',
			hiddenName : 'kffkfs',
			decimalPrecision : 3,
			fieldLabel : '付款方式',
			disabled : true,
			width : 120
		});
		this.kfbsfhs = new Ext.form.ComboBox({
			name : 'kfbsfhs',
			fieldLabel : '是否含税',
			store : new Ext.data.SimpleStore({
				fields : ['id', 'text'],
				data : [['1', '是'], ['2', '否']]
			}),
			triggerAction : 'all',
			readOnly : true,
			valueField : 'id',
			displayField : 'text',
			mode : 'local',
			disabled : true,
			width : 120
		})
		// 客户编码
		this.kfkhbm = new CustTrigger_OnForm({
			id : 'kfkhbm',
			fieldLabel : '客户编码',
			width : 120,
			wirteBackId : 'kfkhbm',
			wirteBackTextId : 'kfkhbmsh',
			disableTrigger : false,
			// allowBlank : false,
			disabled : true
				// blankText : '客户不能为空'
		});
		// 客户编码说明
		this.kfkhbmsh = new Ext.form.Field({
			name : 'kfkhbmsh',
			id : 'kfkhbmsh',
			anchor : '98%',
			readOnly : true,
			style : 'border:0;background:' + cor
		})
		// 新客户
		this.kfxkh = new Ext.form.Field({
			name : 'kfxkh',
			id : 'kfxkh',
			fieldLabel : '新客户',
			width : 120,
			disabled : true
		})
		// 用途
		this.yt = new Ext.form.TextField({
			name : 'yt',
			hiddenName : 'yt',
			fieldLabel : '用途',
			// readOnly:true,
			disabled : true,
			// allowBlank : false,
			width : 120

		});

		// 订单
		this.dd = new Ext.form.ComboBox({
			name : 'dd',
			fieldLabel : '是否订单',
			store : new Ext.data.SimpleStore({
				fields : ['id', 'text'],
				data : [['1', '是'], ['2', '否']]
			}),
			triggerAction : 'all',
			readOnly : true,
			valueField : 'id',
			displayField : 'text',
			mode : 'local',
			disabled : true,
			width : 120
		});

		// 客户类型
		this.tfCustTrigger = new Ext.form.ComboBox({
			name : 'tfCustTrigger',
			fieldLabel : '客户类型',
			store : new Ext.data.SimpleStore({
				fields : ['id', 'text'],
				data : [['1', '加工商'], ['2', '最终用户'], ['3', '贸易商']]
			}),
			triggerAction : 'all',
			readOnly : true,
			valueField : 'id',
			displayField : 'text',
			mode : 'local',
			disabled : true,
			width : 120
		});

		// 詢價類別
		this.kfxjlb = new Ext.form.ComboBox({
			name : 'kfxjlb',
			fieldLabel : '詢價類別',
			store : new Ext.data.SimpleStore({
				fields : ['id', 'text'],
				data : [['1', '拆貨'], ['2', '新物料'],['3','申请样品']]
			}),
			triggerAction : 'all',
			readOnly : true,
			valueField : 'id',
			displayField : 'text',
			mode : 'local',
			disabled : true,
			width : 120
		});
		
		this.isImportantCust = new Ext.form.Checkbox({
			name : 'isImportantCust',
			boxLabel : '(选中为是/不选为否)',
			fieldLabel : '是否重要客户'
		});
		this.isNeedPattern = new Ext.form.Checkbox({
			name : 'isNeedPattern',
			boxLabel : '(选中为是/不选为否)',
			fieldLabel : '是否需要样品'
		})
		// 检验报告
		this.jybg = new Ext.form.Field({
			name : 'jybg',
			hiddenName : 'jybg',
			fieldLabel : '所须报告',
			disabled : true,
			width : 120
		});
		// 申请日期
		var data = Ext.util.Format.date(new Date(), 'Y-m-d')
		this.applicationDate = new Ext.form.TextField({
			name : 'applicationDate',
			hiddenName : 'applicationDate',
			fieldLabel : '申请日期',
			value : data,
			width : 100,
			readOnly : true,
			style : 'border:0;background:' + cor
		});
		// 期望交期
		this.kfqwjq = new Ext.form.DateField({
			name : 'kfqwjq',
			format : 'Y-m-d',
			value : new Date(),
			fieldLabel : '期望交期',
			disabled : true,
			width : 120
		});

		// 状态
		this.zt = new Ext.form.TextField({
			name : 'zt',
			hiddenName : 'zt',
			fieldLabel : '状态',
			// emptyText : '市场部',
			width : 100,
			style : 'border:0;background:' + cor,
			readOnly : true
		});

		// 备注
		this.bz = new Ext.form.TextArea({
			name : 'bz',
			hiddenName : 'bz',
			fieldLabel : '备注',
			disabled : true,
			anchor : '98%'
		});

		// 业务员
		this.sales = new BaseDataAll_Trigger({
			// id : _config.id + '_sale',
			name : 'sales',
			fieldLabel : '业务员',
			// allowBlank : true,
			readOnly : false,
			dataTarget : 'Sales',
			multSelect : false,
			disabled : true,
			wirteBackId : 'salesname',
			wirteBackTextId : 'salesname',
			width : 120
				// anchor : '70%'
		});

		// 市场部--数量
		this.scbsl = new Ext.form.NumberField({
			name : 'scbsl',
			hiddenName : 'scbsl',
			decimalPrecision : 3,
			fieldLabel : '数量',
			disabled : true,
			// allowBlank : false,
			width : 60
		});
		// 市场部计量单位
		this.lbcgbsl = new BaseDataAll_Trigger({
			name : 'lbcgbsl',
			fieldLabel : "单位", // allowBlank : false,
			dataTarget : 'BaseUnit',
			maxLength : 10,
			width : 50,
			wirteBackId : 'lbcgbslsh',
			disabled : true,
			wirteBackTextId : 'lbcgbslsh'
				// readOnly : true
		});
		this.lbcgbslsh = new Ext.form.Field({
			name : 'lbcgbslsh',
			id : 'lbcgbslsh',
			anchor : '90%',
			readOnly : true,
			disabled : true,
			style : 'border:0;background:' + cor
		})

		// 市场部--价格
		this.scbjg = new Ext.form.NumberField({
			name : 'scbjg',
			hiddenName : 'scbjg',
			decimalPrecision : 3,
			fieldLabel : '面价',
			disabled : true,
			width : 120
		});
		
		//市场部--单位
		// 市场部--说明
		this.scbsm = new Ext.form.TextArea({
			name : 'scbsm',
			hiddenName : 'scbsm',
			fieldLabel : '市场部--说明',
			disabled : true,
			anchor : '98%'
		});
		// 市场部--MOQ
		this.scbmoq = new Ext.form.Field({
			name : 'scbmoq',
			hiddenName : 'scbmoq',
			fieldLabel : 'MOQ',
			disabled : true,
			width : 120
		});

		// 市场部--付款方式
		this.scbfkfs = new Ext.form.Field({
			name : 'scbfkfs',
			hiddenName : 'scbfkfs',
			fieldLabel : '付款方式',
			disabled : true,
			width : 120
		});

		// 市场部--提货方式
		this.scbthfs = new Ext.form.Field({
			name : 'scbthfs',
			hiddenName : 'scbthfs',
			fieldLabel : '提货方式',
			disabled : true,
			width : 120
		});

		// 市场部交货周期
		this.scbjhzq = new Ext.form.Field({
			name : 'scbjhzq',
			hiddenName : 'scbjhzq',
			fieldLabel : '交货周期',
			disabled : true,
			width : 120
		});

		// 是否有现货
		this.scbsfyxh = new Ext.form.Field({
			name : 'scbsfyxh',
			hiddenName : 'scbsfyxh',
			fieldLabel : '有无现货',
			disabled : true,
			width : 120
		});

		// 市场部交货周期
		this.scbgysdd = new Ext.form.Field({
			name : 'scbgysdd',
			hiddenName : 'scbgysdd',
			fieldLabel : '供应地点',
			disabled : true,
			width : 120
		});

		// 市场部是否含税
		this.scbsfhs = new Ext.form.Field({
			name : 'scbsfhs',
			hiddenName : 'scbsfhs',
			fieldLabel : '是否含税',
			disabled : true,
			width : 120
		});

		// 市场部物料尺寸
		this.scbwlcc = new Ext.form.Field({
			name : 'scbwlcc',
			hiddenName : 'scbwlcc',
			fieldLabel : '物料尺寸',
			disabled : true,
			width : 180
		});

		this.xjdzt = new Ext.form.Hidden({
			name : 'xjdzt',
			fieldLabel : '回复',
			store : new Ext.data.SimpleStore({
				fields : ['id', 'text'],
				data : [['1', '本单结束'], ['2', '采购部询价']]
			}),
			triggerAction : 'all',
			readOnly : true,
			valueField : 'id',
			hidden : true,
			displayField : 'text',
			mode : 'local',
			width : 120
		});
		this.scbsccl = new Ext.form.Field({
			name : 'scbsccl',
			id : 'scbsccl',
			fieldLabel : '首次处理',
			anchor : '90%',
			readOnly : true,
			style : 'border:0;background:' + cor
		});
		this.scbzzcl = new Ext.form.Field({
			name : 'scbzzcl',
			id : 'scbzzcl',
			fieldLabel : '最后处理',
			anchor : '90%',
			readOnly : true,
			style : 'border:0;background:' + cor
		});
		/* ========================================================= */
		// 采购部--数量
		this.cgbsl = new Ext.form.NumberField({
			name : 'cgbsl',
			hiddenName : 'cgbsl',
			decimalPrecision : 3,
			fieldLabel : '数量',
			disabled : true,
			// allowBlank : false,
			width : 60
		});

		// 采购部--价格
		this.cgbjg = new Ext.form.NumberField({
			name : 'cgbjg',
			hiddenName : 'cgbjg',
			decimalPrecision : 3,
			fieldLabel : '价格',
			disabled : true,
			width : 120
		});
		this.lbcgbjg = new Ext.form.ComboBox({
			id : 'lbcgbjg',
			name : 'lbcgbjg',
			fieldLabel : '币别',
			width : 120,
			readOnly : true,
			store : this.store,
			triggerAction : 'all',
			disabled : true,
			valueField : 'id',
			displayField : 'text',
			// allowBlank : false,
			mode : 'local'
		});
		// 采购部--MOQ
		this.cgbmoq = new Ext.form.Field({
			name : 'cgbmoq',
			hiddenName : 'cgbmoq',
			fieldLabel : 'MOQ',
			disabled : true,
			width : 120
		});

		// 采购部--付款方式
		this.cgbfkfs = new Ext.form.Field({
			name : 'cgbfkfs',
			hiddenName : 'cgbfkfs',
			fieldLabel : '付款方式',
			disabled : true,
			width : 120
		});

		// 采购部--提货方式
		this.cgbthfs = new Ext.form.Field({
			name : 'cgbthfs',
			hiddenName : 'cgbthfs',
			fieldLabel : '提货方式',
			disabled : true,
			width : 120
		});

		// 采购部交货周期
		this.cgbjhzq = new Ext.form.NumberField({
			name : 'cgbjhzq',
			hiddenName : 'cgbjhzq',
			fieldLabel : '交货周期',
			disabled : true,
			width : 120
		});

		// 采购部--日期
		this.cgbrq = new Ext.form.DateField({
			name : 'cgbrq',
			hiddenName : 'cgbrq',
			fieldLabel : '日期',
			format : 'Y-m-d',
			value : new Date(),
			width : 120,
			disabled : true,
			readOnly : true
		});

		// 采购部--其他
		this.cgbqt = new Ext.form.TextArea({
			name : 'cgbqt',
			hiddenName : 'cgbqt',
			fieldLabel : '采购部--其他',
			disabled : true,
			anchor : '98%'
		});
		this.cgbsccl = new Ext.form.Field({
			name : 'cgbsccl',
			fieldLabel : '首次处理',
			anchor : '90%',
			readOnly : true,
			style : 'border:0;background:' + cor
		});
		this.cgbzzcl = new Ext.form.Field({
			name : 'cgbzzcl',
			fieldLabel : '最后处理',
			anchor : '90%',
			readOnly : true,
			style : 'border:0;background:' + cor
		});
		Me.itemsArr = new Array();
		/* =================================================================== */
		// 客服部最终结果
		// 询价结果
		this.kfxjjg = new Ext.form.ComboBox({
			name : 'kfxjjg',
			fieldLabel : '询价结果',
			store : new Ext.data.SimpleStore({
				fields : ['id', 'text'],
				data : [['1', ''], ['2', '成功'], ['3', '失败'],[4,'其它']]
			}),
			triggerAction : 'all',
			valueField : 'id',
			displayField : 'text',
			mode : 'local',
			width : 120,
			disabled : true,
			listeners : {
				'select' : function(combo, record, index) {
					if(combo.getValue() != '4'){
						var finalSure = Me.jbzz;
						//只有一个的item的时候，需要把移除的item从新添加上
						if(Me.itemArr.length==1){
							//移除其他表单
							finalSure.remove(this.newmaterms);
							//添加表单
							for(var i = 0 ;i< Me.itemArr.length;i++){
								finalSure.add(Me.itemArr[i]);
							}
						}
						finalSure.doLayout();
					}
					if (combo.getValue() == '2') {
						ME.mbmj.show();
						ME.mbmj.label.show();
						ME.kfxjjgbb.show();
						ME.kfxjjgbb.label.show();
						ME.kfxjjg2.show();
						ME.kfxjjg2.label.show();
						ME.kfxjjg3.hide();
						ME.kfxjjg3.label.hide();
						ME.newmaterms.hide();
						ME.newmaterms.label.hide();
					} else if (combo.getValue() == '3') {
						ME.mbmj.hide();
						ME.mbmj.label.hide();
						ME.kfxjjgbb.hide();
						ME.kfxjjgbb.label.hide();
						ME.kfxjjg2.hide();
						ME.kfxjjg2.label.hide();
						ME.kfxjjg3.show();
						ME.kfxjjg3.label.show();
						ME.newmaterms.show();
						ME.newmaterms.label.show();
					}else if(combo.getValue() == '4'){
						var finalSure = Me.jbzz;
						//1、获得panl里面的item内容
						finalSure.items.each(function(item,index,length){
							Me.itemsArr.push(item);
						});
						//2、移除内容
						for(var i = 0 ;i< Me.itemArr.length;i++){
							finalSure.remove(Me.itemArr[i]);
						}
						//添加其他
						finalSure.add(this.newmaterms);
						this.newmaterms.setWidth(220);
						finalSure.doLayout();
						
					} else {
						ME.mbmj.hide();
						ME.mbmj.label.hide();
						ME.kfxjjgbb.hide();
						ME.kfxjjgbb.label.hide();
						ME.kfxjjg2.hide();
						ME.kfxjjg2.label.hide();
						ME.kfxjjg3.hide();
						ME.kfxjjg3.label.hide();
						ME.newmaterms.hide();
						ME.newmaterms.label.hide();
					}
				},

				'blur' : function(combo, record, index) {
					if (combo.getValue() == '2') {
						ME.mbmj.show();
						ME.mbmj.label.show();
						ME.kfxjjgbb.show();
						ME.kfxjjgbb.label.show();
						ME.kfxjjg2.show();
						ME.kfxjjg2.label.show();
						ME.kfxjjg3.hide();
						ME.kfxjjg3.label.hide();
						ME.newmaterms.hide();
						ME.newmaterms.label.hide();
					} else if (combo.getValue() == '3') {
						ME.mbmj.hide();
						ME.mbmj.label.hide();
						ME.kfxjjgbb.hide();
						ME.kfxjjgbb.label.hide();
						ME.kfxjjg2.hide();
						ME.kfxjjg2.label.hide();
						ME.kfxjjg3.show();
						ME.kfxjjg3.label.show();
						ME.newmaterms.show();
						ME.newmaterms.label.show();
					} else {
						ME.mbmj.hide();
						ME.mbmj.label.hide();
						ME.kfxjjgbb.hide();
						ME.kfxjjgbb.label.hide();
						ME.kfxjjg2.hide();
						ME.kfxjjg2.label.hide();
						ME.kfxjjg3.hide();
						ME.kfxjjg3.label.hide();
						ME.newmaterms.hide();
						ME.newmaterms.label.hide();
					}
				}

			}
		});

		// BU
		this.kfxjjg1 = new Ext.form.Field({
			name : 'kfxjjg1',
			hiddenName : 'kfxjjg1',
			hidden : true,
			disabled : true,
			width : 120
		});

		// 有
		this.kfxjjg2 = new Ext.form.Field({
			name : 'kfxjjg2',
			hiddenName : 'kfxjjg2',
			hidden : true,
			disabled : true,
			// hideLabel : true,
			fieldLabel : 'SO号',
			width : 120
		});
		this.mbmj = new Ext.form.NumberField({
			name : 'mbmj',
			hiddenName : 'mbmj',
			hidden : true,
			decimalPrecision : 3,
			fieldLabel : '賣價',
			disabled : true,
			width : 120
		});
		this.kfxjjgbb = new Ext.form.ComboBox({
			id : 'kfxjjgbb',
			name : 'kfxjjgbb',
			fieldLabel : '币别',
			width : 120,
			readOnly : true,
			store : this.store,
			triggerAction : 'all',
			disabled : true,
			valueField : 'id',
			displayField : 'text',
			// allowBlank : false,
			mode : 'local'
		});
		/*
		 * this.kfxjjg3 = new Ext.form.CheckboxGroup({ xtype : 'checkboxgroup',
		 * id : 'kfxjjg3', fieldLabel : '多选:', hidden : true, hideLabel : true,
		 * itemCls : 'x-check-group-alt', columns : 4, autoWidth : true, items : [{
		 * boxLabel : 'MOQ', name : 'qt1', value : 'qt1' }, { boxLabel : '数期',
		 * name : 'qt2', value : 'qt2' }, { boxLabel : '价格', name : 'qt3', value :
		 * 'qt3' }] });
		 */

		this.newmaterms = new Ext.form.Field({
			name : 'newmaterms',
			fieldLabel : '其他',
			hidden : true,
			disabled : true,
			// hideLabel : true,
			width : 120
		});

		this.tool1 = new Ext.form.Checkbox({
			id : 'qt1',
			boxLabel : 'MOQ',
			value : 'MOQ',
			listeners : {
				'check' : function(obj) {
					setToolValue(obj);
				}
			}
		});
		this.tool2 = new Ext.form.Checkbox({
			id : 'qt2',
			boxLabel : '期数',
			value : '期数',
			listeners : {
				'check' : function(obj) {
					setToolValue(obj);
				}
			}
		});
		this.tool3 = new Ext.form.Checkbox({
			id : 'qt3',
			boxLabel : '价格',
			value : '价格',
			listeners : {
				'check' : function(obj) {
					setToolValue(obj);
				}
			}
		});
		this.tool4 = new Ext.form.Checkbox({
			id : 'qt4',
			boxLabel : '交期',
			value : '交期',
			listeners : {
				'check' : function(obj) {
					setToolValue(obj);
				}
			}
		});
		this.tool5 = new Ext.form.Checkbox({
			id : 'qt5',
			boxLabel : '无货',
			value : '无货',
			listeners : {
				'check' : function(obj) {
					setToolValue(obj);
				}
			}
		});
		this.kfxjjg3 = new Ext.form.CheckboxGroup({
			id : 'kfxjjg3',
			name : 'kfxjjg3',
			xtype : 'checkboxgroup',
			hidden : true,
			disabled : true,
			// hideLabel : true,
			fieldLabel : '选项',
			columns : 6,
			items : [this.tool1, this.tool2, this.tool3, this.tool4, this.tool5]
		});

		this.kfxjjgsh = new Ext.form.Hidden({
			id : 'kfxjjgsh',
			name : 'kfxjjgsh',
			value : "",
			width : 120
		});

		function setToolValue(obj) {
			var tl = ME.kfxjjgsh.getValue();
			if (obj.getValue()) {
				tl += obj.value + ";";
				ME.kfxjjgsh.setValue(tl);
			} else {
				ME.kfxjjgsh.setValue(tl.replace(obj.value + ';', ''));
			}
		}
		// 供应商
		this.supplierCode = new EAI.supplier.SupplierListQuery({
			id : ME.id + "_supplierCode",
			name : 'supplierCode'
		});
		this.supplierCode.on('specialkey', function(field, e) {
			if (e.keyCode == Ext.EventObject.ENTER) {
				onEnterFn();
			}
		});

		this.supplierCodesh = new Ext.form.Field({
			name : 'supplierCodesh',
			id : 'supplierCodesh',
			anchor : '90%',
			readOnly : true,
			disabled : true,
			style : 'border:0;background:' + cor
		});
		// 供应商名称
		this.supplierCodeCompanyName = new Ext.form.Field({
			name : 'supplierCodeCompanyName',
			id : 'supplierCodeCompanyName',
			fieldLabel : '供应商公司名',
			anchor : '90%',
			readOnly : true,
			disabled : true,
			style : 'border:0;background:' + cor
		});

		this.supplierCodeName = new Ext.form.Field({
			name : 'supplierCodeName',
			id : 'supplierCodeName',
			fieldLabel : '供应商名',
			anchor : '90%',
			readOnly : true,
			disabled : true,
			style : 'border:0;background:' + cor
		})

		this.supplierCodeTel = new Ext.form.Field({
			name : 'supplierCodeTel',
			id : 'supplierCodeTel',
			fieldLabel : '电话',
			anchor : '90%',
			readOnly : true,
			disabled : true,
			style : 'border:0;background:' + cor
		})

		// 新供应商名称
		this.newSupplierCodeCompanyName = new Ext.form.Field({
			name : 'newSupplierCodeCompanyName',
			id : 'newSupplierCodeCompanyName',
			fieldLabel : '新供应商公司名',
			anchor : '90%'
		});

		this.newSupplierCodeName = new Ext.form.Field({
			name : 'newSupplierCodeName',
			id : 'newSupplierCodeName',
			fieldLabel : '新供应商名',
			anchor : '90%'
		})

		this.newSupplierCodeTel = new Ext.form.Field({
			name : 'newSupplierCodeTel',
			id : 'newSupplierCodeTel',
			fieldLabel : '新电话',
			anchor : '90%'
		})

		// 创建表格
		this.contactPerson = new PricePersonGrid({
			id : this.id + '_PricePersonGrid',
			// title : '信息详情',
			name : 'contactPerson',
			height : 250,
			width : 800,
			isRead : false,
			layout : 'fit',
			border : false,
			frame : true,
			isRead : Ext.util.Cookies.get('username').indexOf('.pur') == -1
					? true
					: false,
			initRowNo : 0
		});
		this.contactPerson.on('cellclick', function(grid, rowIndex,
				columnIndex, e) {
			var selectionModel = grid.getSelectionModel();
			var cgbmoq = selectionModel.getSelected().data['cgbmoq'];// moq
			var cgbfkfs = selectionModel.getSelected().data['cgbfkfs'];// 付款方式
			var cgbthfs = selectionModel.getSelected().data['cgbthfs'];// 提货方式
			var cgbjhzq = selectionModel.getSelected().data['cgbjhzq'];// 交货周期
			var cgbsfyxh = selectionModel.getSelected().data['cgbsfyxh'];//
			var cgbgysdd = selectionModel.getSelected().data['cgbgysdd'];//
			var cgbsfhs = selectionModel.getSelected().data['cgbsfhs'];//
			var cgbwlcc = selectionModel.getSelected().data['cgbwlcc'];//
			// var cgbjg = selectionModel.getSelected().data['cgbjg'];//cgbqt
			var lbcgbjg = selectionModel.getSelected().data['lbcgbjg'];//
			var cgbqt = selectionModel.getSelected().data['cgbqt'];//
			var cgbsl = selectionModel.getSelected().data['cgbsl'];
			var lbcgbsl = selectionModel.getSelected().data['lbcgbsl'];
			ME.scbmoq.setValue(cgbmoq);
			ME.scbfkfs.setValue(cgbfkfs);
			ME.scbjhzq.setValue(cgbjhzq);
			ME.scbthfs.setValue(cgbthfs);
			ME.scbsfyxh.setValue(cgbsfyxh);
			ME.scbgysdd.setValue(cgbgysdd);
			ME.scbsfhs.setValue(cgbsfhs);
			ME.scbwlcc.setValue(cgbwlcc);
			// ME.scbjg.setValue(cgbjg);
			ME.lbscbjg.setValue(lbcgbjg);
			ME.scbsm.setValue(cgbqt);
			ME.scbsl.setValue(cgbsl);
			ME.lbscbsl.setValue(lbcgbsl);
		});
		// 显示基本信息
		this.jbxx = new Ext.form.FieldSet({
			title : '客服部基本信息',
			border : true,
			anchor : '98%',
			width : 900,
			layout : 'form',
			collapsible : true,
			autoScroll : true,
			items : [{
				layout : 'form',
				labelWidth : 55,
//				width : 900,
				items : [{
					layout : "table",
					layoutConfig : {columns : 1},
					items : [{
						layout : "table",
//						layout : 'column',
						layoutConfig : {
							columns : 3
						},
						items : [{
							layout : 'form',
							width : 250,
							items : [ME.kf]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.zt]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.applicationDate]
						},{
							layout : 'form',
							width : 250,
							items : [ME.kfkhbm]
						}, {
							layout : 'form',
							width : 250,
							labelWidth : 1,
							items : [ME.kfkhbmsh]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.kfxkh]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.tfCustTrigger]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.sales]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.salesname]
						}, {
							layout : 'form',
							width : 250,
							colspan : 1,
							items : [ME.kfxjlb]
						},{
							layout : 'form',
							width : 250,
							items : [ME.ywyzb]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.bu]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.yt]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.jybg]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.dd]
						}, {
							layout : 'form',
							width : 250,
							labelWidth : 80,
							items : [ME.isImportantCust]
						}, {
							layout : 'form',
							width : 250,
							labelWidth : 80,
							items : [ME.isNeedPattern]
						}]
					},{
						layout : 'table',
						labelWidth : 80,
						layoutConfig : {
							columns : 1
						},
						items : [{
							layout : "column",
							items : [{
								layout : 'form',
								width : 300,
								items : [ME.material1]
							},{
								layout : 'form',
								width : 300,
								items : [ME.lbMaterial2]
							}]
						},{
							layout : "column",
							items : [{
								layout : 'form',
								labelWidth : 100,
								width : 250,
								items : [ME.zplp2]
							},{
								layout : 'form',
								width : 250,
								items : [ME.mwskz]
							},{
								layout : 'form',
								width : 250,
								items : [ME.waers]
							},{
								layout : 'form',
								width : 200,
								items : [ME.lbMaterialjhrq]
							}]
						},{
							layout : "column",
							items : [{
								layout : 'form',
								width : 300,
								items : [ME.materialsm]
							},{
								layout : 'form',
								width : 300,
								items : [ME.lbMaterial3]
							}]
						},{
							layout : "column",
							items : [{
								layout : 'form',
								width : 150,
								items : [ME.sl]
							},{
								layout : 'form',
								width : 150,
								items : [ME.yysl]
							},{
								layout : 'form',
								width : 150,
								items : [ME.tfBaseUnitOfMeasure1]
							},{
								layout : 'form',
								width : 100,
								labelWidth : 1,
								items : [ME.lbkfbslsh]
							},{
								layout : 'form',
								width : 230,
								items : [ME.kffkfs]
							}]
						},{
							layout : "column",
							items : [{
								layout : 'form',
								width : 250,
								items : [ME.mbjg]
							},{
								layout : 'form',
								labelWidth : 60,
								width : 250,
								items : [ME.currencyType]
							},{
								layout : 'form',
								width : 250,
								items : [ME.kfbsfhs]
							}]
						}/*,{
							layout : 'form',
							width : 250,
							colspan : 1,
							items : [ME.material1]
						}, {
							layout : 'form',
							width : 300,
							colspan : 7,
							labelWidth : 1,
							align : "left",
							items : [ME.lbMaterial2]
						},{
							layout : 'form',
							width : 250,
							colspan : 1,
							labelWidth : 100,
							items : [ME.zplp2]
						},{
							layout : 'form',
							width : 200,
							colspan : 1,
							labelWidth : 1,
							items : [ME.mwskz]
						},{
							layout : 'form',
							width : 250,
							colspan : 2,
							items : [ME.waers]
						},{
							layout : 'form',
							width : 200,
							colspan : 4,
							items : [ME.lbMaterialjhrq]
						}, {
							layout : 'form',
							width : 250,
							colspan : 1,
							items : [ME.materialsm]
						},{
							layout : 'form',
							width : 300,
							colspan : 7,
							labelWidth : 1,
							items : [ME.lbMaterial3]
						}, {
							layout : 'form',
							width : 125,
							items : [ME.sl]
						}, {
							layout : 'form',
							width : 125,
							items : [ME.yysl]
						}, {
							layout : 'form',
							width : 120,
							items : [ME.tfBaseUnitOfMeasure1]
						},{
							layout : 'form',
							width : 120,
							labelWidth : 1,
							items : [ME.lbkfbslsh]
						}, {
							layout : 'form',
							width : 250,
							colspan : 4,
							items : [ME.kffkfs]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.mbjg]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.currencyType]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.kfbsfhs]
						}*/]
					}, {
						layout : 'column',
						items : [{
							layout : 'form',
							labelWidth : 80,
							width : 250,
							items : [ME.kfqwjq]
						}, {
							layout : 'form',
							width : 440,
							labelWidth : 60,
							items : [ME.bz]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.materialQueryId, ME.kfxjjgsh]
						}]
					}]
				}/*,{
					layout : 'column',
					
					layoutConfig : { columns : 2 },
					 
					items : [{
						layout : 'form',
						width : 170,
						items : [ME.kf]
					}, {
						layout : 'form',
						width : 170,
						items : [ME.zt]
					}, {
						layout : 'form',
						width : 170,
						items : [ME.applicationDate]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.ywyzb]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.bu]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.yt]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.jybg]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.tfCustTrigger]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.dd]
					}, {
						layout : 'form',
						width : 250,
						labelWidth : 80,
						items : [ME.isImportantCust]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.kfxjlb]
					}, {
						layout : 'form',
						width : 250,
						labelWidth : 80,
						items : [ME.isNeedPattern]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.kfxkh]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.sales]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.salesname]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.kfkhbm]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.kfkhbmsh]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.material1]
					}, {
						layout : 'form',
						width : 280,
						items : [ME.lbMaterial2]
					}, {
						layout : 'form',
						width : 250,
						labelWidth : 100,
						items : [ME.zplp2]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.mwskz]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.waers]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.lbMaterialjhrq]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.materialsm]
					}, {
						layout : 'form',
						width : 300,
						items : [ME.lbMaterial3]
					}, {
						layout : 'form',
						width : 130,
						items : [ME.sl]
					}, {
						layout : 'form',
						width : 130,
						items : [ME.yysl]
					}, {
						layout : 'form',
						width : 120,
						items : [ME.tfBaseUnitOfMeasure1]
					}, {
						layout : 'form',
						width : 120,
						items : [ME.lbkfbslsh]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.mbjg]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.currencyType]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.kffkfs]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.kfbsfhs]
					}, {
						layout : 'column',
						items : [{
							layout : 'form',
							width : 250,
							items : [ME.kfqwjq]
						}, {
							layout : 'form',
							width : 440,
							items : [ME.bz]
						}, {
							layout : 'form',
							width : 250,
							items : [ME.materialQueryId, ME.kfxjjgsh]
						}]
					}]
				}*/]
			}]
		});
		/* 市场部报价 */
		/* =================================== */
		this.jbxy = new Ext.form.FieldSet({
			title : '市场部报价信息',
			border : true,
			anchor : '98%',
			width : 700,
			collapsible : true,
			layout : 'form',
			autoScroll : true,
			items : [{
				layout : 'form',
				labelWidth : 55,
				width : 700,
				items : [{
					layout : 'table',
					layoutConfig : {columns : 3},
					items : [ {
						layout : 'form',
						width : 250,
						items : [ME.scbwlcc]
					},{
						layout : 'form',
						width : 250,
						items : [ME.scbjg]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.lbscbjg]
					}, {
						layout : "form",
						width : 250,
						items : [this.scbsl]
					}, {
						layout : "form",
						width : 250,
						items : [this.lbscbsl]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbsfhs]
					},{
						layout : 'form',
						width : 250,
						items : [ME.scbmoq]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbjhzq]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbsfyxh]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbfkfs]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbgysdd]
					}, {
						layout : 'form',
						width : 250,
						colspan : 2,
						items : [ME.scbthfs]
					}, {
						layout : 'form',
						width : 440,
						colspan : 2,
						items : [ME.scbsm]
					},  {
						layout : 'form',
						width : 250,
						items : [ME.xjdzt]
					},{
						layout : 'form',
						width : 250,
						items : [ME.scbsccl]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbzzcl]
					}/*{
						layout : 'form',
						width : 250,
						items : [ME.scbjg]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.lbscbjg]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbmoq]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbfkfs]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbthfs]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbjhzq]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbsfyxh]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbgysdd]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbsfhs]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbwlcc]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.xjdzt]
					}, {
						layout : 'form',
						width : 440,
						items : [ME.scbsm]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbsccl]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.scbzzcl]
					}*/]
				}]
			}]
		});

		/* 采购部报价 */
		/* =============================== */
		this.jbxz = new Ext.form.FieldSet({
			title : '采购部报价信息',
			border : true,
			anchor : '98%',
			width : 800,
			collapsible : true,
			layout : 'table',
			autoScroll : true,
			items : [{
				layout : 'form',
				labelWidth : 55,
				width : 800,
				items : [ME.contactPerson, {

					layout : 'column',
					layoutConfig : {
						columns : 4
					},
					items : [{
						layout : 'form',
						width : 250,
						items : [ME.cgbsccl]
					}, {
						layout : 'form',
						width : 250,
						items : [ME.cgbzzcl]
					}]

				}]
			}]
		});

		this.jbzz = new Ext.form.FieldSet({
			title : '最终确认',
			border : true,
			anchor : '98%',
			width : 700,
			collapsible : true,
			layout : 'form',
			autoScroll : true,
			items : [{
				layout : 'table',
				labelWidth : 55,
				width : 800,
				layoutConfig : {
					columns : 4
				},
				items : [{
					layout : 'form',
					width : 200,
					items : [ME.kfxjjg]
				}, {
					layout : 'form',
					width : 200,
					items : [ME.kfxjjg2]
				}, {
					layout : 'form',
					width : 200,
					items : [ME.mbmj]
				}, {
					layout : 'form',
					width : 200,
					items : [ME.kfxjjgbb]
				}, {
					layout : 'form',
					width : 400,
					colspan : 2,
					items : [ME.kfxjjg3]
				}, {
					layout : 'form',
					width : 200,
					items : [ME.newmaterms]
				}]
			}]
		});
		/*
		 * if ("IT" == dept) { ME.jbxx.setDisabled(false);
		 * ME.jbxy.setDisabled(false); ME.jbxz.setDisabled(false); } else
		 */

		/*
		 * if (username.indexOf('.cs') > -1) { ME.jbxx.setDisabled(false);
		 * ME.jbxy.setDisabled(true); ME.jbxz.setDisabled(true); } else if
		 * (username.indexOf('.mkt') > -1) { ME.jbxx.setDisabled(true);
		 * ME.jbxy.setDisabled(false); ME.jbxz.setDisabled(true); } else if
		 * (username.indexOf('.pur') > -1) { ME.jbxx.setDisabled(true);
		 * ME.jbxy.setDisabled(true); ME.jbxz.setDisabled(false); }
		 */

		if (username.indexOf('.cs') > -1) {
			ME.jbxz.setVisible(false);
			Ext.getCmp('butDelete').show();
		} else if (username.indexOf('.mkt') > -1) {
			ME.ywyzb.setDisabled(false);
			ME.bu.setDisabled(false);
			ME.lbscbslsh.setDisabled(false);
			ME.lbscbsl.setDisabled(false);
			ME.scbsl.setDisabled(false);
			ME.lbscbjg.setDisabled(false);
			ME.scbjg.setDisabled(false);
			ME.scbsm.setDisabled(false);
			ME.scbmoq.setDisabled(false);
			ME.scbfkfs.setDisabled(false);
			ME.scbthfs.setDisabled(false);
			ME.scbjhzq.setDisabled(false);
			ME.scbsfyxh.setDisabled(false);
			ME.scbgysdd.setDisabled(false);
			ME.scbsfhs.setDisabled(false);
			ME.scbwlcc.setDisabled(false);
			ME.contactPerson.colModel.config[1].hidden = true;
			ME.contactPerson.colModel.config[2].hidden = true;
			ME.contactPerson.colModel.config[3].hidden = true;
			ME.contactPerson.colModel.config[4].hidden = true;
			ME.contactPerson.colModel.config[5].hidden = true;
		} else if (username.indexOf('.pur') > -1) {
			ME.lbcgbslsh.setDisabled(false);
			ME.cgbsl.setDisabled(false);
			ME.lbcgbsl.setDisabled(false);
			ME.cgbmoq.setDisabled(false);
			ME.lbcgbjg.setDisabled(false);
			ME.cgbjhzq.setDisabled(false);
			ME.cgbjg.setDisabled(false);
			ME.cgbfkfs.setDisabled(false);
			ME.cgbthfs.setDisabled(false);
			ME.cgbqt.setDisabled(false);
			ME.contactPerson.setDisabled(false);
		}
		/*if(HaveFields.indexOf('011')>-1) {
			ME.ywyzb.setDisabled(false);
			ME.bu.setDisabled(false);
			ME.lbscbslsh.setDisabled(false);
			ME.lbscbsl.setDisabled(false);
			ME.scbsl.setDisabled(false);
			ME.lbscbjg.setDisabled(false);
			ME.scbjg.setDisabled(false);
			ME.scbsm.setDisabled(false);
			ME.scbmoq.setDisabled(false);
			ME.scbfkfs.setDisabled(false);
			ME.scbthfs.setDisabled(false);
			ME.scbjhzq.setDisabled(false);
			ME.scbsfyxh.setDisabled(false);
			ME.scbgysdd.setDisabled(false);
			ME.scbsfhs.setDisabled(false);
			ME.scbwlcc.setDisabled(false);
		}
		if(HaveFields.indexOf('024')>-1){
			ME.kf.setDisabled(false);
			ME.zt.setDisabled(false);
			ME.applicationDate.setDisabled(false);
			ME.ywyzb.setDisabled(false);
			ME.bu.setDisabled(false);
			ME.yt.setDisabled(false);
			ME.jybg.setDisabled(false);
			ME.tfCustTrigger.setDisabled(false);
			ME.dd.setDisabled(false);
			ME.isImportantCust.setDisabled(false);
			ME.kfxjlb.setDisabled(false);
			ME.isNeedPattern.setDisabled(false);
			ME.kfxkh.setDisabled(false);
			ME.sales.setDisabled(false);
			ME.salesname.setDisabled(false);
			ME.kfkhbm.setDisabled(false);
			ME.kfkhbmsh.setDisabled(false);
			ME.material1.setDisabled(false);
			ME.lbMaterial2.setDisabled(false);
			ME.zplp2.setDisabled(false);
			ME.mwskz.setDisabled(false);
			ME.waers.setDisabled(false);
			ME.lbMaterialjhrq.setDisabled(false);
			ME.lbMaterial3.setDisabled(false);
			ME.sl.setDisabled(false);
			ME.yysl.setDisabled(false);
			ME.tfBaseUnitOfMeasure1.setDisabled(false);
			ME.mbjg.setDisabled(false);
			ME.currencyType.setDisabled(false);
			ME.kffkfs.setDisabled(false);
			ME.kfbsfhs.setDisabled(false);
			ME.kfqwjq.setDisabled(false);
			ME.bz.setDisabled(false);
			ME.materialQueryId.setDisabled(false);
			ME.kfxjjgsh.setDisabled(false);
			
		}*/
	},
	loadForm1 : function(data) { // 为form赋值
		var ME = this;
		if (data) {
			ME.materialQueryId.setValue(data.materialQueryId);
			ME.kf.setValue(data.kf == "null" ? "" : data.kf); // 客服
			ME.sales.setValue(data.sales == "null" ? "" : data.sales); // 业务员
			ME.salesname.setValue(data.salesname == "null"
					? ""
					: data.salesname); // 业务员
			ME.ywyzb.setValue(data.ywyzb == "null" ? "" : data.ywyzb); // 业务员组别
			ME.bu.setValue(data.bu == "null" ? "" : data.bu);; // bu
			ME.material1.setValue(data.material1 == "null"
					? ""
					: data.material1); // 物料
			ME.materialsm.setValue(data.materialsm == "null"
					? ""
					: data.materialsm); // 物料
			ME.lbMaterial2.setValue(data.lbMaterial2 == "null"
					? ""
					: data.lbMaterial2); // 物料信息
			ME.lbMaterialjhrq.setValue(data.lbMaterialjhrq == "null"
					? ""
					: data.lbMaterialjhrq);
			ME.zplp2.setValue(data.zplp2 == "null" ? "" : data.zplp2); // 物料信息
			ME.waers.setValue(data.waers == "null" ? "" : data.waers); // 物料信息
			ME.mwskz.setValue(data.mwskz == "null" ? "" : data.mwskz); // 物料信息
			ME.kffkfs.setValue(data.kffkfs == "null" ? "" : data.kffkfs); // 物料信息
			ME.kfbsfhs.setValue(data.kfbsfhs == "null" ? "" : data.kfbsfhs); // 客服部是否含税
			ME.tfBaseUnitOfMeasure1
					.setValue(data.tfBaseUnitOfMeasure1 == "null"
							? ""
							: data.tfBaseUnitOfMeasure1); // 计量单位１
			ME.lbMaterial3.setValue(data.lbMaterial3 == "null"
					? ""
					: data.lbMaterial3);
			ME.sl.setValue(data.sl == "null" ? "" : data.sl); // 数量
			ME.lbkfbslsh.setValue(data.lbkfbslsh == "null"
					? ""
					: data.lbkfbslsh); // 计量单位２
			ME.yysl.setValue(data.yysl == "null" ? "" : data.yysl); // 应用数量
			ME.currencyType.setValue(data.currencyType == "null"
					? ""
					: data.currencyType); // 币别类型

			ME.mbjg.setValue(data.mbjg == "null" ? "" : data.mbjg); // 目标价格
			ME.tfCustTrigger.setValue(data.tfCustTrigger == "null"
					? ""
					: data.tfCustTrigger); // 客户类型
			ME.yt.setValue(data.yt == "null" ? "" : data.yt); // 客户类型
			ME.kfkhbm.setValue(data.kfkhbm == "null" ? "" : data.kfkhbm); // 客户编码
			ME.kfkhbmsh.setValue(data.kfkhbmsh == "null" ? "" : data.kfkhbmsh); // 客户编码描述
			ME.kfxkh.setValue(data.kfxkh == "null" ? "" : data.kfxkh);// 新客户
			ME.isImportantCust.setValue(data.isImportantCust == "null" ? "" : data.isImportantCust);
			ME.isNeedPattern.setValue(data.isNeedPattern == "null" ? "" : data.isNeedPattern);
			ME.kfqwjq.setValue(data.kfqwjq == "null" ? "" : data.kfqwjq); // 客户编码描述
			ME.dd.setValue(data.dd == "null" ? "" : data.dd); // 订单
			ME.jybg.setValue(data.jybg == "null" ? "" : data.jybg); // 检验报告
			ME.applicationDate.setValue(data.applicationDate == "null"
					? ""
					: data.applicationDate); // 申请时间
			ME.zt.setValue(data.zt == "null" ? "" : data.zt); // 状态
			ME.bz.setValue(data.bz == "null" ? "" : data.bz); // 备注
			ME.scbsl.setValue(data.scbsl == "null" ? "" : data.scbsl); // 市场部数量
			ME.lbscbsl.setValue(data.lbscbsl == "null" ? "" : data.lbscbsl); // 计量单位１
			ME.lbscbslsh.setValue(data.lbscbslsh == "null"
					? ""
					: data.lbscbslsh); // 计量单位显示
			ME.scbjg.setValue(data.scbjg == "null" ? "" : data.scbjg); // 市场部价格
			ME.lbscbjg.setValue(data.lbscbjg == "null" ? "" : data.lbscbjg); // 币别类型
			ME.scbsm.setValue(data.scbsm == "null" ? "" : data.scbsm); // 市场部说明
			ME.xjdzt.setValue(data.xjdzt == "null" ? "" : data.xjdzt); // 市场部说明
			ME.cgbsl.setValue(data.cgbsl == "null" ? "" : data.cgbsl); // 采购部数量
			ME.lbcgbsl.setValue(data.lbcgbsl == "null" ? "" : data.lbcgbsl); // 计量单位１
			ME.lbcgbslsh.setValue(data.lbcgbslsh == "null"
					? ""
					: data.lbcgbslsh); // 计量单位１
			ME.cgbjg.setValue(data.cgbjg == "null" ? "" : data.cgbjg); // 采购部价格
			ME.lbcgbjg.setValue(data.lbcgbjg == "null" ? "" : data.lbcgbjg); // 币别类型
			ME.cgbmoq.setValue(data.cgbmoq == "null" ? "" : data.cgbmoq); // 采购部ｍｏｑ
			ME.cgbfkfs.setValue(data.cgbfkfs == "null" ? "" : data.cgbfkfs); // 采购部付款方式
			ME.cgbthfs.setValue(data.cgbthfs == "null" ? "" : data.cgbthfs); // 采购部提货方式
			ME.cgbjhzq.setValue(data.cgbjhzq == "null" ? "" : data.cgbjhzq); // 采购部交货周期
			ME.cgbrq.setValue(data.cgbrq == "null" ? "" : data.cgbrq); // 采购部日期
			ME.cgbqt.setValue(data.cgbqt == "null" ? "" : data.cgbqt); // 采购部其他

			ME.cgbzzcl.setValue(data.cgbzzcl == "null" ? "" : data.cgbzzcl);
			ME.cgbsccl.setValue(data.cgbsccl == "null" ? "" : data.cgbsccl);
			ME.scbzzcl.setValue(data.scbzzcl == "null" ? "" : data.scbzzcl);
			ME.scbsccl.setValue(data.scbsccl == "null" ? "" : data.scbsccl);
			ME.kfxjjg.setValue(data.kfxjjg == "null" ? "" : data.kfxjjg);
			ME.kfxjlb.setValue(data.kfxjlb == "null" ? "" : data.kfxjlb);
			ME.scbmoq.setValue(data.scbmoq == "null" ? "" : data.scbmoq);
			ME.scbfkfs.setValue(data.scbfkfs == "null" ? "" : data.scbfkfs);
			ME.scbthfs.setValue(data.scbthfs == "null" ? "" : data.scbthfs);
			ME.scbjhzq.setValue(data.scbjhzq == "null" ? "" : data.scbjhzq);
			ME.scbsfyxh.setValue(data.scbsfyxh == "null" ? "" : data.scbsfyxh);
			ME.scbgysdd.setValue(data.scbgysdd == "null" ? "" : data.scbgysdd);
			ME.scbsfhs.setValue(data.scbsfhs == "null" ? "" : data.scbsfhs);
			ME.scbwlcc.setValue(data.scbwlcc == "null" ? "" : data.scbwlcc);
			function hide1() {
				ME.ywyzb.setDisabled(true);
				ME.bu.setDisabled(true);
				ME.kfxjlb.setDisabled(true);
				ME.yt.setDisabled(true);
				ME.dd.setDisabled(true);
				ME.tfCustTrigger.setDisabled(true);
				ME.jybg.setDisabled(true);
				ME.material1.setDisabled(true);
				// ME.materialsm.setDisabled(true);
				ME.materialsm.el.dom.readOnly = true;
				ME.applicationDate.setDisabled(true);
				ME.sales.setDisabled(true);
				ME.yysl.setDisabled(true);
				ME.sl.setDisabled(true);
				// ME.lbMaterial2.setDisabled(true);
				ME.mbjg.setDisabled(true);
				ME.lbkfbslsh.setDisabled(true);
				ME.tfBaseUnitOfMeasure1.setDisabled(true);
				ME.currencyType.setDisabled(true);
				ME.bz.setDisabled(true);
				ME.kfkhbm.setDisabled(true);
				ME.kfxkh.setDisabled(true);
				ME.kfqwjq.setDisabled(true);
				ME.kffkfs.setDisabled(true);
				ME.kfbsfhs.setDisabled(true);
			};
			function hide2() {
				ME.mbmj.setDisabled(true);
				ME.kfxjjgbb.setDisabled(true);
				ME.kfxjjg.setDisabled(true);
				ME.kfxjjg2.setDisabled(true);
				ME.kfxjjg3.setDisabled(true);
				ME.newmaterms.setDisabled(true);
			}
			function hide3(){
				ME.ywyzb.setDisabled(true);
				ME.bu.setDisabled(true);
				ME.lbscbslsh.setDisabled(true);
				ME.lbscbsl.setDisabled(true);
				ME.scbsl.setDisabled(true);
				ME.lbscbjg.setDisabled(true);
				ME.scbjg.setDisabled(true);
				ME.scbsm.setDisabled(true);
				ME.scbmoq.setDisabled(true);
				ME.scbfkfs.setDisabled(true);
				ME.scbthfs.setDisabled(true);
				ME.scbjhzq.setDisabled(true);
				ME.scbsfyxh.setDisabled(true);
				ME.scbgysdd.setDisabled(true);
				ME.scbsfhs.setDisabled(true);
				ME.scbwlcc.setDisabled(true);
			}

			function show1() {
				ME.ywyzb.setDisabled(false);
				ME.bu.setDisabled(false);
				ME.kfxjlb.setDisabled(false);
				ME.yt.setDisabled(false);
				ME.dd.setDisabled(false);
				ME.tfCustTrigger.setDisabled(false);
				ME.jybg.setDisabled(false);
				ME.material1.setDisabled(false);
				// ME.materialsm.setDisabled(false);
				ME.materialsm.el.dom.readOnly = false;
				ME.applicationDate.setDisabled(false);
				ME.sales.setDisabled(false);
				ME.yysl.setDisabled(false);
				ME.sl.setDisabled(false);
				// ME.lbMaterial2.setDisabled(false);
				ME.mbjg.setDisabled(false);
				ME.lbkfbslsh.setDisabled(false);
				ME.tfBaseUnitOfMeasure1.setDisabled(false);
				ME.currencyType.setDisabled(false);
				ME.bz.setDisabled(false);
				ME.kfkhbm.setDisabled(false);
				ME.kfxkh.setDisabled(false);
				ME.kfqwjq.setDisabled(false);
				ME.kffkfs.setDisabled(false);
				ME.kfbsfhs.setDisabled(false);
			};

			function show2() {
				ME.mbmj.setDisabled(false);
				ME.kfxjjgbb.setDisabled(false);
				ME.kfxjjg.setDisabled(false);
				ME.kfxjjg2.setDisabled(false);
				ME.kfxjjg3.setDisabled(false);
				ME.newmaterms.setDisabled(false);
			}
			
			function show3(){
				ME.ywyzb.setDisabled(false);
				ME.bu.setDisabled(false);
				ME.lbscbslsh.setDisabled(false);
				ME.lbscbsl.setDisabled(false);
				ME.scbsl.setDisabled(false);
				ME.lbscbjg.setDisabled(false);
				ME.scbjg.setDisabled(false);
				ME.scbsm.setDisabled(false);
				ME.scbmoq.setDisabled(false);
				ME.scbfkfs.setDisabled(false);
				ME.scbthfs.setDisabled(false);
				ME.scbjhzq.setDisabled(false);
				ME.scbsfyxh.setDisabled(false);
				ME.scbgysdd.setDisabled(false);
				ME.scbsfhs.setDisabled(false);
				ME.scbwlcc.setDisabled(false);
				
			}
			var HaveFields = Ext.util.Cookies.get('HaveFields');
//			if(HaveFields.indexOf('024')>-1){
//				ME.materialsm.el.dom.readOnly = false;
//				hide3();
//			}
			var username = Ext.util.Cookies.get('username');
			if(HaveFields.indexOf('024')>-1){//有024权限则能且只能修改客服信息
//				if(data.xjdzt == 'OK'){
					show1();
					show2();
					hide3();
//				}
			}else if (username.indexOf('.cs') > -1) {//没有024权限但为客服权限的可以在未结单时修改客服信息，且能修改最终确认信息并结单
				if (data.xjdzt == 'OK') {
					hide1();
					show2();
					hide3();
				} else {
					show1();
					show2();
					hide3();
				}
			}else if(HaveFields.indexOf('011')>-1){//没有以上权限但有011权限的只能修改市场部信息
				hide1();
				hide2();
				show3();
			}

			var group = this.kfxjjg3;
			for (var i = 0; i < group.items.length; i++) {
				group.items.itemAt(i).setValue(false);
			}
			if (data.kfxjjg == '成功') {
				if(data.mbmj&&data.mbmj!=""){
					ME.mbmj.setValue(data.mbmj);
				}
				if(data.kfxjjgbb&&data.kfxjjgbb!=""){
					ME.kfxjjgbb.setValue(data.kfxjjgbb);
				}
				if(data.kfxjjgsh&&data.kfxjjgsh!=""){
					ME.kfxjjg2.setValue(data.kfxjjgsh);
				}
				ME.kfxjjg2.show();
				ME.mbmj.show();
				ME.kfxjjgbb.show();
			} else if (data.kfxjjg == '失败') {
				ME.newmaterms.setValue(data.newmaterms);
				for (var i = 0; i < group.items.length; i++) {
					var coms = data.kfxjjgsh.split(';');
					group.items.itemAt(i).setValue(false);
					for (var j = 0; j < coms.length; j++) {
						if (group.items.itemAt(i).value == coms[j]) {
							group.items.itemAt(i).setValue(true);
						}
					}
				}
				ME.kfxjjg3.show();
				ME.newmaterms.show();
			}
		}

	}

});

/**
 * @class EAI.qm.notQualified.princingAskCreate-客诉创建
 * @extends Ext.Viewport
 * @date Mar 31, 2011 3:16:14 PM
 * @author LEO
 */

princingAskCreate.PrincingAskCreate = Ext.extend(Ext.Viewport, {
	searchForm : null, // 搜索条件-form;
	centerPanel : null, // 中部-panel(盛centerTabPanel);
	qmInfoForm : null,
	initCenterPaneled : false, // 是否完成加载centerPanel(默认false,第一次加载后会置值为true);
	constructor : function(cfg) {
		var ME = this; // ME代指QmNotQualifiedCreate类的对象
		this.searchForm = new princingAskCreate.SearchForm({
			id : cfg.id + '_searchForm'
		});
		this.butSubmit = new Ext.Button({
			text : '提交',
			iconCls : 'icons_accept'
		});

		this.butCancel = new Ext.Button({
			text : '重置',
			id : 'butCancel',
			iconCls : 'icons_cancel',
			handler : function() {
				ME.qmInfoForm.getForm().reset();
				// Ext.getCmp('jbform').clear();
			}
		});
		this.butCreate = new Ext.Button({
			text : '新建',
			id : 'butCreate',
			hidden : true,
			iconCls : 'icons_accept',
			handler : function() {
				ME.qmInfoForm.getForm().reset();
				Ext.getCmp('jbform').show();
				Ext.getCmp('butSubmit').show();
				Ext.getCmp('butCancel').show();
				Ext.getCmp('butCreate').hide();
			}
		});

		this.butDelete = new Ext.Button({
			text : '取消询价单',
			id : 'butDelete',
			hidden : true,
			iconCls : 'icons_cancel',
			handler : function() {
				Ext.MessageBox.prompt("取消询价", "取消原因", function(id, msg) {
					if (id == 'ok') {
						var mask = new Ext.LoadMask(Ext.getBody(), {
							msg : '数据保存中，请稍候......'
						});
						mask.show();
						Ext.Ajax.request({
							url : 'princing.do?action=materialPriDelete',
							method : 'post',
							params : {
								userDept : dept,// 操作人部门
								data : Ext.encode(Ext.apply(ME.qmInfoForm
										.getForm().getValues())),
								msg : msg
							},
							success : function(response, options) {
								mask.hide();
								var jsonData = Ext
										.decode(response.responseText);
								if (jsonData.success == true) {
									self.parent.msgWindow(jsonData.msg);
									ME.qmInfoForm.hide();
								} else if (jsonData.success == false) {
									self.parent.msgWindow(jsonData.msg);
								}
							},
							failure : function(response, options) {
								mask.hide();
								self.parent.msgWindow('网络故障或服务器异常,请稍后重试!');
							}
						})
					}
				}, this, true, "询价订单取消原因：");
				/*
				 * Ext.Msg.confirm("删除", '是否删除改订单,立即删除？', function(_btn) { if
				 * (_btn == 'yes') { var mask = new Ext.LoadMask(Ext.getBody(), {
				 * msg : '数据保存中,请稍候......' }); mask.show(); Ext.Ajax.request({
				 * url : 'princing.do?action=materialPriDelete', method :
				 * 'post', params : { userDept : dept,// 操作人部门 data :
				 * Ext.encode(Ext.apply(ME.qmInfoForm .getForm().getValues())) },
				 * success : function(response, options) { mask.hide(); var
				 * jsonData = Ext .decode(response.responseText); if
				 * (jsonData.success == true) {
				 * self.parent.msgWindow(jsonData.msg); ME.qmInfoForm.hide(); //
				 * self.parent.msgWindow('数据提交成功!'); } else if (jsonData.success ==
				 * false) { self.parent.msgWindow(jsonData.msg); } }, failure :
				 * function(response, options) { mask.hide();
				 * self.parent.msgWindow('网络故障或服务器异常,请稍后重试!'); } }) } });
				 */

			}
		});

		this.qmInfoForm = new princingAskCreate.QmInfoForm({
			region : 'center',
			hidden : true,
			id : 'qmInfoForm',
			bbar : [this.butSubmit, this.butCancel, this.butDelete]
		});

		this.butSubmit.on("click", function(field, e) {
			submit();
			e.stopPropagation(); // 停止冒泡;
		}, this);

		function submit() {
			var v = ME.qmInfoForm.getForm()
							.getValues();
			var mask = new Ext.LoadMask(Ext.getBody(), {
				msg : '数据保存中,请稍候......'
			});
			mask.show();
			Ext.Ajax.request({
				url : 'princing.do?action=materialPriModify',
				method : 'post',
				params : {
					userDept : dept,// 操作人部门
					data : Ext.encode(Ext.apply(ME.qmInfoForm.getForm()
							.getValues())),
					contactPersonJson : Ext.encode(Ext
							.apply(ME.qmInfoForm.contactPerson.getData()))
				},
				success : function(response, options) {
					mask.hide();
					var jsonData = Ext.decode(response.responseText);
					if (jsonData.success == true) {
						self.parent.msgWindow(jsonData.msg);
						ME.qmInfoForm.hide();
						// self.parent.msgWindow('数据提交成功!');
					} else if (jsonData.success == false) {
						self.parent.msgWindow(jsonData.msg);
					}
				},
				failure : function(response, options) {
					mask.hide();
					self.parent.msgWindow('网络故障或服务器异常,请稍后重试!');
				}

			})
		};
		function queryData(materialid) {
			EAI.saveHistoryWord('materialQueryId');// 保存输入历史
			// var materialid = ME.searchForm.materialQueryId.getValue();
			var mask = new Ext.LoadMask(Ext.getBody(), {
				msg : '数据查询中,请稍候......'
			});
			mask.show();
			Ext.Ajax.request({
				url : 'princing.do?action=materialPriShow',
				params : {
					materialId : materialid
				},
				method : 'post',
				success : function(response, options) {
					mask.hide();
					var jsonData = Ext.decode(response.responseText);
					if (jsonData.success == true) {
						ME.qmInfoForm.show();
						ME.qmInfoForm.doLayout();
						// 装载信息
						ME.searchForm.materialQueryId
								.setValue(jsonData.mpqy.materialQueryId);
						ME.qmInfoForm.loadForm1(jsonData.mpqy);
						ME.qmInfoForm.contactPerson.getStore().removeAll()
						ME.qmInfoForm.contactPerson.setData(jsonData.mpqlist);

					} else if (jsonData.success == false) {
						self.parent.msgWindow(jsonData.msg);

					}
				},
				failure : function(response, options) {
					mask.hide();
					self.parent.msgWindow('网络故障或服务器异常,请稍后重试!');
				}
			});
		}

		if (!Ext.isEmpty(cfg.materialid)) {
			queryData(cfg.materialid);
		}

		this.searchForm.materialQueryId.on('specialkey', function(field, e) {
			if (e.keyCode == Ext.EventObject.ENTER) {
				queryData(ME.searchForm.materialQueryId.getValue());
			}
			e.stopPropagation(); // 停止冒泡;
		}, this);

		this.qmInfoForm.material1.on('specialkey', function(field, e) {
			if (e.keyCode == Ext.EventObject.ENTER) {
				ME.eventfunction();
			}
		});
		var config = Ext.apply({
			layout : 'border',
			items : [{
				region : 'north',
				id : cfg.id + '_NorthPanel',
				layout : 'form',
				frame : true,
				height : 50,
				items : [ME.searchForm]
			}, ME.qmInfoForm]

		}, cfg);
		// this.searchForm.materialQueryId.on('specialkey', this.orderTypeFn,
		// this);
		princingAskCreate.PrincingAskCreate.superclass.constructor.call(this,
				config);
	},

	orderTypeFn : function(field, e) {
		// EAI.saveHistoryWord('materialQueryId');//保存输入历史
		var matQueryId = ME.searchForm.materialQueryId.getValue();
		if (e.keyCode == Ext.EventObject.ENTER) {
			Ext.Ajax.request({
				url : 'princing.do?action=materialPriShow',
				method : 'post',
				params : {
					materialId : matQueryId
				},

				success : function(response, options) {
					var jsonData = Ext.decode(response.responseText);
					if (jsonData.success == true) {
						self.parent.msgWindow('数据提交成功!');
					} else if (jsonData.success == false) {
					}
				},
				failure : function(response, options) {
					self.parent.msgWindow('网络故障或服务器异常,请稍后重试!');
				}

			})
		};
	},
	eventfunction : function() {
		var ME = this;
		var matId = ME.qmInfoForm.material1.el.dom.value;
		if (matId.length != 18) {
			return;
		}
		Ext.Ajax.request({
			url : 'mat.do?action=getAskMaterialDetail',
			method : 'post',
			params : {
				dept : dept,
				matId : matId
			},
			success : function(response, options) {
				var jsonDate = Ext.decode(response.responseText);
				if (jsonDate.success) {
					var date = jsonDate.materialDetail;
					if (date.length > 0) {
						ME.qmInfoForm.zplp2.setValue(date[0].zplp2);
						ME.qmInfoForm.waers.setValue(date[0].waers);
						ME.qmInfoForm.mwskz.setValue(date[0].mwskz);
					}
				}
			},
			failure : function(response, options) {

			}
		})
	}
});