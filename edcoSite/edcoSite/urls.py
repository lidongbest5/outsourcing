from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
from edco.views import *
from django.contrib import admin
admin.autodiscover()

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^mysite/', include('mysite.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
    (r'^$',index),
    (r'^products/$', products),
    (r'^brandStory/$', brandStory),
    (r'^culture/$', culture),
    (r'^technology/$', technology),
    (r'^brandPromotion/$', brandPromotion),
    (r'^contact/$', contact),
    (r'^member/$', member),
    (r'^updateMember/$', updateMember),
    (r'^member/changePwd/$', changePwd),
    (r'^pwdValidate/$', pwdValidate),
    (r'^member/changeAvatar/$', changeAvatar),
    (r'^setAvatar/$', setAvatar),
    (r'^login/$', login),
    (r'^loginValidate/$', loginValidate),
    (r'^logout/$', logout),
    (r'^register/$', register),
    (r'^registerValidate/$', registerValidate),
    (r'^product/(\d+)/$', product),
    (r'^test/$', test),
    (r'^upload/$', uploadImage),
    (r'^uploadAvatar/$', uploadAvatar),
    (r'^root/$', root),
    (r'^root/addProduct/$', add),
    (r'^root/setSlide/$', rootSlide),
    (r'^root/saveSlide/$', saveSlide),
    (r'^root/setIndexProduct/$', rootIndexProduct),
    (r'^root/saveIndexProduct/$', saveIndexProduct),
    (r'^root/setRecomment/$', rootRecomment),
    (r'^root/saveRecomment/$', saveRecomment),
    (r'^root/setTech/$', rootTech),
    (r'^root/saveTech/$', saveTech),
    (r'^root/setColor/$', rootColor),
    (r'^root/saveColor/$', saveColor),
    (r'^root/setPromotion/$', rootPromotion),
    (r'^root/savePromotion/$', savePromotion),
    (r'^root/changeProduct/(\d+)/$', changeProduct),
    (r'^root/deleteProduct/(\d+)/$', deleteProduct),
    (r'^root/saveProduct/$', saveProduct),
    (r'^code/$', code),
    (r'^check/$', check),
    (r'^addProduct/$', addProduct),
    (r'^getProductList/$', getProductList),
    (r'^setComment/$', setComment),
    (r'^language/en/$', setEn),
    (r'^language/ch/$', setCh),
    (r'^searchResult/$', search),
    (r'^member/comment/$', comment),
    (r'^out/$', out),
    (r'^setGiftBox/$', setGiftBox),
    (r'^getGiftBox/$', getGiftBox),
    (r'^updateGiftBox/$', updateGiftBox),
    (r'^setInfo/$', setInfo),
    (r'^getGift/$', getGift),
    (r'^updateShare/$', updateShare),
    (r'^project/api1/$', api1),
    (r'^project/api2/$', api2),
    (r'^setGiftBox1/$', setGiftBox1),
    (r'^getGiftBox1/$', getGiftBox1),
    (r'^updateGiftBox1/$', updateGiftBox1),
    (r'^setInfo1/$', setInfo1),
    (r'^showSubangdai/$', showSubangdai),
    (r'^project/hyundai/api1/$', hyundai1),
    (r'^project/hyundai/api2/$', hyundai2),
    (r'^project/hyundai/api3/$', hyundai3),
    (r'^project/hyundai/api4/$', hyundai4),
    (r'^project/hyundai/new/api5/$', hyundai5),
    (r'^project/hyundai/new/api8/$', hyundai8),
    (r'^project/hyundai/new/api11/$', hyundai11),
    (r'^project/hyundai/new/api12/$', hyundai12),
    (r'^project/hyundai/new/api13/$', hyundai13),
    (r'^showHyundai/$', showHyundai),
)

#urlpatterns += static(settings.STATIC_URL,document_root = settings.STATIC_ROOT)
if settings.DEBUG is False:
    urlpatterns += patterns('',
            url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    )
