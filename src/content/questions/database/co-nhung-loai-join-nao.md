---
title: "Có những loại JOIN nào?"
topic: "Database"
section: "JOIN"
level: junior
tags: ["JOIN"]
order: 167
---

JOIN ghép dòng của hai bảng theo một điều kiện. Số dòng ra phụ thuộc loại JOIN và quan hệ một-một hay một-nhiều. Một user có nhiều order thì INNER JOIN ra nhiều dòng cho cùng user đó.

- `INNER JOIN`: chỉ cặp khớp cả hai phía.
- `LEFT JOIN`: giữ mọi dòng bảng trái. Bảng phải không khớp thì các cột phải là `NULL`.
- `RIGHT JOIN`: giữ mọi dòng bảng phải. Cùng nghĩa với LEFT JOIN nếu đổi chỗ hai bảng. Viết LEFT để chiều "bảng chính" luôn nằm bên trái.
- `FULL OUTER JOIN`: giữ dòng không khớp của cả hai phía. MySQL không có cú pháp này; mô phỏng bằng LEFT JOIN cộng phần bên phải không khớp, rồi `UNION`.
- `CROSS JOIN`: mọi cặp giữa hai bảng. Quên điều kiện JOIN cũng ra tích Descartes và làm nổ số dòng.
- Self JOIN: một bảng ghép với chính nó qua alias, ví dụ nhân viên với quản lý.
