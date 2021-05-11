package ru.vsu.Peredachka.data.dto.sms;

import lombok.Data;
import ru.vsu.Peredachka.data.dto.journey.JourneyDto;
import ru.vsu.Peredachka.data.entity.Journey;

/**
 * @author Burdyug Pavel
 */

@Data
public class DeliveryPrepareDto {
    private String receiverPhoneNumber;
    private Long orderId;
}
