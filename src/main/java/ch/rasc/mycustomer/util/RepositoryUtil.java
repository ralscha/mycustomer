package ch.rasc.mycustomer.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;

import ch.ralscha.extdirectspring.bean.ExtDirectStoreReadRequest;
import ch.ralscha.extdirectspring.bean.SortDirection;
import ch.ralscha.extdirectspring.bean.SortInfo;

public abstract class RepositoryUtil {

	public static Pageable createPageable(ExtDirectStoreReadRequest request) {

		List<Order> orders = new ArrayList<>();
		for (SortInfo sortInfo : request.getSorters()) {

			if (sortInfo.getDirection() == SortDirection.ASCENDING) {
				orders.add(new Order(Direction.ASC, sortInfo.getProperty()));
			}
			else {
				orders.add(new Order(Direction.DESC, sortInfo.getProperty()));
			}
		}

		// Ext JS pages starts with 1, Spring Data starts with 0
		int page = Math.max(request.getPage() - 1, 0);

		if (orders.isEmpty()) {
			return new PageRequest(page, request.getLimit());
		}

		Sort sort = new Sort(orders);
		return new PageRequest(page, request.getLimit(), sort);

	}

}