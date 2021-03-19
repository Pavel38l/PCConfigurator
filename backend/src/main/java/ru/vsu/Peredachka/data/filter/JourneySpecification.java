package ru.vsu.Peredachka.data.filter;

import org.springframework.data.jpa.domain.Specification;
import ru.vsu.Peredachka.data.dto.journey.JourneyCriteriaDto;
import ru.vsu.Peredachka.data.dto.travelPoint.TravelPointFilterDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.TravelPoint;
import ru.vsu.Peredachka.data.entity.User;

import javax.persistence.criteria.*;

public class JourneySpecification implements Specification<Journey> {

    private final JourneyCriteriaDto criteria;

    public JourneySpecification(JourneyCriteriaDto criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Journey> r, CriteriaQuery<?> query, CriteriaBuilder b) {

        Predicate maxOrderCount = criteria.getMaxOrderCount() == null ?
                b.and() : b.greaterThanOrEqualTo(r.get("maxOrderCount"), criteria.getMaxOrderCount());
        Join<Journey, User> journeyUserJoin = r.join("owner");
        Predicate rating = criteria.getRating() == null ?
                b.and() : b.greaterThanOrEqualTo(journeyUserJoin.get("rating"), criteria.getRating());
        Join<Journey, TravelPoint> jtpJoin = r.join("travelPoints");

        Subquery<Integer> maxS = query.subquery(Integer.class);
        Subquery<Integer> minS = query.subquery(Integer.class);
        Subquery<Double> distance = query.subquery(Double.class);
        Root<TravelPoint> travelPointRoot = maxS.from(TravelPoint.class);
        maxS.select(b.max(travelPointRoot.get("pointIndex")))
                .where(b.equal(r, travelPointRoot.get("journey")));
        minS.select(b.min(travelPointRoot.get("pointIndex")))
                .where(b.equal(r, travelPointRoot.get("journey")));

        Predicate test = b.lessThanOrEqualTo(
                b.sqrt(
                        b.sum(
                                b.prod(
                                        b.prod(
                                                b.diff(jtpJoin.get("x"), criteria.getStartTravelPoint().getX()),
                                                69.1
                                        ),
                                        b.prod(
                                                b.diff(jtpJoin.get("x"), criteria.getStartTravelPoint().getX()),
                                                69.1
                                        )
                                ),
                                b.prod(
                                        b.prod(
                                                b.diff(criteria.getStartTravelPoint().getY(), jtpJoin.get("y")),
                                                b.prod(
                                                        69.1,
                                                        b.function(
                                                                "cos",
                                                                Double.class,
                                                                b.prod(
                                                                        jtpJoin.get("y"),
                                                                        1/57.3
                                                                )
                                                        )
                                                )
                                        ),
                                        b.prod(
                                                b.diff(criteria.getStartTravelPoint().getY(), jtpJoin.get("y")),
                                                b.prod(
                                                        69.1,
                                                        b.function(
                                                                "cos",
                                                                Double.class,
                                                                b.prod(
                                                                        jtpJoin.get("y"),
                                                                        1/57.3
                                                                )
                                                        )
                                                )
                                        )
                                )
                        )

                ), 3.0
        );

        Predicate notStartPoint = b.notEqual(jtpJoin.get("pointIndex"), minS);
        Predicate point = b.lessThan(jtpJoin.get("pointIndex"), 1);
        return b.and(/*maxOrderCount, rating*//*point*/test);

    }

    private Expression<Double> getDistance(CriteriaBuilder b, Path<Double> x, Path<Double> y, TravelPointFilterDto dto) {
        return b.sqrt(
                b.sum(
                        b.prod(
                                b.prod(
                                        b.diff(x, dto.getX()),
                                        69.1
                                ),
                                b.prod(
                                        b.diff(x, dto.getX()),
                                        69.1
                                )
                        ),
                        b.prod(
                                b.prod(
                                        b.diff(dto.getY(), y),
                                        b.prod(
                                                69.1,
                                                b.function(
                                                        "cos",
                                                        Double.class,
                                                        b.prod(
                                                                y,
                                                                1/57.3
                                                        )
                                                )
                                        )
                                ),
                                b.prod(
                                        b.diff(dto.getY(), y),
                                        b.prod(
                                                69.1,
                                                b.function(
                                                        "cos",
                                                        Double.class,
                                                        b.prod(
                                                                y,
                                                                1/57.3
                                                        )
                                                )
                                        )
                                )
                        )
                )

        );
    }
}
