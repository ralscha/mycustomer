package ch.rasc.mycustomer.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.jpa.domain.AbstractPersistable;

import ch.rasc.extclassgenerator.Model;
import ch.rasc.extclassgenerator.ModelField;
import ch.rasc.extclassgenerator.ModelType;
import ch.rasc.mycustomer.util.ISO8601LocalDateDeserializer;
import ch.rasc.mycustomer.util.ISO8601LocalDateSerializer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Model(value = "MyCustomer.model.Customer", rootProperty = "records",
		createMethod = "customerService.create", readMethod = "customerService.read",
		updateMethod = "customerService.update",
		destroyMethod = "customerService.destroy", identifier = "negative")
@Entity
@JsonIgnoreProperties("new")
public class Customer extends AbstractPersistable<Long> {

	private static final long serialVersionUID = 1L;

	@Length(min = 1, max = 255)
	private String lastName;

	@Length(min = 1, max = 255)
	private String firstName;

	@Enumerated(EnumType.STRING)
	@Column(length = 1)
	@ModelField(type = ModelType.STRING)
	private Sex sex;

	@Email
	@Length(min = 1, max = 200)
	private String email;

	@Column(length = 300)
	private String address;

	@Column(length = 255)
	private String city;

	@Column(length = 20)
	private String zipCode;

	@Enumerated(EnumType.STRING)
	@Column(length = 1)
	@ModelField(type = ModelType.STRING)
	private Category category;

	private boolean newsletter;

	@Column(length = 10)
	@JsonSerialize(using = ISO8601LocalDateSerializer.class)
	@JsonDeserialize(using = ISO8601LocalDateDeserializer.class)
	@ModelField(dateFormat = "Y-m-d")
	private LocalDate dob;

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public Sex getSex() {
		return sex;
	}

	public void setSex(Sex sex) {
		this.sex = sex;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public boolean isNewsletter() {
		return newsletter;
	}

	public void setNewsletter(boolean newsletter) {
		this.newsletter = newsletter;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	@Override
	public void setId(Long id) {
		super.setId(id);
	}

	@Override
	public String toString() {
		return "Customer [lastName=" + lastName + ", firstName=" + firstName + ", sex="
				+ sex + ", email=" + email + ", address=" + address + ", city=" + city
				+ ", zipCode=" + zipCode + ", category=" + category + ", newsletter="
				+ newsletter + ", dob=" + dob + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + (address == null ? 0 : address.hashCode());
		result = prime * result + (category == null ? 0 : category.hashCode());
		result = prime * result + (city == null ? 0 : city.hashCode());
		result = prime * result + (dob == null ? 0 : dob.hashCode());
		result = prime * result + (email == null ? 0 : email.hashCode());
		result = prime * result + (firstName == null ? 0 : firstName.hashCode());
		result = prime * result + (lastName == null ? 0 : lastName.hashCode());
		result = prime * result + (newsletter ? 1231 : 1237);
		result = prime * result + (sex == null ? 0 : sex.hashCode());
		result = prime * result + (zipCode == null ? 0 : zipCode.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!super.equals(obj)) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		Customer other = (Customer) obj;
		if (address == null) {
			if (other.address != null) {
				return false;
			}
		}
		else if (!address.equals(other.address)) {
			return false;
		}
		if (category != other.category) {
			return false;
		}
		if (city == null) {
			if (other.city != null) {
				return false;
			}
		}
		else if (!city.equals(other.city)) {
			return false;
		}
		if (dob == null) {
			if (other.dob != null) {
				return false;
			}
		}
		else if (!dob.equals(other.dob)) {
			return false;
		}
		if (email == null) {
			if (other.email != null) {
				return false;
			}
		}
		else if (!email.equals(other.email)) {
			return false;
		}
		if (firstName == null) {
			if (other.firstName != null) {
				return false;
			}
		}
		else if (!firstName.equals(other.firstName)) {
			return false;
		}
		if (lastName == null) {
			if (other.lastName != null) {
				return false;
			}
		}
		else if (!lastName.equals(other.lastName)) {
			return false;
		}
		if (newsletter != other.newsletter) {
			return false;
		}
		if (sex != other.sex) {
			return false;
		}
		if (zipCode == null) {
			if (other.zipCode != null) {
				return false;
			}
		}
		else if (!zipCode.equals(other.zipCode)) {
			return false;
		}
		return true;
	}

}
