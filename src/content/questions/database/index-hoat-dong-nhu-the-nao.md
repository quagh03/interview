---
title: "Index hoạt động như thế nào?"
topic: "Database"
section: "Index"
level: mid
tags: ["Index"]
order: 146
---

Index là cấu trúc phụ, thường là B-Tree, để tìm dòng theo giá trị cột mà không quét cả bảng. Mỗi `INSERT`, `UPDATE`, `DELETE` phải sửa thêm index, nên index là đánh đổi giữa đọc nhanh và ghi chậm hơn.

- Không có index: full table scan, đọc lần lượt, khoảng O(n).
- B-Tree: chia khoảng giá trị theo từng tầng. Tìm một giá trị hoặc một khoảng (`>`, `<`, `BETWEEN`) khoảng O(log n).
- InnoDB lưu dòng của bảng trên clustered index của Primary Key. Secondary index không giữ cả dòng; leaf của nó giữ giá trị khóa phụ và Primary Key. Database dò secondary index rồi lookup tiếp sang clustered index.
