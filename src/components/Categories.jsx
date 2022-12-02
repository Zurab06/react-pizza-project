import React from 'react';
const Categories = ({value,onClickCategory}) => {
  const array=['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']

    return (
        <div>
          <div>
              <div className="categories">
              <ul>
                {
                  array.map((categoryName,index)=>
                  
                <li key={index}
                 onClick={()=>onClickCategory(index)} 
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