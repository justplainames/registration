package com.myproject.backendSpringboot.model;

public class UpdateUser {
    String user_name;
    String user_email;
    String user_instagram;
    String user_phone_number;

    public UpdateUser() {
    }

    public UpdateUser(String user_name, String user_email, String user_instagram, String user_phone_number) {
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_instagram = user_instagram;
        this.user_phone_number = user_phone_number;
    }


}
