function showDishInfo(dishId) {
    document.querySelectorAll('#dish-info div').forEach(div => {
        div.classList.remove('active');
    });
    document.querySelectorAll('.dish img').forEach(img => {
        img.classList.remove('active');
    });

    const dishInfoDiv = document.querySelector(`#${dishId}-info`);
    if (dishInfoDiv) {
        dishInfoDiv.classList.add('active');
    }

    const selectedImg = document.querySelector(`#${dishId}`);
    if (selectedImg) {
        selectedImg.classList.add('active');
    }
}

function addToMealPlan(dish, price) {
    const selectedDishes = document.getElementById('selected-dishes');
    const newDish = document.createElement('li');
    

    newDish.textContent = `${dish} - $${price.toFixed(2)}`;
    
    // Add button or feature to remove the dish
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.style.marginLeft = '10px';
    removeButton.onclick = function() {
        removeDish(newDish, price);
    };

    newDish.appendChild(removeButton);
    selectedDishes.appendChild(newDish);
    updateTotalCost(price);
}

function removeDish(dishElement, price) {
    dishElement.remove();

    // Update total cost by subtracting the price
    updateTotalCost(-price);
}

function updateTotalCost(amount) {
    const totalCostElement = document.getElementById('total-cost');
    let totalCost = parseFloat(totalCostElement.textContent);
    totalCost += amount;
    totalCostElement.textContent = totalCost.toFixed(2);
}
