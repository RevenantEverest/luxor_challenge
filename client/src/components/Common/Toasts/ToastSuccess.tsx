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
        <Card className="bg-card-light shadow-lg w-full">
            <div className="flex gap-2 w-full items-center">
                <FaCircleCheck className="text-primary" />
                <p className="text-text">{message}</p>
            </div>
        </Card>
    );
};

export default ToastSuccess;