package ru.vsu.Peredachka.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import ru.vsu.Peredachka.data.dto.journey.JourneyCriteriaDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.Order;
import ru.vsu.Peredachka.data.entity.User;

import java.util.Date;
import java.util.List;

@Component
public interface
JourneyRepository extends CrudRepository<Journey, Long>,
        JpaRepository<Journey, Long>,
        JpaSpecificationExecutor<Journey> {

        @Query(value = "with min_distance as\n" +
                "(select j.id, s_tp.dispatch_date, e_tp.arrival_date, j.max_order_count, j.owner_id,\n" +
                " \t\tcalculate_distance(s_tp.x, s_tp.y, :sX, :sY, 'K') as s_dist,\n" +
                " \t\tmin(calculate_distance(s_tp.x, s_tp.y, :sX, :sY, 'K'))\n" +
                " \t\tover (partition by j.id) as min_dist_s,\n" +
                " \t\tcalculate_distance(e_tp.x, e_tp.y, :eX, :eY,  'K') as e_dist,\n" +
                " \t\tmin(calculate_distance(e_tp.x, e_tp.y, :eX, :eY, 'K'))\n" +
                " \t\tover (partition by j.id) as min_dist_e\n" +
                "\tfrom \n" +
                "\t(select tp.journey_id, max(tp.point_index) as last_point\n" +
                "\t\tfrom travel_point tp\n" +
                "\t\tgroup by tp.journey_id\n" +
                "\t) lp\n" +
                " \tjoin \n" +
                " \t(select tp.journey_id, min(tp.point_index) as first_point\n" +
                "\t\tfrom travel_point tp\n" +
                "\t\tgroup by tp.journey_id\n" +
                "\t) fp\n" +
                " \ton fp.journey_id = lp.journey_id\n" +
                "\tjoin journey j\n" +
                "\t\ton j.id = fp.journey_id\n" +
                "\tjoin travel_point s_tp\n" +
                "\t\ton  s_tp.journey_id = j.id and \n" +
                " \t\t    s_tp.point_index != lp.last_point\n" +
                " \tjoin travel_point e_tp\n" +
                " \t\ton  e_tp.journey_id = j.id and\n" +
                " \t\t\te_tp.id != s_tp.id and\n" +
                " \t\t\te_tp.point_index != fp.first_point\n" +
                ")\n" +
                " select md.id \n" +
                "\tfrom  min_distance md\n" +
                "\t\t  join \"user\" u\n" +
                "\t\t  on md.owner_id = u.id" +
                "\twhere md.s_dist = md.min_dist_s and\n" +
                "\t\t  md.e_dist = md.min_dist_e and\n" +
                "\t\t  md.s_dist <= :radius and\n" +
                "\t\t  md.e_dist <= :radius and\n" +
                "\t\t  md.dispatch_date >= :dD and\n" +
                "\t\t  md.arrival_date <= :aD and\n" +
                "\t\t  md.max_order_count >= :maxOrderCount and\n" +
                "\t\t  u.rating >= :rating" +
                "\torder by md.s_dist + md.e_dist,\n" +
                "\t\t\t md.id", nativeQuery = true)
        List<Long> findFilteredJourney(
                @Param("sX") Double startX,
                @Param("sY") Double startY,
                @Param("eX") Double endX,
                @Param("eY") Double endY,
                @Param("dD") Date dispatchDate,
                @Param("aD") Date arrivalDate,
                @Param("maxOrderCount") Integer maxOrderCount,
                @Param("rating") Integer rating,
                @Param("radius") Integer radius
        );
}
