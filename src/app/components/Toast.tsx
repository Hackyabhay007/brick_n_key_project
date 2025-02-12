import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
}

const Toast = ({ message, type, isVisible, onClose }: ToastProps) => {
    const toastConfig = {
        success: {
            icon: <CheckCircle className="w-6 h-6" />,
            gradient: 'from-green-500 to-emerald-600',
            iconColor: 'text-emerald-50'
        },
        error: {
            icon: <XCircle className="w-6 h-6" />,
            gradient: 'from-red-500 to-rose-600',
            iconColor: 'text-red-50'
        }
    };

    const config = toastConfig[type];

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ 
                        duration: 0.3, 
                        ease: [0.4, 0, 0.2, 1] 
                    }}
                    className={`
                        fixed z-50  top-40
                        inset-2 mx-auto my-auto
                        h-fit w-[90%] sm:w-auto
                        max-w-[360px]
                        flex items-center gap-1.5
                        p-2.5 sm:p-4 rounded-lg
                        bg-gradient-to-r ${config.gradient}
                        shadow-lg shadow-black/10
                        border border-white/10
                        backdrop-blur-sm
                    `}
                >
                    {/* <div className={`${config.iconColor} shrink-0`}>
                        {config.icon}
                    </div> */}
                    
                    <p className="flex-1 text-xs sm:text-sm font-medium text-white px-1 break-words">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white transition-colors duration-200 shrink-0"
                        aria-label="Close notification"
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 3, ease: "linear" }}
                        className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 origin-left"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
