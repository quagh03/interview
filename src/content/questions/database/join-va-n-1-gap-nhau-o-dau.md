---
title: "JOIN và N+1 gặp nhau ở đâu?"
topic: "Database"
section: "JOIN"
level: junior
tags: ["JOIN","N+1"]
order: 174
---

- Một câu lấy danh sách cha, rồi mỗi phần tử cha phát một câu lấy con: N+1.
- Một câu JOIN lấy hết cặp cha-con, hoặc một câu `IN` theo tập id cha, rồi ghép trong bộ nhớ ứng dụng.
- JOIN trả sản phẩm Cartesian khi một cha có nhiều con ở hai collection. Hibernate thường tách query (`@BatchSize`, fetch riêng từng bag) để tránh nhân dòng.
