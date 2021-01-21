package ru.vsu.Peredachka.controller;

import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.vsu.Peredachka.data.dto.MsgDto;

@ControllerAdvice
public class ExceptionHandlerController {
    @ExceptionHandler(NotFoundException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @CrossOrigin
    public MsgDto runtimeExceptionHandler(NotFoundException e) {
        return new MsgDto(e.getMessage());
    }
}
