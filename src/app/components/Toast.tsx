"use client"

import { Metadata } from 'next'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'Notifications | Brick N Key',
  description: 'Stay updated with real-time notifications about your property searches and interactions.',
  keywords: 'notifications, alerts, updates, property alerts',
  openGraph: {
    title: 'Notifications | Brick N Key',
    description: 'Stay updated with real-time notifications',
    type: 'website',
  }
}

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
            icon: <CheckCircle className="w-5 h-5" />,
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-500',
            textColor: 'text-emerald-800',
            iconColor: 'text-emerald-500'
        },
        error: {
            icon: <XCircle className="w-5 h-5" />,
            bgColor: 'bg-red-50',
            borderColor: 'border-red-500',
            textColor: 'text-red-800',
            iconColor: 'text-red-500'
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
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`fixed top-4 left-[50%] z-50
                        ${config.bgColor} ${config.textColor} 
                        px-4 py-3 rounded-lg shadow-lg border
                        ${config.borderColor}
                        flex items-center justify-between gap-3 
                        w-auto min-w-[320px] max-w-[90vw]
                        mx-auto`}
                >
                    <p className="flex-1 text-sm font-medium text-center">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className={`${config.textColor} opacity-70 hover:opacity-100 
                            transition-opacity duration-200 ml-2`}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
