// API Base URL
const API_BASE_URL = '';

// Navigation active link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Set home as active on page load
window.addEventListener('load', () => {
    document.querySelector('a[href="#home"]').classList.add('active');
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Sensitivity Calculator Logic
async function calculateSensitivity() {
    const deviceType = document.getElementById('deviceType').value;
    const playstyle = document.getElementById('playstyle').value;
    const experience = document.getElementById('experience').value;

    if (!deviceType || !playstyle || !experience) {
        alert('الرجاء ملء جميع الحقول');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/calculate-sensitivity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deviceType,
                playstyle,
                experience
            })
        });

        if (!response.ok) {
            throw new Error('خطأ في الحساب');
        }

        const result = await response.json();
        const sensitivity = result.data;

        // Display results
        document.getElementById('cameraSensitivity').textContent = sensitivity.camera;
        document.getElementById('viewSensitivity').textContent = sensitivity.view;
        document.getElementById('zoom2xSensitivity').textContent = sensitivity.zoom2x;
        document.getElementById('zoom4xSensitivity').textContent = sensitivity.zoom4x;
        document.getElementById('zoom6xSensitivity').textContent = sensitivity.zoom6x;
        document.getElementById('zoom8xSensitivity').textContent = sensitivity.zoom8x;

        // Show result section
        document.getElementById('result').style.display = 'block';

        // Update tips based on selections
        updateTips(deviceType, playstyle, experience);

        // Scroll to result
        setTimeout(() => {
            document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء الحساب. يرجى المحاولة مرة أخرى.');
    }
}

function updateTips(deviceType, playstyle, experience) {
    const tipsList = document.getElementById('tipsList');
    let tips = [];

    // Device-specific tips
    if (deviceType === '40') {
        tips.push('جهازك يعمل بـ 40 فريم - تأكد من تقليل جودة الرسومات لتحسين الأداء');
        tips.push('استخدم حساسية أعلى قليلاً لتعويض الفريمات المنخفضة');
    } else if (deviceType === '60') {
        tips.push('أداء جيد بـ 60 فريم - حاول الحفاظ على هذا الأداء');
        tips.push('الإعدادات متوازنة وموصى بها للاعبين المتوسطين');
    } else if (deviceType === '90') {
        tips.push('أداء ممتاز بـ 90 فريم - استمتع بسلاسة عالية');
        tips.push('يمكنك تفعيل رسومات أفضل مع الحفاظ على الأداء');
    } else if (deviceType === '120') {
        tips.push('أداء احترافي بـ 120 فريم - أنت جاهز للمسابقات');
        tips.push('استخدم حساسية منخفضة للدقة العالية في التصويب');
    }

    // Playstyle-specific tips
    if (playstyle === 'aggressive') {
        tips.push('أسلوب عدواني: تدرب على الحركات السريعة والتصويب السريع');
        tips.push('استخدم الأسلحة القريبة والمتوسطة المدى');
    } else if (playstyle === 'balanced') {
        tips.push('أسلوب متوازن: مرن في جميع الحالات القتالية');
        tips.push('تدرب على جميع أنواع الأسلحة والمسافات');
    } else if (playstyle === 'tactical') {
        tips.push('أسلوب تكتيكي: ركز على الدقة والتخطيط');
        tips.push('استخدم الأسلحة البعيدة والقنص');
    }

    // Experience-specific tips
    if (experience === 'beginner') {
        tips.push('ابدأ بالتدريب في أوضاع التدريب قبل المباريات الحقيقية');
        tips.push('لا تغير الإعدادات بشكل متكرر - دع نفسك تتأقلم');
    } else if (experience === 'intermediate') {
        tips.push('حاول تحسين مهاراتك في التصويب والتحكم بالأسلحة');
        tips.push('شاهد فيديوهات اللاعبين المحترفين لتعلم استراتيجيات جديدة');
    } else if (experience === 'advanced') {
        tips.push('ركز على تحسين سرعة ردود أفعالك');
        tips.push('شارك في المسابقات والبطولات');
    } else if (experience === 'pro') {
        tips.push('استمر في التدريب المكثف والمستمر');
        tips.push('حلل أخطاءك وتعلم من المباريات السابقة');
    }

    // Add general tips
    tips.push('جرب الإعدادات وعدّلها حسب تفضيلك الشخصي');
    tips.push('تدرب على الإعدادات الجديدة لمدة ساعات قبل الحكم عليها');

    // Display tips
    tipsList.innerHTML = tips.map(tip => `<li>${tip}</li>`).join('');
}

async function saveSettings() {
    const userId = document.getElementById('userId').value;
    const deviceType = document.getElementById('deviceType').value;
    const playstyle = document.getElementById('playstyle').value;
    const experience = document.getElementById('experience').value;

    if (!userId) {
        alert('الرجاء إدخال معرف المستخدم لحفظ الإعدادات');
        return;
    }

    const sensitivity = {
        camera: document.getElementById('cameraSensitivity').textContent,
        view: document.getElementById('viewSensitivity').textContent,
        zoom2x: document.getElementById('zoom2xSensitivity').textContent,
        zoom4x: document.getElementById('zoom4xSensitivity').textContent,
        zoom6x: document.getElementById('zoom6xSensitivity').textContent,
        zoom8x: document.getElementById('zoom8xSensitivity').textContent
    };

    try {
        const response = await fetch(`${API_BASE_URL}/api/settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                deviceType,
                playstyle,
                experience,
                sensitivity
            })
        });

        if (!response.ok) {
            throw new Error('خطأ في حفظ الإعدادات');
        }

        const result = await response.json();
        showMessage('تم حفظ الإعدادات بنجاح!', 'success');
    } catch (error) {
        console.error('Error:', error);
        showMessage('حدث خطأ أثناء حفظ الإعدادات', 'error');
    }
}

function updateCalculator() {
    // This function can be used to update the calculator in real-time
    // Currently, calculation happens on button click
}

// Form submission
async function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
        });

        if (!response.ok) {
            throw new Error('خطأ في إرسال الرسالة');
        }

        showContactMessage('شكراً لتواصلك معنا! سنرد عليك قريباً.', 'success');
        event.target.reset();
    } catch (error) {
        console.error('Error:', error);
        showContactMessage('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
    }
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `submit-message ${type}`;
    messageDiv.textContent = message;
    
    const resultDiv = document.getElementById('result');
    resultDiv.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function showContactMessage(message, type) {
    const messageDiv = document.getElementById('submitMessage');
    messageDiv.className = `submit-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.fps-card, .tip-card, .info-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
