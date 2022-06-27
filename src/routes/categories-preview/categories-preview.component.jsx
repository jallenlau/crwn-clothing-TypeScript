import { useSelector } from "react-redux";

import { selectCategoriesMap } from '../../store/categories/category.selector'
import CategoryPreview from '../../components/category-preview/category-preview.component'
import Spinner from "../../components/spinner/spinner.component";
import { isSetCategoriesIsLoading } from '../../store/categories/category.selector'

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(isSetCategoriesIsLoading);

    return (
        <div className="shop-container">
            {
                isLoading ? (<Spinner />) :
                Object.keys(categoriesMap).map((key) => {
                    const category = categoriesMap[key];
                    return <CategoryPreview key={key} title={key} category={category} />
                })
            }
        </div>
    );
};

export default CategoriesPreview;