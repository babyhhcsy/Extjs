/*
 * ˵����
 * 
 * �˽ű����ڷ�ҳ���뽫���ô˽ű��� script ��ǩ�������� script ��ǩ�ĺ��棬
 * 
 * Ӧ����֪��
 * 
 * ���ô˽ű��� HTML ҳ��� DOCTYPE ������� XHTML 1.0��
 * 
 * ��������Ҫ��ӡ�����ݲ�ֳ���С��ӡ��(���ڵ��������໥������������)��
 * 
 * ��ӡ������²���������Ϊ0mm(�������)��
 * 
 * ��Ҫ���µ�һҳ��ʼ��ӡ�Ŀ飬����� page='page' ���ԣ�
 * 
 * ������Ҫ�ظ���ʾ�ı������Ŀ�ı������ pagetitle='pagetitle'����ʽ�в��Ҳ��ܰ���height���ԣ�
 * 
 * ���ı�ͷ������� thead ���У���β������� tfoot ���У������ж�� tbody �飬
 * 
 * ��ͷ�ͱ�βÿһ�еĿ�ȱ�����ȷ������������ܻ�������޷����������
 * 
 * ���ɲ�ֵı�����ڴ˱��� table ��ǩ����� block='block' ���ԣ�
 * 
 * �붨�� _config_ ����(JSON)��������ӡֽ�ŵĸ߶ȣ���λ����(mm)��Ĭ����Aֽ��(��297mm)�����±߾�(���ӡ������ͬ),Ĭ����19.1mm��
 * 
 * ���Ʊ���ʱ���������ľ����ȣ���Ҫ�ðٷֱȣ������� <= ����ȡ��(ֽ�ſ�� - ���ұ߾�)����λ������(mm)��
 * 
 * �ű����ṩ������������print(��ӡ)��printSetting(��ӡ���ã�ֻ��IE������)��
 * 
 */

/*
 * ֽ������
 * ��λ������(mm)
 * ��������['��', '��']
 * 
 */
var PageSize = {
	A0 : [840, 1188],
	A1 : [594, 839],
	A2 : [420, 594],
	A3 : [297, 420],
	A4 : [210, 297],
	A5 : [148, 210],
	A6 : [105, 149],
	A7 : [74, 105],
	A8 : [52, 74],
	A9 : [37, 52],
	A10 : [26, 37],
	B0 : [1000, 1414],
	B1 : [707, 1000],
	B2 : [500, 707],
	B3 : [353, 500],
	B4 : [250, 354],
	B5 : [182, 257],
	LETTER : [216, 279],
	NOTE : [191, 254],
	LEGAL : [216, 356],
	LEDGER : [279, 432],
	get : function(key) {
		return this[key.toUpperCase()];
	}
};

if(!_config_) {
	var _config_ = {
		pageSize	: "A4",
		orientation	: "P", // p = "Portrait"(����) L = "Landscape"(����)
		top			: 20,
		right		: 20,
		bottom		: 20,
		left		: 20
	};
}

(function() {
	var size = PageSize.get(_config_["pageSize"]);
	if(!size) {
		alert("ֽ������ '" + _config_["pageSize"] + "' �����ڣ�");
		return;
	}
	if(_config_["orientation"].toUpperCase() == "L") {
		size[0] = size[0] + size[1];
		size[1] = size[0] - size[1];
		size[0] = size[0] - size[1];
	}
	
	var	PAGE_WIDTH = Math.floor(size[0] - _config_["left"] - _config_["right"] - 1);
	var PAGE_HEIGHT = Math.floor(size[1] - _config_["top"] - _config_["bottom"] - 1);
	var	PAGINATION_HEIGHT = 5;
	
	var pagination = (typeof _config_["pagination"] == "undefined" || typeof _config_["pagination"] != "boolean") ? true : _config_["pagination"]; 
	
	var	CONTENT_HEIGHT = PAGE_HEIGHT - (pagination ? PAGINATION_HEIGHT : 0);
	
	var frag, page, content, height = 0, total = 0, paginations = [], title = null, group = null, absElems = [];
	
	function comp(h) { return Math.ceil(h / 3.78) > CONTENT_HEIGHT - height; }

	function isIE() { return navigator.userAgent.indexOf("MSIE") > -1; }

	function append(p, c, h) {
		p.appendChild(c);
		if(h) height += Math.ceil(h / 3.78);
	};
	
	function getCurrentStyle(elem, prt) {
		if(isIE()) {
			return elem.currentStyle[prt];
		} else {
			return document.defaultView.getComputedStyle(elem, "").getPropertyValue(prt);
		}
	}
	
	function getNewPage() {
		return (function() {
			page = this;
			append(frag, this);
			this.className = ++total == 1 ? "framework" : "framework spliter";
			if(isIE()) {
				this.style.marginTop = _config_["top"] + "mm";
			} else {
				this.style.paddingTop = _config_["top"] + "mm";
			}
			this.style.width = PAGE_WIDTH + "mm";
			this.style.height = PAGE_HEIGHT + "mm";
			append(this, getContent());
			if(pagination) append(this, getPagination());
			return this;
		}).call(document.createElement("div"));
	}
	
	function getContent() {
		return (function() {
			content = this;
			this.className = "content";
			this.style.width = PAGE_WIDTH + "mm";
			this.style.height = CONTENT_HEIGHT + "mm";
			height = 0;
			if(title) {
				append(content, title.cloneNode(true), title.offsetHeight);
			}
			return this;
		}).call(document.createElement("div"));
	}
	
	function getPagination() {
		return (function() {
			paginations.push(this);
			this.className = "pagination";
			this.style.width = PAGE_WIDTH + "mm";
			return this;
		}).call(document.createElement("div"));
	}
	
	function init() {
		var c = document.body.firstChild;
		while(c) {
			if(c.nodeType == 1 && c.getAttribute('pagetitle')) {
				title = c;
				title.className = title.className ? title.className + " title" : "title";
				break;
			}
			c = c.nextSibling;
		}
		frag = document.createDocumentFragment();
		getNewPage();
	};
	
	function resetPage() {
		if(document.body.innerHTML.replace(/^[\s]*$/g,"") == "") return;
		
		init();
		
		var v = document.body.firstChild;
		while(v) { // ѭ������ body Ԫ�ص��ӽڵ�
			if(v.nodeType != 1) { //�����ΪԪ�ؽڵ��� continue
				v = v.nextSibling;
				continue;
			}
			if (!v.offsetHeight) v.style.overflow = "hidden"; // �������
			
			if(getCurrentStyle(v, "position") == "absolute") { // �޳����Զ�λ��Ԫ��
				absElems.push(v.cloneNode(true));
				v = v.nextSibling;
				continue;
			}
			
			if(v.nodeName != "TABLE") { // �� TABLE �ڵ�
				// ���ڵ���� page ���ԣ����� height ������0( title Ϊ null)���߱���ĸ߶�( title ��Ϊ null )ʱ������ҳ��
				// ���ڵ����ݳ�����ǰҳ��ʱ������ҳ��
				if((v.getAttribute("page") && height != (title ? title.offsetHeight : 0) ) ||
					comp(v.offsetHeight)) {
					getNewPage();
				}
				if(v.getAttribute("pagetitle")) { // ���ڵ���� pagetitle ����ʱ continue
					if(title != v) {
						title = v;
						title.className = title.className ? title.className + " title" : "title";
						getNewPage();
					}
					v = v.nextSibling;
					continue;
				}
				if(v.getAttribute("group")) { // ���ڵ���� group ����ʱ continue
					group = v;
					group.className = group.className ? group.className + " group" : "group";
					v = v.nextSibling;
					continue;
				}
				append(content, v.cloneNode(true), v.offsetHeight); // ���ڵ���ӵ���ǰҳ����
			} else { // TABLE �ڵ�
				if(v.getAttribute("block")) { // table ���� block ����
					if(group) {
						if(comp(group.offsetHeight)) { // ����������ݳ�����ǰҳ������ʱ������ҳ��
							getNewPage();
						}
						append(content, group.cloneNode(true), group.offsetHeight);
					}
					if(comp(v.offsetHeight)) { // ����ڵ����ݳ�����ǰҳ��ʱ������ҳ��
						getNewPage();
					}
					append(content, v.cloneNode(true), v.offsetHeight); // ���ڵ�������ӵ���ǰҳ�浱��
				} else { // ������ block ���Ե� table �ڵ㣬���ɲ�ֵ� table
					// �����������ݼ��� table �����ݳ�����ǰҳ������ʱ
					if(comp((group ? group.offsetHeight : 0) + v.offsetHeight)) {
						var th = v.getElementsByTagName("thead")[0];
						var tbs = v.getElementsByTagName("tbody");
						var tf = v.getElementsByTagName("tfoot")[0];
						
						var elems = [];
						for(var k = 0; k < tbs.length; k++) {
							if(tbs[k].parentElement != v) {
								continue;
							}
							if (tbs[k].getAttribute("block")) {
								elems.push(tbs[k]);
							} else {
								var rs = tbs[k].rows;
								for(var ka = 0; ka < rs.length; ka++)
									elems.push(rs[ka]);
							}
						}
						
						var tab, tbody;
						for(var k = 0; k < elems.length; k++) {
							if(!tab) {
								tab = v.cloneNode(false);
								if(comp((group ? group.offsetHeight : 0) + (th ? th.offsetHeight : 0)+ elems[k].offsetHeight)) getNewPage();
								if(group) append(content, group.cloneNode(true), group.offsetHeight);
								if(th) append(tab, th.cloneNode(true), th.offsetHeight);
							}
							if(!tbody) tbody = document.createElement("tbody");
							if (comp(elems[k].offsetHeight)) {
								if(tbody.childNodes.length != 0) append(tab, tbody, th.offsetHeight);
								append(content, tab);
								tab = tbody = null;
								getNewPage();
								if(elems[k].nodeName == "TR") {
									var cs = elems[k].cells;
									for(var l = 0; l < cs.length; l++) {
										if(cs[l].getAttribute('hidevalue')) cs[l].innerHTML = cs[l].getAttribute("hidevalue");
									}
								}
								
								k--;
							} else {
								if(elems[k].nodeName == "TR") { //
									append(tbody, elems[k].cloneNode(true), elems[k].offsetHeight);
								} else {
									if(tbody.childNodes.length != 0) append(tab, tbody, th.offsetHeight);
									append(tab, elems[k], elems[k].offsetHeight);
									tbody = null;
								}
							}
						}
						elems = null;
						
						if(tab && tbody) {
							append(tab, tbody);
							tbody = null;
						}
						
						var flag = true;
						if(tab && tf && !comp(tf.offsetHeight)) {
							append(tab, tf.cloneNode(true), tf.offsetHeight);
							flag = false;
						}

						append(content, tab);
						tab = null;
						
						if(tf && flag) {
							getNewPage();
							var o = v.cloneNode(false);
							append(o, tf.cloneNode(true), tf.offsetHeight);
							append(content, o);
							o = null;
						}
						
						th = tbs = tf = null;
					} else {
						if(group) {
							append(content, group.cloneNode(true), group.offsetHeight);
						}
						append(content, v.cloneNode(true), v.offsetHeight);
					}
				}
			}
			group = null;
			v = v.nextSibling;
		}
		
		for(var k = 0; k < paginations.length; k++) {
			paginations[k].innerHTML = "��&nbsp;&nbsp;" + (k + 1) + "&nbsp;&nbsp;ҳ&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;&nbsp;" + total+ "&nbsp;&nbsp;ҳ";
		}
		
		if(isIE()) {
			document.body.innerHTML = '<object classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" id="webBrowser" name="webBrowser" height="0" width="0">';
			window.printSetting = function() { webBrowser.ExecWB(8,1); };
		} else
			document.body.innerHTML = '';
		
		append(document.body, frag);
		
		if(absElems.length) {
			for(var i = 0; i < absElems.length; i++) {
				append(document.body, absElems[i]);
			}
		}
		
		page = content = title = paginations = frag = absElems = null;
	}
	
	window._print_ = window.print;
	window.print = function() {
		if(navigator.userAgent.indexOf('MSIE') != -1)
			window.document.execCommand("Print", true);
		else
			window._print_();
	}
	
	if(document.all) window.attachEvent("onload", resetPage)
	else window.addEventListener("load", resetPage, false);
})();