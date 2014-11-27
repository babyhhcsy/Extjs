package com.xunCloud.util;

/**
 * 关于字符串的一些公用方法类
 * @date 2011-09-15
 * @author wangxx
 */
public class StringUtils {

	/**
	 * 将字符串补数,将sourString的前面用cChar补足cLen长度的字符串,如果字符串超长，则不做处理
	 * @date 2011-09-15
	 * @author wangxx
	 * @param sourString 源字符串
	 * @param cChar 补数用的字符
	 * @param cLen 字符串的目标长度
	 * @return 字符串
	 */
	public static String toLengthString(final String sourString, final String cChar,
			final int cLen) {
		int tLen = sourString.length();
		StringBuffer tReturn = new StringBuffer(cLen);
		if (tLen >= cLen) {
			tReturn.append(sourString);
		} else {
			int iMax = cLen - tLen;
			for (int i = 0; i < iMax; i++) {
				tReturn.append(cChar);
			}
			tReturn.append(sourString);
		}
		return tReturn.toString();
	}


	/**
	 * 取字符串,sourString为空，或者长度小于subLen原样返回，否则截取subLen长
	 * @param sourString 源字符串
	 * @param subLen 取字符串长度
	 * @return 字符串
	 */
	public static String toSubString(final String sourString,final int subLen) {
		if (sourString == null || sourString.equals("")) {
			return sourString;
		}
		if (subLen > sourString.length()) {
			return sourString;
		}
		return sourString.substring(0, subLen);
	}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
