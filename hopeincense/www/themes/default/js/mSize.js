// JavaScript Document
/*
*自动缩略图
*mSize(图形对象，欲缩放的最大宽度，最大高度)
*/
function mSize(ImgD, width_s, height_s) {
	var image = new Image();
	image.src = ImgD.src;
	if (image.width > 0 && image.height > 0) {
		flag = true;
		if (image.width / image.height >= width_s / height_s) {
			if (image.width > width_s) {
				ImgD.width = width_s;
				ImgD.height = (image.height * width_s) / image.width;
			} else {
				ImgD.width = image.width;
				ImgD.height = image.height;
			}
		}
		else {
			if (image.height > height_s) {
				ImgD.height = height_s;
				ImgD.width = (image.width * height_s) / image.height;
			} else {
				ImgD.width = image.width;
				ImgD.height = image.height;
			}
		}
	}
	else {
		ImgD.src = "";
		ImgD.alt = "";
	}
}

