package com.myproject.backendSpringboot.model;

import java.util.HashMap;
import java.util.List;

public class UsersCategoriesMapDTO {
    private HashMap<Integer, List<UsersCategoriesDTO>> eventsMap;

    public UsersCategoriesMapDTO(){
        this.eventsMap = new HashMap<>();
    }

    public UsersCategoriesMapDTO(HashMap<Integer, List<UsersCategoriesDTO>> eventsMap) {
        this.eventsMap = eventsMap;
    }

    public HashMap<Integer, List<UsersCategoriesDTO>> getEventsMap() {
        return eventsMap;
    }
}
