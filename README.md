**How to Run the Code:**

**Step 1: Unzip the File**
•	Locate the compressed file and unzip it using your preferred file extraction software.

**How to Run the Code:**

Step 1: Unzip the File
•	Locate the compressed file and unzip it using your preferred file extraction software.

Step 2: Set Up the PostgreSQL Database
•	Ensure PostgreSQL is installed and running on your system.
•	Open a terminal or command prompt.
•	Access PostgreSQL command line by typing:

o	psql -U postgres

•	This command logs you into the PostgreSQL interactive terminal with the default 'postgres' user.

•	Create a new user with the following command:

o	CREATE ROLE me WITH LOGIN PASSWORD 'password';

•	Create a new database named 'UIH' and assign ownership to the user 'me':

o	CREATE DATABASE UIH OWNER me;

•	This command creates a new database named 'UIH' and sets 'me' as its owner.

Step 3: Set Up Tables
•	Locate the SQL file for creating tables. It should be within the “dbms_proj” folder.

•	In the terminal or command prompt, navigate to the folder containing the SQL file using the cd command:

o	cd path/to/dbms_proj

•	Run the SQL file in the PostgreSQL command line to create tables within the 'UIH' database:

o	psql -U me -d UIH -a -f dbexport.sql

•	Replace “dbexport.sql” with the actual name of your SQL file containing table creation queries.

Step 4: Run the Node Server for Backend
•	Open your terminal or command prompt.
•	Navigate to the 'dbms_proj' directory using the cd command:

o	cd path/to/dbms_proj

•	Run the Node server by executing:

o	node server2.js

•	This command will start the server and listen for incoming connections.

Step 5: Start the UI
•	Open a new terminal window or tab.
•	Navigate to the 'ui_health' directory within the project using the cd command:

o	cd path/to/ui_health

•	Run the following command to start the UI application:

o	npm start

•	This command will initiate the UI application.

Step 6: Access the Application
•	Open a web browser.
•	Enter the appropriate URL(http://localhost:3006) or IP address and port number to access the application. 
(Note: admin login credentials username :admin, password: admin)

You should end up with the below page,

 

  
 

  
   

 
![Uploading image.png…]()

•	Ensure PostgreSQL is installed and running on your system.
•	Open a terminal or command prompt.
•	Access PostgreSQL command line by typing:

o	psql -U postgres

•	This command logs you into the PostgreSQL interactive terminal with the default 'postgres' user.

•	Create a new user with the following command:

o	CREATE ROLE me WITH LOGIN PASSWORD 'password';

•	Create a new database named 'UIH' and assign ownership to the user 'me':

o	CREATE DATABASE UIH OWNER me;

•	This command creates a new database named 'UIH' and sets 'me' as its owner.

Step 3: Set Up Tables
•	Locate the SQL file for creating tables. It should be within the “dbms_proj” folder.

•	In the terminal or command prompt, navigate to the folder containing the SQL file using the cd command:

o	cd path/to/dbms_proj

•	Run the SQL file in the PostgreSQL command line to create tables within the 'UIH' database:

o	psql -U me -d UIH -a -f dbexport.sql

•	Replace “dbexport.sql” with the actual name of your SQL file containing table creation queries.

Step 4: Run the Node Server for Backend
•	Open your terminal or command prompt.
•	Navigate to the 'dbms_proj' directory using the cd command:

o	cd path/to/dbms_proj

•	Run the Node server by executing:

o	node server2.js

•	This command will start the server and listen for incoming connections.

Step 5: Start the UI
•	Open a new terminal window or tab.
•	Navigate to the 'ui_health' directory within the project using the cd command:

o	cd path/to/ui_health

•	Run the following command to start the UI application:

o	npm start

•	This command will initiate the UI application.

Step 6: Access the Application
•	Open a web browser.
•	Enter the appropriate URL(http://localhost:3006) or IP address and port number to access the application. 
(Note: admin login credentials username :admin, password: admin)

You should end up with the below page,

 

  
 

  
   

 
![image](https://github.com/hemaalatha-nk/final_480_project/assets/143139368/08423d0f-b44c-475d-97e5-8c3f89546570)
