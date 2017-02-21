from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.db import connection
from edco.models import *
from django.db.models import Q
import datetime
import time
from django import forms
from django.utils import simplejson as json
import os
import hashlib
import Image as image
from DjangoCaptcha import Captcha
import random
from django import forms

class RegForm(forms.Form):
    mail = forms.EmailField(required=True)
    pwd = forms.CharField(max_length=32,min_length=8,required=True)
    repwd = forms.CharField(max_length=32,min_length=8,required=True)
    code = forms.IntegerField(required=True)

class LoginForm(forms.Form):
    mail = forms.EmailField(required=True)
    pwd = forms.CharField(max_length=32,min_length=8,required=True)

class pwdForm(forms.Form):
    nowpwd = forms.CharField(max_length=32,min_length=8,required=True)
    newpwd = forms.CharField(max_length=32,min_length=8,required=True)
    repwd = forms.CharField(max_length=32,min_length=8,required=True)

def out(request):
    name = request.POST.get('name')
    phone = request.POST.get('phone')
    address = request.POST.get('address')
    if name == None:
        name = 'null'
    if phone == None:
        name = 'null'
    if address == None:
        address = 'null'
    p = Out(name=name,phone=phone,address=address)
    p.save()
    return render_to_response('out.html')

def setGiftBox(request):
    wxOpenId = request.GET.get('wxOpenId')
    callback = request.GET.get('callback')
    data = Gift.objects.filter(ownerid=wxOpenId)
    if data.count() == 0:
        p = Gift(ownerid=wxOpenId)
        p.save()
    data = Gift.objects.get(ownerid=wxOpenId).id
    return HttpResponse( str(callback) + '(' + str(data) + ')' )

def getGiftBox(request):
    boxId = request.GET.get('boxId')
    callback = request.GET.get('callback')
    data = Gift.objects.get(id=boxId)
    return HttpResponse( str(callback) + '(' + json.dumps({"boxId":data.id,"ownerid":data.ownerid,"guest1":data.guest1,"guest2":data.guest2,"guest3":data.guest3,"guest4":data.guest4,"guest5":data.guest5}) + ')' )

def updateGiftBox(request):
    boxId = request.GET.get('boxId')
    index = request.GET.get('index')
    index = int(index)
    wxOpenId = request.GET.get('wxOpenId')
    callback = request.GET.get('callback')
    if index == 1:
        Gift.objects.filter(id=boxId).update(guest1=wxOpenId)
    elif index == 2:
        Gift.objects.filter(id=boxId).update(guest2=wxOpenId)
    elif index == 3:
        Gift.objects.filter(id=boxId).update(guest3=wxOpenId)
    elif index == 4:
        Gift.objects.filter(id=boxId).update(guest4=wxOpenId)
    elif index == 5:
        Gift.objects.filter(id=boxId).update(guest5=wxOpenId)
    return HttpResponse( str(callback) + '(1)' )

def setInfo(request):
    boxId = request.GET.get('boxId')
    name = request.GET.get('name')
    phone = request.GET.get('phone')
    year = request.GET.get('year')
    month = request.GET.get('month')
    callback = request.GET.get('callback')
    Gift.objects.filter(id=boxId).update(name=name, phone=phone, year=year, month=month)
    return HttpResponse( str(callback) + '(1)' )

def getGift(request):
    gift = Gift.objects.all().order_by('-name')
    return render_to_response('gift.html',{'gifts': gift})

def updateShare(request):
    boxId = request.GET.get('boxId')
    share_num = int(Gift.objects.get(id=boxId).share) + 1
    Gift.objects.filter(id=boxId).update(share=share_num)
    return HttpResponse('1')

def api1(request):
	name = request.GET['name']
	phone = request.GET['phone']
	img = request.GET['img']
	p = project1(name=name,phone=phone,img=img,date=datetime.datetime.now())
	p.save()
	return HttpResponse('1')

def api2(request):
	name = request.GET['name']
	phone = request.GET['phone']
	code = request.GET['code']
	p = project2(name=name,phone=phone,code=code,date=datetime.datetime.now())
	p.save()
	return HttpResponse('1')

def uStatus(request):
    user = None
    if request.session.get('member_id',False):
        userid = request.session['member_id']
        user = User.objects.get(id=userid)
    return user

def language(request):
    language = None
    if request.session.get('language',False):
        language = request.session['language']
    return language

def setEn(request):
    request.session['language'] = 'english'
    return HttpResponseRedirect(request.META.get('HTTP_REFERER',"/"))

def setCh(request):
    request.session['language'] = 'chinese'
    return HttpResponseRedirect(request.META.get('HTTP_REFERER',"/"))

def index(request):
    slide = Slide.objects.get(id=1)
    indexProduct = Indexproduct.objects.get(id=1)
    items = []
    items.append(Product.objects.get(id=indexProduct.pro1))
    items.append(Product.objects.get(id=indexProduct.pro2))
    items.append(Product.objects.get(id=indexProduct.pro3))
    items.append(Product.objects.get(id=indexProduct.pro4))
    items.append(Product.objects.get(id=indexProduct.pro5))
    items.append(Product.objects.get(id=indexProduct.pro6))
    items.append(Product.objects.get(id=indexProduct.pro7))
    items.append(Product.objects.get(id=indexProduct.pro8))
    return render_to_response('index.html',{"type":"home","items":items,"user":uStatus(request),"language":language(request),"slide":slide,"indexProduct":indexProduct})

def products(request):
    items = Product.objects.order_by('-is_index')[0:16]
    items_count = Product.objects.all().count()
    return render_to_response('products.html',{"type":"products","items":items,"items_count":items_count,"user":uStatus(request),"language":language(request),"page":1,"total":int(items_count/16)+1})

def brandStory(request):
	return render_to_response('brandStory.html',{"type":"brandStory","user":uStatus(request),"language":language(request)})

def culture(request):
	return render_to_response('culture.html',{"type":"culture","user":uStatus(request),"language":language(request)})

def technology(request):
    item = Tech.objects.get(id=1)
    return render_to_response('technology.html',{"type":"technology","user":uStatus(request),"language":language(request),"item":item})

def brandPromotion(request):
	return render_to_response('promotion.html',{"type":"brandPromotion","user":uStatus(request),"language":language(request)})

def contact(request):
	return render_to_response('contact.html',{"type":"contact","user":uStatus(request),"language":language(request)})

def member(request):
    if request.session.get('member_id',False):
        userid = request.session['member_id']
        data = User.objects.get(id=userid)
        return render_to_response('user.html',{"type":"member","data":data,"user":uStatus(request),"language":language(request)})
    else:
        return HttpResponseRedirect('/login/')

def updateMember(request):
    if request.is_ajax():
        name = request.POST.get('name')
        weibo = request.POST.get('weibo')
        phone = request.POST.get('phone')
        tel = request.POST.get('tel')
        gender = request.POST.get('gender')
        year = request.POST.get('year')
        month = request.POST.get('month')
        day = request.POST.get('day')
        uid = request.session['member_id']
        User.objects.filter(id=uid).update(name=name,weibo=weibo,phone=phone,tel=tel,gender=gender,year=year,month=month,day=day)
        return HttpResponse(1)

def changePwd(request):
    if request.session.get('member_id',False):
        return render_to_response('password.html',{"type":"member","user":uStatus(request),"language":language(request)})
    else:
        return HttpResponseRedirect('/login/')

def comment(request):
    if request.session.get('member_id',False):
        items = Comment.objects.filter(user_id=request.session['member_id']).order_by('-id')[0:3]
        items_count = Comment.objects.filter(user_id=request.session['member_id']).count()
        return render_to_response('comment.html',{"type":"member","user":uStatus(request),"language":language(request),"items":items,"page":1,"total":int(items_count/3)+1})
    else:
        return HttpResponseRedirect('/login/')

def pwdValidate(request):
    if request.is_ajax():
        form = pwdForm(request.POST)
        if form.is_valid():
            nowpwd = request.POST.get('nowpwd')
            newpwd = request.POST.get('newpwd')
            repwd = request.POST.get('repwd')
            old = User.objects.get(id=request.session['member_id']).password
            if newpwd == repwd:
                if nowpwd == old:
                    User.objects.filter(id=request.session['member_id']).update(password=newpwd)
                    return HttpResponse(0)
                else:
                    return HttpResponse(2)
            else:
                return HttpResponse(3)
        else:
            return HttpResponse(1)

def changeAvatar(request):
    if request.session.get('member_id',False):
        return render_to_response('avatar.html',{"type":"member","user":uStatus(request),"language":language(request)})
    else:
        return HttpResponseRedirect('/login/')

def setAvatar(request):
    if request.is_ajax():
        avatar = request.POST.get("avatar")
        User.objects.filter(id=request.session['member_id']).update(avatar=avatar)
        return HttpResponse(0)

def login(request):
    if request.session.get('member_id',False):
        return HttpResponseRedirect('/member/')
    else:
        return render_to_response('member.html',{"type":"member","status":"login","error":0,"user":uStatus(request),"language":language(request)})

def loginValidate(request):
    form = LoginForm(request.POST)
    if form.is_valid():
        mail = request.POST.get("mail")
        pwd = request.POST.get("pwd")
        p = User.objects.filter(mail=mail,password=pwd)
        if p:
            request.session['member_id'] = User.objects.get(mail=mail).id
            return HttpResponseRedirect('/member/')
        else:
            return render_to_response('member.html',{"type":"member","status":"login","error":5,"user":uStatus(request),"language":language(request)})
    else:
        return render_to_response('member.html',{"type":"member","status":"login","error":4,"form":form,"user":uStatus(request),"language":language(request)})

def logout(request):
    del request.session['member_id']
    return HttpResponseRedirect('/login/')

def register(request):
    return render_to_response('member.html',{"type":"member","status":"register","error":0,"user":uStatus(request),"language":language(request)})

def search(request):
    if request.method == 'POST':
        query = request.POST.get('query')
        if request.session.get('language',False) and request.session['language'] == 'chinese':
            query_data = Product.objects.filter(name_ch__contains=query).order_by('-is_index')[0:16]
            query_count = Product.objects.filter(name_ch__contains=query).count()
        else:
            query_data = Product.objects.filter(name__contains=query).order_by('-is_index')[0:16]
            query_count = Product.objects.filter(name__contains=query).count()
        return render_to_response('search.html',{"items":query_data,"items_count":query_count,"page":0,"total":int(query_count/16)+1,"language":language(request),"query":query})

def registerValidate(request):  
    form = RegForm(request.POST)
    if form.is_valid():
        pwd = request.POST.get("pwd")
        repwd = request.POST.get("repwd")
        mail = request.POST.get("mail")
        check_result = check(request)
        if pwd != repwd:
            return render_to_response('member.html',{"type":"member","status":"register","error":1,"user":uStatus(request),"language":language(request)})
        elif check_result == False:
            return render_to_response('member.html',{"type":"member","status":"register","error":2,"user":uStatus(request),"language":language(request)})
        else:
            p = User(mail=mail,password=pwd,name=mail)
            p.save()
            request.session['member_id'] = User.objects.get(mail=mail).id
            return HttpResponseRedirect('/member/')
    else:
        return render_to_response('member.html',{"type":"member","status":"register","error":3,"form":form,"user":uStatus(request),"language":language(request)})


def code(request):
    figures = [2,3,4,5,6,7,8,9]
    ca = Captcha(request)
    ca.words = [''.join([str(random.sample(figures,1)[0]) for i in range(0,4)])]
    ca.type = 'word'
    ca.img_width = 100
    ca.img_height = 30
    return ca.display()

def check(request):
    _code = request.POST.get('code')

    ca = Captcha(request)
    if ca.check(_code):
        return True
    else:
        return False

def product(request, offset):
    item = Product.objects.get(id=offset)
    recomment = Recomment.objects.get(id=1)
    rec = []
    rec.append(Product.objects.get(id=recomment.pro1))
    rec.append(Product.objects.get(id=recomment.pro2))
    rec.append(Product.objects.get(id=recomment.pro3))
    rec.append(Product.objects.get(id=recomment.pro4))
    comment_length = Comment.objects.filter(product_id=offset).count()
    comment = Comment.objects.filter(product_id=offset).order_by('-id')[0:3]
    for it in comment:
        it.avatar = User.objects.get(id=it.user_id).avatar
    return render_to_response('product.html',{"type":"products","item":item,"user":uStatus(request),"comment":comment,"comment_length":comment_length,"rec":rec,"language":language(request)})

def getProductList(request):
    if request.is_ajax():
        page = request.POST.get("page")
        type1 = request.POST.get("type1")
        type2 = request.POST.get("type2")
        type3 = request.POST.get("type3")
        style = request.POST.get("style")
        gender = request.POST.get("gender")
        pricelow = request.POST.get("pricelow")
        pricehigh = request.POST.get("pricehigh")
        sql = 'select * from edco_product'
        flag = 0
        if type1 != 'all':
            sql = sql + ' where type1 = "' + type1 + '"'
            flag = 1
        if type2 != 'all':
            if flag == 1:
                sql = sql + ' and type2 = "' + type2 + '"'
            else:
                sql = sql + ' where type2 = "' + type2 + '"'
            flag = 1
        if type3 != 'all':
            if flag == 1:
                sql = sql + ' and type3 = "' + type3 + '"'
            else:
                sql = sql + ' where type3 = "' + type3 + '"'
            flag = 1
        if style != 'all':
            if flag == 1:
                sql = sql + ' and style = "' + style + '"'
            else:
                sql = sql + ' where style = "' + style + '"'
            flag = 1
        if gender != 'all':
            if flag == 1:
                sql = sql + ' and gender = "' + gender + '"'
            else:
                sql = sql + ' where gender = "' + gender + '"'
            flag = 1
        if pricelow != 'all':
            if flag == 1:
                sql = sql + ' and price > ' + pricelow + ' and price < ' + pricehigh
            else:
                sql = sql + ' where price > ' + pricelow + ' and price < ' + pricehigh
        len_sql = sql
        sql = sql + ' order by is_index desc limit 16 offset ' + str((int(page)-1)*16) + ';'
        query_data = Product.objects.raw(sql)
        query_count = len(list(Product.objects.raw(len_sql)))
        return render_to_response('products_ajax.html',{"items":query_data,"items_count":query_count,"page":int(page),"total":int(query_count/16)+1,"language":language(request)})

def setComment(request):
    if request.is_ajax():
        user_id = request.session['member_id']
        product_id = request.POST.get("product_id")
        rate = request.POST.get("rate")
        content = request.POST.get("content")
        p = Comment(user_id=user_id,product_id=product_id,rate=rate,content=content)
        p.save()
        return HttpResponse(0)

def test(request):
	return render_to_response('test.html')



def add(request):
    if request.session.get('member_id',False):
        color = Color.objects.get(id=1)
        tech = Tech.objects.get(id=1)
        return render_to_response('add.html',{"status":0,"color":color,"tech":tech})
    else:
        if request.session.get('member_id',False):
            del request.session['member_id']
        return HttpResponseRedirect('/login/')

def root(request):
    if request.session.get('member_id',False):
        item = Slide.objects.get(id=1)
        return render_to_response('root.html')
    else:
        if request.session.get('member_id',False):
            del request.session['member_id']
        return HttpResponseRedirect('/login/')

def rootSlide(request):
    if request.session.get('member_id',False):
        item = Slide.objects.get(id=1)
        return render_to_response('slide.html',{"item":item,"status":0})
    else:
        if request.session.get('member_id',False):
            del request.session['member_id']
        return HttpResponseRedirect('/login/')

def saveSlide(request):
    if request.method == 'POST':
        img1 = request.POST.get("img1")
        img1_des = request.POST.get("img1_des")
        img1_des_ch = request.POST.get("img1_des_ch")
        img2 = request.POST.get("img2")
        img2_des = request.POST.get("img2_des")
        img2_des_ch = request.POST.get("img2_des_ch")
        img3 = request.POST.get("img3")
        img3_des = request.POST.get("img3_des")
        img3_des_ch = request.POST.get("img3_des_ch")
        img4 = request.POST.get("img4")
        img4_des = request.POST.get("img4_des")
        img4_des_ch = request.POST.get("img4_des_ch")
        img5 = request.POST.get("img5")
        img5_des = request.POST.get("img5_des")
        img5_des_ch = request.POST.get("img5_des_ch")
        img6 = request.POST.get("img6")
        img6_des = request.POST.get("img6_des")
        img6_des_ch = request.POST.get("img6_des_ch")
        Slide.objects.filter(id=1).update(img1=img1,img1_des=img1_des,img1_des_ch=img1_des_ch,img2=img2,img2_des=img2_des,img2_des_ch=img2_des_ch,img3=img3,img3_des=img3_des,img3_des_ch=img3_des_ch,img4=img4,img4_des=img4_des,img4_des_ch=img4_des_ch,img5=img5,img5_des=img5_des,img5_des_ch=img5_des_ch,img6=img6,img6_des=img6_des,img6_des_ch=img6_des_ch)
	item = Slide.objects.get(id=1)
        return render_to_response('slide.html',{"item":item,"status":1})

def rootIndexProduct(request):
    if request.session.get('member_id',False):
        item = Indexproduct.objects.get(id=1)
        return render_to_response('indexProduct.html',{"item":item,"status":0})
    else:
        if request.session.get('member_id',False):
            del request.session['member_id']
        return HttpResponseRedirect('/login/')

def saveIndexProduct(request):
    if request.method == 'POST':
        pro1 = request.POST.get("pro1")
        pro2 = request.POST.get("pro2")
        pro3 = request.POST.get("pro3")
        pro4 = request.POST.get("pro4")
        pro5 = request.POST.get("pro5")
        pro6 = request.POST.get("pro6")
        pro7 = request.POST.get("pro7")
        pro8 = request.POST.get("pro8")
        Indexproduct.objects.filter(id=1).update(pro1=pro1,pro2=pro2,pro3=pro3,pro4=pro4,pro5=pro5,pro6=pro6,pro7=pro7,pro8=pro8)
        item = Indexproduct.objects.get(id=1)
    return render_to_response('indexProduct.html',{"item":item,"status":1})

def rootRecomment(request):
    if request.session.get('member_id',False):
        item = Recomment.objects.get(id=1)
        return render_to_response('recomment.html',{"item":item,"status":0})
    else:
        if request.session.get('member_id',False):
            del request.session['member_id']
        return HttpResponseRedirect('/login/')

def saveRecomment(request):
    if request.method == 'POST':
        pro1 = request.POST.get("pro1")
        pro2 = request.POST.get("pro2")
        pro3 = request.POST.get("pro3")
        pro4 = request.POST.get("pro4")
        Recomment.objects.filter(id=1).update(pro1=pro1,pro2=pro2,pro3=pro3,pro4=pro4)
        item = Recomment.objects.get(id=1)
        return render_to_response('recomment.html',{"item":item,"status":1})

def rootTech(request):
    if request.session.get('member_id',False):
        item = Tech.objects.get(id=1)
        return render_to_response('tech.html',{"item":item,"status":0})
    else:
        if request.session.get('member_id',False):
            del request.session['member_id']
        return HttpResponseRedirect('/login/')

def saveTech(request):
    if request.method == 'POST':
        tech1 = request.POST.get("tech1")
        tech2 = request.POST.get("tech2")
        tech3 = request.POST.get("tech3")
        tech4 = request.POST.get("tech4")
        tech5 = request.POST.get("tech5")
        tech6 = request.POST.get("tech6")
        tech7 = request.POST.get("tech7")
        tech8 = request.POST.get("tech8")
        tech9 = request.POST.get("tech9")
        tech10 = request.POST.get("tech10")
        tech11 = request.POST.get("tech11")
        tech12 = request.POST.get("tech12")
        tech13 = request.POST.get("tech13")
        tech14 = request.POST.get("tech14")
        tech15 = request.POST.get("tech15")
        tech16 = request.POST.get("tech16")
        tech17 = request.POST.get("tech17")
        tech18 = request.POST.get("tech18")
        tech19 = request.POST.get("tech19")
        tech20 = request.POST.get("tech20")
        Tech.objects.filter(id=1).update(tech1=tech1,tech2=tech2,tech3=tech3,tech4=tech4,tech5=tech5,tech6=tech6,tech7=tech7,tech8=tech8,tech9=tech9,tech10=tech10,tech11=tech11,tech12=tech12,tech13=tech13,tech14=tech14,tech15=tech15,tech16=tech16,tech17=tech17,tech18=tech18,tech19=tech19,tech20=tech20)
        item = Tech.objects.get(id=1)
        return render_to_response('tech.html',{"item":item,"status":1})

def rootColor(request):
    if request.session.get('member_id',False):
        item = Color.objects.get(id=1)
        return render_to_response('color.html',{"item":item,"status":0})
    else:
        if request.session.get('member_id',False):
            del request.session['member_id']
        return HttpResponseRedirect('/login/')

def saveColor(request):
    if request.method == 'POST':
        color1 = request.POST.get("color1")
        color2 = request.POST.get("color2")
        color3 = request.POST.get("color3")
        color4 = request.POST.get("color4")
        color5 = request.POST.get("color5")
        color6 = request.POST.get("color6")
        color7 = request.POST.get("color7")
        color8 = request.POST.get("color8")
        color9 = request.POST.get("color9")
        color10 = request.POST.get("color10")
        color11 = request.POST.get("color11")
        color12 = request.POST.get("color12")
        color13 = request.POST.get("color13")
        color14 = request.POST.get("color14")
        color15 = request.POST.get("color15")
        color16 = request.POST.get("color16")
        color17 = request.POST.get("color17")
        color18 = request.POST.get("color18")
        color19 = request.POST.get("color19")
        color20 = request.POST.get("color20")
        Color.objects.filter(id=1).update(color1=color1,color2=color2,color3=color3,color4=color4,color5=color5,color6=color6,color7=color7,color8=color8,color9=color9,color10=color10,color11=color11,color12=color12,color13=color13,color14=color14,color15=color15,color16=color16,color17=color17,color18=color18,color19=color19,color20=color20)
        item = Color.objects.get(id=1)
        return render_to_response('color.html',{"item":item,"status":1})

def rootPromotion(request):
    if request.session.get('member_id',False):
        item = Promotion.objects.get(id=1)
        return render_to_response('promotionroot.html',{"item":item,"status":0})
    else:
        if request.session.get('member_id',False):
            del request.session['member_id']
        return HttpResponseRedirect('/login/')

def savePromotion(request):
    if request.method == 'POST':
        img1 = request.POST.get("img1") 
        img2 = request.POST.get("img2") 
        img3 = request.POST.get("img3") 
        img4 = request.POST.get("img4") 
        img5 = request.POST.get("img5") 
        img6 = request.POST.get("img6") 
        img7 = request.POST.get("img7") 
        img8 = request.POST.get("img8") 
        activity1_title = request.POST.get("activity1_title") 
        activity1_content = request.POST.get("activity1_content") 
        activity1_title_ch = request.POST.get("activity1_title_ch") 
        activity1_content_ch = request.POST.get("activity1_content_ch") 
        activity2_title = request.POST.get("activity2_title") 
        activity2_content = request.POST.get("activity2_content") 
        activity2_title_ch = request.POST.get("activity2_title_ch") 
        activity2_content_ch = request.POST.get("activity2_content_ch") 
        activity3_title = request.POST.get("activity3_title") 
        activity3_content = request.POST.get("activity3_content") 
        activity3_title_ch = request.POST.get("activity3_title_ch") 
        activity3_content_ch = request.POST.get("activity3_content_ch") 
        public1_title = request.POST.get("public1_title") 
        public1_content = request.POST.get("public1_content") 
        public1_title_ch = request.POST.get("public1_title_ch") 
        public1_content_ch = request.POST.get("public1_content_ch") 
        public2_title = request.POST.get("public2_title") 
        public2_content = request.POST.get("public2_content") 
        public2_title_ch = request.POST.get("public2_title_ch") 
        public2_content_ch = request.POST.get("public2_content_ch") 
        Promotion.objects.filter(id=1).update(img1=img1,img2=img2,img3=img3,img4=img4,img5=img5,img6=img6,img7=img7,img8=img8,activity1_title=activity1_title,activity1_content=activity1_content,activity1_title_ch=activity1_title_ch,activity1_content_ch=activity1_content_ch,activity2_title=activity2_title,activity2_content=activity2_content,activity2_title_ch=activity2_title_ch,activity2_content_ch=activity2_content_ch,activity3_title=activity3_title,activity3_content=activity3_content,activity3_title_ch=activity3_title_ch,activity3_content_ch=activity3_content_ch,public1_title=public1_title,public1_content=public1_content,public1_title_ch=public1_title_ch,public1_content_ch=public1_content_ch,public2_title=public2_title,public2_content=public2_content,public2_title_ch=public2_title_ch,public2_content_ch=public2_content_ch)
        item = Promotion.objects.get(id=1)
        return render_to_response('promotionroot.html',{"item":item,"status":1})

def addProduct(request):
    if request.method == 'POST':
        p = Product(name=request.POST.get('name'),price=request.POST.get('price'),function=request.POST.get('function'),is_index=request.POST.get('is_index'),is_show=request.POST.get('is_show'),url=request.POST.get('url'),type1=request.POST.get('type1'),type1_ch=request.POST.get('type1_ch'),type2=request.POST.get('type2'),type2_ch=request.POST.get('type2_ch'),type3=request.POST.get('type3'),type3_ch=request.POST.get('type3_ch'),style=request.POST.get('style'),style_ch=request.POST.get('style_ch'),gender=request.POST.get('gender'),gender_ch=request.POST.get('gender_ch'),price_ch=request.POST.get('price_ch'),name_ch=request.POST.get('name_ch'),function_ch=request.POST.get('function_ch'),img1=request.POST.get('img1'),img2=request.POST.get('img2'),img3=request.POST.get('img3'),img4=request.POST.get('img4'),img5=request.POST.get('img5'),img6=request.POST.get('img6'),img7=request.POST.get('img7'),img8=request.POST.get('img8'),img9=request.POST.get('img9'),img10=request.POST.get('img10'),tech1=request.POST.get('tech1'),tech2=request.POST.get('tech2'),tech3=request.POST.get('tech3'),tech4=request.POST.get('tech4'),tech5=request.POST.get('tech5'),tech6=request.POST.get('tech6'),tech7=request.POST.get('tech7'),tech8=request.POST.get('tech8'),tech9=request.POST.get('tech9'),tech10=request.POST.get('tech10'),color1=request.POST.get('color1'),color1_name=request.POST.get('color1_name'),color2=request.POST.get('color2'),color2_name=request.POST.get('color2_name'),color3=request.POST.get('color3'),color3_name=request.POST.get('color3_name'),color4=request.POST.get('color4'),color4_name=request.POST.get('color4_name'),color5=request.POST.get('color5'),color5_name=request.POST.get('color5_name'),color6=request.POST.get('color6'),color6_name=request.POST.get('color6_name'),color7=request.POST.get('color7'),color7_name=request.POST.get('color7_name'),color8=request.POST.get('color8'),color8_name=request.POST.get('color8_name'),color9=request.POST.get('color9'),color9_name=request.POST.get('color9_name'),color10=request.POST.get('color10'),color10_name=request.POST.get('color10_name'),)
        p.save()
        return render_to_response('add.html',{"status":1})

def uploadAvatar(request):
    if request.method == 'POST':
        file_ext = request.FILES['Filedata'].name.split('.')[-1]
     
        file_name = time.strftime('%Y%m%d%H%M%S')+hashlib.md5(request.FILES['Filedata'].name.split('.')[0]).hexdigest()
     
        user_upload_folder = os.path.join("edcoSite","template")
        user_upload_folder = os.path.join(user_upload_folder,"upload")
        user_upload_folder = os.path.join(user_upload_folder,"avatar")
	user_upload_folder = '/home/edcoSite/edcoSite/template/upload/avatar/'
        file_upload = open( os.path.join(user_upload_folder, file_name+'.'+file_ext), 'w')
        file_upload.write(request.FILES['Filedata'].read())
        file_upload.close()

        img_name = file_name+'.'+file_ext
        new_img_name = 'm_'+file_name+'.'+file_ext
        new_img_name_l = 'l_'+file_name+'.'+file_ext
        path = os.path.dirname( __file__ )+'/../edcoSite/template/upload/avatar/'

        clipResizeImg(ori_img=path+img_name,dst_img=path+new_img_name,dst_w=50,dst_h=50,save_q=100)
        clipResizeImg(ori_img=path+img_name,dst_img=path+new_img_name_l,dst_w=300,dst_h=300,save_q=100)

        return HttpResponse(file_name+'.'+file_ext)

def changeProduct(request, offset):
    item = Product.objects.get(id=offset)
    return render_to_response('change.html',{"status":0,"item":item})

def deleteProduct(request, offset):
    p = Product.objects.get(id=offset)
    p.delete()
    return HttpResponse("delete success!")

def saveProduct(request):
    if request.method == 'POST':
        Product.objects.filter(id=request.POST.get('product_id')).update(name=request.POST.get('name'),price=request.POST.get('price'),function=request.POST.get('function'),is_index=request.POST.get('is_index'),is_show=request.POST.get('is_show'),url=request.POST.get('url'),type1=request.POST.get('type1'),type1_ch=request.POST.get('type1_ch'),type2=request.POST.get('type2'),type2_ch=request.POST.get('type2_ch'),type3=request.POST.get('type3'),type3_ch=request.POST.get('type3_ch'),style=request.POST.get('style'),style_ch=request.POST.get('style_ch'),gender=request.POST.get('gender'),gender_ch=request.POST.get('gender_ch'),price_ch=request.POST.get('price_ch'),name_ch=request.POST.get('name_ch'),function_ch=request.POST.get('function_ch'),img1=request.POST.get('img1'),img2=request.POST.get('img2'),img3=request.POST.get('img3'),img4=request.POST.get('img4'),img5=request.POST.get('img5'),img6=request.POST.get('img6'),img7=request.POST.get('img7'),img8=request.POST.get('img8'),img9=request.POST.get('img9'),img10=request.POST.get('img10'),tech1=request.POST.get('tech1'),tech2=request.POST.get('tech2'),tech3=request.POST.get('tech3'),tech4=request.POST.get('tech4'),tech5=request.POST.get('tech5'),tech6=request.POST.get('tech6'),tech7=request.POST.get('tech7'),tech8=request.POST.get('tech8'),tech9=request.POST.get('tech9'),tech10=request.POST.get('tech10'),color1=request.POST.get('color1'),color1_name=request.POST.get('color1_name'),color2=request.POST.get('color2'),color2_name=request.POST.get('color2_name'),color3=request.POST.get('color3'),color3_name=request.POST.get('color3_name'),color4=request.POST.get('color4'),color4_name=request.POST.get('color4_name'),color5=request.POST.get('color5'),color5_name=request.POST.get('color5_name'),color6=request.POST.get('color6'),color6_name=request.POST.get('color6_name'),color7=request.POST.get('color7'),color7_name=request.POST.get('color7_name'),color8=request.POST.get('color8'),color8_name=request.POST.get('color8_name'),color9=request.POST.get('color9'),color9_name=request.POST.get('color9_name'),color10=request.POST.get('color10'),color10_name=request.POST.get('color10_name'),)
        item = Product.objects.get(id=request.POST.get('product_id'))
        return render_to_response('change.html',{"status":1,"item":item})

def uploadImage(request):
	if request.method == 'POST':
	    file_ext = request.FILES['Filedata'].name.split('.')[-1]
	 
	    file_name = time.strftime('%Y%m%d%H%M%S')+hashlib.md5(request.FILES['Filedata'].name.split('.')[0]).hexdigest()
	 
	    user_upload_folder = os.path.join("edcoSite","template")
	    user_upload_folder = os.path.join(user_upload_folder,"upload")
	    user_upload_folder = os.path.join(user_upload_folder,"images")
	    user_upload_folder = '/home/edcoSite/edcoSite/template/upload/images/'
	    file_upload = open( os.path.join(user_upload_folder, file_name+'.'+file_ext), 'w')
	    file_upload.write(request.FILES['Filedata'].read())
	    file_upload.close()

	    img_name = file_name+'.'+file_ext
	    new_img_name = 'm_'+file_name+'.'+file_ext
	    path = os.path.dirname( __file__ )+'/../edcoSite/template/upload/images/'

	    resizeImg(ori_img=path+img_name,dst_img=path+new_img_name,dst_w=300,dst_h=450,save_q=60)

	    return HttpResponse(file_name+'.'+file_ext)

def resizeImg(**args):
    args_key = {'ori_img':'','dst_img':'','dst_w':'','dst_h':'','save_q':75}
    arg = {}
    for key in args_key:
        if key in args:
            arg[key] = args[key]
        
    im = image.open(arg['ori_img'])
    ori_w,ori_h = im.size
    widthRatio = heightRatio = None
    ratio = 1
    if (ori_w and ori_w > arg['dst_w']) or (ori_h and ori_h > arg['dst_h']):
        if arg['dst_w'] and ori_w > arg['dst_w']:
            widthRatio = float(arg['dst_w']) / ori_w 
        if arg['dst_h'] and ori_h > arg['dst_h']:
            heightRatio = float(arg['dst_h']) / ori_h

        if widthRatio and heightRatio:
            if widthRatio < heightRatio:
                ratio = widthRatio
            else:
                ratio = heightRatio

        if widthRatio and not heightRatio:
            ratio = widthRatio
        if heightRatio and not widthRatio:
            ratio = heightRatio
            
        newWidth = int(ori_w * ratio)
        newHeight = int(ori_h * ratio)
    else:
        newWidth = ori_w
        newHeight = ori_h
        
    im.resize((newWidth,newHeight),image.ANTIALIAS).save(arg['dst_img'],quality=arg['save_q'])

def clipResizeImg(**args):
    
    args_key = {'ori_img':'','dst_img':'','dst_w':'','dst_h':'','save_q':75}
    arg = {}
    for key in args_key:
        if key in args:
            arg[key] = args[key]
        
    im = image.open(arg['ori_img'])
    ori_w,ori_h = im.size

    dst_scale = float(arg['dst_h']) / arg['dst_w']
    ori_scale = float(ori_h) / ori_w 

    if ori_scale >= dst_scale:
        width = ori_w
        height = int(width*dst_scale)

        x = 0
        y = (ori_h - height) / 3
        
    else:
        height = ori_h
        width = int(height*dst_scale)

        x = (ori_w - width) / 2
        y = 0

    box = (x,y,width+x,height+y)

    newIm = im.crop(box)
    im = None

    ratio = float(arg['dst_w']) / width
    newWidth = int(width * ratio)
    newHeight = int(height * ratio)
    newIm.resize((newWidth,newHeight),image.ANTIALIAS).save(arg['dst_img'],quality=arg['save_q'])

def setGiftBox1(request):
    wxOpenId = request.GET.get('wxOpenId')
    callback = request.GET.get('callback')
    data = Subangdai.objects.filter(ownerid=wxOpenId)
    if data.count() == 0:
        p = Subangdai(ownerid=wxOpenId)
        p.save()
    data = Subangdai.objects.get(ownerid=wxOpenId).id
    return HttpResponse( str(callback) + '(' + str(data) + ')' )

def getGiftBox1(request):
    boxId = request.GET.get('boxId')
    callback = request.GET.get('callback')
    data = Subangdai.objects.get(id=boxId)
    return HttpResponse( str(callback) + '(' + json.dumps({"boxId":data.id,"ownerid":data.ownerid,"guest1":data.guest1,"guest2":data.guest2,"guest3":data.guest3,"guest4":data.guest4,"guest5":data.guest5}) + ')' )

def updateGiftBox1(request):
    boxId = request.GET.get('boxId')
    index = request.GET.get('index')
    index = int(index)
    wxOpenId = request.GET.get('wxOpenId')
    callback = request.GET.get('callback')
    if index == 1:
        Subangdai.objects.filter(id=boxId).update(guest1=wxOpenId)
        return HttpResponse( str(callback) + '(2)' )
    elif index == 2:
        Subangdai.objects.filter(id=boxId).update(guest2=wxOpenId)
        return HttpResponse( str(callback) + '(3)' )
    elif index == 3:
        Subangdai.objects.filter(id=boxId).update(guest3=wxOpenId)
        return HttpResponse( str(callback) + '(4)' )
    elif index == 4:
        Subangdai.objects.filter(id=boxId).update(guest4=wxOpenId)
        return HttpResponse( str(callback) + '(5)' )
    elif index == 5:
        Subangdai.objects.filter(id=boxId).update(guest5=wxOpenId)
        return HttpResponse( str(callback) + '(6)' )
    return HttpResponse( str(callback) + '(1)' )

def setInfo1(request):
    boxId = request.GET.get('boxId')
    name = request.GET.get('name')
    phone = request.GET.get('phone')
    callback = request.GET.get('callback')
    Subangdai.objects.filter(id=boxId).update(name=name, phone=phone)
    return HttpResponse( str(callback) + '(1)' )

def showSubangdai(request):
    r1 = project1.objects.all()
    r2 = project2.objects.all()
    r3 = Subangdai.objects.all()
    return render_to_response('subangdai.html',{"r1":r1,"r2":r2,"r3":r3})

def hyundai1(request):
    name = request.GET.get('name')
    phone = request.GET.get('phone')
    word = request.GET.get('word')
    callback = request.GET.get('jsonp_callback')
    p = Hyundai1(name=name,phone=phone,word=word)
    p.save()
    return HttpResponse( str(callback) + '(' + json.dumps({"code":1}) + ')'  )

def hyundai2(request):
    callback = request.GET.get('jsonp_callback')
    p = Hyundai2.objects.get(id=1)
    num1 = p.num1+1
    num2 = p.num2
    Hyundai2.objects.filter(id=1).update(num1=num1, num2=num2)
    return HttpResponse( str(callback) + '(' + json.dumps({"num1":num1,"num2":num2,"w1":p.w1,"w2":p.w2,"w3":p.w3,"w4":p.w4,"w5":p.w5,"w6":p.w6,"w7":p.w7,"w8":p.w8,"w9":p.w9,"w10":p.w10,"w11":p.w11,"w12":p.w12,"w13":p.w13,}) + ')'  )

def hyundai3(request):
    callback = request.GET.get('jsonp_callback')
    word_id = request.GET.get('word_id')
    p = Hyundai2.objects.get(id=1)
    num1 = p.num1
    num2 = p.num2+1
    w1 = p.w1
    w2 = p.w2
    w3 = p.w3
    w4 = p.w4
    w5 = p.w5
    w6 = p.w6
    w7 = p.w7
    w8 = p.w8
    w9 = p.w9
    w10 = p.w10
    w11 = p.w11
    w12 = p.w12
    w13 = p.w13
    Hyundai2.objects.filter(id=1).update(num1=num1, num2=num2)
    if word_id == '1':
        Hyundai2.objects.filter(id=1).update(w1=w1+1)
    elif word_id == '2':
        Hyundai2.objects.filter(id=1).update(w2=w2+1)
    elif word_id == '3':
        Hyundai2.objects.filter(id=1).update(w3=w3+1)
    elif word_id == '4':
        Hyundai2.objects.filter(id=1).update(w4=w4+1)
    elif word_id == '5':
        Hyundai2.objects.filter(id=1).update(w5=w5+1)
    elif word_id == '6':
        Hyundai2.objects.filter(id=1).update(w6=w6+1)
    elif word_id == '7':
        Hyundai2.objects.filter(id=1).update(w7=w7+1)
    elif word_id == '8':
        Hyundai2.objects.filter(id=1).update(w8=w8+1)
    elif word_id == '9':
        Hyundai2.objects.filter(id=1).update(w9=w9+1)
    elif word_id == '10':
        Hyundai2.objects.filter(id=1).update(w10=w10+1)
    elif word_id == '11':
        Hyundai2.objects.filter(id=1).update(w11=w11+1)
    elif word_id == '12':
        Hyundai2.objects.filter(id=1).update(w12=w12+1)
    elif word_id == '13':
        Hyundai2.objects.filter(id=1).update(w13=w13+1)
    return HttpResponse( str(callback) + '(' + json.dumps({"num1":num1,"num2":num2}) + ')'  )

def hyundai4(request):
    id1 = request.GET.get('id')
    callback = request.GET.get('jsonp_callback')
    p = Hyundai3(id1=id1)
    p.save()
    return HttpResponse( str(callback) + '(' + json.dumps({"code":1}) + ')'  )

def hyundai5(request):
    callback = request.GET.get('jsonp_callback')
    p = Hyundai6.objects.get(id=1)
    num1 = p.num1+1
    num2 = p.num2
    Hyundai6.objects.filter(id=1).update(num1=num1)
    q = Hyundai4.objects.all().order_by('-fav')
    data = []
    for item in q:
        data.append(item.fav)
    return HttpResponse( str(callback) + '(' + json.dumps({"num1":num1,"data":data}) + ')'  )

def hyundai6(request):
    title = request.GET.get('id')
    callback = request.GET.get('jsonp_callback')
    p = Hyundai4.objects.get(id=title)
    fav = p.fav+1
    Hyundai4.objects.filter(id=title).update(fav=fav)
    return HttpResponse( str(callback) + '(' + json.dumps({"code":1}) + ')'  )

def hyundai7(request):
    name = request.GET.get('name')
    phone = request.GET.get('phone')
    article = request.GET.get('article')
    callback = request.GET.get('jsonp_callback')
    p = Hyundai5(name=name,phone=phone,article=article)
    p.save()
    return HttpResponse( str(callback) + '(' + json.dumps({"code":1}) + ')'  )

def hyundai8(request):
    callback = request.GET.get('jsonp_callback')
    query = request.GET.get('query')
    if query.isdigit():
        q = Hyundai4.objects.filter(id=query).order_by('-fav')
    else:
        q = Hyundai4.objects.filter(Q(content__contains=query) | Q(title__contains=query) | Q(author__contains=query)).order_by('-fav')
    data = []
    for item in q:
        data.append(item.title)
        data.append(item.author)
        data.append(item.content)
        data.append(item.fav)
        data.append(item.id)
    return HttpResponse( str(callback) + '(' + json.dumps({"num1":0,"data":data}) + ')'  )

def hyundai9(request):
    callback = request.GET.get('jsonp_callback')
    p = Hyundai6.objects.get(id=1)
    num1 = p.num1
    num2 = p.num2+1
    Hyundai6.objects.filter(id=1).update(num2=num2)
    return HttpResponse( str(callback) + '(' + json.dumps({"code":1}) + ')'  )

def hyundai10(request):
    article = request.GET.get('article')
    openid = request.GET.get('openid')
    callback = request.GET.get('jsonp_callback')
    d = datetime.datetime.now() + datetime.timedelta(hours=8)
    bd = d.replace(hour=0,minute=0,second=0)
    ad = d.replace(hour=23,minute=59,second=59)
    f = Hyundai7.objects.filter(openid=openid, article=article, date__range=[bd,ad])
    if f.count() == 0:
        p = Hyundai7(openid=openid,article=article,date=d)
        p.save() 
        return HttpResponse( str(callback) + '(' + json.dumps({"code":1}) + ')'  )
    else: 
        return HttpResponse( str(callback) + '(' + json.dumps({"code":2}) + ')'  )

def hyundai11(request):
    callback = request.GET.get('jsonp_callback')
    p = Hyundai6.objects.get(id=1)
    num1 = p.num1+1
    num2 = p.num2
    Hyundai6.objects.filter(id=1).update(num1=num1)
    q = Hyundai4.objects.all().order_by('-fav')
    data = []
    for item in q:
        data.append(item.title)
        data.append(item.author)
        data.append(item.content)
        data.append(item.fav)
        data.append(item.id)
    return HttpResponse( str(callback) + '(' + json.dumps({"num1":num1,"data":data}) + ')'  )

def hyundai12(request):
    callback = request.GET.get('jsonp_callback')
    p = Hyundai8.objects.get(id=1)
    num1 = p.num1+1
    Hyundai8.objects.filter(id=1).update(num1=num1)
    prize1 = Hyundai9.objects.filter(prize=1)
    prize11 = []
    for item in prize1:
        q = Hyundai4.objects.get(id=item.article_id)
        prize11.append(q.id)
        prize11.append(q.title)
        prize11.append(q.author)
        prize11.append(q.fav)
    prize2 = Hyundai9.objects.filter(prize=2)
    prize22 = []
    for item in prize2:
        q = Hyundai4.objects.get(id=item.article_id)
        prize22.append(q.id)
        prize22.append(q.title)
        prize22.append(q.author)
        prize22.append(q.fav)
    prize3 = Hyundai9.objects.filter(prize=3)
    prize33 = []
    for item in prize3:
        q = Hyundai4.objects.get(id=item.article_id)
        prize33.append(q.id)
        prize33.append(q.title)
        prize33.append(q.author)
        prize33.append(q.fav)
    prize4 = Hyundai9.objects.filter(prize=4)
    prize44 = []
    for item in prize4:
        q = Hyundai4.objects.get(id=item.article_id)
        prize44.append(q.id)
        prize44.append(q.title)
        prize44.append(q.author)
        prize44.append(q.fav)
    prize55 = []
    prize5 = Hyundai10.objects.filter(prize=1)
    for item in prize5:
        prize55.append(item.article_id)
        prize55.append(item.article_name)
        prize55.append(item.name)
    prize66 = []
    prize6 = Hyundai10.objects.filter(prize=2)
    for item in prize6:
        prize66.append(item.article_id)
        prize66.append(item.article_name)
        prize66.append(item.name)
    return HttpResponse( str(callback) + '(' + json.dumps({"num1":num1,"prize1":prize11,"prize2":prize22,"prize3":prize33,"prize4":prize44,"prize5":prize55,"prize6":prize66}) + ')'  )

def hyundai13(request):
    callback = request.GET.get('jsonp_callback')
    article_id = request.GET.get('article_id')
    q = Hyundai4.objects.get(id=int(article_id))
    return HttpResponse( str(callback) + '(' + json.dumps({"data":q.content, "title":q.title}) + ')'  )

def showHyundai(request):
    h1 = Hyundai1.objects.all()
    h2 = Hyundai3.objects.all()
    h3 = Hyundai2.objects.all()
    return render_to_response('hyundai.html',{"h1":h1,"h2":h2,"h3":h3})
