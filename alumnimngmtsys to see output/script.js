// script.js
class AlumniManagementSystem {
    constructor() {
        this.currentUser = {
            name: 'John Doe',
            role: 'admin', // This should come from authentication
            id: 1
        };
        this.currentPage = 'dashboard';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateNavigation();
        this.loadDashboard();
        this.updateUserInfo();
    }

    setupEventListeners() {
        // Sidebar toggle
        document.getElementById('sidebar-toggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('collapsed');
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                this.closeModal();
            }
        });
    }

    updateUserInfo() {
        document.getElementById('user-name').textContent = this.currentUser.name;
        document.getElementById('user-role').textContent = this.currentUser.role.replace('_', ' ').toUpperCase();
    }

    // Navigation items for different roles
    getNavItems() {
        const navItems = {
            super_admin: [
                { name: 'Dashboard', icon: 'fas fa-tachometer-alt', page: 'dashboard' },
                { name: 'User Management', icon: 'fas fa-users-cog', page: 'user-management' },
                { name: 'Alumni Directory', icon: 'fas fa-address-book', page: 'alumni-directory' },
                { name: 'Graduate Tracking', icon: 'fas fa-user-graduate', page: 'graduate-tracking' },
                { name: 'Event Management', icon: 'fas fa-calendar-alt', page: 'event-management' },
                { name: 'Donations & Campaigns', icon: 'fas fa-donate', page: 'donations-campaigns' },
                { name: 'Job Placement', icon: 'fas fa-briefcase', page: 'job-placement' },
                { name: 'Newsletters & Feedback', icon: 'fas fa-newspaper', page: 'newsletters-feedback' },
                { name: 'Batch Relations', icon: 'fas fa-layer-group', page: 'batch-relations' },
                { name: 'Communication Log', icon: 'fas fa-comments', page: 'communication-log' },
                { name: 'Alumni Requests', icon: 'fas fa-clipboard-list', page: 'alumni-requests' },
                { name: 'Reports', icon: 'fas fa-chart-bar', page: 'reports' },
                { name: 'System Settings', icon: 'fas fa-cogs', page: 'system-settings' },
            ],
            admin: [
                { name: 'Dashboard', icon: 'fas fa-tachometer-alt', page: 'dashboard' },
                { name: 'Alumni Directory', icon: 'fas fa-address-book', page: 'alumni-directory' },
                { name: 'Graduate Tracking', icon: 'fas fa-user-graduate', page: 'graduate-tracking' },
                { name: 'Event Management', icon: 'fas fa-calendar-alt', page: 'event-management' },
                { name: 'Donations & Campaigns', icon: 'fas fa-donate', page: 'donations-campaigns' },
                { name: 'Job Placement', icon: 'fas fa-briefcase', page: 'job-placement' },
                { name: 'Newsletters & Feedback', icon: 'fas fa-newspaper', page: 'newsletters-feedback' },
                { name: 'Batch Relations', icon: 'fas fa-layer-group', page: 'batch-relations' },
                { name: 'Communication Log', icon: 'fas fa-comments', page: 'communication-log' },
                { name: 'Alumni Requests', icon: 'fas fa-clipboard-list', page: 'alumni-requests' },
                { name: 'Reports', icon: 'fas fa-chart-bar', page: 'reports' },
            ],
            registrar: [
                { name: 'Alumni Directory', icon: 'fas fa-address-book', page: 'alumni-directory' },
                { name: 'Graduate Tracking', icon: 'fas fa-user-graduate', page: 'graduate-tracking' },
                { name: 'Batch Relations', icon: 'fas fa-layer-group', page: 'batch-relations' },
                { name: 'Reports', icon: 'fas fa-chart-bar', page: 'reports' },
            ],
            event_manager: [
                { name: 'Event Management', icon: 'fas fa-calendar-alt', page: 'event-management' },
                { name: 'Campaign Management', icon: 'fas fa-bullhorn', page: 'campaign-management' },
                { name: 'Communication Log', icon: 'fas fa-comments', page: 'communication-log' },
                { name: 'Reports', icon: 'fas fa-chart-bar', page: 'reports' },
            ],
            job_manager: [
                { name: 'Job Placement', icon: 'fas fa-briefcase', page: 'job-placement' },
                { name: 'Graduate Tracking', icon: 'fas fa-user-graduate', page: 'graduate-tracking' },
                { name: 'Reports', icon: 'fas fa-chart-bar', page: 'reports' },
            ],
            finance_officer: [
                { name: 'Donations & Campaigns', icon: 'fas fa-donate', page: 'donations-campaigns' },
                { name: 'Reports', icon: 'fas fa-chart-bar', page: 'reports' },
            ],
            alumni: [
                { name: 'Dashboard', icon: 'fas fa-tachometer-alt', page: 'dashboard' },
                { name: 'My Profile', icon: 'fas fa-user', page: 'my-profile' },
                { name: 'Job Board', icon: 'fas fa-briefcase', page: 'job-board' },
                { name: 'Events', icon: 'fas fa-calendar-alt', page: 'events' },
                { name: 'Newsletters', icon: 'fas fa-newspaper', page: 'newsletters' },
                { name: 'Feedback & Requests', icon: 'fas fa-comment-dots', page: 'feedback-requests' },
            ],
        };

        return navItems[this.currentUser.role] || [];
    }

    populateNavigation() {
        const navList = document.getElementById('nav-list');
        navList.innerHTML = '';

        const items = this.getNavItems();
        items.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            a.href = '#';
            a.innerHTML = `<i class="${item.icon}"></i><span>${item.name}</span>`;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo(item.page, item.name);
            });

            if (item.page === this.currentPage) {
                a.classList.add('active');
            }

            li.appendChild(a);
            navList.appendChild(li);
        });
    }

    navigateTo(page, title) {
        this.currentPage = page;
        document.getElementById('page-title').textContent = title;
        
        // Update active navigation
        document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
        event.target.closest('a').classList.add('active');

        // Load page content
        this.loadPageContent(page);
    }

    loadPageContent(page) {
        const content = document.getElementById('content');
        
        switch(page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'alumni-directory':
                this.loadAlumniDirectory();
                break;
            case 'graduate-tracking':
                this.loadGraduateTracking();
                break;
            case 'event-management':
                this.loadEventManagement();
                break;
            case 'job-placement':
                this.loadJobPlacement();
                break;
            default:
                content.innerHTML = `<div class="coming-soon">
                    <i class="fas fa-tools" style="font-size: 48px; color: var(--primary-color); margin-bottom: 20px;"></i>
                    <h2>Coming Soon</h2>
                    <p>This feature is under development.</p>
                </div>`;
        }
    }

    loadDashboard() {
        const dashboardData = this.getDashboardData();
        const content = document.getElementById('content');
        
        content.innerHTML = `
            <div class="dashboard-grid">
                ${dashboardData.cards.map(card => `
                    <div class="dashboard-card">
                        <div class="card-header">
                            <div class="card-icon ${card.type}">
                                <i class="${card.icon}"></i>
                            </div>
                        </div>
                        <div class="card-title">${card.title}</div>
                        <div class="card-value">${card.value}</div>
                        <div class="card-change ${card.changeType}">
                            <i class="fas fa-arrow-${card.changeType === 'positive' ? 'up' : card.changeType === 'negative' ? 'down' : 'right'}"></i>
                            ${card.change}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="quick-actions">
                ${dashboardData.quickActions.map(action => `
                    <div class="action-card" onclick="alumniSystem.${action.action}()">
                        <i class="${action.icon}"></i>
                        <h4>${action.title}</h4>
                        <p>${action.description}</p>
                    </div>
                `).join('')}
            </div>

            <div class="recent-activities">
                <h3>Recent Activities</h3>
                <div class="activity-list">
                    ${dashboardData.recentActivities.map(activity => `
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="${activity.icon}"></i>
                            </div>
                            <div class="activity-content">
                                <p>${activity.description}</p>
                                <small>${activity.time}</small>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getDashboardData() {
        // This would typically come from an API
        const roleBasedData = {
            super_admin: {
                cards: [
                    { title: 'Total Alumni', value: '2,847', icon: 'fas fa-users', type: 'primary', change: '+12% this month', changeType: 'positive' },
                    { title: 'Active Events', value: '8', icon: 'fas fa-calendar', type: 'success', change: '3 upcoming', changeType: 'neutral' },
                    { title: 'Job Placements', value: '156', icon: 'fas fa-briefcase', type: 'warning', change: '+8% this quarter', changeType: 'positive' },
                    { title: 'Total Donations', value: '$45,230', icon: 'fas fa-donate', type: 'danger', change: '+15% this year', changeType: 'positive' }
                ],
                quickActions: [
                    { title: 'Add Alumni', description: 'Register new alumni', icon: 'fas fa-user-plus', action: 'addAlumni' },
                    { title: 'Create Event', description: 'Schedule new event', icon: 'fas fa-calendar-plus', action: 'createEvent' },
                    { title: 'Post Job', description: 'Add job opportunity', icon: 'fas fa-briefcase', action: 'postJob' },
                    { title: 'Send Newsletter', description: 'Broadcast to alumni', icon: 'fas fa-envelope', action: 'sendNewsletter' }
                ],
                recentActivities: [
                    { description: 'New alumni John Smith registered', icon: 'fas fa-user-plus', time: '2 hours ago' },
                    { description: 'Annual reunion event created', icon: 'fas fa-calendar', time: '4 hours ago' },
                    { description: 'Software Engineer position posted', icon: 'fas fa-briefcase', time: '1 day ago' },
                    { description: 'Monthly newsletter sent to 2,500+ alumni', icon: 'fas fa-envelope', time: '2 days ago' }
                ]
            },
            admin: {
                cards: [
                    { title: 'Alumni Records', value: '2,847', icon: 'fas fa-users', type: 'primary', change: '+12% this month', changeType: 'positive' },
                    { title: 'Pending Requests', value: '23', icon: 'fas fa-clock', type: 'warning', change: '5 urgent', changeType: 'negative' },
                    { title: 'Events This Month', value: '5', icon: 'fas fa-calendar', type: 'success', change: '2 completed', changeType: 'neutral' },
                    { title: 'Job Applications', value: '89', icon: 'fas fa-file-alt', type: 'danger', change: '+23% this week', changeType: 'positive' }
                ],
                quickActions: [
                    { title: 'Manage Alumni', description: 'View and edit profiles', icon: 'fas fa-users-cog', action: 'manageAlumni' },
                    { title: 'Review Requests', description: 'Process pending requests', icon: 'fas fa-tasks', action: 'reviewRequests' },
                    { title: 'Event Planning', description: 'Organize events', icon: 'fas fa-calendar-alt', action: 'planEvents' },
                    { title: 'Generate Reports', description: 'Create analytics', icon: 'fas fa-chart-line', action: 'generateReports' }
                ],
                recentActivities: [
                    { description: 'Alumni profile updated by registrar', icon: 'fas fa-edit', time: '1 hour ago' },
                    { description: 'Event registration opened', icon: 'fas fa-door-open', time: '3 hours ago' },
                    { description: 'Job posting approved', icon: 'fas fa-check', time: '5 hours ago' },
                    { description: 'Donation campaign launched', icon: 'fas fa-rocket', time: '1 day ago' }
                ]
            },
            alumni: {
                cards: [
                    { title: 'My Network', value: '156', icon: 'fas fa-network-wired', type: 'primary', change: '+5 connections', changeType: 'positive' },
                    { title: 'Job Matches', value: '12', icon: 'fas fa-bullseye', type: 'success', change: '3 new today', changeType: 'positive' },
                    { title: 'Events Attended', value: '8', icon: 'fas fa-calendar-check', type: 'warning', change: 'Last: Tech Meetup', changeType: 'neutral' },
                    { title: 'Profile Views', value: '47', icon: 'fas fa-eye', type: 'danger', change: '+12 this week', changeType: 'positive' }
                ],
                quickActions: [
                    { title: 'Update Profile', description: 'Keep info current', icon: 'fas fa-user-edit', action: 'updateProfile' },
                    { title: 'Browse Jobs', description: 'Find opportunities', icon: 'fas fa-search', action: 'browseJobs' },
                    { title: 'Join Events', description: 'Network and learn', icon: 'fas fa-handshake', action: 'joinEvents' },
                    { title: 'Submit Feedback', description: 'Share your thoughts', icon: 'fas fa-comment', action: 'submitFeedback' }
                ],
                recentActivities: [
                    { description: 'You applied for Software Developer position', icon: 'fas fa-paper-plane', time: '2 hours ago' },
                    { description: 'Your profile was viewed by Tech Corp', icon: 'fas fa-eye', time: '1 day ago' },
                    { description: 'You registered for Alumni Networking Event', icon: 'fas fa-calendar-plus', time: '3 days ago' },
                    { description: 'You updated your employment status', icon: 'fas fa-briefcase', time: '1 week ago' }
                ]
            }
        };

        return roleBasedData[this.currentUser.role] || roleBasedData.alumni;
    }

    // Quick Action Methods
    addAlumni() {
        this.openModal('Add New Alumni', `
            <form id="add-alumni-form">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" required>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="graduationYear">Graduation Year</label>
                    <input type="number" id="graduationYear" name="graduationYear" min="1950" max="2030" required>
                </div>
                <div class="form-group">
                    <label for="degree">Degree</label>
                    <input type="text" id="degree" name="degree" required>
                </div>
                <div class="form-actions">
                    <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                    <button type="submit" class="btn-primary">Add Alumni</button>
                </div>
            </form>
        `);
    }

    createEvent() {
       
        this.openModal('Create New Event', `
            <form id="create-event-form">
                <div class="form-group">
                    <label for="eventTitle">Event Title</label>
                    <input type="text" id="eventTitle" name="eventTitle" required>
                </div>
                <div class="form-group">
                    <label for="eventType">Event Type</label>
                    <select id="eventType" name="eventType" required>
                        <option value="">Select Type</option>
                        <option value="reunion">Reunion</option>
                        <option value="networking">Networking</option>
                        <option value="seminar">Seminar</option>
                        <option value="workshop">Workshop</option>
                        <option value="social">Social</option>
                        <option value="fundraising">Fundraising</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="eventDate">Date</label>
                        <input type="date" id="eventDate" name="eventDate" required>
                    </div>
                    <div class="form-group">
                        <label for="eventTime">Time</label>
                        <input type="time" id="eventTime" name="eventTime" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="eventLocation">Location</label>
                    <input type="text" id="eventLocation" name="eventLocation" required>
                </div>
                <div class="form-group">
                    <label for="eventDescription">Description</label>
                    <textarea id="eventDescription" name="eventDescription" rows="4"></textarea>
                </div>
                <div class="form-group">
                    <label for="maxAttendees">Max Attendees</label>
                    <input type="number" id="maxAttendees" name="maxAttendees" min="1">
                </div>
                <div class="form-actions">
                    <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                    <button type="submit" class="btn-primary">Create Event</button>
                </div>
            </form>
        `);
    }

    postJob() {
        this.openModal('Post Job Opportunity', `
            <form id="post-job-form">
                <div class="form-group">
                    <label for="jobTitle">Job Title</label>
                    <input type="text" id="jobTitle" name="jobTitle" required>
                </div>
                <div class="form-group">
                    <label for="company">Company</label>
                    <input type="text" id="company" name="company" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="jobType">Job Type</label>
                        <select id="jobType" name="jobType" required>
                            <option value="">Select Type</option>
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="experience">Experience Level</label>
                        <select id="experience" name="experience" required>
                            <option value="">Select Level</option>
                            <option value="entry">Entry Level</option>
                            <option value="mid">Mid Level</option>
                            <option value="senior">Senior Level</option>
                            <option value="executive">Executive</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="location">Location</label>
                    <input type="text" id="location" name="location" required>
                </div>
                <div class="form-group">
                    <label for="salary">Salary Range</label>
                    <input type="text" id="salary" name="salary" placeholder="e.g., $50,000 - $70,000">
                </div>
                <div class="form-group">
                    <label for="jobDescription">Job Description</label>
                    <textarea id="jobDescription" name="jobDescription" rows="5" required></textarea>
                </div>
                <div class="form-group">
                    <label for="requirements">Requirements</label>
                    <textarea id="requirements" name="requirements" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label for="applicationDeadline">Application Deadline</label>
                    <input type="date" id="applicationDeadline" name="applicationDeadline">
                </div>
                <div class="form-actions">
                    <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                    <button type="submit" class="btn-primary">Post Job</button>
                </div>
            </form>
        `);
    }

    sendNewsletter() {
        this.openModal('Send Newsletter', `
            <form id="send-newsletter-form">
                <div class="form-group">
                    <label for="newsletterTitle">Newsletter Title</label>
                    <input type="text" id="newsletterTitle" name="newsletterTitle" required>
                </div>
                <div class="form-group">
                    <label for="recipients">Recipients</label>
                    <select id="recipients" name="recipients" required>
                        <option value="">Select Recipients</option>
                        <option value="all">All Alumni</option>
                        <option value="recent">Recent Graduates (Last 2 Years)</option>
                        <option value="employed">Currently Employed</option>
                        <option value="job-seekers">Job Seekers</option>
                        <option value="donors">Donors</option>
                        <option value="event-attendees">Event Attendees</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="subject">Email Subject</label>
                    <input type="text" id="subject" name="subject" required>
                </div>
                <div class="form-group">
                    <label for="newsletterContent">Content</label>
                    <textarea id="newsletterContent" name="newsletterContent" rows="8" required placeholder="Write your newsletter content here..."></textarea>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="scheduleNewsletter" name="scheduleNewsletter">
                        Schedule for later
                    </label>
                </div>
                <div class="form-group" id="scheduleDateTime" style="display: none;">
                    <label for="scheduleDate">Schedule Date & Time</label>
                    <input type="datetime-local" id="scheduleDate" name="scheduleDate">
                </div>
                <div class="form-actions">
                    <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                    <button type="submit" class="btn-primary">Send Newsletter</button>
                </div>
            </form>
        `);

        // Add event listener for schedule checkbox
        document.getElementById('scheduleNewsletter').addEventListener('change', function() {
            const scheduleDiv = document.getElementById('scheduleDateTime');
            scheduleDiv.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Alumni-specific quick actions
    updateProfile() {
        this.openModal('Update Profile', `
            <form id="update-profile-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="currentCompany">Current Company</label>
                        <input type="text" id="currentCompany" name="currentCompany">
                    </div>
                    <div class="form-group">
                        <label for="currentPosition">Current Position</label>
                        <input type="text" id="currentPosition" name="currentPosition">
                    </div>
                </div>
                <div class="form-group">
                    <label for="employmentStatus">Employment Status</label>
                    <select id="employmentStatus" name="employmentStatus">
                        <option value="employed">Employed</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="self-employed">Self Employed</option>
                        <option value="student">Student</option>
                        <option value="retired">Retired</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="linkedinUrl">LinkedIn Profile</label>
                    <input type="url" id="linkedinUrl" name="linkedinUrl" placeholder="https://linkedin.com/in/yourprofile">
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <textarea id="address" name="address" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label for="bio">Bio</label>
                    <textarea id="bio" name="bio" rows="4" placeholder="Tell us about yourself..."></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                    <button type="submit" class="btn-primary">Update Profile</button>
                </div>
            </form>
        `);
    }

    browseJobs() {
        this.navigateTo('job-board', 'Job Board');
    }

    joinEvents() {
        this.navigateTo('events', 'Events');
    }

    submitFeedback() {
        this.openModal('Submit Feedback', `
            <form id="feedback-form">
                <div class="form-group">
                    <label for="feedbackType">Feedback Type</label>
                    <select id="feedbackType" name="feedbackType" required>
                        <option value="">Select Type</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="complaint">Complaint</option>
                        <option value="compliment">Compliment</option>
                        <option value="feature-request">Feature Request</option>
                        <option value="bug-report">Bug Report</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="feedbackSubject">Subject</label>
                    <input type="text" id="feedbackSubject" name="feedbackSubject" required>
                </div>
                <div class="form-group">
                    <label for="feedbackMessage">Message</label>
                    <textarea id="feedbackMessage" name="feedbackMessage" rows="6" required placeholder="Please provide detailed feedback..."></textarea>
                </div>
                <div class="form-group">
                    <label for="priority">Priority</label>
                    <select id="priority" name="priority">
                        <option value="low">Low</option>
                        <option value="medium" selected>Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="anonymous" name="anonymous">
                        Submit anonymously
                    </label>
                </div>
                <div class="form-actions">
                    <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                    <button type="submit" class="btn-primary">Submit Feedback</button>
                </div>
            </form>
        `);
    }

    // Page loading methods
    loadAlumniDirectory() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="page-header">
                <div class="page-title">
                    <h2>Alumni Directory</h2>
                    <p>Manage and search alumni profiles</p>
                </div>
                <div class="page-actions">
                    <button class="btn-primary" onclick="alumniSystem.addAlumni()">
                        <i class="fas fa-plus"></i> Add Alumni
                    </button>
                    <button class="btn-secondary" onclick="alumniSystem.exportAlumni()">
                        <i class="fas fa-download"></i> Export
                    </button>
                </div>
            </div>

            <div class="filters-section">
                <div class="search-bar">
                    <input type="text" placeholder="Search alumni..." id="alumni-search">
                    <button class="search-btn"><i class="fas fa-search"></i></button>
                </div>
                <div class="filter-options">
                    <select id="graduation-year-filter">
                        <option value="">All Years</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                    <select id="degree-filter">
                        <option value="">All Degrees</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Business Administration">Business Administration</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Medicine">Medicine</option>
                    </select>
                    <select id="employment-filter">
                        <option value="">All Status</option>
                        <option value="employed">Employed</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="self-employed">Self Employed</option>
                    </select>
                </div>
            </div>

            <div class="alumni-grid" id="alumni-grid">
                ${this.generateAlumniCards()}
            </div>
        `;
    }

       generateAlumniCards() {
        // Sample alumni data - this would come from API
        const sampleAlumni = [
            {
                id: 1,
                name: 'John Smith',
                graduationYear: 2020,
                degree: 'Computer Science',
                currentPosition: 'Software Engineer',
                currentCompany: 'Tech Corp',
                location: 'San Francisco, CA',
                profileImage: null,
                employmentStatus: 'employed'
            },
            {
                id: 2,
                name: 'Sarah Johnson',
                graduationYear: 2019,
                degree: 'Business Administration',
                currentPosition: 'Marketing Manager',
                currentCompany: 'Marketing Inc',
                location: 'New York, NY',
                profileImage: null,
                employmentStatus: 'employed'
            },
            {
                id: 3,
                name: 'Mike Davis',
                graduationYear: 2021,
                degree: 'Engineering',
                currentPosition: 'Project Manager',
                currentCompany: 'Build Co',
                location: 'Chicago, IL',
                profileImage: null,
                employmentStatus: 'employed'
            }
        ];

        return sampleAlumni.map(alumni => `
            <div class="alumni-card">
                <div class="alumni-avatar">
                    ${alumni.profileImage ?
                        `<img src="${alumni.profileImage}" alt="${alumni.name}">` :
                        `<div class="avatar-placeholder"><i class="fas fa-user"></i></div>`
                    } <!-- THIS WAS THE MISSING CLOSING TAG -->
                </div>
                <div class="alumni-info">
                    <h3>${alumni.name}</h3>
                    <p><strong>Graduation Year:</strong> ${alumni.graduationYear}</p>
                    <p><strong>Degree:</strong> ${alumni.degree}</p>
                    <p><strong>Current Position:</strong> ${alumni.currentPosition} at ${alumni.currentCompany}</p>
                    <p><strong>Location:</strong> ${alumni.location}</p>
                    <p><strong>Status:</strong> ${alumni.employmentStatus}</p>
                    <button class="btn-secondary" onclick="alumniSystem.viewProfile(${alumni.id})">View Profile</button>
                </div>
            </div>
        `).join('');
    }

// Add these methods to the AlumniManagementSystem class

loadGraduateTracking() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="tracking-header">
            <div>
                <h2>Graduate Tracking</h2>
                <p>Monitor alumni career progress and employment updates</p>
            </div>
            <div class="page-actions">
                <button class="btn-primary" onclick="alumniSystem.sendTrackingForm()">
                    <i class="fas fa-paper-plane"></i> Send Tracking Form
                </button>
                <button class="btn-secondary" onclick="alumniSystem.manualUpdate()">
                    <i class="fas fa-plus"></i> Manual Update
                </button>
            </div>
        </div>

        <div class="tracking-stats">
            <div class="stat-card">
                <div class="stat-number">156</div>
                <div class="stat-label">Total Submissions</div>
            </div>
            <div class="stat-card pending">
                <div class="stat-number">23</div>
                <div class="stat-label">Pending Review</div>
            </div>
            <div class="stat-card processed">
                <div class="stat-number">128</div>
                <div class="stat-label">Processed</div>
            </div>
            <div class="stat-card overdue">
                <div class="stat-number">5</div>
                <div class="stat-label">Overdue</div>
            </div>
        </div>

        <div class="gmail-integration">
            <div class="integration-header">
                <i class="fab fa-google"></i>
                <h3>Gmail Form Integration</h3>
                <div class="integration-status">
                    <div class="status-indicator connected"></div>
                    <span>Connected</span>
                </div>
            </div>
            <p>Automatically collect alumni updates through Gmail forms</p>
            
            <div class="form-link">
                <h4>Employment Update Form</h4>
                <p>Share this link with alumni to update their employment status</p>
                <div class="copy-link">
                    <input type="text" value="https://forms.google.com/employment-update-123" readonly>
                    <button class="copy-btn" onclick="alumniSystem.copyToClipboard(this)">Copy</button>
                </div>
            </div>
            
            <div class="form-link">
                <h4>Career Change Form</h4>
                <p>For alumni reporting job changes or career transitions</p>
                <div class="copy-link">
                    <input type="text" value="https://forms.google.com/career-change-456" readonly>
                    <button class="copy-btn" onclick="alumniSystem.copyToClipboard(this)">Copy</button>
                </div>
            </div>
        </div>

        <div class="tracking-filters">
            <div class="filter-row">
                <div class="filter-group">
                    <label>Status</label>
                    <select id="status-filter">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processed">Processed</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Form Type</label>
                    <select id="form-type-filter">
                        <option value="">All Types</option>
                        <option value="employment_update">Employment Update</option>
                        <option value="career_change">Career Change</option>
                        <option value="contact_update">Contact Update</option>
                        <option value="achievement">Achievement</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Submission Date</label>
                    <input type="date" id="date-filter">
                </div>
                <div class="filter-group">
                    <label>Search Alumni</label>
                    <input type="text" id="alumni-search" placeholder="Search by name...">
                </div>
                <div class="filter-group">
                    <button class="btn-primary" onclick="alumniSystem.applyTrackingFilters()">
                        <i class="fas fa-filter"></i>                <div class="filter-group">
                    <button class="btn-primary" onclick="alumniSystem.applyTrackingFilters()">
                        <i class="fas fa-filter"></i> Apply Filters
                    </button>
                </div>
            </div>
        </div>

        <div class="tracking-table">
            <div class="table-header">
                <div>Alumni</div>
                <div>Form Type</div>
                <div>Submitted</div>
                <div>Status</div>
                <div>Priority</div>
                <div>Actions</div>
            </div>
            ${this.generateTrackingRows()}
        </div>
    `;
}

generateTrackingRows() {
    // Sample tracking data - this would come from API
    const trackingData = [
        {
            id: 1,
            alumni: {
                name: 'John Smith',
                graduationYear: 2020,
                email: 'john.smith@email.com'
            },
            formType: 'employment_update',
            submittedDate: '2024-01-15',
            status: 'pending',
            priority: 'high',
            submittedVia: 'gmail_form',
            formData: {
                currentCompany: 'Tech Corp',
                currentPosition: 'Senior Developer',
                employmentStatus: 'employed',
                startDate: '2024-01-01'
            }
        },
        {
            id: 2,
            alumni: {
                name: 'Sarah Johnson',
                graduationYear: 2019,
                email: 'sarah.johnson@email.com'
            },
            formType: 'career_change',
            submittedDate: '2024-01-14',
            status: 'processed',
            priority: 'medium',
            submittedVia: 'manual',
            formData: {
                previousCompany: 'Old Corp',
                newCompany: 'New Startup',
                reasonForChange: 'Better opportunities'
            }
        },
        {
            id: 3,
            alumni: {
                name: 'Mike Davis',
                graduationYear: 2021,
                email: 'mike.davis@email.com'
            },
            formType: 'achievement',
            submittedDate: '2024-01-13',
            status: 'pending',
            priority: 'low',
            submittedVia: 'gmail_form',
            formData: {
                achievementType: 'promotion',
                description: 'Promoted to Team Lead',
                date: '2024-01-10'
            }
        },
        {
            id: 4,
            alumni: {
                name: 'Emily Wilson',
                graduationYear: 2018,
                email: 'emily.wilson@email.com'
            },
            formType: 'contact_update',
            submittedDate: '2024-01-12',
            status: 'archived',
            priority: 'low',
            submittedVia: 'linkedin_sync',
            formData: {
                newPhone: '+1-555-0123',
                newAddress: '123 New Street, City, State',
                linkedinUrl: 'https://linkedin.com/in/emilywilson'
            }
        }
    ];

    return trackingData.map(item => `
        <div class="table-row">
            <div class="alumni-info-cell">
                <div class="alumni-avatar-small">
                    ${item.alumni.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div class="alumni-details">
                    <h4>${item.alumni.name}</h4>
                    <p>Class of ${item.alumni.graduationYear}</p>
                </div>
            </div>
            <div>
                <span class="form-type-badge ${item.formType.split('_')[0]}">
                    ${item.formType.replace('_', ' ').toUpperCase()}
                </span>
            </div>
            <div>${this.formatDate(item.submittedDate)}</div>
            <div>
                <span class="status-badge ${item.status}">
                    ${item.status}
                </span>
            </div>
            <div>
                <span class="priority-${item.priority}">${item.priority.toUpperCase()}</span>
            </div>
            <div class="action-buttons">
                <button class="btn-sm btn-view" onclick="alumniSystem.viewTrackingDetails(${item.id})">
                    <i class="fas fa-eye"></i>
                </button>
                ${item.status === 'pending' ? `
                    <button class="btn-sm btn-process" onclick="alumniSystem.processTracking(${item.id})">
                        <i class="fas fa-check"></i>
                    </button>
                ` : ''}
                <button class="btn-sm btn-archive" onclick="alumniSystem.archiveTracking(${item.id})">
                    <i class="fas fa-archive"></i>
                </button>
            </div>
        </div>
    `).join('');
}

formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

sendTrackingForm() {
    this.openModal('Send Tracking Form', `
        <form id="send-tracking-form">
            <div class="form-group">
                <label for="formType">Form Type</label>
                <select id="formType" name="formType" required>
                    <option value="">Select Form Type</option>
                    <option value="employment_update">Employment Update</option>
                    <option value="career_change">Career Change</option>
                    <option value="contact_update">Contact Update</option>
                    <option value="achievement">Achievement Report</option>
                    <option value="general_feedback">General Feedback</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="recipients">Send To</label>
                <select id="recipients" name="recipients" required>
                    <option value="">Select Recipients</option>
                    <option value="all">All Alumni</option>
                    <option value="recent">Recent Graduates (Last 2 Years)</option>
                    <option value="unemployed">Currently Unemployed</option>
                    <option value="no_updates">No Recent Updates (6+ months)</option>
                    <option value="specific_batch">Specific Graduation Year</option>
                    <option value="custom">Custom Selection</option>
                </select>
            </div>
            
            <div class="form-group" id="batch-year-group" style="display: none;">
                <label for="batchYear">Graduation Year</label>
                <select id="batchYear" name="batchYear">
                    <option value="">Select Year</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="emailSubject">Email Subject</label>
                <input type="text" id="emailSubject" name="emailSubject" 
                       placeholder="Please update your employment information" required>
            </div>
            
            <div class="form-group">
                <label for="emailMessage">Personal Message (Optional)</label>
                <textarea id="emailMessage" name="emailMessage" rows="4" 
                          placeholder="Add a personal message to encourage participation..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="deadline">Response Deadline</label>
                <input type="date" id="deadline" name="deadline">
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="sendReminder" name="sendReminder">
                    Send reminder after 1 week
                </label>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Send Form</button>
            </div>
        </form>
    `);

    // Add event listener for recipient selection
    document.getElementById('recipients').addEventListener('change', function() {
        const batchGroup = document.getElementById('batch-year-group');
        batchGroup.style.display = this.value === 'specific_batch' ? 'block' : 'none';
    });
}

manualUpdate() {
    this.openModal('Manual Alumni Update', `
        <form id="manual-update-form">
            <div class="form-group">
                <label for="selectAlumni">Select Alumni</label>
                <select id="selectAlumni" name="selectAlumni" required>
                    <option value="">Choose Alumni</option>
                    <option value="1">John Smith (Class of 2020)</option>
                    <option value="2">Sarah Johnson (Class of 2019)</option>
                    <option value="3">Mike Davis (Class of 2021)</option>
                    <option value="4">Emily Wilson (Class of 2018)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="updateType">Update Type</label>
                <select id="updateType" name="updateType" required>
                    <option value="">Select Update Type</option>
                    <option value="employment_update">Employment Update</option>
                    <option value="career_change">Career Change</option>
                    <option value="contact_update">Contact Information</option>
                    <option value="achievement">Achievement/Award</option>
                    <option value="education">Further Education</option>
                </select>
            </div>
            
            <div id="update-fields">
                <!-- Dynamic fields will be populated based on update type -->
            </div>
            
            <div class="form-group">
                <label for="notes">Additional Notes</label>
                <textarea id="notes" name="notes" rows="3" 
                          placeholder="Any additional information or context..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="priority">Priority</label>
                <select id="priority" name="priority">
                    <option value="low">Low</option>
                    <option value="medium" selected>Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Save Update</button>
            </div>
        </form>
    `);

    // Add event listener for update type selection
    document.getElementById('updateType').addEventListener('change', function() {
        alumniSystem.loadUpdateFields(this.value);
    });
}

loadUpdateFields(updateType) {
    const fieldsContainer = document.getElementById('update-fields');
    
    switch(updateType) {
        case 'employment_update':
            fieldsContainer.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label for="company">Company</label>
                        <input type="text" id="company" name="company" required>
                    </div>
                    <div class="form-group">
                        <label for="position">Position</label>
                        <input type="text" id="position" name="position" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="employmentStatus">Employment Status</label>
                        <select id="employmentStatus" name="employmentStatus" required>
                            <option value="employed">Employed</option>
                            <option value="unemployed">Unemployed</option>
                            <option value="self-employed">Self Employed</option>
                            <option value="student">Student</option>
                            <option value="retired">Retired</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="startDate">Start Date</label>
                        <input type="date" id="startDate" name="startDate">
                    </div>
                </div>
                <div class="form-group">
                    <label for="salaryRange">Salary Range (Optional)</label>
                    <select id="salaryRange" name="salaryRange">
                        <option value="">Prefer not to say</option>
                        <option value="under-30k">Under $30,000</option>
                        <option value="30k-50k">$30,000 - $50,000</option>
                        <option value="50k-75k">$50,000 - $75,000</option>
                        <option value="75k-100k">$75,000 - $100,000</option>
                        <option value="100k-150k">$100,000 - $150,000</option>
                        <option value="over-150k">Over $150,000</option>
                    </select>
                </div>
            `;
            break;
            
        case 'career_change':
            fieldsContainer.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label for="previousCompany">Previous Company</label>
                        <input type="text" id="previousCompany" name="previousCompany">
                    </div>
                    <div class="form-group">
                        <label for="newCompany">New Company</label>
                        <input type="text" id="newCompany" name="newCompany" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="previousPosition">Previous Position</label>
                        <input type="text" id="previousPosition" name="previousPosition">
                    </div>
                    <div class="form-group">
                        <label for="newPosition">New Position</label>
                        <input type="text" id="newPosition" name="newPosition" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="changeReason">Reason for Change</label>
                    <textarea id="changeReason" name="changeReason" rows="3" 
                              placeholder="Career growth, better opportunities, relocation, etc."></textarea>
                </div>
            `;
            break;
            
        case 'contact_update':
            fieldsContainer.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label for="newPhone">Phone Number</label>
                        <input type="tel" id="newPhone" name="newPhone">
                    </div>
                    <div class="form-group">
                        <label for="newEmail">Email Address</label>
                        <input type="email" id="newEmail" name="newEmail">
                    </div>
                </div>
                <div class="form-group">
                    <label for="newAddress">Address</label>
                    <textarea id="newAddress" name="newAddress" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label for="linkedinUrl">LinkedIn Profile</label>
                    <input type="url" id="linkedinUrl" name="linkedinUrl" 
                           placeholder="https://linkedin.com                    <input type="url" id="linkedinUrl" name="linkedinUrl" 
                           placeholder="https://linkedin.com/in/yourprofile">
                </div>
            `;
            break;
            
        case 'achievement':
            fieldsContainer.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label for="achievementType">Achievement Type</label>
                        <select id="achievementType" name="achievementType" required>
                            <option value="">Select Type</option>
                            <option value="promotion">Promotion</option>
                            <option value="award">Award/Recognition</option>
                            <option value="certification">Certification</option>
                            <option value="publication">Publication</option>
                            <option value="speaking">Speaking Engagement</option>
                            <option value="entrepreneurship">Started Business</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="achievementDate">Date</label>
                        <input type="date" id="achievementDate" name="achievementDate" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="achievementTitle">Title/Name</label>
                    <input type="text" id="achievementTitle" name="achievementTitle" required
                           placeholder="e.g., Senior Manager, Best Employee Award, etc.">
                </div>
                <div class="form-group">
                    <label for="achievementDescription">Description</label>
                    <textarea id="achievementDescription" name="achievementDescription" rows="4" required
                              placeholder="Describe the achievement and its significance..."></textarea>
                </div>
                <div class="form-group">
                    <label for="organization">Organization/Company</label>
                    <input type="text" id="organization" name="organization"
                           placeholder="Where did this achievement occur?">
                </div>
            `;
            break;
            
        case 'education':
            fieldsContainer.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label for="educationType">Education Type</label>
                        <select id="educationType" name="educationType" required>
                            <option value="">Select Type</option>
                            <option value="masters">Master's Degree</option>
                            <option value="phd">PhD/Doctorate</option>
                            <option value="certification">Professional Certification</option>
                            <option value="course">Online Course/Bootcamp</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="institution">Institution</label>
                        <input type="text" id="institution" name="institution" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="program">Program/Field</label>
                        <input type="text" id="program" name="program" required
                               placeholder="e.g., MBA, Computer Science, etc.">
                    </div>
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select id="status" name="status" required>
                            <option value="completed">Completed</option>
                            <option value="in-progress">In Progress</option>
                            <option value="planned">Planned</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="startDate">Start Date</label>
                        <input type="date" id="startDate" name="startDate">
                    </div>
                    <div class="form-group">
                        <label for="endDate">End Date (Expected)</label>
                        <input type="date" id="endDate" name="endDate">
                    </div>
                </div>
            `;
            break;
            
        default:
            fieldsContainer.innerHTML = '';
    }
}

viewTrackingDetails(trackingId) {
    // Sample data - this would come from API
    const trackingDetails = {
        id: trackingId,
        alumni: {
            name: 'John Smith',
            email: 'john.smith@email.com',
            graduationYear: 2020,
            degree: 'Computer Science',
            currentCompany: 'Old Tech Corp',
            currentPosition: 'Junior Developer'
        },
        formType: 'employment_update',
        submittedDate: '2024-01-15T10:30:00Z',
        submittedVia: 'gmail_form',
        status: 'pending',
        priority: 'high',
        formData: {
            currentCompany: 'New Tech Corp',
            currentPosition: 'Senior Developer',
            employmentStatus: 'employed',
            startDate: '2024-01-01',
            salaryRange: '75k-100k',
            workLocation: 'Remote',
            jobSatisfaction: 'Very Satisfied'
        },
        changes: [
            {
                field: 'Company',
                oldValue: 'Old Tech Corp',
                newValue: 'New Tech Corp'
            },
            {
                field: 'Position',
                oldValue: 'Junior Developer',
                newValue: 'Senior Developer'
            },
            {
                field: 'Salary Range',
                oldValue: '50k-75k',
                newValue: '75k-100k'
            }
        ]
    };

    this.openModal('Tracking Details', `
        <div class="tracking-details">
            <div class="detail-header">
                <h3>${trackingDetails.alumni.name}</h3>
                <span class="status-badge ${trackingDetails.status}">${trackingDetails.status}</span>
            </div>
            
            <div class="detail-section">
                <h4>Alumni Information</h4>
                <div class="info-grid">
                    <div><strong>Email:</strong> ${trackingDetails.alumni.email}</div>
                    <div><strong>Graduation:</strong> Class of ${trackingDetails.alumni.graduationYear}</div>
                    <div><strong>Degree:</strong> ${trackingDetails.alumni.degree}</div>
                    <div><strong>Submitted:</strong> ${this.formatDateTime(trackingDetails.submittedDate)}</div>
                    <div><strong>Via:</strong> ${trackingDetails.submittedVia.replace('_', ' ').toUpperCase()}</div>
                    <div><strong>Priority:</strong> ${trackingDetails.priority.toUpperCase()}</div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Changes Summary</h4>
                <div class="changes-list">
                    ${trackingDetails.changes.map(change => `
                        <div class="change-item">
                            <div class="change-field">${change.field}</div>
                            <div class="change-values">
                                <span class="old-value">${change.oldValue || 'Not set'}</span>
                                <i class="fas fa-arrow-right"></i>
                                <span class="new-value">${change.newValue}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Form Data</h4>
                <div class="form-data">
                    ${Object.entries(trackingDetails.formData).map(([key, value]) => `
                        <div class="data-item">
                            <strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
                            <span>${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-actions">
                ${trackingDetails.status === 'pending' ? `
                    <button class="btn-primary" onclick="alumniSystem.processTracking(${trackingDetails.id})">
                        <i class="fas fa-check"></i> Process & Update Profile
                    </button>
                    <button class="btn-secondary" onclick="alumniSystem.requestMoreInfo(${trackingDetails.id})">
                        <i class="fas fa-question-circle"></i> Request More Info
                    </button>
                ` : ''}
                <button class="btn-secondary" onclick="alumniSystem.closeModal()">Close</button>
            </div>
        </div>
    `);
}

processTracking(trackingId) {
    this.openModal('Process Tracking Update', `
        <div class="process-tracking">
            <h3>Process Alumni Update</h3>
            <p>Review and confirm the changes before updating the alumni profile.</p>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="updateProfile" checked>
                    Update alumni profile with new information
                </label>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="sendConfirmation" checked>
                    Send confirmation email to alumni
                </label>
            </div>
            
            <div class="form-group">
                <label for="processingNotes">Processing Notes (Optional)</label>
                <textarea id="processingNotes" rows="3" 
                          placeholder="Add any notes about this update..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="followUpDate">Schedule Follow-up (Optional)</label>
                <input type="date" id="followUpDate">
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="button" onclick="alumniSystem.confirmProcessing(${trackingId})" class="btn-primary">
                    <i class="fas fa-check"></i> Process Update
                </button>
            </div>
        </div>
    `);
}

confirmProcessing(trackingId) {
    // Simulate processing
    const updateProfile = document.getElementById('updateProfile').checked;
    const sendConfirmation = document.getElementById('sendConfirmation').checked;
    const notes = document.getElementById('processingNotes').value;
    
    // Here you would make API calls to:
    // 1. Update the alumni profile if updateProfile is checked
    // 2. Send confirmation email if sendConfirmation is checked
    // 3. Mark the tracking record as processed
    // 4. Add processing notes
    
    this.closeModal();
    this.showNotification('Alumni update processed successfully!', 'success');
    
    // Refresh the tracking table
    this.loadGraduateTracking();
}

requestMoreInfo(trackingId) {
    this.openModal('Request Additional Information', `
        <form id="request-info-form">
            <div class="form-group">
                <label for="requestSubject">Email Subject</label>
                <input type="text" id="requestSubject" value="Additional Information Needed - Alumni Update" required>
            </div>
            
            <div class="form-group">
                <label for="requestMessage">Message</label>
                <textarea id="requestMessage" rows="6" required placeholder="Dear [Alumni Name],

Thank you for submitting your employment update. To complete the processing of your information, we need some additional details:

1. [Specify what information is needed]
2. [Add more items as needed]

Please reply to this email with the requested information at your earliest convenience.

Best regards,
Alumni Relations Team"></textarea>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="markPending" checked>
                    Keep status as pending until response received
                </label>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Send Request</button>
            </div>
        </form>
    `);
}

archiveTracking(trackingId) {
    if (confirm('Are you sure you want to archive this tracking record? This action cannot be undone.')) {
        // Here you would make an API call to archive the record
        this.showNotification('Tracking record archived successfully!', 'success');
        this.loadGraduateTracking();
    }
}

applyTrackingFilters() {
    const status = document.getElementById('status-filter').value;
    const formType = document.getElementById('form-type-filter').value;
    const date = document.getElementById('date-filter').value;
    const search = document.getElementById('alumni-search').value;
    
    // Here you would apply the filters and reload the table
    // For now, we'll just show a notification
    this.showNotification('Filters applied successfully!', 'info');
}

copyToClipboard(button) {
    const input = button.previousElementSibling;
    input.select();
    document.execCommand('copy');
    
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}
// Add these methods to the AlumniManagementSystem class

loadEventManagement() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="event-header">
            <div>
                <h2>Event Management</h2>
                <p>Create and manage alumni events, track attendance, and engage your community</p>
            </div>
            <div class="page-actions">
                <button class="btn-primary" onclick="alumniSystem.createEvent()">
                    <i class="fas fa-plus"></i> Create Event
                </button>
                <button class="btn-secondary" onclick="alumniSystem.exportEvents()">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>

        <div class="event-stats">
            <div class="event-stat-card upcoming">
                <div class="stat-number">8</div>
                <div class="stat-label">Upcoming Events</div>
            </div>
            <div class="event-stat-card ongoing">
                <div class="stat-number">2</div>
                <div class="stat-label">Ongoing Events</div>
            </div>
            <div class="event-stat-card completed">
                <div class="stat-number">45</div>
                <div class="stat-label">Completed Events</div>
            </div>
            <div class="event-stat-card">
                <div class="stat-number">1,247</div>
                <div class="stat-label">Total Attendees</div>
            </div>
        </div>

        <div class="event-view-toggle">
            <button class="view-toggle-btn active" onclick="alumniSystem.switchEventView('grid')" data-view="grid">
                <i class="fas fa-th"></i> Grid View
            </button>
            <button class="view-toggle-btn" onclick="alumniSystem.switchEventView('list')" data-view="list">
                <i class="fas fa-list"></i> List View
            </button>
            <button class="view-toggle-btn" onclick="alumniSystem.switchEventView('calendar')" data-view="calendar">
                <i class="fas fa-calendar"></i> Calendar View
            </button>
        </div>

        <div class="event-filters">
            <div class="event-filter-row">
                <div class="event-filter-group">
                    <label>Event Type</label>
                    <select id="event-type-filter">
                        <option value="">All Types</option>
                        <option value="reunion">Reunion</option>
                        <option value="networking">Networking</option>
                        <option value="seminar">Seminar</option>
                        <option value="workshop">Workshop</option>
                        <option value="social">Social</option>
                        <option value="fundraising">Fundraising</option>
                    </select>
                </div>
                <div class="event-filter-group">
                    <label>Status</label>
                    <select id="event-status-filter">
                        <option value="">All Status</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                                <div class="event-filter-group">
                    <label>Date Range</label>
                    <input type="date" id="start-date-filter">
                    <input type="date" id="end-date-filter">
                </div>
                <div class="event-filter-group">
                    <button class="btn-primary" onclick="alumniSystem.applyEventFilters()">
                        <i class="fas fa-filter"></i> Apply Filters
                    </button>
                </div>
            </div>
        </div>

        <div class="events-grid" id="events-grid">
            ${this.generateEventCards()}
        </div>

        <div class="events-list" id="events-list" style="display: none;">
            <div class="event-list-header">
                <div>Event</div>
                <div>Date</div>
                <div>Type</div>
                <div>Status</div>
                <div>Attendees</div>
                <div>Actions</div>
            </div>
            ${this.generateEventListRows()}
        </div>

        <div class="calendar-container" id="events-calendar" style="display: none;">
            <div class="calendar-header">
                <div class="calendar-nav">
                    <button onclick="alumniSystem.changeCalendarMonth(-1)"><i class="fas fa-chevron-left"></i></button>
                    <div class="calendar-month" id="calendar-month">January 2024</div>
                    <button onclick="alumniSystem.changeCalendarMonth(1)"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
            <div class="calendar-grid" id="calendar-grid">
                ${this.generateCalendarDays()}
            </div>
        </div>
    `;
}

generateEventCards() {
    // Sample event data - this would come from API
    const events = [
        {
            id: 1,
            title: 'Alumni Reunion 2024',
            date: '2024-05-15',
            time: '6:00 PM - 9:00 PM',
            type: 'reunion',
            description: 'Join us for a night of nostalgia and reconnecting with old friends!',
            status: 'upcoming',
            attendees: 150
        },
        {
            id: 2,
            title: 'Networking Night',
            date: '2024-04-20',
            time: '5:00 PM - 8:00 PM',
            type: 'networking',
            description: 'Expand your professional network and meet fellow alumni.',
            status: 'upcoming',
            attendees: 80
        },
        {
            id: 3,
            title: 'Tech Seminar: Future of AI',
            date: '2024-03-10',
            time: '10:00 AM - 12:00 PM',
            type: 'seminar',
            description: 'Join industry experts as they discuss the future of AI technology.',
            status: 'ongoing',
            attendees: 50
        },
        {
            id: 4,
            title: 'Fundraising Gala',
            date: '2024-02-25',
            time: '7:00 PM - 11:00 PM',
            type: 'fundraising',
            description: 'Help us raise funds for scholarships and community projects.',
            status: 'completed',
            attendees: 200
        }
    ];

    return events.map(event => `
        <div class="event-card">
            <div class="event-card-header ${event.type}">
                <h3 class="event-title">${event.title}</h3>
                <span class="event-type-badge">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
            </div>
            <div class="event-card-body">
                <div class="event-date-time">
                    <i class="fas fa-calendar-alt"></i> ${this.formatDate(event.date)} at ${event.time}
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-details">
                    <div class="event-detail-item">
                        <i class="fas fa-users"></i>
                        <span>${event.attendees} Attendees</span>
                    </div>
                    <div class="event-detail-item">
                        <i class="fas fa-clock"></i>
                        <span class="event-status ${event.status}">${event.status.charAt(0).toUpperCase() + event.status.slice(1)}</span>
                    </div>
                </div>
            </div>
            <div class="event-card-footer">
                <div class="event-actions">
                    <button class="btn-event btn-event-primary" onclick="alumniSystem.viewEventDetails(${event.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-event btn-event-secondary" onclick="alumniSystem.editEvent(${event.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-event btn-event-danger" onclick="alumniSystem.cancelEvent(${event.id})">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

generateEventListRows() {
    // Sample event data - this would come from API
    const events = [
        {
            id: 1,
            title: 'Alumni Reunion 2024',
            date: '2024-05-15',
            type: 'reunion',
            status: 'upcoming',
            attendees: 150
        },
        {
            id: 2,
            title: 'Networking Night',
            date: '2024-04-20',
            type: 'networking',
            status: 'upcoming',
            attendees: 80
        },
        {
            id: 3,
            title: 'Tech Seminar: Future of AI',
            date: '2024-03-10',
            type: 'seminar',
            status: 'ongoing',
            attendees: 50
        },
        {
            id: 4,
            title: 'Fundraising Gala',
            date: '2024-02-25',
            type: 'fundraising',
            status: 'completed',
            attendees: 200
        }
    ];

    return events.map(event => `
        <div class="event-list-row">
            <div class="event-info">
                <h4>${event.title}</h4>
                <p>${this.formatDate(event.date)}</p>
            </div>
            <div>${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</div>
            <div>
                <span class="event-status ${event.status}">${event.status.charAt(0).toUpperCase() + event.status.slice(1)}</span>
            </div>
            <div>${event.attendees}</div>
            <div class="event-actions">
                <button class="btn-event btn-event-primary" onclick="alumniSystem.viewEventDetails(${event.id})">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn-event btn-event-secondary" onclick="alumniSystem.editEvent(${event.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-event btn-event-danger" onclick="alumniSystem.cancelEvent(${event.id})">
                    <i class="fas fa-times"></i> Cancel
                </button>
            </div>
        </div>
    `).join('');
}

generateCalendarDays() {
    // Sample calendar data - this would come from API
    const daysInMonth = 30; // Example for simplicity
    const events = [
        { date: '2024-05-15', title: 'Alumni Reunion 2024', type: 'reunion' },
        { date: '2024-04-20', title: 'Networking Night', type: 'networking' },
        { date: '2024-03-10', title: 'Tech Seminar: Future of AI', type: 'seminar' },
        { date: '2024-02-25', title: 'Fundraising Gala', type: 'fundraising' }
    ];

    const calendarDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
        const date = `2024-05-${i < 10 ? '0' + i : i}`;
        const event = events.find(event => event.date === date);
        calendarDays.push(`
            <div class="calendar-day ${event ? '' : 'other-month'}" data-date="${date}">
                <div class="calendar-day-number">${i}</div>
                ${event ? `<div class="calendar-event ${event.type}">${event.title}</div>` : ''}
            </div>
        `);
    }
    return calendarDays.join('');
}

switchEventView(view) {
    document.getElementById('events-grid').style.display = view === 'grid' ? 'grid' : 'none';
    document.getElementById('events-list').style.display = view === 'list' ? 'block' : 'none';
    document.getElementById('events-calendar').style.display = view === 'calendar' ? 'block' : 'none';

    const buttons = document.querySelectorAll('.view-toggle-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-view') === view) {
            button.classList.add('active');
        }
    });
}

applyEventFilters() {
    const eventType = document.getElementById('event-type-filter').value;
    const eventStatus = document.getElementById('event-status-filter').value;
    const startDate = document.getElementById('start-date-filter').value;
    const endDate = document.getElementById('end-date-filter').value;

    // Here you would apply the filters and reload the event list/grid
    // For now, we'll just show a notification
    this.showNotification('Filters applied successfully!', 'info');
}

createEvent() {
    this.openModal('Create New Event', `
        <form id="create-event-form">
            <div class="event-form-section">
                <h3>Event Details</h3>
                <div class="form-row-3">
                    <div class="form-group">
                        <label for="eventTitle">Event Title</label>
                        <input type="text" id="eventTitle" name="eventTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="eventDate">Event Date</label>
                        <input type="date" id="eventDate" name="eventDate" required>
                    </div>
                    <div class="form-group">
                        <label for="eventTime">Event Time</label>
                        <input type="text" id="eventTime" name="eventTime" placeholder="e.g., 6:00 PM - 9:00 PM" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="eventType">Event Type</label>
                    <select id="eventType" name="eventType" required>
                        <option value="">Select Type</option>
                        <option value="reunion">Reunion</option>
                        <option value="networking">Networking</option>
                        <option value="seminar">Seminar</option>
                        <option value="workshop">Workshop</option>
                        <option value="social">Social</option>
                        <option value="fundraising">Fundraising</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="eventDescription">Description</label>
                    <textarea id="eventDescription" name="eventDescription" rows="4" required></textarea>
                </div>
            </div>
            <div class="event-form-section">
                <h3>Attendance Settings</h3>
                <div class="form-group">
                    <label for="maxAttendees">Max Attendees</label>
                    <input type="number" id="maxAttendees" name="maxAttendees" min="1" required>
                </div>
                <div class="form-group">
                    <label for="eventStatus">Event Status</label>
                    <select id="eventStatus" name="eventStatus" required>
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Create Event</button>
            </div>
        </form>
    `);

    document.getElementById('create-event-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitEventForm();
    });
}

submitEventForm() {
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const type = document.getElementById('eventType').value;
    const description = document.getElementById('eventDescription').value;
    const maxAttendees = document.getElementById('maxAttendees').value;
    const status = document.getElementById('eventStatus').value;

    // Here you would make an API call to create the event
    // For now, we'll just show a notification
    this.showNotification('Event created successfully!', 'success');
    this.closeModal();
    this.loadEventManagement(); // Refresh the event list
}

viewEventDetails(eventId) {
    // Sample data - this would come from API
    const eventDetails = {
        id: eventId,
        title: 'Alumni Reunion 2024',
        date: '2024-05-15',
        time: '6:00 PM - 9:00 PM',
        type: 'reunion',
        description: 'Join us for a night of nostalgia and reconnecting with old friends!',
        status: 'upcoming',
        attendees: 150,
        maxAttendees: 200,
        location: 'University Auditorium',
        contact: 'alumni@university.edu'
    };

    this.openModal('Event Details', `
        <div class="event-details-modal">
            <div class="event-modal-header">
                <h3 class="event-modal-title">${eventDetails.title}</h3>
                <div class="event-modal-meta">
                    <span>${this.formatDate(eventDetails.date)} at ${eventDetails.time}</span>
                    <span class="event-status ${eventDetails.status}">${eventDetails.status.charAt(0).toUpperCase() + eventDetails.status.slice(1)}</span>
                </div>
            </div>
            <div class="event-modal-body">
                <div class="event-main-info">
                    <h4>Description</h4>
                    <p>${eventDetails.description}</p>
                    <h4>Location</h4>
                    <p>${eventDetails.location}</p>
                    <h4>Contact</h4>
                    <p>${eventDetails.contact}</p>
                </div>
                <div class="event-sidebar">
                    <h4>Attendance</h4>
                    <div class="attendance-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(eventDetails.attendees / eventDetails.maxAttendees) * 100}%"></div>
                        </div>
                        <div class="progress-text">${eventDetails.attendees} / ${eventDetails.maxAttendees} Attendees</div>
                    </div>
                    <h4>Attendees</h4>
                    <div class="attendee-list">
                        ${this.generateAttendeeList(eventId)}
                    </div>
                </div>
            </div>
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Close</button>
            </div>
        </div>
    `);
}

generateAttendeeList(eventId) {
    // Sample attendee data - this would come from API
    const attendees = [
        { name: 'John Smith', graduationYear: 2020 },
        { name: 'Sarah Johnson', graduationYear: 2019 },
        { name: 'Mike Davis', graduationYear: 2021 },
        { name: 'Emily Wilson', graduationYear: 2018 }
    ];

    return attendees.map(attendee => `
        <div class="attendee-item">
            <div class="attendee-avatar">${attendee.name.charAt(0)}</div>
            <div class="attendee-info">
                <div class="attendee-name">${attendee.name}</div>
                <div class="attendee-year">Class of ${attendee.graduationYear}</div>
            </div>
        </div>
    `).join('');
}

editEvent(eventId) {
    // Sample data - this would come from API
    const eventDetails = {
        id: eventId,
        title: 'Alumni Reunion 2024',
        date: '2024-05-15',
        time: '6:00 PM - 9:00 PM',
        type: 'reunion',
        description: 'Join us for a night of nostalgia and reconnecting with old friends!',
        status: 'upcoming',
        maxAttendees: 200
    };

    this.openModal('Edit Event', `
        <form id="edit-event-form">
            <div class="event-form-section">
                <h3>Event Details</h3>
                <div class="form-row-3">
                    <div class="form-group">
                        <label for="editEventTitle">Event Title</label>
                        <input type="text" id="editEventTitle" name="editEventTitle" value="${eventDetails.title}" required>
                    </div>
                    <div class="form-group">
                        <label for="editEventDate">Event Date</label>
                        <input type="date" id="editEventDate" name="editEventDate" value="${eventDetails.date}" required>
                    </div>
                    <div class="form-group">
                        <label for="editEventTime">Event Time</label>
                        <input type="text" id="editEventTime" name="editEventTime" value="${eventDetails.time}" placeholder="e.g., 6:00 PM - 9:00 PM" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="editEventType">Event Type</label>
                    <select id="editEventType" name="editEventType" required>
                        <option value="reunion" ${eventDetails.type === 'reunion' ? 'selected' : ''}>Reunion</option>
                                                <option value="networking" ${eventDetails.type === 'networking' ? 'selected' : ''}>Networking</option>
                        <option value="seminar" ${eventDetails.type === 'seminar' ? 'selected' : ''}>Seminar</option>
                        <option value="workshop" ${eventDetails.type === 'workshop' ? 'selected' : ''}>Workshop</option>
                        <option value="social" ${eventDetails.type === 'social' ? 'selected' : ''}>Social</option>
                        <option value="fundraising" ${eventDetails.type === 'fundraising' ? 'selected' : ''}>Fundraising</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editEventDescription">Description</label>
                    <textarea id="editEventDescription" name="editEventDescription" rows="4" required>${eventDetails.description}</textarea>
                </div>
            </div>
            <div class="event-form-section">
                <h3>Attendance Settings</h3>
                <div class="form-group">
                    <label for="editMaxAttendees">Max Attendees</label>
                    <input type="number" id="editMaxAttendees" name="editMaxAttendees" value="${eventDetails.maxAttendees}" min="1" required>
                </div>
                <div class="form-group">
                    <label for="editEventStatus">Event Status</label>
                    <select id="editEventStatus" name="editEventStatus" required>
                        <option value="upcoming" ${eventDetails.status === 'upcoming' ? 'selected' : ''}>Upcoming</option>
                        <option value="ongoing" ${eventDetails.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
                        <option value="completed" ${eventDetails.status === 'completed' ? 'selected' : ''}>Completed</option>
                        <option value="cancelled" ${eventDetails.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </div>
            </div>
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Update Event</button>
            </div>
        </form>
    `);

    document.getElementById('edit-event-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.updateEvent(eventId);
    });
}

updateEvent(eventId) {
    const title = document.getElementById('editEventTitle').value;
    const date = document.getElementById('editEventDate').value;
    const time = document.getElementById('editEventTime').value;
    const type = document.getElementById('editEventType').value;
    const description = document.getElementById('editEventDescription').value;
    const maxAttendees = document.getElementById('editMaxAttendees').value;
    const status = document.getElementById('editEventStatus').value;

    // Here you would make an API call to update the event
    // For now, we'll just show a notification
    this.showNotification('Event updated successfully!', 'success');
    this.closeModal();
    this.loadEventManagement(); // Refresh the event list
}

cancelEvent(eventId) {
    if (confirm('Are you sure you want to cancel this event? This action cannot be undone.')) {
        // Here you would make an API call to cancel the event
        this.showNotification('Event cancelled successfully!', 'success');
        this.loadEventManagement(); // Refresh the event list
    }
}

registerForEvent(eventId) {
    this.openModal('Event Registration', `
        <div class="registration-form">
            <div class="registration-summary">
                <h4>Alumni Reunion 2024</h4>
                <p><strong>Date:</strong> May 15, 2024</p>
                <p><strong>Time:</strong> 6:00 PM - 9:00 PM</p>
                <p><strong>Location:</strong> University Auditorium</p>
                <p><strong>Available Spots:</strong> 50 remaining</p>
            </div>
            
            <form id="registration-form">
                <div class="form-group">
                    <label for="attendeeName">Full Name</label>
                    <input type="text" id="attendeeName" name="attendeeName" required>
                </div>
                
                <div class="form-group">
                    <label for="attendeeEmail">Email Address</label>
                    <input type="email" id="attendeeEmail" name="attendeeEmail" required>
                </div>
                
                <div class="form-group">
                    <label for="graduationYear">Graduation Year</label>
                    <select id="graduationYear" name="graduationYear" required>
                        <option value="">Select Year</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="attendeePhone">Phone Number</label>
                    <input type="tel" id="attendeePhone" name="attendeePhone">
                </div>
                
                <div class="form-group">
                    <label for="dietaryRestrictions">Dietary Restrictions (Optional)</label>
                    <textarea id="dietaryRestrictions" name="dietaryRestrictions" rows="2" 
                              placeholder="Please specify any dietary restrictions or allergies..."></textarea>
                </div>
                
                <div class="form-group">
                    <label for="guestCount">Number of Guests</label>
                    <select id="guestCount" name="guestCount">
                        <option value="0">Just me</option>
                        <option value="1">+1 Guest</option>
                        <option value="2">+2 Guests</option>
                        <option value="3">+3 Guests</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="emailUpdates" name="emailUpdates" checked>
                        Send me updates about this event
                    </label>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="futureEvents" name="futureEvents">
                        Notify me about future alumni events
                    </label>
                </div>
                
                <div class="form-actions">
                    <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                    <button type="submit" class="btn-primary">Register for Event</button>
                </div>
            </form>
        </div>
    `);

    document.getElementById('registration-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitEventRegistration(eventId);
    });
}

submitEventRegistration(eventId) {
    const formData = {
        name: document.getElementById('attendeeName').value,
        email: document.getElementById('attendeeEmail').value,
        graduationYear: document.getElementById('graduationYear').value,
        phone: document.getElementById('attendeePhone').value,
        dietaryRestrictions: document.getElementById('dietaryRestrictions').value,
        guestCount: document.getElementById('guestCount').value,
        emailUpdates: document.getElementById('emailUpdates').checked,
        futureEvents: document.getElementById('futureEvents').checked
    };

    // Here you would make an API call to register for the event
    this.showNotification('Registration successful! You will receive a confirmation email shortly.', 'success');
    this.closeModal();
}

exportEvents() {
    // Here you would generate and download an Excel/CSV file with event data
    this.showNotification('Event data exported successfully!', 'success');
}

changeCalendarMonth(direction) {
    // Here you would change the calendar month and reload the calendar
    const monthElement = document.getElementById('calendar-month');
    const currentMonth = monthElement.textContent;
    
    // Simple example - in real implementation, you'd handle date logic properly
    if (direction === 1) {
        monthElement.textContent = 'February 2024';
    } else {
        monthElement.textContent = 'December 2023';
    }
    
    // Reload calendar days
    document.getElementById('calendar-grid').innerHTML = this.generateCalendarDays();
}

// Event Management specific utility methods
formatEventDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

getEventStatusColor(status) {
    const colors = {
        upcoming: '#3b82f6',
        ongoing: '#10b981',
        completed: '#6b7280',
        cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
}

// Alumni-specific event methods for alumni users
loadAlumniEvents() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="event-header">
            <div>
                <h2>Alumni Events</h2>
                <p>Discover and join upcoming alumni events</p>
            </div>
        </div>

        <div class="event-filters">
            <div class="event-filter-row">
                <div class="event-filter-group">
                    <label>Event Type</label>
                    <select id="alumni-event-type-filter">
                        <option value="">All Types</option>
                        <option value="reunion">Reunion</option>
                        <option value="networking">Networking</option>
                        <option value="seminar">Seminar</option>
                        <option value="workshop">Workshop</option>
                        <option value="social">Social</option>
                    </select>
                </div>
                <div class="event-filter-group">
                    <label>Date Range</label>
                    <select id="alumni-date-filter">
                        <option value="">All Dates</option>
                        <option value="this-week">This Week</option>
                        <option value="this-month">This Month</option>
                        <option value="next-month">Next Month</option>
                    </select>
                </div>
                <div class="event-filter-group">
                    <button class="btn-primary" onclick="alumniSystem.applyAlumniEventFilters()">
                        <i class="fas fa-filter"></i> Apply Filters
                    </button>
                </div>
            </div>
        </div>

        <div class="events-grid">
            ${this.generateAlumniEventCards()}
        </div>
    `;
}

generateAlumniEventCards() {
    // Sample event data for alumni view
    const events = [
        {
            id: 1,
            title: 'Alumni Reunion 2024',
            date: '2024-05-15',
            time: '6:00 PM - 9:00 PM',
            type: 'reunion',
            description: 'Join us for a night of nostalgia and reconnecting with old friends!',
            status: 'upcoming',
            availableSpots: 50,
            isRegistered: false
        },
        {
            id: 2,
            title: 'Networking Night',
            date: '2024-04-20',
            time: '5:00 PM - 8:00 PM',
            type: 'networking',
            description: 'Expand your professional network and meet fellow alumni.',
            status: 'upcoming',
            availableSpots: 30,
            isRegistered: true
        }
    ];

    return events.map(event => `
        <div class="event-card">
            <div class="event-card-header ${event.type}">
                <h3 class="event-title">${event.title}</h3>
                <span class="event-type-badge">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
            </div>
            <div class="event-card-body">
                <div class="event-date-time">
                    <i class="fas fa-calendar-alt"></i> ${this.formatDate(event.date)} at ${event.time}
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-details">
                    <div class="event-detail-item">
                        <i class="fas fa-users"></i>
                        <span>${event.availableSpots} spots available</span>
                    </div>
                    <div class="event-detail-item">
                        <i class="fas fa-clock"></i>
                        <span class="event-status ${event.status}">${event.status.charAt(0).toUpperCase() + event.status.slice(1)}</span>
                    </div>
                </div>
            </div>
            <div class="event-card-footer">
                <div class="event-actions">
                    <button class="btn-event btn-event-primary" onclick="alumniSystem.viewEventDetails(${event.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    ${event.isRegistered ? 
                        `<button class="btn-event btn-event-success" disabled>
                            <i class="fas fa-check"></i> Registered
                        </button>` :
                        `<button class="btn-event btn-event-primary" onclick="alumniSystem.registerForEvent(${event.id})">
                            <i class="fas fa-user-plus"></i> Register
                        </button>`
                    }
                </div>
            </div>
        </div>
    `).join('');
}

applyAlumniEventFilters() {
    const eventType = document.getElementById('alumni-event-type-filter').value;
    const dateRange = document.getElementById('alumni-date-filter').value;

    // Here you would apply the filters and reload the event list
    this.showNotification('Filters applied successfully!', 'info');
}

// Event attendance tracking methods
markAttendance(eventId, attendeeId) {
    // Here you would mark attendance for an event
    this.showNotification('Attendance marked successfully!', 'success');
}

generateAttendanceReport(eventId) {
    // Here you would generate an attendance report
    this.showNotification('Attendance report generated!', 'success');
}

sendEventReminder(eventId) {
    this.openModal('Send Event Reminder', `
        <form id="event-reminder-form">
            <div class="form-group">
                <label for="reminderSubject">Email Subject</label>
                <input type="text" id="reminderSubject" value="Reminder: Alumni Reunion 2024 - Tomorrow!" required>
            </div>
            
            <div class="form-group">
                <label for="reminderMessage">Message</label>
                <textarea id="reminderMessage" rows="6" required>Dear Alumni,

This is a friendly reminder about our upcoming Alumni Reunion 2024 event tomorrow!

Event Details:
- Date: May 15, 2024
- Time: 6:00 PM - 9:00 PM
- Location: University Auditorium

We're looking forward to seeing you there!

Best regards,
Alumni Relations Team</textarea>
            </div>
            
            <div class="form-group">
                <label for="reminderRecipients">Send To</label>
                <select id="reminderRecipients" required>
                                        <option value="all">All Registered Attendees</option>
                    <option value="specific">Specific Alumni</option>
                </select>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Send Reminder</button>
            </div>
        </form>
    `);

    document.getElementById('event-reminder-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitEventReminder(eventId);
    });
}

submitEventReminder(eventId) {
    const subject = document.getElementById('reminderSubject').value;
    const message = document.getElementById('reminderMessage').value;
    const recipients = document.getElementById('reminderRecipients').value;

    // Here you would make an API call to send the reminder
    this.showNotification('Event reminder sent successfully!', 'success');
    this.closeModal();
}

// Utility function to format date
formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Utility function to show notifications
showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}
// Add these methods to the AlumniManagementSystem class

loadJobPlacement() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="job-header">
            <div>
                <h2>Job Placement</h2>
                <p>Manage job postings and help alumni find career opportunities</p>
            </div>
            <div class="page-actions">
                <button class="btn-primary" onclick="alumniSystem.postJob()">
                    <i class="fas fa-plus"></i> Post Job
                </button>
                <button class="btn-secondary" onclick="alumniSystem.importLinkedInJobs()">
                    <i class="fab fa-linkedin"></i> Import from LinkedIn
                </button>
                <button class="btn-secondary" onclick="alumniSystem.exportJobs()">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>

        <div class="job-stats">
            <div class="job-stat-card active">
                <div class="stat-number">47</div>
                <div class="stat-label">Active Jobs</div>
            </div>
            <div class="job-stat-card filled">
                <div class="stat-number">23</div>
                <div class="stat-label">Positions Filled</div>
            </div>
            <div class="job-stat-card applications">
                <div class="stat-number">156</div>
                <div class="stat-label">Applications</div>
            </div>
            <div class="job-stat-card placements">
                <div class="stat-number">89%</div>
                <div class="stat-label">Success Rate</div>
            </div>
        </div>

        <div class="linkedin-integration">
            <div class="linkedin-header">
                <i class="fab fa-linkedin"></i>
                <h3>LinkedIn Integration</h3>
                <div class="linkedin-status">
                    <div class="status-indicator connected"></div>
                    <span>Connected</span>
                </div>
            </div>
            <p>Automatically sync job postings with LinkedIn and import relevant opportunities</p>
            <div class="linkedin-actions">
                <button class="btn-linkedin" onclick="alumniSystem.syncLinkedInJobs()">
                    <i class="fas fa-sync"></i> Sync Jobs
                </button>
                <button class="btn-linkedin" onclick="alumniSystem.configureLinkedIn()">
                    <i class="fas fa-cog"></i> Configure
                </button>
            </div>
        </div>

        <div class="job-filters">
            <div class="job-filter-row">
                <div class="job-filter-group">
                    <label>Job Type</label>
                    <select id="job-type-filter">
                        <option value="">All Types</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="remote">Remote</option>
                        <option value="internship">Internship</option>
                    </select>
                </div>
                <div class="job-filter-group">
                    <label>Experience Level</label>
                    <select id="experience-filter">
                        <option value="">All Levels</option>
                        <option value="entry">Entry Level</option>
                        <option value="mid">Mid Level</option>
                        <option value="senior">Senior Level</option>
                        <option value="executive">Executive</option>
                    </select>
                </div>
                <div class="job-filter-group">
                    <label>Status</label>
                    <select id="job-status-filter">
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="filled">Filled</option>
                        <option value="expired">Expired</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
                <div class="job-filter-group">
                    <label>Location</label>
                    <input type="text" id="location-filter" placeholder="Enter location...">
                </div>
                <div class="job-filter-group">
                    <button class="btn-primary" onclick="alumniSystem.applyJobFilters()">
                        <i class="fas fa-filter"></i> Apply Filters
                    </button>
                </div>
            </div>
        </div>

        <div class="jobs-grid" id="jobs-grid">
            ${this.generateJobCards()}
        </div>
    `;
}

generateJobCards() {
    // Sample job data - this would come from API
    const jobs = [
        {
            id: 1,
            title: 'Senior Software Engineer',
                        company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            type: 'full-time',
            experience: 'senior',
            salary: '$120,000 - $150,000',
            description: 'We are looking for a Senior Software Engineer to join our dynamic team and help build cutting-edge applications.',
            requirements: ['5+ years experience', 'React/Node.js', 'AWS knowledge'],
            status: 'active',
            postedDate: '2024-01-15',
            applications: 12,
            source: 'manual'
        },
        {
            id: 2,
            title: 'Marketing Manager',
            company: 'Digital Solutions LLC',
            location: 'New York, NY',
            type: 'full-time',
            experience: 'mid',
            salary: '$80,000 - $100,000',
            description: 'Join our marketing team to drive brand awareness and lead generation campaigns.',
            requirements: ['3+ years marketing experience', 'Digital marketing', 'Analytics tools'],
            status: 'active',
            postedDate: '2024-01-12',
            applications: 8,
            source: 'linkedin'
        },
        {
            id: 3,
            title: 'Data Analyst',
            company: 'Analytics Pro',
            location: 'Remote',
            type: 'remote',
            experience: 'entry',
            salary: '$60,000 - $75,000',
            description: 'Analyze data trends and provide insights to support business decisions.',
            requirements: ['SQL knowledge', 'Python/R', 'Statistics background'],
            status: 'active',
            postedDate: '2024-01-10',
            applications: 15,
            source: 'manual'
        },
        {
            id: 4,
            title: 'Project Manager',
            company: 'BuildRight Construction',
            location: 'Chicago, IL',
            type: 'full-time',
            experience: 'mid',
            salary: '$90,000 - $110,000',
            description: 'Lead construction projects from planning to completion.',
            requirements: ['PMP certification preferred', '5+ years experience', 'Construction background'],
            status: 'filled',
            postedDate: '2024-01-05',
            applications: 22,
            source: 'manual'
        }
    ];

    return jobs.map(job => `
        <div class="job-card">
            <div class="job-priority ${this.getJobPriority(job.applications)}"></div>
            <div class="job-status ${job.status}">${job.status.charAt(0).toUpperCase() + job.status.slice(1)}</div>
            <button class="bookmark-btn" onclick="alumniSystem.toggleBookmark(${job.id})">
                <i class="fas fa-bookmark"></i>
            </button>
            
            <div class="job-card-header">
                <div style="display: flex; align-items: center;">
                    <div class="company-logo">${job.company.charAt(0)}</div>
                    <div>
                        <h3 class="job-title">${job.title}</h3>
                        <div class="job-company">${job.company}</div>
                        <div class="job-location">
                            <i class="fas fa-map-marker-alt"></i> ${job.location}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="job-card-body">
                <div class="job-meta">
                    <div class="job-meta-item">
                        <i class="fas fa-briefcase"></i>
                        <span>${job.type.replace('-', ' ').toUpperCase()}</span>
                        <span class="job-type-indicator ${job.type}">${job.type.replace('-', ' ')}</span>
                    </div>
                    <div class="job-meta-item">
                        <i class="fas fa-layer-group"></i>
                        <span>${job.experience.charAt(0).toUpperCase() + job.experience.slice(1)} Level</span>
                    </div>
                    <div class="job-meta-item">
                        <i class="fas fa-users"></i>
                        <span>${job.applications} Applications</span>
                    </div>
                </div>
                
                <p class="job-description">${job.description}</p>
                
                <div class="salary-range">${job.salary}</div>
                
                <div class="job-tags">
                    ${job.requirements.slice(0, 3).map(req => `<span class="job-tag">${req}</span>`).join('')}
                    ${job.requirements.length > 3 ? `<span class="job-tag">+${job.requirements.length - 3} more</span>` : ''}
                </div>
                
                <div class="skills-container">
                    <h5>Required Skills</h5>
                    <div class="skills-list">
                        ${job.requirements.map(skill => `<span class="skill-tag required">${skill}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <div class="job-card-footer">
                <div class="job-posted">
                    Posted ${this.getTimeAgo(job.postedDate)}
                    ${job.source === 'linkedin' ? '<i class="fab fa-linkedin" style="color: #0077b5; margin-left: 5px;"></i>' : ''}
                </div>
                <div class="job-actions">
                    <button class="btn-job btn-job-primary" onclick="alumniSystem.viewJobDetails(${job.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-job btn-job-secondary" onclick="alumniSystem.editJob(${job.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-job btn-job-success" onclick="alumniSystem.viewApplications(${job.id})">
                        <i class="fas fa-users"></i> Applications
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

getJobPriority(applications) {
    if (applications >= 20) return 'high';
    if (applications >= 10) return 'medium';
    return 'low';
}

getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

postJob() {
    this.openModal('Post New Job', `
        <form id="post-job-form" class="job-form">
            <div class="event-form-section">
                <h3>Job Details</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="jobTitle">Job Title</label>
                        <input type="text" id="jobTitle" name="jobTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="company">Company</label>
                        <input type="text" id="company" name="company" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="jobType">Job Type</label>
                        <select id="jobType" name="jobType" required>
                            <option value="">Select Type</option>
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="contract">Contract</option>
                            <option value="remote">Remote</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="experienceLevel">Experience Level</label>
                        <select id="experienceLevel" name="experienceLevel" required>
                            <option value="">Select Level</option>
                            <option value="entry">Entry Level</option>
                            <option value="mid">Mid Level</option>
                            <option value="senior">Senior Level</option>
                            <option value="executive">Executive</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="location">Location</label>
                        <input type="text" id="location" name="location" required>
                    </div>
                    <div class="form-group">
                        <label for="salaryRange">Salary Range</label>
                        <input type="text" id="salaryRange" name="salaryRange" placeholder="e.g., $50,000 - $70,000">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="jobDescription">Job Description</label>
                    <textarea id="jobDescription" name="jobDescription" rows="5" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="requirements">Requirements (one per line)</label>
                    <textarea id="requirements" name="requirements" rows="4" 
                              placeholder="Bachelor's degree in Computer Science&#10;3+ years of experience&#10;Knowledge of React and Node.js"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="skills">Required Skills (comma separated)</label>
                    <input type="text" id="skills" name="skills" placeholder="JavaScript, React, Node.js, AWS">
                </div>
            </div>
            
            <div class="event-form-section">
                <h3>Application Settings</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="applicationDeadline">Application Deadline</label>
                        <input type="date" id="applicationDeadline" name="applicationDeadline">
                    </div>
                    <div class="form-group">
                        <label for="contactEmail">Contact Email</label>
                        <input type="email" id="contactEmail" name="contactEmail" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="applicationInstructions">Application Instructions</label>
                    <textarea id="applicationInstructions" name="applicationInstructions" rows="3" 
                              placeholder="Please submit your resume and cover letter..."></textarea>
                </div>
                
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="postToLinkedIn" name="postToLinkedIn">
                        <label for="postToLinkedIn">Post to LinkedIn</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="notifyAlumni" name="notifyAlumni" checked>
                        <label for="notifyAlumni">Notify relevant alumni</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="featuredJob" name="featuredJob">
                        <label for="featuredJob">Mark as featured job</label>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="button" onclick="alumniSystem.saveDraft()" class="btn-secondary">Save as Draft</button>
                <button type="submit" class="btn-primary">Post Job</button>
            </div>
        </form>
    `);

    document.getElementById('post-job-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitJobPosting();
    });
}

submitJobPosting() {
    const formData = {
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('company').value,
        type: document.getElementById('jobType').value,
        experience: document.getElementById('experienceLevel').value,
        location: document.getElementById('location').value,
        salary: document.getElementById('salaryRange').value,
        description: document.getElementById('jobDescription').value,
        requirements: document.getElementById('requirements').value.split('\n').filter(req => req.trim()),
        skills: document.getElementById('skills').value.split(',').map(skill => skill.trim()),
        deadline: document.getElementById('applicationDeadline').value,
        contactEmail: document.getElementById('contactEmail').value,
        instructions: document.getElementById('applicationInstructions').value,
        postToLinkedIn: document.getElementById('postToLinkedIn').checked,
        notifyAlumni: document.getElementById('notifyAlumni').checked,
        featured: document.getElementById('featuredJob').checked
    };

    // Here you would make an API call to create the job posting
    this.showNotification('Job posted successfully!', 'success');
    this.closeModal();
    this.loadJobPlacement(); // Refresh the job list
}

saveDraft() {
    // Save job as draft
    this.showNotification('Job saved as draft!', 'info');
    this.closeModal();
}

viewJobDetails(jobId) {
    // Sample data - this would come from API
    const jobDetails = {
        id: jobId,
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'full-time',
        experience: 'senior',
        salary: '$120,000 - $150,000',
        description: 'We are looking for a Senior Software Engineer to join our dynamic team and help build cutting-edge applications that serve millions of users worldwide.',
        requirements: [
            '5+ years of software development experience',
            'Strong proficiency in React and Node.js',
            'Experience with AWS cloud services',
            'Knowledge of database design and optimization',
            'Excellent problem-solving skills'
        ],
        responsibilities: [
            'Design and develop scalable web applications',
            'Collaborate with cross-functional teams',
            'Mentor junior developers',
            'Participate in code reviews and architecture decisions',
            'Stay up-to-date with emerging technologies'
        ],
        benefits: [
            'Competitive salary and equity package',
            'Comprehensive health insurance',
            'Flexible work arrangements',
            '401(k) with company matching',
            'Professional development budget'
        ],
        status: 'active',
        postedDate: '2024-01-15',
        deadline: '2024-02-15',
        applications: 12,
        contactEmail: 'careers@techcorp.com'
    };

    this.openModal('Job Details', `
        <div class="job-details-modal">
            <div class="job-modal-header">
                <h3 class="job-modal-title">${jobDetails.title}</h3>
                <div class="job-modal-company">${jobDetails.company}</div>
                <div class="job-modal-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${jobDetails.location}</span>
                    <span><i class="fas fa-briefcase"></i> ${jobDetails.type.replace('-', ' ').toUpperCase()}</span>
                                        <span><i class="fas fa-layer-group"></i> ${jobDetails.experience.charAt(0).toUpperCase() + jobDetails.experience.slice(1)} Level</span>
                    <span><i class="fas fa-users"></i> ${jobDetails.applications} Applications</span>
                </div>
            </div>
            
            <div class="job-modal-body">
                <div class="job-main-content">
                    <h4>Job Description</h4>
                    <p>${jobDetails.description}</p>
                    
                    <h4>Key Responsibilities</h4>
                    <ul>
                        ${jobDetails.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                    
                    <h4>Requirements</h4>
                    <ul>
                        ${jobDetails.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                    
                    <h4>Benefits</h4>
                    <ul>
                        ${jobDetails.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="job-sidebar">
                    <h4>Job Information</h4>
                    <ul class="job-info-list">
                        <li>
                            <span class="job-info-label">Salary Range</span>
                            <span class="job-info-value">${jobDetails.salary}</span>
                        </li>
                        <li>
                            <span class="job-info-label">Posted Date</span>
                            <span class="job-info-value">${this.formatDate(jobDetails.postedDate)}</span>
                        </li>
                        <li>
                            <span class="job-info-label">Application Deadline</span>
                            <span class="job-info-value">${this.formatDate(jobDetails.deadline)}</span>
                        </li>
                        <li>
                            <span class="job-info-label">Status</span>
                            <span class="job-info-value">
                                <span class="job-status ${jobDetails.status}">${jobDetails.status.charAt(0).toUpperCase() + jobDetails.status.slice(1)}</span>
                            </span>
                        </li>
                        <li>
                            <span class="job-info-label">Contact</span>
                            <span class="job-info-value">${jobDetails.contactEmail}</span>
                        </li>
                    </ul>
                    
                    <div style="margin-top: 20px;">
                        <button class="btn-primary" onclick="alumniSystem.viewApplications(${jobDetails.id})" style="width: 100%; margin-bottom: 10px;">
                            <i class="fas fa-users"></i> View Applications (${jobDetails.applications})
                        </button>
                        <button class="btn-secondary" onclick="alumniSystem.editJob(${jobDetails.id})" style="width: 100%; margin-bottom: 10px;">
                            <i class="fas fa-edit"></i> Edit Job
                        </button>
                        <button class="btn-secondary" onclick="alumniSystem.shareJob(${jobDetails.id})" style="width: 100%;">
                            <i class="fas fa-share"></i> Share Job
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Close</button>
            </div>
        </div>
    `);
}

editJob(jobId) {
    // Sample data - this would come from API
    const jobDetails = {
        id: jobId,
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        type: 'full-time',
        experience: 'senior',
        location: 'San Francisco, CA',
        salary: '$120,000 - $150,000',
        description: 'We are looking for a Senior Software Engineer to join our dynamic team.',
        requirements: '5+ years experience\nReact/Node.js\nAWS knowledge',
        skills: 'JavaScript, React, Node.js, AWS',
        deadline: '2024-02-15',
        contactEmail: 'careers@techcorp.com',
        instructions: 'Please submit your resume and cover letter.'
    };

    this.openModal('Edit Job', `
        <form id="edit-job-form" class="job-form">
            <div class="event-form-section">
                <h3>Job Details</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="editJobTitle">Job Title</label>
                        <input type="text" id="editJobTitle" name="editJobTitle" value="${jobDetails.title}" required>
                    </div>
                    <div class="form-group">
                        <label for="editCompany">Company</label>
                        <input type="text" id="editCompany" name="editCompany" value="${jobDetails.company}" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="editJobType">Job Type</label>
                        <select id="editJobType" name="editJobType" required>
                            <option value="full-time" ${jobDetails.type === 'full-time' ? 'selected' : ''}>Full Time</option>
                            <option value="part-time" ${jobDetails.type === 'part-time' ? 'selected' : ''}>Part Time</option>
                            <option value="contract" ${jobDetails.type === 'contract' ? 'selected' : ''}>Contract</option>
                            <option value="remote" ${jobDetails.type === 'remote' ? 'selected' : ''}>Remote</option>
                            <option value="internship" ${jobDetails.type === 'internship' ? 'selected' : ''}>Internship</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="editExperienceLevel">Experience Level</label>
                        <select id="editExperienceLevel" name="editExperienceLevel" required>
                            <option value="entry" ${jobDetails.experience === 'entry' ? 'selected' : ''}>Entry Level</option>
                            <option value="mid" ${jobDetails.experience === 'mid' ? 'selected' : ''}>Mid Level</option>
                            <option value="senior" ${jobDetails.experience === 'senior' ? 'selected' : ''}>Senior Level</option>
                            <option value="executive" ${jobDetails.experience === 'executive' ? 'selected' : ''}>Executive</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="editLocation">Location</label>
                        <input type="text" id="editLocation" name="editLocation" value="${jobDetails.location}" required>
                    </div>
                    <div class="form-group">
                        <label for="editSalaryRange">Salary Range</label>
                        <input type="text" id="editSalaryRange" name="editSalaryRange" value="${jobDetails.salary}">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="editJobDescription">Job Description</label>
                    <textarea id="editJobDescription" name="editJobDescription" rows="5" required>${jobDetails.description}</textarea>
                </div>
                
                <div class="form-group">
                    <label for="editRequirements">Requirements (one per line)</label>
                    <textarea id="editRequirements" name="editRequirements" rows="4">${jobDetails.requirements}</textarea>
                </div>
                
                <div class="form-group">
                    <label for="editSkills">Required Skills (comma separated)</label>
                    <input type="text" id="editSkills" name="editSkills" value="${jobDetails.skills}">
                </div>
            </div>
            
            <div class="event-form-section">
                <h3>Application Settings</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="editApplicationDeadline">Application Deadline</label>
                        <input type="date" id="editApplicationDeadline" name="editApplicationDeadline" value="${jobDetails.deadline}">
                    </div>
                    <div class="form-group">
                        <label for="editContactEmail">Contact Email</label>
                        <input type="email" id="editContactEmail" name="editContactEmail" value="${jobDetails.contactEmail}" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="editApplicationInstructions">Application Instructions</label>
                    <textarea id="editApplicationInstructions" name="editApplicationInstructions" rows="3">${jobDetails.instructions}</textarea>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Update Job</button>
            </div>
        </form>
    `);

    document.getElementById('edit-job-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.updateJob(jobId);
    });
}

updateJob(jobId) {
    // Here you would make an API call to update the job
    this.showNotification('Job updated successfully!', 'success');
    this.closeModal();
    this.loadJobPlacement(); // Refresh the job list
}

viewApplications(jobId) {
    // Sample application data - this would come from API
    const applications = [
        {
            id: 1,
            applicantName: 'John Smith',
            email: 'john.smith@email.com',
            graduationYear: 2020,
            appliedDate: '2024-01-16',
            status: 'pending',
            resumeUrl: '/resumes/john-smith.pdf'
        },
        {
            id: 2,
            applicantName: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            graduationYear: 2019,
            appliedDate: '2024-01-14',
            status: 'reviewing',
            resumeUrl: '/resumes/sarah-johnson.pdf'
        },
        {
            id: 3,
            applicantName: 'Mike Davis',
            email: 'mike.davis@email.com',
            graduationYear: 2021,
            appliedDate: '2024-01-12',
            status: 'accepted',
            resumeUrl: '/resumes/mike-davis.pdf'
        }
    ];

    this.openModal('Job Applications', `
        <div class="applications-modal">
            <h3>Applications for Senior Software Engineer</h3>
            <p>Total Applications: ${applications.length}</p>
            
            <div class="applications-list">
                ${applications.map(app => `
                    <div class="application-item">
                        <div class="applicant-info">
                            <div class="applicant-avatar">${app.applicantName.charAt(0)}</div>
                            <div class="applicant-details">
                                <h4>${app.applicantName}</h4>
                                <p>Class of ${app.graduationYear} • Applied ${this.formatDate(app.appliedDate)}</p>
                                <p>${app.email}</p>
                            </div>
                        </div>
                        <div class="application-status-section">
                            <span class="application-status ${app.status}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                        </div>
                        <div class="application-actions">
                            <button class="btn-job btn-job-primary" onclick="alumniSystem.viewResume('${app.resumeUrl}')">
                                <i class="fas fa-file-pdf"></i> Resume
                            </button>
                            <button class="btn-job btn-job-secondary" onclick="alumniSystem.contactApplicant('${app.email}')">
                                <i class="fas fa-envelope"></i> Contact
                            </button>
                            ${app.status === 'pending' ? `
                                <button class="btn-job btn-job-success" onclick="alumniSystem.acceptApplication(${app.id})">
                                    <i class="fas fa-check"></i> Accept
                                </button>
                                <button class="btn-job btn-job-danger" onclick="alumniSystem.rejectApplication(${app.id})">
                                    <i class="fas fa-times"></i> Reject
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.exportApplications(${jobId})" class="btn-secondary">
                    <i class="fas fa-download"></i> Export Applications
                </button>
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Close</button>
            </div>
        </div>
    `);
}

// Alumni Job Board View
loadJobBoard() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="job-board-header">
            <h2>Job Opportunities</h2>
            <p>Discover career opportunities tailored for our alumni community</p>
        </div>

        <div class="job-search-bar">
            <div class="search-input-group">
                <input type="text" class="search-input" placeholder="Search jobs by title, company, or keywords..." id="job-search-input">
                <select class="search-input" id="location-search">
                    <option value="">All Locations</option>
                    <option value="remote">Remote</option>
                    <option value="san-francisco">San Francisco, CA</option>
                    <option value="new-york">New York, NY</option>
                    <option value="chicago">Chicago, IL</option>
                </select>
                <button class="search-btn" onclick="alumniSystem.searchJobs()">
                    <i class="fas fa-search"></i> Search Jobs
                </button>
            </div>
        </div>

        <div class="job-filters">
            <div class="job-filter-row">
                <div class="job-filter-group">
                    <label>Job Type</label>
                    <select id="alumni-job-type-filter">
                        <option value="">All Types</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="remote">Remote</option>
                        <option value="internship">Internship</option>
                    </select>
                </div>
                <div class="job-filter-group">
                    <label>Experience Level</label>
                    <select id="alumni-experience-filter">
                        <option value="">All Levels</option>
                        <option value="entry">Entry Level</option>
                        <option value="mid">Mid Level</option>
                        <option value="senior">Senior Level</option>
                        <option value="executive">Executive</option>
                    </select>
                </div>
                <div class="job-filter-group">
                    <button class="btn-primary" onclick="alumniSystem.applyAlumniJobFilters()">
                                               <i class="fas fa-filter"></i> Apply Filters
                    </button>
                </div>
            </div>
        </div>

        <div class="jobs-grid">
            ${this.generateAlumniJobCards()}
        </div>
    `;
}

generateAlumniJobCards() {
    // Sample job data for alumni view
    const jobs = [
        {
            id: 1,
            title: 'Senior Software Engineer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            type: 'full-time',
            experience: 'senior',
            salary: '$120,000 - $150,000',
            description: 'We are looking for a Senior Software Engineer to join our dynamic team.',
            requirements: ['5+ years experience', 'React/Node.js', 'AWS knowledge'],
            status: 'active',
            postedDate: '2024-01-15',
            isBookmarked: false,
            hasApplied: false
        },
        {
            id: 2,
            title: 'Marketing Manager',
            company: 'Digital Solutions LLC',
            location: 'New York, NY',
            type: 'full-time',
            experience: 'mid',
            salary: '$80,000 - $100,000',
            description: 'Join our marketing team to drive brand awareness and lead generation.',
            requirements: ['3+ years marketing experience', 'Digital marketing', 'Analytics tools'],
            status: 'active',
            postedDate: '2024-01-12',
            isBookmarked: true,
            hasApplied: false
        },
        {
            id: 3,
            title: 'Data Analyst',
            company: 'Analytics Pro',
            location: 'Remote',
            type: 'remote',
            experience: 'entry',
            salary: '$60,000 - $75,000',
            description: 'Analyze data trends and provide insights to support business decisions.',
            requirements: ['SQL knowledge', 'Python/R', 'Statistics background'],
            status: 'active',
            postedDate: '2024-01-10',
            isBookmarked: false,
            hasApplied: true
        }
    ];

    return jobs.map(job => `
        <div class="job-card">
            <button class="bookmark-btn ${job.isBookmarked ? 'bookmarked' : ''}" onclick="alumniSystem.toggleBookmark(${job.id})">
                <i class="fas fa-bookmark"></i>
            </button>
            
            <div class="job-card-header">
                <div style="display: flex; align-items: center;">
                    <div class="company-logo">${job.company.charAt(0)}</div>
                    <div>
                        <h3 class="job-title">${job.title}</h3>
                        <div class="job-company">${job.company}</div>
                        <div class="job-location">
                            <i class="fas fa-map-marker-alt"></i> ${job.location}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="job-card-body">
                <div class="job-meta">
                    <div class="job-meta-item">
                        <i class="fas fa-briefcase"></i>
                        <span>${job.type.replace('-', ' ').toUpperCase()}</span>
                        <span class="job-type-indicator ${job.type}">${job.type.replace('-', ' ')}</span>
                    </div>
                    <div class="job-meta-item">
                        <i class="fas fa-layer-group"></i>
                        <span>${job.experience.charAt(0).toUpperCase() + job.experience.slice(1)} Level</span>
                    </div>
                </div>
                
                <p class="job-description">${job.description}</p>
                
                <div class="salary-range">${job.salary}</div>
                
                <div class="skills-container">
                    <h5>Required Skills</h5>
                    <div class="skills-list">
                        ${job.requirements.map(skill => `<span class="skill-tag required">${skill}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <div class="job-card-footer">
                <div class="job-posted">Posted ${this.getTimeAgo(job.postedDate)}</div>
                <div class="job-actions">
                    <button class="btn-job btn-job-primary" onclick="alumniSystem.viewJobDetails(${job.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    ${job.hasApplied ? 
                        `<button class="btn-job btn-job-success" disabled>
                            <i class="fas fa-check"></i> Applied
                        </button>` :
                        `<button class="btn-job btn-job-primary" onclick="alumniSystem.applyForJob(${job.id})">
                            <i class="fas fa-paper-plane"></i> Apply Now
                        </button>`
                    }
                </div>
            </div>
        </div>
    `).join('');
}

applyForJob(jobId) {
    this.openModal('Apply for Job', `
        <div class="application-form">
            <div class="application-summary">
                <h4>Senior Software Engineer</h4>
                <p><strong>Company:</strong> TechCorp Inc.</p>
                <p><strong>Location:</strong> San Francisco, CA</p>
                <p><strong>Salary:</strong> $120,000 - $150,000</p>
            </div>
            
            <form id="job-application-form">
                <div class="form-group">
                    <label for="applicantName">Full Name</label>
                    <input type="text" id="applicantName" name="applicantName" required>
                </div>
                
                <div class="form-group">
                    <label for="applicantEmail">Email Address</label>
                    <input type="email" id="applicantEmail" name="applicantEmail" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="applicantPhone">Phone Number</label>
                        <input type="tel" id="applicantPhone" name="applicantPhone">
                    </div>
                    <div class="form-group">
                        <label for="graduationYear">Graduation Year</label>
                        <select id="graduationYear" name="graduationYear" required>
                            <option value="">Select Year</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="currentPosition">Current Position (Optional)</label>
                    <input type="text" id="currentPosition" name="currentPosition" placeholder="e.g., Software Developer at ABC Corp">
                </div>
                
                <div class="form-group">
                    <label for="coverLetter">Cover Letter</label>
                    <textarea id="coverLetter" name="coverLetter" rows="6" required 
                              placeholder="Tell us why you're interested in this position and what makes you a great fit..."></textarea>
                </div>
                
                <div class="form-group">
                    <label>Resume Upload</label>
                    <div class="file-upload" onclick="document.getElementById('resumeFile').click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Click to upload your resume</p>
                        <p style="font-size: 12px; color: #64748b;">PDF, DOC, or DOCX (Max 5MB)</p>
                        <input type="file" id="resumeFile" name="resumeFile" accept=".pdf,.doc,.docx" required>
                    </div>
                    <div id="uploaded-resume" class="uploaded-file" style="display: none;">
                        <span id="resume-filename"></span>
                        <button type="button" onclick="alumniSystem.removeFile('resumeFile')">×</button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Portfolio/LinkedIn (Optional)</label>
                    <input type="url" id="portfolioUrl" name="portfolioUrl" placeholder="https://linkedin.com/in/yourprofile">
                </div>
                
                <div class="form-group">
                    <label for="availabilityDate">Available Start Date</label>
                    <input type="date" id="availabilityDate" name="availabilityDate">
                </div>
                
                <div class="form-group">
                    <label for="salaryExpectation">Salary Expectation (Optional)</label>
                    <input type="text" id="salaryExpectation" name="salaryExpectation" placeholder="e.g., $80,000 - $100,000">
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="agreeTerms" name="agreeTerms" required>
                        I agree to the terms and conditions and privacy policy
                    </label>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="allowContact" name="allowContact" checked>
                        Allow the employer to contact me about similar opportunities
                    </label>
                </div>
                
                <div class="form-actions">
                    <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                    <button type="submit" class="btn-primary">Submit Application</button>
                </div>
            </form>
        </div>
    `);

    // Add file upload handler
    document.getElementById('resumeFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            document.getElementById('resume-filename').textContent = file.name;
            document.getElementById('uploaded-resume').style.display = 'flex';
        }
    });

    document.getElementById('job-application-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitJobApplication(jobId);
    });
}

submitJobApplication(jobId) {
    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('name', document.getElementById('applicantName').value);
    formData.append('email', document.getElementById('applicantEmail').value);
    formData.append('phone', document.getElementById('applicantPhone').value);
    formData.append('graduationYear', document.getElementById('graduationYear').value);
    formData.append('currentPosition', document.getElementById('currentPosition').value);
    formData.append('coverLetter', document.getElementById('coverLetter').value);
    formData.append('portfolioUrl', document.getElementById('portfolioUrl').value);
    formData.append('availabilityDate', document.getElementById('availabilityDate').value);
    formData.append('salaryExpectation', document.getElementById('salaryExpectation').value);
    formData.append('resume', document.getElementById('resumeFile').files[0]);

    // Here you would make an API call to submit the application
    this.showNotification('Application submitted successfully! You will receive a confirmation email shortly.', 'success');
    this.closeModal();
    this.loadJobBoard(); // Refresh to show applied status
}

// LinkedIn Integration Methods
syncLinkedInJobs() {
    this.showNotification('Syncing jobs from LinkedIn...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        this.showNotification('Successfully imported 5 new jobs from LinkedIn!', 'success');
        this.loadJobPlacement();
    }, 2000);
}

importLinkedInJobs() {
    this.openModal('Import LinkedIn Jobs', `
        <div class="linkedin-import">
            <h3>Import Jobs from LinkedIn</h3>
            <p>Search and import relevant job postings from LinkedIn</p>
            
            <div class="form-group">
                <label for="linkedinSearch">Search Keywords</label>
                <input type="text" id="linkedinSearch" placeholder="e.g., software engineer, marketing manager">
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="linkedinLocation">Location</label>
                    <input type="text" id="linkedinLocation" placeholder="e.g., San Francisco, CA">
                </div>
                <div class="form-group">
                    <label for="linkedinExperience">Experience Level</label>
                    <select id="linkedinExperience">
                        <option value="">All Levels</option>
                        <option value="entry">Entry Level</option>
                        <option value="mid">Mid Level</option>
                        <option value="senior">Senior Level</option>
                    </select>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="button" onclick="alumniSystem.searchLinkedInJobs()" class="btn-primary">
                    <i class="fab fa-linkedin"></i> Search LinkedIn
                </button>
            </div>
        </div>
    `);
}

searchLinkedInJobs() {
    const keywords = document.getElementById('linkedinSearch').value;
    const location = document.getElementById('linkedinLocation').value;
    const experience = document.getElementById('linkedinExperience').value;

    // Here you would make an API call to LinkedIn
    this.showNotification('Searching LinkedIn jobs...', 'info');
    
    setTimeout(() => {
        this.showNotification('Found 12 matching jobs on LinkedIn!', 'success');
        this.closeModal();
    }, 1500);
}

// Utility Methods
toggleBookmark(jobId) {
    // Here you would toggle bookmark status in the database
    this.showNotification('Job bookmark updated!', 'info');
}

shareJob(jobId) {
    this.openModal('Share Job', `
        <div class="share-job">
            <h3>Share Job Posting</h3>
            <p>Share this job opportunity with alumni and external networks</p>
            
            <div class="form-group">
                <label>Share via Email</label>
                <div class="form-row">
                    <input type="email" placeholder="Enter email addresses (comma separated)" style="flex: 1;">
                    <button class="btn-primary">Send</button>
                </div>
            </div>
            
            <div class="form-group">
                <label>Social Media</label>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-linkedin">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </button>
                    <button class="btn-secondary">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button class="btn-secondary">
                        <i class="fab fa-facebook"></i> Facebook
                    </button>
                </div>
            </div>
            
            <div class="form-group">
                <label>Direct Link</label>
                <div class="copy-link">
                    <input type="text" value="https://alumni.university.edu/jobs/${jobId}" readonly>
                                        <button class="copy-btn" onclick="alumniSystem.copyToClipboard(this)">Copy</button>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Close</button>
            </div>
        </div>
    `);
}

acceptApplication(applicationId) {
    if (confirm('Are you sure you want to accept this application?')) {
        // Here you would make an API call to accept the application
        this.showNotification('Application accepted! Candidate will be notified.', 'success');
        this.closeModal();
        // Refresh applications view
    }
}

rejectApplication(applicationId) {
    this.openModal('Reject Application', `
        <div class="reject-application">
            <h3>Reject Application</h3>
            <p>Provide feedback to help the candidate improve for future opportunities</p>
            
            <div class="form-group">
                <label for="rejectionReason">Reason for Rejection</label>
                <select id="rejectionReason" required>
                    <option value="">Select Reason</option>
                    <option value="qualifications">Insufficient qualifications</option>
                    <option value="experience">Lack of required experience</option>
                    <option value="skills">Missing key skills</option>
                    <option value="position-filled">Position already filled</option>
                    <option value="other">Other</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="rejectionFeedback">Feedback (Optional)</label>
                <textarea id="rejectionFeedback" rows="4" 
                          placeholder="Provide constructive feedback to help the candidate..."></textarea>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="suggestOtherJobs" checked>
                    Suggest other relevant job opportunities
                </label>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="button" onclick="alumniSystem.confirmRejection(${applicationId})" class="btn-danger">
                    Reject Application
                </button>
            </div>
        </div>
    `);
}

confirmRejection(applicationId) {
    const reason = document.getElementById('rejectionReason').value;
    const feedback = document.getElementById('rejectionFeedback').value;
    const suggestOther = document.getElementById('suggestOtherJobs').checked;

    // Here you would make an API call to reject the application
    this.showNotification('Application rejected. Candidate has been notified with feedback.', 'info');
    this.closeModal();
}

contactApplicant(email) {
    this.openModal('Contact Applicant', `
        <form id="contact-applicant-form">
            <div class="form-group">
                <label for="contactSubject">Subject</label>
                <input type="text" id="contactSubject" value="Regarding your application for Senior Software Engineer" required>
            </div>
            
            <div class="form-group">
                <label for="contactMessage">Message</label>
                <textarea id="contactMessage" rows="8" required>Dear Applicant,

Thank you for your interest in the Senior Software Engineer position at TechCorp Inc.

We have reviewed your application and would like to schedule an interview to discuss your qualifications further.

Please let us know your availability for the coming week.

Best regards,
Hiring Team</textarea>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="ccHiringTeam" checked>
                    CC hiring team
                </label>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Send Message</button>
            </div>
        </form>
    `);

    document.getElementById('contact-applicant-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.sendContactMessage(email);
    });
}

sendContactMessage(email) {
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    const ccTeam = document.getElementById('ccHiringTeam').checked;

    // Here you would make an API call to send the email
    this.showNotification('Message sent successfully!', 'success');
    this.closeModal();
}

viewResume(resumeUrl) {
    // Open resume in new tab/window
    window.open(resumeUrl, '_blank');
}

removeFile(inputId) {
    document.getElementById(inputId).value = '';
    document.getElementById('uploaded-resume').style.display = 'none';
}

exportJobs() {
    // Here you would generate and download an Excel/CSV file with job data
    this.showNotification('Job data exported successfully!', 'success');
}

exportApplications(jobId) {
    // Here you would generate and download applications data
    this.showNotification('Applications exported successfully!', 'success');
}

applyJobFilters() {
    const jobType = document.getElementById('job-type-filter').value;
    const experience = document.getElementById('experience-filter').value;
    const status = document.getElementById('job-status-filter').value;
    const location = document.getElementById('location-filter').value;

    // Here you would apply the filters and reload the job list
    this.showNotification('Filters applied successfully!', 'info');
}

applyAlumniJobFilters() {
    const jobType = document.getElementById('alumni-job-type-filter').value;
    const experience = document.getElementById('alumni-experience-filter').value;

    // Here you would apply the filters and reload the job list
    this.showNotification('Filters applied successfully!', 'info');
}

searchJobs() {
    const searchTerm = document.getElementById('job-search-input').value;
    const location = document.getElementById('location-search').value;

    // Here you would perform the search and reload results
    this.showNotification(`Searching for "${searchTerm}"...`, 'info');
}

configureLinkedIn() {
    this.openModal('LinkedIn Configuration', `
        <div class="linkedin-config">
            <h3>LinkedIn Integration Settings</h3>
            <p>Configure your LinkedIn API settings for job synchronization</p>
            
            <div class="form-group">
                <label for="linkedinApiKey">LinkedIn API Key</label>
                <input type="password" id="linkedinApiKey" placeholder="Enter your LinkedIn API key">
            </div>
            
            <div class="form-group">
                <label for="linkedinSecret">LinkedIn Secret</label>
                <input type="password" id="linkedinSecret" placeholder="Enter your LinkedIn secret">
            </div>
            
            <div class="form-group">
                <label for="syncFrequency">Sync Frequency</label>
                <select id="syncFrequency">
                    <option value="manual">Manual Only</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Auto-import Settings</label>
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="autoImportRelevant" checked>
                        <label for="autoImportRelevant">Auto-import relevant jobs</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="notifyNewJobs">
                        <label for="notifyNewJobs">Notify when new jobs are imported</label>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.testLinkedInConnection()" class="btn-secondary">
                    Test Connection
                </button>
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="button" onclick="alumniSystem.saveLinkedInConfig()" class="btn-primary">
                    Save Configuration
                </button>
            </div>
        </div>
    `);
}

testLinkedInConnection() {
    this.showNotification('Testing LinkedIn connection...', 'info');
    
    setTimeout(() => {
        this.showNotification('LinkedIn connection successful!', 'success');
    }, 1500);
}

saveLinkedInConfig() {
    // Here you would save the LinkedIn configuration
    this.showNotification('LinkedIn configuration saved successfully!', 'success');
    this.closeModal();
}

// Job Analytics and Reporting
generateJobAnalytics() {
    this.openModal('Job Placement Analytics', `
        <div class="job-analytics-modal">
            <h3>Job Placement Analytics</h3>
            
            <div class="analytics-grid">
                <div class="analytics-card">
                    <div class="analytics-number">47</div>
                    <div class="analytics-label">Active Jobs</div>
                    <div class="analytics-change positive">+12% this month</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-number">156</div>
                    <div class="analytics-label">Total Applications</div>
                    <div class="analytics-change positive">+23% this month</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-number">23</div>
                    <div class="analytics-label">Positions Filled</div>
                    <div class="analytics-change positive">+8% this month</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-number">89%</div>
                    <div class="analytics-label">Success Rate</div>
                    <div class="analytics-change positive">+5% this month</div>
                </div>
            </div>
            
            <div style="margin-top: 30px;">
                <h4>Top Performing Job Categories</h4>
                <div class="category-stats">
                    <div class="category-item">
                        <span>Technology</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 85%"></div>
                        </div>
                        <span>85%</span>
                    </div>
                    <div class="category-item">
                        <span>Marketing</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 72%"></div>
                        </div>
                        <span>72%</span>
                    </div>
                    <div class="category-item">
                        <span>Finance</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 68%"></div>
                        </div>
                        <span>68%</span>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.exportAnalytics()" class="btn-secondary">
                    <i class="fas fa-download"></i> Export Report
                </button>
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Close</button>
            </div>
        </div>
    `);
}

exportAnalytics() {
    this.showNotification('Analytics report exported successfully!', 'success');
}

// Copy to clipboard utility
copyToClipboard(button) {
    const input = button.previousElementSibling;
    input.select();
    document.execCommand('copy');
    
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Add these methods to the AlumniManagementSystem class

loadDonationsCampaigns() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="donations-header">
            <div>
                <h2>Donations & Campaigns</h2>
                <p>Manage fundraising campaigns and track alumni donations</p>
            </div>
            <div class="page-actions">
                                <button class="btn-primary" onclick="alumniSystem.createCampaign()">
                    <i class="fas fa-plus"></i> Create Campaign
                </button>
                <button class="btn-secondary" onclick="alumniSystem.recordDonation()">
                    <i class="fas fa-hand-holding-usd"></i> Record Donation
                </button>
                <button class="btn-secondary" onclick="alumniSystem.exportDonations()">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>

        <div class="donations-stats">
            <div class="donation-stat-card total-raised">
                <div class="stat-number">$245,680</div>
                <div class="stat-label">Total Raised</div>
            </div>
            <div class="donation-stat-card campaigns">
                <div class="stat-number">12</div>
                <div class="stat-label">Active Campaigns</div>
            </div>
            <div class="donation-stat-card donors">
                <div class="stat-number">1,247</div>
                <div class="stat-label">Total Donors</div>
            </div>
            <div class="donation-stat-card avg-donation">
                <div class="stat-number">$197</div>
                <div class="stat-label">Average Donation</div>
            </div>
        </div>

        <div class="analytics-dashboard">
            <div class="chart-header">
                <h3 class="chart-title">Donation Analytics</h3>
                <div class="chart-period">
                    <button class="period-btn active" onclick="alumniSystem.changePeriod('month')">This Month</button>
                    <button class="period-btn" onclick="alumniSystem.changePeriod('quarter')">Quarter</button>
                    <button class="period-btn" onclick="alumniSystem.changePeriod('year')">Year</button>
                </div>
            </div>
            <div class="analytics-grid">
                <div class="analytics-card">
                    <div class="analytics-number">$45,230</div>
                    <div class="analytics-label">This Month</div>
                    <div class="analytics-change positive">+23% from last month</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-number">156</div>
                    <div class="analytics-label">New Donors</div>
                    <div class="analytics-change positive">+12% from last month</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-number">$290</div>
                    <div class="analytics-label">Avg Donation</div>
                    <div class="analytics-change positive">+8% from last month</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-number">89%</div>
                    <div class="analytics-label">Goal Progress</div>
                    <div class="analytics-change positive">On track</div>
                </div>
            </div>
        </div>

        <div class="campaign-filters">
            <div class="campaign-filter-row">
                <div class="campaign-filter-group">
                    <label>Campaign Status</label>
                    <select id="campaign-status-filter">
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="paused">Paused</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
                <div class="campaign-filter-group">
                    <label>Campaign Type</label>
                    <select id="campaign-type-filter">
                        <option value="">All Types</option>
                        <option value="scholarship">Scholarship</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="research">Research</option>
                        <option value="emergency">Emergency</option>
                        <option value="general">General Fund</option>
                    </select>
                </div>
                <div class="campaign-filter-group">
                    <label>Date Range</label>
                    <input type="date" id="start-date-filter">
                </div>
                <div class="campaign-filter-group">
                    <label>&nbsp;</label>
                    <input type="date" id="end-date-filter">
                </div>
                <div class="campaign-filter-group">
                    <button class="btn-primary" onclick="alumniSystem.applyCampaignFilters()">
                        <i class="fas fa-filter"></i> Apply Filters
                    </button>
                </div>
            </div>
        </div>

        <div class="campaigns-grid" id="campaigns-grid">
            ${this.generateCampaignCards()}
        </div>

        <div class="donations-table">
            <div class="donations-table-header">
                <div>Donor</div>
                <div>Amount</div>
                <div>Campaign</div>
                <div>Method</div>
                <div>Date</div>
                <div>Actions</div>
            </div>
            ${this.generateDonationRows()}
        </div>
    `;
}

generateCampaignCards() {
    // Sample campaign data - this would come from API
    const campaigns = [
        {
            id: 1,
            title: 'Student Scholarship Fund 2024',
            description: 'Help provide scholarships for deserving students who need financial assistance to pursue their education.',
            goal: 100000,
            raised: 75500,
            donors: 234,
            status: 'active',
            deadline: '2024-06-30',
            type: 'scholarship',
            createdDate: '2024-01-01'
        },
        {
            id: 2,
            title: 'New Library Construction',
            description: 'Support the construction of a state-of-the-art library facility for our students and community.',
            goal: 500000,
            raised: 320000,
            donors: 156,
            status: 'active',
            deadline: '2024-12-31',
            type: 'infrastructure',
            createdDate: '2023-09-15'
        },
        {
            id: 3,
            title: 'Research Innovation Grant',
            description: 'Fund cutting-edge research projects that will advance knowledge and benefit society.',
            goal: 250000,
            raised: 180000,
            donors: 89,
            status: 'active',
            deadline: '2024-08-15',
            type: 'research',
            createdDate: '2024-02-01'
        },
        {
            id: 4,
            title: 'Emergency Student Relief',
            description: 'Provide immediate financial assistance to students facing unexpected hardships.',
            goal: 50000,
            raised: 52000,
            donors: 312,
            status: 'completed',
            deadline: '2024-03-31',
            type: 'emergency',
            createdDate: '2024-01-15'
        }
    ];

    return campaigns.map(campaign => {
        const percentage = Math.min((campaign.raised / campaign.goal) * 100, 100);
        const daysLeft = this.getDaysUntilDeadline(campaign.deadline);
        
        return `
            <div class="campaign-card">
                <div class="campaign-status ${campaign.status}">${campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}</div>
                
                <div class="campaign-card-header">
                    <h3 class="campaign-title">${campaign.title}</h3>
                    <p class="campaign-description">${campaign.description}</p>
                </div>
                
                <div class="campaign-card-body">
                    <div class="campaign-progress">
                        <div class="progress-header">
                            <div class="progress-amount">$${campaign.raised.toLocaleString()}</div>
                            <div class="progress-percentage">${percentage.toFixed(1)}%</div>
                        </div>
                        <div class="goal-indicator">
                            <div class="progress-bar">
                                <div class="progress-fill ${this.getProgressClass(percentage)}" style="width: ${percentage}%"></div>
                            </div>
                            <div class="goal-marker" style="left: 100%"></div>
                        </div>
                        <div class="progress-goal">Goal: $${campaign.goal.toLocaleString()}</div>
                        
                        <div class="milestone-list">
                            ${this.generateMilestones(campaign.goal, campaign.raised)}
                        </div>
                    </div>
                    
                    <div class="campaign-meta">
                        <div class="campaign-donors">
                            <i class="fas fa-users"></i>
                            <span>${campaign.donors} donors</span>
                        </div>
                        <div class="campaign-deadline">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="campaign-card-footer">
                    <div class="campaign-created">
                        Created ${this.formatDate(campaign.createdDate)}
                    </div>
                    <div class="campaign-actions">
                        <button class="btn-campaign btn-campaign-primary" onclick="alumniSystem.viewCampaignDetails(${campaign.id})">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn-campaign btn-campaign-secondary" onclick="alumniSystem.editCampaign(${campaign.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-campaign btn-campaign-success" onclick="alumniSystem.viewDonors(${campaign.id})">
                            <i class="fas fa-users"></i> Donors
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

generateMilestones(goal, raised) {
    const milestones = [
        { percentage: 25, label: '25% - Early Support' },
        { percentage: 50, label: '50% - Halfway There' },
        { percentage: 75, label: '75% - Almost There' },
        { percentage: 100, label: '100% - Goal Reached!' }
    ];
    
    const currentPercentage = (raised / goal) * 100;
    
    return milestones.map(milestone => {
        const isCompleted = currentPercentage >= milestone.percentage;
        return `
            <div class="milestone-item">
                <div class="milestone-icon ${isCompleted ? 'completed' : 'pending'}">
                    ${isCompleted ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <div class="milestone-text ${isCompleted ? 'completed' : ''}">${milestone.label}</div>
            </div>
        `;
    }).join('');
}

getProgressClass(percentage) {
    if (percentage >= 75) return 'high';
    if (percentage >= 50) return 'medium';
    return 'low';
}

getDaysUntilDeadline(deadline) {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

generateDonationRows() {
    // Sample donation data - this would come from API
    const donations = [
        {
            id: 1,
            donorName: 'John Smith',
            donorEmail: 'john.smith@email.com',
            graduationYear: 2020,
            amount: 500,
            campaign: 'Student Scholarship Fund 2024',
            method: 'credit-card',
            date: '2024-01-20',
            isRecurring: false
        },
        {
            id: 2,
            donorName: 'Sarah Johnson',
            donorEmail: 'sarah.johnson@email.com',
            graduationYear: 2019,
            amount: 1000,
            campaign: 'New Library Construction',
            method: 'bank-transfer',
            date: '2024-01-18',
            isRecurring: true
        },
        {
            id: 3,
            donorName: 'Mike Davis',
            donorEmail: 'mike.davis@email.com',
            graduationYear: 2021,
            amount: 250,
            campaign: 'Research Innovation Grant',
            method: 'paypal',
            date: '2024-01-15',
            isRecurring: false
        },
        {
            id: 4,
            donorName: 'Emily Wilson',
            donorEmail: 'emily.wilson@email.com',
            graduationYear: 2018,
            amount: 750,
            campaign: 'Student Scholarship Fund 2024',
            method: 'check',
            date: '2024-01-12',
            isRecurring: false
        }
    ];

    return donations.map(donation => `
        <div class="donations-table-row">
            <div class="donor-info">
                <div class="donor-avatar">${donation.donorName.split(' ').map(n => n[0]).join('')}</div>
                <div class="donor-details">
                    <h4>${donation.donorName} ${donation.isRecurring ? '<span class="recurring-badge">Recurring</span>' : ''}</h4>
                    <p>Class of ${donation.graduationYear}</p>
                </div>
            </div>
            <div class="donation-amount">$${donation.amount.toLocaleString()}</div>
            <div>${donation.campaign}</div>
            <div>
                <span class="donation-method ${donation.method}">${donation.method.replace('-', ' ').toUpperCase()}</span>
            </div>
            <div>${this.formatDate(donation.date)}</div>
            <div class="campaign-actions">
                <button class="btn-campaign btn-campaign-primary" onclick="alumniSystem.viewDonationDetails(${donation.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-campaign btn-campaign-secondary" onclick="alumniSystem.sendThankYou(${donation.id})">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="btn-campaign btn-campaign-secondary" onclick="alumniSystem.generateReceipt(${donation.id})">
                    <i class="fas fa-receipt"></i>
                </button>
            </div>
        </div>
    `).join('');
}

createCampaign() {
    this.openModal('Create New Campaign', `
        <form id="create-campaign-form" class="campaign-form">
            <div class="event-form-section">
                <h3>Campaign Details</h3>
                <div class="form-group">
                    <label for="campaignTitle">Campaign Title</label>
                    <input type="text" id="campaignTitle" name="campaignTitle" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="campaignType">Campaign Type</label>
                        <select id="campaignType" name="campaignType" required>
                            <option value="">Select Type</option>
                                                        <option value="scholarship">Scholarship</option>
                            <option value="infrastructure">Infrastructure</option>
                            <option value="research">Research</option>
                            <option value="emergency">Emergency</option>
                            <option value="general">General Fund</option>
                            <option value="athletics">Athletics</option>
                            <option value="arts">Arts & Culture</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="campaignGoal">Fundraising Goal ($)</label>
                        <input type="number" id="campaignGoal" name="campaignGoal" min="1000" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="campaignDescription">Description</label>
                    <textarea id="campaignDescription" name="campaignDescription" rows="4" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="campaignStory">Campaign Story (Optional)</label>
                    <textarea id="campaignStory" name="campaignStory" rows="6" 
                              placeholder="Tell the story behind this campaign to inspire donors..."></textarea>
                </div>
            </div>
            
            <div class="event-form-section">
                <h3>Campaign Timeline</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="startDate">Start Date</label>
                        <input type="date" id="startDate" name="startDate" required>
                    </div>
                    <div class="form-group">
                        <label for="endDate">End Date</label>
                        <input type="date" id="endDate" name="endDate" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="campaignStatus">Initial Status</label>
                    <select id="campaignStatus" name="campaignStatus" required>
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                    </select>
                </div>
            </div>
            
            <div class="event-form-section">
                <h3>Donation Settings</h3>
                <div class="form-group">
                    <label for="suggestedAmounts">Suggested Donation Amounts (comma separated)</label>
                    <input type="text" id="suggestedAmounts" name="suggestedAmounts" 
                           placeholder="25, 50, 100, 250, 500, 1000" value="25, 50, 100, 250, 500, 1000">
                </div>
                
                <div class="form-group">
                    <label for="minimumDonation">Minimum Donation Amount ($)</label>
                    <input type="number" id="minimumDonation" name="minimumDonation" value="10" min="1">
                </div>
                
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="allowRecurring" name="allowRecurring" checked>
                        <label for="allowRecurring">Allow recurring donations</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="allowAnonymous" name="allowAnonymous" checked>
                        <label for="allowAnonymous">Allow anonymous donations</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="showDonorList" name="showDonorList" checked>
                        <label for="showDonorList">Show donor list publicly</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="sendUpdates" name="sendUpdates" checked>
                        <label for="sendUpdates">Send progress updates to donors</label>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="button" onclick="alumniSystem.saveCampaignDraft()" class="btn-secondary">Save as Draft</button>
                <button type="submit" class="btn-primary">Create Campaign</button>
            </div>
        </form>
    `);

    document.getElementById('create-campaign-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitCampaign();
    });
}

submitCampaign() {
    const formData = {
        title: document.getElementById('campaignTitle').value,
        type: document.getElementById('campaignType').value,
        goal: document.getElementById('campaignGoal').value,
        description: document.getElementById('campaignDescription').value,
        story: document.getElementById('campaignStory').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        status: document.getElementById('campaignStatus').value,
        suggestedAmounts: document.getElementById('suggestedAmounts').value,
        minimumDonation: document.getElementById('minimumDonation').value,
        allowRecurring: document.getElementById('allowRecurring').checked,
        allowAnonymous: document.getElementById('allowAnonymous').checked,
        showDonorList: document.getElementById('showDonorList').checked,
        sendUpdates: document.getElementById('sendUpdates').checked
    };

    // Here you would make an API call to create the campaign
    this.showNotification('Campaign created successfully!', 'success');
    this.closeModal();
    this.loadDonationsCampaigns(); // Refresh the campaign list
}

saveCampaignDraft() {
    // Save campaign as draft
    this.showNotification('Campaign saved as draft!', 'info');
    this.closeModal();
}

viewCampaignDetails(campaignId) {
    // Sample data - this would come from API
    const campaignDetails = {
        id: campaignId,
        title: 'Student Scholarship Fund 2024',
        description: 'Help provide scholarships for deserving students who need financial assistance to pursue their education.',
        story: 'Every year, talented students face the difficult choice between pursuing their dreams and managing financial constraints. Your donation directly impacts a student\'s ability to focus on their studies rather than worrying about tuition fees.',
        goal: 100000,
        raised: 75500,
        donors: 234,
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        type: 'scholarship',
        createdDate: '2024-01-01',
        recentDonations: [
            { name: 'John Smith', amount: 500, date: '2024-01-20', anonymous: false },
            { name: 'Anonymous', amount: 250, date: '2024-01-19', anonymous: true },
            { name: 'Sarah Johnson', amount: 1000, date: '2024-01-18', anonymous: false }
        ]
    };

    const percentage = (campaignDetails.raised / campaignDetails.goal) * 100;
    const daysLeft = this.getDaysUntilDeadline(campaignDetails.endDate);

    this.openModal('Campaign Details', `
        <div class="campaign-details-modal">
            <div class="campaign-modal-header">
                <h3 class="campaign-modal-title">${campaignDetails.title}</h3>
                <div class="campaign-modal-meta">
                    <span><i class="fas fa-tag"></i> ${campaignDetails.type.charAt(0).toUpperCase() + campaignDetails.type.slice(1)}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
                    <span><i class="fas fa-users"></i> ${campaignDetails.donors} donors</span>
                </div>
            </div>
            
            <div class="campaign-modal-body">
                <div class="campaign-main-content">
                    <h4>Description</h4>
                    <p>${campaignDetails.description}</p>
                    
                    <h4>Campaign Story</h4>
                    <p>${campaignDetails.story}</p>
                    
                    <h4>Recent Donations</h4>
                    <div class="donor-list">
                        ${campaignDetails.recentDonations.map(donation => `
                            <div class="donor-item">
                                <div class="donor-item-info">
                                    <div class="donor-item-avatar">${donation.anonymous ? '?' : donation.name.charAt(0)}</div>
                                    <div class="donor-item-details">
                                        <div class="donor-item-name">${donation.name}</div>
                                        <div class="donor-item-date">${this.formatDate(donation.date)}</div>
                                    </div>
                                </div>
                                <div class="donor-item-amount">$${donation.amount.toLocaleString()}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="campaign-sidebar">
                    <h4>Campaign Progress</h4>
                    <div class="campaign-progress">
                        <div class="progress-header">
                            <div class="progress-amount">$${campaignDetails.raised.toLocaleString()}</div>
                            <div class="progress-percentage">${percentage.toFixed(1)}%</div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill ${this.getProgressClass(percentage)}" style="width: ${percentage}%"></div>
                        </div>
                        <div class="progress-goal">Goal: $${campaignDetails.goal.toLocaleString()}</div>
                    </div>
                    
                    <h4>Campaign Information</h4>
                    <ul class="campaign-info-list">
                        <li>
                            <span class="campaign-info-label">Status</span>
                            <span class="campaign-info-value">
                                <span class="campaign-status ${campaignDetails.status}">${campaignDetails.status.charAt(0).toUpperCase() + campaignDetails.status.slice(1)}</span>
                            </span>
                        </li>
                        <li>
                            <span class="campaign-info-label">Start Date</span>
                            <span class="campaign-info-value">${this.formatDate(campaignDetails.startDate)}</span>
                        </li>
                        <li>
                            <span class="campaign-info-label">End Date</span>
                            <span class="campaign-info-value">${this.formatDate(campaignDetails.endDate)}</span>
                        </li>
                        <li>
                            <span class="campaign-info-label">Average Donation</span>
                            <span class="campaign-info-value">$${Math.round(campaignDetails.raised / campaignDetails.donors)}</span>
                        </li>
                    </ul>
                    
                    <div style="margin-top: 20px;">
                        <button class="btn-primary" onclick="alumniSystem.shareCampaign(${campaignDetails.id})" style="width: 100%; margin-bottom: 10px;">
                            <i class="fas fa-share"></i> Share Campaign
                        </button>
                        <button class="btn-secondary" onclick="alumniSystem.sendCampaignUpdate(${campaignDetails.id})" style="width: 100%; margin-bottom: 10px;">
                            <i class="fas fa-envelope"></i> Send Update
                        </button>
                        <button class="btn-secondary" onclick="alumniSystem.generateCampaignReport(${campaignDetails.id})" style="width: 100%;">
                            <i class="fas fa-chart-bar"></i> Generate Report
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Close</button>
            </div>
        </div>
    `);
}

recordDonation() {
    this.openModal('Record Donation', `
        <form id="record-donation-form" class="donation-form">
            <div class="donation-summary">
                <h4>Record New Donation</h4>
                <p>Manually record a donation received through other channels</p>
            </div>
            
            <div class="event-form-section">
                <h3>Donor Information</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="donorName">Donor Name</label>
                        <input type="text" id="donorName" name="donorName" required>
                    </div>
                    <div class="form-group">
                        <label for="donorEmail">Email Address</label>
                        <input type="email" id="donorEmail" name="donorEmail">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="donorPhone">Phone Number</label>
                        <input type="tel" id="donorPhone" name="donorPhone">
                    </div>
                    <div class="form-group">
                        <label for="graduationYear">Graduation Year (if alumni)</label>
                        <select id="graduationYear" name="graduationYear">
                            <option value="">Not an alumni</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="anonymousDonation" name="anonymousDonation">
                        Anonymous donation (don't display donor name publicly)
                    </label>
                </div>
            </div>
            
            <div class="event-form-section">
                <h3>Donation Details</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="donationAmount">Donation Amount ($)</label>
                        <input type="number" id="donationAmount" name="donationAmount" min="1" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="donationCampaign">Campaign</label>
                        <select id="donationCampaign" name="donationCampaign" required>
                            <option value="">Select Campaign</option>
                            <option value="1">Student Scholarship Fund 2024</option>
                            <option value="2">New Library Construction</option>
                            <option value="3">Research Innovation Grant</option>
                            <option value="4">General Fund</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="paymentMethod">Payment Method</label>
                        <select id="paymentMethod" name="paymentMethod" required>
                            <option value="">Select Method</option>
                                                        <option value="credit-card">Credit Card</option>
                            <option value="bank-transfer">Bank Transfer</option>
                            <option value="check">Check</option>
                            <option value="cash">Cash</option>
                            <option value="paypal">PayPal</option>
                            <option value="cryptocurrency">Cryptocurrency</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="donationDate">Donation Date</label>
                        <input type="date" id="donationDate" name="donationDate" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="transactionId">Transaction ID (Optional)</label>
                    <input type="text" id="transactionId" name="transactionId" placeholder="Reference number or transaction ID">
                </div>
                
                <div class="form-group">
                    <label for="donationNotes">Notes (Optional)</label>
                    <textarea id="donationNotes" name="donationNotes" rows="3" 
                              placeholder="Any additional notes about this donation..."></textarea>
                </div>
                
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="isRecurring" name="isRecurring">
                        <label for="isRecurring">This is a recurring donation</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="sendReceipt" name="sendReceipt" checked>
                        <label for="sendReceipt">Send donation receipt to donor</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="sendThankYou" name="sendThankYou" checked>
                        <label for="sendThankYou">Send thank you message</label>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Record Donation</button>
            </div>
        </form>
    `);

    document.getElementById('record-donation-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitDonationRecord();
    });
}

submitDonationRecord() {
    const formData = {
        donorName: document.getElementById('donorName').value,
        donorEmail: document.getElementById('donorEmail').value,
        donorPhone: document.getElementById('donorPhone').value,
        graduationYear: document.getElementById('graduationYear').value,
        anonymous: document.getElementById('anonymousDonation').checked,
        amount: document.getElementById('donationAmount').value,
        campaign: document.getElementById('donationCampaign').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        date: document.getElementById('donationDate').value,
        transactionId: document.getElementById('transactionId').value,
        notes: document.getElementById('donationNotes').value,
        isRecurring: document.getElementById('isRecurring').checked,
        sendReceipt: document.getElementById('sendReceipt').checked,
        sendThankYou: document.getElementById('sendThankYou').checked
    };

    // Here you would make an API call to record the donation
    this.showNotification('Donation recorded successfully!', 'success');
    this.closeModal();
    this.loadDonationsCampaigns(); // Refresh the donations list
}

// Alumni Donation Interface
loadAlumniDonations() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="donations-header">
            <div>
                <h2>Support Your Alma Mater</h2>
                <p>Make a difference by supporting causes that matter to you</p>
            </div>
        </div>

        <div class="campaigns-grid">
            ${this.generateAlumniCampaignCards()}
        </div>
    `;
}

generateAlumniCampaignCards() {
    // Sample campaign data for alumni view
    const campaigns = [
        {
            id: 1,
            title: 'Student Scholarship Fund 2024',
            description: 'Help provide scholarships for deserving students who need financial assistance.',
            goal: 100000,
            raised: 75500,
            donors: 234,
            status: 'active',
            deadline: '2024-06-30'
        },
        {
            id: 2,
            title: 'New Library Construction',
            description: 'Support the construction of a state-of-the-art library facility.',
            goal: 500000,
            raised: 320000,
            donors: 156,
            status: 'active',
            deadline: '2024-12-31'
        }
    ];

    return campaigns.map(campaign => {
        const percentage = (campaign.raised / campaign.goal) * 100;
        const daysLeft = this.getDaysUntilDeadline(campaign.deadline);
        
        return `
            <div class="campaign-card">
                <div class="campaign-card-header">
                    <h3 class="campaign-title">${campaign.title}</h3>
                    <p class="campaign-description">${campaign.description}</p>
                </div>
                
                <div class="campaign-card-body">
                    <div class="campaign-progress">
                        <div class="progress-header">
                            <div class="progress-amount">$${campaign.raised.toLocaleString()}</div>
                            <div class="progress-percentage">${percentage.toFixed(1)}%</div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill ${this.getProgressClass(percentage)}" style="width: ${percentage}%"></div>
                        </div>
                        <div class="progress-goal">Goal: $${campaign.goal.toLocaleString()}</div>
                    </div>
                    
                    <div class="campaign-meta">
                        <div class="campaign-donors">
                            <i class="fas fa-users"></i>
                            <span>${campaign.donors} donors</span>
                        </div>
                        <div class="campaign-deadline">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="campaign-card-footer">
                    <div class="campaign-actions">
                        <button class="btn-campaign btn-campaign-primary" onclick="alumniSystem.viewCampaignDetails(${campaign.id})">
                            <i class="fas fa-eye"></i> Learn More
                        </button>
                        <button class="btn-campaign btn-campaign-success" onclick="alumniSystem.donateToCampaign(${campaign.id})">
                            <i class="fas fa-heart"></i> Donate Now
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

donateToCampaign(campaignId) {
    // Sample campaign data
    const campaign = {
        id: campaignId,
        title: 'Student Scholarship Fund 2024',
        description: 'Help provide scholarships for deserving students who need financial assistance.',
        suggestedAmounts: [25, 50, 100, 250, 500, 1000]
    };

    this.openModal('Make a Donation', `
        <div class="donation-form">
            <div class="donation-summary">
                <h4>${campaign.title}</h4>
                <p>${campaign.description}</p>
            </div>
            
            <form id="donation-form">
                <div class="event-form-section">
                    <h3>Donation Amount</h3>
                    <div class="amount-buttons">
                        ${campaign.suggestedAmounts.map(amount => `
                            <button type="button" class="amount-btn" onclick="alumniSystem.selectAmount(${amount})">
                                $${amount}
                            </button>
                        `).join('')}
                    </div>
                    <div class="custom-amount">
                        <input type="number" id="customAmount" placeholder="Enter custom amount" min="10" step="0.01">
                    </div>
                </div>
                
                <div class="event-form-section">
                    <h3>Donation Type</h3>
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="radio" id="oneTime" name="donationType" value="one-time" checked>
                            <label for="oneTime">One-time donation</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="radio" id="monthly" name="donationType" value="monthly">
                            <label for="monthly">Monthly recurring</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="radio" id="annual" name="donationType" value="annual">
                            <label for="annual">Annual recurring</label>
                        </div>
                    </div>
                    
                    <div class="recurring-info" id="recurringInfo" style="display: none;">
                        <h5>Recurring Donation Benefits</h5>
                        <p>Recurring donations provide steady support and help us plan long-term initiatives more effectively.</p>
                    </div>
                </div>
                
                <div class="event-form-section">
                    <h3>Payment Method</h3>
                    <div class="payment-methods">
                        <div class="payment-method selected" onclick="alumniSystem.selectPaymentMethod('credit-card')">
                            <i class="fas fa-credit-card"></i>
                            <span>Credit Card</span>
                        </div>
                        <div class="payment-method" onclick="alumniSystem.selectPaymentMethod('paypal')">
                            <i class="fab fa-paypal"></i>
                            <span>PayPal</span>
                        </div>
                        <div class="payment-method" onclick="alumniSystem.selectPaymentMethod('bank-transfer')">
                            <i class="fas fa-university"></i>
                            <span>Bank Transfer</span>
                        </div>
                        <div class="payment-method" onclick="alumniSystem.selectPaymentMethod('apple-pay')">
                            <i class="fab fa-apple-pay"></i>
                            <span>Apple Pay</span>
                        </div>
                    </div>
                </div>
                
                <div class="event-form-section">
                    <h3>Donor Information</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="donorFirstName">First Name</label>
                            <input type="text" id="donorFirstName" name="donorFirstName" required>
                        </div>
                        <div class="form-group">
                            <label for="donorLastName">Last Name</label>
                            <input type="text" id="donorLastName" name="donorLastName" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="donorEmailAddress">Email Address</label>
                            <input type="email" id="donorEmailAddress" name="donorEmailAddress" required>
                        </div>
                        <div class="form-group">
                            <label for="donorPhoneNumber">Phone Number</label>
                            <input type="tel" id="donorPhoneNumber" name="donorPhoneNumber">
                        </div>
                    </div>
                    
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="checkbox" id="anonymousDonor" name="anonymousDonor">
                            <label for="anonymousDonor">Make this donation anonymous</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="emailUpdates" name="emailUpdates" checked>
                            <label for="emailUpdates">Send me updates about this campaign</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="taxReceipt" name="taxReceipt" checked>
                            <label for="taxReceipt">Email me a tax-deductible receipt</label>
                        </div>
                    </div>
                </div>
                
                <div class="tax-info">
                    <h5><i class="fas fa-info-circle"></i> Tax Information</h5>
                    <p>Your donation is tax-deductible to the full extent allowed by law. You will receive a receipt for your records.</p>
                </div>
                
                <div class="form-actions">
                    <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                    <button type="submit" class="btn-primary">
                        <i class="fas fa-heart"></i> Complete Donation
                    </button>
                </div>
            </form>
        </div>
    `);

    // Add event listeners
    document.querySelectorAll('input[name="donationType"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const recurringInfo = document.getElementById('recurringInfo');
            recurringInfo.style.display = this.value !== 'one-time' ? 'block' : 'none';
        });
    });

    document.getElementById('donation-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.processDonation(campaignId);
    });
}

selectAmount(amount) {
    // Remove selected class from all buttons
    document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));
    
    // Add selected class to clicked button
    event.target.classList.add('selected');
    
    // Clear custom amount
    document.getElementById('customAmount').value = '';
}

selectPaymentMethod(method) {
    // Remove selected class from all payment methods
    document.querySelectorAll('.payment-method').forEach(pm => pm.classList.remove('selected'));
    
    // Add selected class to clicked method
    event.target.closest('.payment-method').classList.add('selected');
}

processDonation(campaignId) {
    const selectedAmount = document.querySelector('.amount-btn.selected');
    const customAmount = document.getElementById('customAmount').value;
    const amount = selectedAmount ? selectedAmount.textContent.replace('$', '') : customAmount;

    if (!amount || amount < 10) {
        this.showNotification('Please select or enter a donation amount of at least $10', 'error');
        return;
    }

    const formData = {
        campaignId: campaignId,
        amount: amount,
        donationType: document.querySelector('input[name="donationType"]:checked').value,
        paymentMethod: document.querySelector('.payment-method.selected').textContent.trim(),
        firstName: document.getElementById('donorFirstName').value,
        lastName: document.getElementById('donorLastName').value,
        email: document.getElementById('donorEmailAddress').value,
        phone: document.getElementById('donorPhoneNumber').value,
        anonymous: document.getElementById('anonymousDonor').checked,
        emailUpdates: document.getElementById('emailUpdates').checked,
        taxReceipt: document.getElementById('taxReceipt').checked
    };

    // Here you would integrate with payment processor (Stripe, PayPal, etc.)
        // Here you would integrate with payment processor (Stripe, PayPal, etc.)
    this.showDonationSuccess(formData);
}

showDonationSuccess(donationData) {
    this.closeModal();
    
    // Show success modal with receipt
    this.openModal('Donation Successful', `
        <div class="donation-receipt">
            <div class="receipt-header">
                <div class="receipt-icon success-checkmark">
                    <i class="fas fa-heart"></i>
                </div>
                <h3 class="receipt-title">Thank You!</h3>
                <p class="receipt-subtitle">Your donation has been processed successfully</p>
            </div>
            
            <div class="receipt-details">
                <div class="receipt-row">
                    <span class="receipt-label">Donation Amount:</span>
                    <span class="receipt-value">$${donationData.amount}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Donation Type:</span>
                    <span class="receipt-value">${donationData.donationType.replace('-', ' ').toUpperCase()}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Payment Method:</span>
                    <span class="receipt-value">${donationData.paymentMethod}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Transaction Date:</span>
                    <span class="receipt-value">${new Date().toLocaleDateString()}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Transaction ID:</span>
                    <span class="receipt-value">TXN-${Date.now()}</span>
                </div>
            </div>
            
            <div class="tax-info">
                <h5><i class="fas fa-receipt"></i> Tax Receipt</h5>
                <p>A tax-deductible receipt has been sent to ${donationData.email}. Please keep this for your records.</p>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.downloadReceipt()" class="btn-secondary">
                    <i class="fas fa-download"></i> Download Receipt
                </button>
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-primary">Done</button>
            </div>
        </div>
    `);
}

// Campaign Management Methods
editCampaign(campaignId) {
    // Sample data - this would come from API
    const campaignDetails = {
        id: campaignId,
        title: 'Student Scholarship Fund 2024',
        type: 'scholarship',
        goal: 100000,
        description: 'Help provide scholarships for deserving students.',
        story: 'Every year, talented students face financial constraints...',
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        status: 'active',
        suggestedAmounts: '25, 50, 100, 250, 500, 1000',
        minimumDonation: 10,
        allowRecurring: true,
        allowAnonymous: true,
        showDonorList: true,
        sendUpdates: true
    };

    this.openModal('Edit Campaign', `
        <form id="edit-campaign-form" class="campaign-form">
            <div class="event-form-section">
                <h3>Campaign Details</h3>
                <div class="form-group">
                    <label for="editCampaignTitle">Campaign Title</label>
                    <input type="text" id="editCampaignTitle" name="editCampaignTitle" value="${campaignDetails.title}" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="editCampaignType">Campaign Type</label>
                        <select id="editCampaignType" name="editCampaignType" required>
                            <option value="scholarship" ${campaignDetails.type === 'scholarship' ? 'selected' : ''}>Scholarship</option>
                            <option value="infrastructure" ${campaignDetails.type === 'infrastructure' ? 'selected' : ''}>Infrastructure</option>
                            <option value="research" ${campaignDetails.type === 'research' ? 'selected' : ''}>Research</option>
                            <option value="emergency" ${campaignDetails.type === 'emergency' ? 'selected' : ''}>Emergency</option>
                            <option value="general" ${campaignDetails.type === 'general' ? 'selected' : ''}>General Fund</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="editCampaignGoal">Fundraising Goal ($)</label>
                        <input type="number" id="editCampaignGoal" name="editCampaignGoal" value="${campaignDetails.goal}" min="1000" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="editCampaignDescription">Description</label>
                    <textarea id="editCampaignDescription" name="editCampaignDescription" rows="4" required>${campaignDetails.description}</textarea>
                </div>
                
                <div class="form-group">
                    <label for="editCampaignStory">Campaign Story</label>
                    <textarea id="editCampaignStory" name="editCampaignStory" rows="6">${campaignDetails.story}</textarea>
                </div>
            </div>
            
            <div class="event-form-section">
                <h3>Campaign Timeline</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="editStartDate">Start Date</label>
                        <input type="date" id="editStartDate" name="editStartDate" value="${campaignDetails.startDate}" required>
                    </div>
                    <div class="form-group">
                        <label for="editEndDate">End Date</label>
                        <input type="date" id="editEndDate" name="editEndDate" value="${campaignDetails.endDate}" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="editCampaignStatus">Status</label>
                    <select id="editCampaignStatus" name="editCampaignStatus" required>
                        <option value="draft" ${campaignDetails.status === 'draft' ? 'selected' : ''}>Draft</option>
                        <option value="active" ${campaignDetails.status === 'active' ? 'selected' : ''}>Active</option>
                        <option value="paused" ${campaignDetails.status === 'paused' ? 'selected' : ''}>Paused</option>
                        <option value="completed" ${campaignDetails.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Update Campaign</button>
            </div>
        </form>
    `);

    document.getElementById('edit-campaign-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.updateCampaign(campaignId);
    });
}

updateCampaign(campaignId) {
    // Here you would make an API call to update the campaign
        this.showNotification('Campaign updated successfully!', 'success');
    this.closeModal();
    this.loadDonationsCampaigns(); // Refresh the campaign list
}

viewDonors(campaignId) {
    // Sample donor data - this would come from API
    const donors = [
        {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@email.com',
            amount: 500,
            date: '2024-01-20',
            isRecurring: false,
            anonymous: false,
            graduationYear: 2020
        },
        {
            id: 2,
            name: 'Anonymous',
            email: 'anonymous@donor.com',
            amount: 250,
            date: '2024-01-19',
            isRecurring: false,
            anonymous: true,
            graduationYear: null
        },
        {
            id: 3,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            amount: 1000,
            date: '2024-01-18',
            isRecurring: true,
            anonymous: false,
            graduationYear: 2019
        },
        {
            id: 4,
            name: 'Mike Davis',
            email: 'mike.davis@email.com',
            amount: 100,
            date: '2024-01-17',
            isRecurring: false,
            anonymous: false,
            graduationYear: 2021
        }
    ];

    this.openModal('Campaign Donors', `
        <div class="donors-modal">
            <h3>Student Scholarship Fund 2024 - Donors</h3>
            <p>Total Donors: ${donors.length} | Total Raised: $${donors.reduce((sum, donor) => sum + donor.amount, 0).toLocaleString()}</p>
            
            <div class="donors-list">
                ${donors.map(donor => `
                    <div class="donor-item">
                        <div class="donor-item-info">
                            <div class="donor-item-avatar">${donor.anonymous ? '?' : donor.name.charAt(0)}</div>
                            <div class="donor-item-details">
                                <div class="donor-item-name">
                                    ${donor.name}
                                    ${donor.isRecurring ? '<span class="recurring-badge">Recurring</span>' : ''}
                                </div>
                                <div class="donor-item-date">
                                    ${this.formatDate(donor.date)}
                                    ${donor.graduationYear ? ` • Class of ${donor.graduationYear}` : ''}
                                </div>
                            </div>
                        </div>
                        <div class="donor-item-amount">$${donor.amount.toLocaleString()}</div>
                        <div class="donor-actions">
                            ${!donor.anonymous ? `
                                <button class="btn-campaign btn-campaign-secondary" onclick="alumniSystem.sendThankYou(${donor.id})">
                                    <i class="fas fa-heart"></i> Thank
                                </button>
                                <button class="btn-campaign btn-campaign-secondary" onclick="alumniSystem.contactDonor('${donor.email}')">
                                    <i class="fas fa-envelope"></i> Contact
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.exportDonorList(${campaignId})" class="btn-secondary">
                    <i class="fas fa-download"></i> Export Donor List
                </button>
                <button type="button" onclick="alumniSystem.sendBulkThankYou(${campaignId})" class="btn-secondary">
                    <i class="fas fa-heart"></i> Send Bulk Thank You
                </button>
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Close</button>
            </div>
        </div>
    `);
}

sendThankYou(donorId) {
    this.openModal('Send Thank You Message', `
        <form id="thank-you-form">
            <div class="form-group">
                <label for="thankYouSubject">Subject</label>
                <input type="text" id="thankYouSubject" value="Thank you for your generous donation!" required>
            </div>
            
            <div class="form-group">
                <label for="thankYouMessage">Message</label>
                <textarea id="thankYouMessage" rows="8" required>Dear [Donor Name],

Thank you so much for your generous donation to our Student Scholarship Fund 2024 campaign. Your support makes a real difference in the lives of our students.

Your contribution of $[Amount] will help provide scholarships to deserving students who need financial assistance to pursue their education.

We are grateful for alumni like you who continue to support our mission and help the next generation of students succeed.

With heartfelt appreciation,
Alumni Relations Team</textarea>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="personalizeMessage" checked>
                    Personalize message with donor name and amount
                </label>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Send Thank You</button>
            </div>
        </form>
    `);

    document.getElementById('thank-you-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitThankYou(donorId);
    });
}

submitThankYou(donorId) {
    const subject = document.getElementById('thankYouSubject').value;
    const message = document.getElementById('thankYouMessage').value;
    const personalize = document.getElementById('personalizeMessage').checked;

    // Here you would make an API call to send the thank you message
    this.showNotification('Thank you message sent successfully!', 'success');
    this.closeModal();
}

sendBulkThankYou(campaignId) {
    this.openModal('Send Bulk Thank You', `
        <form id="bulk-thank-you-form">
            <div class="form-group">
                <label for="bulkRecipients">Send To</label>
                <select id="bulkRecipients" required>
                    <option value="all">All Donors</option>
                    <option value="recent">Recent Donors (Last 30 days)</option>
                    <option value="major">Major Donors ($500+)</option>
                    <option value="recurring">Recurring Donors</option>
                    <option value="first-time">First-time Donors</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="bulkSubject">Subject</label>
                <input type="text" id="bulkSubject" value="Thank you for supporting our campaign!" required>
            </div>
            
            <div class="form-group">
                <label for="bulkMessage">Message</label>
                <textarea id="bulkMessage" rows="8" required>Dear Supporters,

We wanted to take a moment to express our heartfelt gratitude for your generous support of our Student Scholarship Fund 2024 campaign.

Thanks to donors like you, we have raised [Campaign Progress] toward our goal of [Campaign Goal]. Your contributions are making a real difference in the lives of our students.

Every donation, no matter the size, helps us provide scholarships to deserving students who need financial assistance to pursue their education.

Thank you for being part of our community and for your continued support.

With sincere appreciation,
Alumni Relations Team</textarea>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="includeCampaignProgress" checked>
                    Include campaign progress in message
                </label>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Send Bulk Thank You</button>
            </div>
        </form>
    `);

    document.getElementById('bulk-thank-you-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitBulkThankYou(campaignId);
    });
}

submitBulkThankYou(campaignId) {
    const recipients = document.getElementById('bulkRecipients').value;
    const subject = document.getElementById('bulkSubject').value;
    const message = document.getElementById('bulkMessage').value;
    const includeProgress = document.getElementById('includeCampaignProgress').checked;

    // Here you would make an API call to send bulk thank you messages
    this.showNotification('Bulk thank you messages sent successfully!', 'success');
    this.closeModal();
}

sendCampaignUpdate(campaignId) {
    this.openModal('Send Campaign Update', `
        <form id="campaign-update-form">
            <div class="form-group">
                <label for="updateRecipients">Send To</label>
                <select id="updateRecipients" required>
                    <option value="donors">Campaign Donors</option>
                    <option value="all-alumni">All Alumni</option>
                    <option value="subscribers">Email Subscribers</option>
                    <option value="major-donors">Major Donors</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="updateSubject">Subject</label>
                <input type="text" id="updateSubject" value="Campaign Update: Student Scholarship Fund 2024" required>
            </div>
            
            <div class="form-group">
                <label for="updateMessage">Message</label>
                <textarea id="updateMessage" rows="10" required>Dear Supporters,

We wanted to share an exciting update on our Student Scholarship Fund 2024 campaign!

Thanks to your generous support, we have now raised $75,500 toward our goal of $100,000. That's 75.5% of our target!

Here's what your donations have accomplished so far:
• 15 scholarships awarded to deserving students
• Average scholarship amount: $2,500
• Students from diverse backgrounds and academic disciplines supported

We're in the final stretch of our campaign, with just [Days Left] days remaining. Every donation brings us closer to our goal and helps more students access quality education.

If you haven't donated yet, there's still time to make a difference. If you've already contributed, consider sharing this campaign with friends and family.

Thank you for your continued support!

Best regards,
Campaign Team</textarea>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="includeProgressBar" checked>
                    Include visual progress bar
                </label>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="includeDonateButton" checked>
                    Include "Donate Now" button
                </label>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Send Update</button>
            </div>
        </form>
    `);

    document.getElementById('campaign-update-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitCampaignUpdate(campaignId);
    });
}

submitCampaignUpdate(campaignId) {
    const recipients = document.getElementById('updateRecipients').value;
    const subject = document.getElementById('updateSubject').value;
    const message = document.getElementById('updateMessage').value;
    const includeProgressBar = document.getElementById('includeProgressBar').checked;
    const includeDonateButton = document.getElementById('includeDonateButton').checked;

    // Here you would make an API call to send campaign update
    this.showNotification('Campaign update sent successfully!', 'success');
    this.closeModal();
}

shareCampaign(campaignId) {
    this.openModal('Share Campaign', `
        <div class="share-campaign">
            <h3>Share Campaign</h3>
            <p>Help spread the word about this campaign</p>
            
            <div class="form-group">
                <label>Campaign Link</label>
                <div class="copy-link">
                    <input type="text" value="https://alumni.university.edu/campaigns/${campaignId}" readonly>
                    <button class="copy-btn" onclick="alumniSystem.copyToClipboard(this)">Copy</button>
                </div>
            </div>
            
            <div class="form-group">
                <label>Share via Email</label>
                <div class="form-row">
                    <input type="email" placeholder="Enter email addresses (comma separated)" style="flex: 1;">
                    <button class="btn-primary">Send</button>
                </div>
            </div>
            
            <div class="form-group">
                <label>Social Media</label>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn-secondary" onclick="alumniSystem.shareOnSocial('facebook', ${campaignId})">
                        <i class="fab fa-facebook"></i> Facebook
                    </button>
                    <button class="btn-secondary" onclick="alumniSystem.shareOnSocial('twitter', ${campaignId})">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button class="btn-secondary" onclick="alumniSystem.shareOnSocial('linkedin', ${campaignId})">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </button>
                    <button class="btn-secondary" onclick="alumniSystem.shareOnSocial('whatsapp', ${campaignId})">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Close</button>
            </div>
        </div>
    `);
}

shareOnSocial(platform, campaignId) {
    const campaignUrl = `https://alumni.university.edu/campaigns/${campaignId}`;
    const campaignTitle = 'Student Scholarship Fund 2024';
    const campaignDescription = 'Help provide scholarships for deserving students';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(campaignUrl)}&text=${encodeURIComponent(campaignTitle + ' - ' + campaignDescription)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(campaignUrl)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(campaignTitle + ' - ' + campaignDescription + ' ' + campaignUrl)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Utility Methods
generateCampaignReport(campaignId) {
    // Here you would generate a comprehensive campaign report
    this.showNotification('Campaign report generated successfully!', 'success');
}

generateReceipt(donationId) {
    // Sample donation data - this would come from API
    const donation = {
        id: donationId,
        donorName: 'John Smith',
        amount: 500,
        date: '2024-01-20',
        campaign: 'Student Scholarship Fund 2024',
        method: 'Credit Card',
        transactionId: 'TXN-' + Date.now(),
        taxDeductible: true
    };

    this.openModal('Donation Receipt', `
        <div class="donation-receipt">
            <div class="receipt-header">
                <div class="receipt-icon">
                    <i class="fas fa-receipt"></i>
                </div>
                <h3 class="receipt-title">Donation Receipt</h3>
                <p class="receipt-subtitle">Tax-Deductible Donation Receipt</p>
            </div>
            
            <div class="receipt-details">
                <div class="receipt-row">
                    <span class="receipt-label">Donor Name:</span>
                    <span class="receipt-value">${donation.donorName}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Donation Amount:</span>
                    <span class="receipt-value">$${donation.amount.toLocaleString()}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Campaign:</span>
                    <span class="receipt-value">${donation.campaign}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Payment Method:</span>
                    <span class="receipt-value">${donation.method}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Date:</span>
                    <span class="receipt-value">${this.formatDate(donation.date)}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Transaction ID:</span>
                    <span class="receipt-value">${donation.transactionId}</span>
                </div>
            </div>
            
            ${donation.taxDeductible ? `
                <div class="tax-info">
                    <h5><i class="fas fa-info-circle"></i> Tax Information</h5>
                    <p>This donation is tax-deductible to the full extent allowed by law. No goods or services were provided in exchange for this contribution. Please consult your tax advisor for specific tax advice.</p>
                </div>
            ` : ''}
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.downloadReceipt()" class="btn-secondary">
                    <i class="fas fa-download"></i> Download PDF
                </button>
                <button type="button" onclick="alumniSystem.emailReceipt(${donation.id})" class="btn-secondary">
                    <i class="fas fa-envelope"></i> Email Receipt
                </button>
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-primary">Close</button>
            </div>
        </div>
    `);
}

downloadReceipt() {
    // Here you would generate and download a PDF receipt
    this.showNotification('Receipt downloaded successfully!', 'success');
}

emailReceipt(donationId) {
    // Here you would email the receipt to the donor
    this.showNotification('Receipt emailed successfully!', 'success');
}

viewDonationDetails(donationId) {
    // Sample donation details - this would come from API
    const donationDetails = {
        id: donationId,
        donorName: 'John Smith',
        donorEmail: 'john.smith@email.com',
        graduationYear: 2020,
        amount: 500,
        campaign: 'Student Scholarship Fund 2024',
        method: 'Credit Card',
        date: '2024-01-20',
        transactionId: 'TXN-123456789',
        isRecurring: false,
        anonymous: false,
        notes: 'Happy to support education!',
        address: '123 Main St, City, State 12345',
        phone: '+1-555-0123'
    };

    this.openModal('Donation Details', `
        <div class="donation-details-modal">
            <h3>Donation Details</h3>
            
            <div class="detail-section">
                <h4>Donor Information</h4>
                <div class="info-grid">
                    <div><strong>Name:</strong> ${donationDetails.donorName}</div>
                    <div><strong>Email:</strong> ${donationDetails.donorEmail}</div>
                    <div><strong>Phone:</strong> ${donationDetails.phone}</div>
                    <div><strong>Graduation Year:</strong> ${donationDetails.graduationYear ? `Class of ${donationDetails.graduationYear}` : 'Not an alumni'}</div>
                    <div><strong>Address:</strong> ${donationDetails.address}</div>
                    <div><strong>Anonymous:</strong> ${donationDetails.anonymous ? 'Yes' : 'No'}</div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Donation Information</h4>
                <div class="info-grid">
                    <div><strong>Amount:</strong> $${donationDetails.amount.toLocaleString()}</div>
                    <div><strong>Campaign:</strong> ${donationDetails.campaign}</div>
                    <div><strong>Payment Method:</strong> ${donationDetails.method}</div>
                    <div><strong>Date:</strong> ${this.formatDate(donationDetails.date)}</div>
                    <div><strong>Transaction ID:</strong> ${donationDetails.transactionId}</div>
                    <div><strong>Recurring:</strong> ${donationDetails.isRecurring ? 'Yes' : 'No'}</div>
                </div>
            </div>
            
            ${donationDetails.notes ? `
                <div class="detail-section">
                    <h4>Donor Notes</h4>
                    <p>${donationDetails.notes}</p>
                </div>
            ` : ''}
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.generateReceipt(${donationDetails.id})" class="btn-secondary">
                    <i class="fas fa-receipt"></i> Generate Receipt
                </button>
                <button type="button" onclick="alumniSystem.sendThankYou(${donationDetails.id})" class="btn-secondary">
                    <i class="fas fa-heart"></i> Send Thank You
                </button>
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Close</button>
            </div>
        </div>
    `);
}

contactDonor(email) {
    this.openModal('Contact Donor', `
        <form id="contact-donor-form">
            <div class="form-group">
                <label for="contactDonorSubject">Subject</label>
                <input type="text" id="contactDonorSubject" value="Thank you for your generous support" required>
            </div>
            
            <div class="form-group">
                <label for="contactDonorMessage">Message</label>
                <textarea id="contactDonorMessage" rows="8" required>Dear Donor,

Thank you for your generous donation to our campaign. Your support means the world to us and makes a real difference.

We wanted to reach out personally to express our gratitude and keep you updated on how your contribution is being used.

If you have any questions or would like to learn more about our other initiatives, please don't hesitate to reach out.

With sincere appreciation,
Alumni Relations Team</textarea>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Send Message</button>
            </div>
        </form>
    `);

    document.getElementById('contact-donor-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.sendDonorMessage(email);
    });
}

sendDonorMessage(email) {
    const subject = document.getElementById('contactDonorSubject').value;
    const message = document.getElementById('contactDonorMessage').value;

    // Here you would make an API call to send the message
    this.showNotification('Message sent successfully!', 'success');
    this.closeModal();
}

// Analytics and Reporting
changePeriod(period) {
    // Remove active class from all period buttons
    document.querySelectorAll('.period-btn').forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Here you would reload analytics data for the selected period
    this.showNotification(`Analytics updated for ${period}`, 'info');
}

exportDonations() {
    // Here you would generate and download donations data
    this.showNotification('Donations data exported successfully!', 'success');
}

exportDonorList(campaignId) {
    // Here you would generate and download donor list
    this.showNotification('Donor list exported successfully!', 'success');
}

applyCampaignFilters() {
    const status = document.getElementById('campaign-status-filter').value;
    const type = document.getElementById('campaign-type-filter').value;
    const startDate = document.getElementById('start-date-filter').value;
    const endDate = document.getElementById('end-date-filter').value;

    // Here you would apply the filters and reload the campaign list
    this.showNotification('Filters applied successfully!', 'info');
}

// Recurring Donations Management
manageRecurringDonations() {
    this.openModal('Manage Recurring Donations', `
        <div class="recurring-donations-modal">
            <h3>Recurring Donations</h3>
            <p>Manage and monitor recurring donation subscriptions</p>
            
            <div class="recurring-stats">
                <div class="analytics-grid">
                    <div class="analytics-card">
                        <div class="analytics-number">47</div>
                        <div class="analytics-label">Active Subscriptions</div>
                    </div>
                    <div class="analytics-card">
                        <div class="analytics-number">$12,450</div>
                        <div class="analytics-label">Monthly Recurring</div>
                    </div>
                    <div class="analytics-card">
                        <div class="analytics-number">$149,400</div>
                        <div class="analytics-label">Annual Projected</div>
                    </div>
                </div>
            </div>
            
            <div class="recurring-list">
                <h4>Recent Recurring Donations</h4>
                <div class="donor-item">
                    <div class="donor-item-info">
                        <div class="donor-item-avatar">S</div>
                        <div class="donor-item-details">
                            <div class="donor-item-name">Sarah Johnson <span class="recurring-badge">Monthly</span></div>
                            <div class="donor-item-date">Next payment: Feb 18, 2024</div>
                        </div>
                    </div>
                    <div class="donor-item-amount">$100/month</div>
                    <div class="donor-actions">
                        <button class="btn-campaign btn-campaign-secondary">
                            <i class="fas fa-pause"></i> Pause
                        </button>
                        <button class="btn-campaign btn-campaign-secondary">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                </div>
                
                <div class="donor-item">
                    <div class="donor-item-info">
                        <div class="donor-item-avatar">M</div>
                        <div class="donor-item-details">
                            <div class="donor-item-name">Mike Davis <span class="recurring-badge">Annual</span></div>
                            <div class="donor-item-date">Next payment: Jan 15, 2025</div>
                        </div>
                    </div>
                    <div class="donor-item-amount">$1,200/year</div>
                    <div class="donor-actions">
                        <button class="btn-campaign btn-campaign-secondary">
                            <i class="fas fa-pause"></i> Pause
                        </button>
                        <button class="btn-campaign btn-campaign-secondary">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.exportRecurringDonations()" class="btn-secondary">
                    <i class="fas fa-download"></i> Export Data
                </button>
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Close</button>
            </div>
        </div>
    `);
}

exportRecurringDonations() {
    this.showNotification('Recurring donations data exported successfully!', 'success');
}

// Copy to clipboard utility (if not already defined)
copyToClipboard(button) {
    const input = button.previousElementSibling;
    input.select();
    document.execCommand('copy');
    
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Format date utility (if not already defined)
formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
// Add these methods to the AlumniManagementSystem class

loadReports() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="reports-header">
            <div>
                <h2>Reports & Analytics</h2>
                <p>Comprehensive reporting and analytics across all modules</p>
            </div>
            <div class="page-actions">
                <button class="btn-primary" onclick="alumniSystem.scheduleReport()">
                    <i class="fas fa-clock"></i> Schedule Report
                </button>
                <button class="btn-secondary" onclick="alumniSystem.customReport()">
                    <i class="fas fa-chart-line"></i> Custom Report
                </button>
            </div>
        </div>

        <div class="reports-dashboard">
            <div class="report-sidebar">
                <div class="report-categories">
                    <h3>Report Categories</h3>
                    
                    <div class="report-category">
                        <div class="category-title">
                            <i class="fas fa-hand-holding-usd"></i>
                            Donations & Campaigns
                        </div>
                        <ul class="report-list">
                            <li class="report-item active" onclick="alumniSystem.loadReport('donation-summary')">
                                <div class="report-item-info">
                                    <span>Donation Summary</span>
                                </div>
                                <span class="report-item-badge">New</span>
                            </li>
                            <li class="report-item" onclick="alumniSystem.loadReport('campaign-performance')">
                                <div class="report-item-info">
                                    <span>Campaign Performance</span>
                                </div>
                            </li>
                            <li class="report-item" onclick="alumniSystem.loadReport('donor-analysis')">
                                <div class="report-item-info">
                                    <span>Donor Analysis</span>
                                </div>
                            </li>
                            <li class="report-item" onclick="alumniSystem.loadReport('recurring-donations')">
                                <div class="report-item-info">
                                    <span>Recurring Donations</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="report-category">
                        <div class="category-title">
                            <i class="fas fa-users"></i>
                            Alumni Management
                        </div>
                        <ul class="report-list">
                            <li class="report-item" onclick="alumniSystem.loadReport('alumni-overview')">
                                <div class="report-item-info">
                                    <span>Alumni Overview</span>
                                </div>
                            </li>
                            <li class="report-item" onclick="alumniSystem.loadReport('engagement-metrics')">
                                <div class="report-item-info">
                                    <span>Engagement Metrics</span>
                                </div>
                            </li>
                            <li class="report-item" onclick="alumniSystem.loadReport('geographic-distribution')">
                                <div class="report-item-info">
                                    <span>Geographic Distribution</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="report-category">
                        <div class="category-title">
                            <i class="fas fa-calendar-alt"></i>
                            Events
                        </div>
                        <ul class="report-list">
                            <li class="report-item" onclick="alumniSystem.loadReport('event-attendance')">
                                <div class="report-item-info">
                                    <span>Event Attendance</span>
                                </div>
                            </li>
                            <li class="report-item" onclick="alumniSystem.loadReport('event-feedback')">
                                <div class="report-item-info">
                                    <span>Event Feedback</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="report-category">
                        <div class="category-title">
                            <i class="fas fa-briefcase"></i>
                            Job Placement
                        </div>
                        <ul class="report-list">
                            <li class="report-item" onclick="alumniSystem.loadReport('job-placement-stats')">
                                <div class="report-item-info">
                                    <span>Placement Statistics</span>
                                </div>
                            </li>
                            <li class="report-item" onclick="alumniSystem.loadReport('employer-partnerships')">
                                <div class="report-item-info">
                                    <span>Employer Partnerships</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="report-filters">
                    <h4>Filters</h4>
                    <div class="filter-group">
                        <label for="reportDateRange">Date Range</label>
                        <select id="reportDateRange">
                            <option value="last-30-days">Last 30 Days</option>
                            <option value="last-3-months">Last 3 Months</option>
                            <option value="last-6-months">Last 6 Months</option>
                            <option value="last-year">Last Year</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>
                    
                    <div class="filter-group" id="customDateRange" style="display: none;">
                        <label>Custom Date Range</label>
                        <div class="date-range">
                            <input type="date" id="startDate" placeholder="Start Date">
                            <input type="date" id="endDate" placeholder="End Date">
                        </div>
                    </div>
                    
                    <div class="filter-group">
                        <label for="reportFormat">Export Format</label>
                        <select id="reportFormat">
                            <option value="pdf">PDF</option>
                            <option value="excel">Excel</option>
                            <option value="csv">CSV</option>
                        </select>
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn-filter btn-filter-primary" onclick="alumniSystem.applyReportFilters()">
                            <i class="fas fa-filter"></i> Apply
                        </button>
                        <button class="btn-filter btn-filter-secondary" onclick="alumniSystem.resetReportFilters()">
                            <i class="fas fa-undo"></i> Reset
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="report-main">
                <div class="report-content" id="reportContent">
                    ${this.generateDonationSummaryReport()}
                </div>
            </div>
        </div>
    `;

    // Add event listener for date range selection
    document.getElementById('reportDateRange').addEventListener('change', function() {
        const customRange = document.getElementById('customDateRange');
        customRange.style.display = this.value === 'custom' ? 'block' : 'none';
    });
}

loadReport(reportType) {
    // Remove active class from all report items
    document.querySelectorAll('.report-item').forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    event.target.closest('.report-item').classList.add('active');
    
    // Show loading state
    document.getElementById('reportContent').innerHTML = `
        <div class="report-loading">
            <i class="fas fa-spinner"></i>
            <p>Loading report...</p>
        </div>
    `;
    
    // Simulate loading delay
    setTimeout(() => {
        let reportContent = '';
        
        switch(reportType) {
            case 'donation-summary':
                reportContent = this.generateDonationSummaryReport();
                break;
            case 'campaign-performance':
                reportContent = this.generateCampaignPerformanceReport();
                break;
            case 'donor-analysis':
                reportContent = this.generateDonorAnalysisReport();
                break;
            case 'recurring-donations':
                reportContent = this.generateRecurringDonationsReport();
                break;
            case 'alumni-overview':
                reportContent = this.generateAlumniOverviewReport();
                break;
            case 'engagement-metrics':
                reportContent = this.generateEngagementMetricsReport();
                break;
            case 'geographic-distribution':
                reportContent = this.generateGeographicDistributionReport();
                break;
            case 'event-attendance':
                reportContent = this.generateEventAttendanceReport();
                break;
            case 'event-feedback':
                reportContent = this.generateEventFeedbackReport();
                break;
            case 'job-placement-stats':
                reportContent = this.generateJobPlacementStatsReport();
                break;
            case 'employer-partnerships':
                reportContent = this.generateEmployerPartnershipsReport();
                break;
            default:
                reportContent = this.generateDonationSummaryReport();
        }
        
        document.getElementById('reportContent').innerHTML = reportContent;
    }, 1000);
}

generateDonationSummaryReport() {
    return `
        <div class="report-header">
            <div>
                <h2 class="report-title">Donation Summary Report</h2>
                <p class="report-subtitle">Overview of donation activities and trends</p>
            </div>
            <div class="report-actions">
                <button class="btn-report btn-report-secondary" onclick="alumniSystem.printReport()">
                    <i class="fas fa-print"></i> Print
                </button>
                                <button class="btn-report btn-report-primary" onclick="alumniSystem.exportReport('donation-summary')">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>

        <div class="report-summary">
            <h4>Executive Summary</h4>
            <p>This report provides a comprehensive overview of donation activities for the selected period. Total donations have increased by 23% compared to the previous period, with strong performance across all campaign categories.</p>
            
            <div class="summary-highlights">
                <div class="highlight-item">
                    <div class="highlight-number">$245,680</div>
                    <div class="highlight-label">Total Raised</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">1,247</div>
                    <div class="highlight-label">Total Donors</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">$197</div>
                    <div class="highlight-label">Avg Donation</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">23%</div>
                    <div class="highlight-label">Growth Rate</div>
                </div>
            </div>
        </div>

        <div class="report-stats">
            <div class="report-stat-card positive">
                <div class="stat-number">$45,230</div>
                <div class="stat-label">This Month</div>
                <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i> +23% from last month
                </div>
            </div>
            <div class="report-stat-card positive">
                <div class="stat-number">156</div>
                <div class="stat-label">New Donors</div>
                <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i> +12% from last month
                </div>
            </div>
            <div class="report-stat-card neutral">
                <div class="stat-number">$290</div>
                <div class="stat-label">Avg Donation</div>
                <div class="stat-change neutral">
                    <i class="fas fa-minus"></i> No change
                </div>
            </div>
            <div class="report-stat-card positive">
                <div class="stat-number">89%</div>
                <div class="stat-label">Retention Rate</div>
                <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i> +5% from last month
                </div>
            </div>
        </div>

        <div class="charts-container">
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Monthly Donations</h3>
                    <div class="chart-period">
                        <button class="period-btn active">6M</button>
                        <button class="period-btn">1Y</button>
                        <button class="period-btn">All</button>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="monthlyDonationsChart" width="400" height="200"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Donation Sources</h3>
                </div>
                <div class="chart-container">
                    <canvas id="donationSourcesChart" width="400" height="200"></canvas>
                </div>
            </div>
            
            <div class="chart-card full-width">
                <div class="chart-header">
                    <h3 class="chart-title">Campaign Performance</h3>
                </div>
                <div class="chart-container">
                    <canvas id="campaignPerformanceChart" width="800" height="300"></canvas>
                </div>
            </div>
        </div>

        <div class="report-table">
            <div class="report-table-header donation-table-header">
                <div>Campaign</div>
                <div>Goal</div>
                <div>Raised</div>
                <div>Progress</div>
                <div>Donors</div>
            </div>
            ${this.generateDonationTableRows()}
        </div>

        <div class="export-options">
            <h4>Export Options</h4>
            <div class="export-buttons">
                <button class="btn-export btn-export-pdf" onclick="alumniSystem.exportReportAs('pdf')">
                    <i class="fas fa-file-pdf"></i> Export as PDF
                </button>
                <button class="btn-export btn-export-excel" onclick="alumniSystem.exportReportAs('excel')">
                    <i class="fas fa-file-excel"></i> Export as Excel
                </button>
                <button class="btn-export btn-export-csv" onclick="alumniSystem.exportReportAs('csv')">
                    <i class="fas fa-file-csv"></i> Export as CSV
                </button>
                <button class="btn-export btn-export-email" onclick="alumniSystem.emailReport()">
                    <i class="fas fa-envelope"></i> Email Report
                </button>
            </div>
        </div>
    `;
}

generateDonationTableRows() {
    const campaigns = [
        { name: 'Student Scholarship Fund 2024', goal: 100000, raised: 75500, donors: 234 },
        { name: 'New Library Construction', goal: 500000, raised: 320000, donors: 156 },
        { name: 'Research Innovation Grant', goal: 250000, raised: 180000, donors: 89 },
        { name: 'Emergency Student Relief', goal: 50000, raised: 52000, donors: 312 }
    ];

    return campaigns.map(campaign => {
        const progress = (campaign.raised / campaign.goal) * 100;
        return `
            <div class="report-table-row donation-table-row">
                <div>
                    <strong>${campaign.name}</strong>
                    <div class="status-indicator ${progress >= 100 ? 'active' : progress >= 50 ? 'pending' : 'inactive'}"></div>
                </div>
                <div>$${campaign.goal.toLocaleString()}</div>
                <div>$${campaign.raised.toLocaleString()}</div>
                <div>
                    <div class="progress-bar-report">
                        <div class="progress-fill-report" style="width: ${Math.min(progress, 100)}%"></div>
                    </div>
                    ${progress.toFixed(1)}%
                </div>
                <div>${campaign.donors}</div>
            </div>
        `;
    }).join('');
}

generateCampaignPerformanceReport() {
    return `
        <div class="report-header">
            <div>
                <h2 class="report-title">Campaign Performance Report</h2>
                <p class="report-subtitle">Detailed analysis of campaign effectiveness and ROI</p>
            </div>
            <div class="report-actions">
                <button class="btn-report btn-report-secondary" onclick="alumniSystem.printReport()">
                    <i class="fas fa-print"></i> Print
                </button>
                <button class="btn-report btn-report-primary" onclick="alumniSystem.exportReport('campaign-performance')">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>

        <div class="report-summary">
            <h4>Campaign Performance Overview</h4>
            <p>Analysis of all active and completed campaigns, showing performance metrics, donor engagement, and success rates across different campaign types.</p>
            
            <div class="summary-highlights">
                <div class="highlight-item">
                    <div class="highlight-number">12</div>
                    <div class="highlight-label">Active Campaigns</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">8</div>
                    <div class="highlight-label">Completed</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">85%</div>
                    <div class="highlight-label">Success Rate</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">$1.2M</div>
                    <div class="highlight-label">Total Raised</div>
                </div>
            </div>
        </div>

        <div class="charts-container">
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Campaign Types Performance</h3>
                </div>
                <div class="chart-container">
                    <canvas id="campaignTypesChart" width="400" height="200"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Success Rate by Type</h3>
                </div>
                <div class="chart-container">
                    <canvas id="successRateChart" width="400" height="200"></canvas>
                </div>
            </div>
        </div>

        <div class="report-table">
            <div class="report-table-header campaign-table-header">
                <div>Campaign</div>
                <div>Type</div>
                <div>Status</div>
                <div>Progress</div>
                <div>ROI</div>
            </div>
            ${this.generateCampaignTableRows()}
        </div>
    `;
}

generateCampaignTableRows() {
    const campaigns = [
        { name: 'Student Scholarship Fund 2024', type: 'Scholarship', status: 'Active', progress: 75.5, roi: 4.2 },
        { name: 'New Library Construction', type: 'Infrastructure', status: 'Active', progress: 64.0, roi: 3.8 },
        { name: 'Research Innovation Grant', type: 'Research', status: 'Active', progress: 72.0, roi: 5.1 },
        { name: 'Emergency Student Relief', type: 'Emergency', status: 'Completed', progress: 104.0, roi: 6.3 }
    ];

    return campaigns.map(campaign => `
        <div class="report-table-row campaign-table-row">
            <div>
                <strong>${campaign.name}</strong>
            </div>
            <div>${campaign.type}</div>
            <div>
                <span class="status-indicator ${campaign.status.toLowerCase() === 'active' ? 'active' : 'inactive'}"></span>
                ${campaign.status}
            </div>
            <div>
                <div class="progress-bar-report">
                    <div class="progress-fill-report" style="width: ${Math.min(campaign.progress, 100)}%"></div>
                </div>
                ${campaign.progress}%
            </div>
            <div>
                <span class="comparison-indicator up">
                    <span class="comparison-arrow">↑</span>
                    ${campaign.roi}x
                </span>
            </div>
        </div>
    `).join('');
}

generateDonorAnalysisReport() {
    return `
        <div class="report-header">
            <div>
                <h2 class="report-title">Donor Analysis Report</h2>
                <p class="report-subtitle">Comprehensive analysis of donor behavior and demographics</p>
            </div>
            <div class="report-actions">
                <button class="btn-report btn-report-secondary" onclick="alumniSystem.printReport()">
                    <i class="fas fa-print"></i> Print
                </button>
                <button class="btn-report btn-report-primary" onclick="alumniSystem.exportReport('donor-analysis')">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>

        <div class="report-summary">
            <h4>Donor Demographics & Behavior</h4>
            <p>Analysis of donor patterns, retention rates, and giving behavior across different segments and demographics.</p>
            
            <div class="summary-highlights">
                <div class="highlight-item">
                    <div class="highlight-number">1,247</div>
                    <div class="highlight-label">Total Donors</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">89%</div>
                    <div class="highlight-label">Alumni Donors</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">76%</div>
                    <div class="highlight-label">Retention Rate</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">$197</div>
                    <div class="highlight-label">Avg Gift Size</div>
                </div>
            </div>
        </div>

        <div class="charts-container">
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Donor Demographics</h3>
                </div>
                <div class="chart-container">
                    <canvas id="donorDemographicsChart" width="400" height="200"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Giving Frequency</h3>
                </div>
                <div class="chart-container">
                    <canvas id="givingFrequencyChart" width="400" height="200"></canvas>
                </div>
            </div>
            
            <div class="chart-card full-width">
                <div class="chart-header">
                    <h3 class="chart-title">Donor Retention Trends</h3>
                </div>
                <div class="chart-container">
                    <canvas id="donorRetentionChart" width="800" height="300"></canvas>
                </div>
            </div>
        </div>
    `;
}

generateAlumniOverviewReport() {
    return `
        <div class="report-header">
            <div>
                <h2 class="report-title">Alumni Overview Report</h2>
                <p class="report-subtitle">Comprehensive overview of alumni database and engagement</p>
            </div>
            <div class="report-actions">
                <button class="btn-report btn-report-secondary" onclick="alumniSystem.printReport()">
                    <i class="fas fa-print"></i> Print
                </button>
                <button class="btn-report btn-report-primary" onclick="alumniSystem.exportReport('alumni-overview')">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>

        <div class="report-summary">
            <h4>Alumni Database Overview</h4>
            <p>Current status of alumni database including registration rates, profile completeness, and engagement metrics.</p>
            
            <div class="summary-highlights">
                <div class="highlight-item">
                    <div class="highlight-number">15,247</div>
                    <div class="highlight-label">Total Alumni</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">8,934</div>
                    <div class="highlight-label">Registered</div>
                </div>
                                <div class="highlight-item">
                    <div class="highlight-number">73%</div>
                    <div class="highlight-label">Profile Complete</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">45%</div>
                    <div class="highlight-label">Active Users</div>
                </div>
            </div>
        </div>

        <div class="report-stats">
            <div class="report-stat-card positive">
                <div class="stat-number">2,156</div>
                <div class="stat-label">New Registrations</div>
                <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i> +18% this year
                </div>
            </div>
            <div class="report-stat-card positive">
                <div class="stat-number">6,789</div>
                <div class="stat-label">Active Alumni</div>
                <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i> +12% this year
                </div>
            </div>
            <div class="report-stat-card neutral">
                <div class="stat-number">67%</div>
                <div class="stat-label">Email Open Rate</div>
                <div class="stat-change neutral">
                    <i class="fas fa-minus"></i> No change
                </div>
            </div>
            <div class="report-stat-card positive">
                <div class="stat-number">34%</div>
                <div class="stat-label">Event Attendance</div>
                <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i> +8% this year
                </div>
            </div>
        </div>

        <div class="charts-container">
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Alumni by Graduation Year</h3>
                </div>
                <div class="chart-container">
                    <canvas id="graduationYearChart" width="400" height="200"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Geographic Distribution</h3>
                </div>
                <div class="chart-container">
                    <canvas id="geographicChart" width="400" height="200"></canvas>
                </div>
            </div>
        </div>
    `;
}

generateEventAttendanceReport() {
    return `
        <div class="report-header">
            <div>
                <h2 class="report-title">Event Attendance Report</h2>
                <p class="report-subtitle">Analysis of event participation and engagement trends</p>
            </div>
            <div class="report-actions">
                <button class="btn-report btn-report-secondary" onclick="alumniSystem.printReport()">
                    <i class="fas fa-print"></i> Print
                </button>
                <button class="btn-report btn-report-primary" onclick="alumniSystem.exportReport('event-attendance')">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>

        <div class="report-summary">
            <h4>Event Performance Summary</h4>
            <p>Overview of event attendance rates, popular event types, and engagement metrics across all alumni events.</p>
            
            <div class="summary-highlights">
                <div class="highlight-item">
                    <div class="highlight-number">47</div>
                    <div class="highlight-label">Total Events</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">3,456</div>
                    <div class="highlight-label">Total Attendees</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">73</div>
                    <div class="highlight-label">Avg per Event</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">89%</div>
                    <div class="highlight-label">Satisfaction Rate</div>
                </div>
            </div>
        </div>

        <div class="charts-container">
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Event Types Popularity</h3>
                </div>
                <div class="chart-container">
                    <canvas id="eventTypesChart" width="400" height="200"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Monthly Attendance</h3>
                </div>
                <div class="chart-container">
                    <canvas id="monthlyAttendanceChart" width="400" height="200"></canvas>
                </div>
            </div>
        </div>
    `;
}

generateJobPlacementStatsReport() {
    return `
        <div class="report-header">
            <div>
                <h2 class="report-title">Job Placement Statistics</h2>
                <p class="report-subtitle">Analysis of job placement success and career outcomes</p>
            </div>
            <div class="report-actions">
                <button class="btn-report btn-report-secondary" onclick="alumniSystem.printReport()">
                    <i class="fas fa-print"></i> Print
                </button>
                <button class="btn-report btn-report-primary" onclick="alumniSystem.exportReport('job-placement-stats')">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>

        <div class="report-summary">
            <h4>Job Placement Overview</h4>
            <p>Comprehensive analysis of job placement rates, salary trends, and industry distribution for alumni career services.</p>
            
            <div class="summary-highlights">
                <div class="highlight-item">
                    <div class="highlight-number">89%</div>
                    <div class="highlight-label">Placement Rate</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">156</div>
                    <div class="highlight-label">Jobs Posted</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">234</div>
                    <div class="highlight-label">Applications</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">$75K</div>
                    <div class="highlight-label">Avg Salary</div>
                </div>
            </div>
        </div>

        <div class="charts-container">
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Industry Distribution</h3>
                </div>
                <div class="chart-container">
                    <canvas id="industryChart" width="400" height="200"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Salary Trends</h3>
                </div>
                <div class="chart-container">
                    <canvas id="salaryTrendsChart" width="400" height="200"></canvas>
                </div>
            </div>
        </div>
    `;
}

// Additional report generation methods
generateRecurringDonationsReport() {
    return `
        <div class="report-header">
            <div>
                <h2 class="report-title">Recurring Donations Report</h2>
                <p class="report-subtitle">Analysis of subscription-based giving and retention</p>
            </div>
            <div class="report-actions">
                <button class="btn-report btn-report-secondary" onclick="alumniSystem.printReport()">
                    <i class="fas fa-print"></i> Print
                </button>
                <button class="btn-report btn-report-primary" onclick="alumniSystem.exportReport('recurring-donations')">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>

        <div class="report-summary">
            <h4>Recurring Giving Overview</h4>
            <p>Analysis of recurring donation patterns, subscriber retention, and projected annual revenue from subscription-based giving.</p>
            
            <div class="summary-highlights">
                <div class="highlight-item">
                    <div class="highlight-number">234</div>
                    <div class="highlight-label">Active Subscriptions</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">$12,450</div>
                    <div class="highlight-label">Monthly Revenue</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">$149,400</div>
                    <div class="highlight-label">Annual Projected</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">92%</div>
                    <div class="highlight-label">Retention Rate</div>
                </div>
            </div>
        </div>
    `;
}

generateEngagementMetricsReport() {
    return `
        <div class="report-header">
            <div>
                <h2 class="report-title">Engagement Metrics Report</h2>
                <p class="report-subtitle">Alumni engagement across all touchpoints and channels</p>
            </div>
            <div class="report-actions">
                <button class="btn-report btn-report-secondary" onclick="alumniSystem.printReport()">
                    <i class="fas fa-print"></i> Print
                </button>
                <button class="btn-report btn-report-primary" onclick="alumniSystem.exportReport('engagement-metrics')">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>

        <div class="report-summary">
            <h4>Engagement Overview</h4>
            <p>Comprehensive analysis of alumni engagement across events, donations, job board, and digital platforms.</p>
            
            <div class="summary-highlights">
                <div class="highlight-item">
                    <div class="highlight-number">67%</div>
                    <div class="highlight-label">Email Open Rate</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">34%</div>
                    <div class="highlight-label">Event Participation</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">23%</div>
                    <div class="highlight-label">Donation Rate</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">45%</div>
                    <div class="highlight-label">Platform Usage</div>
                </div>
            </div>
        </div>
    `;
}

// Report utility methods
applyReportFilters() {
    const dateRange = document.getElementById('reportDateRange').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // Here you would apply filters and regenerate the current report
    this.showNotification('Report filters applied successfully!', 'info');
    
    // Reload current report with new filters
    const activeReport = document.querySelector('.report-item.active');
    if (activeReport) {
        const reportType = activeReport.onclick.toString().match(/'([^']+)'/)[1];
        this.loadReport(reportType);
    }
}

resetReportFilters() {
    document.getElementById('reportDateRange').value = 'last-30-days';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('customDateRange').style.display = 'none';
    
    this.showNotification('Report filters reset!', 'info');
}

exportReport(reportType) {
    const format = document.getElementById('reportFormat').value;
    this.exportReportAs(format, reportType);
}

exportReportAs(format, reportType = 'current') {
    // Here you would generate and download the report in the specified format
    const formatNames = {
        'pdf': 'PDF',
        'excel': 'Excel',
        'csv': 'CSV'
    };
    
    this.showNotification(`Exporting report as ${formatNames[format]}...`, 'info');
    
    // Simulate export process
    setTimeout(() => {
        this.showNotification(`Report exported successfully as ${formatNames[format]}!`, 'success');
    }, 2000);
}

printReport() {
    // Trigger browser print dialog
    window.print();
}

emailReport() {
    this.openModal('Email Report', `
        <form id="email-report-form">
            <div class="form-group">
                <label for="emailRecipients">Recipients</label>
                <input type="email" id="emailRecipients" placeholder="Enter email addresses (comma separated)" required>
            </div>
            
            <div class="form-group">
                <label for="emailSubject">Subject</label>
                <input type="text" id="emailSubject" value="Alumni Management System - Report" required>
            </div>
            
            <div class="form-group">
                <label for="emailMessage">Message</label>
                <textarea id="emailMessage" rows="4" placeholder="Optional message to include with the report..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="emailFormat">Report Format</label>
                <select id="emailFormat">
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                </select>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Send Report</button>
            </div>
        </form>
    `);

    document.getElementById('email-report-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.sendReportEmail();
    });
}

sendReportEmail() {
    const recipients = document.getElementById('emailRecipients').value;
    const subject = document.getElementById('emailSubject').value;
    const message = document.getElementById('emailMessage').value;
    const format = document.getElementById('emailFormat').value;

    // Here you would send the email with the report attachment
    this.showNotification('Report emailed successfully!', 'success');
    this.closeModal();
}

scheduleReport() {
    this.openModal('Schedule Report', `
        <form id="schedule-report-form">
            <div class="form-group">
                <label for="scheduleReportType">Report Type</label>
                <select id="scheduleReportType" required>
                    <option value="">Select Report Type</option>
                    <option value="donation-summary">Donation Summary</option>
                    <option value="campaign-performance">Campaign Performance</option>
                    <option value="donor-analysis">Donor Analysis</option>
                    <option value="alumni-overview">Alumni Overview</option>
                    <option value="engagement-metrics">Engagement Metrics</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="scheduleFrequency">Frequency</label>
                <select id="scheduleFrequency" required>
                                        <option value="">Select Frequency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="scheduleRecipients">Recipients</label>
                <input type="email" id="scheduleRecipients" placeholder="Enter email addresses (comma separated)" required>
            </div>
            
            <div class="form-group">
                <label for="scheduleFormat">Report Format</label>
                <select id="scheduleFormat" required>
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="scheduleStartDate">Start Date</label>
                <input type="date" id="scheduleStartDate" required>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" id="scheduleActive" checked>
                    Active (report will be sent automatically)
                </label>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Schedule Report</button>
            </div>
        </form>
    `);

    document.getElementById('schedule-report-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitScheduledReport();
    });
}

submitScheduledReport() {
    const reportType = document.getElementById('scheduleReportType').value;
    const frequency = document.getElementById('scheduleFrequency').value;
    const recipients = document.getElementById('scheduleRecipients').value;
    const format = document.getElementById('scheduleFormat').value;
    const startDate = document.getElementById('scheduleStartDate').value;
    const active = document.getElementById('scheduleActive').checked;

    // Here you would save the scheduled report configuration
    this.showNotification('Report scheduled successfully!', 'success');
    this.closeModal();
}

customReport() {
    this.openModal('Create Custom Report', `
        <form id="custom-report-form">
            <div class="form-group">
                <label for="customReportName">Report Name</label>
                <input type="text" id="customReportName" placeholder="Enter report name" required>
            </div>
            
            <div class="form-group">
                <label for="customReportDescription">Description</label>
                <textarea id="customReportDescription" rows="3" placeholder="Describe what this report will show..."></textarea>
            </div>
            
            <div class="form-group">
                <label>Data Sources</label>
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="includeAlumni" checked>
                        <label for="includeAlumni">Alumni Data</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="includeDonations" checked>
                        <label for="includeDonations">Donations</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="includeEvents">
                        <label for="includeEvents">Events</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="includeJobs">
                        <label for="includeJobs">Job Placements</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="includeCampaigns">
                        <label for="includeCampaigns">Campaigns</label>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label>Metrics to Include</label>
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="metricTotals" checked>
                        <label for="metricTotals">Totals & Counts</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="metricAverages" checked>
                        <label for="metricAverages">Averages</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="metricTrends">
                        <label for="metricTrends">Trends & Growth</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="metricComparisons">
                        <label for="metricComparisons">Period Comparisons</label>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="customDateRange">Default Date Range</label>
                <select id="customDateRange">
                    <option value="last-30-days">Last 30 Days</option>
                    <option value="last-3-months">Last 3 Months</option>
                    <option value="last-6-months">Last 6 Months</option>
                    <option value="last-year">Last Year</option>
                    <option value="all-time">All Time</option>
                </select>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="alumniSystem.closeModal()" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">Create Custom Report</button>
            </div>
        </form>
    `);

    document.getElementById('custom-report-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitCustomReport();
    });
}

submitCustomReport() {
    const reportName = document.getElementById('customReportName').value;
    const description = document.getElementById('customReportDescription').value;
    
    const dataSources = {
        alumni: document.getElementById('includeAlumni').checked,
        donations: document.getElementById('includeDonations').checked,
        events: document.getElementById('includeEvents').checked,
        jobs: document.getElementById('includeJobs').checked,
        campaigns: document.getElementById('includeCampaigns').checked
    };
    
    const metrics = {
        totals: document.getElementById('metricTotals').checked,
        averages: document.getElementById('metricAverages').checked,
        trends: document.getElementById('metricTrends').checked,
        comparisons: document.getElementById('metricComparisons').checked
    };
    
    const dateRange = document.getElementById('customDateRange').value;

    // Here you would save the custom report configuration and generate it
    this.showNotification('Custom report created successfully!', 'success');
    this.closeModal();
    
    // Add the new custom report to the sidebar
    this.addCustomReportToSidebar(reportName);
}

addCustomReportToSidebar(reportName) {
    // Find the first report category and add the custom report
    const firstCategory = document.querySelector('.report-category .report-list');
    if (firstCategory) {
        const customReportItem = document.createElement('li');
        customReportItem.className = 'report-item';
        customReportItem.onclick = () => this.loadCustomReport(reportName);
        customReportItem.innerHTML = `
            <div class="report-item-info">
                <span>${reportName}</span>
            </div>
            <span class="report-item-badge">Custom</span>
        `;
        firstCategory.appendChild(customReportItem);
    }
}

loadCustomReport(reportName) {
    // Remove active class from all report items
    document.querySelectorAll('.report-item').forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    event.target.closest('.report-item').classList.add('active');
    
    // Generate custom report content
    document.getElementById('reportContent').innerHTML = `
        <div class="report-header">
            <div>
                <h2 class="report-title">${reportName}</h2>
                <p class="report-subtitle">Custom report generated based on your specifications</p>
            </div>
            <div class="report-actions">
                <button class="btn-report btn-report-secondary" onclick="alumniSystem.editCustomReport('${reportName}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-report btn-report-secondary" onclick="alumniSystem.printReport()">
                    <i class="fas fa-print"></i> Print
                </button>
                <button class="btn-report btn-report-primary" onclick="alumniSystem.exportReport('custom')">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>

        <div class="report-summary">
            <h4>Custom Report Results</h4>
            <p>This custom report combines data from multiple sources based on your selected criteria and metrics.</p>
            
            <div class="summary-highlights">
                <div class="highlight-item">
                    <div class="highlight-number">1,247</div>
                    <div class="highlight-label">Total Records</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">5</div>
                    <div class="highlight-label">Data Sources</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">12</div>
                    <div class="highlight-label">Metrics</div>
                </div>
                <div class="highlight-item">
                    <div class="highlight-number">100%</div>
                    <div class="highlight-label">Data Quality</div>
                </div>
            </div>
        </div>

        <div class="charts-container">
            <div class="chart-card full-width">
                <div class="chart-header">
                    <h3 class="chart-title">Custom Data Visualization</h3>
                </div>
                <div class="chart-container">
                    <canvas id="customChart" width="800" height="300"></canvas>
                </div>
            </div>
        </div>
    `;
}

editCustomReport(reportName) {
    // Open the custom report form with existing data pre-filled
    this.customReport();
    // Pre-fill form with existing report data
    document.getElementById('customReportName').value = reportName;
}

// Dashboard overview method
generateReportsDashboard() {
    return `
        <div class="report-header">
            <div>
                <h2 class="report-title">Reports Dashboard</h2>
                <p class="report-subtitle">Overview of all available reports and recent activity</p>
            </div>
        </div>

        <div class="report-stats">
            <div class="report-stat-card positive">
                <div class="stat-number">24</div>
                <div class="stat-label">Available Reports</div>
                <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i> +3 new this month
                </div>
            </div>
            <div class="report-stat-card positive">
                <div class="stat-number">156</div>
                <div class="stat-label">Reports Generated</div>
                <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i> +23% this month
                </div>
            </div>
            <div class="report-stat-card neutral">
                <div class="stat-number">8</div>
                <div class="stat-label">Scheduled Reports</div>
                <div class="stat-change neutral">
                    <i class="fas fa-minus"></i> No change
                </div>
            </div>
            <div class="report-stat-card positive">
                <div class="stat-number">12</div>
                <div class="stat-label">Custom Reports</div>
                <div class="stat-change positive">
                    <i class="fas fa-arrow-up"></i> +2 this month
                </div>
            </div>
        </div>

        <div class="charts-container">
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Most Popular Reports</h3>
                </div>
                <div class="chart-container">
                    <canvas id="popularReportsChart" width="400" height="200"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">Report Generation Trends</h3>
                </div>
                <div class="chart-container">
                    <canvas id="reportTrendsChart" width="400" height="200"></canvas>
                </div>
            </div>
        </div>

        <div class="report-summary">
            <h4>Quick Actions</h4>
            <div class="summary-highlights">
                <div class="highlight-item" onclick="alumniSystem.loadReport('donation-summary')" style="cursor: pointer;">
                    <div class="highlight-number"><i class="fas fa-hand-holding-usd"></i></div>
                    <div class="highlight-label">Donation Report</div>
                </div>
                <div class="highlight-item" onclick="alumniSystem.loadReport('alumni-overview')" style="cursor: pointer;">
                    <div class="highlight-number"><i class="fas fa-users"></i></div>
                    <div class="highlight-label">Alumni Report</div>
                </div>
                <div class="highlight-item" onclick="alumniSystem.customReport()" style="cursor: pointer;">
                    <div class="highlight-number"><i class="fas fa-plus"></i></div>
                    <div class="highlight-label">Custom Report</div>
                </div>
                <div class="highlight-item" onclick="alumniSystem.scheduleReport()" style="cursor: pointer;">
                    <div class="highlight-number"><i class="fas fa-clock"></i></div>
                    <div class="highlight-label">Schedule Report</div>
                </div>
            </div>
        </div>
    `;
}

initializeCharts() {
    // Monthly Donations Chart
    const monthlyDonationsCtx = document.getElementById('monthlyDonationsChart');
    if (monthlyDonationsCtx) {
        new Chart(monthlyDonationsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Monthly Donations',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: 'rgb(74, 108, 247)',
                    backgroundColor: 'rgba(74, 108, 247, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Donation Sources Chart
    const donationSourcesCtx = document.getElementById('donationSourcesChart');
    if (donationSourcesCtx) {
        new Chart(donationSourcesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Online', 'Events', 'Direct Mail', 'Phone', 'Other'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        '#4a6cf7',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Campaign Performance Chart
    const campaignPerformanceCtx = document.getElementById('campaignPerformanceChart');
    if (campaignPerformanceCtx) {
        new Chart(campaignPerformanceCtx, {
            type: 'bar',
            data: {
                labels: ['Scholarship Fund', 'Library Construction', 'Research Grant', 'Emergency Relief'],
                datasets: [{
                    label: 'Goal',
                    data: [100000, 500000, 250000, 50000],
                    backgroundColor: 'rgba(74, 108, 247, 0.3)',
                    borderColor: 'rgb(74, 108, 247)',
                    borderWidth: 1
                }, {
                    label: 'Raised',
                    data: [75500, 320000, 180000, 52000],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderColor: 'rgb(16, 185, 129)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000) + 'K';
                            }
                        }
                    }
                }
            }
        });
    }

    // Add more charts as needed...
}


// Utility method to show notifications (if not already defined)
showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
        document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}



    viewProfile(alumniId) {
        // This function would typically fetch the alumni profile from the server
        // For now, we will simulate it with a static example
        const alumniProfile = {
            id: alumniId,
            name: 'John Smith',
            graduationYear: 2020,
            degree: 'Computer Science',
            currentPosition: 'Software Engineer',
            currentCompany: 'Tech Corp',
            location: 'San Francisco, CA',
            bio: 'Passionate software engineer with 5 years of experience in web development.',
            linkedinUrl: 'https://linkedin.com/in/johnsmith',
            email: 'john.smith@example.com',
            phone: '123-456-7890'
        };

        this.openModal('Alumni Profile', `
            <div class="profile-details">
                <h2>${alumniProfile.name}</h2>
                <p><strong>Graduation Year:</strong> ${alumniProfile.graduationYear}</p>
                <p><strong>Degree:</strong> ${alumniProfile.degree}</p>
                <p><strong>Current Position:</strong> ${alumniProfile.currentPosition} at ${alumniProfile.currentCompany}</p>
                <p><strong>Location:</strong> ${alumniProfile.location}</p>
                <p><strong>Bio:</strong> ${alumniProfile.bio}</p>
                <p><strong>LinkedIn:</strong> <a href="${alumniProfile.linkedinUrl}" target="_blank">${alumniProfile.linkedinUrl}</a></p>
                <p><strong>Email:</strong> ${alumniProfile.email}</p>
                <p><strong>Phone:</strong> ${alumniProfile.phone}</p>
            </div>
        `);
    }

    openModal(title, content) {
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = content;
        document.querySelector('.modal-content h2').innerText = title;
        modal.style.display = 'block';
    }

    closeModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    }

    logout() {
        // Handle logout logic (e.g., clear tokens, redirect to login)
        alert('Logged out successfully!');
        // Redirect to login page or perform other logout actions
    }
}

// Initialize the Alumni Management System
const alumniSystem = new AlumniManagementSystem();
