# Sarvnoor Kaur - Portfolio Website

A modern, responsive portfolio website with functional contact form using Web3Forms.

## 🚀 Features

- **Responsive Design** - Works on all devices
- **Modern UI/UX** - Clean, professional design
- **Functional Contact Form** - Receive emails directly via Web3Forms
- **Project Showcase** - Display your work with live demos
- **Skills & Achievements** - Comprehensive overview of capabilities
- **No Backend Required** - Static site with working contact form

## 📧 Contact Form Setup (Web3Forms)

### What is Web3Forms?
Web3Forms is a free contact form backend service that sends form submissions directly to your email without requiring a backend server.

### Setup Instructions

#### 1. Your Access Key
Your Web3Forms access key is already configured:
```
059b06e8-9214-4068-82ff-575e9a9ce859
```

#### 2. How It Works
- Visitors fill out the contact form
- Form data is sent to Web3Forms API
- You receive an email notification instantly
- No server or backend code needed!

#### 3. Email Configuration
To configure where you receive emails:
1. Go to [Web3Forms Dashboard](https://web3forms.com/)
2. Login with your access key
3. Set your email address
4. Customize email templates (optional)

#### 4. Test the Form
- Open `index.html` in a browser
- Fill out the contact form
- Submit and check your email
- You should receive the message within seconds

## 📁 Project Structure

```
portfolio/
├── index.html          # Main portfolio page
├── projects.html       # Projects showcase page
├── styles.css          # All styling
├── script.js           # Frontend JavaScript with Web3Forms integration
├── projects.js         # Projects page JavaScript
├── README.md          # This file
└── assets/            # Images and certificates
    ├── javagui.png
    ├── cloudcomputing.png
    ├── hackathon.png
    └── profile.jpeg
```

## 🛠️ Technologies Used

### Frontend
- HTML5, CSS3, JavaScript
- Font Awesome Icons
- Google Fonts
- AOS (Animate On Scroll)
- Typed.js (Typing animation)
- Responsive Grid Layout

### Contact Form
- Web3Forms API
- Fetch API for form submission
- Real-time validation
- Beautiful toast notifications

## 📱 Contact Form Features

- **Real-time validation** - Checks email format and required fields
- **Loading states** - Shows spinner while sending
- **Success/Error notifications** - Beautiful toast notifications
- **No backend required** - Works on static hosting
- **Spam protection** - Built-in by Web3Forms
- **Email notifications** - Instant delivery to your inbox
- **Custom subject lines** - Organized email notifications

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect Vercel to your repository
3. Deploy automatically
4. No environment variables needed!

### Option 2: Netlify
1. Drag and drop your folder
2. Or connect GitHub repository
3. Deploy instantly

### Option 3: GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Your site is live!

### Option 4: Any Static Hosting
- Cloudflare Pages
- Firebase Hosting
- Surge.sh
- Render

## 🔧 Customization

### Changing Web3Forms Access Key
If you want to use a different access key:
1. Get a new key from [Web3Forms](https://web3forms.com/)
2. Update in `index.html`:
```html
<input type="hidden" name="access_key" value="YOUR_NEW_KEY">
```

### Adding Project Screenshots
Replace placeholder divs in `projects.html`:
```html
<!-- Replace this: -->
<div class="project-placeholder">...</div>

<!-- With this: -->
<img src="project-screenshot.jpg" alt="Project Screenshot" class="project-screenshot">
```

### Updating Contact Information
- Update social media links in HTML files
- Modify personal information in About section
- Change email display in Contact section

### Styling Changes
- All styles are in `styles.css`
- CSS variables are defined at the top for easy theming
- Responsive breakpoints are included

## 📧 Web3Forms Features

### What You Get:
- ✅ Unlimited form submissions
- ✅ Email notifications
- ✅ Spam filtering
- ✅ File uploads support
- ✅ Custom redirects
- ✅ Webhook support
- ✅ No backend required

### Email Format:
You'll receive emails with:
- Sender's name
- Sender's email
- Message content
- Timestamp
- Form source

## 🔒 Security & Privacy

- Web3Forms handles all data securely
- GDPR compliant
- No data stored permanently
- Spam protection included
- reCAPTCHA support available

## 📞 Troubleshooting

### Form Not Working?
1. Check browser console for errors
2. Verify access key is correct
3. Test with a simple message
4. Check spam folder for emails

### Not Receiving Emails?
1. Verify email in Web3Forms dashboard
2. Check spam/junk folder
3. Whitelist noreply@web3forms.com
4. Test with different email address

## 🎯 Next Steps

1. ✅ Contact form is ready to use!
2. Add your actual project screenshots
3. Update personal information and links
4. Test the contact form thoroughly
5. Deploy to your preferred hosting platform
6. Set up custom domain (optional)

## 📚 Additional Resources

- [Web3Forms Documentation](https://docs.web3forms.com/)
- [Web3Forms Dashboard](https://web3forms.com/)
- [API Reference](https://docs.web3forms.com/getting-started/api-reference)

---

**Created by Sarvnoor Kaur** | [GitHub](https://github.com/sarnoor-kaur) | [LinkedIn](https://linkedin.com/in/sarvnoor-kaur-1aa4ab283)