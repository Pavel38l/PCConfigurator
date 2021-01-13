package ru.vsu.Peredachka.data.dto.order;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class OrderDto {
    private Long id;
    private Integer orderValue;
    private String description;
}
