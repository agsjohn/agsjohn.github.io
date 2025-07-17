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

    // --- LÓGICA DE CARREGAMENTO DO TEMA (MELHORADA) ---
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== body.className) {
        toggleAllThemeClasses();
    }
    
    themeToggleButtons.forEach(button => {
        button.addEventListener('click', applyThemeToggle);
    });
});


function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const menubutton = document.querySelector('.menu-button svg');
    sidebar.style.display = 'flex';
    menubutton.style.display = "none";
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const menubutton = document.querySelector('.menu-button svg');
    sidebar.style.display = 'none';
    menubutton.style.display = "flex";
}

window.addEventListener('resize', function() {
    if (window.innerWidth > 767) {
        hideSidebar();
    }
});

document.addEventListener('mousemove', (e) => {
    const glow = document.getElementById('cursor-glow');
    window.requestAnimationFrame(() => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
});