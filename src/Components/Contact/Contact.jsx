import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Contact.css';
import Logo from '../../Assets/Images/Logo.png';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(15, 'Name must not be more than 15 characters'),
  email: Yup.string()
    .email('Invalid email format, please add another one!')
    .required('Email is required'),
  message: Yup.string()
    .required('Message is required')
    .min(20, 'Message must be at least 20 characters'),
});

const Contact = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="contact-container">
      <div className="home-header"></div>

      <section className="contact-section">
        <h2>Get In Touch With Us</h2>
        <p>
          For more information about our products & services, please feel free to drop us an email. Our staff is always here to help you out. Do not hesitate!
        </p>

        <div id="whole-sec">
          <div className="contact-info">
            <div className="contact-info-wrapper">
              <div className="icon-layer">
                <i className="fa-solid fa-location-dot contact-info-wrapper-icon"></i>
              </div>
              <div className="info-item">
                <h3>Address</h3>
                <p>236 5th SE Avenue, New York,<br /> NYK10000, United States</p>
              </div>
            </div>

            <div className="contact-info-wrapper">
              <div className="icon-layer">
                <i className="fa-solid fa-phone contact-info-wrapper-icon"></i>
              </div>
              <div className="info-item">
                <h3>Phone</h3>
                <p>Mobile: (+84) 546-6789<br />Hotline: (+84) 456-6789</p>
              </div>
            </div>

            <div className="contact-info-wrapper">
              <div className="icon-layer">
                <i className="fa-regular fa-clock contact-info-wrapper-icon"></i>
              </div>
              <div className="info-item">
                <h3>Working Time</h3>
                <p>Monday - Friday: 9:00 - 22:00<br />Saturday - Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          <Formik
            initialValues={{ name: '', email: '', subject: '', message: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              setLoading(true);
              setTimeout(() => {
                console.log('Form Submitted', values);
                alert('Form Submitted Successfully!');
                setLoading(false);
                resetForm();
              }, 2000);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Please, enter your name!"
                    className="input"
                  />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Abc@gmail.com"
                    className="input"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <Field
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="This is optional"
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Hi! I'd like to ask about ....."
                    className="input"
                  />
                  <ErrorMessage name="message" component="div" className="error-message" />
                </div>

                <button
                  className="button-contact"
                  type="submit"
                  disabled={isSubmitting || loading}
                >
                  {loading ? (
                    <i className="fas fa-spin fa-spinner"></i>
                  ) : (
                    'Submit'
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  );
};

export default Contact;
