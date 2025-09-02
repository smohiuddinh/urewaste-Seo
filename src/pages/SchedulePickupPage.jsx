import { useState, useCallback, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { client } from "../../sanityClient";
import logo from "../assets/truck4.png";
import bgk from "../assets/footer-bg-1.png";
import emailjs from "@emailjs/browser";
import Seo from "../components/Seo";

// InputField Component
function InputField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={id}
        aria-required={required}
        aria-describedby={`${id}-help`}
        className="mt-1 w-full px-4 text-black py-2 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
          focus-visible:ring-2 focus-visible:ring-green-600 sm:text-sm"
      />
    </div>
  );
}

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

export default function SchedulePickupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    equipment: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSuccess(null);
  setError(null);

  const doc = {
    _type: "pickupRequest",
    ...formData,
    submittedAt: new Date().toISOString(),
  };

  // EmailJS parameters
  const templateParams = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    date: formData.date,
    time: formData.time,
    equipment: formData.equipment,
  };

  try {
    // 1️⃣ Submit to Sanity
    await client.create(doc);

    // 2️⃣ Send email using EmailJS
    await emailjs.send(
      'service_v7gwnyj',      // 🔁 replace with your real service ID
      "template_rz24bar", // 🆕 pickup-specific template ID
      templateParams,
      "gNU_6hhSdHIb4-Bs2"       // 📬 public key from EmailJS
    );

    setSuccess("✅ Pickup request submitted & email sent!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      date: "",
      time: "",
      equipment: "",
    });
  } catch (err) {
    console.error(err);
    setError("❌ Failed to submit. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (

    <>
    
          <Seo
        title="Schedule Pickup | UR E-WASTE"
        description="Easily schedule your e-waste pickup with UR E-WASTE. Secure, eco-friendly, and hassle-free service for your home or office."
        canonical="https://www.urewaste.com/SchedulePickupPage"
      />
    <div className="flex  flex-col min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100">
      <div className="relative bg-green-100 overflow-hidden min-h-[600px]">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={bgk}
            alt="E-Waste Truck"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-500 opacity-90 mix-blend-multiply" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-white flex flex-col md:flex-row items-center justify-between min-h-[600px]">
          {/* Left Section */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center gap-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Heading & Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Easy, Fast, and Eco-Friendly
              </h1>
              <p className="mt-4 text-lg sm:text-xl max-w-md text-white/90">
                Join us in our mission to reduce e-waste. Schedule your pickup
                today and make a difference for tomorrow.
              </p>
              <Link
                to="/about"
                className="mt-6 inline-block bg-white text-green-700 hover:bg-green-200 font-semibold px-6 py-3 rounded-lg shadow transition duration-300"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Animated Truck Image */}
            <motion.img
              src={logo}
              alt="E-Waste Truck"
              className="left-0 w-40 sm:w-52 md:w-64 lg:w-full drop-shadow-lg"
              animate={{
                x: ["-100%", "50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Right Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full md:w-[480px] bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-200 mt-10 md:mt-0
              hover:shadow-3xl hover:scale-[1.02] transition-transform duration-300"
          >
            {/* Form Header */}
            <div className="text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-extrabold text-gray-900"
              >
                Schedule Your E-Waste Pickup
              </motion.h2>
              <p className="mt-4 text-lg text-gray-600">
                Fill out the form below to arrange a convenient doorstep pickup.
              </p>
            </div>

            {/* Form */}
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Input Fields */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {[
                  { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                  { id: "email", label: "Email", type: "email", placeholder: "john@example.com" },
                  { id: "phone", label: "Phone Number", type: "tel", placeholder: "(123) 456-7890" },
                  { id: "address", label: "Pickup Address", type: "text", placeholder: "123 Main St" },
                  { id: "date", label: "Preferred Pickup Date", type: "date" },
                  { id: "time", label: "Preferred Pickup Time", type: "time" },
                ].map(({ id, label, type, placeholder }, i) => (
                  <motion.div key={id} custom={i} variants={itemVariants}>
                    <InputField
                      id={id}
                      label={label}
                      type={type}
                      placeholder={placeholder}
                      value={formData[id]}
                      onChange={handleChange}
                      className='text-black'
                      required
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Equipment Textarea */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
              >
                <label htmlFor="equipment" className="block text-sm font-medium text-gray-700">
                  Equipment Details
                </label>
                <textarea
                  id="equipment"
                  name="equipment"
                  required
                  value={formData.equipment}
                  onChange={handleChange}
                  placeholder="e.g., 2 laptops, 1 desktop, 3 monitors"
                  aria-required="true"
                  className="mt-1 min-h-[100px] text-black w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                    focus-visible:ring-2 focus-visible:ring-green-600 sm:text-sm"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl shadow-md text-white
                    bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800
                    focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Pickup Request
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Success/Error Messages */}
              {success && (
                <motion.p className="text-green-600 text-center font-semibold mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {success}
                </motion.p>
              )}
              {error && (
                <motion.p className="text-red-600 text-center font-semibold mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {error}
                </motion.p>
              )}

              {/* Disclaimer */}
              <p className="text-center text-sm text-gray-500 mt-4">
                A nominal fee is charged only for the pickup service — no hidden costs.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>

    </>

  );
}
