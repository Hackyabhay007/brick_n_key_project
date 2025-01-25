"use client"


import React, { useState } from 'react';

interface ContactFormData {
    firstName: string;
    lastName: string;
    iWantTo: string;
    notes: string;
    phone: string;
}

const ContactForm = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        firstName: '',
        lastName: '',
        iWantTo: '',
        notes: '',
        phone: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

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
                <div className="flex-1 h-fit bg-bgBlue rounded-[30px] max-md:rounded-[20px] py-16 max-lg:mt-3 max-lg:py-6 px-8 max-lg:px-5 text-white">
                    <h2 className="text-[2.5rem] max-lg:text-3xl max-md:text-2xl font-[400] leading-[48.76px] max-lg:text-center">Still haven't found what you're looking for?</h2>

                    <form onSubmit={handleSubmit} className="space-y-6 max-lg:space-y-3 mt-12 flex flex-col max-md:items-center">
                        <div className=" w-full grid grid-cols-2 gap-16 max-sm:gap-6">
                            <div className='w-full'>
                                <label className="block font-[400] text-xl max-lg:text-base leading-[24.38px] mb-1 max-lg:mb-0">First Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-white bg-opacity-20 rounded-[5px]"
                                    placeholder="First Name"
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>

                            <div className='w-full'>
                                <label className="block font-[400] text-xl max-lg:text-base leading-[24.38px] mb-1 max-lg:mb-0">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-white bg-opacity-20 rounded-[5px]"
                                    placeholder="Last Name"
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className=" w-full grid grid-cols-2 gap-16 max-sm:gap-6">
                            <div className='w-full'>
                                <label className="block w-full font-[400] text-xl max-lg:text-base leading-[24.38px] mb-1 max-lg:mb-0">Phone Number</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-white bg-opacity-20 rounded-[5px]"
                                    placeholder="Phone Number"
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div className='w-full'>
                                <label className="block w-full font-[400] text-xl max-lg:text-base leading-[24.38px] mb-1 max-lg:mb-0">I Want To</label>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-white bg-opacity-20 rounded-[5px]"
                                    placeholder="Buy Property"
                                    onChange={(e) => setFormData({ ...formData, iWantTo: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className='w-full'>
                            <label className="block w-full font-[400] text-xl max-lg:text-base leading-[24.38px] mb-1 max-lg:mb-0">Notes</label>
                            <textarea
                                className="w-full bg-white bg-opacity-20 rounded-[5px]"
                                rows={5}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[#ED371C] w-[100px] h-[30px] rounded-[5px] flex justify-center items-center"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;