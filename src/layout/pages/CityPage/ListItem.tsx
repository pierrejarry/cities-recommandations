import { Tip } from "../../../utils/recommendationsTypes";
import './ListItem.css';

interface ListItemProps {
    image: string;
    name: string;
    category: string;
    address: string;
    tips: Tip[]
}

function ListItem({image, name, category, address, tips}: ListItemProps) {
    return (
        <div className="item">
            <img
                src={image}
                alt={name}
                className="item-image"
                width={300}
            />

            <div className="item-content">
                <h3>{name}</h3>

                <p>
                    <strong>Category:</strong> {category}
                </p>
                <p>
                    <strong>Address:</strong> {address}
                </p>

                <h4>Some of the clients feedbacks</h4>

                <ul>
                    {tips.slice(0,5).map((tip, index) => (
                        <li key={index}>{tip.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ListItem