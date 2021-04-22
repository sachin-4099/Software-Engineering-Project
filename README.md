# Introduction
In a survey, it was found that 58% of the population in India would spend money
on an electronic device rather than investing it.What if you could save money
while you’re spending it? Hence, the purpose of developing this application is to
enable users to save money with every transaction. Our mission is to look after
the financial best interests of the up-and-coming, beginning with the empower-
ing step of micro-investing. This application aims to provide financial security
to the users with the help of spare changes that they neglect and thus, every
purchase can become an investment with Round-Ups. It will directly impact
the teenagers who cannot control their expenditure. Through this, we aim to
promote financial literacy by emphasizing the importance of saving money and
investing it early.

# Project Description
## Motivation
When it comes to savings and investment as a teenager with an inconsistent
source of income, micro-investing turns out to be a viable option. A micro-
investing platform is an application that allows users to regularly save small
sums of money. Micro-investing platforms aim to remove traditional barriers to
investing, such as brokerage account minimums, and encourage people to invest
even if they have limited incomes and assets.

## Use Case

Gullak finds use in all phases of life. Our product is useful to teenagers in schools
and colleges with limited income as well as to working professionals with fixed
salaries. Through our application, users can save money on any payment that
is done online. Along with this, users can refer our blog page for content on
financial educational.

## Technology and Hardware Specification

Software Tools:

Database Server:PostgreSQL
Client:Any Web Browser
Frameworks:ReactJS, Flask
Development Tools:Sublime Text, PyCharm, Postman
Programming Languages:Python, JavaScript, HTML/CSS
Deployment:Our Application will be deployable on:

Linux Server
Windows Server
Hardware Specification:

Processor:Intel Core i
RAM:4 GB
Hard Disk:512 GB
2.4 Advantages

Provides financial literacy to users through our wiki pages
Upstreams the notion of financial liberty at a young age
Invests spare changes and is thus accessible to a user base with inconsistent
income
Helps users monitor and curb their expenditure
Reduces stress caused due to unwanted expenditure
An all in one and hassle-free integrated platform for savings and invest-
ments
## Limitations

Security of payments is dependent on third-party
Payment on e-commerce websites is not available in the initial version
## Challenges

Inertia of users from other payment platforms like Google Pay and PhonePe
can be challenging
Initially, the number of partner merchants will be less, so the operations
will be limited to them only
# Requirements

## Functional Requirements

Users must have a valid User ID and password to login thus creating their
individual profiles
Users can transfer money to their contacts through UPI IDs
Users can transfer money to their own accounts by linking multiple bank
accounts with our application
Users can view their transaction history
Users can view their expenditures and savings across multiple categories
along with their total expenditures and total savings
Users can customize the saving percentage of each category
Users can raise support tickets for transaction related queries
Users can edit their account details
Users can invite their friends in exchange for some incentives
Only the admin can register new partner stores
## Non Functional Requirements

With great service and minimum downtime, we aim to provide a seamless
user experience
We ensure wide scalability of our service to serve a large volume of cus-
tomers
Payments made through our application are redirected to a UPI platform
that has a 256 SSL security layer
We are strong advocates of Data Confidentiality and data shared with us
by users will adhere to privacy norms
4 Software Design

## ER Diagram

ER Diagram stands for Entity Relationship Diagram. It is a diagram that
displays the relationship of entity sets stored in a database. In other words,
ER diagrams help to explain the logical structure of databases. ER diagrams
are created based on three basic concepts: entities, attributes and relationships.

## Data Flow Diagram

Data Flow Diagram graphically represents the functions, or processes, which
capture, manipulate, store, and distribute data between a system and its envi-
ronment and between components of a system. The visual representation makes
it a good communication tool between User and System designer. Structure of
a DFD allows starting from a broad overview and expand it to a hierarchy of
detailed diagrams.

## Use Case Diagram

A use case diagram is the primary form of system/software requirements for a
new software program underdeveloped. Use cases specify the expected behavior
(what), and not the exact method of making it happen (how). Use cases once
specified can be denoted using both textual and visual representation (i.e. use
case diagram). A key concept of use case modeling is that it helps us design a
system from the end user’s perspective. It is an effective technique for commu-
nicating system behavior in the user’s terms by specifying all externally visible
system behavior.

## Model

For the software development process we employed the Agile-Waterfall Hybrid
method. This method involves tight integration and continuous collaboration
between Waterfall and Agile departments and teams from product concept
through validation and production. It enables efficient collaboration, and a
better adaptation to changing requirements. We prepared all the necessary
documentation like ER diagram, Data Flow model and Use case model in a sin-
gle sprint and after that started the coding process. The web application was
developed according to the SRS document. After the initial development, we
employed the agile methodology principles and improved the web application
iteratively adding new features and fixing bugs.

# Implementation

## Registration

Frontend: Users get registered after properly filling all the required details
given below:

First Name: Users must fill in their first name
Last Name: Users must fill in their last name
Username: Users must fill in a valid E-mail ID
Password: User’s password must satisfy the minimum rules in order to
ensure a strong and safe password
Phone Number: Users must fill in a valid Phone Number
UPI ID: Users must fill in a valid UPI ID
Referral Code: Users can earn some incentives, if they have a valid referral
code

Backend: After the user fills the registration form, the data is sent to the
back-end server using a post request through RESTful API. The request body
of the API is sanitised for malicious inputs. The data is queries in the database
to see if the user already exists as a user or admin. If so, then it is notified to
the frontend, which displays an appropriate message to the user. Otherwise the
data is updated in the database. Success response with response HTTP code
200, is sent to the front-end in async manner. In case there is some issue in
updating the database, response code 504 with Database Operation Exception
is sent to the front-end where it is handled accordingly.

## Login

Frontend:

Registered users can login using the username and password
Users will have the facility to change their password in case they forget
using the ”Forgot Password” feature
Figure 5: Login
Backend: When an existing user comes to the login page, the form data is
sent to the backend server using a post request through RESTful API. The
request is sanitized for malicious input after which we check in the database if
the user exists or not. If the user exists then a suitable response along with its
designation and userid is sent to the frontend, which logs the user in and stores
the userid in the session cookie. The session cookie is persistent throughout the
session.

## Payment

Frontend: Payments can be made either to a registered merchant or known
contacts.
Payment to Merchants:

Merchant Name: Name of the merchant can be selected from a drop-down
menu
Amount: User must enter the amount to be paid to the merchant
Category: User must select the category to which the transaction belongs
Savings: Depending on the saving percentage corresponding to the cate-
gory, some amount will be saved in the wallet
Coupon Name: Name of the coupon can be selected from a drop-down
menu depending on the merchant chosen
Coupon Code: Automatically corresponding to the selected coupon, the
code gets reflected


Payee Phone Number: User must enter the phone number of the person
to whom the amount is to be paid
Amount: User must enter the amount to be paid to the merchant
Category: User must select the category to which the transaction belongs
Savings: Depending on the saving percentage corresponding to the cate-
gory, some amount will be saved in the wallet

Backend: Payments are done to either associated merchants for their prod-
ucts or to known contacts. In either case, the user fills in the form. In case
of payments to a merchant, the list of merchant is fetched in real time from
the database through a GET request along with the coupons offered by that
merchant. New coupons are also checked for validity and authenticity. In case
of payments to known contacts, the phone number is used to identify a user and
prevent payments to bogus users and frauds. After the form is filled the data

is sent to the backend server through a POST request and is sanitized for mali-
cious inputs. After that, an order id is generated and the transaction is stored
in the database with CREATED status. In response, the frontend is sent all the
details about that transaction. Refer to API documentation for more informa-
tion. The user is displayed a confirm payment screen on the frontend side after
which he is redirected to the payment screen. Once the payment is done, the
frontend sends the orderId, payment signature, razorpay payment id and success
of transaction to the backend server for validation and further process. The pay-
ment signature is SHA-256 encrypted using public and private key algorithm.
On successful verification of the signature, actual payment which the user was
supposed to pay to the merchant is initiated from our side. It is async process
and in the later stage of application will be run as a batch job through crons
applications. In the initial stage, it is done for each payment. This completes
the payment flow and the user is displayed with successful payment notification.

Figure 8: Payment Flow
## Transaction History

Frontend:User can view all the below details corresponding to any transaction
done on the app in the ”Transaction History” tab of the User Dashboard:

Transaction ID: User can choose any Transaction Id from the drop-down
menu.
Corresponding to the selected Transaction ID user can view:

Paid To: To whom the amount was paid (Merchant/User name), if the
status is successful
Amount: How much amount was paid, if the status is successful
Transaction Time: When did the transaction occur
Status: Whether the transaction was successful or not
Figure 9: Transaction History
Backend:All the transactions are stored in the database with corresponding
transactions states. When an order id corresponding to a transaction is gener-
ated, the transaction is in CREATED state. After that it goes to in-progress
when the user starts payment on the razorpay client. Once the payment is suc-
cessful from the user’s side and the payment signature is verified by the backend,
the transaction is marked compeleted. In any case, the payment is failed or the
signature is invalid, the payment is marked failed and a query can be raised
against that.

## Expenditures and Savings

Frontend:User can view all the expenditures and savings corresponding to any
successful transaction done on the app in the ”Expenditures” and ”Savings” tabs
of the User Dashboard respectively:

Transaction ID: User can choose any Transaction Id from the drop-down
menu Corresponding to the selected Transaction ID user can view:
Category: Mentions the category to which the transaction belongs
Savings/Expenditure: How much amount was saved/spent
Transaction Time: When did the transaction occur
Figure 10: Expenditures
Figure 11: Savings
Backend:As all the transactions are stored in the database, the corrosponding
expenditure and savings are also stored. To display how much the user has saved
or how much did he spend in each category, the database is queries and results
are sent to the front-end. The frontend then displays the data in a pictoical
form.

## Raise Support Tickets

Frontend:User can raise support tickets corresponding to any transaction:

Transaction ID: User can choose any Transaction Id from the drop-down
menu from all the transactions made on the app
Query Message: User must enter the query describing the issue
Figure 12: Raise Query
In the ”Queries” tab of the user dashboard:

Transaction ID: User can choose any Transaction Id from the drop-down
menu corresponding to which a query was made
Query Message: User will be able to view the query message along with
the status of the query
Figure 13: View Query
Backend:When a transaction is created, in case of any conflicts, the user can
raise a query against it. After filling the query form, the data is sent to the
backend in form of a POST request. The data, after sanitisation, is updated in
the Database and is sent to our support team with the help of a cron job. All
the updates on a query are updated in the database and displayed to the user
in real time. Once a query is marked resolved, it is removed from the database
by a cron cleanup job.

## Edit Preferences

Frontend:User can edit:

Saving percentage for any category
Locking Period
Figure 14: Edit Preferences
Backend:User can edit various parts of his profile, like the locking period and
saving percentage for any category as per his choice. Once the user fills the
details on the webapp, the request is sent to the backend as a put request and
after sanitisation of input, the database is updated.

## Onboard New Partners

We follow the common onboarding procedure for new merchant partners. When
there is a new merchant partner, his account is created on razorpay and details
are updated in the database. After which any payment done by a user to that
merchant are successfully triggered.

# Testing

Testing is a very important component of software development process. To
test our application end to end, we initiated several automated workflows with
dummy data and monitored the logs on the backend server. We also wrote
several unit test cases to test the backend apis and created dummy server to
mock the front end. The unit test cases comprised of testing both ends of
payment flow along with the different input which can be given to the front end.
All test cases are passed and the automated workflows give expected results.

# Future Works

Our application is in phase 1 and there are still a lot of improvements that needs
to be done. In our future works we plan to do the following:

Improve the latency of application by using load balancer
Improve response time by running second payment flow as a batch job
using crons
Integrate the investing model which was part of phase 2
Use kubernetes cluster for auto scaling to handle high traffic
Improve UI design and dashboard interface
