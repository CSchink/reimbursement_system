import frontcontroller.FrontController;
import io.javalin.Javalin;

public class MainDriver {

    public static void main(String[] args){

        Javalin app = Javalin.create(javalinConfig -> {
            javalinConfig.addStaticFiles("/html");
            javalinConfig.addStaticFiles("/javascript");
            javalinConfig.addStaticFiles("/css");
            javalinConfig.addSinglePageRoot("/", "/html/index.html");
            javalinConfig.enableCorsForOrigin("http://localhost:63342/");
        }).start(9001);
        FrontController fc = new FrontController(app);

        }
}

