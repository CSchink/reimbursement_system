package dao;

import Model.Reimbursement;

import java.sql.*;
import java.util.ArrayList;

public class ReimbursementImpl {

    public static String url = System.getenv("Project_One_DB_URL");
    public static String username = System.getenv("Project_One_DB_username");
    public static String confirmation = System.getenv("Project_One_DB_password");


    public static ArrayList<Reimbursement> getAll(){

                    ArrayList<Reimbursement> results = new ArrayList<>();
                    Reimbursement temp = null;

                    try (Connection conn = DriverManager.getConnection(url, username, confirmation)) {

                        String sql = "SELECT ers_users.user_first_name, ers_users.user_last_name, ers_users.ers_username, *\n" +
                                "FROM ers_reimbursement\n" +
                                "INNER JOIN ers_users ON ers_users.ers_users_id = ers_reimbursement.reimb_author";

                        PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);


                        ResultSet rs = ps.executeQuery(); // executeQUERY not executeUpdate


                        while(rs.next()){
                            temp = new Reimbursement(rs.getInt("reimb_id"),
                                    rs.getDouble("reimb_amount"),
                                    rs.getDate("reimb_submitted").toString(),
                                    rs.getString("reimb_resolved"),
                                    rs.getInt("reimb_author"),
                                    rs.getString("user_first_name") + " " + rs.getString("user_last_name"),
                                    rs.getString("ers_username"),
                                    rs.getInt("reimb_status_id"),
                                    rs.getInt("reimb_type_id")
                );

                results.add(temp);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return results;
    }

    public static ArrayList<Reimbursement> getAllByStatus(int status){
        ArrayList<Reimbursement> results = new ArrayList<>();
        Reimbursement temp = null;
        try (Connection conn = DriverManager.getConnection(url, username, confirmation)) {

            String sql = "SELECT * FROM ers_reimbursement WHERE reimb_status_id = ?";

            PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            ps.setInt(1, status);

            ResultSet rs = ps.executeQuery(); // executeQUERY not executeUpdate

            while(rs.next()){
                if(status == 1){
                    temp = new Reimbursement(rs.getInt("reimb_id"),
                            rs.getDouble("reimb_amount"),
                            rs.getDate("reimb_submitted").toString(),
                            rs.getDate("reimb_resolved").toString(),
                            rs.getInt("reimb_author"),
                            rs.getInt("reimb_status_id"),
                            rs.getInt("reimb_type_id")
                    );

                    results.add(temp);
                }
                else {
                    temp = new Reimbursement(rs.getInt("reimb_id"),
                            rs.getDouble("reimb_amount"),
                            rs.getDate("reimb_submitted").toString(),
                            rs.getDate("reimb_resolved").toString(),
                            rs.getInt("reimb_author"),
                            rs.getInt("reimb_status_id"),
                            rs.getInt("reimb_type_id")
                    );
                    results.add(temp);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return results;
    }

    /**
     *
     * @param status
     * @param user
     * @return
     */

    public static ArrayList<Reimbursement> getAllByStatus(int status, String user){
        ArrayList<Reimbursement> results = new ArrayList<>();
        Reimbursement temp = null;
        try (Connection conn = DriverManager.getConnection(url, username, confirmation)) {

            String sql = "SELECT * \n" +
                    "FROM ers_reimbursement \n" +
                    "INNER JOIN ers_users ON ers_reimbursement.reimb_author = ers_users.ers_users_id WHERE ers_users.ers_username = ? AND ers_reimbursement.reimb_status_id = ?";

            PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user);
            ps.setInt(2, status);

            ResultSet rs = ps.executeQuery(); // executeQUERY not executeUpdate
            while(rs.next()){
                temp = new Reimbursement(rs.getInt("reimb_id"),
                        rs.getDouble("reimb_amount"),
                        rs.getDate("reimb_submitted").toString(),
                        rs.getInt("reimb_author"),
                        rs.getInt("reimb_status_id"),
                        rs.getInt("reimb_type_id")
                );
                results.add(temp);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return results;
    }


    /**
     * Utilizes an inner join to return an ArrayList of Reimbursement objects
     * based on a unique username.
     * @param user
     * @return
     */

    public static ArrayList<Reimbursement> get(String user) {

        ArrayList<Reimbursement> results = new ArrayList<>();
        Reimbursement temp = null;
        try (Connection conn = DriverManager.getConnection(url, username, confirmation)) {

            String sql = "SELECT * \n" +
                    "FROM ers_reimbursement \n" +
                    "INNER JOIN ers_users ON ers_reimbursement.reimb_author = ers_users.ers_users_id WHERE ers_users.ers_username = ?";

            PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, user);

            ResultSet rs = ps.executeQuery(); // executeQUERY not executeUpdate
            while(rs.next()){

                    temp = new Reimbursement(rs.getInt("reimb_id"),
                            rs.getDouble("reimb_amount"),
                            rs.getDate("reimb_submitted").toString(),
                            rs.getString("reimb_resolved"),
                            rs.getInt("reimb_author"),
                            rs.getInt("reimb_status_id"),
                            rs.getInt("reimb_type_id")
                    );

                results.add(temp);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }catch(NullPointerException e){
            System.out.println(e);
        }
        return results;

    }


    public static boolean approveOrDeny(int userId, int resolveId, int reimbId) {
        try (Connection conn = DriverManager.getConnection(url, username, confirmation)) {

            String sql = "UPDATE ers_reimbursement SET reimb_resolved = CURRENT_TIMESTAMP, reimb_status_id = ?, reimb_resolver = ? WHERE reimb_id = ?";

            PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            ps.setInt(1, resolveId);
            ps.setInt(2, userId);
            ps.setInt(3, reimbId);
            int rs = ps.executeUpdate(); // executeQUERY not executeUpdate
            if(rs > 0){
                System.out.println(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * Takes a reimbursement as a parameter and inserts NULL values for RESOLVED, RECEIPT AND RESOLVER
     * @param reimbursement
     * @return
     */


    public static boolean insert(Reimbursement reimbursement) {
//        int reimbId = reimbursement.getReimbId();
        Double reimbAmount = reimbursement.getReimbAmount();
        int author = reimbursement.getAuthorId();
        int status = reimbursement.getStatusId();
        int type = reimbursement.getTypeId();

        try (Connection conn = DriverManager.getConnection(url, username, confirmation)) {

            String sql = "INSERT INTO ers_reimbursement VALUES(?, CURRENT_TIMESTAMP, NULL, NULL, ?, NULL, ?, ? )";

            PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

//            ps.setInt(1, reimbId);
            ps.setDouble(1, reimbAmount);
            ps.setInt(2, author);
            ps.setInt(3, status);
            ps.setInt(4, type);


            int rs = ps.executeUpdate(); // executeQUERY not executeUpdate
            if(rs > 0){
                System.out.println("Insert is working");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }


}
