const items = [
    { name: "1L yoghurt", type: "piece", price: 4300 },
    { name: "1.5L yoghurt", type: "piece", price: 6200 },
    { name: "0.25L yoghurt", type: "piece", price: 1500 },
    { name: "0.5L yoghurt", type: "piece", price: 2600 },
    { name: "Mozzarella", type: "kg", price: 1500 },
    { name: "Gouta", type: "kg", price: 1500 },
];

const itemSelect = document.getElementById("item");
items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name.toLowerCase();
    option.textContent = item.name;
    itemSelect.appendChild(option);
});

const webhookURL = "https://discord.com/api/webhooks/1267214910593564714/sDfcOLK6H1woD93dmsKCiFiOQkBmqR4zjpPy1rKAtDOhXyRNO7v82U-7zkFj4q5mFnyj";

function order() {
    const selectedItem = itemSelect.value;
    const quantity = parseFloat(document.getElementById("quantity").value);
    const name = document.getElementById("name").value; // Capture the name
    const Phone_Number = document.getElementById("Number").value;
    const Additional_text = document.getElementById("Additional_text").value;

    const item = items.find((i) => i.name.toLowerCase() === selectedItem);

    if (!item) {
        alert("Invalid item");
        return;
    }

    const totalPrice =
        item.type === "kg"
            ? (item.price * quantity).toFixed(2)
            : item.price * quantity;

    const formattedTotalPrice = Number(totalPrice).toLocaleString(); // Format the total price with commas

    const order = {
        name, // Include the captured name in the order object
        item: item.name,
        quantity,
        type: item.type,
        price: item.price,
        totalPrice: formattedTotalPrice,
        Phone_Number,
        Additional_text,

    };

    sendOrderToDiscord(order); // Send order to Discord webhook
    document.getElementById("order-form").reset();
}


function sendOrderToDiscord(order) {
    const { name, item, quantity, totalPrice, Phone_Number, Additional_text} = order;
    const payload = {
        content: `@everyone New order received:\nName: **${name}**\nItem:** ${item}**\nQuantity:** ${quantity} **\nTotal Price:** ${totalPrice}**\nPhone Number:** ${Phone_Number} **\nMessage:** ${Additional_text} **`,
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to send order to Discord");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}
