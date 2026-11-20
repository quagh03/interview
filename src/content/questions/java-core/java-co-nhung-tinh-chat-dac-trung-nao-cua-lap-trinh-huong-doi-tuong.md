---
title: "Java có những tính chất đặc trưng nào của lập trình hướng đối tượng?"
topic: "Java Core"
section: "OOP và kiến thức cơ bản"
level: intern
tags:
  - "OOP"
  - "Chat"
order: 1
---

# 4 tính chất đặc trưng của lập trình hướng đối tượng (OOP) trong Java

Java có 4 tính chất đặc trưng của lập trình hướng đối tượng (OOP – Object-Oriented Programming), bao gồm:

1. Tính đóng gói (Encapsulation).
2. Tính kế thừa (Inheritance).
3. Tính đa hình (Polymorphism).
4. Tính trừu tượng (Abstraction).

# 1. Tính đóng gói (Encapsulation)

## a. Khái niệm

Tính đóng gói là tính chất cho phép gom dữ liệu (thuộc tính) và các phương thức xử lý dữ liệu vào cùng một lớp (class).

Đồng thời, hạn chế quyền truy cập trực tiếp vào dữ liệu từ bên ngoài bằng các từ khóa như:

- `default`: Có thể truy cập trong cùng package.
- `private`: Chỉ được truy cập bên trong lớp.
- `public`: Có thể truy cập từ bên ngoài.
- `protected`: Có thể truy cập trong cùng package và các lớp con theo quy tắc truy cập của Java.

Thông thường, thuộc tính sẽ được khai báo `private`, sau đó sử dụng Getter và Setter để kiểm soát việc đọc và thay đổi dữ liệu.

## b. Code ví dụ
```java
class Student {
    private String name;
    private double score;

    // Constructor
    public Student(String name, double score) {
        this.name = name;
        setScore(score);
    }

    // Getter
    public String getName() {
        return name;
    }

    public double getScore() {
        return score;
    }

    // Setter
    public void setScore(double score) {
        if (score >= 0 && score <= 10) {
            this.score = score;
        } else {
            System.out.println("Invalid score!");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student("An", 8);

        System.out.println(student.getName());
        System.out.println(student.getScore());

        student.setScore(9);
        System.out.println(student.getScore());

        student.setScore(15);
    }
}
```

Kết quả:
```text
An
8.0
9.0
Invalid score!
```

## c. Giải thích code

- `private String name`: Khai báo thuộc tính tên ở chế độ riêng tư, không cho phép truy cập trực tiếp từ bên ngoài lớp.
- `private double score`: Khai báo điểm số ở chế độ riêng tư.
- `getName()` và `getScore()`: Cho phép đọc giá trị thuộc tính.
- `setScore()`: Cho phép thay đổi điểm nhưng phải kiểm tra điều kiện từ 0 đến 10.
- `this.score = score`: Gán giá trị tham số vào thuộc tính của đối tượng hiện tại.

## d. Tại sao phải sử dụng tính đóng gói?

Giả sử chúng ta không sử dụng tính đóng gói mà khai báo:
```java
public double score;
```

Khi đó, bên ngoài có thể thay đổi điểm trực tiếp:
```java
student.score = 100;
student.score = -50;
```

Điều này khiến dữ liệu không hợp lệ.

Khi sử dụng `private` và `setter`, chúng ta có thể kiểm tra dữ liệu trước khi cho phép thay đổi.
```java
private double score;
public setScore(score){
  if (score <= 0){
    // invalid
  }
  this.score = score;
}
```

Lợi ích:

- Bảo vệ dữ liệu khỏi việc thay đổi tùy tiện.
- Kiểm soát quyền truy cập dữ liệu.
- Đảm bảo dữ liệu hợp lệ.
- Giúp chương trình dễ bảo trì và quản lý hơn.

# 2. Tính kế thừa (Inheritance)

## a. Khái niệm

Tính kế thừa là khả năng một lớp con (Subclass) kế thừa các thuộc tính và phương thức của một lớp cha (Superclass).

Trong Java, sử dụng từ khóa `extends` để thực hiện kế thừa.

Lớp con có thể sử dụng lại những thuộc tính và phương thức được kế thừa, đồng thời có thể bổ sung thêm thuộc tính và phương thức riêng.

## b. Code ví dụ
```java
// Parent class
class Person {
    String name;
    int age;

    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}

// Child class
class Student extends Person {
    String studentId;

    public void study() {
        System.out.println("Student is studying");
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();

        student.name = "An";
        student.age = 20;
        student.studentId = "SV001";

        student.displayInfo();
        student.study();
    }
}
```

Kết quả:
```text
Name: An
Age: 20
Student is studying
```

## c. Giải thích code

- `Person`: Là lớp cha, chứa những thuộc tính và phương thức chung của con người.
- `Student extends Person`: Lớp Student kế thừa lớp Person.
- `name`, `age`: Là những thuộc tính được kế thừa từ lớp Person.
- `displayInfo()`: Là phương thức được kế thừa từ lớp Person.
- `study()`: Là phương thức riêng của lớp Student.

Như vậy, lớp Student có thể sử dụng `displayInfo()` mà không cần phải viết lại phương thức này.

## d. Tại sao phải sử dụng tính kế thừa?

Giả sử chương trình có nhiều loại đối tượng:

- Sinh viên.
- Giáo viên.
- Nhân viên.

Tất cả đều có những thuộc tính chung như tên, tuổi, địa chỉ.

Nếu không sử dụng kế thừa, chúng ta phải khai báo lại những thuộc tính và phương thức này trong từng lớp.

Điều đó gây ra:

- Trùng lặp code.
- Khó sửa đổi khi có thay đổi.
- Tốn thời gian phát triển.

Khi sử dụng kế thừa, ta chỉ cần tạo một lớp cha `Person`, sau đó các lớp con kế thừa lại.

Lợi ích:

- Tái sử dụng code.
- Hạn chế trùng lặp.
- Dễ dàng mở rộng chương trình.
- Giúp tổ chức các lớp có mối quan hệ với nhau rõ ràng hơn.

# 3. Tính đa hình (Polymorphism)

## a. Khái niệm

Tính đa hình là khả năng một phương thức có cùng tên hoặc cùng giao diện nhưng có thể thực hiện những hành động khác nhau tùy thuộc vào tham số hoặc đối tượng gọi nó.

Trong Java, đa hình thường được thể hiện qua hai hình thức:

- Overloading (Nạp chồng): Nhiều phương thức cùng tên nhưng khác danh sách tham số.
- Overriding (Ghi đè): Lớp con định nghĩa lại phương thức đã được khai báo ở lớp cha.

## b. Code ví dụ (Overriding)
```java
// Parent class
class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

// Child class
class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof woof");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Meow meow");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal1 = new Dog();
        Animal animal2 = new Cat();

        animal1.makeSound();
        animal2.makeSound();
    }
}
```

Kết quả:
```text
Woof woof
Meow meow
```

## c. Giải thích code

- `Animal`: Là lớp cha, có phương thức `makeSound()`.
- `Dog extends Animal`: Lớp Dog kế thừa lớp Animal.
- `Cat extends Animal`: Lớp Cat kế thừa lớp Animal.
- `@Override`: Đánh dấu phương thức đang ghi đè phương thức của lớp cha.
- `Animal animal1 = new Dog()`: Biến tham chiếu có kiểu Animal nhưng đối tượng thực tế được tạo ra là Dog.
- `Animal animal2 = new Cat()`: Biến tham chiếu có kiểu Animal nhưng đối tượng thực tế được tạo ra là Cat.

Khi gọi `makeSound()`, Java sẽ thực hiện phương thức tương ứng với đối tượng thực tế.

Đây chính là tính đa hình.

## d. Tại sao phải sử dụng tính đa hình?

Giả sử chúng ta có 100 loại động vật khác nhau.

Mỗi loại có cách phát ra âm thanh khác nhau.

Nếu không sử dụng đa hình, chúng ta có thể phải viết nhiều câu lệnh `if-else` để kiểm tra từng loại động vật rồi gọi phương thức tương ứng.

Ví dụ:
```java
if (type.equals("Dog")) {
    System.out.println("Woof woof");
} else if (type.equals("Cat")) {
    System.out.println("Meow meow");
}
```

Khi có thêm nhiều loại động vật, code sẽ ngày càng dài và khó quản lý.

Với đa hình, chúng ta chỉ cần gọi:

```java
animal.makeSound();
```

Java sẽ tự động xác định phương thức phù hợp với đối tượng thực tế.

Lợi ích:

- Giúp code linh hoạt hơn.
- Hạn chế việc sử dụng quá nhiều câu lệnh điều kiện.
- Dễ dàng mở rộng chương trình.
- Cho phép nhiều đối tượng khác nhau sử dụng chung một kiểu tham chiếu.

# 4. Tính trừu tượng (Abstraction)

## a. Khái niệm

Tính trừu tượng là tính chất chỉ tập trung thể hiện những đặc điểm và chức năng cần thiết của đối tượng, đồng thời ẩn đi các chi tiết triển khai bên trong.

Trong Java, tính trừu tượng được thể hiện chủ yếu thông qua:

- Abstract class: Lớp trừu tượng.
- Interface: Giao diện.

## b. Code ví dụ

```java
// Abstract class
abstract class Vehicle {

    // Abstract method
    abstract void move();

    // Normal method
    public void start() {
        System.out.println("Vehicle is starting");
    }
}

// Child class
class Motorbike extends Vehicle {
    @Override
    void move() {
        System.out.println("Motorbike moves on two wheels");
    }
}

class Car extends Vehicle {
    @Override
    void move() {
        System.out.println("Car moves on four wheels");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle motorbike = new Motorbike();

        motorbike.start();
        motorbike.move();

        Vehicle car = new Car();
        car.move();
    }
}
```

Kết quả:
```text
Vehicle is starting
Motorbike moves on two wheels
Car moves on four wheels
```

## c. Giải thích code

- `abstract class Vehicle`: Khai báo lớp trừu tượng Vehicle.
- `abstract void move()`: Khai báo phương thức trừu tượng, chưa có phần triển khai cụ thể.
- `start()`: Là phương thức thông thường, có phần triển khai sẵn.
- `Motorbike extends Vehicle`: Lớp Motorbike kế thừa lớp Vehicle.
- `Car extends Vehicle`: Lớp Car kế thừa lớp Vehicle.
- Hai lớp con phải triển khai phương thức `move()` theo cách riêng của mình.

Lưu ý: Không thể tạo đối tượng trực tiếp từ một abstract class.

Ví dụ sau là không hợp lệ:
```java
Vehicle vehicle = new Vehicle();
```

## d. Tại sao phải sử dụng tính trừu tượng?

Giả sử chúng ta xây dựng một chương trình quản lý phương tiện giao thông.

Tất cả phương tiện đều có chức năng di chuyển, nhưng mỗi phương tiện lại có cách di chuyển khác nhau.

Ví dụ:

- Xe máy di chuyển bằng hai bánh.
- Ô tô di chuyển bằng bốn bánh.
- Máy bay di chuyển bằng cách bay.

Nếu chỉ quan tâm đến chức năng chung, chúng ta không cần biết chi tiết từng phương tiện hoạt động như thế nào.

Ta chỉ cần quy định rằng tất cả phương tiện phải có phương thức `move()`.

Các lớp con sẽ tự triển khai phương thức này theo cách riêng.

Lợi ích:

- Ẩn đi những chi tiết triển khai phức tạp.
- Chỉ tập trung vào những chức năng cần thiết.
- Giúp thiết kế chương trình rõ ràng.
- Buộc các lớp con triển khai những chức năng được quy định.

# 5. Bảng tổng hợp 4 tính chất OOP trong Java

| Tính chất | Khái niệm | Tại sao cần? |
| --- | --- | --- |
| Đóng gói | Bảo vệ và kiểm soát dữ liệu | Tránh dữ liệu bị thay đổi tùy tiện |
| Kế thừa | Lớp con kế thừa lớp cha | Tái sử dụng code, giảm trùng lặp |
| Đa hình | Một giao diện, nhiều cách thực hiện | Code linh hoạt, dễ mở rộng |
| Trừu tượng | Ẩn chi tiết, chỉ thể hiện chức năng cần thiết | Giảm độ phức tạp của chương trình |

# 6. Kết luận

Java có 4 tính chất đặc trưng của lập trình hướng đối tượng:

- Đóng gói: Bảo vệ dữ liệu và kiểm soát việc truy cập dữ liệu.
- Kế thừa: Giúp tái sử dụng thuộc tính và phương thức của lớp cha.
- Đa hình: Giúp một phương thức có thể có nhiều cách thực hiện khác nhau.
- Trừu tượng: Ẩn đi các chi tiết không cần thiết, chỉ thể hiện những chức năng quan trọng.

Đây là 4 nền tảng quan trọng giúp chương trình Java có cấu trúc rõ ràng, dễ bảo trì, dễ mở rộng và tái sử dụng code.
