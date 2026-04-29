# PUBG Pro Gaming & Sensitivity Hub

موقع ويب احترافي مخصص لعبة ببجي موبايل، يوفر حاسبة حساسية متقدمة وإعدادات مثالية لكل فئة من فريمات الأجهزة.

## المميزات الرئيسية

### 1. **حاسبة الحساسية الذكية**
- حساب الحساسية المثالية بناءً على:
  - نوع الجهاز (40، 60، 90، 120 فريم)
  - أسلوب اللعب (عدواني، متوازن، تكتيكي)
  - مستوى الخبرة (مبتدئ، متوسط، متقدم، احترافي)
- حفظ الإعدادات للمستخدمين

### 2. **إعدادات الحساسية المتخصصة**
- إعدادات مثالية لكل فئة فريمات
- تفاصيل شاملة لحساسيات الزوم المختلفة
- نصائح متخصصة لكل نوع جهاز

### 3. **نصائح وحيل**
- 6 نصائح متخصصة لتحسين الأداء
- نصائح تكتيكية وتقنية
- إرشادات لتحسين الأداء على الهواتف الذكية

### 4. **نموذج التواصل**
- حفظ رسائل التواصل في قاعدة البيانات
- معالجة سريعة للاستفسارات

## المتطلبات

- Node.js 14+
- npm أو yarn

## التثبيت

```bash
# استنساخ المشروع
git clone <repository-url>
cd pubg-pro-permanent

# تثبيت المكتبات
npm install

# تشغيل الخادم
npm start
```

## الاستخدام

الخادم سيعمل على `http://localhost:3000`

### API Endpoints

#### حساب الحساسية
```
POST /api/calculate-sensitivity
Content-Type: application/json

{
  "deviceType": "120",
  "playstyle": "balanced",
  "experience": "pro"
}
```

#### حفظ الإعدادات
```
POST /api/settings
Content-Type: application/json

{
  "userId": "user123",
  "deviceType": "120",
  "playstyle": "balanced",
  "experience": "pro",
  "sensitivity": {
    "camera": 70,
    "view": 60,
    "zoom2x": 35,
    "zoom4x": 20,
    "zoom6x": 10,
    "zoom8x": 6
  }
}
```

#### الحصول على إعدادات المستخدم
```
GET /api/settings/:userId
```

#### إرسال رسالة تواصل
```
POST /api/contact
Content-Type: application/json

{
  "name": "أحمد",
  "email": "ahmed@example.com",
  "message": "رسالتك هنا"
}
```

#### الحصول على جميع الرسائل
```
GET /api/contact
```

#### فحص صحة الخادم
```
GET /api/health
```

## البنية

```
pubg-pro-permanent/
├── server.js              # ملف الخادم الرئيسي
├── public/
│   ├── index.html        # الصفحة الرئيسية
│   ├── styles.css        # أنماط CSS
│   └── script.js         # JavaScript التفاعلي
├── package.json          # المكتبات المطلوبة
├── .gitignore           # ملفات Git المستثناة
└── README.md            # هذا الملف
```

## التكنولوجيا المستخدمة

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Storage**: In-memory (يمكن استبداله بقاعدة بيانات حقيقية)

## النشر

### نشر على Heroku

```bash
# تثبيت Heroku CLI
# ثم قم بتسجيل الدخول
heroku login

# إنشاء تطبيق جديد
heroku create pubg-pro-hub

# نشر التطبيق
git push heroku main
```

### نشر على Netlify

```bash
# بناء المشروع
npm run build

# نشر المجلد public على Netlify
```

## المساهمة

نرحب بالمساهمات! يرجى:
1. عمل Fork للمشروع
2. إنشاء فرع جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت MIT License - انظر ملف LICENSE للتفاصيل.

## الدعم

للمساعدة والاستفسارات، يرجى التواصل عبر:
- البريد الإلكتروني: info@pubgprohub.com
- الموقع: https://pubgprohub.com

## الشكر والتقدير

شكر خاص لجميع المساهمين والمستخدمين الذين يدعمون هذا المشروع.

---

**تم إنشاؤه بـ ❤️ للاعبي ببجي الاحترافيين**
