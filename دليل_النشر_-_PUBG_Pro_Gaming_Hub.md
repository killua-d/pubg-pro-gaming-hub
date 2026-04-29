# دليل النشر - PUBG Pro Gaming Hub

هذا الدليل يشرح كيفية نشر الموقع على منصات استضافة مختلفة.

## النشر على Heroku (الأسهل والأسرع)

### الخطوة 1: إنشاء حساب Heroku
1. اذهب إلى [heroku.com](https://www.heroku.com)
2. انقر على "Sign Up"
3. أكمل عملية التسجيل

### الخطوة 2: تثبيت Heroku CLI
```bash
# على Windows
choco install heroku-cli

# على macOS
brew tap heroku/brew && brew install heroku

# على Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### الخطوة 3: تسجيل الدخول
```bash
heroku login
```

### الخطوة 4: إنشاء تطبيق جديد
```bash
cd /home/ubuntu/pubg-pro-permanent
heroku create pubg-pro-gaming-hub
```

### الخطوة 5: نشر التطبيق
```bash
git push heroku master
```

### الخطوة 6: فتح الموقع
```bash
heroku open
```

سيكون الموقع متاحاً على: `https://pubg-pro-gaming-hub.herokuapp.com`

---

## النشر على Railway

### الخطوة 1: إنشاء حساب Railway
1. اذهب إلى [railway.app](https://railway.app)
2. انقر على "Start Project"
3. اختر "Deploy from GitHub"

### الخطوة 2: ربط المستودع
1. اختر المستودع الخاص بك
2. اختر الفرع (master/main)

### الخطوة 3: إضافة متغيرات البيئة
1. انتقل إلى "Variables"
2. أضف:
   - `PORT=3000`
   - `NODE_ENV=production`

### الخطوة 4: نشر التطبيق
Railway سينشر التطبيق تلقائياً عند كل push

---

## النشر على Render

### الخطوة 1: إنشاء حساب Render
1. اذهب إلى [render.com](https://render.com)
2. انقر على "Sign up"

### الخطوة 2: إنشاء خدمة جديدة
1. انقر على "New +"
2. اختر "Web Service"
3. اختر "Connect a repository"

### الخطوة 3: إعدادات النشر
- **Name**: pubg-pro-gaming-hub
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### الخطوة 4: نشر التطبيق
انقر على "Create Web Service"

---

## النشر على Vercel

### الخطوة 1: إنشاء حساب Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. انقر على "Sign Up"

### الخطوة 2: استيراد المشروع
1. انقر على "New Project"
2. اختر "Import Git Repository"
3. اختر المستودع الخاص بك

### الخطوة 3: إعدادات المشروع
- **Framework**: Other
- **Root Directory**: ./
- **Build Command**: (اتركه فارغاً)
- **Output Directory**: (اتركه فارغاً)

### الخطوة 4: نشر التطبيق
انقر على "Deploy"

---

## النشر على DigitalOcean App Platform

### الخطوة 1: إنشاء حساب DigitalOcean
1. اذهب إلى [digitalocean.com](https://www.digitalocean.com)
2. انقر على "Sign Up"

### الخطوة 2: إنشاء تطبيق جديد
1. من لوحة التحكم، انقر على "Apps"
2. انقر على "Create App"
3. اختر "GitHub" وربط المستودع

### الخطوة 3: إعدادات التطبيق
- **Name**: pubg-pro-gaming-hub
- **Source Type**: GitHub
- **Build Command**: `npm install`
- **Run Command**: `npm start`

### الخطوة 4: نشر التطبيق
انقر على "Deploy"

---

## النشر على خادم خاص (VPS)

### المتطلبات
- خادم بنظام Linux (Ubuntu 20.04+)
- Node.js مثبت
- npm مثبت
- Nginx أو Apache (اختياري)

### الخطوات

#### 1. تثبيت Node.js و npm
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. استنساخ المشروع
```bash
cd /var/www
git clone https://github.com/your-username/pubg-pro-gaming-hub.git
cd pubg-pro-gaming-hub
```

#### 3. تثبيت المكتبات
```bash
npm install
```

#### 4. تثبيت PM2 (لإدارة العملية)
```bash
sudo npm install -g pm2
```

#### 5. بدء التطبيق
```bash
pm2 start server.js --name "pubg-pro-hub"
pm2 startup
pm2 save
```

#### 6. إعداد Nginx (اختياري)
```bash
sudo nano /etc/nginx/sites-available/pubg-pro-hub
```

أضف:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 7. تفعيل الموقع
```bash
sudo ln -s /etc/nginx/sites-available/pubg-pro-hub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 8. إضافة شهادة SSL (اختياري)
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## المراقبة والصيانة

### مراقبة الأداء
```bash
# على Heroku
heroku logs --tail

# على خادم خاص
pm2 logs pubg-pro-hub
pm2 monit
```

### تحديث التطبيق
```bash
# على Heroku
git push heroku master

# على خادم خاص
cd /var/www/pubg-pro-gaming-hub
git pull origin master
npm install
pm2 restart pubg-pro-hub
```

---

## استكشاف الأخطاء

### المشكلة: الموقع لا يعمل بعد النشر
**الحل**:
1. تحقق من السجلات: `heroku logs --tail`
2. تأكد من أن PORT يستخدم متغير البيئة
3. تأكد من تثبيت جميع المكتبات

### المشكلة: خطأ في الاتصال بقاعدة البيانات
**الحل**:
1. تحقق من متغيرات البيئة
2. تأكد من أن قاعدة البيانات قيد التشغيل
3. تحقق من بيانات الاتصال

### المشكلة: الموقع بطيء جداً
**الحل**:
1. قلل حجم الملفات الثابتة
2. استخدم CDN
3. فعّل caching
4. قم بتحسين قاعدة البيانات

---

## الدعم

للمساعدة والاستفسارات:
- البريد الإلكتروني: support@pubgprohub.com
- الموقع: https://pubgprohub.com
- GitHub Issues: https://github.com/your-username/pubg-pro-gaming-hub/issues

---

**تم إنشاء هذا الدليل لمساعدتك على نشر الموقع بسهولة** 🚀
