/**
 * @author shangwu
 * @version 1.1 2010年5月18日11:45:58
 * @description 一些公共的主数据
 */

EAI.common = new function() {
	//evelyn============================重写(工厂、公司代码订单类型)store的read方法
	var readJson=Ext.extend(Ext.data.JsonReader, {   
			 read : function(response){ 
			 var o =Ext.decode(response.responseText);
			 var json=new Array();
			 var company=Ext.util.Cookies.get('companyNum');
			 var strs= new Array();
			 strs=company.split(";");
			 for(var i=0;i<strs.length;i++){
			    for (var a = 0; a < o.rows.length; a++) {
			    	  if(strs[i]==o.rows[a].companyNum){
			    	   	 json.push(o.rows[a]);
			    	  }
			    }
			 }
			  o.rows=json;
			 this.responseText = o;  
			    if(!o) {   
			        throw {message: "暂无数据！"};   
			    }   
			    return this.readRecords(o);   
			}
	});
	//evelyn============================重写(销售组织、采购组织)store的read方法
	var deptJson=Ext.extend(Ext.data.JsonReader, {   
			 read : function(response){ 
			 var o =Ext.decode(response.responseText);
			 var json=new Array();
			 var company=Ext.util.Cookies.get('companyNum');
			 var saleG=Ext.util.Cookies.get('salesGroup');
			 var dept=Ext.util.Cookies.get('dept');
			 var deptJson=new Array();
			 var strs= new Array();
			 //strs=company.split(";");
			 for (var a = 0; a < o.rows.length; a++) {
			    	  if(company.indexOf(o.rows[a].companyNum)>-1){
			    	   	 json.push(o.rows[a]);//
			    	  }
			    	  if(saleG!=null&&saleG!=""||saleG!=undefined)
			    	  if(saleG.indexOf(o.rows[a].id.substring(0,4))>-1){
			    	     deptJson.push(o.rows[a]);
			    	  }
			 }
			 if(dept=='PUR.Dept(G1)'||dept=='PUR.Dept(G2)'||dept=='PUR.Dept(G3)'
					  ||dept=='Sales.Dept.(G1)'||dept=='Sales.Dept.(G2)'||dept=='Sales.Dept.(G3)'
					  &&deptJson.length>0){
			 	o.rows=deptJson;
			 }else{
			      o.rows=json;
			 } 
			 this.responseText = o;  
			    if(!o) {   
			        throw {message: "暂无数据！"};   
			    }   
			    return this.readRecords(o);   
			}
	});
    //========================================================================================
	return {
		createSaleOrg : function(config) {
			var saleOrgStore = new Ext.data.SimpleStore({
						fields : ['id', 'text'],
						data : [['1000', '1000【金宝石】'], ['2000', '2000【可德利】'],
								['3000', '3000【金幻】'], ['4000', '4000【免税】']]
					});

			return new Ext.form.ComboBox(Ext.apply({
						fieldLabel : '销售组织',
						store : saleOrgStore,
						emptyText : '请选择',
						triggerAction : 'all',
						readOnly : true,
						valueField : 'id',
						anchor : '100%',
						displayField : 'text',
						mode : 'local'
					},config));
		},
		createDistributionChannel : function(config) {
			var distributionChannelStore = new Ext.data.SimpleStore({
						fields : ['id', 'text'],
						data : [['EX', '国外销售-金宝石'], ['DO', '国内销售-可德利']]
					});

			return new Ext.form.ComboBox(Ext.apply({
						fieldLabel : '分销渠道',
						store : distributionChannelStore,
						emptyText : '请选择',
						mode : 'local',
						triggerAction : 'all',
						readOnly : true,
						valueField : 'id',
						anchor : '99%',
						displayField : 'text'
					},config));
		},
		createProductGroup : function() {
			var productGroupStore = new Ext.data.SimpleStore({
						fields : ['id', 'text'],
						data : [['10', '10【黏带及黏胶剂产品】']]
					});

			return new Ext.form.ComboBox({
						fieldLabel : '产品组',
						store : productGroupStore,
						emptyText : '请选择',
						mode : 'local',
						triggerAction : 'all',
						readOnly : true,
						valueField : 'id',
						anchor : '100%',
						displayField : 'text'
					});
		},
		createFactory : function(config) {
			/**
			* 可编辑工厂下拉.如不想使用可编辑可使用cretaeFactory({readOnly : true});
			* @author Zhang Hao(Leo) 
			* @date : Jul 4, 2011 10:51:43 AM
			*/
			return new EAI.common.FactoryComboBox(Ext.apply({
						fieldLabel : '工厂',
						readOnly : false,
						typeAhead : config.readOnly ? false : true,
						selectOnFocus : config.readOnly ? false : true,
						anchor : '100%'
			}, config));
		},
		createCoType : function(config) {
			return new EAI.common.CoTypeComboBox(Ext.apply({
						fieldLabel : '工单类型',
						readOnly : false,
						typeAhead : config.readOnly ? false : true,
						selectOnFocus : config.readOnly ? false : true,
						anchor : '100%'
			}, config));
		},
		createSalesRegion : function(config) {
			
			var soStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : "base.do?action=SoArea"
				}),
				method : 'post',
				sortInfo:{field: 'id', direction: "ASC"},
				reader : new deptJson({
					totalProperty: 'count',
					root : "rows",
					fields : ['id', 'text','companyNum']
				})

		   });
		   //soStore.load();
			return new CustomCancelDropdownComboBox(Ext.apply({
						fieldLabel : '销售区域',
						store : soStore,
						width : 130,
						listWidth : 340,
						mode : 'remote',//local
						triggerAction : 'all',
						readOnly : true,
						valueField : 'id',
						anchor : '100%',
						displayField : 'text'
					}, config));
		},
		createSalesArea : function(config) {  // 创建没有产品组的销售区域
			var factory=null;
			if(!Ext.isEmpty(config.factory)){
				factory=Ext.get(config.factory).getValue().substring(0,4);
			}
			var soStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : "base.do?action=SoArea"
				}),
				method : 'post',
				baseParams:{factory:factory},
				sortInfo:{field: 'id', direction: "ASC"},
				reader : new readJson({
					totalProperty: 'count',
					root : "rows",
					fields : ['id', 'text','companyNum']
				})
		   });
			/*var factoryStore = new Ext.data.SimpleStore({
						fields : ['id', 'text'],
						data : [
								['1000/EX',
										'1000/EX【金宝石-HK/国外销售-金宝石】'],
								['2000/DO',
										'2000/DO【可德利/国内销售-可德利】'],
								['3000/DO',
										'3000/DO【金幻/国内销售-可德利】'],
								['4000/DO',
										'4000/DO【免税/国内销售-可德利】']]
					});*/
		
			return new CustomCancelDropdownComboBox(Ext.apply({
						fieldLabel : '销售区域',
						store : soStore,
						mode : 'remote',
						width : 130,
						listWidth : 340,
						triggerAction : 'all',
						readOnly : true,
						valueField : 'id',
						anchor : '100%',
						displayField : 'text'
					}, config));
		},
		createSalesOffice : function(config) {
			var salesOfficeStore = new Ext.data.SimpleStore({
						fields : ['id', 'text'],
						data : [['0100', 'G1 第一组'], ['0200', 'G6 第六组'],
								['0300', 'GD 光電組']]
					});

			return new Ext.form.ComboBox(Ext.apply({
						fieldLabel : '销售部门',
						store : salesOfficeStore,
						mode : 'local',
						triggerAction : 'all',
						readOnly : true,
						valueField : 'id',
						anchor : '100%',
						displayField : 'text'
					}, config));
		},
		createSalesGroup : function(config) {
			var salesGroupStore = new Ext.data.SimpleStore({
						fields : ['id', 'text'],
						data : [['C01', 'GP 1 A組'], ['C02', 'GP 1 B組(寳安區)'],
								['C03', 'GP 1 C組(東莞西區)'],
								['C04', 'GP 1 D組(深圳+惠州)'],
								['C05', 'GP 1 E組(KEY A/C)'],
								['C06', 'GP 1 F組(廣州/中山/珠海/順德)'],
								['C07', 'GP 6 防靜電 '],
								['C08', 'GP 6 EMC/EMI組 '], ['C09', 'GP 6 OEM'],
								['C10', 'GP 6 貿易商'], ['C11', 'GP 6 光電組'],
								['C12', 'GP 1 G組(東莞東)'],
								['C13', 'GP 1 H組(HK島+九龍東)'],
								['C14', 'GP 1 I組(新界+九龍)'], ['C15', 'GP6 絕緣紙'],
								['C16', 'GP6 PVC'], ['C17', 'GP6 感應器']]
					});

			return new Ext.form.ComboBox(Ext.apply({
						fieldLabel : '销售组',
						store : salesGroupStore,
						emptyText : '请选择',
						mode : 'local',
						triggerAction : 'all',
						readOnly : true,
						valueField : 'id',
						anchor : '100%',
						displayField : 'text'
					}, config));
		},

		createMoney : function(config) {

			var moneyStore = new Ext.data.SimpleStore({
						fields : ['id', 'text'],
						data : [['CNY', '人民币'], ['HKD', '港币'], ['USD', '美元']]
					});

			return new CustomCancelDropdownComboBox(Ext.apply({
						fieldLabel : '币别',
						store : moneyStore,
						mode : 'local',
						triggerAction : 'all',
						readOnly : true,
						valueField : 'id',
						displayField : 'id'
					}, config));
		},
		createPrintlnType : function(config) {
			var printlnTypeStore = new Ext.data.SimpleStore({
				fields : ['id', 'text'],
				data : [['PDF', 'PDF']
				//['EXCEL', 'EXCEL']
				]
					
			});

			return new Ext.form.ComboBox(Ext.apply({
				fieldLabel : '打印类型',
				store : printlnTypeStore,
				emptyText : '请选择',
				mode : 'local',
				triggerAction : 'all',
				value : 'PDF',
				readOnly : true,
				valueField : 'id',
				width : 70,
				displayField : 'text'
			}, config));
		},
		createCountry : function(config) {
			var countryStore = new Ext.data.SimpleStore({
				fields : ['id', 'text'],
				data : [
						['CN', '中国'], ['HK', '香港'], ['TW', '台湾'], ['MO', '澳门'],
						['JP', '日本'], ['KP', '北韩'], ['CA', '加拿大'], ['US', '美国'],
						['TH','泰国'],['MY','马来西亚'], ['IN','印度'],
						['AU','澳大利亚'],['NZ','新西兰'],['SG','新加坡'],['VN','越南']
				]
			});

			return new Ext.form.ComboBox(Ext.apply({
						fieldLabel : '国家',
						store : countryStore,
						emptyText : '请选择',
						mode : 'local',
						triggerAction : 'all',
						readOnly : true,
						valueField : 'id',
						anchor : '100%',
						displayField : 'text',
						listeners : {
							"select" : function() {
								if (config.needClearId != undefined) {
									Ext.getCmp(config.needClearId).setValue("");
								} 
								if (config.needClearTextId != undefined) {
									Ext.getCmp(config.needClearTextId).setText("");
								}
							}
						}
					}, config));
		},
		createDropGoods : function(config) {
			var dropGoods = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : [
						['01-国内交货', '01-国内交货'],
						['02-香港交货', '02-香港交货'],
						['03-昆山嘉栩出货', '03-昆山嘉栩出货'],
						['04-国内出货-金宝石', '04-国内出货-金宝石'],
						['05-国内出货-可德利', '05-国内出货-可德利'],
						['06-Ruby国内厂车一，四', '06-Ruby国内厂车一，四'],
						['07-Ruby国内厂车二,五', '07-Ruby国内厂车二,五'],
						['08-Ruby国内厂车三,六', '08-Ruby国内厂车三,六'],
						['09-Ruby国内厂车一至六', '09-Ruby国内厂车一至六'],
						['10 – HK廠車一,三,五(新界﹐葵涌)', '10 – HK廠車一,三,五(新界﹐葵涌)'],
						['11 – HK廠車二,四,六(香港﹐九龍) ', '11 – HK廠車二,四,六(香港﹐九龍) '],
						['12-特批交货1(国内一次性签正式DN)', '12-特批交货1(国内一次性签正式DN)'],
						['13-特批交货2(在国内签形式DN,在HK客户处签正式DN)', '13-特批交货2(在国内签形式DN,在HK客户处签正式DN)']
						]
			});

			return new Ext.form.ComboBox(Ext.apply({
					store : dropGoods,
					emptyText : '请选择',
					mode : 'local',
					triggerAction : 'all',
					readOnly : true,
					valueField : 'value',
					anchor : '99%',
					displayField : 'text'
				}, config));
		},
		
		createCompanyCode : function(config){
			
			
			var companyCodeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : "base.do?action=CompanyCodeStore"
				}),
				method : 'post',
				sortInfo:{field: 'id', direction: "ASC"},
				reader : new readJson({
					totalProperty: 'count',
					root : "rows",
					fields : ['id', 'text','companyNum']
				})

		   });
		  
			return new CustomCancelDropdownComboBox(Ext.apply({
				    fieldLabel : '销售区域',
				    store : companyCodeStore,
					mode : 'remote',
					triggerAction : 'all',
					readOnly : true,
					valueField : 'id',
					anchor : '100%',
					displayField : 'text'
					
				}, config));
				
				
				
				
		},createMvgrl : function(config){
			
			
			var companyCodeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : "base.do?action=MvgrlStore"
				}),
				method : 'post',
				sortInfo:{field: 'id', direction: "ASC"},
				reader :  new Ext.data.JsonReader({
					totalProperty: 'count',
					root : "rows",
					fields : ['id', 'text','textStr']
				})

		   });
		  
			return new CustomCancelDropdownComboBox(Ext.apply({
				    fieldLabel : '销售区域',
				    store : companyCodeStore,
					mode : 'remote',
					triggerAction : 'all',
					readOnly : true,
					valueField : 'textStr',
					anchor : '100%',
					displayField : 'textStr'
					
				}, config));
				
				
				
				
		},operationState : function(cfg){
			var ddStore = new Ext.data.SimpleStore({
				fields : ['_value', 'text'],
				data : [
				  [cfg.o, '可操作'],
				  [cfg.c, '已删除']
				]
			});
			
			return new CustomCancelDropdownComboBox(Ext.apply({
				store : ddStore,
				mode : 'local',
				triggerAction : 'all',
				readOnly : true,
				valueField : '_value',
				displayField : 'text'
			},cfg));
		},orderType : function(config){
			
			
			var OderTypeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : "base.do?action=SoOderType"
				}),
				sortInfo:{field: 'id', direction: "ASC"},
				method : 'post',
				reader : new Ext.data.JsonReader({
					totalProperty: 'count',
					root : "rows",
					fields : ['id', 'text']
				})

		   });
		  
			/*var dropGoods = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : [
						['1100', '1100 【金宝石公司】'],
						['2100', '2100 【可德利公司】']
						]
			});*/

			return new CustomCancelDropdownComboBox(Ext.apply({
					store : OderTypeStore,
					emptyText : '请选择',
					width : 130,
					listWidth : 250,
					mode : 'remote',//local
					triggerAction : 'all',
					readOnly : true,
					valueField : 'id',
					anchor : '99%',
					displayField : 'text'
				}, config));
		}
	}
};

EAI.common.FactoryComboBox = Ext.extend(Ext.form.ComboBox, {
	storeLoaded : false,
	remoteStore : null,
	constructor : function(cfg) {
		var ME = this;
		this.remoteStore = new Ext.data.JsonStore({
				url : 'base.do?action=factoryStore',
				sortInfo:{field: 'id', direction: "ASC"},
				fields : ['id','text','companyNum'],
				root: 'rows',
				totalProperty: 'count',
				autoLoad : true
		});
		
		var config = Ext.apply({
			store : new Ext.data.SimpleStore({
					fields : ['id','text','companyNum'],
					data : [['','','']]
			}),
			emptyText : '请选择',
			mode : 'local',
			readOnly : false,
			typeAhead : true,
			triggerAction : 'all',
			valueField : 'id',
			displayField : 'text'
		},cfg);
		EAI.common.FactoryComboBox.superclass.constructor.call(this, config);
	},
	storeLoad : function(){
		var me = this;
		this.remoteStore.load({
			callback : function(records,options,success){
				if(success){
					var data = [];
					var company = Ext.util.Cookies.get('companyNum').split(';');
					var comMap = new EAI.Map();
					for(var i = 0;i<company.length;i++){
					    comMap.set(company[i],company[i]);
					}
					me.remoteStore.each(function(record){
						var com = record.get(me.valueField);
						if(comMap.get(com)){
                    		data.push([com,record.get(me.displayField)]);
						}
                    });
					me.store.loadData(data);
					me.storeLoaded = true;
				}
			}
		});
	},
	listeners : {
		'focus' : function(combo) {
			if(!this.storeLoaded){
				this.storeLoad();
			}
		}
	},
	cancelDropdownFn : function() {
		if (this.cancelDropdown) {
			this.store = this.blankStore;
			this.el.dom.readOnly = true;
			this.el.dom.style.border = 'solid gray 1px';
			this.el.dom.style.color = 'gray';
		} else {
			this.store = this.beforeDropdownStore;
			this.el.dom.readOnly = this.readOnly;
			this.el.dom.style.border = 'solid #B5B8C8 1px';
			this.el.dom.style.color = '#000000';
		}
	},setCancelDropdown : function(bool) {
		this.cancelDropdown = (bool == true) ? true : false;
		this.cancelDropdownFn();
	}
});

EAI.common.CoTypeComboBox = Ext.extend(Ext.form.ComboBox, {
	storeLoaded : false,
	remoteStore : null,
	constructor : function(cfg) {
		var ME = this;
		this.remoteStore = new Ext.data.JsonStore({
				url : 'base.do?action=coTypeStore',
				sortInfo:{field: 'id', direction: "ASC"},
				fields : ['id','text'],
				root: 'rows',
				totalProperty: 'count',
				autoLoad : true
		});
		
		var config = Ext.apply({
			store : this.remoteStore,
			emptyText : '请选择',
			mode : 'remote',
			readOnly : false,
			typeAhead : true,
			triggerAction : 'all',
			valueField : 'id',
			displayField : 'text'
		},cfg);
		EAI.common.CoTypeComboBox.superclass.constructor.call(this, config);
	},
	cancelDropdownFn : function() {
		if (this.cancelDropdown) {
			this.store = this.blankStore;
			this.el.dom.readOnly = true;
			this.el.dom.style.border = 'solid gray 1px';
			this.el.dom.style.color = 'gray';
		} else {
			this.store = this.beforeDropdownStore;
			this.el.dom.readOnly = this.readOnly;
			this.el.dom.style.border = 'solid #B5B8C8 1px';
			this.el.dom.style.color = '#000000';
		}
	},setCancelDropdown : function(bool) {
		this.cancelDropdown = (bool == true) ? true : false;
		this.cancelDropdownFn();
	}
});
