package frontcontroller;

import dao.ReimbursementImpl;
import dao.UserInterfaceImpl;
import controller.EmployeeController;
import controller.ManagerController;
import io.javalin.Javalin;

import static io.javalin.apibuilder.ApiBuilder.*;


public class Dispatcher {


    public Dispatcher(Javalin app){


        UserInterfaceImpl n = new UserInterfaceImpl();
        ReimbursementImpl r = new ReimbursementImpl();

        setUpEmployeePaths(app);

        app.get("/hello", context -> context.result("hello world"));
        app.get("/reimb-getter", (context) -> context.json(r.getAll()));
        app.get("/json-getter", (context) -> context.json(n.getAll()));
        app.get("/html-getter", context -> context.html("<html></html>"));

    }

    public static void setUpEmployeePaths(Javalin app){
        app.routes(() ->{
            path("/login", ()->{
              post(EmployeeController::login);
              patch(EmployeeController::logout);
            });
            path("/employee/reimbursements", ()->{
                get(EmployeeController::getUserReimbursements);
                post(EmployeeController::addNewReimbursement);
                path(":index", ()->{
                    get(EmployeeController::getAllReimbursementsByStatus);
                });
            });
            path("/admin/reimbursements", ()->{
                get(ManagerController::getAllReimbursements);
                patch(ManagerController::updateReimbursementByStatus);
                path(":index", ()->{
                    get(EmployeeController::getAllReimbursementsByStatus);
                });
            });
        });

    }
}
