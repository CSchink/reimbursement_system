package Model;

public class ReimbursementStatus {

    private int statusId;
    private int reimbStatus;

    public ReimbursementStatus(){

    }

    public ReimbursementStatus(int statusId, int reimbStatus) {
        this.statusId = statusId;
        this.reimbStatus = reimbStatus;
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public int getReimbStatus() {
        return reimbStatus;
    }

    public void setReimbStatus(int reimbStatus) {
        this.reimbStatus = reimbStatus;
    }
}
