package ru.vsu.Peredachka.service.sms;

import org.springframework.stereotype.Component;

import java.util.Random;

/**
 * @author Burdyug Pavel
 * Generate random alphanumeric string
 */
@Component
public class PasswordGenerator {
    public String generatePassword(int length) {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        Random random = new Random();
        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(length)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        return generatedString;
    }
}
