'use client';  // Add this at the top since we're using client-side features

import Image from "next/image"
import { motion } from "framer-motion"

export default function Page() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="about_page_container w-full bg-bgColor min-h-screen"
        >
            <div className="about_page_inner_container w-[90%] max-sm:w-[95%] 2xl:w-[80%] mx-auto pt-24 max-lg:pt-20 max-md:pt-16 max-sm:pt-12">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h1 className="font-[700] text-8xl max-xl:text-7xl max-lg:text-6xl max-md:text-5xl max-sm:text-4xl bg-gradient-to-r from-bgRed to-rose-500 bg-clip-text text-transparent">
                        Unlock Your Dream
                    </h1>
                    <h1 className="font-[700] text-8xl max-xl:text-7xl max-lg:text-6xl max-md:text-5xl max-sm:text-4xl mt-2">
                        Home <span className="text-bgRed">Today!</span>
                    </h1>
                    
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-auto px-12 h-[4rem] max-lg:h-[3.2rem] rounded-[63px] uppercase bg-gradient-to-r from-bgRed to-rose-500 text-white text-lg max-lg:text-base max-sm:text-sm leading-normal mt-10 max-lg:mt-8 font-semibold tracking-[0.2em] shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <a href={process.env.NEXT_PUBLIC_TELEPHONE_NO}>Call Now</a>
                    </motion.button>
                </motion.div>

                <div className="about_us_info w-full mx-auto min-h-[90vh] bg-cover bg-fixed max-lg:min-h-[auto] text-white grid grid-cols-2 p-16 max-xl:p-12 max-lg:grid-cols-1 gap-12 max-lg:gap-16 max-md:p-8 max-sm:p-6 rounded-3xl" 
                    style={{ 
                        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/about_us_img_1.png')",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                    }}>
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col justify-end items-start max-lg:pt-32 max-2xl:pt-36 2xl:pt-40 gap-12"
                    >
                        <h3 className="font-[600] text-7xl max-xl:text-6xl max-lg:text-5xl max-sm:text-4xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            About Us
                        </h3>
                        <div className="about_us_grid_container w-full h-full grid grid-cols-2 items-end max-lg:grid-cols-1 mt-8 gap-8">
                            {
                                [
                                    {
                                        title: "Experienced Agents",
                                        description: "Our highly skilled agents bring years of expertise in real estate, ensuring successful transactions and satisfied clients.",
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8">
                                                <path d="M15.5 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm4 8.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm-12 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        title: "Wide Range of Properties",
                                        description: "Discover an extensive collection of residential and commercial properties, from luxurious homes to affordable apartments for every budget.",
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8">
                                                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        title: "Customer Satisfaction",
                                        description: "We go above and beyond to ensure our clients receive exceptional service and find their perfect property match.",
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        title: "Affordable Prices",
                                        description: "Find your dream property within your budget through our competitive pricing and flexible payment options.",
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8">
                                                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                                            </svg>
                                        )
                                    }
                                ].map((currElem, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 + (index * 0.1) }}
                                        className="flex flex-col gap-3 p-6 bg-black/30 rounded-2xl backdrop-blur-sm hover:bg-black/40 transition-all duration-300"
                                    >
                                        <div className="bg-gradient-to-r from-bgRed to-rose-500 w-[50px] h-[50px] max-lg:w-[40px] max-lg:h-[40px] rounded-xl flex items-center justify-center shadow-lg">
                                            {currElem.icon}
                                        </div>
                                        <h3 className="text-2xl max-2xl:text-xl max-lg:text-2xl max-md:text-xl max-sm:text-lg font-[600]">
                                            {currElem?.title}
                                        </h3>
                                        <p className="text-base max-lg:text-sm leading-relaxed font-[400] text-gray-300">
                                            {currElem?.description}
                                        </p>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="w-full h-full flex items-center justify-center lg:items-end"
                    >
                        <div className="w-full h-auto max-lg:h-[300px] max-2xl:h-[500px] 2xl:h-[600px] relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                width={1000} 
                                height={1000}
                                src={"/images/about_us_img_2.png"} 
                                alt="About Us" 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                priority
                                style={{
                                    objectPosition: 'center bottom'
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}