
/**
 * 屏蔽浏览器,后退,前进功能
 * 
 * @author Zhang Hao(Leo)
 * @date : Jun 17, 2011 4:28:29 PM
 */
document.documentElement.onkeydown = function(evt) {
	// alert(event.srcElement.id);
	if (event.ctrlKey) {
		event.returnvalue = true;
		return true;
	}
	if ((event.keyCode == 8)
			&& (event.srcElement.type != "text"
					&& event.srcElement.type != "textarea" && event.srcElement.type != "password")
			|| event.srcElement.readOnly ||
			// 屏蔽退格删除键
			(event.keyCode == 116))
	// 屏蔽 F5 刷新键(event.ctrlKey && event.keyCode==82)
	{ // Ctrl + R
		event.keyCode = 0;
		event.returnvalue = false;
		return false;
	}
	if ((event.ctrlKey) && (event.keyCode == 78)) {// 屏蔽 Ctrl+n
		event.returnvalue = false;
		return false;
	}
	if ((event.shiftKey) && (event.keyCode == 121)) {// 屏蔽 shift+F10
		event.returnvalue = false;
		return false;
	}
	if (window.event.srcElement.tagName == "A" && window.event.shiftKey) {
		window.event.returnvalue = false; // 屏蔽 shift 加鼠标左键新开一网页
		return false;
	}
	if ((window.event.altKey) && (window.event.keyCode == 115)) { // 屏蔽Alt+F4
		window.showModelessDialog("about:blank", "",
				"dialogWidth:1px;dialogheight:1px");
		return false;
	}
}

/**
 * @author shangwu
 * @version 1.1 2010年3月25日9:19:25
 * @description 一些常用的公共方法
 */

/*
 * 开启提示功能
 */
Ext.QuickTips.init();

/**
 * @description -将Ext.data.Store对象|Ext.data.Record数组对象-转换成Json形式的字符串;
 *              主要是补足extjs没有提供类似的方法,而Ext.encode不能满足此两种数据的转化需求;
 * @param Ext.data.Store|Array(Ext.data.Record)
 *            jsondata;
 * @return String;
 */
function storeToJson(jsondata) {
	var listRecord;
	if (jsondata instanceof Ext.data.Store) {
		listRecord = new Array();
		jsondata.each(function(record) {
			listRecord.push(record.data);
		});
	} else if (jsondata instanceof Array) {
		listRecord = new Array();
		Ext.each(jsondata, function(record) {
			listRecord.push(record.data);
		});
	}
	return Ext.encode(listRecord);
}

/**
 * 验证Store是否有空值
 * 
 * @param String
 *            val 需要验证的字段及说明,如char1:字段一,char2:字段二
 * @param Store
 *            itemStore
 * @return {Boolean}
 * @author Zhang Hao(Leo)
 * @date : Apr 6, 2011 6:22:19 PM
 */
function validationStore(val, itemStore) {
	var vals = val.split(',');
	for (var i = 0; i < itemStore.getCount(); i++) {
		for (var j = 0; j < vals.length; j++) {
			var s = vals[j].split(':');
			if (itemStore.getAt(i).get(s[0]) == ''
					&& itemStore.getAt(i).get(s[0]) != 0) {
				self.parent.msgWindow('第' + (i + 1) + '行,' + s[1] + "不能为空!");
				return false;
			}
		}
	}
	return true;
}

/**
 * 获取随机数
 * 
 * @param {}
 *            url
 * @return {}
 */
function getRandom(url) {
	var urlStr = url + "&random=" + parseInt(Math.random() * 99999 + 1);
	return urlStr;
}

var inpoutNoNULLMsg = '该输入项目为必输项';
function inputvalidator(val) {
	if (val.trim() == '') {
		return inpoutNoNULLMsg;
	} else {
		return true;
	}
}

var autoClose = function() {
	var tabPanel = window.parent.centerPanel;
	tabPanel.remove(tabPanel.getActiveTab());
};
/**
 * 描述：自定义验证 判断前者值不能大于后者
 */
Ext.apply(Ext.form.VTypes, {
	numberRange : function(value, field) {
		// alert('ccccccc');
		var flag = true;
		if (field.numberRange) {
			var beginId = field.numberRange.begin;
			var endId = field.numberRange.end;

			var beginNO = Ext.getCmp(beginId).getValue();
			var endNO = Ext.getCmp(endId).getValue();

			if (beginNO.length > 0 && endNO.length > 0) {

				if (beginNO <= endNO) {
					flag = true;
				} else {
					self.parent.msgWindow('开始编号不能大于结束编号！');
					return false;
				}
			}
		}
		return flag;
	},
	numberRangeText : '开始编号不能大于结束编号！'
});

function doReplace(str) {
	// str = str.replace(/\&/g, "& amp;");
	// str = str.replace(/\>/g, "& gt;");
	// str = str.replace(/\</g, "& lt;");
	// str = str.replace(/\"/g, "& quot;");
	// str = str.replace(/\'/g, "& #39;");
	str = str.replace(/\"/g, "'");
	return str;
}

function fieldsValidator(fileds) { // 字段验证
	var isValid = true;
	var errorMsg = '';
	for (var i = 0; i < fileds.length; i++) {
		if (fileds[i] != undefined && fileds[i].getValue() == '') {
			if (errorMsg == '') {
				errorMsg = fileds[i].fieldLabel;
			} else {
				errorMsg = errorMsg + ',' + fileds[i].fieldLabel;
			}
			isValid = false
		}
	}

	if (errorMsg.trim() != '') {
		window.parent.msgWindow('以下栏位不能为空:' + errorMsg);
	}
	return isValid;
}

/**
 * 检查是否为数字
 * 
 * @param {}
 *            str
 * @return {Boolean} true：数字，false:<b>不是</b>数字;
 */
var isNum = function(str) {
	var re = /^[\d]+$/
	var flag = re.test(str);
	if (!flag) {
		window.parent.msgWindow('请输入正确的数字!');
	}
	return flag;
}

Ext.namespace("EAI", "EAI.princing", "EAI.cust", "EAI.common", "Ext.ux");

var changeStyle = function(stylePath) {
	Ext.util.CSS.swapStyleSheet('theme', stylePath);
}
Ext.onReady(function() {
	stylePath = parent.stylePath;
	Ext.util.CSS.swapStyleSheet('theme', stylePath);
});

/**
 * for Verify field is empty
 * 
 * @Anthor:Devil
 * @CreateTime:2010-04-30
 * 
 * To verify that the array will be transmitted this way
 * 
 * @return true/false
 */
function isValid(fileds) {
	var isValid = true;
	var errorMsg = '';
	for (var i = 0; i < fileds.length; i++) {
		if (fileds[i].getValue() == '' || fileds[i].getValue() === undefined) {
			if (errorMsg == '') {
				errorMsg = fileds[i].fieldLabel;
			} else {
				errorMsg = errorMsg + ',' + fileds[i].fieldLabel;
			}
			isValid = false
		}

	}
	if (errorMsg.trim() != '') {
		self.parent.msgWindow(errorMsg);
	}
	return isValid;
};

/**
 * Verify the existence of an object in a numerical
 * 
 * @Anthor:Devil
 * @CreateTime:2010-04-30
 * 
 * Verify the object type must be number/string
 * 
 * @return true/false
 */
function in_array(needle, haystack) {

	type = typeof needle
	if (type == 'string' || type == 'number') {
		for (var i in haystack) {
			if (haystack[i] == needle) {
				return true;
			}
		}
	}
	return false;
}

/**
 * Remove method Array class extension
 * 
 * @Anthor:Devil
 * @CreateTime:2010-05-01
 * 
 * Remove out with this kind of method will be rewritten
 * 
 * @return
 */
Array.prototype.baoremove = function(dx) {
	if (isNaN(dx) || dx > this.length) {
		return false;
	}
	this.splice(dx, 1);
};

/**
 * Automatically generated code the guideline number:'000010'
 * 
 * @Anthor:Devil
 * @CreateTime:2010-05-01
 * 
 * @param _grid
 *            容器对象
 * @param saveAddIsbn
 *            用来存储您添加的新元素的数组
 * @param itemRecord
 *            Record记录
 * @param isbn
 *            想要自动增长的列 默认为id
 * @param defaultkey
 *            允许带一个默认值 默认值的Key
 * @param defaultvalue
 *            默认值的Value
 * @return number(000020)
 */
function sortIsbn(_grid, saveAddIsbn, itemRecord, isbn) {
	var _store = _grid.getStore();
	var _sCount = _store.getCount();
	var _num;
	var d;
	if (_sCount == 0) {
		_num = _sCount * 10 + 10;
	} else {
		var _id = _grid.getStore().getAt(_sCount - 1).get(isbn === undefined
				? 'id'
				: 'isbn');
		_num = parseInt(_id.substr(4, _id.length)) + 10;
	}
	for (var i = 0; i < saveAddIsbn.length; i++) {
		if (saveAddIsbn[i] == _num) {
			_num += 10;
		}
	}

	if (isbn === undefined) {
		d = new itemRecord({
			id : '0000' + _num
		});
	} else {
		d = new itemRecord({
			isbn : '0000' + _num
		})
	}
	_store.insert(_sCount, d);
	_grid.getSelectionModel().selectRow(_sCount);
	_grid.startEditing(_sCount, 1);
	saveAddIsbn.push(_num);
}

/**
 * Remove Object
 * 
 * @Anthor:Devil
 * @CreateTime:2010-05-01
 * 
 * Add to judge whether the object, if that is not deposited an array, if not,
 * then the deposit into an array
 * @param _grid:Containers
 * @param saveAddIsbn:Add
 *            the number stored in an array
 * @param saveDelectIsbn:delect
 *            the number stored in an array
 */
function delIsbn(_grid, saveAddIsbn, saveDelectIsbn, isbn) {
	if (_grid.getSelectionModel().getSelected() === undefined) {
		return;
	}
	var _num = _grid.getSelectionModel().getSelected().get(isbn === undefined
			? 'id'
			: isbn);
	var _id = _num.substr(4, _num.length);
	if (!in_array(_id, saveAddIsbn)) {
		saveDelectIsbn.push(_id);
	}
	for (var i in saveAddIsbn) {
		if (saveAddIsbn[i] == _id) {
			saveAddIsbn.baoremove(i);
		}
	}
	_grid.getStore().remove(_grid.getSelectionModel().getSelected());
}

/**
 * 此方法解决了 DateField 修改时 在EditorGridPanel中的格式错误问题
 * 
 * var a = new Ext.grid.ColumnModel([{ id : 'data', header : "交货日期", width :
 * 150, sortable : false, dataIndex : 'data', editor : this.data,
 * renderer:dateRender }])
 * 
 * @Anthor:Devil
 * @CreateTime:2010-05-01
 */
function dateRender(value) {
	if (value === undefined) {
		return;
	}
	if (typeof value == "string") {
		return value;
	}
	return value.format("Y-m-d");
}
/**
 * 给传递过来的数组里的对象做处理(可用/不可用)
 * 
 * @Anthor:Devil
 * @CreateTime:2010-05-07
 */
function setDis(fields, value) {
	var type = typeof fields;
	var typev = typeof value;
	if (type != 'object' || typev != 'boolean') {
		return;
	} else {
		for (var i = 0; i < eval(fields).length; i++) {

			fields[i].setDisabled(value);
		}
	}
}

/**
 * 去除传入字符串的两端空格
 * 
 * @Anthor:Devil
 * @CreateTime:2010-06-07
 */
function trim(str) {
	var type = typeof str;
	if (type != 'string') {
		return;
	} else {
		return str.replace(/^\s+|\s+$/g, " ");
	}

}

/**
 * @description 限定输入长度的文本框
 * @class MaxLengthTextField
 * @extends Ext.form.TextField
 */

var MaxLengthTextField = Ext.extend(Ext.form.TextField, {
	constructor : function(_config) {
		var config = Ext.apply({
			maxLength : 200
				// 默认200个长度 TextField等maxLength原本默认为1.7e+308,不能符合要求
				}, _config);
		MaxLengthTextField.superclass.constructor.call(this, config);
	},
	listeners : {
		'render' : function() {
			if (this.maxLength && !isNaN(this.maxLength)) {
				this.el.dom.maxLength = Math.round(this.maxLength) * 1;
			}
		}
	}
});

var MaxLengthTextField_OnForm = Ext.extend(MaxLengthTextField, {
	constructor : function(_config) {
		var ME = this; // 定义当前Field
		var config = Ext.apply({
			hasEntered : true, // 用于输入时 是否验证成功
			validationEvent : false,
			invalidText : '请按回车键!',
			validator : ME.validateOK,
			setEnter_OnEnter : function() {
				this.hasEntered = true;
				this.startValue = ME.getValue();
			}
		}, _config);
		MaxLengthTextField_OnForm.superclass.constructor.call(this, config);
	},
	validateOK : function() {
		var v = this.getValue();
		if (this.allowBlank && (!v || v == "")) {
			return true;
		}
		return this.hasEntered;
	},
	listeners : {
		'blur' : function() {
			if (this.getValue() != String(this.startValue)) {
				this.hasEntered = false;
				this.validate();
			}
		}
	}
});

/**
 * @description 限定输入长度的数字框
 * @class MaxLengthNumberField
 * @extends Ext.form.NumberField
 */
var MaxLengthNumberField = Ext.extend(Ext.form.NumberField, {
	constructor : function(_config) {
		var config = Ext.apply({
			maxLength : 200
				// 默认200个长度 TextField等maxLength原本默认为1.7e+308,不能符合要求
				}, _config);
		MaxLengthNumberField.superclass.constructor.call(this, config);
	},
	listeners : {
		'render' : function() {
			if (this.maxLength && !isNaN(this.maxLength)) {
				this.el.dom.maxLength = Math.round(this.maxLength) * 1;

			}
		}
	}
});

/**
 * @description RadioGroup重写了getValue()和setValue() 的类
 * @class CustomRadioGroup
 * @extends Ext.form.RadioGroup
 * @time 2010-9-14
 * @anhor 李欢喜
 * @notice 需要设置inputValue 和 value 保持一致
 */
var CustomRadioGroup = Ext.extend(Ext.form.RadioGroup, {
	getValue : function() {
		var value;
		if (this.rendered) {
			this.items.each(function(item) {
				if (!item.getValue())
					return true;
				value = item.getRawValue();
				return false;
			});
		} else {
			for (var k in this.items) {
				if (this.items[k].checked) {
					value = this.items[k].inputValue;
					break;
				}
			}
		}
		return value;
	},
	setValue : function(value) {
		if (this.rendered)
			this.items.each(function(item) {
				item.setValue((item.getRawValue() == value));
			});
		else {
			for (var k in this.items) {
				this.items[k].checked = (this.items[k].inputValue == value);
			}
		}
	}
});
/**
 * 用于根据项目编号自增空的集合的方法(校正了位数大于6位的Bug)
 */
var addItemsById = function(Grid, Store, Record, FieldName) {
	var record;
	if (!Store && !Record) {
		return;
	} else {
		var intField = 0;
		var addField;
		var storeCount = Store.getCount();
		var recrod = new Store.recordType();
		recrod.data = {};
		if (storeCount != 0) {
			var lastItemField = Store.getAt(storeCount - 1).get(FieldName);
			intField = parseFloat(lastItemField);
		}
		intField += 10;
		if (intField < 100)
			addField = '0000' + intField;
		if (intField < 1000 && intField >= 100)
			addField = '000' + intField;
		if (intField < 10000 && intField >= 1000)
			addField = '00' + intField;
		if (intField < 100000 && intField >= 10000)
			addField = '0' + intField;
		if (intField < 1000000 && intField >= 100000) {
			addField = intField;
		}

		var keys = Store.fields.keys;
		for (var i = 0; i < keys.length; i++) {
			if (keys[i] == 'id') {
				recrod.data[keys[i]] = addField;
			} else {
				recrod.data[keys[i]] = '';
			}

		}
		Grid.stopEditing();
		Store.insert(storeCount, recrod);

	}
	Grid.getSelectionModel().selectRow(storeCount);

}
// 自动增长项目号（两位数）
var addPlanByIds = function(Grid, Store, Record, FieldName) {
	var record;
	if (!Store && !Record) {
		return;
	} else {
		var intField = 0;
		var storeCount = Store.getCount();
		var recrod = new Store.recordType();
		recrod.data = {};
		if (storeCount != 0) {
			var lastItemField = Store.getAt(storeCount - 1).get(FieldName);
			intField = parseFloat(lastItemField);
		}
		intField += 1;
		var keys = Store.fields.keys;
		var stringSplit = '';
		if (intField < 10) {
			stringSplit = '0' + intField;
		} else if (intField >= 10 && intField <= 100) {
			stringSplit = '' + intField;
		}
		for (var i = 0; i < keys.length; i++) {
			if (keys[i] == 'itemId') {

				recrod.data[keys[i]] = stringSplit;
			} else {
				recrod.data[keys[i]] = '';
			}

		}
		Grid.stopEditing();
		Store.insert(storeCount, recrod);

	}
	Grid.getSelectionModel().selectRow(storeCount);

}
// 自动增长项目号（四位数）
var addPlanById = function(Grid, Store, Record, FieldName) {
	var record;
	if (!Store && !Record) {
		return;
	} else {
		var intField = 0;
		var storeCount = Store.getCount();
		if (storeCount == 0) {
			storeCount = Grid.getStore().getCount();
		}

		var recrod = new Store.recordType();
		recrod.data = {};
		if (storeCount != 0) {
			try {
				var lastItemField = Store.getAt(storeCount - 1).get(FieldName);
				intField = parseFloat(lastItemField);
			} catch (e) {
				var lastItemField = Grid.getStore().getAt(storeCount - 1)
						.get(FieldName);
				intField = parseFloat(lastItemField);
			}

		}
		intField += 1;
		var keys = Store.fields.keys;
		var stringSplit = '';
		if (intField < 10) {
			stringSplit = '000' + intField;
		} else if (intField >= 10 && intField <= 100) {
			stringSplit = '00' + intField;
		}
		// alert(stringSplit);
		for (var i = 0; i < keys.length; i++) {
			if (keys[i] == 'id') {
				recrod.data[keys[i]] = stringSplit;
			} else {
				recrod.data[keys[i]] = '';
			}

		}
		Grid.stopEditing();
		// Store.insert(storeCount, recrod);
		Grid.getStore().insert(storeCount, recrod);

	}
	Grid.getSelectionModel().selectRow(storeCount);
}
var resultRecord = Ext.data.Record.create([{

	name : 'quotIsbn'
}, {
	name : 'itemid'
}, {
	name : 'cust'
}, {
	name : 'custPo'
}, {
	name : 'material'
}, {
	name : 'endTime'
}, {
	name : 'custName'
}, {
	name : 'matDesc'
}, {
	name : 'custPn'
}, {
	name : 'salesArea'
}])

var orderTriggerField = Ext.extend(Ext.form.TriggerField, {
	showWindow : null,
	actionType : null,
	listPanel : null,
	initComponent : function() {
		this.actionType = this.type;
		
		var config = {
			id : this.id,
			fieldLabel : this.fieldLabel,
			name : this.name,
			enableKeyEvents : true,
			triggerClass : 'x-form-search-trigger',
			width : 130
		}
		this.onTriggerClick = function() {
			this.showWindow = new resultWindow({
				id : 'showWindow',
				actionType : this.actionType,
				windowTitle : this.fieldLabel,
				wirteBackItem : config.wirteBackItem,
				writeBackId : config.wirteBackId,
				targetGrid : this.targetGrid,
				multSelect : this.multSelect
			})
			this.showWindow.show();
			Ext.getBody().mask();
			this.showWindow.gridPanel.on('rowdblclick', this.dbClick, this);
			this.showWindow.setData.on('click', this.dbClick, this);
		}
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		orderTriggerField.superclass.initComponent.apply(this, arguments);
	},
	constructor : function(config) {
		this.listPanel = config.listPanel;
		orderTriggerField.superclass.constructor.call(this, config);
	},
	afterRender : function() {
		orderTriggerField.superclass.afterRender.call(this);
		this.on('keydown', this.thisKeyUp, this);
	},
	thisKeyUp : function(e) {
		this.el.dom.maxLength = this.maxLength * 1;
	},
	dbClick : function() {
		var _selectValues = this.showWindow.gridPanel.getSelectionModel()
				.getSelections();
		if (this.targetGrid != '' && this.targetGrid != undefined
				&& _selectValues && this.multSelect) {

			// Ext.each(selectRecords,function(r){
			var logrtstore = Ext.getCmp(this.targetGrid).getStore();
			// var removedata=[];//存放空行的数组
			var arrNull = [];
			// 去除空行
			if (logrtstore && logrtstore.getCount() > 0) {
				for (var j = 0; j < logrtstore.getCount(); j++) {
					var logrt = logrtstore.getAt(j).get('matnr');
					if (logrt == '' || logrt == undefined) {
						arrNull.push(j);// 保存为空的索引
						// removedata.push(matrnstore.getAt(j));//将空行添加到数组
					}
					// 去除重复行数据
					for (var k = 0; k < _selectValues.length; k++) {
						if (logrt == _selectValues[k].data.quotIsbn) {
							var d = _selectValues[k].data.quotIsbn;
							_selectValues.remove(_selectValues[k]);
						}
					}
				}
				// 移除空行
				/*
				 * for(var f=0;f<removedata.length;f++){
				 * matrnstore.remove(removedata[f]); }
				 */
			}

			// 返回数据到表格
			for (var i = 0; i < _selectValues.length; i++) {
				if (arrNull.length >= 1) {
					var target = 'matnr';
					if(this.gridWirteBackName) {
						target = this.gridWirteBackName;
					}
					logrtstore.getAt(arrNull[0]).set(target,
							_selectValues[i].data.quotIsbn);
					logrtstore.getAt(arrNull[0]).set(this.gridWirteBackTextName,
							_selectValues[i].data.itemid);
					arrNull.remove(arrNull[0]);
				} else {
					var record = new matrecord({
						matnr : _selectValues[i].data.quotIsbn
					});
					logrtstore.add(record);
				}
			}
			this.showWindow.closeWindow();
			// },this);
			return;
		}
		var _selectValue = this.showWindow.gridPanel.getSelectionModel()
				.getSelected();
		if (_selectValue != undefined) {
			if(this.listPanel){
				var orderIsbn = _selectValue.get('quotIsbn');
				var orderItemId = _selectValue.get('itemid');
				this.listPanel.getSelectionModel().getSelected().set(this.wirteBackItem,orderIsbn);
				this.listPanel.getSelectionModel().getSelected().set(this.writeBackId,orderItemId);
			}else{
				var orderIsbn = _selectValue.get('quotIsbn');
				this.setValue(orderIsbn);
	
				// ========================================
				// 解决so在EditorGridPanel的编辑类
				var prantGrid = Ext.getCmp(this.gridBackId);
				var sel = prantGrid;
				if (sel) {
					sel = sel.getSelectionModel().getSelected();
				}
				if (sel) {
					sel.set('quotIsbn', orderIsbn);
				}
				// ========================================
	
				var orderItemId = _selectValue.get('itemid');
				var backCom = Ext.getCmp(this.wirteBackItem);
				if (backCom != null && backCom != undefined) {
					try {
						backCom.setValue(orderItemId);
					} catch (e) {
						backCom.setText(orderItemId);
					}
				}
			}
			this.showWindow.closeWindow();
			Ext.getBody().unmask();
		}

	}
})
var resultGridPanel = Ext.extend(Ext.grid.GridPanel, {
	initComponent : function() {

		this.store = new Ext.data.Store({
			url : 'va21.do?action=getOrderList&type=' + this.actionType,
			pruneModifiedRecords : true,
			method : 'post',
			reader : new Ext.data.JsonReader({
				root : 'resultData'
			}, resultRecord)
		})
		this._sm = this.multSelect ? new Ext.grid.CheckboxSelectionModel({ // 基础数据所有选择模型
			moveEditorOnEnter : false,
			singleSelect : this.multSelect ? false : true
		})
				: new Ext.grid.RowSelectionModel({ // 基础数据所有选择模型
					moveEditorOnEnter : false,
					singleSelect : this.multSelect ? false : true
				});
		var config = {
			columnLines : true,
			stripeRows : true,
			loadMask : true,
			autoExpandColumn : 'quotIsbn',
			border : true,
			store : this.store,
			layout : 'fit',
			anchor : '100%',
			sm : this._sm,
			cm : new Ext.grid.ColumnModel([
					this.multSelect
							? new Ext.grid.CheckboxSelectionModel()
							: new Ext.grid.RowNumberer(), {
						id : 'quotIsbn',
						header : '编号',
						sortable : false,
						width : 150,
						dataIndex : 'quotIsbn'
					}, {
						id : 'itemid',
						header : '项目号',
						width : 50,
						sortable : false,
						// hidden:true,
						dataIndex : 'itemid'
					}, {
						id : 'cust',
						header : '客户编号',
						width : 80,
						sortable : false,
						dataIndex : 'cust'
					}, {
						id : 'custName',
						header : '客户中文名',
						width : 100,
						sortable : false,
						dataIndex : 'custName'
					}, {
						id : 'material',
						header : '物料',
						width : 120,
						sortable : false,
						dataIndex : 'material'
					}, {
						id : 'matDesc',
						header : '物料描述',
						sortable : false,
						width : 150,
						dataIndex : 'matDesc'
					}, {
						id : 'custPn',
						header : '客户PN',
						sortable : false,
						width : 100,
						dataIndex : 'custPn'
					}, {
						id : 'endTime',
						header : '截止时间',
						sortable : false,
						hidden : true,
						width : 70,
						dataIndex : 'endTime'
					}])
		}
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		resultGridPanel.superclass.initComponent.apply(this, arguments);
	}
})
var resultWindow = Ext.extend(Ext.Window, {
	writeBackComponent : null,
	initComponent : function() {
		this.gridPanel = new resultGridPanel({
			id : 'resultWindow',
			targetGrid : this.targetGrid,
			multSelect : this.multSelect,
			actionType : this.actionType
		})
		this.query = new Ext.Button({
			id : this.id + '_query',
			text : '查 询',
			iconCls : 'icons_accept'
		})
		this.clear = new Ext.Button({
			id : this.id + '_clear',
			text : '取  消',
			iconCls : 'icons_cancel'
		})

		this.topPanel = new resultTopPanel({
			id : 'resultWindow',
			bbar : [this.query, this.clear]
		})
		this.setData = new Ext.Button({
			id : this.id + '_query',
			text : '确 定',
			iconCls : 'icons_accept'
		})
		this.cancel = new Ext.Button({
			id : this.id + '_clear',
			text : '取  消',
			iconCls : 'icons_cancel'
		})

		var config = {
			border : false,
			width : 560,
			layout : 'fit',
			height : 400,
			constrain : false,
			closeAction : 'close',
			title : this.windowTitle,
			frame : true,
			items : [new Ext.Panel({
				layout : 'border',
				items : [{
					region : 'north',
					frame : 'true',
					height : 145,
					layout : 'fit',
					items : [this.topPanel]
				}, {
					region : 'center',
					layout : 'fit',
					items : [this.gridPanel]
				}]
			})],
			bbar : [this.setData, this.cancel]
		}
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		resultWindow.superclass.initComponent.apply(this, arguments);
	},
	afterRender : function() {
		resultWindow.superclass.afterRender.apply(this);
		this.cancel.on('click', this.closeWindow, this);
		this.clear.on('click', this.clearValue, this);
		this.query.on('click', this.queryPanelEnter, this);
		this.on('close', function() {
			Ext.getBody().unmask();
		})
	},
	closeWindow : function() {
		this.close();
		Ext.getBody().unmask();
	},
	queryPanelEnter : function() {
		var params = this.topPanel.getForm().getFieldValues();
		this.gridPanel.store.load({
			params : params
		})
	},
	clearValue : function() {
		this.topPanel.form.reset();
	}

})

var resultTopPanel = Ext.extend(Ext.FormPanel, {
	initComponent : function() {
		var config;

		this.selasAreaTrigger = new EAI.common.createSalesRegion({
			id : this.id + '_salesAreaTrigger',
			width : 370,
			name : 'salesArea'
		});
		this.materialText = new MaxLengthTextField({
			id : this.id + '_material',
			fieldLabel : '物料',
			maxLength : 18,
			name : 'material',
			width : 130
		});
		this.custText = new CustTrigger({
			id : this.id + '_custTrigger',
			fieldLabel : '客户',
			width : 130,
			name : 'cust',
			value_all : this.id + '_custTrigger',
			wirteBackId : this.id + '_custTrigger'
		});

		this.custPo = new Ext.form.TextField({
			id : this.id + '_custPo',
			fieldLabel : '客户PO',
			width : 130,
			name : 'custPo'
		});
		this.custPn = new Ext.form.TextField({
			id : this.id + '_custPn',
			fieldLabel : '客户PN',
			width : 130,
			name : 'custPn'
		});

		this.quotTextField = new orderTriggerField({
			id : this.id + '_quotText',
			fieldLabel : '报价单'
		});

		this.startTime = new Ext.form.DateField({
			format : 'Y-m-d',
			fieldLabel : '文件日期',
			name : 'startTime',
			width : 130,
			id : this.id + '_' + 'startTime'
		});

		this.endTime = new Ext.form.DateField({
			format : 'Y-m-d',
			name : 'endTime',
			width : 130,
			id : this.id + '_' + 'endTime'
		});
		config = {
			border : false,
			layout : 'table',
			autoScroll : true,
			height : 150,
			layoutConfig : {
				columns : 3
			},
			items : [{
				layout : 'form',
				columnWidth : .7,
				colspan : 3,
				labelWidth : 60,
				items : [this.selasAreaTrigger]
			}, {
				layout : 'form',
				columnWidth : .2,
				labelWidth : 60,
				items : [this.custText]
			}, {
				layout : 'form',
				width : 60
			}, {
				layout : 'form',
				labelWidth : 60,
				columnWidth : .7,
				items : [this.custPo]
			}, {
				layout : 'form',
				columnWidth : .2,
				// colspan : 3,
				labelWidth : 60,
				items : [this.materialText]
			}, {
				layout : 'form',
				width : 60
			}, {
				layout : 'form',
				labelWidth : 60,
				columnWidth : .5,
				items : [this.custPn]
			}, {
				layout : 'form',
				columnWidth : .2,
				labelWidth : 60,
				items : [this.startTime]
			}, {
				layout : 'form',
				width : 60,
				items : [{
					xtype : 'label',
					// labelAlign:'right',
					style : 'font-size:12px',
					text : '至'
				}]
			}, {
				layout : 'form',
				labelWidth : 60,
				columnWidth : .7,
				items : [this.endTime]
			}]

		}
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		resultTopPanel.superclass.initComponent.apply(this, arguments);

	},
	constructor : function(config) {
		resultTopPanel.superclass.constructor.call(this, config);
	}

})

/**
 * @description 实现禁用下拉功能-ComboBox-类
 * @class CustomCancelDropdownComboBox
 * @extends Ext.form.ComboBox
 * @customParams Bool cancelDropdown-禁用下拉(包括输入)-默认false
 * @customFunction setCancelDropdown(bool)-是否是禁止下拉(包括输入)-bool为true禁用-bool默认为false
 * @time 2010-10-6
 * @anhor 李欢喜
 */
var CustomCancelDropdownComboBox = Ext.extend(Ext.form.ComboBox, {
	constructor : function(_config) {
		this.blankStore = new Ext.data.SimpleStore({
			id : 0,
			fields : ['value', 'text'],
			data : [['', '']]
		});

		this.beforeDropdownStore = _config.store;
		CustomCancelDropdownComboBox.superclass.constructor.call(this, _config);
	},
	afterRender : function() {
		CustomCancelDropdownComboBox.superclass.afterRender.call(this);
		this.beforeDropdownStore = this.getStore();
		this.cancelDropdownFn();
	},
	cancelDropdownFn : function() {
		try{
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
		}catch(e){
		
		}
	},
	findRecord : function(prop, value) {
		var store;
		if (this.cancelDropdown) {
			store = this.beforeDropdownStore;
		} else {
			store = this.store;
		}
		var record;
		if (store.getCount() > 0) {
			store.each(function(r) {
				if (r.data[prop] == value) {
					record = r;
					return false;
				}
			});
		}
		return record;
	},
	setCancelDropdown : function(bool) {
		this.cancelDropdown = (bool == true) ? true : false;
		this.cancelDropdownFn();
	},
	onTriggerClick : function() {
		if (this.disabled) {
			return;
		}
		if (this.cancelDropdown) {
			return;
		}
		if (this.isExpanded()) {
			this.collapse();
			this.el.focus();
		} else {
			this.onFocus({});
			if (this.triggerAction == 'all') {
				this.doQuery(this.allQuery, true);
			} else {
				this.doQuery(this.getRawValue());
			}
			this.el.focus();
		}
	}
});

/**
 * @description 实现禁用/可复制/限定长度功能-TextField-类
 * @class CustomMaxLenDisabledTextField
 * @extends Ext.form.TextField
 * @customParams Bool canCopyDisabled-是否禁用-true表禁用-默认false
 * @customFunction setCanCopyDisabled(bool)-是否是禁止使用-bool为true禁用-bool默认为false
 * @time 2010-10-7
 * @anhor 李欢喜
 */
var CustomMaxLenDisabledTextField = Ext.extend(Ext.form.TextField, {
	constructor : function(_config) {
		var config = Ext.apply({
			maxLength : 200
				// 默认200个长度 TextField等maxLength原本默认为1.7e+308,不能符合要求
				}, _config);
		CustomMaxLenDisabledTextField.superclass.constructor.call(this, config);
	},
	afterRender : function() {
		if (this.maxLength && !isNaN(this.maxLength)) {
			this.el.dom.maxLength = Math.round(this.maxLength) * 1;
		}
		CustomMaxLenDisabledTextField.superclass.afterRender.call(this);
		this.canCopyDisabledFn();
	},
	setCanCopyDisabled : function(bool) {
		this.canCopyDisabled = (bool == true) ? true : false;
		this.canCopyDisabledFn();
	},
	canCopyDisabledFn : function() {
		if (this.canCopyDisabled) {
			this.el.dom.readOnly = true;
			this.el.dom.style.border = 'solid gray 1px';
			this.el.dom.style.color = 'gray';
		} else {
			this.el.dom.readOnly = this.readOnly;
			this.el.dom.style.border = 'solid #B5B8C8 1px';
			this.el.dom.style.color = '#000000';
		}
	}
});

var CustomMaxLenDisabledNumberField = Ext.extend(Ext.form.NumberField, {
	constructor : function(_config) {
		var config = Ext.apply({
			maxLength : 200
				// 默认200个长度 TextField等maxLength原本默认为1.7e+308,不能符合要求
				}, _config);
		CustomMaxLenDisabledNumberField.superclass.constructor.call(this,
				config);
	},
	afterRender : function() {
		if (this.maxLength && !isNaN(this.maxLength)) {
			this.el.dom.maxLength = Math.round(this.maxLength) * 1;
		}
		CustomMaxLenDisabledNumberField.superclass.afterRender.call(this);
		this.canCopyDisabledFn();
	},
	setCanCopyDisabled : function(bool) {
		this.canCopyDisabled = (bool == true) ? true : false;
		this.canCopyDisabledFn();
	},
	canCopyDisabledFn : function() {
		if (this.canCopyDisabled) {
			this.el.dom.readOnly = true;
			this.el.dom.style.border = 'solid gray 1px';
			this.el.dom.style.color = 'gray';
		} else {
			this.el.dom.readOnly = this.readOnly;
			this.el.dom.style.border = 'solid #B5B8C8 1px';
			this.el.dom.style.color = '#000000';
		}
	}
});

/**
 * 自定义js包机制 申明命名空间
 */
Ext.namespace('EAI'); // 顶层包,存放公共类和方法和全部子包
Ext.namespace('EAI.util'); // 工具包
Ext.namespace('EAI.right'); // 权限
Ext.namespace('EAI.sd'); // 报价单
Ext.namespace('EAI.so'); // 销售订单
Ext.namespace('EAI.cust'); // 客户主数据
Ext.namespace('EAI.custmat'); // 客户物料主数据
Ext.namespace('EAI.material'); // 物料主数据
Ext.namespace('EAI.pricing'); // 定价
Ext.namespace('EAI.mrp'); // mrp
Ext.namespace('EAI.reportprint'); // 报表打印
Ext.namespace('EAI.po'); // 采购订单
Ext.namespace('EAI.report'); // 报表
Ext.namespace('EAI.supplier'); // 供应商
Ext.namespace('EAI.technicsroute'); // 工艺路线
Ext.namespace('EAI.commoditysupplylist');// 货源清单
Ext.namespace('EAI.lock'); // 同步锁
Ext.namespace('EAI.comp'); // 自定义组件类;

var Base64 = (function() {
	// Private property
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	// Private method for UTF-8 encoding
	function utf8Encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	}

	// Public method for encoding
	return {
		encode : (typeof btoa == 'function') ? function(input) {
			return btoa(utf8Encode(input));
		} : function(input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = utf8Encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
						+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
			}
			return output;
		}
	};
})();

Ext.override(Ext.grid.GridPanel, {
	getExcelXml : function(includeHidden) {
		var worksheet = this.createWorksheet(includeHidden);
		var totalWidth = this.getColumnModel().getTotalWidth(includeHidden);
		return '<xml version="1.0" encoding="UTF-8">'
				+ '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office">'
				+ '<o:DocumentProperties><o:Title>'
				+ this.title
				+ '</o:Title></o:DocumentProperties>'
				+ '<ss:ExcelWorkbook>'
				+ '<ss:WindowHeight>'
				+ worksheet.height
				+ '</ss:WindowHeight>'
				+ '<ss:WindowWidth>'
				+ worksheet.width
				+ '</ss:WindowWidth>'
				+ '<ss:ProtectStructure>False</ss:ProtectStructure>'
				+ '<ss:ProtectWindows>False</ss:ProtectWindows>'
				+ '</ss:ExcelWorkbook>'
				+ '<ss:Styles>'
				+ '<ss:Style ss:ID="Default">'
				+ '<ss:Alignment ss:Vertical="Top" ss:WrapText="1" />'
				+ '<ss:Font ss:FontName="arial" ss:Size="10" />'
				+ '<ss:Borders>'
				+ '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top" />'
				+ '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom" />'
				+ '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left" />'
				+ '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right" />'
				+ '</ss:Borders>'
				+ '<ss:Interior />'
				+ '<ss:NumberFormat />'
				+ '<ss:Protection />'
				+ '</ss:Style>'
				+ '<ss:Style ss:ID="title">'
				+ '<ss:Borders />'
				+ '<ss:Font />'
				+ '<ss:Alignment ss:WrapText="1" ss:Vertical="Center" ss:Horizontal="Center" />'
				+ '<ss:NumberFormat ss:Format="@" />' + '</ss:Style>'
				+ '<ss:Style ss:ID="headercell">'
				+ '<ss:Font ss:Bold="1" ss:Size="10" />'
				+ '<ss:Alignment ss:WrapText="1" ss:Horizontal="Center" />'
				+ '<ss:Interior ss:Pattern="Solid" ss:Color="#A3C9F1" />'
				+ '</ss:Style>' + '<ss:Style ss:ID="even">'
				+ '<ss:Interior ss:Pattern="Solid" ss:Color="#CCFFFF" />'
				+ '</ss:Style>'
				+ '<ss:Style ss:Parent="even" ss:ID="evendate">'
				+ '<ss:NumberFormat ss:Format="yyyy-mm-dd" />' + '</ss:Style>'
				+ '<ss:Style ss:Parent="even" ss:ID="evenint">'
				+ '<ss:NumberFormat ss:Format="0" />' + '</ss:Style>'
				+ '<ss:Style ss:Parent="even" ss:ID="evenfloat">'
				+ '<ss:NumberFormat ss:Format="0.00" />' + '</ss:Style>'
				+ '<ss:Style ss:ID="odd">'
				+ '<ss:Interior ss:Pattern="Solid" ss:Color="#CCCCFF" />'
				+ '</ss:Style>' + '<ss:Style ss:Parent="odd" ss:ID="odddate">'
				+ '<ss:NumberFormat ss:Format="yyyy-mm-dd" />' + '</ss:Style>'
				+ '<ss:Style ss:Parent="odd" ss:ID="oddint">'
				+ '<ss:NumberFormat ss:Format="0" />' + '</ss:Style>'
				+ '<ss:Style ss:Parent="odd" ss:ID="oddfloat">'
				+ '<ss:NumberFormat ss:Format="0.00" />' + '</ss:Style>'
				+ '</ss:Styles>' + worksheet.xml + '</ss:Workbook>';
	},

	createWorksheet : function(includeHidden) {
		// Calculate cell data types and extra class names which affect
		// formatting
		var cellType = [];
		var cellTypeClass = [];
		var cm = this.getColumnModel();
		var totalWidthInPixels = 0;
		var colXml = '';
		var headerXml = '';
		var visibleColumnCountReduction = 0;
		var colCount = cm.getColumnCount();
		for (var i = 0; i < colCount; i++) {
			if ((cm.getDataIndex(i) != '')
					&& (includeHidden || !cm.isHidden(i))) {
				var w = cm.getColumnWidth(i)
				totalWidthInPixels += w;
				if (cm.getColumnHeader(i) === "") {
					cellType.push("None");
					cellTypeClass.push("");
					++visibleColumnCountReduction;
				} else {
					colXml += '<ss:Column ss:AutoFitWidth="1" ss:Width="' + w
							+ '" />';
					headerXml += '<ss:Cell ss:StyleID="headercell">'
							+ '<ss:Data ss:Type="String">'
							+ cm.getColumnHeader(i)
							+ '</ss:Data>'
							+ '<ss:NamedCell ss:Name="Print_Titles" /></ss:Cell>';
					var fld = this.store.recordType.prototype.fields.get(cm
							.getDataIndex(i));
					switch (fld.type) {
						case "int" :
							cellType.push("Number");
							cellTypeClass.push("int");
							break;
						case "float" :
							cellType.push("Number");
							cellTypeClass.push("float");
							break;
						case "bool" :
						case "boolean" :
							cellType.push("String");
							cellTypeClass.push("");
							break;
						case "date" :
							cellType.push("DateTime");
							cellTypeClass.push("date");
							break;
						default :
							cellType.push("String");
							cellTypeClass.push("");
							break;
					}
				}
			}
		}
		var visibleColumnCount = cellType.length - visibleColumnCountReduction;

		var result = {
			height : 9000,
			width : Math.floor(totalWidthInPixels * 30) + 50
		};

		// Generate worksheet header details.
		var t = '<ss:Worksheet ss:Name="'
				+ this.title
				+ '">'
				+ '<ss:Names>'
				+ '<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\''
				+ this.title
				+ '\'!R1:R2" />'
				+ '</ss:Names>'
				+ '<ss:Table x:FullRows="1" x:FullColumns="1"'
				+ ' ss:ExpandedColumnCount="'
				+ (visibleColumnCount + 2)
				+ '" ss:ExpandedRowCount="'
				+ (this.store.getCount() + 2)
				+ '">'
				+ colXml
				+ '<ss:Row ss:Height="38">'
				+ '<ss:Cell ss:StyleID="title" ss:MergeAcross="'
				+ (visibleColumnCount - 1)
				+ '">'
				+ '<ss:Data xmlns:html="http://www.w3.org/TR/REC-html40" ss:Type="String">'
				+ '<html:B>' + this.title
				+ '</html:B></ss:Data><ss:NamedCell ss:Name="Print_Titles" />'
				+ '</ss:Cell>' + '</ss:Row>' + '<ss:Row ss:AutoFitHeight="1">'
				+ headerXml + '</ss:Row>';

		// Generate the data rows from the data in the Store
		for (var i = 0, it = this.store.data.items, l = it.length; i < l; i++) {
			t += '<ss:Row>';
			var cellClass = (i & 1) ? 'odd' : 'even';
			r = it[i].data;
			var k = 0;
			for (var j = 0; j < colCount; j++) {
				if ((cm.getDataIndex(j) != '')
						&& (includeHidden || !cm.isHidden(j))) {
					var v = r[cm.getDataIndex(j)];
					if (cellType[k] !== "None") {
						t += '<ss:Cell ss:StyleID="' + cellClass
								+ cellTypeClass[k] + '"><ss:Data ss:Type="'
								+ cellType[k] + '">';
						if (cellType[k] == 'DateTime') {
							t += v.format('Y-m-d');
						} else {
							t += v;
						}
						t += '</ss:Data></ss:Cell>';
					}
					k++;
				}
			}
			t += '</ss:Row>';
		}

		result.xml = t
				+ '</ss:Table>'
				+ '<x:WorksheetOptions>'
				+ '<x:PageSetup>'
				+ '<x:Layout x:CenterHorizontal="1" x:Orientation="Landscape" />'
				+ '<x:Footer x:Data="Page &amp;P of &amp;N" x:Margin="0.5" />'
				+ '<x:PageMargins x:Top="0.5" x:Right="0.5" x:Left="0.5" x:Bottom="0.8" />'
				+ '</x:PageSetup>' + '<x:FitToPage />' + '<x:Print>'
				+ '<x:PrintErrors>Blank</x:PrintErrors>'
				+ '<x:FitWidth>1</x:FitWidth>'
				+ '<x:FitHeight>32767</x:FitHeight>' + '<x:ValidPrinterInfo />'
				+ '<x:VerticalResolution>600</x:VerticalResolution>'
				+ '</x:Print>' + '<x:Selected />'
				+ '<x:DoNotDisplayGridlines />'
				+ '<x:ProtectObjects>False</x:ProtectObjects>'
				+ '<x:ProtectScenarios>False</x:ProtectScenarios>'
				+ '</x:WorksheetOptions>' + '</ss:Worksheet>';
		return result;
	}
});

if (!Ext.grid.GridView.prototype.templates) {
	Ext.grid.GridView.prototype.templates = {};
}
Ext.grid.GridView.prototype.templates.cell = new Ext.Template(
		'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} x-selectable {css}" style="{style}" tabIndex="0" {cellAttr}>',
		'<div class="x-grid3-cell-inner x-grid3-col-{id}" {attr}>{value}</div>',
		'</td>');

/**
 * @description -下拉列表框公共类(从后台取数据,然后让'值'+'描述'显示)
 * @class EAI.CommonComboBox
 * @extends CustomCancelDropdownComboBox
 * @param String
 *            dataTarget -目标数据源(默认'')
 * @param String
 *            url -数据源请求路径(默认'base.do?action='+dataTarget+'&sap=false')
 * @param Array
 *            fields -组件Store的Columns;(默认['id', 'text'],若自定义注意valueField要能够和其匹配)
 * @systemImportParam String valueField -默认'id'
 * @systemImportParam String displayField -默认'text'
 * @systemImportParam String listWidth -列表框下拉宽度
 */
EAI.CommonComboBox = Ext.extend(CustomCancelDropdownComboBox, {
	storeLoaded : false,
	remoteStore : null,
	url : null,
	dataTarget : null,
	fields : null,
	constructor : function(cfg) {
		var ME = this;

		var readJson = Ext.extend(Ext.data.JsonReader, {
			read : function(response) {
				var o = Ext.decode(response.responseText);
				var json = new Array();
				var company = Ext.util.Cookies.get('companyNum');
				var dept = Ext.util.Cookies.get('dept');
				var saleG=Ext.util.Cookies. get('salesGroup');
				var deptJson = new Array();
				var strs = new Array();
				for (var a = 0; a < o.data.length; a++) {
					if (company.indexOf(o.data[a].companyNum) > -1) {
						json.push(o.data[a]);//
					}
					if (saleG != null && saleG != "" || saleG != undefined)
						if (saleG.indexOf(o.data[a].id.substring(0, 4)) > -1) {
							deptJson.push(o.data[a]);
						}
				}
				if (dept == 'PUR.Dept(G1)' || dept == 'PUR.Dept(G2)'
						|| dept == 'PUR.Dept(G3)' || dept == 'Sales.Dept.(G1)'
						|| dept == 'Sales.Dept.(G2)'
						|| dept == 'Sales.Dept.(G3)' && deptJson.length > 0) {
					o.data = deptJson;
				} else {
					if (json.length > 0) {
						o.data = json;
					}
				}

				this.responseText = o;
				if (!o) {
					throw {
						message : "暂无数据！"
					};
				}
				return this.readRecords(o);
			}
		});
		var deptJson = Ext.extend(Ext.data.JsonReader, {
			read : function(response) {
				var o = Ext.decode(response.responseText);
				var json = new Array();
				var company = Ext.util.Cookies.get('companyNum');
				var strs = new Array();
				strs = company.split(";");
				for (var i = 0; i < strs.length; i++) {
					for (var a = 0; a < o.data.length; a++) {
						if (strs[i] == o.data[a].companyNum) {

							json.push(o.data[a]);
						}
					}
				}

				if (json.length > 0) {
					o.data = json;
				}

				this.responseText = o;
				if (!o) {
					throw {
						message : "暂无数据！"
					};
				}
				return this.readRecords(o);
			}
		});
		this.dataTarget = !Ext.isEmpty(cfg.dataTarget) ? cfg.dataTarget : '';
		this.url = !Ext.isEmpty(cfg.url) ? cfg.url : 'base.do?action='
				+ this.dataTarget + '&sap=false';
		this.fields = !Ext.isEmpty(cfg.fields) && Ext.isArray(cfg.fields)
				? cfg.fields
				: ['id', 'text', 'companyNum'];
		this.remoteStore = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : ME.url
			}),
			method : 'post',
			sortInfo : {
				field : ME.fields[0],
				direction : "ASC"
			},
			reader : cfg.dataTarget == "PurcharseOrg" ? new readJson({
				totalProperty : 'count',
				root : "data",
				fields : ME.fields
			}) : new deptJson({
				totalProperty : 'count',
				root : "data",
				fields : ME.fields
			})

		});
		/*
		 * this.remoteStore = new Ext.data.JsonStore({ url : ME.url, fields :
		 * ME.fields, root: 'data' });
		 */
		var config = Ext.apply({
			store : new Ext.data.SimpleStore({
				fields : ME.fields,
				data : [['', '']]
			}),
			emptyText : '请选择',
			mode : 'local',
			readOnly : true,
			triggerAction : 'all',
			valueField : 'id',
			anchor : '100%',
			displayField : 'text'
		}, cfg);
		EAI.CommonComboBox.superclass.constructor.call(this, config);
	},
	storeLoad : function() {
		var me = this;
		this.remoteStore.load({
			callback : function(records, options, success) {
				if (success) {
					var data = [];
					me.remoteStore.each(function(record) {
						data.push([
								record.get(me.valueField),
								record.get(me.valueField) + "【"
										+ record.get(me.displayField) + "】"]);
					});
					me.store.loadData(data);
					me.storeLoaded = true;
				}
			}
		});
	},
	listeners : {
		// expand
		'focus' : function(combo) {
			if (!this.storeLoaded) {
				this.storeLoad();
			}
		}
	}
});

/**
 * @description 返回v按format格式化后的字符串 修补Ext.util.format.date(v,format)不支持中国格式日期
 * @params 期待为Date/能转化Date类型 v -需格式化处理的值(非Date也不能转化为Date类型,则原值返回) String format
 *         -格式字符串(默认'Y-m-d')
 * @return -String v按format格式化后的字符串
 */
EAI.date = function(v, format) {
	if (v === null || v === undefined) {
		return "";
	}
	if (!Ext.isDate(v)) {
		// v = new Date(Date.parse(v)); --Date.parse(v)-对中国日期格式支持性不好
		var dt = Date.parse(v);
		if (!isNaN(dt)) {
			v = new Date(dt);
		} else {
			return v;
		}
	}
	return v.dateFormat(format || "Y-m-d");
}

/**
 * @description 返回一个Grid中ColumnModel的renderer dateRenderer函数(指定格式字符串format)
 *              修补Ext.util.format.dateRenderer(format)不支持中国格式日期
 * @params String format -格式字符串
 * @return ` Function dateRenderer函数
 * @notice 直接给Grid的Store中赋值时,保证String类型内容匹配格式字符串format
 */
EAI.gridDateRenderer = function(format) {
	return function(v) {
		return EAI.date(v, format);
	}
}

/**
 * @description Grid 中验证错误实体
 * @params {} config -{String recordId, String dataIndex, String msg}
 */
EAI.GrigValidEntity = function(config) {
	this.recordId = config.recordId;
	this.dataIndex = config.dataIndex;
	this.msg = config.msg && config.msg !== true ? config.msg : '请检查数据';
	this.isUsable = function() {
		return true;
	}
}

EAI.getExcelReport = function(gridId, title, fileName) {
	var grid = Ext.getCmp(gridId);

	var vExportContent = grid.getExcelXml(title);
	if (Ext.isIE || Ext.isSafari || Ext.isSafari2 || Ext.isSafari3) {
		var fd = Ext.get('frmDummy');
		if (!fd) {
			fd = Ext.DomHelper.append(Ext.getBody(), {
				tag : 'form',
				method : 'post',
				id : 'frmDummy',
				action : "/EAI/ui/js/EAI/report/exportexcel.jsp",
				target : '_blank',
				name : 'frmDummy',
				cls : 'x-hidden',
				cn : [{
					tag : 'input',
					name : 'fileName',
					id : 'fileName',
					type : 'hidden'
				}, {
					tag : 'input',
					name : 'exportContent',
					id : 'exportContent',
					type : 'hidden'
				}]
			}, true);
		}
		fd.child('#fileName').set({
			value : fileName
		});
		fd.child('#exportContent').set({
			value : vExportContent
		});
		fd.dom.submit();
	} else {
		document.location = 'data:application/vnd.ms-excel;base64,'
				+ Base64.encode(vExportContent);
	}
}
/**
 * 设置页面样式(皮肤) 从cookies中取得样式
 */
EAI.setThemeStyle = function() {
	// alert(Ext.util.Cookies.get('EAI.theme'));
	Ext.util.CSS.swapStyleSheet('window', Ext.util.Cookies.get('EAI.theme'));
}

/**
 * 用户是否拥有对应字段的查看权限
 * 
 * @author Zhang Hao(Leo)
 * @date : Jul 13, 2011 4:50:16 PM
 * @param filedId
 *            对应权限字段的ID
 * @return boolean
 */

function fieldPurview(filedId) {
	var fields = Ext.util.Cookies.get('HaveFields');
	if (fields && fields.indexOf(filedId) > -1) {
		return false;// 有权限,返回false不隐藏
	} else {
		return true;// 无权限,返回true隐藏
	}
}

function columnMove(column,oldIndex,newIndex,tableName){
	var mask = new Ext.LoadMask(Ext.getBody(),{
		msg : "wait..."
	})
	mask.show();
	Ext.Ajax.request({
		method : "post",
		url : "dynamicgrid.do?action=columnMove",
//			async : false,
		params : {
			oldIndex : oldIndex,
			newIndex : newIndex,
			tableName : tableName,
			dataIndex : column.getDataIndex(newIndex)
		},
		success : function(response,options){
			mask.hide();
		},
		failure : function(response,options){
			mask.hide();
		}
	})
}

function columnHidden(column,colIndex,hidden,tableName){
	var mask = new Ext.LoadMask(Ext.getBody(),{
		msg : "wait..."
	})
	mask.show();
	Ext.Ajax.request({
		method : "post",
		url : "dynamicgrid.do?action=columnHidden",
//			async : false,
		params : {
			colIndex : colIndex,
			hidden : hidden,
			tableName : tableName,
			dataIndex : column.getDataIndex(colIndex)
		},
		success : function(response,options){
			mask.hide();
		},
		failure : function(response,options){
			mask.hide();
		}
	})
}
