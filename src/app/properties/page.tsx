"use client"

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertyItems, setFilter } from '@/redux/slices/propertyItemSlice';
import { AppDispatch, RootState } from '@/redux/store';
import Pagination from '../components/Pagination';
import Buy_Section_Desktop_Dropdown from '../components/Buy_Section_Desktop_Dropdown';
import styles from "./properties.module.css";
import { CiSearch } from "react-icons/ci";
import { FaChevronUp } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';

const PropertiesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.propertyItems);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Items per page
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string>("");
  const [property_Location, setProperty_Location] = useState<string>("");

  useEffect(() => {
    dispatch(setFilter({ key: 'page', value: currentPage }));
    dispatch(setFilter({ key: 'pageSize', value: pageSize }));
    dispatch(fetchPropertyItems());
  }, [currentPage, dispatch]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    document.querySelector('.listing_container')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (property_Location) {
      dispatch(setFilter({ key: 'property_Location', value: property_Location }));
      dispatch(fetchPropertyItems());
    }
  };

  return (
    <div className='w-full min-h-screen'>
      <div className="w-full min-h-screen bg-[#212B36]">
        <div className='container_main'>
          {/* Search Header */}
          <div className="flex justify-start items-center gap-4 mt-6">
            <div className="w-[12rem] h-[2.4rem] rounded-full bg-[#2F373F] flex justify-start items-center gap-2 px-4">
              <CiSearch className='text-2xl text-white' />
              <form onSubmit={handleLocationSubmit}>
                <input
                  type="text"
                  placeholder='Search location...'
                  value={property_Location}
                  onChange={(e) => setProperty_Location(e.target.value)}
                  className='bg-transparent outline-none text-white placeholder:text-white/60'
                />
              </form>
            </div>

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-1.5 rounded-full bg-[#2F373F] text-white flex justify-center items-center gap-2"
            >
              All Filters
              {isDropdownOpen ? <FaChevronUp className='text-sm' /> : <IoIosArrowDown />}
            </button>

            <Buy_Section_Desktop_Dropdown
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
              isLuxury={false}
            />
          </div>

          {/* Listing Container */}
          <div className="listing_container mt-8">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data?.data.map((property: any) => (
                    <Link href={`/properties/${property.id}`} key={property.id}>
                      <div className='bg-[#2F373F] rounded-lg overflow-hidden cursor-pointer'>
                        {/* Property Image */}
                        <div className="w-full h-[15rem] relative">
                          <Image
                            src={`http://localhost:1337${property.attributes?.property_Images?.data[0]?.attributes?.url}`}
                            alt={property.attributes?.property_Title || "Property Image"}
                            fill
                            className='object-cover'
                          />
                        </div>

                        {/* Property Details */}
                        <div className="p-4">
                          <h3 className="text-xl text-white font-semibold">
                            {property.attributes?.property_Title}
                          </h3>
                          <p className="text-white/60 mt-2">
                            {property.attributes?.property_Location}
                          </p>
                          <p className="text-white mt-2">
                            ₹{property.attributes?.property_price} Cr
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {data && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      pageSize={pageSize}
                      total={data.meta.pagination.total}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
