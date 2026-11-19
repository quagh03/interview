---
title: "SQL Injection là gì? Cách phòng tránh?"
topic: "Database"
section: "Database cơ bản"
level: mid
tags: ["SQL Injection"]
order: 145
---

- Người dùng chèn SQL vào input, ví dụ `' OR '1'='1`, để đổi nghĩa câu lệnh.
- Dùng prepared statement / bind parameter (`?`, `:id`). JPA và `JdbcTemplate` bind sẵn nếu không nối chuỗi.
- Không nối input vào `ORDER BY`, tên cột, tên bảng. Nếu bắt buộc động, map qua whitelist.
- Quyền DB của ứng dụng chỉ đủ dùng: không cấp `DROP`, không dùng account admin.
