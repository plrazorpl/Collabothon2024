package home.officers.backend.widgetbe.customer.util;

import home.officers.backend.widgetbe.customer.model.domain.Customer;
import home.officers.backend.widgetbe.customer.model.dto.CustomerDto;

public interface Mapper {

    static CustomerDto toCustomerDto(Customer customer) {
        return new CustomerDto(customer.getCustomerName(), customer.getCustomerAddress());
    }
}
