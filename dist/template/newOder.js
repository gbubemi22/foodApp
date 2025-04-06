export function NewOrder(orderId, firstName, email) {
    return `
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuickFoodShop Order Confirmation</title>
    <style>
        /* General Styles */
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f7fafc;
            color: #333;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 1rem;
        }

        .card {
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        /* Header */
        .header {
            display: flex;
            justify-content: center;
            padding: 1rem 0;
            background-color: #ffffff;
        }

        .logo {
            height: 2rem;
            width: auto;
        }

        /* Main Content */
        .content {
            background-color: #f0fff4;
            padding: 1.5rem;
            text-align: center;
        }

        .content h1 {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .content p {
            font-size: 0.875rem;
            margin-bottom: 1rem;
        }

        /* Order Summary */
        .order-summary {
            padding: 1rem;
            text-align: center;
        }
.order-summary hr {
    border: 0.5px solid rgb(248, 247, 247);
}
        .order-summary h2 {
            font-size: 1.125rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
.order-summary li {
    display: flex;
    font-weight: bold;
    justify-content: space-between;
    margin-bottom: 10px;
}

.customer-info {
    border-radius: 10px solid rgb(247, 243, 243);
}
        .order-date {
            font-size: 0.875rem;
            color: #4a5568;
            margin-bottom: 1rem;
            text-align: center;
        }

        /* Ordered Items */
        .items h3 {
            font-size: 1rem;
            font-weight: bold;
            margin-bottom: 0.9rem;
            text-align: left;
        }
.order-items{
    border: 0.6px solid rgb(235, 232, 232);
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 10px;
}
        .item {
            display: flex;
            align-items: left;
            border-bottom: 1px solid #e2e8f0;
        }
        .item h4 {
    text-align: left;
}
        .item:last-child {
            border-bottom: none;
        }

        .item-image {
            width: 4rem;
            height: 4rem;
            border-radius: 0.25rem;
            object-fit: cover;
            margin-right: 1rem;
        }

        .item-details {
            flex: 1;
        }

        .item-details h4 {
            font-weight: bold;
            font-size: 0.875rem;
            text-transform: uppercase;
        }

        .item-details p {
            font-size: 0.75rem;
            margin: 0;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-weight: bold;
        }

        .item-pricing {
            text-align: right;
        }

        .item-pricing p {
            font-size: 0.875rem;
            font-weight: 500;
        }

        .item-pricing p:last-child {
            font-size: 0.75rem;
        }

        /* Shipping Information */
        .shipping, .tracking, .payment, .totals, .dashboard {
            margin-top: 1rem;
            background-color: rgb(240, 238, 238);
            padding: 10px;
            border-radius: 10px;
        }

        .shipping h3, .tracking h3, .payment h3, .totals h3 {
            font-size: 1rem;
            font-weight: 900;
            margin-bottom: 0.5rem;
            text-align: left;
        }

        .shipping ul, .tracking ul, .payment ul, .totals ul {
            list-style: none;
            padding: 0;
            font-size: 0.875rem;
        }

        .shipping li, .tracking li, .payment li, .totals li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.25rem;
            font-weight: 300;
        }

        .tracking .status {
            font-weight: bold;
            color: #2f855a;
        }

        .link {
            color: #2f855a;
            font-weight: 500;
            text-decoration: none;
        }

        /* Contact and Signature */
        .contact, .signature {
            margin-top: 1.5rem;
            text-align: center;
            font-size: 0.875rem;
        }

        .signature p:last-child {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <!-- Header with Logo -->
            <div class="header">
                <img src="logo.png" alt="QuickFoodShop Logo" class="logo">
            </div>

            <!-- Main Content -->
            <div class="content">
                <h1>New Order -${orderId}</h1>
                <p>You have received a new order </p>
                <p>This email confirms that you have a new order <span style="font-weight: bolder;">#33258</span>  </p>
            </div>

            <!-- Order Summary -->
            <div class="order-summary">
                <h2>Order Summary:</h2>
                <p class="order-date">${new Date().getFullYear()}</p>
<hr class="hr">
                <!-- Customer Information -->
                <div class="customer-info">
                <ul style="border: 0.5px solid rgb(235, 233, 233); padding: 10px; border-radius: 10px;">
                    <li><span>customer Name:</span><span>${firstName}</span></li>
                    <li><span>customer Email:</span><span>${email}</span></li>
                </ul>
            </div>

                <!-- Ordered Items -->
                <div class="items">
                    <h3>Ordered Items:</h3>
                    <div class="order-items">
                    <div class="item">
                        <img src="jollof-rice.png" alt="Jollof Rice" class="item-image">
                        <div class="item-details">
                            <h4>Jollof Rice</h4>
                            <p>Price: <span> $20</span></p>
                            <p>Quantity: <span>1</span></p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="coleslaw.png" alt="Coleslaw" class="item-image">
                        <div class="item-details">
                            <h4>Coleslaw</h4>
                            <p>Price: <span> $20</span></p>
                            <p>Quantity: <span>1</span></p>
                        </div>
                    </div>
                </div>
                </div>

                <!-- Shipping Information -->
                <div class="shipping">
                    <h3>Shipping Information:</h3>
                    <ul>
                        <li><span>Estimated Shipping Date:</span><span>${new Date().getFullYear()}</span></li>
                        <li><span>Estimated Delivery Date:</span><span>${new Date().getFullYear()}</span></li>
                        <li><span>Shipping Carrier:</span><span>QuickFoodShop (if available)</span></li>
                        <li><span>Tracking Number:</span><span>#ADB1126</span></li>
                        <li><span>Shipping Address:</span><span>Brighton Avenue, South London</span></li>
                    </ul>
                </div>

                <!-- Customer Note -->
                <div class="shipping">

                    <li style="padding-top: 5px; font-weight: bold;">Customer Note: <span>N/A</span></li>
                   
                </div>

                <!-- Totals -->
                <div class="totals">
                  
                    <ul>
                        <li><span>Subtotal:</span><span>$40</span></li>
                        <li><span>Shipping:</span><span>-</span></li>
                        <li><span>Tax:</span><span>-</span></li>
                        <li><span>Total:</span><span>$40</span></li>
                    </ul>
                </div>

                <!-- Action Required -->
                <div class="shipping">
                    <h3>Action Required:</h3>
                    <ul style="margin-left: 20px;">
                        <li><span>Please process this order as soon as possible.</span></li>
                        <li><span>Update order status and provide tracking information once the order has shipped.</span></li>
                        <li><span>Please prepare the items for shipping, and ship by the agreed upon shipping date.</span></li>
                    </ul>
                </div>

                <!-- Dashboard Link -->
                <div class="dashboard">
                    <p>You can view the order details in your vendor dashboard here: <a href="#" class="link">dashboard_link</a></p>
                </div>

                <!-- Contact Information -->
                <div class="contact">
                    <p>If you have any questions, please contact us at <a href="mailto:info@quickfoodshop.com" class="link">info@quickfoodshop.com</a> or call us at <a href="tel:+44837467283" class="link">+44837467283</a></p>
                </div>

                <!-- Signature -->
                <div class="signature">
                    <p>Sincerely,</p>
                    <p>The QuickFoodShop Team</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
     `;
}
