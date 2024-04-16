import { Button } from '@@components/Common';

function Navbar() {

    return(
        <div className="bg-card h-20 fixed w-full">
            <div className="flex flex-row items-center justify-center h-full px-96">
                <div className="flex-1">
                    <strong>Luxor Challenge</strong>
                </div>
                <div className="flex-1 w-full h-full">
                    {/* Branding */}
                </div>
                <div className="flex flex-1 gap-2 justify-end">
                    <Button outlined className="px-6" size="sm">
                        <p>Sign Up</p>
                    </Button>
                    <Button className="px-6 py-1" size="sm">
                        <p>Login</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;