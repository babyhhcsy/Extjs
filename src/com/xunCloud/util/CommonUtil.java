package com.xunCloud.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.joda.time.DateTime;


/**
 * 普通工具类：
 * @author  HJM
 * @createDate 2011-9-7
 */
public class CommonUtil {
//	/**
//	 * 去掉list中重复记录
//	 * @param list
//	 * @return
//	 */
//	public static List<String> removeDuplicateWithOrder(List<String> list) {
//		Set<String> set = new HashSet<String>();
//		List<String> newList = new ArrayList<String>();
//		for(Iterator<String> iter = list.iterator(); iter.hasNext();) {
//			String element = iter.next();
//			if (set.add(element))
//				newList.add(element);
//		}
//		list.clear();
//		list.addAll(newList);
//		return list;
//	}
	/**
	 * 获取指定长度的随机数
	 * 
	 * @param len
	 *            指定的长度
	 * @return
	 */
	public static String genRandomNumString(int len) {
		int no = 0;
		char[] t = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
		String str = "";
		Random r = new Random();
		synchronized (r) {
			no++;
		}
		for (int i = 0; i < len; i++) {
			str += t[(r.nextInt(32) + no) % t.length];
		}
		return str;
		
	}
	/**
	 * str2int
	 * @param str
	 * @return
	 */
	public static Integer str2int(String str) {
		if (str == null || str.trim().equals("")) {
			return 0;
		}
		return Integer.valueOf(str);
	}
	/**
	 * 传入的日期加一天
	 * @param dateStr 
	 * @return
	 */
	public static String plusOneDays(String dateStr) {
		return new DateTime(dateStr).plusDays(1).toString(Constants.Date_Short);
	}
	
	
	/**
	 * 计算增长率  四舍五入
	 * type=1 计算增长率
	 * type=2 百分比
	 * @param nowCount  今年累计
	 * @param lastNowCount  去年同期
	 * @return  GrowthRate
	 */
	public static String calculatePersent(int nowCount, int lastNowCount,String type) {
		Integer persent = nowCount;
		if (type.equals(Type._1.toString())) {
			nowCount = (nowCount - lastNowCount);
		}
		if (lastNowCount != 0) {
			persent =  nowCount * 1000 / lastNowCount;
			if (persent > 0) {
				persent = (persent + 5) / 10;
			} else {
				persent = (persent - 5) / 10;
			}
		}else{
			//persent = persent*100;
			return "0";
		}
		return persent.toString();
	}
	/**
	 * 季度和年度报表特定计算方式
	 * 
	 * @param nowCount
	 * @param lastNowCount
	 * @return
	 */
	public static Integer calculatePersent(int nowCount, int lastNowCount) {
		if (nowCount == 0 || lastNowCount == 0) {
			return 0;
		}
		Integer persent = (nowCount - lastNowCount) * 1000 / lastNowCount;
		if (persent > 0) {
			persent = (persent + 5) / 10;
		} else {
			persent = (persent - 5) / 10;
		}
		return persent;

	}
	public enum Type{
		_1("1"),_2("2");
		private String v;
		Type(String value){
			this.v=value;
		}
		@Override
		public String toString() {
			return v;
		}
	}
	/**
	 *将list转换成array
	 * @param list
	 * @return
	 */
	public static String[] list2Array(List<String> list) {
		String[] array = new String[list.size()];
		for (int i = 0; i < list.size(); i++) {
			array[i]=list.get(i);
		}
		return array;
	}
		
	/**
	 * 将日期转换成指定格式的字符串
	 * 
	 * @param d
	 *            要转换的日期
	 * @param fmt
	 *            指定格式的字符串 如：yyyyMMddhhmmss
	 */
	public static String date2Str(Date d, String fmt) {
		return new DateTime(d).toString(fmt);
	}

	/**
	 * 将指定的字符串转换成日期
	 * 
	 * @param fmt 
	 *           指定格式的字符串 如：20110909121212
	 * @return
	 */
	public static Date str2Date(String fmt) {
		return new DateTime(fmt).toDate();
	}

	/**
	 * 获取 指定格式的日期字符串
	 * 
	 * @param fmt
	 *            如：yyyyMMddhhmmss
	 * @return
	 */
	public static String getDate(String fmt) {
		return new DateTime().toString(fmt);
	}

	/**
	 * 日期比较-->当前日期和指定日期比较 当前日期<指定日期 返回：true 否则的话返回false
	 * 
	 * @param d
	 *            指定日期
	 * @return
	 */
	public static boolean comparisonDateTime(Date d) {
		boolean judge = false;
		if (new DateTime(d).isAfterNow()) {
			judge = true;
		}
		return judge;
	}
	
	/**
	 * 获取去年同期日期
	 */
	public static String getLastNowTime(DateTime dateTime) {
		int nowYear = dateTime.getYear();
		int monthOfYear = dateTime.getMonthOfYear();
		int dayOfMonth = dateTime.getDayOfMonth();
		String lastNowEndTime = String.valueOf(nowYear - 1) + dateTime.toString("-MM-dd");
		//当前为闰月年的2-29号，设定去年为同期为2-28
		if (nowYear % 4 == 0 && monthOfYear == 2 && dayOfMonth == 29) {
			lastNowEndTime = nowYear-1+"-02-28";
		}
		//去年为闰月年   当前时间为2-28号，设定去年为同期为2-29
		if (nowYear % 4 == 1 && monthOfYear == 2 && dayOfMonth == 28) {
			lastNowEndTime = nowYear-1+"-02-29";
		}
		return lastNowEndTime;
	}
	/**
	 * 字符串替换函数：将字符串中的指定字符替换
	 * 
	 * @param str
	 *            目标字符串
	 * @param sourceChar
	 *            源字符
	 * @param replaceChar
	 *            所要替换的字符
	 * @return 返回替换后的字符串
	 */
	public static String replaceChart(String str, String sourceChar, String replaceChar) {
		return str.replace(sourceChar, replaceChar);
	}

	/**
	 * 当前日期与指定日期的差（天数）
	 * 
	 * @param d指定日期的字符串
	 * @return 当前日期与指定日期的 相差天数
	 */
	public static long getDateDiff(String d) {
		return (new DateTime().getMillis() - new DateTime(d).getMillis()) / (1000 * 60 * 60 * 24);
	}
	/**
	 * 根据特定字段去掉list里面的重复记录
	 * @param list
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static <T> List<T> removeDuplication(List<T> list, String key) throws Exception {
		if (list == null || list.isEmpty()) {
			return list;
		}
		if (key == null || key.equals("")) {
			return list;
		}
		List<T> newList = new ArrayList<T>();
		Set<String> keySet = new HashSet<String>();
		for(T t : list) {
			String logicKey = BeanUtils.getProperty(t, key);
			if (!keySet.contains(logicKey)) {
				keySet.add(logicKey);
				newList.add(t);
			}
		}
		return newList;
	}
	/**
	 * list中查找属性propertie为value的记录
	 * @param list
	 * @param property
	 * @param value
	 * @return T
	 * @throws Exception
	 */
	public static <T> T isExistence(List<T> list, String property,String value) throws Exception {
		if (list == null || list.isEmpty()) {
			return null;
		}
		if (property == null || property.equals("")) {
			return null;
		}
		for(T t : list) {
			String logicKey = BeanUtils.getProperty(t, property);
			if (value.equals(logicKey)) {
				return t;
			}
		}
		return null;
	}
	/**
	 * 根据数组位置去掉list里面的重复记录
	 * @param list
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static List<Object[]> removeListArray(List<Object[]> list, int key) throws Exception {
		if (key >= list.size() || key < 0)
			return list;
		List<Object[]> newList = new ArrayList<Object[]>();
		Set<String> keySet = new HashSet<String>();
		for(Object[] objects : list) {
			if (objects[key] != null) {
				String logicKey = objects[key].toString();
				if (!keySet.contains(logicKey.toString())) {
					keySet.add(logicKey.toString());
					newList.add(objects);
				}
			}
		}
		return newList;
	}
}
