import Image from "next/image";






export default function Footer() {
    return (
        <>
            <div className="footer_container rel w-full bg-bgColor relative -mt-10 z-20">
                <div className="footer_inner_container w-[95%] mx-auto py-12 px-8 grid grid-cols-[4fr_2fr_2fr_3fr] gap-12 bg-bgBlue">
                    <div className="footer_panel_1 text-[#8F90A6] text-[14px]">
                        <div className="h-full flex flex-col justify-between items-start gap-6">
                            <Image width={182} height={63} src="/images/footer_icon.png" className="h-[63px] rounded-full bg-white" alt="" />
                            <div className="panel1_info_and_logo leading-[31px]">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <div className="footer_panel_1_logo flex gap-6 my-1">
                                    <Image width={22} height={22} src="/images/facebook_logo.png" alt="" />
                                    <Image width={22} height={22} src="/images/twitter_logo.png" alt="" />
                                    <Image width={22} height={22} src="/images/instagram_logo.png" alt="" />
                                    <Image width={22} height={22} src="/images/linkedIn_logo.png" alt="" />
                                </div>
                            </div>
                            <p>© 2021 . All rights reserved.</p>
                        </div>
                    </div>
                    <div className="footer_panel_2">
                        <ul className=" h-full flex flex-col justify-between items-start leading-[52px] text-white">
                            <li className="font-[600] text-[20px] ">Take a tour</li>
                            <li>Features</li>
                            <li>Partners</li>
                            <li>Pricing</li>
                            <li>Product</li>
                            <li>Support</li>
                        </ul>
                    </div>
                    <div className="footer_panel_3">
                        <ul className=" h-full flex flex-col justify-between items-start leading-[52px] text-white">
                            <li className="font-[600] text-[20px]">Our Company</li>
                            <li>About Us</li>
                            <li>Agents</li>
                            <li>Blog</li>
                            <li>Media</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className="footer_panel_4 h-full flex flex-col items-start gap-3 leading-[52px] text-white">
                        <h3 className="font-[600] text-[20px]">Subscribe</h3>
                        <p className="text-[14px] leading-[23px] text-[#8F90A6]">Subscribe to get latest property, blog news from us</p>
                        <div className="panel_4_search_bar w-full bg-white flex justify-between items-center rounded-[15px]">
                            <input type="text" placeholder="Email Address" className=" h-full p-4 rounded-tl-[15px] outline-none text-black rounded-bl-[15px]" />
                            <div className="bg-[#ED371C] p-2 rounded-full mr-3 flex justify-center items-center text-xs">Subscribe</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}