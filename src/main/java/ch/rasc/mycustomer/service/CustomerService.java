package ch.rasc.mycustomer.service;

import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.STORE_MODIFY;
import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.STORE_READ;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreReadRequest;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreResult;
import ch.ralscha.extdirectspring.filter.Filter;
import ch.ralscha.extdirectspring.filter.StringFilter;
import ch.rasc.edsutil.RepositoryUtil;
import ch.rasc.mycustomer.entity.Category;
import ch.rasc.mycustomer.entity.Customer;
import ch.rasc.mycustomer.entity.QCustomer;
import ch.rasc.mycustomer.repository.CustomerRepository;

import com.mysema.query.BooleanBuilder;
import com.mysema.query.Tuple;
import com.mysema.query.jpa.impl.JPAQuery;

@Service
public class CustomerService {

	private final CustomerRepository customerRepository;

	private final EntityManager entityManager;

	@Autowired
	public CustomerService(CustomerRepository customerRepository,
			EntityManager entityManager) {
		this.customerRepository = customerRepository;
		this.entityManager = entityManager;
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
			bb.and(QCustomer.customer.firstName.startsWith(name).or(
					QCustomer.customer.lastName.startsWith(name)));
		}
		if (StringUtils.hasText(category) && !"All".equals(category)) {
			bb.and(QCustomer.customer.category.eq(Category.valueOf(category)));
		}

		Pageable pageable = RepositoryUtil.createPageable(readRequest);
		Page<Customer> page = customerRepository.findAll(bb, pageable);
		return new ExtDirectStoreResult<>(page.getTotalElements(), page.getContent());

	}

	@ExtDirectMethod(STORE_MODIFY)
	public ExtDirectStoreResult<Customer> create(Customer newCustomer) {
		System.out.println(newCustomer);
		newCustomer.setId(null);
		Customer insertedCustomer = customerRepository.save(newCustomer);
		System.out.println("NEW CUSTOMER: " + insertedCustomer.getId());
		return new ExtDirectStoreResult<>(insertedCustomer);
	}

	@ExtDirectMethod(STORE_MODIFY)
	public ExtDirectStoreResult<Customer> update(Customer updatedCustomer) {
		Customer savedCustomer = customerRepository.save(updatedCustomer);
		return new ExtDirectStoreResult<>(savedCustomer);
	}

	@ExtDirectMethod(STORE_MODIFY)
	public void destroy(Customer destroyCustomer) {
		System.out.println("DESTROY USER: " + destroyCustomer);
		customerRepository.delete(destroyCustomer);
	}

	@ExtDirectMethod(STORE_READ)
	public List<CategoryData> readCategoryData() {
		BigDecimal totalCount = new BigDecimal(customerRepository.count());
		List<Tuple> queryResult = new JPAQuery(entityManager).from(QCustomer.customer)
				.groupBy(QCustomer.customer.category)
				.list(QCustomer.customer.category, QCustomer.customer.category.count());

		List<CategoryData> result = new ArrayList<>();
		for (Tuple tuple : queryResult) {
			Category category = tuple.get(QCustomer.customer.category);
			long categoryCount = tuple.get(QCustomer.customer.category.count());

			CategoryData cd = new CategoryData(category.name(), new BigDecimal(
					categoryCount * 100).divide(totalCount, 2, RoundingMode.HALF_UP));
			result.add(cd);
		}

		return result;
	}

}
