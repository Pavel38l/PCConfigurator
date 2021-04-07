package ru.vsu.Peredachka.data.dto.travelPoint;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
public class CreateTravelPointDto {
    private String comment;
    private Double x, y;
    private String address;
    private LocalDate dispatchDate;
    private LocalDate arrivalDate;

    private Integer pointIndex;
}
