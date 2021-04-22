package controller;

import Model.Reimbursement;
import Model.ReimbursementStatus;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.http.Context;

import java.util.ArrayList;
import java.util.List;

import static dao.ReimbursementImpl.*;
import static dao.UserInterfaceImpl.*;

public class ManagerController {

    public static void getEmployeeReimbursementsByStatus(Context context){
        int status = Integer.parseInt(context.body());
        ArrayList<Reimbursement> results = getAllByStatus(status);
        context.json(results);
    }

    public static void getReimbursementsByStatus(Context context){
        int status = Integer.parseInt(context.body());
        ArrayList<Reimbursement> results = getAllByStatus(status);
        context.json(results);
    }

    public static void getAllReimbursements(Context context){
        ArrayList<Reimbursement> results = getAll();

        context.json(results);
    }

    public static void updateReimbursementByStatus(Context context) throws JsonProcessingException {

        String user = context.header("user");

        int id = getId(user);

        ObjectMapper mapper = new ObjectMapper();
        String json = context.body();

        List<ReimbursementStatus> results = mapper.readValue(json, new TypeReference<List<ReimbursementStatus>>() {});

        for(ReimbursementStatus rs : results){

            int statusId = rs.getStatusId();
            int reimbId = rs.getReimbStatus();

            approveOrDeny(2, statusId, reimbId);
        }


    }
}
