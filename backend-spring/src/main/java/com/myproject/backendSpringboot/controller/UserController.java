package com.myproject.backendSpringboot.controller;

import com.myproject.backendSpringboot.model.*;
import com.myproject.backendSpringboot.repository.CategoriesRepository;
import com.myproject.backendSpringboot.repository.EventsRepository;
import com.myproject.backendSpringboot.repository.UserRepository;
import com.myproject.backendSpringboot.repository.UsersCategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.*;
//
//
//import javax.servlet.http.HttpServletRequest;
//
@RestController
@RequestMapping(path="api")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UsersCategoriesRepository usersCategoriesRepository;
    @Autowired
    private EventsRepository eventsRepository;
    @Autowired
    private CategoriesRepository categoriesRepository;

    @GetMapping("/public")
    public String publicEndpoint() {
        return "This is a public endpoint.";
    }

    @GetMapping("/profile/getInfo")
    public UserDTO getInfo(@AuthenticationPrincipal Jwt jwt){
        String userId = jwt.getClaim("sub");
        User user = userRepository.findById(userId).get();
        UserDTO toReturn = new UserDTO(user.getName(), user.getUser_email(), user.getUser_instagram(), user.getUser_phone_number());
        System.out.printf("Name: %s, Email: %s, Instagram: %s, Phone Number: %s",
                toReturn.getUser_name(),
                user.getUser_email(),
                user.getUser_instagram(),
                user.getUser_phone_number());
        return toReturn;
    }

    @GetMapping("/profile/getEvents")
    public UsersCategoriesMapDTO getEvents(@AuthenticationPrincipal Jwt jwt){
        String userId = jwt.getClaim("sub");
        List<UsersCategories> usersCategories = usersCategoriesRepository.findByUserIdFk(userId);
        HashMap<Integer, List<UsersCategoriesDTO>> groupedEvents = new HashMap<>();
        for (UsersCategories joinedCategory : usersCategories) {
            Categories categories = categoriesRepository.findById(joinedCategory.getCategory_id_fk()).get();
            UsersCategoriesDTO toAdd = new UsersCategoriesDTO(
                    joinedCategory.getId(),
                    joinedCategory.getUser_id_fk(),
                    joinedCategory.getCategory_id_fk(),
                    joinedCategory.getCreatedAt(),
                    joinedCategory.getUpdatedAt(),
                    joinedCategory.getTotal_score(),
                    joinedCategory.getEvent_id_fk(),
                    joinedCategory.getOrder(),
                    joinedCategory.getStage_name(),
                    joinedCategory.getEvent_id_fk(),
                    categories.getCategory_name()
            );
            if (!groupedEvents.containsKey(joinedCategory.getEvent_id_fk())) {
                List<UsersCategoriesDTO> categoryList = new ArrayList<>();
                categoryList.add(toAdd);
                groupedEvents.put(joinedCategory.getEvent_id_fk(), categoryList);
            } else {
                groupedEvents.get(joinedCategory.getEvent_id_fk()).add(toAdd);
            }
        }

        UsersCategoriesMapDTO test = new UsersCategoriesMapDTO(groupedEvents);
        System.out.println(groupedEvents);
        return test;
    }

    @PutMapping("/profile/updateInfo")
    public String postInfo(@AuthenticationPrincipal Jwt jwt, @RequestBody UserDTO userDTO){
        String userId = jwt.getClaim("sub");

        User toUpdate = userRepository.findById(userId).get();
        toUpdate.setUser_name(userDTO.getUser_name());
        toUpdate.setUser_email(userDTO.getUser_email());
        toUpdate.setUser_instagram(userDTO.getUser_instagram());
        toUpdate.setUser_phone_number(userDTO.getUser_phone_number());
        toUpdate.setUpdatedAt(LocalDateTime.now());
        userRepository.save(toUpdate);
        return HttpStatus.ACCEPTED.toString();
    }


}