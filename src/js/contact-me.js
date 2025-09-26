import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import dotenv from 'dotenv';

const userSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  emailForm: Yup.string().email('Invalid email').required('Email is required'),
  url: Yup.string().url('Must be a valid url address').nullable(),
  textForm: Yup.string().nullable(),
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) {
    emailjs.init(process.env.PUBLIC_KEY); // 1 key to env

    form.addEventListener('submit', e => {
      e.preventDefault();

      const data = {
        name: form.querySelector('input[name="nameForm"]').value,
        emailForm: form.querySelector('input[name="emailForm"]').value,
        url: form.querySelector('input[name="url"]').value,
        textForm: form.querySelector('textarea[name="textForm"]').value,
      };

      emailjs
        .send(process.env.SERVICE_ID_DATA, process.env.TEMPLATE_ID_DATA, data) // 2 keys to env
        .then(response => {
          alert('Message sent successfully!');
          form.reset();
        })
        .catch(error => {
          alert('Failed to send: ' + error.text);
        });
    });
  }
});
