document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript carregado");
    

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            localStorage.setItem("currentUser", username);
            window.location.href = "src/profile.html";
        });
    }
    
    
    const itemForm = document.getElementById("item-form");
    const shoppingList = document.getElementById("shopping-list");
    const currentUser = localStorage.getItem("currentUser");
    const storageKey = `shoppingList_${currentUser}`;

    let items = [];
    
    const saved = localStorage.getItem(storageKey);
    if (saved) {
        items = JSON.parse(saved);
        updateShoppingList();
    }

    if (itemForm && shoppingList) {
        itemForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const itemName = document.getElementById("item-name").value;
            const itemQuantity = document.getElementById("item-quantity").value;

            if (itemName.trim() === "") {
                alert("O nome do item não pode estar vazio!");
                return;
            }
            items.push({Quantity: itemQuantity, Name: itemName});
            localStorage.setItem(storageKey, JSON.stringify(items));
            console.log("Qtd:", itemQuantity ,"Item adicionado:", itemName);

            updateShoppingList();
            itemForm.reset();
        });
    }
    
    function updateShoppingList() {
        shoppingList.innerHTML = "";
        items.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.Quantity}: ${item.Name}`;
            
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "x";
            removeBtn.classList.add("remove-btn");

            removeBtn.addEventListener("click", () => {
                console.log("Item removido:", item.Name);
                items.splice(index, 1);
                localStorage.setItem(storageKey, JSON.stringify(items));
                updateShoppingList();
            });
            
            li.appendChild(removeBtn);
            shoppingList.appendChild(li);
        });
    }
});