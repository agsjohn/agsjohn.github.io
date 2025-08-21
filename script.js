document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButtons = document.querySelectorAll('.themeToggle');
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');

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

    window.toggleMenu = function() {
        const isMenuOpen = body.classList.toggle('menu-open');
        const sidebar = document.querySelector('.sidebar');
        if (isMenuOpen) {
            sidebar.style.visibility = 'visible';
        } else {
            setTimeout(() => {
                sidebar.style.visibility = 'hidden';
            }, 400);
        }
    };

    document.querySelectorAll('.sidebar li').forEach(item => {
        item.addEventListener('click', () => {
            if (body.classList.contains('menu-open')) {
                toggleMenu();
            }
        });
    });

    window.addEventListener('resize', function() {
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth > 767) {
            if (body.classList.contains('menu-open')) {
                body.classList.remove('menu-open');
                sidebar.style.visibility = 'hidden';
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
});