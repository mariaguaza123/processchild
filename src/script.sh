curl -X GET "http://localhost:8080/info"

artillery quick --count 10 -n 50 "http://localhost:8080/info" > result_bloq.txt
