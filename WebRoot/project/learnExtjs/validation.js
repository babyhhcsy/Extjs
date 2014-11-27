Ext.apply(Ext.form.VTypes, {
	/*
	 * 用途：检查输入字符串是否只由英文字母和数字和下划线和汉字组成，且必须以字母或汉字开头 
	 * 输入： s：字符串 返回： 如果通过验证返回true,否则返回false
	 * add by wanglw 
	 * 2010-09-08
	 */
	"isNumberOr_OrLetterFirst" : function(s) {
//		var regu = "/^[a-zA-Z0-9\_]+$";
		//var regu = "^[0-9a-zA-Z\_]+$";
		var re = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]*$/);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 特殊字符校验的正则表达式---专用于信息的描述使用，如果别的名称允许输入“/”
	 * 那么也可以使用这个函数
	 * @param {} str
	 * addBy jk
	 * @return {Boolean}
	 */
	"isSpacailCharForSpecialDescSpace" : function(str) {
		if (str == "")
			return true;
		var forbidChar = new Array( "\\","<",">"," ","%");
		for (var i = 0; i < forbidChar.length; i++) {
			if (str.indexOf(forbidChar[i]) >= 0) {
				return false;
			} 
		}
		return true;
	},
		"isSpace" : function(str) {
        String.prototype.trim = function()
	    {
	        return this.replace(/(^\s*)|(\s*$)/g, "");
	    }
	   },
		/**
	 * 特殊字符校验的正则表达式---专用于信息的描述使用，如果别的名称允许输入“/” 无空格的校验
	 * 那么也可以使用这个函数
	 * @param {} str
	 * addBy jk
	 * @return {Boolean}
	 */
	"isSpacailCharForSpecialDesc" : function(str) {
		if (str == "")
			return true;
		var forbidChar = new Array( "\\","<",">");
		for (var i = 0; i < forbidChar.length; i++) {
			if (str.indexOf(forbidChar[i]) >= 0) {
				return false;
			}
		}
		return true;
	},
		/**
	 * 特殊字符校验的正则表达式---专用于对联系方式的校验，因为联系方式既可以输入手机也可以输入email
	 * 那么也可以使用这个函数
	 * @param {} str
	 * addBy jk
	 * @return {Boolean}
	 */
	"isContactType" : function(str) {
		if (str == "")
			return true;
		var forbidChar = new Array( "\\","<",">","#");
		for (var i = 0; i < forbidChar.length; i++) {
			if (str.indexOf(forbidChar[i]) >= 0) {
				return false;
			}
		}
		return true;
	},
	"isNumberOr_OrLetterFirstText" :"只能输入英文字母、数字、下划线_，且以字母开头 例如：aads_73736jehwury_", 
	
	"daterange" : function(val, field) {
		if(!val){
			return true;
		}
		var date = field.parseDate(val);
		if (!date) {
			field.vtypeText = val+' 是无效的日期 - 必须符合格式Y-m-d';
			return false;
		}
		if (field.startDateField
				&& (!this.dateRangeMax || (date.getTime() != this.dateRangeMax
						.getTime()))) {
			var start = Ext.getCmp(field.startDateField);
			start.setMaxValue(date);
			start.validate();
			this.dateRangeMax = date;
		} else if (field.endDateField
				&& (!this.dateRangeMin || (date.getTime() != this.dateRangeMin
						.getTime()))) {

			var end = Ext.getCmp(field.endDateField);
			end.setMinValue(date);
			end.validate();
			this.dateRangeMin = date;
		}

		return true;
	},
	
	//做两个字段值大小之间的判断，适用于form表单，也适用于batchGrid
	"compareTwoValue" : function(val,field){
		if(!val){
			return true;
		}
		if(field.startField){//说明填的是下线值
			var start='';
			if(field.gridId){//在batchGrid中需要配置gridId 和celldblclick事件将当前的record记录上
				var record = Ext.getCmp(field.gridId).returnRecord();
				if(record){
					start = record.get(field.startFieldName);//batchgrid中对应的列的dataIndex的值
				}
			}else{
				start = Ext.getCmp(field.startField).getValue();//适用于form表单的校验
			}
			var end = val;
			if(start!='' && end<start){
				return false;
			}else{
				//如果是在form里，为了处理那种不改标红项的值，而改没标红的值的情况
				if(!field.gridId){
					Ext.getCmp(field.startField).clearInvalid();
				}
			}
		}else if(field.endField){//说明填的是上线值
			var start = val;
			var end = '';
			if(field.gridId){
				var record = Ext.getCmp(field.gridId).returnRecord();
				if(record){
					end = record.get(field.endFieldName);
				}
			}else{
				end = Ext.getCmp(field.endField).getValue();
			}
			if(end!='' && end<start){
				return false
			}else{
				//如果是在form里，为了处理那种不改标红项的值，而改没标红的值的情况
				if(!field.gridId){
					Ext.getCmp(field.endField).clearInvalid();
				}
			}
		}
		return true;
	},
	"compareTwoValueText" : "后者的值不能小于前者",

	
	/**
	 * 特殊字符校验的正则表达式---专供煤炭产品定义使用，如果别的名称允许输入“/”
	 * 那么也可以使用这个函数
	 * @param {} str
	 * @return {Boolean}
	 */
	"isSpacailCharForSpecialName" : function(str) {
		if (str == "")
			return true;
		var forbidChar = new Array(",","，"," ", "\\", "'","￥","‘","’", "@","!","！","%", "\"", "?", "&", "#",
				"^", "》","《","<",">","*","[","]","(",")","（","）","{","}","、","。",".",
				"`","~", "+","=", "$","；",";",":","：","|");
		for (var i = 0; i < forbidChar.length; i++) {
			if (str.indexOf(forbidChar[i]) >= 0) {
				return false;
			}
		}
		return true;
	},
	"isSpacailCharForSpecialNameText" : "输入的内容含有特殊字符",
	
	/**
	 * 控制不能输入'"','\''字符，因为拼接树的时候会出现解析错误
	 * @param {} str
	 * @return {Boolean}
	 */
	"isQuotationMarks" : function(str) {
		if (str == "")
			return true;
		var forbidChar = new Array( "\"", "'");
		for (var i = 0; i < forbidChar.length; i++) {
			if (str.indexOf(forbidChar[i]) >= 0) {
				return false;
			}
		}
		return true;
	},
	"isQuotationMarksText" : "输入的内容含有特殊字符英文单引号(')或者英文双引号(\")",
	
	

	/**
	 * 特殊字符校验的正则表达式
	 * @param {} str
	 * @return {Boolean}
	 */
	"isSpacailChar" : function(str) {
		if (str == "")
			return true;
		var regu = "^`/!@#$%^&amp; ',.*():{}[] <>";
		var re = new RegExp(regu);
		return re.test(str);
	},
	"isSpacailCharText" : "输入的内容含有特殊字符",
	
	/*
	 * 用途：检查输入字符串是否为空或者全部都是空格 输入：str 返回： 如果全是空返回true,否则返回false
	 */
	"isNull" : function(str) {
		if (str == "")
			return true;
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(str);
	},
	"isNullText":"该单元格不能为空或者内容全是空格",

	/*
	 * 用途：检查输入对象的值是否符合整数格式 输入：str 输入的字符串 返回：如果通过验证返回true,否则返回false
	 * 
	 */
	"isInteger" : function(str) {
		if(str==""){
			return true;
		}
		var regu = '/^[-]{0,1}[0-9]{1,}$/';
		return regu.test(str);
	},
	"isIntegerText":"请输入整数\n 例如：-1,2,59",


	/*
	 * 用途：检查输入字符串是否符合正整数格式 输入： s：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isNumber" : function(s) {
		if(s==""){
			return true;
		}
		var regu = "^[0-9]+$";
		var re = new RegExp(regu);
		if (s.search(re) != -1) {
			return true;
		} else {
			return false;
		}
	},
	"isNumberText":"请输入正整数\n 例如：1,2,25",
	/*
  	*用途:检查输入字符串是否是整数或小数，可以是负数 输入: s:字符串 返回： 如果通过验证返回true,否则返回false
  	*
  	*/
  	"isDouble":function(s){
  		if(s==""){
			return true;
		}
  		var re = new RegExp(/^-?\d*\.?\d*$/); 
  		if(re.test(s)){
  			return true;
  		}else{
  		return false;
  		}
  	},
  	"isDoubleText":"请输入整数或小数\n 例如: 1,2,2.25,0.78",
  	
  	/**
  	 * 只能输入小数点后4位非负小数
  	 * @param {} s
  	 * @return {Boolean}
  	 */
  	"isDouble4":function(s){
  		if(s==""){
			return true;
		}
  		var re = new RegExp(/^[0-9]+([.]{1}[0-9]{1,4})?$/);
  		if(re.test(s)){
  			return true;
  		}else{
  		return false;
  		}
  	},
  	"isDouble4Text":"只能输入最多含4位小数的数字",
  	
  	/**
  	 * 只能输入小数点后2位非负小数
  	 * @param {} s
  	 * @return {Boolean}
  	 */
  	"isDouble2":function(s){
  		if(s==""){
			return true;
		}
  		var re = new RegExp(/^[0-9]+([.]{1}[0-9]{1,2})?$/);
  		if(re.test(s)){
  			return true;
  		}else{
  		return false;
  		}
  	},
  	"isDouble2Text":"只能输入最多含2位小数的数字",
	
	/*
	 * 用途：检查输入字符串是否是带小数的数字格式,可以是负数 输入： s：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isDecimal" : function(str) {
		if(str==""){
			return true;
		}
		if (isInteger(str))
			return true;
		var re = '/^[-]{0,1}(\d+)[\.]+(\d+)$/';
		if (re.test(str)) {
			if (RegExp.$1 == 0 && RegExp.$2 == 0)
				return false;
			return true;
		} else {
			return false;
		}
	},
	"isDecimalText":"请输入小数 \n 例如：-1.344,5.9939",
	
	/*
	 * 用途：检查输入字符串是否是非负数字格式,输入： s：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isDecimalNotNavigate" : function(str) {
		if(str==""){
			return true;
		}
		var regu = '^\\d+(\\.\\d+)?$';
//		var regu = '^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$';
		var re = new RegExp(regu);
		return re.test(str);
	},
	"isDecimalNotNavigateText":"请输入非负数 \n 例如：1.344,5.9939",

	/*
	 * 用途：检查输入对象的值是否符合端口号格式 输入：str 输入的字符串 返回：如果通过验证返回true,否则返回false
	 * 
	 */
	isPort : function(str) {
		if(str==""){
			return true;
		}
		return (str>0 && str < 65536);
	},

	/*
	 * 用途：检查输入对象的值是否符合E-Mail格式 输入：str 输入的字符串 返回：如果通过验证返回true,否则返回false
	 * 
	 */
	"isEmail" : function(str) {
		if(str==""){
			return true;
		}
		var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
		if (myReg.test(str))
			return true;
		return false;
	},
	"isEmailText":"请输入正确的邮件格式\n 例如：ningJing@163.com",

	/*
	 * 用途：检查输入字符串是否符合金额格式 格式定义为带小数的正数，小数点后最多三位 输入： s：字符串 返回：
	 * 如果通过验证返回true,否则返回false
	 * 
	 */
	"isMoney" : function(s) {
		if(s==""){
			return true;
		}
		var regu = "^[0-9]+[\.][0-9]{0,3}$";
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	},
	"isMoneyText":"只能输入带三位的小数\n 例如：223.777",
	
	/*
	*	用途：检查是否是oracle关键字
	*	add by zhangxy
	*   2010-10-19
	*/
	"isOracle_KeyWords":function(str){
		var keywords = "ACCESS ADD ALL ALTER AND ANY AS ASC AUDIT BETWEEN BY CHAR"+
							"CHECK CLUSTER COLUMN COMMENT COMPRESS CONNECT CREATE CURRENT"+
							"DATE DECIMAL DEFAULT DELETE DESC DISTINCT DROP ELSE EXCLUSIVE"+
							"EXISTS FILE FLOAT FOR FROM GRANT GROUP HAVING IDENTIFIED"+
							"IMMEDIATE IN INCREMENT INDEX INITIAL INSERT INTEGER INTERSECT"+
							"INTO IS LEVEL LIKE LOCK LONG MAXEXTENTS MINUS MLSLABEL MODE"+
							"MODIFY NOAUDIT NOCOMPRESS NOT NOWAIT NULL NUMBER OF OFFLINE ON"+
							"ONLINE OPTION OR ORDER PCTFREE PRIOR PRIVILEGES PUBLIC RAW"+
							"RENAME RESOURCE REVOKE ROW ROWID ROWNUM ROWS SELECT SESSION"+
							"SET SHARE SIZE SMALLINT START SUCCESSFUL SYNONYM SYSDATE TABLE"+
							"THEN TO TRIGGER UID UNION UNIQUE UPDATE USER VALIDATE VALUES"+
							"VARCHAR VARCHAR2 VIEW WHENEVER WHERE WITH";
		var ts = keywords.split(" ");
		for(var i=0;i<ts.length;i++ ){
				if(ts[i]==str.toUpperCase()){
					return  false;//已存在该字段
				}else{
				return true;
				}					
	}},
	"isOracle_KeyWordsText":"该字段一再列表中存在，请换个名再试",
	/*
	 * 用途：检查输入字符串是否只由英文字母和数字和下划线组成 输入： s：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isNumberOr_Letter" : function(s) {// 判断是否是数字或字母
		if(s==""){
			return true;
		}
		var regu = "^[0-9a-zA-Z\_]+$";
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	},
	"isNumberOr_LetterText":"只能输入英文字母、数字和下划线\n 例如：1213aads_73736jehwury",
	/*
	 * 用途：检查输入字符串是否只由英文字母和数字和下划线组成 输入： s：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isNumberOr_-Letter" : function(s) {// 判断是否是数字或字母
		if(s != ""){
			var regu = "^[0-9a-zA-Z\_\-]+$";
			var re = new RegExp(regu);
			if (re.test(s)) {
				return true;
			} else {
				return false;
			}
		}else{
				return true;
		}
	},
	"isNumberOr_-LetterText":"只能输入英文字母、数字,横线和下划线\n 例如：1213aads_737-36jehwury",
	/*
	 * 用途：检查输入字符串是否只由英文字母和数字和下划线组成 输入： s：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isNumberOr_Letter2" : function(s) {
		if(s==""){
			return true;
		}
		var regu = "^[0-9a-zA-Z\_\-]+$";
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	},
	"isNumberOr_Letter2rText":"只能输入英文字母、数字,横线和下划线\n 例如：1213aads_737-36jehwury",
	
	/*
	 * 用途：检查输入字符串是否只由英文字母和数字组成 输入： s：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isNumberOrLetter" : function(s) {// 判断是否是数字或字母
		if(s==""){
			return true;
		}
		var regu = "^[0-9a-zA-Z]+$";
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	},
	"isNumberOrLetterText":"只能输入英文字母和数字 \n 例如：1213aads",
	
	/*
	 * 用途：检查输入字符串是否只由英文字母和数字组成，或“/”组成，用于产品定义中的拼音码简称 输入： s：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isNumberOrLetterP" : function(s) {// 判断是否是数字或字母
		if(s==""){
			return true;
		}
		var regu = "^[//0-9a-zA-Z]+$";
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	},
	"isNumberOrLetterPText":"只能输入英文字母和数字及“/” \n 例如：1213/aads",
	
	/*
	 * 用途：检查输入字符串是否只由英文字母和数字或“/”组成，用于产品定义中的产品编码 输入： s：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isNumberOrLetterP" : function(s) {// 判断是否是数字或字母
		if(s==""){
			return true;
		}
		var regu = "^[//0-9a-zA-Z]+$";
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	},
	"isNumberOrLetterPText":"只能输入英文字母、数字及“/” \n 例如：1213/aads",
	
	/*
	 * 用途：检查输入字符串是否只由汉字、字母、数字组成 输入： value：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isChinaOrNumbOrLett" : function(s) {// 判断是否是汉字、字母、数字组成
		if(s==""){
			return true;
		}
		var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	},
	"isChinaOrNumbOrLettText":"只能输入汉字、字母和数字",
	/*
     *用途:只能输入汉字并且位数应少于50 addby zhangxinyu 2010-11-10
	 */
	 
	 "isChina":function(s){
	 var regu = "^[\u4E00-\u9FA5]{0,50}$";
	 var re = new RegExp(regu);
	 if(re.test(s)){
	 	return true;
	 }else{
	 	return false;
	 }
	 },
	 "isChinaText":"只能输入汉字并且长度应该小于50",
	
	/*
	 * 用途：检查输入字符串是否符合正整数格式 输入： s：字符串 返回： 如果通过验证返回true,否则返回false
	 * addby jk
	 */
	"isNumber" : function(s) {
		if(s==""){
			return true;
		}
		//var regu = "^[0-9]+$";//整数
		var regu=/^[0-9]*[1-9][0-9]*$/;//正整数的判断jk
		var re = new RegExp(regu);
		if (s.search(re) != -1) {
			return true;
		} else {
			return false;
		}
	},
	"isNumberText":"请输入正整数\n 例如：1,2,25", 
	/*
	 * 用途：检查输入字符串是否只由汉字、字母、数字、'-','_'组成 输入： value：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isChinaOrNumb_OrLett2" : function(s) {
		if(s==""){
			return true;
		}
		var regu = "^[0-9a-zA-Z\u4e00-\u9fa5\_\-]+$";
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	},
	"isChinaOrNumb_OrLett2Text":"只能输入汉字、字母、数字、下划线和横线\n 例如：你好_737-ehwury",
	
	/*
	 * 用途：检查输入字符串是否只由汉字、字母、数字、'-','_','/','\','*'组成 输入： value：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isChinaOrNumb_OrStarLett2" : function(s) {
		if(s==""){
			return true;
		}
		var regu = "^[\\0-9a-zA-Z\u4e00-\u9fa5\_\(-)*\-]+$";
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	},
	"isChinaOrNumb_OrStarLett2Text":"只能输入汉字、字母、数字、下划线、横线、斜线、反斜线、星号\n 例如：你好_737-eh/wu\ry*js",
	
	/*
	 * 用途：检查输入字符串是否只由汉字、字母、数字、'-','_'、'/'组成 输入： value：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */
	"isChinaOrNumb_OrLettOrLine2" : function(s) {
		if(s==""){
			return true;
		}
		var regu = "^[\\0-9a-zA-Z\u4e00-\u9fa5\_\-]+$";
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	},
	"isChinaOrNumb_OrLettOrLine2Text":"只能输入汉字、字母、数字、'%'、'_'、'-'、'/'",

	/*
	 * 用途：判断是否是日期 输入：date：日期；fmt：日期格式 返回：如果通过验证返回true,否则返回false
	 */
	"isDate" : function(date, fmt) {
		if(date==""){
			return true;
		}
		if (fmt == null)
			fmt = "yyyyMMdd";
		var yIndex = fmt.indexOf("yyyy");
		if (yIndex == -1)
			return false;
		var year = date.substring(yIndex, yIndex + 4);
		var mIndex = fmt.indexOf("MM");
		if (mIndex == -1)
			return false;
		var month = date.substring(mIndex, mIndex + 2);
		var dIndex = fmt.indexOf("dd");
		if (dIndex == -1)
			return false;
		var day = date.substring(dIndex, dIndex + 2);
		if (!isNumber(year) || year > "2100" || year < "1900")
			return false;
		if (!isNumber(month) || month > "12" || month < "01")
			return false;
		if (day > getMaxDay(year, month) || day < "01")
			return false;
		return true;
	},

	getMaxDay : function(year, month) {
		if (month == 4 || month == 6 || month == 9 || month == 11)
			return "30";
		if (month == 2)
			if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
				return "29";
			else
				return "28";
		return "31";
	},
	"isDateText":"输入的正确的日期格式\n 例如：2010-05-05 12:23:45",

	/*
	 * 用途：字符1是否以字符串2结束 输入：str1：字符串；str2：被包含的字符串 返回：如果通过验证返回true,否则返回false
	 * 
	 */
	"isLastMatch" : function(str1, str2) {
		var index = str1.lastIndexOf(str2);
		if (str1.length == index + str2.length)
			return true;
		return false;
	},
	"isLastMatchText":"前一个字符串只能以后一个字符串结束",

	/*
	 * 用途：字符1是否以字符串2开始 输入：str1：字符串；str2：被包含的字符串 返回：如果通过验证返回true,否则返回false
	 * 
	 */
	"isFirstMatch" : function(str1, str2) {
		var index = str1.indexOf(str2);
		if (index == 0)
			return true;
		return false;
	},
	"isFirstMatchText":"前一个字符串只能以后一个字符串开始",
	/*
	 * 用途：字符1是包含字符串2 输入：str1：字符串；str2：被包含的字符串 返回：如果通过验证返回true,否则返回false
	 * 
	 */
	"isMatch" : function(str1, str2) {
		var index = str1.indexOf(str2);
		if (index == -1)
			return false;
		return true;
	},
	"isMatchText":"前一个字符串要包含后一个字符串",



	
	//邮箱验证
	"mail" : function(_v) {
		if(_v==""){
			return true;
		}
        return '/^\w+@\w+\.\w+$/'.test(_v);
       },
       "mailText" : "请输入正确的email格式!\n例如:username@domain.com",//错误提示
       "mailMask" : '/[\w@.]/i',//这行是用户应该输入的值的格式，这行可以不写

	// 年龄
	"age" : function(_v) {
		if(_v==""){
			return true;
		}
		if ('/^\d+$/'.test(_v)) {
			var _age = parseInt(_v);
			if (_age < 200)
				return true;
		} else
			return false;
	},
	'ageText' : '年龄格式出错！！格式例如：20',
	'ageMask' : '/[0-9]/i',
	
	
	// 密码验证
	"repassword" : function(_v, field) {
		if (field.confirmTO) {
			var psw = Ext.get(field.confirmTO);
			return (_v == psw.getValue());
		}
		return true;
	},
	"repasswordText" : "密码输入不一致！！",
	"repasswordMask" : '/[a-z0-9]/i',
	
	
	// 邮政编码
	"postcode" : function(_v) {
		if(_v==""){
			return true;
		}
		return (/^[1-9]\d{5}$/.test(_v));
	},
	"postcodeText" : "该输入项目必须是邮政编码格式，例如：226001",
//	"postcodeMask" : '/[0-9]/i',

	// IP地址验证
	"ip" : function(_v) {
		return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
				.test(_v);

	},
	"ipText" : "该输入项目必须是IP地址格式，例如：222.192.42.12",
	"ipMask" : /[0-9\.]/i,
	
	// fax传真
	"fax" : function(_v) {
		if(_v==""){
			return true;
		}
		return (/(^\d{3}\-\d{7,8}$)|(^\d{4}\-\d{7,8}$)|(^\d{3}\d{7,8}$)|(^\d{4}\d{7,8}$)|(^\d{7,8}$)/
				.test(_v));
	},
	"faxText" : "该输入值必须是传真格式，例如：0513-89500414,051389500414,89500414",
	
	// 固定电话及小灵通
	"telephone" : function(_v) {
		if(_v==""){
			return true;
		}
		return (/(^\d{3}\-\d{7,8}$)|(^\d{4}\-\d{7,8}$)|(^\d{3}\d{7,8}$)|(^\d{4}\d{7,8}$)|(^\d{7,8}$)/
				.test(_v));
	},
	"telephoneText" : "该输入项目必须是电话号码格式，例如：0513-89500414,051389500414,89500414",
//	"telephoneMask" : '/[0-9\-]/i',
	
	
	// 手机
	"mobile" : function(_v) {
		if(_v==""){
			return true;
		}
		return (/^1[358][0-9]\d{8}$/.test(_v));
	},
	"mobileText" : "该输入项目必须是手机号码格式，例如：13485135075",
	//"mobileMask" : '/[0-9]/i',

	
	// 身份证
	"IDCard" : function(_v) {
		if(_v==""){
			return true;
		}
		// return /(^[0-9]{17}([0-9]|[Xx])$)|(^[0-9]{17}$)/.test(_v);
		var area = {
			11 : "北京",
			12 : "天津",
			13 : "河北",
			14 : "山西",
			15 : "内蒙古",
			21 : "辽宁",
			22 : "吉林",
			23 : "黑龙江",
			31 : "上海",
			32 : "江苏",
			33 : "浙江",
			34 : "安徽",
			35 : "福建",
			36 : "江西",
			37 : "山东",
			41 : "河南",
			42 : "湖北",
			43 : "湖南",
			44 : "广东",
			45 : "广西",
			46 : "海南",
			50 : "重庆",
			51 : "四川",
			52 : "贵州",
			53 : "云南",
			54 : "西藏",
			61 : "陕西",
			62 : "甘肃",
			63 : "青海",
			64 : "宁夏",
			65 : "新疆",
			71 : "台湾",
			81 : "香港",
			82 : "澳门",
			91 : "国外"
		}
		var Y, JYM;
		var S, M;
		var idcard_array = new Array();
		idcard_array = _v.split("");
		// 地区检验
		if (area[parseInt(_v.substr(0, 2))] == null) {
			this.IDCardText = "身份证号码地区非法!!,格式例如:32";
			return false;
		}
		// 身份号码位数及格式检验
		switch (_v.length) {
			case 15 :
				if ((parseInt(_v.substr(6, 2)) + 1900) % 4 == 0
						|| ((parseInt(_v.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(_v
								.substr(6, 2)) + 1900)
								% 4 == 0)) {
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
				} else {
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
				}
				if (ereg.test(_v))
					return true;
				else {
					this.IDCardText = "身份证号码出生日期超出范围,格式例如:19860817";
					return false;
				}
				break;
			case 18 :
				// 18位身份号码检测
				// 出生日期的合法性检查
				// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
				// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
				if (parseInt(_v.substr(6, 4)) % 4 == 0
						|| (parseInt(_v.substr(6, 4)) % 100 == 0 && parseInt(_v
								.substr(6, 4))
								% 4 == 0)) {
					ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
				} else {
					ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
				}
				if (ereg.test(_v)) {// 测试出生日期的合法性
					// 计算校验位
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10]))
							* 7
							+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
							* 9
							+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
							* 10
							+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
							* 5
							+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
							* 8
							+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
							* 4
							+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
							* 2
							+ parseInt(idcard_array[7])
							* 1
							+ parseInt(idcard_array[8])
							* 6
							+ parseInt(idcard_array[9]) * 3;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					M = JYM.substr(Y, 1);// 判断校验位
					// alert(idcard_array[17]);
					if (M == idcard_array[17]) {
						return true; // 检测ID的校验位
					} else {
						this.IDCardText = "身份证号码末位校验位校验出错,请注意x的大小写,格式例如:201X";
						return false;
					}
				} else {
					this.IDCardText = "身份证号码出生日期超出范围,格式例如:19860817";
					return false;
				}
				break;
			default :
				this.IDCardText = "身份证号码位数不对,应该为15位或是18位";
				return false;
				break;
		}
	},
//	"IDCardText" : "该输入项目必须是身份证号码格式，例如：32082919860817201x",
//	"IDCardMask" : '/[0-9xX]/i',
		//邮箱验证
	"mail" : function(_v) {
		if(_v==""){
			return true;
		}
        return /^\w+@\w+\.\w+$/.test(_v);
       },
       "mailText" : "请输入正确的email格式!\n例如:username@domain.com",//错误提示
       "mailMask" : /[\w@.]/i,//这行是用户应该输入的值的格式，这行可以不写
       
	"isNumberOrLetterAndSpace" : function(s) {// 判断是否是数字或字母
		if(s==""){
			return true;
		}
		var regu = "^[0-9a-zA-Z][0-9a-zA-Z ]*$";
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	},
	"isNumberOrLetterAndSpaceText":"只能输入英文字母和数字和空格 \n 例如：12 as 13 ds   ",
	
	/**
	 * @author wangxx
	 * 2010-12-15
	 * 控制不能输入'"','\''字符，因为拼接树的时候会出现解析错误
	 * @param {} str
	 * @return {Boolean}
	 */
	"isQuotationChineseMarks" : function(str) {
		var re = new RegExp(/[\u4e00-\u9fa5]|\'|\"/);
		if (re.test(str)) {
			return false;
		} else {
			return true;
		}
	},
	"isQuotationChineseMarksText" : "输入的内容含有特殊字符英文单引号(')或者英文双引号(\")或者中文汉字",
	//验证url add by zhagnxinyu 2010-11-16
	"isUrl" : function(_v) {
		  /*  var strregex = "^((https|http|ftp|rtsp|mms)?://)"   
                    + "?(([0-9a-za-z_!~*'().&=+$%-]+: )?[0-9a-za-z_!~*'().&=+$%-]+@)?" //ftp的user@  
                    + "(([0-9]{1,3}.){3}[0-9]{1,3}" // ip形式的url- 199.194.52.184  
                    + "|" // 允许ip和domain（域名）  
                    + "([0-9a-za-z_!~*'()-]+.)*" // 域名- www.  
                    + "([0-9a-za-z][0-9a-za-z-]{0,61})?[0-9a-za-z]." // 二级域名  
                    + "[a-za-z]{2,6})" // first level domain- .com or .museum  
                    + "(:[0-9]{1,4})?" // 端口- :80  
                    + "((/?)|"   
                    + "(/[0-9a-za-z_!~*'().;?:@&=+$,%#-]+)+/?)$";  */
	    var re=new RegExp(/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/);  
	    return re.test(_v);   
	},
	"isUrlText" : "该输入项目必须是url地址格式,例如http://localhost:8002"
});

// 以正则表达式的方式对数据有效性进行校验
Ext.ns('RegularExpression');
/**
 * @see 正则表达式中以数组的形式进行配置，第一个元素为正则表达式，第二个为错误提示信息，
 *          分别以regex和regexText属性进行配置，如：
 *        	  regex : RegularExpression.noMark[0]
 *			  regexText : RegularExpression.noMark[1]。
 *           如果需要通过多个正则表达式进行有效性校验，可通过validator方法，使用正则表达式的test方法依次进行判断。
 * @author gaojun
 */
RegularExpression = {
	// 不允许输入标点符号
	noMark : [/^\w*$/,'请输入非符号字符','请输入英文字母或数字']  
};

