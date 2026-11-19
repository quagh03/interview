---
title: "Bốn mức Isolation?"
topic: "Database"
section: "Transaction, ACID và cô lập"
level: mid
tags: ["Transaction","Isolation","ACID"]
order: 177
---

- Read Uncommitted: được đọc dữ liệu chưa commit. Hầu như không dùng.
- Read Committed: chỉ đọc dữ liệu đã commit. Đọc lại cùng một dòng vẫn có thể thấy giá trị mới. PostgreSQL mặc định mức này.
- Repeatable Read: các lần đọc cùng một dòng trong một transaction thấy cùng giá trị. MySQL InnoDB mặc định mức này và dùng next-key lock nên phantom cũng bị chặn trong nhiều trường hợp.
- Serializable: giao dịch chạy như lần lượt. An toàn nhất, tranh chấp và chờ khóa nhiều nhất.
