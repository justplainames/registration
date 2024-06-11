package com.myproject.backendSpringboot.model;

public class UserDTO {
    String user_name;
    String user_email;
    String user_instagram;
    String user_phone_number;

    public UserDTO(){
    }

    public UserDTO(String user_name, String user_email, String user_instagram, String user_phone_number) {
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_instagram = user_instagram;
        this.user_phone_number = user_phone_number;
    }

    public String getUser_name() {
        return user_name;
    }

    public String getUser_email() {
        return user_email;
    }

    public String getUser_instagram() {
        return user_instagram;
    }

    public String getUser_phone_number() {
        return user_phone_number;
    }
}
