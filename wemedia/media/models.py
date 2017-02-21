from django.db import models
import datetime

class RootUser(models.Model):
    name = models.CharField(max_length=128)
    mail = models.EmailField()
    password = models.CharField(max_length=128)
    validate = models.IntegerField(default=0)
    def __unicode__(self):
        return self.name

class MediaUser(models.Model):
    wechat = models.CharField(max_length=64)
    name = models.CharField(max_length=128)
    mail = models.EmailField()
    password = models.CharField(max_length=128)
    account = models.CharField(max_length=128)
    mediatype = models.CharField(max_length=128,blank=True,null=True)
    mediapeople = models.TextField(blank=True,null=True)
    mediaattribute = models.TextField(blank=True,null=True)
    desc = models.TextField(blank=True,null=True)
    fans = models.CharField(max_length=128,blank=True,null=True)
    social = models.CharField(max_length=128,blank=True,null=True)
    validate = models.IntegerField(default=0)
    bank = models.CharField(max_length=128,blank=True,null=True)
    bankname = models.CharField(max_length=128,blank=True,null=True)
    banknumber = models.CharField(max_length=128,blank=True,null=True)
    def __unicode__(self):
        return self.name

class Form(models.Model):
    wechat = models.CharField(max_length=64)
    name = models.CharField(max_length=128,blank=True,null=True)
    custom = models.CharField(max_length=128,blank=True,null=True)
    account = models.CharField(max_length=128,blank=True,null=True)
    project = models.CharField(max_length=128,blank=True,null=True)
    type1 = models.IntegerField(blank=True,null=True)
    type2 = models.IntegerField(blank=True,null=True)
    type3 = models.IntegerField(blank=True,null=True)
    type4 = models.IntegerField(blank=True,null=True)
    type5 = models.IntegerField(blank=True,null=True)
    type6 = models.IntegerField(blank=True,null=True)
    type7 = models.IntegerField(blank=True,null=True)
    bankinfo = models.CharField(max_length=128,blank=True,null=True)
    banknumber = models.CharField(max_length=128,blank=True,null=True)
    count = models.CharField(max_length=128,blank=True,null=True)
    executetime = models.DateTimeField(blank=True,null=True)
    executestatus = models.IntegerField(blank=True,null=True)
    submitstatus = models.IntegerField(blank=True,null=True)
    comment = models.IntegerField(blank=True,null=True)
    backtime = models.DateTimeField(blank=True,null=True)
    img = models.CharField(max_length=128,blank=True,null=True)
    def __unicode__(self):
        return self.name

