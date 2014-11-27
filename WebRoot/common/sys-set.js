//// 屏蔽鼠标右键
//window.document.oncontextmenu = function() {
//	var eventOrigin = window.event.srcElement;
//	var reg = /^(input|textarea)$/i, regType = /^(text|textarea|password)$/i;
//	if (!reg.test(eventOrigin.nodeName) && !regType.test(eventOrigin.type)){
//		event.returnValue = false;
//	}
//}
//
//// 屏蔽F1帮助
//window.onhelp = function() {
//	return false
//}
//
//document.documentElement.onkeydown = function(evt) {
//	var b = !!evt, oEvent = evt || window.event;
//	if (oEvent.keyCode == 8) {
//		var node = b ? oEvent.target : oEvent.srcElement;
//		var reg = /^(input|textarea)$/i, regType = /^(text|textarea|password)$/i;
//		if (!reg.test(node.nodeName) || !regType.test(node.type)
//				|| node.readOnly || node.disabled) {
//			if (b) {
//				oEvent.stopPropagation();
//			} else {
//				oEvent.cancelBubble = true;
//				oEvent.keyCode = 0;
//				oEvent.returnValue = false;
//			}
//		}
//	}
//}
//
//window.document.onkeydown = function() {
//	// 屏蔽 Alt+ 方向键 ←→
//	if ((event.altKey) && ((event.keyCode == 37) || (event.keyCode == 39))) {
//		event.returnValue = false;
//	}
//	// 屏蔽F11
//	if (event.keyCode == 122) {
//		event.keyCode = 0;
//		event.returnValue = false;
//	}
//	// 屏蔽退格删除键
//	var dd = event.srcElement.tagName;
//	var ad = event.srcElement.readOnly;
//	if (event.keyCode == 8) {
//		if (event.srcElement.tagName == 'BODY'
//				|| event.srcElement.tagName == 'DIV') {
//			event.keyCode = 0;
//			event.returnValue = false;
//		}
//	}
//
//	if ((event.keyCode == 116) || // 屏蔽 F5 刷新键
////			(event.keyCode == 117) || // 屏蔽 F6,F5同时按 刷新键
//			(event.ctrlKey && event.keyCode == 82)) { // Ctrl + R
//		event.keyCode = 0;
//		event.returnValue = false;
//	}
//	if (event.ctrlKey && event.keyCode == 78) {
//		event.returnValue = false; // 屏蔽 Ctrl+n
//	}
//	if (event.shiftKey && event.keyCode == 121) {
//		event.returnValue = false; // 屏蔽 shift+F10
//	}
//	if (event.srcElement.tagName == "A" && event.shiftKey) {
//		event.returnValue = false; // 屏蔽 shift 加鼠标左键新开一网页
//	}
//}