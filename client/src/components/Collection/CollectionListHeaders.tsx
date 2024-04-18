import { Card } from '@@components/Common';

function CollectionListHeaders() {
    
    const headerTitles = [
        "#",
        "Name",
        "Description",
        "Stock Amount",
        "Price",
        "Actions"
    ];

    const renderHeaders = () => {
        return headerTitles.map((title, index) => (
            <p 
                key={`collection-header-${title}-${index}`} 
                className="w-full font-semibold"
            >
                {title}
            </p>
        ));
    };

    return(
        <Card className="bg-card-light">
            <div className="flex gap-6 items-center justify-center text-center">
                {renderHeaders()}
            </div>
        </Card>
    );
};

export default CollectionListHeaders;