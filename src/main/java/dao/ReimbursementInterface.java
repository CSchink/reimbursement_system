package dao;

import Model.Reimbursement;
import Model.Employee;

import java.util.ArrayList;
import java.util.Map;

public interface ReimbursementInterface {

    public static ArrayList<Reimbursement> getAll(){
        return null;
    };

    public static Map<Employee, Reimbursement> get(String status){
        return null;
    };

    public static boolean approveOrDeny(int userId, int resolveId){
        return false;
    };

    public static boolean insert(Reimbursement reimbursement){
        return false;
    };

    public static ArrayList<Reimbursement> getAllByStatus(int status){
        return null;
    };
}
