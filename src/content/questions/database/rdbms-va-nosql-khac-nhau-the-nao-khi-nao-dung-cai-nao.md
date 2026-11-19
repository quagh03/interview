---
title: "RDBMS và NoSQL khác nhau thế nào? Khi nào dùng cái nào?"
topic: "Database"
section: "Database cơ bản"
level: junior
tags: ["Schema"]
order: 136
---

- RDBMS (MySQL, PostgreSQL): dữ liệu dạng bảng, quan hệ qua khóa, ràng buộc và transaction ACID. Hợp thanh toán, đơn hàng, số dư, dữ liệu cần nhất quán ngay.
- NoSQL (Redis, MongoDB, Cassandra): schema linh hoạt hoặc tối ưu một kiểu truy cập. Hợp cache, log, dữ liệu đổi schema liên tục, ghi rất lớn và chấp nhận eventual consistency.
- Trong backend Java, nguồn sự thật của nghiệp vụ thường là RDBMS. Redis đứng cạnh để cache và khóa phân tán, không thay transaction của database.
