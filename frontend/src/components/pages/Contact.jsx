import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import axios from 'axios';
import { toast} from 'react-hot-toast'; // Import hot-toast

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/email/send', formData);
      setResponseMessage(response.data.message);
      
      // Display success toast
      toast.success('Email sent successfully!');

      // Clear input fields
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setResponseMessage('Failed to send message. Please try again.');
      // Display error toast
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
   

      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg mb-10 text-center">
        Contact us if you want more information about our school <br />
      </p>

      {/* Contact Information */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Our Contact Information</h2>
        <p className="flex items-center justify-center mb-2">
          <FaPhone className="mr-2 rotate-90 text-blue-500" /> 
          <strong>Phone:</strong> +252 61 1234567
        </p>
        <p className="flex items-center justify-center mb-2">
          < FaEnvelope className="mr-2 text-blue-500" /> 
          <strong>Email:</strong> info@school.com
        </p>
        <p className="flex items-center justify-center">
          <FaMapMarkerAlt className="mr-2 text-blue-600" /> 
          <strong>Address:</strong> 123 School St, Mogadishu, Somalia
        </p>
      </div>

      {/* Contact Form */}
      <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Your Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Message Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Your Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your message"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Send Message
        </button>

        {/* Response Message */}
        {responseMessage && <p className="mt-4 text-center text-lg">{responseMessage}</p>}
      </form>
    </div>
  );
};

export default Contact