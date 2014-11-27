package com.xunCloud.util;

import java.util.HashSet;
import java.util.Set;


/**
 *多人操作信件的时候判断是否有人在操作信件
 *往set里面添加RegionPetitionNo
 */
public class ConcurrentUtil {
	public static Set<String> regionPetitionSet = new HashSet<String>();
	/**
	 * 判断信件是否有人在处理
	 * @param region
	 * @param petitionNo
	 * @return
	 */
	public static String add(String petitionNo) {
//		if (petitionNo != null && !petitionNo.equals("")) {
//			String regionCode = Struts2Utils.getSession().getAttribute("curRegionCode").toString();
//			if (!regionPetitionSet.contains(regionCode + petitionNo)) {
//				regionPetitionSet.add(regionCode + petitionNo);
//				return null;
//			} else {
//				return "信件已有人处理";
//			}
//		}
		return null;
	}

	/**
	 * 信件处理完毕后移除
	 * @param region
	 * @param petitionNo
	 */
	public static void remove(String petitionNo) {
//		if (petitionNo != null && !petitionNo.equals("")) {
//			String regionCode = Struts2Utils.getSession().getAttribute("curRegionCode").toString();
//			if (regionPetitionSet.contains(regionCode + petitionNo)) {
//				regionPetitionSet.remove(regionCode + petitionNo);
//			}
//		}
	}
}
