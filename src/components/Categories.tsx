
import React from 'react';
type CategoriesProps ={
value: number;
onChangeCategory: (i:number)=>void;
}
const Categories: React.FC<CategoriesProps>= ({value,onChangeCategory}) => {
  const array=['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']

    return (
        <div>
          <div>
              <div className="categories">
              <ul>
                {
                  array.map((categoryName,index)=>
                  
                <li key={index}
                 onClick={()=>onChangeCategory(index)} 
                 className={value===index ? "active" : ''}>
                  {categoryName}</li>
              
                  )
                }
              </ul>
            </div>
            </div>
        </div>
    );
};

export default Categories;