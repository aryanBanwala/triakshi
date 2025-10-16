import { useMemo, useState } from "react";
import "./Order.css";

type OrderStatus = "delivered" | "dispatched" | "pending";
type OrderType = "single" | "cart";

interface OrderItem {
  name: string;
  description: string;
}

interface Order {
  id: string;
  type: OrderType;
  status: OrderStatus;
  orderDate: string;
  deliveryDate: string;
  price: number;
  items: OrderItem[];
}

const ordersData: Order[] = [
  {
    id: "ORD-2024-10851",
    type: "cart",
    status: "dispatched",
    orderDate: "Oct 10, 2025",
    deliveryDate: "Oct 15, 2025",
    price: 459.97,
    items: [
      { name: "Wireless Bluetooth Headphones", description: "Premium noise-canceling headphones with 30hr battery" },
      { name: "Smart Watch Series 5", description: "Fitness tracker with heart rate monitor" },
      { name: "USB-C Fast Charger", description: "65W rapid charging adapter" }
    ]
  },
  {
    id: "ORD-2024-10842",
    type: "single",
    status: "delivered",
    orderDate: "Oct 5, 2025",
    deliveryDate: "Oct 8, 2025",
    price: 89.99,
    items: [
      { name: "Mechanical Gaming Keyboard", description: "RGB backlit with blue switches" }
    ]
  },
  {
    id: "ORD-2024-10833",
    type: "cart",
    status: "pending",
    orderDate: "Oct 12, 2025",
    deliveryDate: "Oct 18, 2025",
    price: 234.98,
    items: [
      { name: "4K Webcam Pro", description: "Ultra HD video with auto-focus and noise reduction" },
      { name: "Desk Lamp LED", description: "Adjustable brightness with USB charging port" }
    ]
  },
  {
    id: "ORD-2024-10825",
    type: "single",
    status: "delivered",
    orderDate: "Sep 28, 2025",
    deliveryDate: "Oct 2, 2025",
    price: 149.99,
    items: [
      { name: "Portable SSD 1TB", description: "High-speed external storage with USB 3.2" }
    ]
  }
];

const statusClassMap: Record<OrderStatus, string> = {
  delivered: "status-delivered",
  dispatched: "status-dispatched",
  pending: "status-pending",
};

const statusTextMap: Record<OrderStatus, string> = {
  delivered: "Delivered",
  dispatched: "Dispatched",
  pending: "Yet to be Dispatched",
};

const Order = () => {
  const [orders] = useState<Order[]>(ordersData);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const toggleCart = (orderId: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(orderId)) next.delete(orderId);
      else next.add(orderId);
      return next;
    });
  };

  const renderedOrders = useMemo(() => {
    return orders.map(order => {
      const isCart = order.type === "cart";
      const itemCount = order.items.length;
      const isExpanded = expanded.has(order.id);
      const statusClass = statusClassMap[order.status];
      const statusText = statusTextMap[order.status];

      return (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <div className="order-id">Order #{order.id}</div>
            <div className={`status-badge ${statusClass}`}>{statusText}</div>
          </div>

          <div className="order-details">
            <div className="detail-item">
              <div className="detail-label">Order Date</div>
              <div className="detail-value">{order.orderDate}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                {order.status === "pending" ? "Expected Delivery" : "Delivery Date"}
              </div>
              <div className="detail-value">{order.deliveryDate}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">{isCart ? "Total Price" : "Price"}</div>
              <div className="detail-value price">${order.price.toFixed(2)}</div>
            </div>
            {isCart && (
              <div className="detail-item">
                <div className="detail-label">Items</div>
                <div className="detail-value">{itemCount} items</div>
              </div>
            )}
          </div>

          {isCart && <div className="cart-badge">Cart Order</div>}

          <div className="item-display">
            <div className="item-info">
              <div className="item-name">{order.items[0]?.name}</div>
              <div className="item-description">{order.items[0]?.description}</div>
            </div>

            {isCart && itemCount > 1 && (
              <button
                className="expand-btn"
                onClick={() => toggleCart(order.id)}
                aria-expanded={isExpanded}
                aria-controls={`cart-items-${order.id}`}
              >
                <span>{isExpanded ? "Hide Items" : "View All Items"}</span>
                <span className={`expand-icon ${isExpanded ? "rotated" : ""}`}>▼</span>
              </button>
            )}
          </div>

          {isCart && itemCount > 1 && (
            <div
              id={`cart-items-${order.id}`}
              className={`cart-items-container ${isExpanded ? "expanded" : ""}`}
            >
              <div className="additional-items">
                {order.items.slice(1).map((item, idx) => (
                  <div className="cart-item" key={`${order.id}-extra-${idx}`}>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-description">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    });
  }, [orders, expanded]);

  return (
    <div className="order-container">
      <h1>📦 Order History</h1>
      <div id="ordersContainer">{renderedOrders}</div>
    </div>
  );
};

export default Order;
