"use strict";
///////////// selecting elements ////////////
const userInfo = document.querySelector(".user-info");
const cards = document.querySelector(".cards");
const receivedOrdersBtn = document.querySelector(".done-orders-btn");
const intransitOrdersBtn = document.querySelector(".intransit-orders-btn");
const cancelledOrDoneOrdersBtn = document.querySelector(
  ".cancelled-orders-btn"
);

/////////////////////////////
/////// RENDER CARDS & MODAL ///////
const formatDate = function (timestamp, days) {
  let newTimestamp = days * 24 * 60 * 60 * 1000;
  newTimestamp += timestamp;
  let d = new Date(newTimestamp);
  let dateString =
    d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
  return dateString;
};

// INTRANSIT ORDERS, STATUS 1 & 2 & 3
const renderIntransitOrders = function (order) {
  let orderStatus = order.order_status == 1 ? "配送中" : "已配送";
  let createdDate = formatDate(order.order_created_date, 0);
  let shippedDate = formatDate(order.order_shipped_date, 0);
  let card2 = `
              <div class = "card-intransit">
                <div class="card-2">
                  <div class="order-status">
                    <p>狀態：${orderStatus}</p>
                  </div>
                  <div class="order-no">
                    <p>訂單編號：${order.order_id}</p>
                  </div>
                  <div class="order-date">
                    <p>訂購日期：${createdDate}</p>
                  </div>
                  <div class="order-sum">
                    <p>購物金額：${order.order_sum_after} 元</p>
                  </div>
                  <div class="order-details">
                    <button class="btn--show-modal-intransit">詳情</button>
                  </div>
                </div>
                <div order-id = "${order.order_id}" class="modal-intransit hidden">
                  <button class="btn--close-modal-intransit">&times;</button>
                  <h2 class="modal__header">訂單詳情</h2>
                  <p class="modal-sub-header">狀態：${orderStatus}</p>
                  <div class="modal__container">
                    <div class="modal-box1">
                      <ul class="modal-event-details">
                        <li>訂單編號：${order.order_id}</li>
                        <li>訂購日期：${createdDate}</li>
                        <li>購買商品：</li>
                        <div class="order-list no-${order.order_id}">
                          
                        </div>
                        <div class="modal-order-sum">總金額：${order.order_sum_after} 元</div>
                      </ul>
                      <div class="box2">
                        <div class="shipping-info">
                          <div class="cancel-title">
                            <ul>
                              <li>出貨日期：${shippedDate}</li>
                              <li>配送單號：${order.ship_number}</li>
                            </ul>
                          </div>
                        </div>
                        <div class="confirm-buttons-container">
                          <div class="submit-button">
                            <button type="submit" class="submit-confirm-order">
                              確定收貨
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
  cards.insertAdjacentHTML("afterbegin", card2);
};

// DONE ORDERS, STATUS 4
const renderDoneOrders = function (order) {
  let createdDate = formatDate(order.order_created_date, 0);
  let shippedDate = formatDate(order.order_shipped_date, 0);
  let arrivalDate = formatDate(order.order_shipped_date, 3);
  let lastConfirmDate = formatDate(order.order_shipped_date, 7);
  let orderStatus = order.order_status == 3 ? "已收貨" : "已結單";
  let card1 = `
              <div class = "card-done">
                <div class="card-1">
                  <div class="order-status">
                    <p>狀態: ${orderStatus}</p>
                  </div>
                  <div class="order-no">
                    <p>訂單編號: ${order.order_id}</p>
                  </div>
                  <div class="order-date">
                    <p>訂購日期: ${createdDate}</p>
                  </div>
                  <div class="order-sum">
                    <p>購物金額: ${order.order_sum_after} 元</p>
                  </div>
                  <div class="order-details">
                    <button class="btn--show-modal-done">詳情</button>
                  </div>
                </div>
                <div order-id = "${order.order_id}" class="modal-done hidden">
                  <button class="btn--close-modal-done">&times;</button>
                  <h2 class="modal__header">訂單詳情</h2>
                  <p class="modal-sub-header">狀態：已完成</p>
                  <div class="modal__container">
                    <div class="modal-box1">
                      <ul class="modal-event-details">
                        <li>訂單編號：${order.order_id}</li>
                        <li>訂購日期：${createdDate}</li>
                        <li>購買商品：</li>
                        <div class="order-list no-${order.order_id}">
                          
                        </div>
                        <div class="modal-order-sum">總金額：${order.order_sum_after} 元</div>
                      </ul>
                      <div class="box2">
                        <div class="shipping-info">
                          <div class="cancel-title">
                            <ul>
                              <li>出貨日期：${shippedDate}</li>
                              <li>配送單號：${order.ship_number}</li>
                              <li>到貨日期：${arrivalDate}</li>
                              <ul class="notes">
                                <li>若須申請退貨，請於收到商品7天內申請</li>
                                <li>最晚退貨日期：${lastConfirmDate}</li>
                              </ul>
                            </ul>
                          </div>
                        </div>
                        <div class="confirm-buttons-container">
                          <div class="submit-button">
                            <button type="submit" class="submit-confirm-order">
                              確定收貨
                            </button>
                          </div>
                          <div class="submit-button">
                            <button type="submit" class="submit-cancel-order">
                              申請退貨
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              `;
  cards.insertAdjacentHTML("afterbegin", card1);
};

// CANCELLED ORDERS, STATUS 0 & 5 & 6
const renderCancelledOrConfirmedOrders = function (order) {
  let orderStatusStr = function (orderStatus) {
    if (orderStatus == 0) {
      return "取消";
    } else if (orderStatus == 5) {
      return "已結單";
    } else {
      return "退貨";
    }
  };

  let orderStatus = orderStatusStr(order.order_status);
  let createdDate = formatDate(order.order_created_date, 0);
  let card3 = `
              <div class = "card-cancelled">
                <div class="card-3">
                  <div class="order-status">
                    <p>狀態：${orderStatus}</p>
                  </div>
                  <div class="order-no">
                    <p>訂單編號：${order.order_id}</p>
                  </div>
                  <div class="order-date">
                    <p>訂購日期：${createdDate}</p>
                  </div>
                  <div class="order-sum">
                    <p>購物金額：${order.order_sum_after} 元</p>
                  </div>
                  <div class="order-details">
                    <button class="btn--show-modal-returned">詳情</button>
                  </div>
                </div>
                <div order-id = "${order.order_id}" class="modal-returned hidden">
                  <button class="btn--close-modal-returned">&times;</button>
                  <h2 class="modal__header">訂單詳情</h2>
                  <p class="modal-sub-header">狀態：${orderStatus}</p>
                  <div class="modal__container">
                    <div class="modal-box1">
                      <ul class="modal-event-details">
                        <li>訂單編號：${order.order_id}</li>
                        <li>訂購日期：${createdDate}</li>
                        <li>購買商品：</li>
                        <div class="order-list no-${order.order_id}">
                          
                        </div>
                        <div class="modal-order-sum">總金額：${order.order_sum_after} 元</div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              `;
  cards.insertAdjacentHTML("afterbegin", card3);
};

// ORDER DETAILS
const renderOrderDetails = function (orderDetail, orderId, itemNo) {
  let orderItem = document.querySelector(`.no-${orderId}`);
  let html = `
              <a href="../GetProductServlet?productId=${orderDetail.product_id}">
                <ul class="item-${itemNo}">
                  <li class="item-name">品名：${orderDetail.product_name}</li>
                  <li class="item-size">規格：${orderDetail.product_color}${orderDetail.product_size}</li>
                  <li class="item-quantity">數量：${orderDetail.product_quantity}</li>
                  <li class="item-price">單價：${orderDetail.subtotal_price} 元</li>
                </ul>
              </a>
              `;
  orderItem.insertAdjacentHTML("beforeend", html);
};

/////////////////////////////
////// POPULATING PAGE //////
// CARDS
let itemNo = 1;
const allOrders = function () {
  fetch(`/shanshan/memberOrder/findAllOrdersByMemId`)
    .then((body) => body.json())
    .then(async (orders) => {
      for (let order of orders) {
        if (
          order.order_status == 1 ||
          order.order_status == 2 ||
          order.order_status == 3
        ) {
          renderIntransitOrders(order);
          const response = await fetch(
            `/shanshan/memberOrder/findAllOrderDesByMemId?orderId=${order.order_id}`
          );
          const orderDes = await response.json();
          for (let orderDetail of orderDes) {
            itemNo = itemNo == 2 ? 1 : 2;
            renderOrderDetails(orderDetail, order.order_id, itemNo);
          }
        }
        if (order.order_status == 4) {
          renderDoneOrders(order);
          const response = await fetch(
            `/shanshan/memberOrder/findAllOrderDesByMemId?orderId=${order.order_id}`
          );
          // will wait until the above fetch is done before continuing the code below
          const orderDes = await response.json();
          for (let orderDetail of orderDes) {
            // in the case of member 1, there should be two orderDes
            itemNo = itemNo == 2 ? 1 : 2;
            renderOrderDetails(orderDetail, order.order_id, itemNo);
          }
        }
        if (
          order.order_status == 0 ||
          order.order_status == 5 ||
          order.order_status == 6
        ) {
          renderCancelledOrConfirmedOrders(order);
          const response = await fetch(
            `/shanshan/memberOrder/findAllOrderDesByMemId?orderId=${order.order_id}`
          );
          const orderDes = await response.json();
          for (let orderDetail of orderDes) {
            itemNo = itemNo == 2 ? 1 : 2;
            renderOrderDetails(orderDetail, order.order_id, itemNo);
          }
        }
      }
    });
};

// MEMBER DAHSBOARD
const populateMemberDashboard = function () {
  fetch("findMemberById")
    .then((body) => body.json())
    .then((member) => {
      const bytesStr = atob(member.picStr);
      let len = bytesStr.length;
      const u8Array = new Uint8Array(len);
      while (len--) {
        u8Array[len] = bytesStr.charCodeAt(len);
      }
      const blob = new Blob([u8Array]);
      const url = URL.createObjectURL(blob);

      document.querySelector(".member_profile .member_profile_pic").src = url;
      document.querySelector(".member-name-dashboard").textContent =
        member.memberName;
      document.querySelector(".member-username-dashboard").textContent =
        member.memberUsername;
    });
};

window.onload = function () {
  allOrders();
  populateMemberDashboard();
};

///////////////////////////////////////
/////// OPEN & CLOSE MODAL ///////
document.addEventListener("click", function (e) {
  // STATUS 4 (RECEIVED)
  if (e.target.classList.contains("btn--show-modal-done")) {
    let overlayDone = document.querySelector(".overlay-done");

    let parent = e.target.closest(".card-done");
    let modalDone = parent.querySelector(".modal-done");
    let btnCloseModalDone = parent.querySelector(".btn--close-modal-done");

    modalDone.classList.remove("hidden");
    overlayDone.classList.remove("hidden");

    const closeModalDone = function () {
      modalDone.classList.add("hidden");
      overlayDone.classList.add("hidden");
    };

    btnCloseModalDone.addEventListener("click", closeModalDone);
    overlayDone.addEventListener("click", closeModalDone);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modalDone.classList.contains("hidden")) {
        closeModalDone();
      }
    });

    // CONFIRM ORDER
    const btnConfirmOrder = parent.querySelector(".submit-confirm-order");
    btnConfirmOrder.addEventListener("click", function () {
      // change order status to 5 (confirm)
      let orderId = modalDone.getAttribute("order-id");
      let orderStatus = 5;
      fetch(`/shanshan/memberOrder/updateOrderStatusByOrderId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_status: orderStatus,
          order_id: orderId,
        }),
      });
      closeModalDone();
    });

    // CANCEL ORDER
    const btnCancelOrder = parent.querySelector(".submit-cancel-order");
    btnCancelOrder.addEventListener("click", function () {
      // change status to 6 (cancel)
      let orderId = modalDone.getAttribute("order-id");
      let orderStatus = 6;
      fetch(`/shanshan/memberOrder/updateOrderStatusByOrderId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_status: orderStatus,
          order_id: orderId,
        }),
      });
      closeModalDone();
    });
  }

  // 1, 2, 3 (IN TRANSIT)
  if (e.target.classList.contains("btn--show-modal-intransit")) {
    let parent = e.target.closest(".card-intransit");
    let overlay = document.querySelector(".overlay-done");
    const modalIntransit = parent.querySelector(".modal-intransit");
    const btnCloseModalIntransit = parent.querySelector(
      ".btn--close-modal-intransit"
    );

    modalIntransit.classList.remove("hidden");
    overlay.classList.remove("hidden");

    const closeModalIntransit = function () {
      modalIntransit.classList.add("hidden");
      overlay.classList.add("hidden");
    };

    btnCloseModalIntransit.addEventListener("click", closeModalIntransit);
    overlay.addEventListener("click", closeModalIntransit);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modalIntransit.classList.contains("hidden")) {
        closeModalIntransit();
      }
    });

    // CONFIRM ORDER
    const btnConfirmOrder = parent.querySelector(".submit-confirm-order");
    btnConfirmOrder.addEventListener("click", function () {
      // change order status to 4
      let orderId = modalIntransit.getAttribute("order-id");
      let orderStatus = 4;
      fetch(`/shanshan/memberOrder/updateOrderStatusByOrderId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_status: orderStatus,
          order_id: orderId,
        }),
      });
      closeModalIntransit();
    });
  }

  // STATUS 0, 5, 6 (CANCELLED OR CONFRIMED)
  if (e.target.classList.contains("btn--show-modal-returned")) {
    let overlay = document.querySelector(".overlay-done");

    let parent = e.target.closest(".card-cancelled");
    const modalReturned = parent.querySelector(".modal-returned");
    const btnCloseModalReturned = parent.querySelector(
      ".btn--close-modal-returned"
    );
    modalReturned.classList.remove("hidden");
    overlay.classList.remove("hidden");

    const closeModalReturned = function () {
      modalReturned.classList.add("hidden");
      overlay.classList.add("hidden");
    };

    btnCloseModalReturned.addEventListener("click", closeModalReturned);
    overlay.addEventListener("click", closeModalReturned);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modalReturned.classList.contains("hidden")) {
        closeModalReturned();
      }
    });
  }
});

///////////////////////////////////////
/////// SORT BY STATUS ///////
// RECEIVED ORDERS
receivedOrdersBtn.addEventListener("click", function () {
  cards.innerHTML = "";
  fetch(`/shanshan/memberOrder/findAllOrdersByMemId`)
    .then((body) => body.json())
    .then(async (orders) => {
      for (let order of orders) {
        if (order.order_status == 4) {
          renderDoneOrders(order);
          const response = await fetch(
            `/shanshan/memberOrder/findAllOrderDesByMemId?orderId=${order.order_id}`
          );
          // will wait until the above fetch is done before continuing the code below
          const orderDes = await response.json();
          for (let orderDetail of orderDes) {
            // in the case of member 1, there should be two orderDes
            itemNo = itemNo == 2 ? 1 : 2;
            renderOrderDetails(orderDetail, order.order_id, itemNo);
          }
        } else {
          continue;
        }
      }
    });
});

// IN TRANSIT ORDERS
intransitOrdersBtn.addEventListener("click", function () {
  cards.innerHTML = "";
  fetch(`/shanshan/memberOrder/findAllOrdersByMemId`)
    .then((body) => body.json())
    .then(async (orders) => {
      for (let order of orders) {
        if (
          order.order_status == 1 ||
          order.order_status == 2 ||
          order.order_status == 3
        ) {
          renderIntransitOrders(order);
          const response = await fetch(
            `/shanshan/memberOrder/findAllOrderDesByMemId?orderId=${order.order_id}`
          );
          const orderDes = await response.json();
          for (let orderDetail of orderDes) {
            itemNo = itemNo == 2 ? 1 : 2;
            renderOrderDetails(orderDetail, order.order_id, itemNo);
          }
        } else {
          continue;
        }
      }
    });
});

cancelledOrDoneOrdersBtn.addEventListener("click", function () {
  fetch(`/shanshan/memberOrder/findAllOrdersByMemId`)
    .then((body) => body.json())
    .then(async (orders) => {
      for (let order of orders) {
        if (
          order.order_status == 0 ||
          order.order_status == 5 ||
          order.order_status == 6
        ) {
          renderCancelledOrConfirmedOrders(order);
          const response = await fetch(
            `/shanshan/memberOrder/findAllOrderDesByMemId?orderId=${order.order_id}`
          );
          const orderDes = await response.json();
          for (let orderDetail of orderDes) {
            itemNo = itemNo == 2 ? 1 : 2;
            renderOrderDetails(orderDetail, order.order_id, itemNo);
          }
        } else {
          continue;
        }
      }
    });
});
