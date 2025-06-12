document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('themeToggle');
    const body = document.body;
    const mainHeader = document.getElementById('mainHeader');
    const presentation = document.getElementById('presentation');
    const workexperience = document.getElementById('workexperience');
    const projects = document.getElementById('projects');
    const contact = document.getElementById('contact');
    const footer = document.getElementById('mainFooter');

    function whiteTheme(){
        mainHeader.classList.remove('headerWhite');
        mainHeader.classList.add('headerBlack');
        presentation.classList.remove('presentationWhite');
        presentation.classList.add('presentationBlack');
        workexperience.classList.remove('workWhite');
        workexperience.classList.add('workBlack');
        projects.classList.remove('projectsWhite');
        projects.classList.add('projectsBlack');
        contact.classList.remove('contactWhite');
        contact.classList.add('contactBlack');
        footer.classList.remove('footerWhite');
        footer.classList.add('footerBlack');
    }

    function blackTheme(){
        mainHeader.classList.remove('headerBlack');
        mainHeader.classList.add('headerWhite');
        presentation.classList.remove('presentationBlack');
        presentation.classList.add('presentationWhite');
        workexperience.classList.remove('workBlack');
        workexperience.classList.add('workWhite');
        projects.classList.remove('projectsBlack');
        projects.classList.add('projectsWhite');
        contact.classList.remove('contactBlack');
        contact.classList.add('contactWhite');
        footer.classList.remove('footerBlack');
        footer.classList.add('footerWhite');
    }

    function toggleTheme() {
        if (body.classList.contains('bodyWhite')) {
            body.classList.remove('bodyWhite');
            body.classList.add('bodyBlack');
            whiteTheme();

            localStorage.setItem('theme', 'bodyBlack'); 
        } else {
            body.classList.remove('bodyBlack');
            body.classList.add('bodyWhite');
            blackTheme();
            
            localStorage.setItem('theme', 'bodyWhite'); 
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('bodyWhite', 'bodyBlack'); 
        body.classList.add(savedTheme);

        if (savedTheme === 'bodyBlack') {
            whiteTheme();
        } else {
            blackTheme();
        }
    }

    themeToggleButton.addEventListener('click', toggleTheme);
});