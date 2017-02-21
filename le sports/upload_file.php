<?php
    function drawText($im, $string){
        $draw = new ImagickDraw();
        $draw->setFillColor(new ImagickPixel('#536b83'));
        $draw->setFont('font/font.ttf');
        $draw->setFontSize(20);
        $metrix = $im->queryFontMetrics($draw, $string);
        $draw->annotation(0,20,$string);
        $im->newImage($metrix['textWidth'],36, new ImagickPixel('white'));
        $im->drawImage($draw);
    }

    function autoRotateImage($image) {
        $orientation = $image->getImageOrientation();

        switch($orientation) {
            case imagick::ORIENTATION_BOTTOMRIGHT:
                $image->rotateimage("#000", 180); // rotate 180 degrees
                break;

            case imagick::ORIENTATION_RIGHTTOP:
                $image->rotateimage("#000", 90); // rotate 90 degrees CW
                break;

            case imagick::ORIENTATION_LEFTBOTTOM:
                $image->rotateimage("#000", -90); // rotate 90 degrees CCW
                break;
        }

        // Now that it's auto-rotated, make sure the EXIF data is correct in case the EXIF gets saved with the image!
        $image->setImageOrientation(imagick::ORIENTATION_TOPLEFT);
    }

    if( $_FILES["file"]["type"] == "image/gif" ){
        $type = ".gif";
    }
    else if($_FILES["file"]["type"] == "image/png"){
        $type = ".png";
    }
    else{
        $type = ".jpg";
    }
    $time = $_POST["time"];

    move_uploaded_file($_FILES["file"]["tmp_name"],"images/upload/".$_POST["id"].'_'.$time.$type);

    $new = new Imagick("images/upload/".$_POST["id"].'_'.$time.$type);
    autoRotateImage($new);
    $new->writeImage("images/upload/".$_POST["id"].'_'.$time.$type);

    $name = $_POST["name"];

    $logo = new Imagick("images/upload/".$_POST["id"].'_'.$time.$type);
    $logo->thumbnailImage(116,145,false);
    $logo->roundCorners(10,10);
    $logo->writeImage("images/upload/".$_POST["id"].'_'.$time."_thumb.png");

    $back = new Imagick();
    $back->newImage( 451, 275, new ImagickPixel('transparent') );
    $card = new Imagick("images/card.png");
    $photo = new Imagick("images/upload/".$_POST["id"].'_'.$time."_thumb.png");

    $titleBlock = new Imagick();

    drawText($titleBlock, $name);

    $back->compositeImage($card, imagick::COMPOSITE_OVER, 0, 0 );
    $back->compositeImage($photo, imagick::COMPOSITE_OVER, 62, 89 );
    $back->compositeImage($titleBlock, imagick::COMPOSITE_OVER, 188, 210 );
    $back->writeImage("images/upload/".$_POST["id"].'_'.$time."_card.png");

    echo "images/upload/".$_POST["id"].'_'.$time.$type;
?>
