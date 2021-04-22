package frontcontroller;

import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.UnauthorizedResponse;

public class FrontController {

    Javalin app;
    Dispatcher dispatcher;

    public FrontController(Javalin app){
        this.app = app;

        app.before("/employee/*", FrontController::checkAllRequests);
        app.before("/admin/*", FrontController::checkAllRequests);
        app.before("/admin/*", FrontController::checkAuthority);
        dispatcher = new Dispatcher(app);
    }

    public static void checkAllRequests(Context context){

        if(context.sessionAttribute("authToken") == null){
            context.redirect("http://localhost:9001/");
        }
    }

    public static void checkAuthority(Context context){
        if(!context.sessionAttribute("authToken").equals("admin")){
            System.out.println("Bad boiy");
            context.redirect("http://localhost:9001/html/index.html");
        }
    }
}
