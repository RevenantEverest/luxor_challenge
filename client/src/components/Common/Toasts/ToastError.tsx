import type { Toast, ToastPosition } from 'react-hot-toast';

import { FaCircleXmark } from 'react-icons/fa6';
import Card from '../Card';

export interface ToastErrorProps {
    toast: Toast,
    position?: ToastPosition,
    duration?: number,
    message: string | JSX.Element
};

function ToastError({ toast, position="top-right", duration=3000, message }: ToastErrorProps) {

    toast.duration = duration;
    toast.position = position;

    const renderMessage = () => {
        if(typeof message === "string") {
            return(
                <p className="text-text">{message}</p>
            );
        }

        return message;
    };

    return(
        <Card className="bg-card-light p-4 shadow-lg">
            <div className="flex">
                <div className="pr-3">
                    <FaCircleXmark className="text-red-500" />
                </div>
                <div>
                    {renderMessage()}
                </div>
            </div>
        </Card>
    );
};

export default ToastError;