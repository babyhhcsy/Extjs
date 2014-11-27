package com.xunCloud.util;
/**
 * @createDate  2012-06-08
 * @author jk
 * 替换字符中的特殊字符
 */
public class CharacterConvert {
	public static String string2Json(String s) { 
	    StringBuilder sb = new StringBuilder(s.length()+20); 
	    sb.append('\"'); 
	    for (int i=0; i<s.length(); i++) { 
	        char c = s.charAt(i); 
	        switch (c) { 
	        case '\"': 
	            sb.append("\\\""); 
	            break; 
	        case '\\': 
	            sb.append("\\\\"); 
	            break; 
	        case '/': 
	            sb.append("\\/"); 
	            break; 
	        case '\b': 
	            sb.append("\\b"); 
	            break; 
	        case '\f': 
	            sb.append("\\f"); 
	            break; 
	        case '\n': 
	            sb.append("\\n"); 
	            break; 
	        case '\r': 
	            sb.append("\\r"); 
	            break; 
	        case '\t': 
	            sb.append("\\t"); 
	            break; 
	        default: 
	            sb.append(c); 
	        } 
	    } 
	    sb.append('\"'); 
	    return sb.toString(); 
	} 

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("'''"+'"'+string2Json("''afasdf''\"\";dsaf"));
	}

}
