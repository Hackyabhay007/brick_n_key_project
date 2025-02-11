"use client"

import ContactForm from '@/app/components/ContactForm';
import React from 'react';

const Contact = () => {
    const listing_Id: undefined = undefined;
    return (
        <div className="w-full bg-bgColor py-16 max-md:pt-2">
            <div className="w-[90%] 2xl:w-[80%] max-sm:w-[95%] mx-auto grid grid-cols-[3fr_5fr] gap-20 max-md:gap-12 max-lg:grid-cols-1 items-center">
                {/* Left Section */}
                <div className="flex-1 mt-4">
                    <h1 className="text-[4rem] max-md:text-4xl font-[700] leading-[78.02px] max-sm:leading-[29.26px] text-bgRed">Contact Us</h1>

                    <p className="text-[#8F90A6] max-sm:w-full text-xl max-md:text-base max-md:font-[600] font-[400] leading-[24.38px] mt-4"> Email, call, or complete the form to learn how Snappy can solve your messaging problem.</p>

                    <div className="my-4 space-y-3 text-bgRed text-xl font-[400] leading-[24.38px]">
                        <p className="">Info@Snappy.io</p>
                        <p className="">321-221-231</p>
                    </div>

                    <div className="mt-3 max-md:mt-6 space-y-1 max-md:space-y-2">
                        <h2 className="text-2xl font-[500] leading-[29.26px]">Customer Support</h2>
                        <p className="text-[#8F90A6] text-[1.25rem] max-md:text-base max-md:font-[600] font-[400] leading-[24.38px]">
                            Our Support Team Is Available
                            Around The Clock To Address Any
                            Concerns Or Queries You May Have.
                        </p>
                    </div>

                    <div className="mt-3 space-y-1">
                        <h2 className="text-2xl font-[500] leading-[29.26px]">Feedback And Suggestions</h2>
                        <p className="text-[#8F90A6] text-[1.25rem] max-md:text-base max-md:font-[600] font-[400] leading-[24.38px]">
                            We Value Your Feedback And Are
                            Continuously Working To Improve
                            Snappy. Your Input Is Crucial In
                            Shaping The Future Of Snappy.
                        </p>
                    </div>

                    <div className="mt-3 space-y-1">
                        <h2 className="text-2xl font-[500] leading-[29.26px]">Media Inquiries</h2>
                        <p className="text-[#8F90A6] text-[1.25rem] max-md:text-base max-md:font-[600] font-[400] leading-[24.38px]">
                            For Media-Related Questions Or
                            Press Inquiries, Please Contact Us At
                            Media@Snappyapp.Com.
                        </p>
                    </div>
                </div>

                {/* Right Section - Form */}
                <ContactForm component="contact" listingId={listing_Id} />

            </div>
        </div>
    );
};

export default Contact;