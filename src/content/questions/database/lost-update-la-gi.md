---
title: "Lost Update là gì?"
topic: "Database"
section: "Transaction, ACID và cô lập"
level: senior
tags: ["Transaction","ACID","Lost update"]
order: 179
---

- Hai transaction cùng đọc số dư 100, mỗi bên ghi một kết quả tính từ 100, một lần cập nhật biến mất.
- Cách xử lý sát dữ liệu: `UPDATE accounts SET balance = balance - :amount WHERE id = :id AND balance >= :amount`. Số dòng cập nhật bằng 0 thì không đủ tiền hoặc không tồn tại.
- Hoặc khóa dòng `SELECT ... FOR UPDATE` trong transaction. Hoặc optimistic lock bằng cột `version`: `UPDATE ... SET balance = ?, version = version + 1 WHERE id = ? AND version = ?`.
