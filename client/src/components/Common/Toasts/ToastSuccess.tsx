import type { Toast, ToastPosition } from 'react-hot-toast';

import { FaCircleCheck } from 'react-icons/fa6';
import Card from '../Card';

export interface ToastSuccessProps {
    toast: Toast,
    position?: ToastPosition,
    duration?: number,
    message: string
};

function ToastSuccess({ toast, position="top-right", duration=3000, message }: ToastSuccessProps) {

    toast.duration = duration;
    toast.position = position;

    return(
        <Card className="bg-card-light p-4 shadow-lg">
            <div className="flex">
                <div className="pr-3">
                    <FaCircleCheck className="text-primary" />
                </div>
                <div>
                    <p className="text-text">{message}</p>
                </div>
            </div>
        </Card>
    );
};

export default ToastSuccess;