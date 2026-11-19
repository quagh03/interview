---
title: "Quy trình khi một câu SQL chậm?"
topic: "Database"
section: "Tối ưu câu SQL"
level: senior
tags: ["Tối ưu SQL"]
order: 180
---

- Lấy câu SQL thật, kể cả tham số. Đo thời gian database riêng khỏi thời gian ứng dụng.
- `EXPLAIN` / `EXPLAIN ANALYZE`: full scan, filesort, temporary, ước lượng lệch thực tế.
- Đối chiếu index với cột trong `WHERE`, `JOIN`, `ORDER BY`. Sửa hàm bọc cột, lệch kiểu, `SELECT *`, `OFFSET` sâu.
- Nhìn số dòng sau từng JOIN. Aggregate bảng con trước nếu đang bị nhân bản ghi.
- Bật slow query log để bắt câu lặp lại, không tối ưu từ một lần chạy tay.
