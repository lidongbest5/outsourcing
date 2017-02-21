# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.db import connection
from website.models import *
from django.db.models import Q
import datetime
import time
from django import forms
from django.utils import simplejson as json
import os
import hashlib
from PIL import Image as image
import random
import  urllib2
from django import forms
from alipay import *

def uStatus(request):
    user = None
    if request.session.get('user',False):
        userid = request.session['user']
        user = User.objects.get(id=userid)
    return user

def index(request):
    return render_to_response('index.html',{'type':'index', 'user': uStatus(request), 'slide': Slide.objects.get(id=1), 'num': range(Slide.objects.get(id=1).num)})

def about(request):
    return render_to_response('about.html',{'type':'about', 'user': uStatus(request)})

def address(request):
    address = Address.objects.filter(userid=request.session['user'])
    return render_to_response('address.html',{'user': uStatus(request), 'address': address, 'len': address.count(), 'remain': 6-address.count(),'type': 1})

def blog(request):
    blog = Blog.objects.order_by('-date')
    count = blog.count()
    if count%2 == 0:
        pages = count/2
    else:
        pages = count/2 + 1
    return render_to_response('blog.html',{'type':'blog', 'user': uStatus(request), 'blog': blog, 'count': count, 'pages': pages, 'range': range(pages)})

def cart(request):
    items = Deal.objects.all()
    return render_to_response('cart.html',{'type':'cart', 'user': uStatus(request), 'items': items})

def detail(request, offset):
    item = Deal.objects.get(id=offset)
    return render_to_response('detail.html',{'user': uStatus(request), 'item': item, 'tip': Tip.objects.get(id=1).desc})

def menu(request):
    items = Deal.objects.order_by('-order')
    count = items.count()
    if count%12 == 0:
        pages = count/12
    else:
        pages = count/12 + 1
    return render_to_response('menu.html',{'type':'menu', 'user': uStatus(request), 'items': items, 'count': items.count(), 'pages': pages, 'range': range(pages), 'menuType': 0})

def submit(request):
    items = Deal.objects.all()
    address = Address.objects.filter(userid=request.session['user'],default=1)
    if address.count():
        address = Address.objects.get(userid=request.session['user'],default=1)
    else:
        address = None
    return render_to_response('submit.html',{'user': uStatus(request), 'items': items, 'address': address, 'order': Order.objects.filter(userid=request.session['user']).count()})

def add(request):
	return render_to_response('add.html',{'user': uStatus(request), "type":0})

def upload(request):
    if request.method == 'POST':
        file_ext = request.FILES['Filedata'].name.split('.')[-1]
     
        file_name = time.strftime('%Y%m%d%H%M%S')+hashlib.md5(request.FILES['Filedata'].name.encode('utf-8').split('.')[0]).hexdigest()
     
        user_upload_folder = os.path.join("heilujiao","template")
        user_upload_folder = os.path.join(user_upload_folder,"upload")
        # user_upload_folder = os.path.join(user_upload_folder,"images")

        file_upload = open( os.path.join(user_upload_folder, file_name+'.'+file_ext), 'w')
        file_upload.write(request.FILES['Filedata'].read())
        file_upload.close()

        img_name = file_name+'.'+file_ext
        new_img_name = 'm_'+file_name+'.'+file_ext
        path = os.path.dirname( __file__ )+'/../heilujiao/template/upload/'

        resizeImg(ori_img=path+img_name,dst_img=path+new_img_name,dst_w=300,dst_h=300,save_q=80)

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

def register(request):  
    if request.is_ajax():
        password = request.POST.get("password")
        phone = request.POST.get("phone")
        if len(password) == 0 or len(phone) == 0:
        	return HttpResponse(json.dumps({"code":0}))
        else:
            if len(User.objects.filter(phone=phone)):
                return HttpResponse(json.dumps({"code":0}))
            else:
                p = User(phone=phone,password=password)
                p.save()
                return HttpResponse(json.dumps({"code":1}))

def forgetpwd(request):
    if request.is_ajax():
        password = request.POST.get("password")
        phone = request.POST.get("phone")
        if len(password) == 0 or len(phone) == 0:
            return HttpResponse(json.dumps({"code":0}))
        else:
            if len(User.objects.filter(phone=phone)):
                p = User.objects.filter(phone=phone).update(password=password)
                return HttpResponse(json.dumps({"code":1}))
            else:
                return HttpResponse(json.dumps({"code":0}))

def login(request):
    if request.is_ajax():
        password = request.POST.get("password")
        phone = request.POST.get("phone")
        p = User.objects.filter(phone=phone,password=password)
        if len(p):
            request.session['user'] = User.objects.get(phone=phone).id
            return HttpResponse(json.dumps({"code":0}))
        else:
        	return HttpResponse(json.dumps({"code":1}))

def logout(request):
    del request.session['user']
    return HttpResponseRedirect('/')

def menuMain(request):
    items = Deal.objects.filter(dealType=1).order_by('-order')
    count = items.count()
    if count%12 == 0:
        pages = count/12
    else:
        pages = count/12 + 1
    return render_to_response('menu.html',{'type':'menu', 'user': uStatus(request), 'items': items, 'count': items.count(), 'pages': pages, 'range': range(pages), 'menuType': 1})

def menuSalad(request):
    items = Deal.objects.filter(dealType=2).order_by('-order')
    count = items.count()
    if count%12 == 0:
        pages = count/12
    else:
        pages = count/12 + 1
    return render_to_response('menu.html',{'type':'menu', 'user': uStatus(request), 'items': items, 'count': items.count(), 'pages': pages, 'range': range(pages), 'menuType': 2})

def menuDeal(request):
    items = Deal.objects.filter(dealType=3).order_by('-order')
    count = items.count()
    if count%12 == 0:
        pages = count/12
    else:
        pages = count/12 + 1
    return render_to_response('menu.html',{'type':'menu', 'user': uStatus(request), 'items': items, 'count': items.count(), 'pages': pages, 'range': range(pages), 'menuType': 3})

def menuMonth(request):
    items = Deal.objects.order_by('-order')
    count = items.count()
    if count%12 == 0:
        pages = count/12
    else:
        pages = count/12 + 1
    return render_to_response('menu.html',{'type':'menu', 'user': uStatus(request), 'items': items, 'count': items.count(), 'pages': pages, 'range': range(pages), 'menuType': 4})

def menuPopular(request):
    items = Deal.objects.order_by('-order')
    count = items.count()
    if count%12 == 0:
        pages = count/12
    else:
        pages = count/12 + 1
    return render_to_response('menu.html',{'type':'menu', 'user': uStatus(request), 'items': items, 'count': items.count(), 'pages': pages, 'range': range(pages), 'menuType': 5})

def addDeal(request):
    if request.is_ajax():
        name = request.POST.get("name")
        img = request.POST.get("img")
        price = request.POST.get("price") 
        time = request.POST.get("time")
        hard = request.POST.get("hard")
        tool = request.POST.get("tool")
        story = request.POST.get("story")
        material = request.POST.get("material")
        recipe = request.POST.get("recipe")
        dealType = request.POST.get("dealType")
        extra = request.POST.get("extra")
        order = request.POST.get("order")
        count = request.POST.get("count")
        date = datetime.datetime.now()
        p = Deal(name=name,img=img,price=price,time=time,hard=hard,tool=tool,story=story,material=material,recipe=recipe,dealType=dealType,extra=extra,date=date,order=order,count=count)
        p.save()
        return HttpResponse(json.dumps({"code":1}))

def changeDeal(request):
    if request.is_ajax():
        name = request.POST.get("name")
        img = request.POST.get("img")
        price = request.POST.get("price") 
        time = request.POST.get("time")
        hard = request.POST.get("hard")
        tool = request.POST.get("tool")
        story = request.POST.get("story")
        material = request.POST.get("material")
        recipe = request.POST.get("recipe")
        dealType = request.POST.get("dealType")
        extra = request.POST.get("extra")
        order = request.POST.get("order")
        count = request.POST.get("count")
        changeid = request.POST.get("changeid")
        date = datetime.datetime.now()
        p = Deal.objects.filter(id=changeid).update(name=name,img=img,price=price,time=time,hard=hard,tool=tool,story=story,material=material,recipe=recipe,dealType=dealType,extra=extra,date=date,order=order,count=count)
        return HttpResponse(json.dumps({"code":1}))

def saveAddress(request):
    if request.is_ajax():
        userid = request.session['user']
        district = request.POST.get("district")
        address = request.POST.get("address")
        postcode = request.POST.get("postcode")
        name = request.POST.get("name")
        phone = request.POST.get("phone")
        default = request.POST.get("default")
        p = Address(userid=userid,district=district,address=address,postcode=postcode,name=name,phone=phone,default=default)
        p.save()
        return HttpResponse(json.dumps({"code":1}))

def deleteAddress(request):
    if request.is_ajax():
        id = request.POST.get("id")
        p = Address.objects.get(id=id)
        if p.userid == request.session['user']:
            p.delete()
            return HttpResponse(json.dumps({"code":1}))

def changeAddress(request, offset):
    address = Address.objects.filter(userid=request.session['user'])
    current = Address.objects.get(id=offset)
    return render_to_response('address.html',{'user': uStatus(request), 'address': address, 'len': address.count(), 'remain': 6-address.count(),'type': 2, 'current': current})

def changeAddressSave(request):
    if request.is_ajax():
        userid = request.session['user']
        district = request.POST.get("district")
        address = request.POST.get("address")
        postcode = request.POST.get("postcode")
        name = request.POST.get("name")
        phone = request.POST.get("phone")
        default = request.POST.get("default")
        addressid = request.POST.get("id")
        p = Address.objects.filter(id=addressid).update(userid=userid,district=district,address=address,postcode=postcode,name=name,phone=phone,default=default)
        return HttpResponse(json.dumps({"code":1}))

def root(request):
    return render_to_response('root.html',{'user': uStatus(request)})

def uploadPage(request):
    return render_to_response('uploadPage.html',{'user': uStatus(request)})

def indexUpdate(request):
    return render_to_response('indexUpdate.html',{'user': uStatus(request), 'slide': Slide.objects.get(id=1)})

def blogUpdate(request):
    return render_to_response('blogUpdate.html',{'user': uStatus(request), 'type':0})

def checkMenu(request):
    return render_to_response('checkMenu.html',{'user': uStatus(request), 'items': Deal.objects.all().order_by('-order')})

def checkMenuDetail(request, offset):
    return render_to_response('add.html',{'user': uStatus(request), "type":1, "item": Deal.objects.get(id=offset)})

def checkBlog(request):
    return render_to_response('checkBlog.html',{'user': uStatus(request), 'items': Blog.objects.all().order_by('-id')})

def checkBlogDetail(request, offset):
    return render_to_response('blogUpdate.html',{'user': uStatus(request), 'type': 1, 'item': Blog.objects.get(id=offset)})

def addCoupon(request):
    return render_to_response('addCoupon.html',{'user': uStatus(request)})

def checkCoupon(request):
    return render_to_response('checkCoupon.html',{'user': uStatus(request), 'coupons': Coupon.objects.all()})

def checkUser(request):
    users = User.objects.all()
    a = []
    for item in users:
        address = Address.objects.filter(userid=item.id)
        if address.count():
            item.address = address[0].address
            item.district = address[0].district
            item.postcode = address[0].postcode
            item.name = address[0].name
    return render_to_response('checkUser.html',{'user': uStatus(request), 'users': users})

def checkOrder(request):
    orders = Order.objects.all()
    for item in orders:
        tran = Transaction.objects.filter(transactionid=item.transactionid)
        user = User.objects.get(id=item.userid)
        address = Address.objects.filter(userid=item.userid)
        item.date = item.date + datetime.timedelta(hours=8)
        if address.count():
            item.name = address[0].name
            item.phone = user.phone
            item.address = address[0].address
            item.district = address[0].district
            item.postcode = address[0].postcode
        item.order = []
        for t in tran:
            t.name = Deal.objects.get(id=t.itemid).name
            item.order.append(t)
    return render_to_response('checkOrder.html',{'user': uStatus(request), 'orders': orders})

def addCouponValidate(request):
    if request.is_ajax():
        price = request.POST.get("price")
        phone = request.POST.get("phone")
        couponid = hashlib.md5(phone).hexdigest()[5:10]
        used = 0
        p = Coupon(phone=phone,price=price,couponid=couponid,used=used)
        p.save()
        return HttpResponse(json.dumps({"code":1}))

def slideAdd(request):
    if request.is_ajax():
        num = request.POST.get("num")
        slide1 = request.POST.get("slide1")
        slide2 = request.POST.get("slide2")
        slide3 = request.POST.get("slide3")
        slide4 = request.POST.get("slide4")
        slide5 = request.POST.get("slide5")
        slide6 = request.POST.get("slide6")
        slide7 = request.POST.get("slide7")
        slide8 = request.POST.get("slide8")
        slide9 = request.POST.get("slide9")
        slide10 = request.POST.get("slide10")
        p = Slide.objects.filter(id=1).update(num=num,slide1=slide1,slide2=slide2,slide3=slide3,slide4=slide4,slide5=slide5,slide6=slide6,slide7=slide7,slide8=slide8,slide9=slide9,slide10=slide10)
        return HttpResponse(json.dumps({"code":1}))

def blogAdd(request):
    if request.is_ajax():
        title = request.POST.get("title")
        content = request.POST.get("content")
        date = datetime.datetime.now()
        p = Blog(title=title, content=content, date=date)
        p.save()
        return HttpResponse(json.dumps({"code":1}))

def blogChange(request):
    if request.is_ajax():
        title = request.POST.get("title")
        content = request.POST.get("content")
        changeid = request.POST.get("changeid")
        p = Blog.objects.filter(id=changeid).update(title=title, content=content)
        return HttpResponse(json.dumps({"code":1}))

def confirmDelete(request):
    if request.is_ajax():
        deleteid = request.POST.get("id")
        p = Deal.objects.get(id=deleteid)
        p.delete()
        return HttpResponse(json.dumps({"code":1}))

def confirmDeleteBlog(request):
    if request.is_ajax():
        deleteid = request.POST.get("id")
        p = Blog.objects.get(id=deleteid)
        p.delete()
        return HttpResponse(json.dumps({"code":1}))

def confirmDeleteCoupon(request):
    if request.is_ajax():
        deleteid = request.POST.get("id")
        p = Coupon.objects.get(id=deleteid)
        p.delete()
        return HttpResponse(json.dumps({"code":1}))

def setCapcha(request):
    if request.is_ajax():
        phone = str(request.POST.get("phone"))
        capcha = str(request.POST.get("capcha"))
        response = urllib2.urlopen('http://kh.400service.com/ws/Send.aspx?CorpID=blackantler&Pwd=heilujiao2014&Mobile='+phone+'&Content=¶ÌÐÅÑéÖ¤Âë£º'+capcha+'¡£¡¾ºÚÂ¹½Ç¡¿&Cell=&SendTime=') 
        html = response.read()
        return HttpResponse(json.dumps({"code":1,"data":html}))

def pay(request):
    orderid = int(request.GET.get("orderid"))
    title = request.GET.get("title")
    total = request.GET.get("total")
    url = create_direct_pay_by_user(orderid, title,'', total)
    return HttpResponseRedirect(url)

def alipayReturn(request):
    return render_to_response('success.html',{'user': uStatus(request)})

def alipayNotify(request):
    if request.method == 'POST':
        if notify_verify(request.POST):
            tn = request.POST.get('out_trade_no')
            trade_no = request.POST.get('trade_no')
            trade_status = request.POST.get('trade_status')
            if trade_status == 'TRADE_SUCCESS':
                Order.objects.filter(transactionid=tn).update(paid=1)
                return HttpResponse("success")
    return HttpResponse ("fail")

def validateCoupon(request):
    couponid = request.POST.get("coupon")
    phone = User.objects.get(id=request.session['user']).phone
    result = Coupon.objects.filter(couponid=couponid,phone=phone)
    if result.count() and result[0].used == 0:
        Coupon.objects.filter(id=result[0].id).update(used=1)
        return HttpResponse(json.dumps({"code":1,'price':result[0].price,'id': result[0].id}))
    else:
        return HttpResponse(json.dumps({"code":0}))

def cancelCoupon(request):
    couponid = request.POST.get("coupon")
    Coupon.objects.filter(id=couponid).update(used=0)
    return HttpResponse(json.dumps({"code":1}))

def payment(request):
    transactionid = request.POST.get("transactionid")
    total = request.POST.get("total")
    items = request.POST.get("items")
    orders = json.loads(items)
    p = Order(userid=request.session['user'],transactionid=transactionid,price=total,paid=0,date=datetime.datetime.now())
    p.save()
    for index in range(0,len(orders)):
        p = Transaction(itemid=orders[index]['id'],count=orders[index]['count'],transactionid=transactionid)
        p.save()
    return HttpResponse(json.dumps({"code":1}))

def checkTip(request):
    tip = Tip.objects.get(id=1)
    return render_to_response('tip.html',{'user': uStatus(request), 'tip': tip})

def validateTip(request):
    if request.is_ajax():
        content = request.POST.get("content")
        p = Tip.objects.filter(id=1).update(desc=content)
        return HttpResponse(json.dumps({"code":1}))

def welcome(request):
    return render_to_response('welcome.html')