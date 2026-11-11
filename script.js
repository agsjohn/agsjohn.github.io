document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButtons = document.querySelectorAll('.themeToggle');
    const body = document.body;

    function toggleAllThemeClasses() {
        body.classList.toggle('bodyBlack');
        body.classList.toggle('bodyWhite');

        const themedElements = document.querySelectorAll(':not(body)[class*="Black"], :not(body)[class*="White"]');

        themedElements.forEach(element => {
            const classes = Array.from(element.classList);
            classes.forEach(className => {
                if (className.endsWith('Black')) {
                    const newClass = className.replace('Black', 'White');
                    element.classList.remove(className);
                    element.classList.add(newClass);
                } else if (className.endsWith('White')) {
                    const newClass = className.replace('White', 'Black');
                    element.classList.remove(className);
                    element.classList.add(newClass);
                }
            });
        });
    }

    function applyThemeToggle() {
        toggleAllThemeClasses();
        localStorage.setItem('theme', body.className);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== body.className) {
        toggleAllThemeClasses();
    }
    
    themeToggleButtons.forEach(button => {
        button.addEventListener('click', applyThemeToggle);
    });

    // --- Internacionalização (i18n) ---
    const langToggleButtons = document.querySelectorAll('.langToggle');

    function applyLanguage(lang) {
        if (typeof translations === 'undefined' || !translations[lang]) return;

        const langData = translations[lang];

        document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
        if (langData.title) {
            document.title = langData.title;
        }

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = langData[key];

            if (translation !== undefined) {
                if (typeof translation === 'string' && (translation.includes('<') || translation.includes('&bull;') || translation.includes('&copy;'))) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Atualiza o arquivo de download do currículo de acordo com o idioma
        const resumeFile = lang === 'en' ? 'files/JoaoVitorM_Resume.pdf' : 'files/JoaoVitorM_Curriculo.pdf';
        const resumeDownloadName = lang === 'en' ? 'JoaoVitorM_Resume.pdf' : 'JoaoVitorM_Curriculo.pdf';
        const resumeLinks = document.querySelectorAll('a[data-i18n="presentation.resume"]');
        resumeLinks.forEach(link => {
            link.setAttribute('href', resumeFile);
            link.setAttribute('download', resumeDownloadName);
        });

        // O botão exibe o próximo idioma para o qual o usuário pode alternar
        const nextLang = lang === 'pt' ? 'EN' : 'PT';
        const ariaLabel = lang === 'pt' ? 'Mudar idioma para inglês' : 'Mudar idioma para português';
        langToggleButtons.forEach(button => {
            button.textContent = nextLang;
            button.setAttribute('aria-label', ariaLabel);
            button.setAttribute('title', ariaLabel);
        });

        localStorage.setItem('language', lang);
    }

    let isLangSwitching = false;

    function toggleLanguage() {
        if (isLangSwitching) return;
        isLangSwitching = true;

        const currentLang = localStorage.getItem('language') || 'pt';
        const newLang = currentLang === 'pt' ? 'en' : 'pt';

        // Dispara animação de rotação (flip) nos botões e fade out no texto
        langToggleButtons.forEach(button => button.classList.add('lang-flipping'));
        body.classList.add('lang-transition-active', 'lang-changing');

        // No meio da transição (quando o botão está de lado e o texto esmaecido), troca os textos
        setTimeout(() => {
            applyLanguage(newLang);
            body.classList.remove('lang-changing');
        }, 160);

        // Finaliza a animação e reseta os estados
        setTimeout(() => {
            body.classList.remove('lang-transition-active');
            langToggleButtons.forEach(button => button.classList.remove('lang-flipping'));
            isLangSwitching = false;
        }, 340);
    }

    const savedLanguage = localStorage.getItem('language') || 'pt';
    applyLanguage(savedLanguage);

    langToggleButtons.forEach(button => {
        button.addEventListener('click', toggleLanguage);
    });

    window.toggleMenu = function() {
        const sidebar = document.getElementById('menu-toggle');
        if (sidebar.checked) {
            sidebar.checked = false;
        } else {
            sidebar.checked = true;
        }
    };

    document.querySelectorAll('.slide-menu button:not(.themeToggle):not(.langToggle)').forEach(item => {
        item.addEventListener('click', () => {
            toggleMenu();
        });
    });

    document.querySelectorAll('.slide-menu li').forEach(item => {
        item.addEventListener('click', () => {
            toggleMenu();
        });
    });

    document.querySelectorAll('.overlay').forEach(item => {
        item.addEventListener('click', () => {
            toggleMenu();
        });
    });

    window.addEventListener('resize', function() {
        const sidebar = document.querySelector('.slide-menu');
        if (window.innerWidth > 767) {
            if (sidebar.checked) {
                sidebar.checked = false;
            }
        }
    });

    document.addEventListener('mousemove', (e) => {
        const glow = document.getElementById('cursor-glow');
        window.requestAnimationFrame(() => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    });

    window.addEventListener('scroll', function() {
        const topButton = document.querySelector('.topButton');
        const presentationSection = document.querySelector('#presentation');
        const presentationHeight = presentationSection.offsetHeight;
        
        if (window.scrollY > presentationHeight) {
            topButton.classList.add('show');
        } else {
            topButton.classList.remove('show');
        }
    });
});