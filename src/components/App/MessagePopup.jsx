import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

export default function MessagePopup({
    type = 'info',
    message = '',
    title,
    duration = 5000,
    onClose,
    isVisible = true
}) {
    const [visible, setVisible] = useState(isVisible);

    // Auto-close functionality
    useEffect(() => {
        setVisible(isVisible);

        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    // Handle close button click
    const handleClose = () => {
        setVisible(false);
        if (onClose) onClose();
    };

    // Early return if not visible
    if (!visible) return null;

    // Define styles and icons based on message type
    const typeConfig = {
        success: {
            icon: <CheckCircle className="w-6 h-6 text-green-500" />,
            bgColor: 'bg-green-50',
            borderColor: 'border-green-500',
            textColor: 'text-green-800'
        },
        warning: {
            icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-500',
            textColor: 'text-yellow-800'
        },
        error: {
            icon: <AlertCircle className="w-6 h-6 text-red-500" />,
            bgColor: 'bg-red-50',
            borderColor: 'border-red-500',
            textColor: 'text-red-800'
        },
        info: {
            icon: <Info className="w-6 h-6 text-blue-500" />,
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-500',
            textColor: 'text-blue-800'
        }
    };

    // Use the correct configuration based on type
    const config = typeConfig[type] || typeConfig.info;


    return (
        <div className="fixed top-20 right-4 z-50">
            <div className={`scale-z-100 min-w-80 max-w-md shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out`}>
                <div className={`${config.bgColor} border-l-4 ${config.borderColor} p-4 flex items-start`}>
                    <div className="flex-shrink-0">
                        {config.icon}
                    </div>
                    <div className="ml-3 w-full pr-6">
                        {title && (
                            <h3 className={`text-sm font-medium ${config.textColor}`}>
                                {title}
                            </h3>
                        )}
                        <div className={`text-sm ${config.textColor} mt-1`}>
                            {message}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="ml-auto flex-shrink-0 -mr-1 -mt-1 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        onClick={handleClose}>
                        <X className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>
        </div>
    );
    
}