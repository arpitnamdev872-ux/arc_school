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

    initializeTranslation();

    moveLanguageSwitcherForMobile();

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

        // Handle dropdowns in mobile menu
        const dropdowns = navLinks.querySelectorAll('.dropdown > a');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                // Check if it's in mobile view
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdownMenu = dropdown.nextElementSibling;
                    dropdownMenu.classList.toggle('active');
                    dropdown.querySelector('i').classList.toggle('fa-rotate-180');
                }
            });
        });

        // Close mobile menu when a non-dropdown link is clicked
        const allLinks = navLinks.querySelectorAll('a');
        allLinks.forEach(link => {
            if (!link.parentElement.classList.contains('dropdown')) {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenu.querySelector('i').classList.replace('fa-times', 'fa-bars');
                });
            }
        });
    }

}

/* ===================================
   MOVE LANGUAGE SWITCHER ON MOBILE
=================================== */

function moveLanguageSwitcherForMobile() {
    const langSwitcher = document.querySelector('.language-switcher');
    const navLinks = document.querySelector('.nav-links');

    if (langSwitcher && navLinks) {
        // Create a list item to wrap the switcher for proper layout in the mobile menu
        const existingMobileSwitcher = navLinks.querySelector('.language-switcher');
        if (existingMobileSwitcher) {
            return; // Already added
        }
        const listItem = document.createElement('li');
        listItem.classList.add('language-switcher');
        const clonedSwitcher = langSwitcher.cloneNode(true);
        listItem.appendChild(clonedSwitcher); // Clone to avoid removing it from top-bar
        navLinks.appendChild(listItem);

        // Re-initialize translation for the cloned button
        initializeTranslation(clonedSwitcher);
    }
}
/* ===================================
   TRANSLATION
=================================== */

function initializeTranslation(context = document) {
    const translateBtn = context.querySelector('#translate-btn') || document.getElementById('translate-btn');
    if (!translateBtn) return;

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
        'acharya_dates': '<i class="fas fa-calendar-alt"></i> <strong>December 30, 1902 - May 14, 1963</strong>',
        'acharya_p1': 'Acharya Raghuveer, a sage of Indian heritage. The great sage Acharya Raghuveer was born on December 30, 1902, in Rawalpindi (Pakistan). From his student life, he was active in social work and dedicated his life to the preservation of Indian culture.',
        'acharya_p2': 'In January 1934, he established Saraswati Vihar and initiated research on Indian knowledge. On April 24, 1948, he was nominated as a member of the Constituent Assembly. From 1952 to 1962, he was a member of the Rajya Sabha.',
        'acharya_p3': 'On May 14, 1963, he passed away in an accident near Ruma village in Kanpur. Acharya Raghuveer Inter College is run in his sacred memory. Acharya Raghuveer Ji\'s objective was the all-round development of students.',

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
        'chairman_message_p1': 'Dear students, parents, and teachers, a warm welcome to all of you on behalf of the Acharya Raghuveer Inter College family. Education is not just a means of acquiring knowledge, but a powerful tool for character building, development of moral values, and awakening a sense of responsibility towards society. Our aim is to provide such quality education to students that they, enriched with knowledge, discipline, self-confidence, and values, can make a meaningful contribution to nation-building. Along with modern teaching methods, Indian culture and human values are given equal importance in the school. We are confident that our teachers, parents, and students together will achieve new heights of excellence. I wish all the students a bright future.',
        'chairman_flip_name': 'Shri Premchandra Gupta',
        'chairman_flip_role': 'Chairman',
        'manager_message_title': 'Sri Prashant Suri (Manager)',
        'manager_message_p1': 'Dear parents, students, and well-wishers, a warm welcome to the new academic session of Acharya Raghuveer Inter College. As we enter another promising year, our focus is centered on the all-round development of students and preparing them to face the challenges of a rapidly changing world. Education is not limited to books but is also a means of building character, developing curiosity, and confidence. We are entering a dynamic era driven by innovation and technology. To make our students excel, we are continuously modernizing our teaching methods and expanding digital learning facilities. Our goal is to equip every student with critical thinking skills, a global perspective, and the resilience to build a bright future. We express our heartfelt gratitude to our parents for their continued trust and support. Let us all together inspire our children to dream big and achieve excellence.',
        'manager_flip_name': 'Shri Prashant Suri',
        'manager_flip_role': 'Manager',
        'principal_message_title': 'Sri Girijesh Narayan Tripathi (Principal)',
        'principal_message_p1': 'Dear students, parents, teachers, and staff, a warm welcome to all in the new academic session. Our aim is to provide students with a safe, inspiring, and enlightening environment where they can develop creativity, moral values, and a spirit of innovation along with academic excellence. In this era of changing times and artificial intelligence, we are committed to preparing students for future challenges through experiential and modern teaching methods. We constantly strive to develop self-confidence, leadership, discipline, time management, and a sense of responsibility towards the nation in our students. We believe that the inherent talent in every student can be nurtured through proper guidance and opportunities. With the cooperation of all of you, we will further strengthen our goal of excellent education and holistic development.',
        'principal_flip_name': 'Shri Girijesh Narayan Tripathi',
        'principal_flip_role': 'Principal',
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
        'notice_1_title': 'Admissions Open for Session 2026-27',
        'notice_1_desc': 'Admission process for classes 6 to 12 is ongoing. Contact soon for limited seats.',
        'notice_2_title': 'Regular Attendance Mandatory',
        'notice_2_desc': 'All students are requested to maintain regular attendance and discipline in the school.',
        'notice_3_title': 'Smart Class & Computer Education',
        'notice_3_desc': 'Quality education is being provided to students through modern technology-based teaching systems.',
        'notice_4_title': 'Sports & Co-curricular Activities',
        'notice_4_desc': 'Various sports and cultural programs are organized for the all-round development of students.',
        'notice_5_title': 'Career Guidance & Counseling',
        'notice_5_desc': 'Career counseling and guidance are available for senior students by expert teachers.',
        'notice_6_title': 'Monthly Exam Information',
        'notice_6_desc': 'The date and time-table for the upcoming monthly examination will be announced soon.',
        'notice_7_title': 'Clean Campus, Healthy Environment',
        'notice_7_desc': 'Please cooperate in keeping the school campus clean and green.',
        'notice_8_title': 'Contact & Support',
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
        'faculty_name_1': 'Shri Arun Awasthi',
        'faculty_name_2': 'Shri Subodh Mishra',
        'faculty_name_3': 'Shri Sushil Shukla',
        'faculty_name_4': 'Smt. Sapna Pandey',
        'faculty_name_5': 'Shri Anupam Kumar',
        'faculty_name_6': 'Shri Lalmani Bajpai',
        'faculty_name_7': 'Sushri Pratishtha Mishra',
        'faculty_name_8': 'Smt. Snehlata',
        'faculty_name_9': 'Shri Archit Tripathi',
        'faculty_name_10': 'Smt. Padmaja Dixit',
        'faculty_name_11': 'Smt. Priyanka Shukla',
        'faculty_name_12': 'Smt. Dipali Gupta',
        'faculty_name_13': 'Smt. Priyanka Shukla',
        'faculty_name_14': 'Shri Ashutosh Maurya',

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
        'contact_info_address': 'Acharya Raghuveer Inter College<br>Raghuveer Nagar, Ruma, Kanpur',
        'contact_info_phone': '+91 9450121054 <br> +91 9838624848',
        'contact_info_email': 'aricrooma@gmail.com',

        // Vision & Mission Page
        'vision_page_title': 'Vision & Mission',
        'vision_page_subtitle': 'Building a strong, cultured, and self-reliant nation',
        'vision_section_title': 'Our Vision',
        'vision_section_desc': 'Our ultimate goal is to acquire immense physical strength, strong self-confidence, intellectual capacity, and boundless emotional power, and to offer our lives selflessly at the feet of Mother India. We envision a society where there is a unique blend of modern knowledge and eternal values.',
        'mission_section_title': 'Our Mission',
        'mission_section_desc': 'To develop a national education system that can create a young generation imbued with Hindutva and patriotism. To be fully developed physically, vitally, mentally, and spiritually, able to successfully face the current challenges of life, and dedicated to empowering the deprived sections of society.',
        'objectives_title': 'Core Objectives',
        'obj_1_title': 'Academic Excellence',
        'obj_1_desc': 'To provide high-quality knowledge and skills to students through a modern education system and smart technology.',
        'obj_2_title': 'Values & Character',
        'obj_2_desc': 'To build excellent character and a disciplined life based on Indian culture, yoga, and moral values.',
        'obj_3_title': 'Social Responsibility',
        'obj_3_desc': 'To develop sensitivity towards society and a spirit of positive contribution to nation-building activities.',
        'obj_4_title': 'Holistic Development',
        'obj_4_desc': 'To ensure the complete development of students at the physical, mental, intellectual, and spiritual levels.',
        'vision_quote_title': '"Sa Vidya Ya Vimuktaye"',
        'vision_quote_desc': '"Education is that which liberates man from ignorance, scarcity, and injustice. Our goal is not just to make literate individuals, but to shape a citizen who is fully aware of their own dharma (duty), self-reliance (swadeshi), and self-respect (swabhiman)."',

        // Academics Page
        'academics_page_title': 'Academic Programs',
        'academics_page_subtitle': 'Towards Knowledge, Values, and Excellence',
        'our_academic_system_title': '<i class="fas fa-university"></i> Our Academic System',
        'academic_system_p1': 'Education from Class 6 to 12 is provided in the school, keeping in mind the intellectual, moral, physical, and cultural development of the students.',
        'academic_system_p2': 'Along with modern education, special emphasis is given to Indian culture, patriotism, and character building in the school.',
        'middle_school_section_title': 'Middle School (6-8)',
        'middle_school_section_desc': 'At this level, the fundamental academic foundation of the students is strengthened.',
        'middle_subject_1': '<i class="fas fa-language"></i> Hindi & English Language Development',
        'middle_subject_2': '<i class="fas fa-calculator"></i> Mathematical Skills Development',
        'middle_subject_3': '<i class="fas fa-atom"></i> Basic Understanding of Science',
        'middle_subject_4': '<i class="fas fa-globe-asia"></i> Social Science & General Knowledge',
        'middle_subject_5': '<i class="fas fa-om"></i> Yoga & Moral Education',
        'middle_subject_6': '<i class="fas fa-laptop-code"></i> Computer Education',
        'high_school_section_title': 'High School (9-10)',
        'high_school_section_desc': 'At this level, students are provided with an in-depth understanding of subjects along with preparation for board exams.',
        'subject_hindi': 'Hindi',
        'subject_english': 'English',
        'subject_math': 'Mathematics',
        'subject_science': 'Science',
        'subject_social': 'Social Science',
        'subject_sanskrit': 'Sanskrit',
        'subject_computer': 'Computer',
        'intermediate_section_title': 'Intermediate (Class 11 & 12)',
        'intermediate_section_desc': 'Keeping in mind the bright future and technical needs of the students, an excellent science faculty is available.',
        'science_stream_title': 'Science Stream',
        'science_stream_desc': 'A unique blend of practical and theoretical education, where excellent guidance is provided by experienced teachers.',
        'subject_physics': '<i class="fas fa-atom"></i> Physics',
        'subject_chemistry': '<i class="fas fa-vial"></i> Chemistry',
        'subject_math_inter': '<i class="fas fa-calculator"></i> Mathematics',
        'subject_biology': '<i class="fas fa-dna"></i> Biology',
        'subject_english_inter': '<i class="fas fa-language"></i> English',
        'subject_hindi_inter': '<i class="fas fa-language"></i> Hindi',
        'methodology_title': 'Teaching Methodology',
        'evaluation_title': 'Evaluation System',
        'evaluation_desc': 'The progress of students is regularly assessed through monthly tests, half-yearly exams, annual exams, and continuous internal assessment.',
        'special_programs_title': 'Special Academic Programs',
        'method_1': '<i class="fas fa-chalkboard-teacher"></i> Smart Classes',
        'method_2': '<i class="fas fa-microscope"></i> Experimental Learning',
        'method_3': '<i class="fas fa-users"></i> Group Discussions',
        'method_4': '<i class="fas fa-project-diagram"></i> Project-Based Learning',
        'method_5': '<i class="fas fa-om"></i> Yoga & Value Education',
        'method_6': '<i class="fas fa-desktop"></i> Digital Teaching',
        'program_1': '<i class="fas fa-lightbulb"></i> Talent Development Program',
        'program_2': '<i class="fas fa-rocket"></i> Science Exhibition',
        'program_3': '<i class="fas fa-square-root-alt"></i> Mathematics Workshop',
        'program_4': '<i class="fas fa-user-tie"></i> Career Guidance Sessions',
        'program_5': '<i class="fas fa-book-reader"></i> Competitive Exam Preparation',
        'program_6': '<i class="fas fa-hand-holding-heart"></i> Values & Personality Development Camps',

        // Admission Page
        'admission_page_title': 'Admission Process',
        'admission_page_subtitle': 'Admissions Open for Session 2026-27',
        'admission_rules_title': 'Admission Rules & Procedure',
        'admission_rules_desc': 'Admission to Acharya Raghuveer Inter College is based on merit and an entrance examination. We are committed to the holistic development of every student.',
        'step1_title': 'Registration',
        'step1_desc': 'Obtain the registration form from the school office or fill it out online.',
        'step2_title': 'Entrance Test / Interview',
        'step2_desc': 'A general entrance test will be conducted for students from Class 6 and above.',
        'step3_title': 'Document Verification',
        'step3_desc': 'Selected students will have to submit the required documents to the office.',
        'required_docs_title': '<i class="fas fa-file-alt"></i> Required Documents',
        'doc_1': '<i class="fas fa-award"></i> Marksheet of the previous class',
        'doc_2': '<i class="fas fa-certificate"></i> Transfer Certificate (TC)',
        'doc_3': '<i class="fas fa-id-card"></i> Aadhaar card of student and parent',
        'doc_4': '<i class="fas fa-camera"></i> 4 Passport-size color photographs',
        'inquiry_form_title': 'Online Admission Inquiry',
        'inquiry_form_desc': 'For admission-related information, please fill out the form below. Our team will contact you shortly.',
        'label_student_name_adm': "Student's Name *",
        'placeholder_student_name_adm': 'Enter full name',
        'label_parent_name_adm': "Parent's Name *",
        'placeholder_parent_name_adm': "Enter parent's name",
        'label_mobile_adm': 'Mobile Number *',
        'placeholder_mobile_adm': '10-digit mobile number',
        'label_class_adm': 'Class for Admission *',
        'select_class_adm': 'Select Class',
        'label_prev_school_adm': 'Previous School',
        'placeholder_prev_school_adm': 'Name of the school (optional)',
        'label_message_adm': 'Inquiry / Message',
        'placeholder_message_adm': 'Write your specific inquiry here...',
        'btn_submit_adm': '<i class="fas fa-paper-plane"></i> Submit',

        // Values Page
        'values_page_title': 'Our Values',
        'values_page_subtitle': 'A confluence of Indian culture, discipline, and modern knowledge',
        'values_intro_title': 'The Fundamental Principles of the School',
        'values_intro_desc': 'At Acharya Raghuveer Inter College, we believe that the true purpose of education is not just literacy, but the building of a character that is useful for oneself, society, and the nation. These six core values guide our every action and thought.',
        'value_culture_title': 'Culture (Sanskriti)',
        'value_culture_desc': 'We respect our eternal culture and Vedic traditions and inspire students to incorporate them into their daily lives.',
        'value_patriotism_title': 'Patriotism (Rashtrabhakti)',
        'value_patriotism_desc': 'Nation First! An unwavering spirit of love for the country, national pride, and contribution to the nation\'s development is instilled in our students.',
        'value_discipline_title': 'Discipline (Anushasan)',
        'value_discipline_desc': 'Discipline is the key to success. We teach students the importance of self-discipline, time management, and adherence to rules.',
        'value_integrity_title': 'Integrity (Satya Nishtha)',
        'value_integrity_desc': 'Truth and honesty are an integral part of our conduct. We give students the courage to choose the right path in every situation.',
        'value_service_title': 'Service (Seva Bhav)',
        'value_service_desc': 'Benevolence is the greatest religion. We consider it our moral duty to selflessly serve the weaker and needy sections of society.',
        'value_excellence_title': 'Excellence (Utkrishtata)',
        'value_excellence_desc': 'We are committed to performing our best and continuously improving in every academic and co-curricular field.',

        // News Page
        'news_page_title': 'Latest News',
        'news_page_subtitle': 'Important school announcements and updates',

        // Events Page
        'events_page_title': 'Upcoming Events',
        'events_page_subtitle': 'Important school events and activities',
        'event_1_page_title': 'International Yoga Day',
        'event_1_page_date': 'June 21, 2026',
        'event_1_page_desc': 'A mass yoga and pranayama session will be organized for all students and teachers in the school premises.',
        'event_2_page_title': 'Tree Plantation Drive',
        'event_2_page_date': 'July 05, 2026',
        'event_2_page_desc': 'To raise awareness about environmental protection, students will plant trees in and around the school campus.',
        'event_3_page_title': 'Independence Day Celebration',
        'event_3_page_date': 'August 15, 2026',
        'event_3_page_desc': 'Organization of flag hoisting, parade, and patriotic cultural programs.',
        'event_4_page_title': 'Science Exhibition',
        'event_4_page_date': 'August 20, 2026',
        'event_4_page_desc': 'A display of science models and innovations created by students. The best models will be awarded.',
        'event_5_page_title': 'Teachers\' Day',
        'event_5_page_date': 'September 05, 2026',
        'event_5_page_desc': 'Special programs and activities will be organized by students in honor of the teachers.',
    };

    let originalTexts = {};
    let originalPlaceholders = {};

    // Merge gallery translations
    Object.assign(translations, {
        'gallery_page_title': 'School Gallery',
        'gallery_page_subtitle': 'Our cherished memories and significant achievements',
        'filter_all': 'All Photos',
        'filter_campus': 'Campus',
        'filter_events': 'Events',
        'filter_achievements': 'Achievements',
        'gallery_img_1_title': 'School Campus',
        'gallery_img_2_title': 'Main Building',
        'gallery_img_3_title': 'Corridor',
        'gallery_img_4_title': 'Statue of Acharya Ji',
        'gallery_img_5_title': 'Cultural Heritage',
        'gallery_img_6_title': 'Office',
    });
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

    // Use a function to handle the click to avoid attaching multiple listeners
    const handleTranslateClick = (e) => {
         e.preventDefault();
         const btn = e.currentTarget;
         const currentLang = btn.dataset.lang || 'en';
         if (currentLang === 'en') {
             updateTexts('en');
         } else {
             updateTexts('hi');
         }
    };

    // Attach event listener to all translate buttons
    document.querySelectorAll('#translate-btn').forEach(btn => {
        btn.addEventListener('click', handleTranslateClick);
    });

    // On page load, check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang === 'en') {
        // Use a small timeout to ensure all DOM elements are ready
        setTimeout(() => updateTexts('en'), 100);
    }
}