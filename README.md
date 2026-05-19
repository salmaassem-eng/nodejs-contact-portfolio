# Minimal Portfolio Node.js

A minimal portfolio website built with pure Node.js using the built-in `http` module (without Express). The project includes a home page, contact form, form validation, data storage in JSON, a custom 404 page, and a thank-you page.

---

## Features

- Built with pure Node.js (`http` module only)
- Custom routing using `GET` and `POST`
- Static file serving (CSS and images)
- Contact form handling
- Form validation
- Redirect to a custom 404 page if any field is empty
- Save submitted messages to `messages.json`
- Redirect to a Thank You page after successful submission
- Custom 404 page for invalid routes

---

Form Validation

The contact form requires the following fields:

Name
Email
Message

If any field is left empty, the user is redirected to the custom 404 page.

---

Future Improvements
Better email validation
Responsive design enhancements
Admin dashboard to view submitted messages
Deployment to a hosting platform

---

License

This project is for educational purposes.
