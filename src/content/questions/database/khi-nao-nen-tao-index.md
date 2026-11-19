---
title: "Khi nào nên tạo Index?"
topic: "Database"
section: "Index"
level: mid
tags: ["Index"]
order: 147
---

- Cột lặp lại trong `WHERE`, `JOIN`, `ORDER BY`, `GROUP BY`.
- Cột chọn lọc cao: nhiều giá trị khác nhau, ví dụ `email`, `order_code`, `user_id`.
- Foreign key, để JOIN và kiểm tra ràng buộc không phải quét bảng.
- Cặp cột của một màn hình cụ thể: danh sách đơn của một user theo thời gian.
