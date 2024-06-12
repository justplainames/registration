//package com.myproject.backendSpringboot.config;
//
//import com.myproject.backendSpringboot.repository.UserRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DataLoader implements CommandLineRunner {
//    @Override
//    public void run(String... args) throws Exception{
//        System.out.println("Hello!");
//    }
//
//    @Bean
//    public CommandLineRunner demo(UserRepository repository){
//        return(args) -> {
//            repository.findAll().forEach(customer -> {
//                System.out.println(customer.toString());
//            });
//        };
//    }
//}
