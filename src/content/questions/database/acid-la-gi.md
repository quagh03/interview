---
title: "ACID là gì?"
topic: "Database"
section: "Transaction, ACID và cô lập"
level: mid
tags: ["Transaction","ACID"]
order: 175
---

- Atomicity: các bước cùng commit hoặc cùng rollback. Chuyển tiền trừ A và cộng B là một đơn vị.
- Consistency: ràng buộc (khóa, `CHECK`, foreign key) đúng trước và sau giao dịch.
- Isolation: giao dịch đồng thời không nhìn thấy trạng thái dở của nhau theo mức cô lập đã chọn.
- Durability: commit xong thì còn sau sự cố, nhờ write-ahead log được ghi xuống đĩa trước khi trả thành công.
