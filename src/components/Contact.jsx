import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Send } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animation";

const Contact = () => {
  const contactInfo = [
    { icon: <Mail />, label: "Email", value: "ferrelrashadakeyla2014@gmail.com", href: "mailto:ferrelrashadakeyla2014@gmail.com" },
    { icon: <Linkedin />, label: "LinkedIn", value: "linkedin.com/in/ferrel-rashad-8a165514b", href: "https://www.linkedin.com/in/ferrel-rashad-8a165514b/" },
    { icon: <Github />, label: "GitHub", value: "github.com/FerrelHD", href: "https://github.com/FerrelHD" },
    { icon: <MapPin />, label: "Location", value: "Depok, Jawa Barat", href: "#" },
  ];

  return (
    <motion.section 
      id="contact" 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 md:py-24 bg-dark text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-12 xl:gap-20 items-start">
          <div className="z-10 w-full min-w-0">
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black mb-6 sm:mb-8 leading-tight tracking-tight uppercase break-words">
              Let's build <br className="hidden sm:inline" /> <span className="text-primary italic">something</span> <br className="hidden sm:inline" /> together
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-md">
              Have a project in mind? Or just want to say hi? Feel free to reach out. I'm always open to new opportunities.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  variants={fadeUp}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="text-primary mb-2 sm:mb-3 group-hover:scale-110 transition-transform scale-90 origin-left">{info.icon}</div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{info.label}</p>
                  <p className="font-bold text-xs sm:text-sm truncate">{info.value}</p>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            variants={fadeUp}
            className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-12 text-dark"
          >
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-dark/40">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-off-white border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-dark/40">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-off-white border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-dark/40">Message</label>
                <textarea 
                  rows="4"
                  placeholder="Tell me about your project..."
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-off-white border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold text-sm sm:text-base resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-dark text-white py-4 sm:py-5 rounded-xl font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-3 group text-sm sm:text-base">
                Send Message
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
