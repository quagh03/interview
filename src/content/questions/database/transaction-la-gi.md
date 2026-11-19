---
title: "Transaction là gì?"
topic: "Database"
section: "Transaction, ACID và cô lập"
level: mid
tags: ["Transaction","ACID"]
order: 176
---

- Một nhóm câu lệnh `BEGIN` … `COMMIT` hoặc `ROLLBACK`.
- Trong Spring, `@Transactional` mở transaction ở đầu method và commit khi method trả về bình thường. Runtime exception mặc định gây rollback.
