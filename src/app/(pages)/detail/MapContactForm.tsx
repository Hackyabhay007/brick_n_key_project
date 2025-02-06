import ContactForm from "@/app/components/ContactForm";
import Image from "next/image";


const MapContactForm = ({listingId}:{listingId:number}) => {

  return (
    <>
      <div className="h-auto w-[90%] max-sm:w-[95%] mx-auto my-16 grid grid-cols-2 max-lg:grid-cols-1 place-items-center items-center">
        <div className='w-full h-full flex justify-center items-center'>
          <Image width={100} height={100} src="/images/map_contact_img.png" className='h-full w-full' alt="map_contact_img" />
        </div>

        <ContactForm component="mapContactForm" listingId={listingId} />
      </div>
    </>
  );
};

export default MapContactForm;