package Model;

public class Reimbursement {

    private int reimbId;
    private Double reimbAmount;
    private String submitted;
    private String resolved;
    private String description;
    private String author;
    private String username;
    private int authorId;
    private int resolverId;
    private int statusId;
    private int typeId;

    public Reimbursement() {

    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    /**
     *
     * @param reimbId
     * @param reimbAmount
     * @param submitted
     * @param resolved
     * @param description
     * @param authorId
     * @param resolverId
     * @param statusId
     * @param typeId
     */

    public Reimbursement(int reimbId, Double reimbAmount, String submitted, String resolved, String description, int authorId, int resolverId, int statusId, int typeId) {
        this.reimbId = reimbId;
        this.reimbAmount = reimbAmount;
        this.submitted = submitted;
        this.resolved = resolved;
        this.description = description;
        this.authorId = authorId;
        this.resolverId = resolverId;
        this.statusId = statusId;
        this.typeId = typeId;
    }

    /**
     *
     * @param reimbId
     * @param reimbAmount
     * @param description
     * @param authorId
     * @param resolverId
     * @param statusId
     * @param typeId
     */

    public Reimbursement(int reimbId, Double reimbAmount, int authorId, int statusId, int typeId) {
        this.reimbId = reimbId;
        this.reimbAmount = reimbAmount;
        this.authorId = authorId;
        this.statusId = statusId;
        this.typeId = typeId;
    }


    /**
     *
     * @param reimbId
     * @param reimbAmount
     * @param submitted
     * @param authorId
     * @param statusId
     * @param typeId
     */
    public Reimbursement(int reimbId, Double reimbAmount, String submitted, int authorId, int statusId, int typeId) {
        this.reimbId = reimbId;
        this.reimbAmount = reimbAmount;
        this.submitted = submitted;
        this.authorId = authorId;
        this.statusId = statusId;
        this.typeId = typeId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Reimbursement(int reimbId, Double reimbAmount, String submitted, String resolved, int authorId, int statusId, int typeId) {
        this.reimbId = reimbId;
        this.reimbAmount = reimbAmount;
        this.submitted = submitted;
        this.resolved = resolved;
        this.authorId = authorId;
        this.statusId = statusId;
        this.typeId = typeId;
    }

    public Reimbursement(int reimbId, Double reimbAmount, String submitted, String resolved, int authorId, String author, int statusId, int typeId) {
        this.reimbId = reimbId;
        this.reimbAmount = reimbAmount;
        this.submitted = submitted;
        this.resolved = resolved;
        this.authorId = authorId;
        this.author = author;
        this.statusId = statusId;
        this.typeId = typeId;
    }
    public Reimbursement(int reimbId, Double reimbAmount, String submitted, String resolved, int authorId, String author, String user, int statusId, int typeId) {
        this.reimbId = reimbId;
        this.reimbAmount = reimbAmount;
        this.submitted = submitted;
        this.resolved = resolved;
        this.authorId = authorId;
        this.author = author;
        this.username = user;
        this.statusId = statusId;
        this.typeId = typeId;
    }

    public int getReimbId() {
        return reimbId;
    }

    public void setReimbId(int reimbId) {
        this.reimbId = reimbId;
    }

    public Double getReimbAmount() {
        return reimbAmount;
    }

    public void setReimbAmount(Double reimbAmount) {
        this.reimbAmount = reimbAmount;
    }

    public String getSubmitted() {
        return submitted;
    }

    public void setSubmitted(String submitted) {
        this.submitted = submitted;
    }

    public String getResolved() {
        return resolved;
    }

    public void setResolved(String resolved) {
        this.resolved = resolved;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public int getResolverId() {
        return resolverId;
    }

    public void setResolverId(int resolverId) {
        this.resolverId = resolverId;
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }
}
