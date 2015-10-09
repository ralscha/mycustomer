package ch.rasc.mycustomer.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.jpa.domain.AbstractPersistable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import ch.rasc.extclassgenerator.Model;
import ch.rasc.extclassgenerator.ModelField;
import ch.rasc.extclassgenerator.ModelType;

@Model(value = "MyCustomer.model.Customer", rootProperty = "records",
		createMethod = "customerService.create", readMethod = "customerService.read",
		updateMethod = "customerService.update",
		destroyMethod = "customerService.destroy", identifier = "negative")
@Entity
@JsonIgnoreProperties("new")
public class Customer extends AbstractPersistable<Long> {

	private static final long serialVersionUID = 1L;

	@Length(min = 1, max = 255)
	@NotEmpty
	private String lastName;

	@Length(min = 1, max = 255)
	@NotEmpty
	private String firstName;

	@Enumerated(EnumType.STRING)
	@Column(length = 1)
	@ModelField(type = ModelType.STRING, allowNull = true)
	@NotNull
	private Sex sex;

	@Email
	@Length(min = 1, max = 200)
	@NotEmpty
	private String email;

	@Column(length = 300)
	private String address;

	@Column(length = 255)
	private String city;

	@Column(length = 20)
	private String zipCode;

	@Enumerated(EnumType.STRING)
	@Column(length = 1)
	@ModelField(type = ModelType.STRING, allowNull = true)
	@NotNull
	private Category category;

	@NotNull
	private Boolean newsletter;

	@Column(length = 10)
	@ModelField(dateFormat = "Y-m-d")
	private LocalDate dob;

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public Sex getSex() {
		return this.sex;
	}

	public void setSex(Sex sex) {
		this.sex = sex;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getZipCode() {
		return this.zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public Category getCategory() {
		return this.category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Boolean getNewsletter() {
		return this.newsletter;
	}

	public void setNewsletter(Boolean newsletter) {
		this.newsletter = newsletter;
	}

	public LocalDate getDob() {
		return this.dob;
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
		return "Customer [lastName=" + this.lastName + ", firstName=" + this.firstName
				+ ", sex=" + this.sex + ", email=" + this.email + ", address="
				+ this.address + ", city=" + this.city + ", zipCode=" + this.zipCode
				+ ", category=" + this.category + ", newsletter=" + this.newsletter
				+ ", dob=" + this.dob + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + (this.address == null ? 0 : this.address.hashCode());
		result = prime * result + (this.category == null ? 0 : this.category.hashCode());
		result = prime * result + (this.city == null ? 0 : this.city.hashCode());
		result = prime * result + (this.dob == null ? 0 : this.dob.hashCode());
		result = prime * result + (this.email == null ? 0 : this.email.hashCode());
		result = prime * result
				+ (this.firstName == null ? 0 : this.firstName.hashCode());
		result = prime * result + (this.lastName == null ? 0 : this.lastName.hashCode());
		result = prime * result + (this.newsletter ? 1231 : 1237);
		result = prime * result + (this.sex == null ? 0 : this.sex.hashCode());
		result = prime * result + (this.zipCode == null ? 0 : this.zipCode.hashCode());
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
		if (this.address == null) {
			if (other.address != null) {
				return false;
			}
		}
		else if (!this.address.equals(other.address)) {
			return false;
		}
		if (this.category != other.category) {
			return false;
		}
		if (this.city == null) {
			if (other.city != null) {
				return false;
			}
		}
		else if (!this.city.equals(other.city)) {
			return false;
		}
		if (this.dob == null) {
			if (other.dob != null) {
				return false;
			}
		}
		else if (!this.dob.equals(other.dob)) {
			return false;
		}
		if (this.email == null) {
			if (other.email != null) {
				return false;
			}
		}
		else if (!this.email.equals(other.email)) {
			return false;
		}
		if (this.firstName == null) {
			if (other.firstName != null) {
				return false;
			}
		}
		else if (!this.firstName.equals(other.firstName)) {
			return false;
		}
		if (this.lastName == null) {
			if (other.lastName != null) {
				return false;
			}
		}
		else if (!this.lastName.equals(other.lastName)) {
			return false;
		}
		if (this.newsletter != other.newsletter) {
			return false;
		}
		if (this.sex != other.sex) {
			return false;
		}
		if (this.zipCode == null) {
			if (other.zipCode != null) {
				return false;
			}
		}
		else if (!this.zipCode.equals(other.zipCode)) {
			return false;
		}
		return true;
	}

}
