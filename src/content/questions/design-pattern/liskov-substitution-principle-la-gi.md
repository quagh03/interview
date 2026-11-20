---
title: "Liskov Substitution Principle là gì?"
topic: "Design Pattern"
section: "SOLID"
level: mid
tags: ["SOLID","LSP"]
order: 303
---

- Chỗ nào nhận class cha thì đưa class con vào vẫn đúng hợp đồng.
- Class con không được siết điều kiện đầu vào, không được làm yếu kết quả đầu ra, và không ném exception mà cha không cho phép.
- Vi phạm: `Bird.fly()` rồi `Penguin extends Bird` nhưng `fly()` ném lỗi. Hàm nhận `Bird` bị vỡ.
- Sửa bằng cách tách `Flyable`. Chim cánh cụt không implement interface đó.
