package ru.vsu.Peredachka.data.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.vsu.Peredachka.data.dto.TravelPointDto;
import ru.vsu.Peredachka.data.dto.journey.JourneyInfoDto;
import ru.vsu.Peredachka.data.dto.security.RegisterUserDto;
import ru.vsu.Peredachka.data.entity.Journey;
import ru.vsu.Peredachka.data.entity.User;

import javax.annotation.PostConstruct;

@Component
public class UserRegisterMapper extends AbstractMapper<User, RegisterUserDto> {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    UserRegisterMapper(PasswordEncoder passwordEncoder) {
        super(User.class, RegisterUserDto.class);
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void setupMapper() {
        mapper.createTypeMap(RegisterUserDto.class, User.class)
                .addMappings(m -> m.skip(User::setPassword))
                .setPostConverter(toEntityConverter());
    }

    @Override
    void mapSpecificFields(RegisterUserDto source, User destination) {
        destination.setRating(0);
        destination.setPassword(passwordEncoder.encode(source.getPassword()));
    }
}
