package ru.vsu.Peredachka.data.dto.sms;

import lombok.Data;

/**
 * @author Burdyug Pavel
 */

@Data
public class DeliveryDto {
    private String code;
    private Long orderId;
}
