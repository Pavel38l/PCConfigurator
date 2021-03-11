package ru.vsu.Peredachka.service;

import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.vsu.Peredachka.data.entity.User;
import ru.vsu.Peredachka.data.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(
            UserService.class);
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User findById(Long id) throws NotFoundException {
       return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found!"));
    }

    public Optional<User> findByLoginAndPassword(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                logger.info("Just a log message.");
                //logger.debug("Message for debug level.");
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }


    public User updateOrCreateUser(User user) {
        Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
        if(userOptional.isEmpty())
            return userRepository.save(user);
        else
            return null;
    }

    public void deleteUserById(Long id) throws NotFoundException {
        var user = findById(id);
        userRepository.delete(user);
    }


    public List<User> getAllUsers() {
        var result = new ArrayList<User>();
        userRepository.findAll().forEach(result::add);
        return result;
    }
}
