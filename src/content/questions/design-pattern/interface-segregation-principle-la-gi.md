---
title: "Interface Segregation Principle là gì?"
topic: "Design Pattern"
section: "SOLID"
level: junior
tags: ["SOLID","ISP"]
order: 304
---

- Interface chia theo client, không gom mọi việc vào một chỗ.
- `Worker` có `work()`, `eat()`, `sleep()` thì class robot phải để `eat()` rỗng. Đó là interface phình.
- Tách `Workable` và `Feedable`. Test cũng đỡ phải stub những method không liên quan.
