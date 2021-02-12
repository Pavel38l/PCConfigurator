package ru.vsu.Peredachka.data.filter;

import org.springframework.data.jpa.domain.Specification;
import ru.vsu.Peredachka.data.dto.journey.JourneyFilterDto;
import ru.vsu.Peredachka.data.entity.Journey;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class JourneySpecification implements Specification<Journey> {

    private final JourneyFilterDto criteria;

    public JourneySpecification(JourneyFilterDto criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Journey> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.greaterThanOrEqualTo(root.get("maxOrderCount"), criteria.getMaxOrderCount());
    }
}
