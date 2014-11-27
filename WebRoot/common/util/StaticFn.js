/**
 * 引入EAI.util命名空间;
 */
Ext.namespace('EAI.util');

/**
 * @description -公共静态方法类(储放公共的、静态的、规模小的方法)
 * @class EAI.supplier.SupplierListQuery
 * @function String autoFillZero(int len, String value) -在目标字符串前补零至目标长度;
 * @function String numberAutoFillZero(int len, String value) -在目标编号字符串前补零至目标长度,为空或含有*则返回原值;
 * @function void setWindowCenter(Ext.Element me) -使组件(含有setPosition方法)居于所在页正中央;
 * @function String numberIncrease(store,name,start,step,len) -Ext.data.Store中的编号递增;
 * @function boolean isInt -验证一个字符串是否可以转化成整数(int),前置零也是正确的;
 * @function boolean isNumber -验证一个字符串是否可以转化成数值(Double),前置零也是正确的;
 * @function boolean isDateString -验证是否是日期字符串;
 * @function String cutDecimal -格式数值型字符串,保留小数(只在超出精度截取,不补全);
 * @notice -参数类型和数目一定要对(不会检验参数类型和数目);
 */
EAI.util.StaticFn = (function(){
	/*
	 * 私有: 字段; 
	 */
	
	/**
	 * 用于长度不足前置补零-三十个长度;
	 */
	var ZERO = "000000000000000000000000000000"; 
	
	/*
	 * 私有: 方法;
	 */
	
	/**
	 * @description -按匹配模式,验证是否是数值;
	 */
	var isNumberFn = function(value, regExp){
		if(classBody.isEmpty(value)){ // 为空;
			return false;
		}
		var d = regExp.test(''+value);
    	return d;
    }
	
	/**
	 * EAI.util.StaticFn类体;
	 */
	var classBody = {}
	
	/*
	 * 静态方法;
	 */
	
	/**
	 * @description -在目标字符串前补零至目标长度;
	 * @param int len -补零后目标长度,len应大于value.length;
	 * @param String value -目标字符串;
	 * @return String -补零后的字符串;
	 * @date 2010-12-22
	 * @author 李欢喜;
	 * @notice -暂时只支持补30个零;
	 */
	classBody.autoFillZero = function(len, value) {
		value = '' + value;
		return (value != null && value != "") ? ZERO.substr(0, len - value.length)+ value : value;
	}
	/**
	 * @description -在目标编号字符串前补零至目标长度,为空或含有*则返回原值;
	 * @param int len -补零后目标长度,len应大于value.length;
	 * @param String value -目标字符串;
	 * @return String -补零后的字符串;
	 * @date 2010-12-22
	 * @author SAM;
	 * @notice -暂时只支持补30个零;
	 */
	classBody.numberAutoFillZero = function(len, value){
		value = '' + value;
		return (value != null && value != "" && value.indexOf("*") == -1) ? ZERO.substr(0, len - value.length)+ value : value;
	}
	/**
	 * @description -使组件(含有setPosition方法)居于所在页正中央;
	 * @param Element me -目标组件;
	 * @return void;
	 * @date 2010-12-22
	 * @author SAM;
	 * @notice Ext.Window 有center();
	 */
	classBody.setWindowCenter = function(me){
		var subPageWidth = window.frameElement.clientWidth;
		var winWidth = me.getWidth();
		var subPageHeight = window.frameElement.clientHeight;
		var winHeight = me.getHeight();
		var x = subPageWidth>=winWidth?  subPageWidth-winWidth : 5;
		var y = subPageHeight>=winHeight? subPageHeight-winHeight : 5;
		me.setPosition(x/2,y/2);
	}
	/**
	 * @description -Ext.data.Store中的编号递增(eg: '00010'->'00020');
	 * 首先根据参数求得store中指定的列中最大的编号,然后让编号按步长参数递增;
	 * @params Ext.data.Store store -目标Store;
	 * @params String name -Store中Record的name;
	 * @params int start -编号自动增长的起始点,默认(0);
	 * @params int step -编号自增的步长,默认(10);
	 * @params int len -编号长度,默认(5);
	 * @return void;
	 * @notice 编号皆必须是可以转化成数字的形式字符串;
	 * @date 2010-12-22
	 * @author SAM;
	 */
	classBody.numberIncrease = function(store,name,start,step,len){
		if(!len){
			len = 5;
		}
		if(!step){
			step = 10;
		}
		var max = classBody.autoFillZero(len,start? start : 0); // Store中name指定列最大值;
		store.each(function(record){
			var value = record.get(name);
			max = value > max? value : max;
		});
		return classBody.autoFillZero(len,(String)(parseInt(max,10) + step));
	}
	/**
	 * @description -目标否为空
	 * @params String value -目标对象;
	 * @params boolean allowBlank -只能作用于字符串对象,指定''是否不为空(缺省false,''表示为空);
	 * @return boolean;
	 * @date 2011-01-11
	 * @author SAM;
	 */
	classBody.isEmpty = function(value,allowBlank){
		return value === null || value === undefined || (!allowBlank ? value === '' : false);
	}
	/**
	 * @description -验证一个字符串是否可以转化成整数(int),前置零也是正确的;
	 * @params String value -要验证的字符串;
	 * @param boolean signed -是否是有符号(+|-)数,缺省为false,表示无前置(+|-);
	 * @return boolean;
	 */
	classBody.isInt = function(value,signed){
		return isNumberFn(value,!signed? /^\d+$/ : /^[\+|\-]?\d+$/);
	}
	/**
	 * @description -验证一个字符串是否可以转化成数值(Double),前置零也是正确的;
	 * @params String value -要验证的字符串;
	 * @param boolean signed -是否是有符号(+|-)数,缺省为false,表示无前置(+|-);
	 * @return boolean;
	 * @date 2011-01-11
	 * @author SAM;
	 */
	classBody.isNumber = function(value,signed){
    	return isNumberFn(value,!signed? /^\d+(\.{1}\d+)?$/ : /^[\+|\-]?\d+(\.{1}\d+)?$/);
    }
    /**
     * @description -验证是否是日期字符串;
     * @params String value -要验证的字符串;
     * @return Boolean;
     * @date 2011-01-11
     */
    classBody.isDateString = function(value){
    	// Date.parse(字符串) 不会抛出异常; 
    	return !isNaN(Date.parse(''+value));
    }
    /**
     * @description -格式数值型字符串,保留小数(只在超出精度截取,不补全);
     * @params String value -待处理的字符串(不是能够转化成数值的字符串,将原样返回);
     * @params int len -需要保留的精度(不是正整数,原样返回),缺省保留2位;
     * @notices -若需要四舍五入则使用Js 中 number.toFixed(0-20);
     * @returns String;
     */
    classBody.cutDecimal = function(value,len){
    	if(!len){
    		len = 2;
    	}
    	if(!classBody.isNumber(value,true) || !classBody.isInt(len)){
    		return value;
    	}
    	var reg = new RegExp('^[\\+|\\-]?\\d+(?:\\.\\d{1,'+len+'})?'); // /^[\+|\-]?\d+(?:\.\d{1,'+len+'})?/
    	return reg.exec(''+value)[0]; // 因为前面保证了是数值,必会匹配,所以一定有值;
    }
    
	/**
	 * 后续添加到此处
	 */
	return classBody;
})();