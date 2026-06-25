/* ===================================
   DOM LOADED
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavbar();

    initializeCounters();

    initializeScrollAnimations();

    initializeSmoothScrolling();

    initializeBackToTop();

    initializeGalleryEffects();

    initializeMobileMenu();

    initializeFormValidation();

    initializeTranslation();

});


/* ===================================
   NAVBAR EFFECT
=================================== */

function initializeNavbar() {

    const header = document.querySelector("header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 100) {

            header.style.padding = "0px";
            header.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.15)";

        } else {

            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,0.08)";
        }

    });

}


/* ===================================
   SMOOTH SCROLLING
=================================== */

function initializeSmoothScrolling() {

    document.querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                e.preventDefault();

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });

}


/* ===================================
   COUNTER ANIMATION
=================================== */

function initializeCounters() {

    const counters =
        document.querySelectorAll(".stat-card h3");

    if (!counters.length) return;

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const counter =
                        entry.target;

                    const target =
                        parseInt(
                            counter.innerText.replace(/\D/g, '')
                        );

                    animateCounter(counter, target);

                    observer.unobserve(counter);

                }

            });

        }, { threshold: 0.5 });

    counters.forEach(counter =>
        observer.observe(counter)
    );

}


function animateCounter(element, target) {

    let count = 0;

    const speed = target / 100;

    const update = () => {

        count += speed;

        if (count < target) {

            element.innerText =
                Math.floor(count) + "+";

            requestAnimationFrame(update);

        } else {

            element.innerText =
                target + "+";

        }

    };

    update();

}


/* ===================================
   SCROLL REVEAL ANIMATION
=================================== */

function initializeScrollAnimations() {

    const elements =
        document.querySelectorAll(
            "section, .card, .facility-grid div"
        );

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show-element"
                    );

                }

            });

        }, {
            threshold: 0.15
        });

    elements.forEach(element => {

        element.classList.add(
            "hidden-element"
        );

        observer.observe(element);

    });

}


/* ===================================
   ACTIVE MENU HIGHLIGHT
=================================== */

window.addEventListener("scroll", () => {

    let current = "";

    document.querySelectorAll("section")
        .forEach(section => {

            const sectionTop =
                section.offsetTop;

            if (
                pageYOffset >=
                sectionTop - 150
            ) {

                current =
                    section.getAttribute("id");

            }

        });

    document.querySelectorAll(
        ".nav-links a"
    ).forEach(link => {

        link.classList.remove(
            "active-link"
        );

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add(
                "active-link"
            );

        }

    });

});


/* ===================================
   BACK TO TOP BUTTON
=================================== */

function initializeBackToTop() {

    const button =
        document.createElement("button");

    button.innerHTML = "↑";

    button.id = "backToTop";

    document.body.appendChild(button);

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.style.display = "block";

        } else {

            button.style.display = "none";

        }

    });

}


/* ===================================
   GALLERY EFFECTS
=================================== */

function initializeGalleryEffects() {

    const images =
        document.querySelectorAll(
            ".gallery-grid img"
        );

    images.forEach(image => {

        image.addEventListener(
            "mouseenter",
            () => {

                image.style.transform =
                    "scale(1.08) rotate(1deg)";

            }
        );

        image.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "scale(1) rotate(0deg)";

            }
        );

    });

}


/* ===================================
   PARALLAX HERO EFFECT
=================================== */

window.addEventListener("scroll", () => {

    const hero =
        document.querySelector("#hero");

    if (!hero) return;

    const scroll =
        window.pageYOffset;

    hero.style.backgroundPositionY =
        scroll * 0.5 + "px";

});


/* ===================================
   LOADING ANIMATION
=================================== */

window.addEventListener("load", () => {

    const loader =
        document.querySelector(".loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});


/* ===================================
   CURRENT YEAR IN FOOTER
=================================== */

const yearElement =
    document.getElementById("currentYear");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}

/* ===================================
   MOBILE MENU TOGGLE
=================================== */

function initializeMobileMenu() {

    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

    }

}

/* ===================================
   FORM VALIDATION
=================================== */
function initializeFormValidation() {
    const form = document.getElementById('complaint-form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Clear previous errors
        form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

        // --- Field Validations ---

        // Name
        const name = form.querySelector('[name="name"]');
        if (name.value.trim() === '') {
            showError(name, 'कृपया अपना नाम दर्ज करें।');
            isValid = false;
        }

        // Mobile
        const mobile = form.querySelector('[name="mobile"]');
        if (mobile.value.trim() === '') {
            showError(mobile, 'कृपया अपना मोबाइल नंबर दर्ज करें।');
            isValid = false;
        } else if (!/^\d{10}$/.test(mobile.value.trim())) {
            showError(mobile, 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।');
            isValid = false;
        }

        // Category
        const category = form.querySelector('[name="category"]');
        if (category.value === '') {
            showError(category, 'कृपया एक श्रेणी चुनें।');
            isValid = false;
        }

        // Subject
        const subject = form.querySelector('[name="subject"]');
        if (subject.value.trim() === '') {
            showError(subject, 'कृपया विषय दर्ज करें।');
            isValid = false;
        }

        // Message
        const message = form.querySelector('[name="complaint"]');
        if (message.value.trim() === '') {
            showError(message, 'कृपया अपना संदेश लिखें।');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Stop form submission
        }
    });

    function showError(inputElement, message) {
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
        }
        inputElement.classList.add('invalid');
    }
}

/* ===================================
   TRANSLATION
=================================== */

function initializeTranslation() {
    const translations = {
        // Header & Footer
        'school_name': 'Acharya Raghuveer Inter College',
        'school_address_short': 'Raghuveer Nagar, Ruma, Kanpur',
        'nav_home': 'Home',
        'nav_about': 'About',
        'nav_about_institute': 'About Institute',
        'nav_vision_mission': 'Vision & Mission',
        'nav_values': 'Our Values',
        'nav_academics': 'Academics',
        'nav_courses': 'Courses',
        'nav_admission_process': 'Admission Process',
        'nav_activities': 'Activities',
        'nav_upcoming_events': 'Upcoming Events',
        'nav_latest_news': 'Latest News',
        'nav_gallery': 'School Gallery',
        'nav_contact': 'Contact / Suggestion',
        'school_motto_quote': '"Vayam Rashtre Jagriyam"',
        'footer_desc': 'An ideal educational institute with a wonderful blend of culture, discipline, and modern education.',
        'footer_links_title': 'Important Links',
        'footer_link_about': 'About School',
        'footer_link_academics': 'Academic Programs',
        'footer_link_admission': 'Admission Process',
        'footer_link_news': 'Latest News',
        'footer_link_gallery': 'School Gallery',
        'footer_link_contact': 'Contact / Suggestion',
        'footer_contact_title': 'Contact Information',
        'footer_address': 'Raghuveer Nagar, Ruma,<br>Kanpur, Uttar Pradesh - 208008',
        'footer_email': 'aricrooma@gmail.com',
        'footer_location_title': 'Location & Media',
        'footer_copyright': '© <span id="currentYear">2026</span> Acharya Raghuveer Inter College | All Rights Reserved',
        'footer_credits': 'Website Designed & Developed By <strong>Pinweb Private Limited</strong>',
        'erp_login': 'ERP Login',
        'erp_student_login': 'Student / Parent Login',
        'erp_admin_login': 'Admin / Staff Login',

        // Home Page
        'school_motto': 'Vayam Rashtre Jagriyam',
        'hero_subtitle': 'Vedic Values, Modern Education, and a Bright Future',
        'hero_btn_admission': 'Admission Process',
        'hero_btn_about': 'About School',
        'live_updates': 'Live Updates',
        'notice_board_title': '📢 Notice Board',
        'view_all_news': 'View All News',
        'upcoming_events_title': '<i class="fas fa-calendar-alt"></i> Upcoming Events',
        'view_all_events': 'View All Events',
        'acharya_raghuveer_ji': 'Acharya Raghuveer Ji',
        'read_more': 'Read More',
        'stat_students': 'Students',
        'stat_experience': 'Years of Experience',
        'stat_results': 'Excellent Results',
        'academics_title': 'Academic Programs',
        'middle_school_title': 'Middle School',
        'middle_school_desc': 'Focus on foundational education, values, and holistic development for students from Class 6 to 8.',
        'high_school_title': 'High School',
        'high_school_desc': 'Excellent board exam preparation and modern education system for students of Class 9 and 10.',
        'intermediate_title': 'Intermediate',
        'intermediate_desc': 'High-level guidance and career counseling by expert teachers in Science/Commerce/Arts streams.',
        'gallery_title': 'School Glimpses',
        'view_full_gallery': 'View Full Gallery',
        'chairman_message_title': 'Sri Premchandra Gupta (Chairman)',
        'manager_message_title': 'Sri Prashant Suri (Manager)',
        'principal_message_title': 'Sri Girijesh Narayan Tripathi (Principal)',
        'our_mentors_title': 'Our Mentors',
        'facilities_title': 'Our Excellent Facilities',
        'facility_1_title': 'Smart Classes',
        'facility_1_desc': 'Modern classrooms equipped with digital boards and projectors.',
        'facility_2_title': 'Computer Lab',
        'facility_2_desc': 'Modern computer lab with latest software and high-speed internet.',
        'facility_3_title': 'Science Laboratory',
        'facility_3_desc': 'Fully equipped practical labs for Physics, Chemistry, and Biology.',
        'facility_4_title': 'Rich Library',
        'facility_4_desc': 'A vast collection of thousands of books, magazines, and informative newspapers.',
        'facility_5_title': 'Large Sports Complex',
        'facility_5_desc': 'Excellent arrangements for indoor and outdoor games for physical development.',
        'facility_6_title': 'CCTV Security',
        'facility_6_desc': '24x7 strict security surveillance through CCTV cameras in the entire campus.',
        'facility_7_title': 'N.C.C.',
        'facility_7_desc': 'Development of discipline, leadership, and a spirit of national service among students.',
        'facility_8_title': 'Health & First Aid',
        'facility_8_desc': 'Adequate first aid facilities are available in the school, keeping in mind the health and safety of students.',
        'achievements_title': 'Our Achievements',
        'achievement_1_title': 'Excellent Exam Results',
        'achievement_1_desc': 'For the past several years, the school\'s board exam results have been 100%. Many students have brought glory to the institution by securing positions in the merit list of the Saraisaul block.',
        'achievement_2_title': 'Medals in Sports',
        'achievement_2_desc': 'Our students have brought glory to the school by winning numerous gold and silver medals in block and district level sports competitions.',
        'achievement_3_title': 'Science and Innovation',
        'achievement_3_desc': 'Achieved first place in the college-level science exhibition. Honored with a special award for the selection of a science model at the block level.',
        'notice_1_title': '📢 Admissions Open for Session 2026-27',
        'notice_1_desc': 'Admission process for classes 6 to 12 is ongoing. Contact soon for limited seats.',
        'notice_2_title': '📝 Regular Attendance Mandatory',
        'notice_2_desc': 'All students are requested to maintain regular attendance and discipline in the school.',
        'notice_3_title': '💻 Smart Class & Computer Education',
        'notice_3_desc': 'Quality education is being provided to students through modern technology-based teaching systems.',
        'notice_4_title': '🏆 Sports & Co-curricular Activities',
        'notice_4_desc': 'Various sports and cultural programs are organized for the all-round development of students.',
        'notice_5_title': '🎯 Career Guidance & Counseling',
        'notice_5_desc': 'Career counseling and guidance are available for senior students by expert teachers.',
        'notice_6_title': '📖 Monthly Exam Information',
        'notice_6_desc': 'The date and time-table for the upcoming monthly examination will be announced soon.',
        'notice_7_title': '🌿 Clean Campus, Healthy Environment',
        'notice_7_desc': 'Please cooperate in keeping the school campus clean and green.',
        'notice_8_title': '📞 Contact & Support',
        'notice_8_desc': 'For any information, please contact the school office on working days.',
        'event_1_title': 'International Yoga Day <span class="blink-badge">Soon</span>',
        'event_1_desc': 'A grand mass yoga event in the school premises.',
        'event_2_title': 'Tree Plantation Drive',
        'event_2_desc': 'A special awareness campaign for environmental protection.',
        'event_3_title': 'Independence Day Celebration',
        'event_3_desc': 'Flag hoisting and colorful cultural programs at the school.',
        'event_4_title': 'Science Exhibition',
        'event_4_desc': 'Display of science models and innovations by students.',
        'event_5_title': 'Teachers\' Day',
        'event_5_desc': 'A special event organized by students in honor of the teachers.',
        'faculty_role_1': 'Senior Teacher & In-charge',
        'faculty_role_2': 'Senior Teacher & Exam Head', 
        'faculty_role_3': 'Project Coordinator',
        'faculty_role_4': '(Teacher)',
        'faculty_role_5': '(Teacher)',
        'faculty_role_6': '(Teacher)',
        'faculty_role_7': '(Teacher)',
        'faculty_role_8': '(Teacher)',
        'faculty_role_9': '(Teacher)',
        'faculty_role_10': '(Teacher)',
        'faculty_role_11': '(Teacher)',
        'faculty_role_12': '(Teacher)',
        'faculty_role_13': '(Teacher)',
        'faculty_role_14': '(Teacher)',

        // About Page
        'about_banner_title': 'About The School',
        'about_banner_subtitle': 'A confluence of Indian culture, national consciousness, and excellent education',
        'about_school_title': 'Acharya Raghuveer Inter College',
        'about_school_p1': 'Acharya Raghuveer Inter College, located in Raghuveer Nagar, Ruma, Kanpur, is an educational institution dedicated to the coordination of Indian culture, moral values, patriotism, and modern education.',
        'about_school_p2': 'The school is run in accordance with Indian culture, teaching methods, and high ideals. The aim of the school is not only to provide academic excellence but also to ensure the overall development of students\' personality, character, and leadership abilities.',
        'establishment_title': 'Establishment',
        'establishment_p1': 'For the upliftment of the nation, the priest of the path of knowledge, the then National President of the Bharatiya Jana Sangh, Dr. Acharya Raghuveer Ji, stirred the masses and awakened in them a sense of national identity, self-esteem, and pride. He continuously strived to lead society on the path of intellectual freedom, cultural consciousness, and respect for the national language, Hindi.',
        'establishment_p2': 'While going to address an election rally of socialist thinker Dr. Rammanohar Lohia for the propagation of these ideas, on May 14, 1963, Dr. Acharya Raghuveer Ji\'s car met with an accident at this very spot near Hathipur village assembly, Raghuveer Nagar, and this visionary sage of independent India passed away.',
        'establishment_p3': 'To immortalize the personality and work of Acharya Ji, \'Acharya Raghuveer Inter College\', Raghuveer Nagar, Ruma, Kanpur was established with the courtesy of the then District Minister of Bharatiya Jana Sangh, Kanpur, the late Rajeshwar Prasad Awasthi, and prominent industrialist and social worker Shri Premchandra Gupta. The school is run in accordance with Indian culture, teaching methods, and high ideals.',
        'establishment_p4': 'Today, this institution, as a source of inspiration for knowledge, values, and nation-building for thousands of students, is making a significant contribution to the progress of society and the nation.',
        'our_vision_title': 'Our Vision',
        'vision_title': '<i class="fas fa-eye"></i> Vision',
        'vision_desc': 'Our ultimate goal is to offer our lives selflessly at the feet of Mother India by acquiring immense physical strength, strong self-confidence, intellectual capacity, and boundless emotional power.',
        'mission_title': '<i class="fas fa-bullseye"></i> Mission',
        'mission_desc': 'To develop a national education system that can build a young generation that is imbued with Hindutva and patriotism, fully developed physically, vitally, mentally, and spiritually, and can successfully face the current challenges of life, dedicating their lives to freeing our poor, deprived brethren living in villages, forests, caves, and slums from social evils, exploitation, and deprivation, and making the national life harmonious, prosperous, and cultured.',
        'our_values_title': 'Our Values',
        'value_1': '<i class="fas fa-flag"></i> Nation First',
        'value_2': '<i class="fas fa-om"></i> Indian Culture & Values',
        'value_3': '<i class="fas fa-user-shield"></i> Discipline & Character Building',
        'value_4': '<i class="fas fa-book-open"></i> Quality Education',
        'value_5': '<i class="fas fa-hands-helping"></i> Social Responsibility',
        'value_6': '<i class="fas fa-lightbulb"></i> Leadership & Personality Development',
        'quote_p': 'Education is that which leads man on the path of knowledge, culture, and self-development.',

        // Complaint Page
        'contact_banner_title': 'Contact & Suggestions',
        'contact_banner_subtitle': 'Your valuable suggestions and guidance are extremely important to us.',
        'contact_form_title': '<i class="fas fa-paper-plane"></i> Contact Online',
        'contact_form_subtitle': 'Share your thoughts, questions, or suggestions on school administration, teaching system, or any other subject.',
        'label_your_name': 'Your Name <span style="color: red;">*</span>',
        'placeholder_name': 'Enter your full name',
        'label_mobile': 'Mobile Number <span style="color: red;">*</span>',
        'placeholder_mobile': '10-digit mobile number',
        'label_email': 'Email (Optional)',
        'placeholder_email': 'Enter your email address',
        'label_student_name': 'Student\'s Name (if applicable)',
        'placeholder_student_name': 'Enter student\'s name',
        'label_class': 'Class',
        'select_class': 'Select Class',
        'class_6': 'Class 6',
        'class_7': 'Class 7',
        'class_8': 'Class 8',
        'class_9': 'Class 9',
        'class_10': 'Class 10',
        'class_11': 'Class 11',
        'class_12': 'Class 12',
        'label_category': 'Category <span style="color: red;">*</span>',
        'select_category': 'Select Category',
        'cat_suggestion': 'Suggestion',
        'cat_complaint': 'Complaint',
        'cat_inquiry': 'Inquiry',
        'cat_other': 'Other',
        'label_subject': 'Subject <span style="color: red;">*</span>',
        'placeholder_subject': 'Main subject of your message',
        'label_message': 'Your Message / Details <span style="color: red;">*</span>',
        'placeholder_message': 'Write your message or suggestion in detail here...',
        'label_attachment': 'Related Document / Photo (if any)',
        'btn_send_message': '<i class="fas fa-paper-plane"></i> Send Message',
        'contact_info_title': '<i class="fas fa-headset"></i> Contact Information',
        'contact_info_p': 'For any immediate assistance or inquiry, you can contact our office directly or visit the school premises.',
    };

    const translateBtn = document.getElementById('translate-btn');
    if (!translateBtn) return;

    let originalTexts = {};
    let originalPlaceholders = {};

    // Store original texts
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        originalTexts[key] = element.innerHTML;
    });

    // Store original placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        originalPlaceholders[key] = element.placeholder;
    });

    const updateTexts = (language) => {
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (language === 'en' && translations[key]) {
                element.innerHTML = translations[key];
            } else if (language === 'hi' && originalTexts[key]) {
                element.innerHTML = originalTexts[key];
            }
        });
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (language === 'en' && translations[key]) {
                element.placeholder = translations[key];
            } else if (language === 'hi' && originalPlaceholders[key]) {
                element.placeholder = originalPlaceholders[key];
            }
        });

        if (language === 'en') {
            translateBtn.textContent = 'हिन्दी';
            translateBtn.dataset.lang = 'hi';
        } else {
            translateBtn.textContent = 'English';
            translateBtn.dataset.lang = 'en';
        }
        localStorage.setItem('preferredLanguage', language);
    };

    translateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentLang = translateBtn.dataset.lang;
        if (currentLang === 'en') {
            updateTexts('en');
        } else {
            updateTexts('hi');
        }
    });

    // On page load, check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang === 'en') {
        // Use a small timeout to ensure all DOM elements are ready
        setTimeout(() => updateTexts('en'), 100);
    }
}