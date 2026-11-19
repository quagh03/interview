---
title: "Thiết kế database cho thương mại điện tử, những bảng và index cốt lõi?"
topic: "Database"
section: "Tối ưu câu SQL"
level: senior
tags: ["Tối ưu SQL","Index"]
order: 185
---

- `users (id PK, email UNIQUE)`.
- `products (id PK)`, `inventory (product_id PK, quantity)` để trừ kho bằng một câu `UPDATE` có điều kiện.
- `orders (id PK, user_id, status, created_at)` với index `(user_id, created_at)` và `(status, created_at)` nếu vận hành lọc theo trạng thái.
- `order_items (id PK, order_id, product_id, quantity, price)` với index `(order_id)`. Giá lưu trên dòng đơn, không lấy giá hiện tại của sản phẩm.
- `payments (id PK, order_id, idempotency_key UNIQUE, status)` để request thanh toán lặp không trừ tiền hai lần.
- Đơn đã chốt là dữ liệu lịch sử: tên, giá, địa chỉ tại thời điểm mua được sao vào đơn. Đổi catalog sau này không được đổi đơn cũ.
