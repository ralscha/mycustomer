package ch.rasc.mycustomer.service;

import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.STORE_MODIFY;
import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.STORE_READ;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.mysema.query.BooleanBuilder;
import com.mysema.query.Tuple;
import com.mysema.query.jpa.impl.JPAQuery;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreReadRequest;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreResult;
import ch.ralscha.extdirectspring.filter.Filter;
import ch.ralscha.extdirectspring.filter.StringFilter;
import ch.rasc.mycustomer.entity.Category;
import ch.rasc.mycustomer.entity.Customer;
import ch.rasc.mycustomer.entity.QCustomer;
import ch.rasc.mycustomer.repository.CustomerRepository;
import ch.rasc.mycustomer.util.RepositoryUtil;

@Service
public class CustomerService {

	private final CustomerRepository customerRepository;

	private final EntityManager entityManager;

	private final Validator validator;

	@Autowired
	public CustomerService(CustomerRepository customerRepository,
			EntityManager entityManager, Validator validator) {
		this.customerRepository = customerRepository;
		this.entityManager = entityManager;
		this.validator = validator;
	}

	@ExtDirectMethod(STORE_READ)
	public ExtDirectStoreResult<Customer> read(ExtDirectStoreReadRequest readRequest) {

		Filter nameFilter = readRequest.getFirstFilterForField("name");
		Filter categoryFilter = readRequest.getFirstFilterForField("category");

		String name = null;
		String category = null;
		if (nameFilter != null) {
			name = ((StringFilter) nameFilter).getValue();
		}
		if (categoryFilter != null) {
			category = ((StringFilter) categoryFilter).getValue();
		}

		BooleanBuilder bb = new BooleanBuilder();
		if (StringUtils.hasText(name)) {
			bb.and(QCustomer.customer.firstName.startsWith(name)
					.or(QCustomer.customer.lastName.startsWith(name)));
		}
		if (StringUtils.hasText(category) && !"All".equals(category)) {
			bb.and(QCustomer.customer.category.eq(Category.valueOf(category)));
		}

		Pageable pageable = RepositoryUtil.createPageable(readRequest);
		Page<Customer> page = this.customerRepository.findAll(bb, pageable);
		return new ExtDirectStoreResult<>(page.getTotalElements(), page.getContent());

	}

	@ExtDirectMethod(STORE_MODIFY)
	public ValidationErrorsResult<Customer> create(Customer newCustomer) {
		System.out.println(newCustomer);

		List<ValidationErrors> violations = validateEntity(newCustomer);
		ValidationErrorsResult<Customer> result;
		if (violations.isEmpty()) {
			Customer insertedCustomer = this.customerRepository.save(newCustomer);
			System.out.println("NEW CUSTOMER: " + insertedCustomer.getId());
			result = new ValidationErrorsResult<>(insertedCustomer);
		}
		else {
			result = new ValidationErrorsResult<>(newCustomer);
			result.setValidations(violations);
		}
		return result;

	}

	@ExtDirectMethod(STORE_MODIFY)
	public ValidationErrorsResult<Customer> update(Customer updatedCustomer) {
		List<ValidationErrors> violations = validateEntity(updatedCustomer);
		ValidationErrorsResult<Customer> result;
		if (violations.isEmpty()) {
			Customer savedCustomer = this.customerRepository.save(updatedCustomer);
			result = new ValidationErrorsResult<>(savedCustomer);
		}
		else {
			result = new ValidationErrorsResult<>(updatedCustomer);
			result.setValidations(violations);
		}
		return result;
	}

	protected <T> List<ValidationErrors> validateEntity(T entity) {
		Set<ConstraintViolation<T>> constraintViolations = this.validator
				.validate(entity);
		Map<String, List<String>> fieldMessages = new HashMap<>();
		if (!constraintViolations.isEmpty()) {
			for (ConstraintViolation<T> constraintViolation : constraintViolations) {
				String property = constraintViolation.getPropertyPath().toString();
				List<String> messages = fieldMessages.get(property);
				if (messages == null) {
					messages = new ArrayList<>();
					fieldMessages.put(property, messages);
				}
				messages.add(constraintViolation.getMessage());
			}
		}
		List<ValidationErrors> validationErrors = new ArrayList<>();
		fieldMessages.forEach((k, v) -> {
			ValidationErrors errors = new ValidationErrors();
			errors.setField(k);
			errors.setMessage(v.toArray(new String[v.size()]));
			validationErrors.add(errors);
		});

		return validationErrors;
	}

	@ExtDirectMethod(STORE_MODIFY)
	public void destroy(Customer destroyCustomer) {
		System.out.println("DESTROY USER: " + destroyCustomer);
		this.customerRepository.delete(destroyCustomer);
	}

	@ExtDirectMethod(STORE_READ)
	public List<CategoryData> readCategoryData() {
		BigDecimal totalCount = new BigDecimal(this.customerRepository.count());
		List<Tuple> queryResult = new JPAQuery(this.entityManager)
				.from(QCustomer.customer).groupBy(QCustomer.customer.category)
				.list(QCustomer.customer.category, QCustomer.customer.category.count());

		List<CategoryData> result = new ArrayList<>();
		for (Tuple tuple : queryResult) {
			Category category = tuple.get(QCustomer.customer.category);
			long categoryCount = tuple.get(QCustomer.customer.category.count());

			CategoryData cd = new CategoryData(category.name(),
					new BigDecimal(categoryCount * 100).divide(totalCount, 2,
							RoundingMode.HALF_UP));
			result.add(cd);
		}

		return result;
	}

}
