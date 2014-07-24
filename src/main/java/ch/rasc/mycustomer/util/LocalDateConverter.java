package ch.rasc.mycustomer.util;

import java.time.LocalDate;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class LocalDateConverter implements AttributeConverter<LocalDate, String> {
	@Override
	public String convertToDatabaseColumn(LocalDate attribute) {
		if (attribute == null) {
			return null;
		}
		return attribute.toString();
	}

	@Override
	public LocalDate convertToEntityAttribute(String dbData) {
		if (dbData == null) {
			return null;
		}
		return LocalDate.parse(dbData);
	}
}