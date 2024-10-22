This project is done by devendarsaiteja

I have created the following endpoints

1. /leads
2. /campaigns
3. /report/pdf
4. /report/csv
5. /alerts

steps to run the assignment

1.  move to the working directory: /ezymetrics/backend/
2.  install the required dependencies using "npm install"
    3)run the server using command "nodemon server.js"
3.  open the postman to send requests to the server

             1) use get request to send "http://localhost:5000/api/leads"

                         This will send a list of objects as response

                         example output
                             [{
                                 "_id": "67168f485fdf8713020883b6",
                                 "lead_id": 1,
                                 "name": "Leanne Graham",
                                 "email": "Sincere@april.biz",
                                 "status": "Interested",
                                 "__v": 0
                             },]


             2) use get request to send "http://localhost:5000/api/campaigns"

                         This will fetch and store campaigns data into local mongodb

                         example output

                                 {
                                     "message": "Campaigns fetched and stored successfully!"
                                 }

             3) use get request to send "http://localhost:5000/api/report/pdf"

                         This will download the report in pdf format and this pdf will be stored in the directory named report : backend/report

             4) use get request to send "http://localhost:5000/api/report/csv"

                         This will display fetched data as follows

                             "$__","$isNew","_doc"
                             "{""activePaths"":{""paths"":{""_id"":""init"",""lead_id"":""init"",""name"":""init"",""email"":""init"",""status"":""init"",""__v"":""init""},""states"":{""init"":{""_id"":true,""lead_id"":true,""name"":true,""email"":true,""status"":true,""__v"":true}}},""skipId"":true}",false,"{""_id"":""67168f485fdf8713020883b6"",""lead_id"":1,""name"":""Leanne Graham"",""email"":""Sincere@april.biz"",""status"":""Interested"",""__v"":0}"

             5) use get request to send "http://localhost:5000/api/alerts"

                             This will send email alert to specified sender.
                     Note: ensure you replace your mail credentials in the file named alertController.js located at /backend/controllers/alertController.js
