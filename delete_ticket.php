<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Content-type: application/json");
    header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

    include 'connection.php';

    $json = file_get_contents("php://input");
    $received_data = json_decode($json);

    $response = array();
    $data = array();
    
    $id = $received_data->idid;
    $stats = "unavailable";
    mysqli_query($conn,"UPDATE ticket SET status = '$stats' WHERE id='$id'");

  
    

    $response = array(
        "message" => "Data Deleted"
    );

    echo json_encode($response);

    $conn->close();



    


?>