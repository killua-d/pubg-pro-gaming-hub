const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory data storage (في الإنتاج، استخدم قاعدة بيانات حقيقية)
let contactMessages = [];
let userSettings = [];

// Routes

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API لحفظ رسائل التواصل
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
    }

    const newMessage = {
        id: Date.now(),
        name,
        email,
        message,
        timestamp: new Date().toISOString()
    };

    contactMessages.push(newMessage);
    
    res.status(201).json({
        success: true,
        message: 'تم حفظ رسالتك بنجاح',
        data: newMessage
    });
});

// API للحصول على جميع الرسائل (للإدارة)
app.get('/api/contact', (req, res) => {
    res.json({
        total: contactMessages.length,
        messages: contactMessages
    });
});

// API لحفظ إعدادات المستخدم
app.post('/api/settings', (req, res) => {
    const { userId, deviceType, playstyle, experience, sensitivity } = req.body;
    
    if (!userId || !deviceType || !playstyle || !experience) {
        return res.status(400).json({ error: 'البيانات غير كاملة' });
    }

    // البحث عن إعدادات المستخدم الموجودة
    let existingSettings = userSettings.find(s => s.userId === userId);
    
    if (existingSettings) {
        // تحديث الإعدادات الموجودة
        existingSettings = {
            ...existingSettings,
            deviceType,
            playstyle,
            experience,
            sensitivity,
            updatedAt: new Date().toISOString()
        };
    } else {
        // إنشاء إعدادات جديدة
        existingSettings = {
            id: Date.now(),
            userId,
            deviceType,
            playstyle,
            experience,
            sensitivity,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        userSettings.push(existingSettings);
    }

    res.json({
        success: true,
        message: 'تم حفظ الإعدادات بنجاح',
        data: existingSettings
    });
});

// API للحصول على إعدادات المستخدم
app.get('/api/settings/:userId', (req, res) => {
    const { userId } = req.params;
    const settings = userSettings.find(s => s.userId === userId);
    
    if (!settings) {
        return res.status(404).json({ error: 'لم يتم العثور على الإعدادات' });
    }

    res.json(settings);
});

// API لحساب الحساسية
app.post('/api/calculate-sensitivity', (req, res) => {
    const { deviceType, playstyle, experience } = req.body;

    if (!deviceType || !playstyle || !experience) {
        return res.status(400).json({ error: 'البيانات غير كاملة' });
    }

    // Base sensitivity values
    const baseSensitivity = {
        '40': { camera: 100, view: 90, zoom2x: 50, zoom4x: 30, zoom6x: 17, zoom8x: 12 },
        '60': { camera: 90, view: 80, zoom2x: 45, zoom4x: 25, zoom6x: 15, zoom8x: 10 },
        '90': { camera: 80, view: 70, zoom2x: 40, zoom4x: 22, zoom6x: 12, zoom8x: 8 },
        '120': { camera: 70, view: 60, zoom2x: 35, zoom4x: 20, zoom6x: 10, zoom8x: 6 }
    };

    const playstyleMultiplier = {
        'aggressive': 1.15,
        'balanced': 1.0,
        'tactical': 0.85
    };

    const experienceMultiplier = {
        'beginner': 1.1,
        'intermediate': 1.0,
        'advanced': 0.95,
        'pro': 0.85
    };

    let sensitivity = baseSensitivity[deviceType];
    const playstyleMultiplierValue = playstyleMultiplier[playstyle];
    const experienceMultiplierValue = experienceMultiplier[experience];

    sensitivity = {
        camera: Math.round(sensitivity.camera * playstyleMultiplierValue * experienceMultiplierValue),
        view: Math.round(sensitivity.view * playstyleMultiplierValue * experienceMultiplierValue),
        zoom2x: Math.round(sensitivity.zoom2x * playstyleMultiplierValue * experienceMultiplierValue),
        zoom4x: Math.round(sensitivity.zoom4x * playstyleMultiplierValue * experienceMultiplierValue),
        zoom6x: Math.round(sensitivity.zoom6x * playstyleMultiplierValue * experienceMultiplierValue),
        zoom8x: Math.round(sensitivity.zoom8x * playstyleMultiplierValue * experienceMultiplierValue)
    };

    res.json({
        success: true,
        data: sensitivity
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'الصفحة غير موجودة' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'خطأ في الخادم' });
});

app.listen(PORT, () => {
    console.log(`🎮 PUBG Pro Gaming Hub - Server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});
