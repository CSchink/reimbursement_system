# Reimbursement System for Revature

The Expense Reimbursement System (ERS) will manage the process of reimbursing employees for expenses incurred while on company time. All employees in the company can login and submit requests for reimbursement and view their past tickets and pending requests. Finance managers can log in and view all reimbursement requests and past history for all employees in the company. Finance managers are authorized to approve and deny requests for expense reimbursement. 

## Technologies Used

* Java - version 8
* JavaScript
* HTML
* CSS
* Javalin
* AWS RDS

## Features

* Sleek User Interface.
* Approve or deny multiple reimbursements at once.
* Employees can submit reimbursements, specifying the type and the amount.
* Employees can see all of their reimbursements and whether they're approved, pending or denied.

## Usage

Upon startup you will see the login screen.

![image](https://user-images.githubusercontent.com/45950072/115905626-58342880-a434-11eb-806f-ad53b5566111.png)

Login as an employee using:

* username: user1
* password: 1234

Now you will see the employee dashboard.  You will be able to create a new reimbursement:

![image](https://user-images.githubusercontent.com/45950072/116256664-638f9880-a741-11eb-990a-3bfe29143e71.png)

You will also be able to see all of the reimbursements you submitted and their current status:

![image](https://user-images.githubusercontent.com/45950072/116256767-7d30e000-a741-11eb-82f3-99f595f99691.png)

Now, login as an adminsitrator using the following credentials:

* username: admin
* password: 1234

Now you may approve or deny those reimbursements.  As you can see, you may select multiple reimbursements (as long as they are pending).

![image](https://user-images.githubusercontent.com/45950072/116256977-a81b3400-a741-11eb-82c8-876c0ead56f4.png)



## Getting Started

1. Open git bash in your desired directory and run the command git clone https://github.com/CSchink/reimbursement_system.git
2. Set up an account with AWS RDS
3. Download and install DBeaver
4. Connect AWS RDS with DBeaver
5. Set up a new database in Dbeaver
6. Right-click on the newly created database and select a new SQL script
7. Navigate to the SQL file in the newly cloned reimbursement_system file and:
* Copy and paste file into the new DBeaver SQL script
* Right-click and select "run" to initialize tables
* Remember usernames and passwords for logging into the application
9. Store database login credentials in your system environment variables as:
* Project_One_DB_URL: [AWS_RDS_url]
* Project_One_DB_username: [DBeaver username]
* Project_One_DB_password: [AWS_RDS password]
10. Open up the newly cloned reimbursement_system file in Intellij and run MainDriver.java
11. Navigate to http://localhost:9001/

## License
This project uses the MIT license.
