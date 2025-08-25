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
