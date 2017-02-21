from django.db import models
import datetime

class Product(models.Model):
	is_index = models.IntegerField(default=0)
	type1 = models.CharField(max_length=32,blank=True,null=True)
	type1_ch = models.CharField(max_length=64,blank=True,null=True)
	type2 = models.CharField(max_length=32,blank=True,null=True)
	type2_ch = models.CharField(max_length=64,blank=True,null=True)
	type3 = models.CharField(max_length=32,blank=True,null=True)
	type3_ch = models.CharField(max_length=64,blank=True,null=True)
	style = models.CharField(max_length=32,blank=True,null=True)
	style_ch = models.CharField(max_length=64,blank=True,null=True)
	gender = models.CharField(max_length=32,blank=True,null=True)
	gender_ch = models.CharField(max_length=64,blank=True,null=True)
	price = models.CharField(max_length=32)
	price_ch = models.CharField(max_length=32,blank=True,null=True)
	name = models.CharField(max_length=128)
	name_ch = models.CharField(max_length=256,blank=True,null=True)
	function = models.TextField()
	function_ch = models.TextField(blank=True,null=True)
	url = models.CharField(max_length=256,blank=True,null=True)
	is_show = models.IntegerField(default=1)
	img1 = models.CharField(max_length=100,blank=True,null=True)
	img2 = models.CharField(max_length=100,blank=True,null=True)
	img3 = models.CharField(max_length=100,blank=True,null=True)
	img4 = models.CharField(max_length=100,blank=True,null=True)
	img5 = models.CharField(max_length=100,blank=True,null=True)
	img6 = models.CharField(max_length=100,blank=True,null=True)
	img7 = models.CharField(max_length=100,blank=True,null=True)
	img8 = models.CharField(max_length=100,blank=True,null=True)
	img9 = models.CharField(max_length=100,blank=True,null=True)
	img10 = models.CharField(max_length=100,blank=True,null=True)
	tech1 = models.CharField(max_length=100,blank=True,null=True)
	tech2 = models.CharField(max_length=100,blank=True,null=True)
	tech3 = models.CharField(max_length=100,blank=True,null=True)
	tech4 = models.CharField(max_length=100,blank=True,null=True)
	tech5 = models.CharField(max_length=100,blank=True,null=True)
	tech6 = models.CharField(max_length=100,blank=True,null=True)
	tech7 = models.CharField(max_length=100,blank=True,null=True)
	tech8 = models.CharField(max_length=100,blank=True,null=True)
	tech9 = models.CharField(max_length=100,blank=True,null=True)
	tech10 = models.CharField(max_length=100,blank=True,null=True)
	color1 = models.CharField(max_length=100,blank=True,null=True)
	color1_name = models.CharField(max_length=100,blank=True,null=True)
	color2 = models.CharField(max_length=100,blank=True,null=True)
	color2_name = models.CharField(max_length=100,blank=True,null=True)
	color3 = models.CharField(max_length=100,blank=True,null=True)
	color3_name = models.CharField(max_length=100,blank=True,null=True)
	color4 = models.CharField(max_length=100,blank=True,null=True)
	color4_name = models.CharField(max_length=100,blank=True,null=True)
	color5 = models.CharField(max_length=100,blank=True,null=True)
	color5_name = models.CharField(max_length=100,blank=True,null=True)
	color6 = models.CharField(max_length=100,blank=True,null=True)
	color6_name = models.CharField(max_length=100,blank=True,null=True)
	color7 = models.CharField(max_length=100,blank=True,null=True)
	color7_name = models.CharField(max_length=100,blank=True,null=True)
	color8 = models.CharField(max_length=100,blank=True,null=True)
	color8_name = models.CharField(max_length=100,blank=True,null=True)
	color9 = models.CharField(max_length=100,blank=True,null=True)
	color9_name = models.CharField(max_length=100,blank=True,null=True)
	color10 = models.CharField(max_length=100,blank=True,null=True)
	color10_name = models.CharField(max_length=100,blank=True,null=True)
	def __unicode__(self):
		return self.name

class Comment(models.Model):
	product_id = models.IntegerField()
	user_id = models.IntegerField()
	rate = models.IntegerField()
	up = models.IntegerField(default=0)
	down = models.IntegerField(default=0)
	content = models.TextField()
	is_show = models.IntegerField(default=1)
	date = models.DateTimeField(blank=True,default=datetime.datetime.now().date())
	def __unicode__(self):
		return self.content

class User(models.Model):
	name = models.CharField(max_length=128)
	mail = models.CharField(max_length=128)
	password = models.CharField(max_length=128)
	weibo = models.CharField(max_length=128,blank=True,null=True)
	gender = models.IntegerField(blank=True,null=True)
	phone = models.CharField(max_length=32,blank=True,null=True)
	tel = models.CharField(max_length=32,blank=True,null=True)
	year = models.IntegerField(blank=True,null=True)
	month = models.IntegerField(blank=True,null=True)
	day = models.IntegerField(blank=True,null=True)
	avatar = models.CharField(max_length=128,blank=True,null=True,default='/static/images/avatar.png')
	def __unicode__(self):
		return self.name

class Color(models.Model):
	color1 = models.CharField(max_length=100,blank=True,null=True)
	color2 = models.CharField(max_length=100,blank=True,null=True)
	color3 = models.CharField(max_length=100,blank=True,null=True)
	color4 = models.CharField(max_length=100,blank=True,null=True)
	color5 = models.CharField(max_length=100,blank=True,null=True)
	color6 = models.CharField(max_length=100,blank=True,null=True)
	color7 = models.CharField(max_length=100,blank=True,null=True)
	color8 = models.CharField(max_length=100,blank=True,null=True)
	color9 = models.CharField(max_length=100,blank=True,null=True)
	color10 = models.CharField(max_length=100,blank=True,null=True)
	color11 = models.CharField(max_length=100,blank=True,null=True)
	color12 = models.CharField(max_length=100,blank=True,null=True)
	color13 = models.CharField(max_length=100,blank=True,null=True)
	color14 = models.CharField(max_length=100,blank=True,null=True)
	color15 = models.CharField(max_length=100,blank=True,null=True)
	color16 = models.CharField(max_length=100,blank=True,null=True)
	color17 = models.CharField(max_length=100,blank=True,null=True)
	color18 = models.CharField(max_length=100,blank=True,null=True)
	color19 = models.CharField(max_length=100,blank=True,null=True)
	color20 = models.CharField(max_length=100,blank=True,null=True)

class Tech(models.Model):
	tech1 = models.CharField(max_length=100,blank=True,null=True)
	tech1_ch = models.CharField(max_length=100,blank=True,null=True)
	tech2 = models.CharField(max_length=100,blank=True,null=True)
	tech2_ch = models.CharField(max_length=100,blank=True,null=True)
	tech3 = models.CharField(max_length=100,blank=True,null=True)
	tech3_ch = models.CharField(max_length=100,blank=True,null=True)
	tech4 = models.CharField(max_length=100,blank=True,null=True)
	tech4_ch = models.CharField(max_length=100,blank=True,null=True)
	tech5 = models.CharField(max_length=100,blank=True,null=True)
	tech5_ch = models.CharField(max_length=100,blank=True,null=True)
	tech6 = models.CharField(max_length=100,blank=True,null=True)
	tech6_ch = models.CharField(max_length=100,blank=True,null=True)
	tech7 = models.CharField(max_length=100,blank=True,null=True)
	tech7_ch = models.CharField(max_length=100,blank=True,null=True)
	tech8 = models.CharField(max_length=100,blank=True,null=True)
	tech8_ch = models.CharField(max_length=100,blank=True,null=True)
	tech9 = models.CharField(max_length=100,blank=True,null=True)
	tech9_ch = models.CharField(max_length=100,blank=True,null=True)
	tech10 = models.CharField(max_length=100,blank=True,null=True)
	tech10_ch = models.CharField(max_length=100,blank=True,null=True)
	tech11 = models.CharField(max_length=100,blank=True,null=True)
	tech11_ch = models.CharField(max_length=100,blank=True,null=True)
	tech12 = models.CharField(max_length=100,blank=True,null=True)
	tech12_ch = models.CharField(max_length=100,blank=True,null=True)
	tech13 = models.CharField(max_length=100,blank=True,null=True)
	tech13_ch = models.CharField(max_length=100,blank=True,null=True)
	tech14 = models.CharField(max_length=100,blank=True,null=True)
	tech14_ch = models.CharField(max_length=100,blank=True,null=True)
	tech15 = models.CharField(max_length=100,blank=True,null=True)
	tech15_ch = models.CharField(max_length=100,blank=True,null=True)
	tech16 = models.CharField(max_length=100,blank=True,null=True)
	tech16_ch = models.CharField(max_length=100,blank=True,null=True)
	tech17 = models.CharField(max_length=100,blank=True,null=True)
	tech17_ch = models.CharField(max_length=100,blank=True,null=True)
	tech18 = models.CharField(max_length=100,blank=True,null=True)
	tech18_ch = models.CharField(max_length=100,blank=True,null=True)
	tech19 = models.CharField(max_length=100,blank=True,null=True)
	tech19_ch = models.CharField(max_length=100,blank=True,null=True)
	tech20 = models.CharField(max_length=100,blank=True,null=True)
	tech20_ch = models.CharField(max_length=100,blank=True,null=True)

class Slide(models.Model):
	img1 = models.CharField(max_length=100,blank=True,null=True)
	img1_des = models.CharField(max_length=100,blank=True,null=True)
	img1_des_ch = models.CharField(max_length=100,blank=True,null=True)
	img2 = models.CharField(max_length=100,blank=True,null=True)
	img2_des = models.CharField(max_length=100,blank=True,null=True)
	img2_des_ch = models.CharField(max_length=100,blank=True,null=True)
	img3 = models.CharField(max_length=100,blank=True,null=True)
	img3_des = models.CharField(max_length=100,blank=True,null=True)
	img3_des_ch = models.CharField(max_length=100,blank=True,null=True)
	img4 = models.CharField(max_length=100,blank=True,null=True)
	img4_des = models.CharField(max_length=100,blank=True,null=True)
	img4_des_ch = models.CharField(max_length=100,blank=True,null=True)
	img5 = models.CharField(max_length=100,blank=True,null=True)
	img5_des = models.CharField(max_length=100,blank=True,null=True)
	img5_des_ch = models.CharField(max_length=100,blank=True,null=True)
	img6 = models.CharField(max_length=100,blank=True,null=True)
	img6_des = models.CharField(max_length=100,blank=True,null=True)
	img6_des_ch = models.CharField(max_length=100,blank=True,null=True)

class Indexproduct(models.Model):
	pro1 = models.IntegerField()
	pro2 = models.IntegerField()
	pro3 = models.IntegerField()
	pro4 = models.IntegerField()
	pro5 = models.IntegerField()
	pro6 = models.IntegerField()
	pro7 = models.IntegerField()
	pro8 = models.IntegerField()

class Recomment(models.Model):
	pro1 = models.IntegerField()
	pro2 = models.IntegerField()
	pro3 = models.IntegerField()
	pro4 = models.IntegerField()

class Promotion(models.Model):
	img1 = models.CharField(max_length=100,blank=True,null=True)
	img2 = models.CharField(max_length=100,blank=True,null=True)
	img3 = models.CharField(max_length=100,blank=True,null=True)
	img4 = models.CharField(max_length=100,blank=True,null=True)
	img5 = models.CharField(max_length=100,blank=True,null=True)
	img6 = models.CharField(max_length=100,blank=True,null=True)
	img7 = models.CharField(max_length=100,blank=True,null=True)
	img8 = models.CharField(max_length=100,blank=True,null=True)
	activity1_title = models.CharField(max_length=256,blank=True,null=True)
	activity1_content = models.TextField(blank=True,null=True)
	activity1_title_ch = models.CharField(max_length=256,blank=True,null=True)
	activity1_content_ch = models.TextField(blank=True,null=True)
	activity2_title = models.CharField(max_length=256,blank=True,null=True)
	activity2_content = models.TextField(blank=True,null=True)
	activity2_title_ch = models.CharField(max_length=256,blank=True,null=True)
	activity2_content_ch = models.TextField(blank=True,null=True)
	activity3_title = models.CharField(max_length=256,blank=True,null=True)
	activity3_content = models.TextField(blank=True,null=True)
	activity3_title_ch = models.CharField(max_length=256,blank=True,null=True)
	activity3_content_ch = models.TextField(blank=True,null=True)
	public1_title = models.CharField(max_length=256,blank=True,null=True)
	public1_content = models.TextField(blank=True,null=True)
	public1_title_ch = models.CharField(max_length=256,blank=True,null=True)
	public1_content_ch = models.TextField(blank=True,null=True)
	public2_title = models.CharField(max_length=256,blank=True,null=True)
	public2_content = models.TextField(blank=True,null=True)
	public2_title_ch = models.CharField(max_length=256,blank=True,null=True)
	public2_content_ch = models.TextField(blank=True,null=True)

class Out(models.Model):
	name = models.CharField(max_length=128)
	phone = models.CharField(max_length=128)
	address = models.CharField(max_length=128)
	def __unicode__(self):
		return self.name

class Gift(models.Model):
    ownerid = models.CharField(max_length=128)
    name = models.CharField(max_length=64,blank=True,null=True)
    phone = models.CharField(max_length=64,blank=True,null=True)
    year = models.CharField(max_length=64,blank=True,null=True)
    month = models.CharField(max_length=64,blank=True,null=True)
    guest1 = models.CharField(max_length=64,blank=True,null=True)
    guest2 = models.CharField(max_length=64,blank=True,null=True)
    guest3 = models.CharField(max_length=64,blank=True,null=True)
    guest4 = models.CharField(max_length=64,blank=True,null=True)
    guest5 = models.CharField(max_length=64,blank=True,null=True)
    share = models.IntegerField(default=0)
    def __unicode__(self):
        return self.ownerid

class project1(models.Model):
    name = models.CharField(max_length=64,blank=True,null=True)
    phone = models.CharField(max_length=64,blank=True,null=True)
    img = models.CharField(max_length=64,blank=True,null=True)
    date = models.DateTimeField(blank=True,default=datetime.datetime.now())
    def __unicode__(self):
        return self.name

class project2(models.Model):
    name = models.CharField(max_length=64,blank=True,null=True)
    phone = models.CharField(max_length=64,blank=True,null=True)
    code = models.CharField(max_length=64,blank=True,null=True)
    date = models.DateTimeField(blank=True,default=datetime.datetime.now())
    def __unicode__(self):
        return self.name

class Subangdai(models.Model):
    ownerid = models.CharField(max_length=128)
    name = models.CharField(max_length=64,blank=True,null=True)
    phone = models.CharField(max_length=64,blank=True,null=True)
    guest1 = models.CharField(max_length=64,blank=True,null=True)
    guest2 = models.CharField(max_length=64,blank=True,null=True)
    guest3 = models.CharField(max_length=64,blank=True,null=True)
    guest4 = models.CharField(max_length=64,blank=True,null=True)
    guest5 = models.CharField(max_length=64,blank=True,null=True)
    share = models.IntegerField(default=0)
    def __unicode__(self):
        return self.ownerid

class Hyundai1(models.Model):
    name = models.CharField(max_length=64,blank=True,null=True)
    phone = models.CharField(max_length=64,blank=True,null=True)
    word = models.CharField(max_length=64,blank=True,null=True)
    date = models.DateTimeField(blank=True,default=datetime.datetime.now())
    def __unicode__(self):
        return self.name

class Hyundai2(models.Model):
    num1 = models.IntegerField()
    num2 = models.IntegerField()
    w1 = models.IntegerField(default=0)
    w2 = models.IntegerField(default=0)
    w3 = models.IntegerField(default=0)
    w4 = models.IntegerField(default=0)
    w5 = models.IntegerField(default=0)
    w6 = models.IntegerField(default=0)
    w7 = models.IntegerField(default=0)
    w8 = models.IntegerField(default=0)
    w9 = models.IntegerField(default=0)
    w10 = models.IntegerField(default=0)
    w11 = models.IntegerField(default=0)
    w12 = models.IntegerField(default=0)
    w13 = models.IntegerField(default=0)

class Hyundai3(models.Model):
    id1  = models.CharField(max_length=64,blank=True,null=True)
    date = models.DateTimeField(blank=True,default=datetime.datetime.now())
    def __unicode__(self):
        return self.id1

class Hyundai4(models.Model):
    title = models.CharField(max_length=64,blank=True,null=True)
    author = models.CharField(max_length=64,blank=True,null=True)
    content = models.TextField(blank=True,null=True)
    fav = models.IntegerField(default=0)
    date = models.DateTimeField(blank=True,default=datetime.datetime.now())
    def __unicode__(self):
        return self.title

class Hyundai5(models.Model):
    name = models.CharField(max_length=64,blank=True,null=True)
    phone = models.CharField(max_length=64,blank=True,null=True)
    article = models.CharField(max_length=64,blank=True,null=True)
    openid = models.CharField(max_length=64,blank=True,null=True)
    date = models.DateTimeField(blank=True,default=datetime.datetime.now())
    def __unicode__(self):
        return self.name

class Hyundai6(models.Model):
    num1 = models.IntegerField()
    num2 = models.IntegerField()

class Hyundai7(models.Model):
    article = models.CharField(max_length=64,blank=True,null=True)
    openid = models.CharField(max_length=64,blank=True,null=True)
    date = models.DateTimeField(blank=True,default=datetime.datetime.now())

class Hyundai8(models.Model):
    num1 = models.IntegerField()

class Hyundai9(models.Model):
    article_id = models.IntegerField()
    prize = models.IntegerField()
    def __unicode__(self):
        return str(self.article_id)

class Hyundai10(models.Model):
    article_id = models.IntegerField()
    article_name = models.CharField(max_length=128,blank=True,null=True)
    name = models.CharField(max_length=64,blank=True,null=True)
    prize = models.IntegerField()
    def __unicode__(self):
        return self.article_name




