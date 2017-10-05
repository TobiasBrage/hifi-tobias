<?php
if ($_POST["imgUploadPost"]) {
    $imgLabel = $_POST["imgUploadPost"];
}
$allowedExtsImg = array("gif", "jpeg", "jpg", "png");
$tempImg = explode(".", $_FILES["file"]["name"]);
$extensionImg = end($tempImg);
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 200000)
&& in_array($extensionImg, $allowedExtsImg)) {
    if ($_FILES["file"]["error"] > 0) {
        echo "imageError";
    } else {
        $filenameImg = $imgLabel.$_FILES["file"]["name"];
        if (file_exists("../image/" . $filenameImg)) {
            echo "imageExcists";
        } else {
            move_uploaded_file($_FILES["file"]["tmp_name"], "../image/" . $filenameImg);
            echo $_FILES["file"]["name"];
        }
    }
} else {
    echo "imageInvalid";
}
?>