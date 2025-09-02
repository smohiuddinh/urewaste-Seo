"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-hot-toast"
import { Loader2, Send } from "lucide-react"
import { client } from '../../../sanityClient';
import emailjs from '@emailjs/browser';

export default function ContactForm({LeftHeading,
  IntroText,
  LeftCardTitle,
  LeftCardSubtitle,
  LeftCardItems,
  Inputlabels,
  Inputplaceholders,
  successMessage,
  errorMessage,
  submitButtonText,
  submittingText,}) 

{
  const schema = yup.object().shape({
    name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
    subject: yup.string().min(5, "Subject must be at least 5 characters").required("Subject is required"),
    message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  })

const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    await client.create({
      _type: 'contactMessage',
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      createdAt: new Date().toISOString(),
    });

    await emailjs.send(
      'service_rrsn8te',
      'template_8f8a1ja',
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_email: 'smohiuddinh@gmail.com'  
      },
      'gNU_6hhSdHIb4-Bs2'
    );

    toast.success(successMessage);
    reset();
  } catch (error) {
    toast.error(errorMessage);
    console.error('Error:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="bg-white/80 shadow-2xl rounded-lg backdrop-blur-md p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left Section */}
        <div className="lg:col-span-2 flex flex-col justify-center gap-10">
          <div>
            <h2 className="text-3xl font-bold text-black mb-4">{LeftHeading}</h2>
            <p className="text-black">{IntroText}</p>
          </div>

          <div className="relative group transition-all duration-300 ease-in-out">
            {/* Background Blur Effects */}
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-green-400/10 rounded-full blur-2xl" />
            <div className="absolute -right-10 bottom-0 w-40 h-40 bg-gray-600/10 rounded-full blur-2xl" />

            {/* Help Box */}
            <div className="relative z-10 p-8 rounded-2xl border border-gray-200 bg-white/80 shadow-xl backdrop-blur-md hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="bg-green-100 text-green-700 p-4 rounded-full">
                  <Send className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black">{LeftCardTitle}</h3>
                  <p className="text-sm text-black">{LeftCardSubtitle}</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-black">
                {LeftCardItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✔️</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium text-black">{Inputlabels.name}</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder={Inputplaceholders.name}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
                    />
                  )}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium text-black">{Inputlabels.email}</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      {...field}
                      placeholder={Inputplaceholders.email}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
                    />
                  )}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-1 font-medium text-black">{Inputlabels.subject}</label>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder={Inputplaceholders.subject}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
                  />
                )}
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 font-medium text-black">{Inputlabels.message}</label>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder={Inputplaceholders.message}
                    className="w-full p-3 border border-gray-300 rounded min-h-[150px] focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
                  />
                )}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-6 rounded shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {submittingText}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {submitButtonText}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
