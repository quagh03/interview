---
title: "Dirty Read, Non-repeatable Read và Phantom Read là gì?"
topic: "Database"
section: "Transaction, ACID và cô lập"
level: mid
tags: ["Transaction","Isolation","ACID"]
order: 178
---

- Dirty Read: đọc bản chưa commit, bản đó có thể bị rollback. Xảy ra ở Read Uncommitted.
- Non-repeatable Read: trong một transaction, đọc lại cùng một dòng ra giá trị khác vì transaction khác đã commit `UPDATE`.
- Phantom Read: cùng một `WHERE`, lần sau thấy thêm hoặc mất dòng vì transaction khác đã commit `INSERT` hoặc `DELETE`.
