package controller;


import dao.ReimbursementImpl;
import Model.Employee;
import Model.Reimbursement;
import io.javalin.http.Context;

import java.util.ArrayList;

import static dao.ReimbursementImpl.*;
import static dao.UserInterfaceImpl.find;
import static dao.UserInterfaceImpl.getId;


public class EmployeeController {

    public static void getAllReimbursementsByStatus(Context context){
        String user = context.header("user");
        int status = Integer.parseInt(context.header("status"));
        ArrayList<Reimbursement> results = ReimbursementImpl.getAllByStatus(status, user);
        context.json(results);
    }

    public static void addNewReimbursement(Context context){
        System.out.println("Working");
        String[] results = context.body().split(",");

        for(String i : results){
            System.out.println(i);
        }

        int id = getId(results[1]);
        Reimbursement m =new Reimbursement(
                Integer.parseInt(results[4]),
                Double.parseDouble(results[3]),
                id,
                Integer.parseInt(results[4]),
                Integer.parseInt(results[2])
                );

        insert(m);
        context.result("Success");
    }

    public static void getUserReimbursements(Context context){
        if(context.sessionAttribute("authToken") != null){
            System.out.println("Authorized");
        } else {
            System.out.println("unauthorized");
        }
        String user = context.header("user");

        ArrayList<Reimbursement> results = get(user);
        context.json(results);
    }

    public static void login(Context context){

//        System.out.println(context.body());
//        System.out.println(context.json(context.body()));
//        int startIndex = 0;
//        int lastIndex = context.body().indexOf(",");
//        String user = context.body().substring(startIndex, lastIndex);
//
//        startIndex = lastIndex + 1;
//        lastIndex = context.body().length();
//        String password = context.body().substring(startIndex, lastIndex);
//        System.out.println(user);
//
//        System.out.println(password);

            String user = context.formParam("user");
            System.out.println(user);
            String password = context.formParam("password");
            System.out.println(password);
            Employee n = find(user, password);

            if(n != null && n.getRole_id() == 1){
                context.result(n.getUsername());
                context.sessionAttribute("authToken", "employee");
                context.redirect("employee.html");
            } else if(n != null && n.getRole_id() == 2){
                context.sessionAttribute("authToken", "admin");
               context.redirect("admin.html");
            } else {
                context.redirect("/");
            }
    }

    public static void logout(Context context){
        System.out.println("Here we are");
        context.sessionAttribute("authToken", null);
        context.redirect("/");
    }
}
