package ch.rasc.mycustomer.service;

public class ValidationErrors {
	private String field;

	private String[] message;

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String[] getMessage() {
		return message;
	}

	public void setMessage(String[] message) {
		this.message = message;
	}

}
