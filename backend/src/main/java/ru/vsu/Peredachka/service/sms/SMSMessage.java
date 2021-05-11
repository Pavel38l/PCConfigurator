package ru.vsu.Peredachka.service.sms;

import org.springframework.stereotype.Component;

/**
 * @author Burdyug Pavel
 * Generate sms messages
 */

@Component
public class SMSMessage {
    private String DELIVERY_MESSAGE = "Peredachka. Your code for receiving your parcel is %s. To receive it, give the code to the carrier. Don't share your code with other people";

    public String generateDeliveryMessage(String code) {
        return String.format(DELIVERY_MESSAGE, code);
    }
}
