import React, {useState} from 'react';
import Block from "../../typography/Block.tsx";
import {checkIcon} from '../../../assets/icons/settings/index.ts'

interface StringItem {
    type: 'string';
    value: string;
}

interface ObjectItem {
    type: 'object';
    value: {
        language: string;
        description: string;
    };
}

type ListItem = StringItem | ObjectItem;

interface SelectedItems {
    selectItems: ListItem[];
    onItemSelected: (item: string) => void;
}

const SelectorTile: React.FC<SelectedItems> = ({selectItems, onItemSelected }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleItemClick = (item: ListItem) => {
        const itemValue = item.type === 'string' ? item.value : item.value.language;
        setSelectedItem(itemValue);
        onItemSelected(itemValue);

    };

    const getItemDisplay = (item: ListItem) => {
        return item.type === 'string' ? item.value : item.value.language;
    };

    return (
        <Block>
            {selectItems.map((item, index) => (
                <div
                    key={index}
                    style={{
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    onClick={() => handleItemClick(item)}
                >
                    {getItemDisplay(item)}
                    {item.type === 'object' && <div>{item.value.description}</div>}
                    {selectedItem === getItemDisplay(item) && <img src={checkIcon} alt="icon"/>}
                </div>
            ))}
        </Block>
    );
};

export default SelectorTile;