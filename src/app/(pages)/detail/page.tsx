import About_the_Property from "./About_the_Property";
import MapContactForm from "./MapContactForm";
import Overview from "./Overview";
import Places_Nearby from "./Places_Nearby";
import Popular_Listing from "./Popular_Listing";






export default function page() {
    return (
        <>
            <div className="detail_container w-full bg-bgColor">
                <div className="detail_inner_container relative w-[90%] z-10 mx-auto">
                    <img src="/images/detail_page_img_1.png" alt="" className="w-full h-auto" />
                    <div className="feature_container absolute top-6 -left-8 w-[200px] h-[50px] flex justify-center items-center rounded-[10px] bg-[#ED371C] text-white font-[600] text-[24px] tracking-[10%]">Featured</div>
                </div>

                <div className="estimated_EMI relative w-full 2xl:w-[80%] max-lg:h-[200px] mx-auto bg-bgBlue -mt-56 max-lg:-mt-24 z-20 pb-8 pt-16 text-white flex justify-center max-lg:px-4 items-center rounded-t-[80px] max-lg:rounded-t-[40px] rounded-b-[10px] max-lg:rounded-b-[5px] gap-3">
                    <div className="h-full flex flex-col items-start justify-center">
                        <h3 className="font-[600] text-6xl max-lg:text-4xl leading-[36px] tracking-[0.05em]">₹5.99 Cr</h3>
                        <p className="mt-3 text-xl max-lg:text-xs leading-[36px] tracking-[0.05em] text-bgRed">Estimated EMI ₹4,78,424</p>
                    </div>
                    <div className="border-r-2 border-[#FFFFFF] h-full max-lg:h-[50%] flex flex-col  bg-opacity-50 py-12 px-4">
                        <p className="text-xl max-lg:text-sm font-[400] leading-[36px] tracking-[0.05em] text-white text-opacity-50">@ 3,32,777 Per Sq.M.</p>
                    </div>
                    <div className="text-2xl max-lg:text-xs">
                        <p className="text-white text-opacity-70">3Bedrooms 2Baths</p>
                        <p className="text-white text-opacity-50 text-sm font-[400] leading-[36px]">Independent House/Villa for Sale</p>
                        <p className=" text-white text-opacity-50 text-xs">in Sector 14, Noida</p>
                    </div>
                </div>
                <Overview />
                
                <About_the_Property />
                <Places_Nearby />
                <MapContactForm />
                <Popular_Listing />
            </div>
        </>
    )
}