import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
}

const Toast = ({ message, type, isVisible, onClose }: ToastProps) => {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
                        ${bgColor} text-white px-6 py-3 w-fit rounded-md shadow-lg 
                        flex items-center text-xs`}
                >
                    <div className="flex items-center gap-2">
                        <p className="text-sm">{message}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
