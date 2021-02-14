package ru.vsu.Peredachka.data.filter;

import org.springframework.data.jpa.domain.Specification;
import ru.vsu.Peredachka.data.dto.journey.JourneyFilterDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.User;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public class JourneySpecification implements Specification<Journey> {

    private final JourneyFilterDto criteria;

    public JourneySpecification(JourneyFilterDto criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Journey> root, CriteriaQuery<?> query, CriteriaBuilder builder) {

        Predicate maxOrderCount = criteria.getMaxOrderCount() == null ?
                builder.and() : builder.greaterThanOrEqualTo(root.get("maxOrderCount"), criteria.getMaxOrderCount());
        Join<Journey, User> journeyUserJoin = root.join("owner");
        Predicate rating = criteria.getRating() == null ?
                builder.and() : builder.greaterThanOrEqualTo(journeyUserJoin.get("rating"), criteria.getRating());
        return builder.and(maxOrderCount, rating);

    }
}
