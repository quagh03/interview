---
title: "`IN` và `EXISTS` khác nhau thế nào?"
topic: "Database"
section: "Câu lệnh SELECT"
level: junior
tags: ["SELECT"]
order: 161
---

- `IN (subquery)` so giá trị cột với một tập.
- `EXISTS` hỏi subquery có ít nhất một dòng không, và có thể dừng ở dòng khớp đầu tiên.
- `NOT IN` gặp `NULL` trong tập con sẽ loại hết kết quả. `NOT EXISTS` không dính bẫy này.
- Tập giá trị nhỏ, cố định thì `IN (:ids)` ổn. Tập lớn hoặc cần tương quan theo dòng ngoài thì `EXISTS` hoặc JOIN.
