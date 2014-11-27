package com.xunCloud.util;

import java.sql.Time;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateFormatUtils;

public class DateHelper {
	public static java.sql.Date parseSqlDate(String str, String datePattern)
			throws ParseException {
		DateFormat SQL_DATE_FORMAT;
		if (datePattern == null)
			SQL_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
		else {
			SQL_DATE_FORMAT = new SimpleDateFormat(datePattern);
		}
		return new java.sql.Date(SQL_DATE_FORMAT.parse(str).getTime());
	}

	public static java.sql.Date parseSqlDate(String str) throws ParseException {
		DateFormat SQL_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
		return new java.sql.Date(SQL_DATE_FORMAT.parse(str).getTime());
	}

	public static Time parseSqlTime(String str) throws ParseException {
		DateFormat SQL_TIME_FORMAT = new SimpleDateFormat("HH:mm");
		return new Time(SQL_TIME_FORMAT.parse(str).getTime());
	}

	public static Timestamp parseSqlTimestamp(String str) throws ParseException {
		DateFormat SQL_TIMESTAMP_FORMAT = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		return new Timestamp(SQL_TIMESTAMP_FORMAT.parse(str).getTime());
	}

	public static Timestamp parseSqlTimestamp(String str, String format)
			throws ParseException {
		DateFormat SQL_TIMESTAMP_FORMAT = new SimpleDateFormat(format);
		return new Timestamp(SQL_TIMESTAMP_FORMAT.parse(str).getTime());
	}

	public static String formatSqlDate(java.sql.Date date)
			throws ParseException {
		DateFormat SQL_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
		if (date == null) {
			return null;
		}
		return SQL_DATE_FORMAT.format(date);
	}

	public static String formatSqlTime(Time time) throws ParseException {
		DateFormat SQL_TIME_FORMAT = new SimpleDateFormat("HH:mm");
		if (time == null) {
			return null;
		}
		return SQL_TIME_FORMAT.format(time);
	}

	public static String formatSqlTimestamp(Timestamp timestamp)
			throws ParseException {
		DateFormat SQL_TIMESTAMP_FORMAT = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		if (timestamp == null)
			return null;
		return SQL_TIMESTAMP_FORMAT.format(timestamp);
	}

	public static String format(java.util.Date date) {
		SimpleDateFormat DEFAULT_DATE_FORMAT = new SimpleDateFormat(
				"yyyy-MM-dd");

		return DEFAULT_DATE_FORMAT.format(date);
	}

	public static java.util.Date getNow() {
		return new java.util.Date();
	}

	public static String getNowString() {
		DateFormat SQL_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
		return SQL_DATE_FORMAT.format(getNow());
	}

	public static java.util.Date createDate(int year, int month, int date) {
		GregorianCalendar gc = new GregorianCalendar(year, month, date);
		return gc.getTime();
	}

	public static int getHours(java.util.Date date) {
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		return calendar.get(11);
	}

	public static int getMinutes(java.util.Date date) {
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		return calendar.get(12);
	}

	public static java.util.Date parse(String str) throws ParseException {
		SimpleDateFormat DEFAULT_DATE_FORMAT = new SimpleDateFormat(
				"yyyy-MM-dd");

		return DEFAULT_DATE_FORMAT.parse(str);
	}

	public static String formatDate(String parse, String format, Object value) {
		String result = null;

		if (value == null) {
			return result;
		}

		if (StringUtils.isBlank(format)) {
			return value.toString();
		}

		java.util.Date date = null;
		if (value instanceof java.util.Date) {
			date = (java.util.Date) value;
		} else {
			if (StringUtils.isBlank(parse))
				return value.toString();
			try {
				DateFormat df = new SimpleDateFormat(parse);
				date = df.parse(value.toString());
			} catch (Exception e) {
				return value.toString();
			}

		}

		return DateFormatUtils.format(date, format);
	}

	public static long getDaysAfter(String simpleDateStrStart,
			String simpleDateStrEnd) {
		java.util.Date startDate = simpleStringToDate(simpleDateStrStart);
		java.util.Date endDate = simpleStringToDate(simpleDateStrEnd);

		long daysOfMilliseconds = endDate.getTime() - startDate.getTime();
		long days = daysOfMilliseconds / 86400000L;

		return days;
	}

	public static String addDayForSimpleDateString(String simpleDateStr,
			int amount) {
		GregorianCalendar date = new GregorianCalendar();
		date.setTime(simpleStringToDate(simpleDateStr));
		date.add(6, amount);

		return dateToSimpleString(date.getTime());
	}

	public static final String getNextMonth(String ny) {
		java.util.Date date = stringToDate(ny, "yyyy-MM");
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(2, 1);

		return dateToString(cal.getTime(), "yyyy-MM");
	}

	public static final java.util.Date longStringToDate(String value) {
		return stringToDate(value, "yyyy-MM-dd HH:mm:ss");
	}

	public static final String getSomeNextMonth(java.util.Date date, int some) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(2, some);

		return dateToString(calendar.getTime(), "yyyy-MM");
	}

	public static final String getUpSomeMonth(String yf, int some) {
		java.util.Date date = stringToDate(yf, "yyyyMM");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(2, -some);
		return dateToString(calendar.getTime(), "yyyyMM");
	}

	public static final String getUpSomeMonth(String yf, int some, String format) {
		java.util.Date date = stringToDate(yf, "yyyyMM");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(2, -some);
		return dateToString(calendar.getTime(), format);
	}

	public static final String getNoSymbolStringDate(String rq) {
		java.util.Date date = stringToDate(rq, "yyyy-MM-dd");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return dateToString(calendar.getTime(), "yyyyMMdd");
	}

	public static final String getHaveSymbolStringDate(String rq) {
		java.util.Date date = stringToDate(rq, "yyyyMMdd");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return dateToString(calendar.getTime(), "yyyy-MM-dd");
	}

	public static final String getNowDate(String format) {
		SimpleDateFormat sDateFormat = new SimpleDateFormat(format);
		return sDateFormat.format(new java.util.Date());
	}

	public static final String getUpSomeYear(String yf, int some) {
		java.util.Date date = stringToDate(yf, "yyyyMM");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(1, -some);
		yf = dateToString(calendar.getTime(), "yyyyMM");
		return yf;
	}

	public static final String composeDate(int rq, String ny) {
		String year = ny.substring(0, 4);
		String month = ny.substring(4, 6);
		String day = Integer.toString(rq);
		if ((rq > 31) || (rq < 1)) {
			return year + "-" + month + "-01";
		}
		GregorianCalendar cal = new GregorianCalendar(Integer.parseInt(year),
				Integer.parseInt(month) - 1, rq);
		if (cal.get(2) != Integer.parseInt(month) - 1) {
			GregorianCalendar cal2 = new GregorianCalendar(
					Integer.parseInt(year), Integer.parseInt(month), 1);
			cal2.add(5, -1);
			return dateToSimpleString(cal2.getTime());
		}
		if (day.length() == 1) {
			day = "0" + day;
		}
		return year + "-" + month + "-" + day;
	}

	public static boolean isSameDay(java.util.Date dayA, java.util.Date dayB) {
		Calendar day1 = Calendar.getInstance();
		day1.setTime(dayA);
		Calendar day2 = Calendar.getInstance();
		day2.setTime(dayB);

		return (day1.get(6) == day2.get(6));
	}

	public static String[] getMonthArrayBetweenTowMonth(String monthStart,
			String monthEnd) {
		Calendar start = Calendar.getInstance();
		start.setTime(simpleStringToDate(monthStart + "-03"));
		Calendar end = Calendar.getInstance();
		end.setTime(simpleStringToDate(monthEnd + "-02"));

		ArrayList monthList = new ArrayList();
		for (start.add(2, 1); start.before(end); start.add(2, 1)) {
			monthList.add(dateToString(start.getTime(), "yyyy-MM"));
		}

		return ((String[]) monthList.toArray(new String[monthList.size()]));
	}

	public static String dateToLongString(java.util.Date date) {
		return dateToString(date, "yyyy-MM-dd HH:mm:ss");
	}

	public static String dateToSimpleString(java.util.Date date) {
		return dateToString(date, "yyyy-MM-dd");
	}

	public static String dateToString(java.util.Date date, String format) {
		SimpleDateFormat df = new SimpleDateFormat(format);

		return df.format(date);
	}

	public static final java.util.Date stringToDate(String value, String format) {
		if ((value == null) || (value.length() == 0)) {
			return null;
		}

		SimpleDateFormat df = new SimpleDateFormat(format);
		java.util.Date date = null;
		try {
			date = df.parse(value);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return date;
	}

	public static final java.util.Date simpleStringToDate(String value) {
		return stringToDate(value, "yyyy-MM-dd");
	}

	public static void main(String[] arg) {
		try {
			parseSqlTimestamp("2008-09-09", "yyyy-MM-dd");
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}
}