/**
 * List 类型;
 * 此模型并非简单仿照java等LinkedList模型开发;因此,在使用前需了解其被设计的特性和查看各方法的用途和参数说明;
 * 此结构的大部分功能可以使用Array实现;
 * 其具备不同于Array的特性:
 * 可以比较方便地在任意位置插入/移除元素;打破了Array线性存储数据不便任意插入/移除元素的局限;
 * 同时该模型的索引是可变的,这是因为提供了任意插入/移除的特性,导致索引是可变的;
 * 因而不能像Array那样通过确定的索引始终找到确定的值;这迫使使用者关心索引的设计是其不足之处;
 */

/**
 * 引入EAI顶层包,存放公共类和方法和全部子包
 */
Ext.namespace('EAI');

/**
 * @description Js List节点实体;
 * @params {key : value} -config;
 * @function destroy() -注销该节点;
 */
EAI.ListNode = function(config){
	this.data = config.data;
	this.next = config.next;
	this.previous = config.previous;
	this.destroy = function(){
		this.data = null;
		this.previous = null;
		this.next = null;
	}
}

/**
 * @description -List 模型;
 * @function String getId -获取List的id;
 * @function int size -获取List中元素的数目;
 * @function String isEmpty -判断List是否为空;
 * @function boolean add -指定对象添加到List的末尾,成为最后一个节点;
 * @function boolean addAll -将数组中的数据依次追加到List末尾;
 * @function boolean concat -将参EAI.List list中的数据依次追加到List末尾;
 * @function boolean remove -删除指定key的元素;
 * @function boolean removeByValue -移除指定值的元素;
 * @function boolean insert -在指定索引处插入数据data;若index不合法的,直接返回false;若合法,则在指定索引处插入数据data;
 * @function boolean set -设置指定索引的节点的值;
 * @function Object/null get -获取参数index索引处的值;若index不合法的,直接返回null;若合法,则返回该索引所在的节点的值;
 * @function Array getValueArray -获取所有元素的值,(主要用于遍历显示list);
 * @function boolean removeAll -移除所有元素;
 * @function Boolean removeRange -移除指定范围内的节点(包括start,end在内);假如start和end不合法则返回false;
 * @function int indexOf -获取顺序第一次匹配value的索引,(在第一次匹配成功后立即返回,若不存在该值则返回-1);
 * @function int lastIndexOf -获取最后一次匹配value的索引,(若不存在该值则返回-1);
 * @function Boolean hasValue -检查是否存在该值;
 * @notice -值可以为null/undefined 这两种被认为是不同的空对象;
 * @time 2011-01-16;
 * @author SAM;
 */
EAI.List = function(){
	var ME = this;
	/**
	 * list的id -应该写个js的id生成器,目前的写法在短时间内大规模实例化List可能会冲突,不过一般并不需要其id;
	 */
	var id = 'list_'+Date.parse(new Date())+'_'+Math.round(Math.random(0-1)*100);
	/**
	 * list中元素的数目;
	 */
	var length = 0;
	/**
	 * 链表头部节点;
	 */
	var headNode = new EAI.ListNode({data : id+'_链表头部', next : null, previous : null});
	/**
	 * 链表指针;(不可提供外部使用,next始终指向最后一个节点或者头结点,previous指向倒数第二个节点或头结点);
	 */
	var p = new EAI.ListNode({data : id+'_指针', next : headNode, previous : headNode});
	/**
	 * @description -验证index的合法性; index只能正整数(字符串可以转化也可以), 缺省会被赋予具体的值;
	 */
	var indexValid = function(index){
		return (/^\d+$/.test(''+index)); // 只有数值和字符串才能匹配 /^\d+$/.test(''+index)
	}
	/**
	 * @description -验证是否为空;
	 * @params Object|基本类型 value -目标对象;
	 * @return 空则true,否则false;
	 */
	var objectEmpty = function(value){
		return value === null || value === undefined;
	}
	/**
	 * @description -在链的尾部添加一个节点;
	 * @params EAI.ListNode node -要插入的节点;
	 * @return Boolean; -true表示成功;
	 */
	var addNode = function(node){
		p.previous = p.next;
		p.next.next = node;
		node.previous = p.next;
		p.next = node;
		node.next = null;
		length++;
		return true;
	}
	/**
	 * @description -查找index索引所在的节点;返回从头部遍历节点链index次所指定的节点(若index>=length则返回null);
	 * 被认为只要索引是合法的(0~length-1)都能得到合法的节点;
	 * @params int/String index -索引;
	 * @return EAI.ListNode node -索引所指向的节点,或null;
	 */ 
	var findByIndex = function(index){
		var tp = new EAI.ListNode({next : headNode.next, previous : headNode});
		while(index-- > 0){
			tp.next = tp.next.next;
		}
		return tp.next;
	}
	/**
	 * @description -移除指定节点;
	 * @params -EAI.ListNode node -要移除的节点;
	 * @returns -Boolean 成功返回true,否则false;
	 */
	var removeNode = function(node){
		if(node){
			if(node.next){
				node.next.previous = node.previous;
				if(p.previous == node){
					p.previous = node.previous;
				}
			}else {
				p.next = node.previous;
				if(node.previous != headNode){
					p.previous = p.previous.previous;
				}
			}
			node.previous.next = node.next;
			node.destroy();
			length--;
			return true;
		}else {
			return false;
		}
	}
	/**
	 * @description -移除链的尾部节点;
	 * 和缺省的remove()效果一致;性能略好;
	 * @returns boolean 移除成功返回true;
	 */
	var removeTail = function(){
		if(length <= 0){
			return true;
		}
		p.next.previous = null;
		p.previous.next = null;
		p.next.destroy();
		p.next = p.previous;
		if(p.previous != headNode){
			p.previous = p.previous.previous;
		}
		length--;
		return true;
	}
	/**
	 * @description -删除数组参数arr中的节点;
	 * @params -Array arr -要删除的节点的数组;
	 */
	var removeByArray = function(arr){
		for(var i=0;i<arr.length;i++){
			removeNode(arr[i]);
		}
	}
	/**
	 * return String id -List的id;
	 */
	this.getId = function(){
		return id;
	}
	/**
	 * @description -获取List中元素的数目;
	 * @return -int length-List中元素的数目;
	 */
	this.size = function(){
		return length;
	}
	/**
	 * @description -判断List是否为空;
	 * @returns -boolean -为空则返回true,否则false;
	 */
	this.isEmpty = function(){
		return length==0 ? true : false;
	}
	/**
	 * @description -指定对象添加到List的末尾,成为最后一个节点;
	 * @param -Object data -值;
	 * @return boolean -成功返回true,否则false;
	 */
	this.add = function(data){
		return addNode(new EAI.ListNode({data : data}));
	}
	/**
	 * @description -将数组中的数据依次追加到List末尾;
	 * @param -Array arr -要追加的数据数组;
	 * @return boolean -成功返回true,否则false;
	 */
	this.addAll = function(arr){
		if(objectEmpty(arr) || !(arr instanceof Array)){
			return false;
		}
		for(var i=0; i<arr.length; i++){
			addNode(new EAI.ListNode({data : arr[i]}));
		}
		return true;
	}
	/**
	 * @description -将参EAI.List list中的数据依次追加到List末尾;
	 * @param -EAI.List list -要参与连接的EAI.List;
	 * @return boolean -成功返回true,否则false;
	 */
	this.concat = function(list){
		var flag = list instanceof EAI.List;
		if(objectEmpty(list) || !(flag)){
			return false;
		}
		for(var i=0;i<list.size();i++){
			addNode(new EAI.ListNode({data : list.get(i)}));
		}
		return true;
	}
	/**
	 * @description -删除指定key的元素;
	 * @param String index -要移除元素的键;缺省index = length-1,表示移除最后一个;
	 * @return boolean -若index是合法的,则删除该index对应节点,并返回true;否则直接返回false;
	 */
	this.remove = function(index){
		if(objectEmpty(index)){ // 缺省,index指向链末尾;
			return removeTail();
		}
		if(!indexValid(index)){
			return false;
		}
		index = parseInt(index,10);
		if(index >= length){
			return false;
		}
		var node = findByIndex(index);
		return removeNode(node);
	}
	/**
	 * @description -移除指定值的元素;
	 * @param Object value -要移除元素的值;
	 * @param boolean all 是移除全部还是只移除第一次匹配,缺省false,表示只移除第一次匹配;
	 * @return boolean -若成功返回true,否则返回false;
	 */
	this.removeByValue = function(value,all){
		var tp = new EAI.ListNode({next : headNode.next, previous : headNode});
		while(tp.next){
			if(tp.next.data === value){
				var n = tp.next;
				tp.next = tp.next.next;
				removeNode(n);
				if(!all){
					return true;
				}
			}else {
				tp.next = tp.next.next;
			}
		}
		return true;
	}
	/**
	 * @description -在指定索引处插入数据data;若index不合法的,直接返回false;若合法,则在指定索引处插入数据data;
	 * @params Object data -插入元素的值,可以为任意类型;
	 * @params int/String index -插入元素的index,缺省,index(index = size())指向链末尾;
	 * @return boolean -是否插入成功;
	 */
	this.insert = function(data,index){
		if(objectEmpty(index)){ // 缺省,index指向链末尾;
			return addNode(new EAI.ListNode({data : data}));
		}
		if(!indexValid(index)){
			return false;
		}
		index = parseInt(index,10); // 字符串或正整数转化成整数;
		// 合法的插入索引(0~length);
		if(index > length){
			return false;
		}
		var n = new EAI.ListNode({data : data});
		if(index == length){ // 末尾插入节点; 
			addNode(n);
		}else{ // 非末尾位置;
			var node = findByIndex(index);
			if(p.next == node){ // length - 1;
				p.previous = n;
			}
			n.next = node;
			n.previous = node.previous;
			node.previous.next = n;
			node.previous = n;
			length++;
		}
		return true;
	}
	
	/**
	 * @description -设置指定索引的节点的值;
	 * @param String index -索引;
	 * @return boolean -成功true,否则false;
	 */
	this.set = function(data,index){
		if(objectEmpty(index)){ // 缺省,设置链末尾节点;
			index = length-1;
		}
		if(!indexValid(index)){
			return false;
		}
		index = parseInt(index,10);
		// 合法的插入索引(0~length-1);
		if(index >= length){
			return false;
		}
		var n = new EAI.ListNode({data : data});
		if(index == length-1){
			p.next.data = data;
			return true;
		}else{ // 非末尾位置;
			var node = findByIndex(index);
			node.data = data;
		}
		return true;
	}
	/**
	 * @description -获取参数index索引处的值;若index不合法的,直接返回null;若合法,则返回该索引所在的节点的值;
	 * @param int/String index -索引;
	 * @return Object/null -值;
	 */
	this.get = function(index){
		if(objectEmpty(index) || !indexValid(index)){
			return null;
		}
		index = parseInt(index,10);
		if(index >= length){
			return false;
		}
		var node = findByIndex(index);
		return node.data;
	}
	/**
	 * @deprecated -获取所有元素的值,(主要用于遍历显示list);
	 * @return Array -所有元素的值;
	 * @tips 遍历list 还可以eg: for(var i=0;i<list.size();i++){list.get(i);}
	 */
	this.getValueArray = function(){
		var arr = new Array();
		var tp = new EAI.ListNode({next : headNode.next, previous : headNode});
		while(tp.next){
			arr.push(tp.next.data);
			tp.next = tp.next.next;
		}
		return arr;
	}
	/**
	 * @description -移除所有元素;
	 * @return boolean 成功true,否则false; 
	 */
	this.removeAll = function(){
		while(!this.isEmpty()){
			removeTail();
		}
		return true;
	}
	/**
	 * @description -移除指定范围内的节点(包括start,end在内);假如start和end不合法则返回false;
	 * @param int/String start -起始节点,缺省,start指向链第一个元素;
	 * @param int/String end -终止节点,缺省,end指向链最后一个元素;
	 * @return Boolean 成功true,否则false;
	 */
	this.removeRange = function(start,end){
		if(objectEmpty(start)){ // 缺省,start指向链第一个元素;
			start = 0;
		}
		if(objectEmpty(end)){ // 缺省,end指向链最后一个元素;
			end = length-1;
		}
		if(!indexValid(start) || !indexValid(end)){ // 索引不合法; 返回移除失败;
			return false;
		}
		start = parseInt(start,10);
		end = parseInt(end,10);
		if(start >= length || end >= length || start > end){
			return false;
		}
		if(start == end){ // 只需移除一个;
			return this.remove(start);
		}else{
			var stNode = findByIndex(start);
			var tp = new EAI.ListNode({next : stNode.next, previous : stNode});
			var index = start;
			while(index++ <= end){
				removeNode(tp.previous);
				tp.previous = tp.next;
				if(tp.next){
					tp.next = tp.next.next;
				}
			}
		}
		return true;
	}
	/**
	 * @description -获取顺序第一次匹配value的索引,(在第一次匹配成功后立即返回,若不存在该值则返回-1);
	 * @param String value -值;
	 * @return int -存在返回第一次匹配的索引,否则返回-1;
	 */
	this.indexOf = function(value){
		var tp = new EAI.ListNode({next : headNode.next, previous : headNode});
		var index = 0;
		while(tp.next){
			if(tp.next.data === value){
				return index;
			}else{
				tp.next = tp.next.next;
				index++;
			}
		}
		return -1;
	}
	/**
	 * @description -获取最后一次匹配value的索引,(若不存在该值则返回-1);
	 * @param String value -值;
	 * @return int -存在返回最后一次匹配的索引,否则返回-1;
	 */
	this.lastIndexOf = function(value){
		var tp = new EAI.ListNode({next : p.next, previous : p.previous});
		var index = length -1;
		while(index >= 0){
			if(tp.next.data === value){
				return index;
			}else{
				tp.next = tp.previous;
				tp.previous = tp.previous.previous;
				index--;
			}
		}
		return -1;
	}
	/**
	 * @description -检查是否存在该值;
	 * @param String value -值;
	 * @return Boolean -存在返回true,否则false;
	 */
	this.hasValue = function(value){
		var tp = new EAI.ListNode({next : headNode.next, previous : headNode});
		while(tp.next){
			if(tp.next.data === value){
				return true;
			}else{
				tp.next = tp.next.next;
			}
		}
		return false;
	}
}