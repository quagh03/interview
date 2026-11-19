---
title: "`GROUP BY` và `ONLY_FULL_GROUP_BY` là gì?"
topic: "Database"
section: "Câu lệnh SELECT"
level: junior
tags: ["SELECT","GROUP BY"]
order: 163
---

- Gom các dòng cùng giá trị để tính aggregate: số đơn theo user, doanh thu theo ngày.
- `ONLY_FULL_GROUP_BY`: cột có trong `SELECT` mà không nằm trong hàm aggregate thì phải có trong `GROUP BY`. Tắt mode này sẽ lấy một giá trị bất kỳ của cột không gom, kết quả không xác định.
