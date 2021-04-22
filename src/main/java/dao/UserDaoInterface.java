package dao;



import Model.Reimbursement;
import Model.Employee;

import java.util.ArrayList;
import java.util.Map;

public interface UserDaoInterface {

    public ArrayList<Employee> getAll();

    public Map<Employee, Reimbursement> get();

}
