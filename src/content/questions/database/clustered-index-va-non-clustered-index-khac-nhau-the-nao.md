---
title: "Clustered Index và Non-clustered Index khác nhau thế nào?"
topic: "Database"
section: "Index"
level: mid
tags: ["Index","B-Tree"]
order: 150
---

- Clustered: lá của cây chính là dữ liệu bảng, sắp theo khóa. InnoDB mỗi bảng có một clustered index, mặc định là Primary Key. Không khai báo khóa thì InnoDB tự tạo khóa ẩn.
- Non-clustered (secondary): cây riêng. Lá chứa key của index cộng con trỏ tới dòng; ở InnoDB con trỏ đó là Primary Key.
- Vì vậy Primary Key nên ngắn, tăng dần và ổn định (`BIGINT` identity hoặc snowflake). Khóa ngẫu nhiên kiểu UUID phiên bản 4 làm insert phân tán khắp cây và phân mảnh.
