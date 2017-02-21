# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.db import connection
from media.models import *
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
from django.core.mail import *
import requests 

def root(request):
    if request.session.get('root_id',False):
        if RootUser.objects.get(id=request.session['root_id']).validate == 1:
            items = Form.objects.order_by('-id')[0:200]
            items_count = Form.objects.all().count()
            return render_to_response('root/root.html',{"user":RootUser.objects.get(id=request.session['root_id']),"items":items,"page":1,"total":int(items_count/200)+1})
        else:
            return HttpResponseRedirect('/root/rootValidation/')
    else:
	   return HttpResponseRedirect('/root/login/')

def rootPage(request, offset):
    if request.session.get('root_id',False):
        try:
            offset = int(offset)
        except ValueError:
            raise Http404()
        items = Form.objects.order_by('-id')[(offset-1)*200:offset*200]
        items_count = Form.objects.all().count()
        return render_to_response('root/root.html',{"user":RootUser.objects.get(id=request.session['root_id']),"items":items,"page":offset,"total":int(items_count/200)+1})
    else:
       return HttpResponseRedirect('/root/login/')

def rootSearch(request):
    name = request.GET.get("name")
    wechat = request.GET.get("wechat")
    project = request.GET.get("project")
    starttime = request.GET.get("starttime")
    endtime = request.GET.get("endtime")
    a = request.GET.get("a")
    type1 = request.GET.get("type1")
    type2 = request.GET.get("type2")
    type3 = request.GET.get("type3")
    type4 = request.GET.get("type4")
    type5 = request.GET.get("type5")
    type6 = request.GET.get("type6")
    type7 = request.GET.get("type7")
    sql = 'select * from media_form'
    flag = 0
    if name:
        sql = sql + ' where name = "' + name + '"'
        flag = 1
    if wechat:
        if flag == 1:
            sql = sql + ' and wechat = "' + wechat + '"'
        else:
            sql = sql + ' where wechat = "' + wechat + '"'
        flag = 1
    if project:
        if flag == 1:
            sql = sql + ' and project like "%%' + project + '%%"'
        else:
            sql = sql + ' where project like "%%' + project + '%%"'
        flag = 1
    if starttime:
        if flag == 1:
            sql = sql + ' and executetime >= "' + starttime + '"'
        else:
            sql = sql + ' where executetime >= "' + starttime + '"'
        flag = 1
    if endtime:
        if flag == 1:
            sql = sql + ' and executetime <= "' + endtime + '"'
        else:
            sql = sql + ' where executetime <= "' + endtime + '"'
        flag = 1
    if type1:
        if flag == 1:
            sql = sql + ' and type1 = 1'
        else:
            sql = sql + ' where type1 = 1'
        flag = 1
    if type2:
        if flag == 1:
            sql = sql + ' and type2 = 1'
        else:
            sql = sql + ' where type2 = 1'
        flag = 1
    if type3:
        if flag == 3:
            sql = sql + ' and type3 = 1'
        else:
            sql = sql + ' where type3 = 1'
        flag = 1
    if type4:
        if flag == 1:
            sql = sql + ' and type4 = 1'
        else:
            sql = sql + ' where type4 = 1'
        flag = 1
    if type5:
        if flag == 1:
            sql = sql + ' and type5 = 1'
        else:
            sql = sql + ' where type5 = 1'
        flag = 1
    if type6:
        if flag == 1:
            sql = sql + ' and type6 = 1'
        else:
            sql = sql + ' where type6 = 1'
        flag = 1
    if type7:
        if flag == 1:
            sql = sql + ' and type7 = 1'
        else:
            sql = sql + ' where type7 = 1'
        flag = 1
    if a == '1':
        if flag == 1:
            sql = sql + ' and backtime != "1979-01-01 00:00:00"'
        else:
            sql = sql + ' where backtime != "1979-01-01 00:00:00"'
        flag = 1
    if a == '0':
        if flag == 1:
            sql = sql + ' and backtime = "1979-01-01 00:00:00"'
        else:
            sql = sql + ' where backtime = "1979-01-01 00:00:00"'
        flag = 1
    query_data = Form.objects.raw(sql)
    return render_to_response('root/root.html',{"user":RootUser.objects.get(id=request.session['root_id']),"items":query_data,"page":0,"total":0})

def rootLogin(request):
    if request.session.get('root_id',False):
        if RootUser.objects.get(id=request.session['root_id']).validate == 1:
            return HttpResponseRedirect('/root/')
        else:
            return HttpResponseRedirect('/root/rootValidation/')
    else:
        return render_to_response('root/rootLogin.html',{})

def rootLoginValidate(request):
    if request.is_ajax():
        mail = request.POST.get("mail")
        pwd = request.POST.get("pwd")
        code = request.POST.get("code")
        p = RootUser.objects.filter(mail=mail,password=pwd)
        check_result = check(request)
        if len(p) and check_result:
            request.session['root_id'] = RootUser.objects.get(mail=mail).id
            if RootUser.objects.get(id=request.session['root_id']).validate == 1:
                return HttpResponse(json.dumps({"code":4}))
            else:
                return HttpResponse(json.dumps({"code":0}))
        elif check_result == False:
            return HttpResponse(json.dumps({"code":1}))
        else:
        	return HttpResponse(json.dumps({"code":2}))

def rootLogout(request):
    if request.session.get('root_id',False):
        del request.session['root_id']
    return HttpResponseRedirect('/root/login/')

def rootRegister(request):
    return render_to_response('root/rootRegister.html',{})

def rootRegisterValidate(request):  
    if request.is_ajax():
        password = request.POST.get("password")
        name = request.POST.get("name")
        mail = request.POST.get("mail")
        if len(password) == 0 or len(name) == 0 or len(mail) == 0:
        	return HttpResponse(json.dumps({"code":0}))
        else:
            if len(RootUser.objects.filter(mail=mail)):
                return HttpResponse(json.dumps({"code":0}))
            else:
                p = RootUser(mail=mail,password=password,name=name)
                p.save()
                request.session['root_id'] = RootUser.objects.get(mail=mail).id
                rootMail(request)
                return HttpResponse(json.dumps({"code":1}))

def rootValidation(request):
	return render_to_response('root/rootValidation.html',{"mail":RootUser.objects.get(id=request.session['root_id']).mail})

def code(request):
    figures = [1,2,3,4,5,6,7,8,9,0,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    ca = Captcha(request)
    ca.words = [''.join([str(random.sample(figures,1)[0]) for i in range(0,5)])]
    ca.type = 'word'
    ca.img_width = 150
    ca.img_height = 35
    return ca.display()

def check(request):
    _code = request.POST.get('code')

    ca = Captcha(request)
    if ca.check(_code):
        return True
    else:
        return False

def rootChangePwd(request):
	return render_to_response('root/changePwd.html',{"user":RootUser.objects.get(id=request.session['root_id'])})

def rootChangePwdValidate(request):
    if request.is_ajax():
    	old = request.POST.get("old")
    	new = request.POST.get("new")
    	if len(old) == 0 or len(new) == 0:
    		return HttpResponse(json.dumps({"code":0}))
    	else:
    		p = RootUser.objects.get(id=request.session['root_id'])
        	if p.password == old:
        		RootUser.objects.filter(id=request.session['root_id']).update(password=new)
        		return HttpResponse(json.dumps({"code":1}))
        	else:
        		return HttpResponse(json.dumps({"code":0}))

def rootAdd(request):
    return render_to_response('root/rootAdd.html',{"user":RootUser.objects.get(id=request.session['root_id']),"status":False})

def rootDelete(request):
    if request.is_ajax():
        formid = request.POST.get("formid")
        p = Form.objects.get(id=formid)
        p.delete()
        return HttpResponse(json.dumps({"code":1}))

def rootdeleteUser(request):
    if request.is_ajax():
        formid = request.POST.get("formid")
        p = MediaUser.objects.get(id=formid)
        p.delete()
        return HttpResponse(json.dumps({"code":1}))

def rootChange(request, offset):
    return render_to_response('root/rootAdd.html',{"user":RootUser.objects.get(id=request.session['root_id']),"item":Form.objects.get(id=offset),"status":True})

def rootDuplicateAdd(request, offset):
    return render_to_response('root/rootAdd.html',{"user":RootUser.objects.get(id=request.session['root_id']),"item":Form.objects.get(id=offset),"status":True})

def rootChangeUser(request, offset):
    return render_to_response('root/rootChange.html',{"user":RootUser.objects.get(id=request.session['root_id']),"item":MediaUser.objects.get(id=offset),"status":True})

def rootChangeUserValidate(request):
    if request.is_ajax():
        mediatype = request.POST.get("mediatype")
        mediapeople = request.POST.get("mediapeople")
        mediaattribute = request.POST.get("mediaattribute")
        desc = request.POST.get("desc")
        fans = request.POST.get("fans")
        social = request.POST.get("social")
        account = request.POST.get("account")
        wechat = request.POST.get("wechat")
        name = request.POST.get("name")
        mail = request.POST.get("mail")
        formid = request.POST.get("formid")
        MediaUser.objects.filter(id=formid).update(mediatype=mediatype,mediapeople=mediapeople,mediaattribute=mediaattribute,fans=fans,social=social,account=account,desc=desc,wechat=wechat,name=name,mail=mail)
        return HttpResponse(json.dumps({"code":1}))

def rootAddValidate(request):
    if request.is_ajax():
        name = request.POST.get("name")
        wechat = request.POST.get("wechat")
        custom = request.POST.get("custom")
        account = request.POST.get("account")
        project = request.POST.get("project")
        type1 = request.POST.get("type1")
        type2 = request.POST.get("type2")
        type3 = request.POST.get("type3")
        type4 = request.POST.get("type4")
        type5 = request.POST.get("type5")
        type6 = request.POST.get("type6")
        type7 = request.POST.get("type7")
        bankinfo = request.POST.get("bankinfo")
        banknumber = request.POST.get("banknumber")
        count = request.POST.get("count")
        executetime = request.POST.get("executetime")
        executestatus = request.POST.get("executestatus")
        submitstatus = request.POST.get("submitstatus")
        comment = request.POST.get("comment")
        backtime = request.POST.get("backtime")
        img = request.POST.get("img") 
        p = Form(name=name,custom=custom,type1=type1,type2=type2,type3=type3,type4=type4,type5=type5,type6=type6,type7=type7,bankinfo=bankinfo,banknumber=banknumber,count=count,executetime=executetime,executestatus=executestatus,submitstatus=submitstatus,comment=comment,backtime=backtime,img=img,account=account,project=project,wechat=wechat)
        p.save() 
        return HttpResponse(json.dumps({"code":1}))

def rootChangeValidate(request):
    if request.is_ajax():
        name = request.POST.get("name")
        wechat = request.POST.get("wechat")
        custom = request.POST.get("custom")
        account = request.POST.get("account")
        project = request.POST.get("project")
        type1 = request.POST.get("type1")
        type2 = request.POST.get("type2")
        type3 = request.POST.get("type3")
        type4 = request.POST.get("type4")
        type5 = request.POST.get("type5")
        type6 = request.POST.get("type6")
        type7 = request.POST.get("type7")
        bankinfo = request.POST.get("bankinfo")
        banknumber = request.POST.get("banknumber")
        count = request.POST.get("count")
        executetime = request.POST.get("executetime")
        executestatus = request.POST.get("executestatus")
        submitstatus = request.POST.get("submitstatus")
        comment = request.POST.get("comment")
        backtime = request.POST.get("backtime")
        img = request.POST.get("img") 
        formid = int(request.POST.get("formid"))
        Form.objects.filter(id=formid).update(name=name,custom=custom,type1=type1,type2=type2,type3=type3,type4=type4,type5=type5,type6=type6,type7=type7,bankinfo=bankinfo,banknumber=banknumber,count=count,executetime=executetime,executestatus=executestatus,submitstatus=submitstatus,comment=comment,backtime=backtime,img=img,account=account,project=project,wechat=wechat)
        return HttpResponse(json.dumps({"code":1}))

def rootUpload(request):
    if request.method == 'POST':
        file_ext = request.FILES['Filedata'].name.split('.')[-1]
     
        file_name = time.strftime('%Y%m%d%H%M%S')+hashlib.md5(request.FILES['Filedata'].name.split('.')[0]).hexdigest()
     
        user_upload_folder = os.path.join("wemedia","template")
        user_upload_folder = os.path.join(user_upload_folder,"upload")

        file_upload = open( os.path.join(user_upload_folder, file_name+'.'+file_ext), 'w')
        file_upload.write(request.FILES['Filedata'].read())
        file_upload.close()

        return HttpResponse(file_name+'.'+file_ext)

def mediaLogin(request):
    if request.session.get('media_id',False):
        if MediaUser.objects.get(id=request.session['media_id']).validate == 1:
            return HttpResponseRedirect('/media/')
        else:
            return HttpResponseRedirect('/media/mediaValidation/')
    else:
        return render_to_response('media/mediaLogin.html',{})

def mediaLoginValidate(request):
    if request.is_ajax():
        mail = request.POST.get("mail")
        pwd = request.POST.get("pwd")
        code = request.POST.get("code")
        p = MediaUser.objects.filter(mail=mail,password=pwd)
        check_result = check(request)
        if len(p) and check_result:
            request.session['media_id'] = MediaUser.objects.get(mail=mail).id
            if MediaUser.objects.get(id=request.session['media_id']).validate == 1:
                if MediaUser.objects.get(id=request.session['media_id']).bank:
                    return HttpResponse(json.dumps({"code":4}))
                else:
                    return HttpResponse(json.dumps({"code":5}))
            else:
                return HttpResponse(json.dumps({"code":0}))
        elif check_result == False:
            return HttpResponse(json.dumps({"code":1}))
        else:
            return HttpResponse(json.dumps({"code":2}))

def mediaLogout(request):
    if request.session.get('media_id',False):
        del request.session['media_id']
    return HttpResponseRedirect('/media/login/')

def mediaRegister(request):
    return render_to_response('media/mediaRegister.html',{})

def mediaRegisterValidate(request):  
    if request.is_ajax():
        password = request.POST.get("password")
        name = request.POST.get("name")
        wechat = request.POST.get("wechat")
        mail = request.POST.get("mail")
        account = request.POST.get("account")
        mediatype = request.POST.get("mediatype")
        mediapeople = request.POST.get("mediapeople")
        mediaattribute = request.POST.get("mediaattribute")
        desc = request.POST.get("desc")
        fans = request.POST.get("fans")
        social = request.POST.get("social")
        if len(password) == 0 or len(name) == 0 or len(mail) == 0:
            return HttpResponse(json.dumps({"code":0}))
        else:  
            if len(MediaUser.objects.filter(mail=mail)): 
               return HttpResponse(json.dumps({"code":0}))
            elif len(MediaUser.objects.filter(wechat=wechat)):
                return HttpResponse(json.dumps({"code":2}))
            else: 
                p = MediaUser(mail=mail,password=password,name=name,wechat=wechat,account=account,mediatype=mediatype,mediapeople=mediapeople,mediaattribute=mediaattribute,fans=fans,social=social,desc=desc)
                p.save()
                request.session['media_id'] = MediaUser.objects.get(mail=mail).id
                mediaMail(request)
                return HttpResponse(json.dumps({"code":1}))

def mediaValidation(request):
    return render_to_response('media/mediaValidation.html',{"mail":MediaUser.objects.get(id=request.session['media_id']).mail})

def mediaSign(request):
    return render_to_response('media/mediaSign.html',{})

def media(request):
    if request.session.get('media_id',False):
        if MediaUser.objects.get(id=request.session['media_id']).validate == 1:
            user = MediaUser.objects.get(id=request.session['media_id'])
            if user.wechat != None:
                items = Form.objects.filter(wechat=user.wechat).order_by('-id')[0:10]
                items_all = Form.objects.filter(wechat=user.wechat)
            else:
                items = None
                items_all = None 
            items_count = items_all.count()
            count = 0
            for item in items_all:
                if item.count != '':
                    count = count + int(item.count)
            return render_to_response('media/media.html',{"user":user,"items":items,"page":1,"total":int(items_count/10)+1,"len":items_count,"count": count})
        else:
            return HttpResponseRedirect('/media/mediaValidation/')
    else:
       return HttpResponseRedirect('/media/login/')

def mediaChange(request):
    user = MediaUser.objects.get(id=request.session['media_id'])
    return render_to_response('media/mediaChange.html',{"user":user})

def mediaChangeValidate(request):
    if request.is_ajax():
        mediatype = request.POST.get("mediatype")
        mediapeople = request.POST.get("mediapeople")
        mediaattribute = request.POST.get("mediaattribute")
        desc = request.POST.get("desc")
        fans = request.POST.get("fans")
        social = request.POST.get("social")
        account = request.POST.get("account")
        MediaUser.objects.filter(id=request.session['media_id']).update(mediatype=mediatype,mediapeople=mediapeople,mediaattribute=mediaattribute,fans=fans,social=social,account=account,desc=desc)
        return HttpResponse(json.dumps({"code":1}))

def mediaChangePwd(request):
    return render_to_response('media/mediaPwd.html',{"user":MediaUser.objects.get(id=request.session['media_id'])})

def mediaChangePwdValidate(request):
    if request.is_ajax():
        old = request.POST.get("old")
        new = request.POST.get("new")
        if len(old) == 0 or len(new) == 0:
            return HttpResponse(json.dumps({"code":0}))
        else:
            p = MediaUser.objects.get(id=request.session['media_id'])
            if p.password == old:
                MediaUser.objects.filter(id=request.session['media_id']).update(password=new)
                return HttpResponse(json.dumps({"code":1}))
            else:
                return HttpResponse(json.dumps({"code":0}))

def mediaBank(request):
   return render_to_response('media/mediaBank.html',{"user":MediaUser.objects.get(id=request.session['media_id'])}) 

def mediaBankValidate(request):
    if request.is_ajax():
        bank = request.POST.get("bank")
        bankname = request.POST.get("bankname")
        banknumber = request.POST.get("banknumber")
        MediaUser.objects.filter(id=request.session['media_id']).update(bank=bank,bankname=bankname,banknumber=banknumber)
        return HttpResponse(json.dumps({"code":1}))

def mediaMail(request):   
    p = MediaUser.objects.get(id=request.session['media_id'])
    userid = p.id
    code = hashlib.md5(p.mail).hexdigest()[3:6]
    url = "http://sendcloud.sohu.com/webapi/mail.send.json"                         
    params = {                                                                      
        "api_user": "wemediazmt_test_grSaPMG",                     
        "api_key" : "l1ZRMTUNYHzicIxQ",                                             
        "to" : "357586858@qq.com",
        "from" : "admin@wemedia.com",                                      
        "fromname" : "WeMedia自媒体联盟",                                                    
        "subject" : "激活您的WeMedia自媒体联盟账户",                              
        "html": "<p>请点击下边链接或者复制到浏览器来激活您的WeMedia自媒体联盟账户</p><a href=\"http://hd.wemedia.cn/media/mediaActivation/?id="+str(userid)+"&code="+str(code)+"\">http://hd.wemedia.cn/media/mediaActivation/?id="+str(userid)+"&code="+str(code)+"</a>",
        "resp_email_id": "true",
    }
    r = requests.post(url, data=params)

    return HttpResponse(r.text)

def rootMail(request):   
    p = RootUser.objects.get(id=request.session['root_id'])
    userid = p.id
    code = hashlib.md5(p.mail).hexdigest()[3:6]
    url = "http://sendcloud.sohu.com/webapi/mail.send.json"                         
    params = {                                                                      
        "api_user": "wemediazmt_test_grSaPMG",                     
        "api_key" : "l1ZRMTUNYHzicIxQ",                                             
        "to" : "357586858@qq.com",
        "from" : "admin@wemedia.com",                                      
        "fromname" : "WeMedia自媒体联盟",                                                    
        "subject" : "激活您的WeMedia自媒体联盟账户",                              
        "html": "<p>请点击下边链接或者复制到浏览器来激活您的WeMedia自媒体联盟管理员账户</p><a href=\"http://hd.wemedia.cn/root/rootActivation/?id="+str(userid)+"&code="+str(code)+"\">http://hd.wemedia.cn/root/rootActivation/?id="+str(userid)+"&code="+str(code)+"</a>",
        "resp_email_id": "true",
    }
    r = requests.post(url, data=params)

    return HttpResponse(r.text)

def rootActivation(request):
    userid = request.GET.get("id")
    code = request.GET.get("code")
    p = RootUser.objects.get(id=userid)
    if code == hashlib.md5(p.mail).hexdigest()[3:6]:
        RootUser.objects.filter(id=userid).update(validate=1)
        return HttpResponseRedirect('/root/rootSuccess/')
    else:
        return HttpResponse("验证失败")

def mediaActivation(request):
    userid = request.GET.get("id")
    code = request.GET.get("code")
    p = MediaUser.objects.get(id=userid)
    if code == hashlib.md5(p.mail).hexdigest()[3:6]:
        MediaUser.objects.filter(id=userid).update(validate=1)
        return HttpResponseRedirect('/media/mediaSuccess/')
    else:
        return HttpResponse("验证失败")

def rootSuccess(request):
    return render_to_response('root/rootSuccess.html',{}) 

def mediaSuccess(request):
    return render_to_response('media/mediaSuccess.html',{}) 

def test(request):
    return HttpResponse(hashlib.md5('test').hexdigest()[3:6])

def mediaGuide(request):
    return render_to_response('media/mediaGuide.html',{}) 

def rootReset(request):
    return render_to_response('root/rootReset.html',{}) 

def rootResetValidation(request):
    if request.is_ajax():
        mail = request.POST.get("mail")
        p = RootUser.objects.filter(mail=mail)
        if len(p):
            figures = [1,2,3,4,5,6,7,8,9,0,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
            words = ''.join([str(random.sample(figures,1)[0]) for i in range(0,7)])+'5'
            url = "http://sendcloud.sohu.com/webapi/mail.send.json"                         
            params = {                                                                      
                "api_user": "wemediazmt_test_grSaPMG",                     
                "api_key" : "l1ZRMTUNYHzicIxQ",                                             
                "to" : str(mail),
                "from" : "admin@wemedia.com",                                      
                "fromname" : "WeMedia自媒体联盟",                                                    
                "subject" : "重置您的WeMedia自媒体联盟管理员账户的密码",                              
                "html": "<p>亲爱的"+str(p[0].name)+":</p><p>&nbsp; &nbsp; &nbsp; &nbsp; 您的WeMedia自媒体联盟管理员账户的密码已被重置为："+str(words)+"</p><p>&nbsp; &nbsp; &nbsp; &nbsp; 请您尽快登录账户并修改密码。</p>",
                "resp_email_id": "true",
            }
            r = requests.post(url, data=params)
            RootUser.objects.filter(mail=mail).update(password=words)
            return HttpResponse(json.dumps({"code":1}))
        else:
            return HttpResponse(json.dumps({"code":0}))

def mediaReset(request):
    return render_to_response('media/mediaReset.html',{}) 

def mediaResetValidation(request):
    if request.is_ajax():
        mail = request.POST.get("mail")
        p = MediaUser.objects.filter(mail=mail)
        if len(p):
            figures = [1,2,3,4,5,6,7,8,9,0,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
            words = ''.join([str(random.sample(figures,1)[0]) for i in range(0,7)])+'5'
            url = "http://sendcloud.sohu.com/webapi/mail.send.json"                         
            params = {                                                                      
                "api_user": "wemediazmt_test_grSaPMG",                     
                "api_key" : "l1ZRMTUNYHzicIxQ",                                             
                "to" : str(mail),
                "from" : "admin@wemedia.com",                                      
                "fromname" : "WeMedia自媒体联盟",                                                    
                "subject" : "重置您的WeMedia自媒体联盟账户的密码",                              
                "html": "<p>亲爱的"+str(p[0].name)+":</p><p>&nbsp; &nbsp; &nbsp; &nbsp; 您的WeMedia自媒体联盟账户的密码已被重置为："+str(words)+"</p><p>&nbsp; &nbsp; &nbsp; &nbsp; 请您尽快登录账户并修改密码。</p>",
                "resp_email_id": "true",
            }
            r = requests.post(url, data=params)
            MediaUser.objects.filter(mail=mail).update(password=words)
            return HttpResponse(json.dumps({"code":1}))
        else:
            return HttpResponse(json.dumps({"code":0}))

def rootUser(request):
    items = MediaUser.objects.order_by('-id')
    return render_to_response('root/rootUser.html',{"user":RootUser.objects.get(id=request.session['root_id']),"items":items}) 

def rootCheckName(request):
    if request.is_ajax():
        wechat = request.POST.get("wechat")
        result = Form.objects.filter(wechat=wechat)
        if result.count():
            return HttpResponse(json.dumps({"code":1,"name":result[0].name,"account":result[0].account,"bankinfo":result[0].bankinfo,"banknumber": result[0].banknumber}))
        else:
            return HttpResponse(json.dumps({"code":0}))

def rootHandle(request):
    if request.is_ajax():
        backtime = request.POST.get("backtime")
        arr = request.POST.get("arr")
        items = arr.split(',')
        for item in items:
            Form.objects.filter(id=item).update(backtime=backtime)
        return HttpResponse(json.dumps({"code":1}))
        