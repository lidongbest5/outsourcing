from django.db import models
import datetime

class User(models.Model):
    phone = models.CharField(max_length=128)
    password = models.CharField(max_length=128)
    def __unicode__(self):
        return self.phone

class Deal(models.Model):
	name = models.CharField(max_length=256)
	img = models.CharField(max_length=128,blank=True,null=True)
	price = models.IntegerField()
	time = models.CharField(max_length=56,blank=True,null=True)
	hard = models.IntegerField(blank=True,null=True)
	tool = models.CharField(max_length=128,blank=True,null=True)
	story = models.TextField(blank=True,null=True)
	material = models.TextField(blank=True,null=True)
	recipe = models.TextField(blank=True,null=True)
	dealType = models.IntegerField(blank=True,null=True)
	extra = models.IntegerField(blank=True,null=True)
	date = models.DateTimeField(blank=True)
	order = models.IntegerField()
	count = models.IntegerField(default=1)

class Address(models.Model):
	userid = models.IntegerField()
	district = models.CharField(max_length=128)	
	address = models.TextField()
	postcode = models.CharField(max_length=128)
	name = models.CharField(max_length=128)
	phone = models.CharField(max_length=128)
	default = models.IntegerField()

class Order(models.Model):
	userid = models.IntegerField()
	transactionid = models.CharField(max_length=128)
	price = models.IntegerField()
	paid = models.IntegerField()
	date = models.DateTimeField(blank=True)

class Transaction(models.Model):
	transactionid = models.CharField(max_length=128)
	itemid = models.IntegerField()
	count = models.IntegerField()

class Slide(models.Model):
	num = models.IntegerField(default=4)
	slide1 = models.CharField(max_length=256,blank=True,null=True)
	slide2 = models.CharField(max_length=256,blank=True,null=True)
	slide3 = models.CharField(max_length=256,blank=True,null=True)
	slide4 = models.CharField(max_length=256,blank=True,null=True)
	slide5 = models.CharField(max_length=256,blank=True,null=True)
	slide6 = models.CharField(max_length=256,blank=True,null=True)
	slide7 = models.CharField(max_length=256,blank=True,null=True)
	slide8 = models.CharField(max_length=256,blank=True,null=True)
	slide9 = models.CharField(max_length=256,blank=True,null=True)
	slide10 = models.CharField(max_length=256,blank=True,null=True)

class Blog(models.Model):
	title = models.CharField(max_length=256,blank=True,null=True)
	date = models.DateTimeField(blank=True,null=True)
	content = models.TextField(blank=True,null=True)

class Coupon(models.Model):
	couponid = models.CharField(max_length=128,blank=True,null=True)
	phone = models.CharField(max_length=128)
	price = models.IntegerField()
	used = models.IntegerField()	

class Tip(models.Model):
	desc = models.TextField(blank=True,null=True)
