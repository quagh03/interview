---
title: "`CHAR`, `VARCHAR` và `TEXT` khác nhau thế nào?"
topic: "Database"
section: "Database cơ bản"
level: junior
tags: ["Schema"]
order: 141
---

- `CHAR(n)`: độ dài cố định, phù hợp mã ngắn có độ dài ổn định (`country_code`).
- `VARCHAR(n)`: độ dài thay đổi, kiểu mặc định cho chuỗi nghiệp vụ.
- `TEXT`: chuỗi rất dài. Không nên index cả cột. Không dùng để lưu file; lưu đường dẫn object storage.
