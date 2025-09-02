"use client";
import React, { useEffect, useState } from "react";
import logo1 from "../assets/croplogo.png";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { client } from "../../sanityClient";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      const data = await client.fetch(`*[_type == "footer"][0]`);
      setFooterData(data);
    };
    fetchFooter();
  }, []);

  if (!footerData) return null;

  return (
    <footer className="bg-[#0a2b24] text-white pt-16 pb-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img src={logo1} />
          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            {footerData.aboutText}
          </p>
          <div className="flex gap-4 mt-4 text-xl text-gray-400">
            {footerData.socialLinks?.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2 }}
              >
                {link.platform === "Facebook" && <FaFacebookF />}
                {link.platform === "Twitter" && <FaTwitter />}
                {link.platform === "Instagram" && <FaInstagram />}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          custom={1}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="ml-14"
        >
          <h3 className="text-lg font-semibold mb-4 text-emerald-400">
            Quick Links
          </h3>
          <ul className="space-y-2  text-gray-400 text-sm">
            {footerData.quickLinks?.map((link, i) => (
              <li key={i} className="hover:text-white transition">
                {link}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Topics */}
        <motion.div
          custom={2}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-emerald-400">
            Topics We Cover
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            {footerData.topics?.map((topic, i) => (
              <li key={i} className="hover:text-white transition">
                {topic}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          custom={3}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-emerald-400">
            Contact Us
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 text-emerald-400" />
              {footerData.contactInfo?.address}
            </li>
            <li className="flex gap-2">
              <FaPhone className="text-emerald-400" />
              <div>{footerData.contactInfo?.phone}</div>
            </li>
            <li className="flex gap-2">
              <FaEnvelope className="text-emerald-400" />
              <div className="space-y-1">
                {footerData.contactInfo?.emails?.map((email, i) => (
                  <div key={i}>{email}</div>
                ))}
              </div>
            </li>
            <li className="flex gap-2">
              <FaClock className="text-emerald-400" />
              {footerData.contactInfo?.hours}
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 border-t border-white/10 pt-6 px-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 container mx-auto"
      >
        <p className="text-sm text-white/50 mt-4">
          © 2025 Developed By{" "}
          <a
            href="https://www.infinitelydigital.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600  hover:underline"
          >
            Infinitely Digital
          </a>{" "}
          . All rights reserved.
        </p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          {footerData.bottomLinks?.map((link, i) => (
            <a key={i} href={link.url} className="hover:text-white transition">
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
