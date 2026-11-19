---
title: "Primary Key, Foreign Key, Unique, `NOT NULL` và `CHECK` khác nhau thế nào?"
topic: "Database"
section: "Database cơ bản"
level: junior
tags: ["Schema"]
order: 138
---

- Primary Key: định danh duy nhất một dòng, không `NULL`, mỗi bảng một khóa. InnoDB dùng khóa này làm clustered index.
- Unique: các giá trị không trùng, nhưng được phép nhiều `NULL` (hành vi chính xác tùy engine). Unique không đóng vai trò định danh dòng.
- Foreign Key: cột trỏ tới Primary Key (hoặc Unique) của bảng khác. Database từ chối dòng mồ côi nếu không khai báo `ON DELETE` phù hợp.
- `NOT NULL`: cột bắt buộc có giá trị. `CHECK`: giá trị phải thỏa biểu thức, ví dụ `balance >= 0`.
