package ch.rasc.mycustomer.service;

import java.math.BigDecimal;

public class CategoryData {
	private final String category;
	private final BigDecimal percent;

	public CategoryData(String category, BigDecimal percent) {
		this.category = category;
		this.percent = percent;
	}

	public String getCategory() {
		return this.category;
	}

	public BigDecimal getPercent() {
		return this.percent;
	}

}
