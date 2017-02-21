#-*- coding:utf-8 -*-

class settings:
  # 安全检验码，以数字和字母组成的32位字符
  ALIPAY_KEY = 'yibzs5sta0ahk6nzvxtx3usai4wpkvt2'

  ALIPAY_INPUT_CHARSET = 'utf-8'

  # 合作身份者ID，以2088开头的16位纯数字
  ALIPAY_PARTNER = '2088911156175208'

  # 签约支付宝账号或卖家支付宝帐户
  ALIPAY_SELLER_EMAIL = 'qian@heilujiao.com'

  ALIPAY_SIGN_TYPE = 'MD5'

  # 付完款后跳转的页面（同步通知） 要用 http://格式的完整路径，不允许加?id=123这类自定义参数
  ALIPAY_RETURN_URL='http://www.heilujiao.com/alipayReturn/'

  # 交易过程中服务器异步通知的页面 要用 http://格式的完整路径，不允许加?id=123这类自定义参数
  ALIPAY_NOTIFY_URL='http://www.heilujiao.com/alipayNotify/'

  ALIPAY_SHOW_URL='http://www.heilujiao.com/alipayShow/'

  # 访问模式,根据自己的服务器是否支持ssl访问，若支持请选择https；若不支持请选择http
  ALIPAY_TRANSPORT='http'
