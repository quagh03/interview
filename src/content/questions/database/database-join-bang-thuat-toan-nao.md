---
title: "Database JOIN bằng thuật toán nào?"
topic: "Database"
section: "JOIN"
level: mid
tags: ["JOIN"]
order: 170
---

- Nested Loop: lấy từng dòng phía ngoài, dò phía trong. Nhanh khi phía trong có index trên cột JOIN.
- Hash Join: dựng bảng băm từ phía nhỏ, dò phía lớn. Hợp equi-join (`=`) khi không có index phù hợp. PostgreSQL và MySQL 8 trở đi dùng được.
- Merge Join: hai phía đã sắp theo khóa thì trộn một lượt. Hợp khoảng dữ liệu lớn đã có index đúng thứ tự.
- Việc chọn plan là của optimizer. Index trên cột `ON` của phía trong là cách làm Nested Loop rẻ.
