import { Card } from '@@components/Common';

function BidsListHeaders() {
    
    const headerTitles = [
        "#",
        "Price",
        "Status",
        "Actions"
    ];

    const renderHeaders = () => {
        return headerTitles.map((title, index) => (
            <p 
                key={`collection-header-${title}-${index}`} 
                className="w-full flex-1 font-semibold"
            >
                {title}
            </p>
        ));
    };

    return(
        <Card className="bg-card-light w-full">
            <div className="flex gap-6 items-center justify-center text-center">
                {renderHeaders()}
            </div>
        </Card>
    );
};

export default BidsListHeaders;