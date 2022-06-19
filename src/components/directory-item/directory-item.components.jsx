import { useNavigate } from 'react-router-dom';

import {
    DirectoryItemContainer,
    BackgroundImage,
    Body,
} from './directory-item.styles.jsx'

const DirectoryItem = ({ category }) => {
    const { title, imageUrl, route } = category;
    const navigate = useNavigate();

    const onHandler = () => navigate(route);


    return (
        <DirectoryItemContainer onClick={onHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;