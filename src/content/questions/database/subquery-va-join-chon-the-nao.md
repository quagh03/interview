---
title: "Subquery và JOIN chọn thế nào?"
topic: "Database"
section: "Câu lệnh SELECT"
level: junior
tags: ["SELECT","JOIN"]
order: 162
---

- Cần cột của cả hai bảng: JOIN, kèm index trên cột nối.
- Chỉ cần biết "có hay không": `EXISTS`.
- Scalar subquery trong danh sách `SELECT` chạy theo từng dòng ngoài và dễ thành N+1 ở mức SQL. Gom một lần bằng JOIN hoặc CTE rồi mới tính.
