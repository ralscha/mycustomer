package ch.rasc.mycustomer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;

import ch.rasc.mycustomer.entity.Customer;

public interface CustomerRepository
		extends JpaRepository<Customer, Long>, QuerydslPredicateExecutor<Customer> {

	@Override
	List<Customer> findAll(Predicate predicate, OrderSpecifier<?>... orders);

	@Override
	List<Customer> findAll(Predicate predicate);

	Customer findByEmail(String email);
}
