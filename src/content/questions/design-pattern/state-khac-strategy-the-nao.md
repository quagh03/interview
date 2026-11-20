---
title: "State khác Strategy thế nào?"
topic: "Design Pattern"
section: "Behavioral"
level: mid
tags: ["Behavioral","State"]
order: 316
---

- Cả hai đều đổi hành vi bằng một object khác.
- State: trạng thái hiện tại quyết định việc được phép làm, và tự chuyển sang state kế tiếp. `Pending` sang `Paid` là đổi object state bên trong `Order`.
- Strategy: phía gọi chọn thuật toán. Thuật toán không tự đổi trạng thái của context.
- `if (status == ...)` nằm rải nhiều method là dấu hiệu nên tách State.
