const loadMeals=(searchTex)=>{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTex}`
    fetch(url).then((response)=>{
        return response.json()
    }).then((data)=>{
        disPlayMeaks(data.meals)
    }).catch((err)=>{
        console.log(err);
    })
}


const disPlayMeaks=meals=>{
     console.log(meals)
     const MealContainer=document.getElementById('meals_container');
     MealContainer.innerHTML=''
     for(let meal of meals){
        console.log(meal)
        const mealDiv=document.createElement("div");
        mealDiv.classList.add=('col');
        mealDiv.innerHTML=`
        <div class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <!-- modal button starts from here -->
                <button type="button" onclick="LoadMealDetails(
                 '${meal.idMeal}'
                )" class="btn 
                btn-primary" data-bs-toggle="modal" data-bs-target="#MealDetailsModal">
                    Details
                  </button>
           <!-- modal button ends from here -->
        </div>
        `
        console.log(mealDiv)
        MealContainer.appendChild(mealDiv)
     }
}

const searchMeal=()=>{
    const searchTex=document.getElementById("Search_food").value;
    console.log(searchTex);
    loadMeals(searchTex)
}

const LoadMealDetails=id=>{
    try{
        const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        console.log(url)
        fetch(url).then((res)=>{
            return res.json();
        }).then((data)=>{
            disPlayMealDetails(data.meals[0])
        }).catch((err)=>{
            console.log(err);
        })
    }catch(err){
        console.log(err)
    }
   
}

//usinf async await
const disPlayMealDetails_2= async(id)=>{
    try{
        const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        const response=await fetch(url);
        const data= await response.json();
        disPlayMealDetails(data.meals[0]);
    }catch(err){
        console.log(err);
    }
   
}

const disPlayMealDetails=(data)=>{
   const ModalTitle=document.getElementById('ModalTitle');
   ModalTitle.innerText=data.strMeal;
   const Modal_Body=document.getElementById('Modal_Body');
   Modal_Body.innerHTML=`
   <img src="${data.strMealThumb}" class="modalImage"/>
   `
}


