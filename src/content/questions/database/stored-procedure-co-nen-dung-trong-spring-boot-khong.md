---
title: "Stored Procedure có nên dùng trong Spring Boot không?"
topic: "Database"
section: "Database cơ bản"
level: mid
tags: ["SQL Injection"]
order: 144
---

- Procedure nhét nghiệp vụ vào database: khó review, khó test, khó version cùng code Java.
- Hợp tác vụ sát dữ liệu, xử lý theo lô lớn ngay trong DB. Nghiệp vụ API thông thường nên nằm ở service, database giữ ràng buộc và SQL.
