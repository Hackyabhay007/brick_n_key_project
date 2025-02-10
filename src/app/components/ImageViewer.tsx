"use client"

import { IoClose } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { useEffect } from "react";

interface ImageViewerProps {
    images: string[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

const ImageViewer = ({ images, currentIndex, onClose, onNext, onPrev }: ImageViewerProps) => {
    useEffect(() => {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close"
            >
                <IoClose size={24} />
            </button>

            <button
                onClick={onPrev}
                className="absolute left-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Previous image"
            >
                <IoIosArrowBack size={24} />
            </button>

            <div className="relative w-[90vw] h-[90vh]">
                <Image
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            <button
                onClick={onNext}
                className="absolute right-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Next image"
            >
                <IoIosArrowForward size={24} />
            </button>
        </div>
    );
};

export default ImageViewer;
