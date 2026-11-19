# 1. Java Core

### OOP và kiến thức cơ bản

1. Java có những tính chất đặc trưng nào của lập trình hướng đối tượng?
2. Phân biệt Abstraction và Encapsulation.
3. Phân biệt Abstract Class và Interface.
4. Overloading và Overriding khác nhau như thế nào?
5. Java có hỗ trợ đa kế thừa không? Vì sao?
6. Từ khóa `static` có ý nghĩa gì?
7. Phân biệt `final`, `finally` và `finalize`.
8. Constructor là gì? Có thể override constructor không?
9. Phân biệt `==` và `equals()`.
10. Vì sao phải override `hashCode()` khi override `equals()`?
11. Java truyền tham số theo Pass by Value hay Pass by Reference?
12. String Pool là gì?
13. Tại sao String trong Java là immutable?
14. Phân biệt String, StringBuilder và StringBuffer.
15. Checked Exception và Unchecked Exception khác nhau thế nào?

### Collections Framework

1. Phân biệt List, Set và Map.
2. ArrayList và LinkedList khác nhau như thế nào?
3. HashMap hoạt động như thế nào bên trong?
4. HashMap xử lý collision như thế nào?
5. HashMap và Hashtable khác nhau thế nào?
6. ConcurrentHashMap hoạt động như thế nào?
7. HashSet hoạt động dựa trên cấu trúc dữ liệu nào?
8. TreeMap và HashMap khác nhau thế nào?
9. Khi nào nên sử dụng LinkedHashMap?
10. Fail-fast và Fail-safe Iterator là gì?
11. Tại sao không nên sử dụng mutable object làm key của HashMap?
12. Nếu hai object có cùng hashCode nhưng khác equals thì điều gì xảy ra?

### Java 8+

1. Lambda Expression là gì?
2. Functional Interface là gì?
3. Stream API là gì?
4. Phân biệt `map()` và `flatMap()`.
5. Phân biệt `filter()` và `map()`.
6. Phân biệt `findFirst()` và `findAny()`.
7. Intermediate Operation và Terminal Operation là gì?
8. Stream có thể sử dụng nhiều lần không?
9. Optional dùng để làm gì?
10. Method Reference là gì?
11. Default Method trong Interface là gì?
12. CompletableFuture là gì?
13. Parallel Stream hoạt động như thế nào? Có nên sử dụng mọi lúc không?

### Multithreading & Concurrency

1. Process và Thread khác nhau như thế nào?
2. Thread có những trạng thái nào?
3. Phân biệt `synchronized` và `volatile`.
4. Race Condition là gì?
5. Deadlock là gì? Làm sao để tránh?
6. Thread Pool là gì?
7. ExecutorService hoạt động như thế nào?
8. Callable và Runnable khác nhau thế nào?
9. Future và CompletableFuture khác nhau thế nào?
10. AtomicInteger hoạt động như thế nào?
11. ReentrantLock khác synchronized thế nào?
12. CountDownLatch và CyclicBarrier khác nhau thế nào?
13. Java Memory Model là gì?
14. ThreadLocal dùng để làm gì? Có nguy cơ memory leak không?

# 2. JVM và Memory Management

1. JVM, JRE và JDK khác nhau như thế nào?
2. JVM Memory Model gồm những vùng nào?
3. Heap và Stack khác nhau thế nào?
4. Object được lưu ở đâu khi khởi tạo bằng `new`?
5. Garbage Collection là gì?
6. GC hoạt động như thế nào?
7. Phân biệt Young Generation và Old Generation.
8. Minor GC, Major GC và Full GC là gì?
9. Các thuật toán Garbage Collection phổ biến?
10. G1GC hoạt động như thế nào?
11. Memory Leak trong Java có thể xảy ra không?
12. OutOfMemoryError và StackOverflowError khác nhau thế nào?
13. ClassLoader là gì?
14. Parent Delegation Model là gì?
15. Làm thế nào để debug khi ứng dụng Java bị tăng memory liên tục?

# 3. Spring Framework và Spring Boot

2. Introduction to the Spring Framework

40+ Spring Interview Questions And Answers (2024)

How does auto-configuration work in Spring Boot? | by Soma | Javarevisited | Medium

### Spring Core

1. Spring Framework là gì?
2. Dependency Injection (DI) là gì?
3. Inversion of Control (IoC) là gì?
4. Bean trong Spring là gì?
5. Spring Container hoạt động như thế nào?
6. Bean có những Scope nào?
7. Singleton Bean có thread-safe không?
8. Phân biệt `@Component`, `@Service`, `@Repository`, `@Controller`.
9. `@Autowired` hoạt động như thế nào?
10. Constructor Injection và Field Injection khác nhau thế nào?
11. `@Qualifier` và `@Primary` dùng để làm gì?
12. Bean Lifecycle trong Spring diễn ra như thế nào?
13. `@PostConstruct` và `@PreDestroy` có tác dụng gì?
14. Circular Dependency là gì? Spring xử lý như thế nào?
15. ApplicationContext và BeanFactory khác nhau thế nào?

### Spring Boot

1. Spring Boot giải quyết vấn đề gì?
2. Spring Boot khác Spring Framework như thế nào?
3. `@SpringBootApplication` bao gồm những annotation nào?
4. Auto Configuration hoạt động như thế nào?
5. Starter Dependency là gì?
6. Spring Boot Profiles dùng để làm gì?
7. Phân biệt `application.properties` và `application.yml`.
8. `@Configuration` và `@Bean` dùng để làm gì?
9. `@ConditionalOnProperty` hoạt động như thế nào?
10. Spring Boot Actuator là gì?
11. Spring Boot DevTools dùng để làm gì?
12. Làm thế nào để custom Auto Configuration?
13. Spring Boot khởi động ứng dụng theo quy trình nào?

### Spring MVC & REST API

1. Spring MVC hoạt động như thế nào?
2. DispatcherServlet là gì?
3. Request đi qua những thành phần nào khi gọi một REST API?
4. `@RestController` và `@Controller` khác nhau thế nào?
5. `@RequestParam`, `@PathVariable`, `@RequestBody` khác nhau thế nào?
6. `@RequestMapping` và `@GetMapping` khác nhau thế nào?
7. ResponseEntity dùng để làm gì?
8. `@ControllerAdvice` và `@ExceptionHandler` hoạt động như thế nào?
9. Làm thế nào để validate request trong Spring?
10. `@Valid` và `@Validated` khác nhau thế nào?
11. Filter và Interceptor khác nhau thế nào?
12. CORS là gì? Cấu hình CORS trong Spring Boot như thế nào?
13. Làm sao để upload và download file?
14. RESTful API cần tuân thủ những nguyên tắc nào?

# 4. Spring Data JPA & Hibernate

🤯 @Cacheable vs First Level Cache vs Second Level Cache — Explained

[linkedin.com](<https://www.linkedin.com/pulse/cacheable-vs-first-level-cache-second-explained-saumya-garg-07rmf?utm_source=chatgpt.com>)

1. JPA và Hibernate khác nhau thế nào?
2. ORM là gì?
3. Entity là gì?
4. Persistence Context là gì?
5. Entity Lifecycle gồm những trạng thái nào?
6. Phân biệt `persist()`, `merge()`, `save()` và `saveAndFlush()`.
7. Lazy Loading và Eager Loading là gì?
8. N+1 Query Problem là gì? Cách giải quyết?
9. FetchType.LAZY và FetchType.EAGER khác nhau thế nào?
10. First Level Cache và Second Level Cache là gì?
11. Dirty Checking hoạt động như thế nào?
12. `@Transactional` hoạt động như thế nào?
13. Propagation trong Transaction là gì?
14. Isolation Level là gì?
15. `REQUIRED` và `REQUIRES_NEW` khác nhau thế nào?
16. Rollback Transaction xảy ra khi nào?
17. Tại sao gọi một method có `@Transactional` từ method khác trong cùng class có thể không hoạt động như mong đợi?
18. `@OneToOne`, `@OneToMany`, `@ManyToOne`, `@ManyToMany` khác nhau thế nào?
19. Cascade Type là gì?
20. `orphanRemoval` là gì?
21. JPQL và Native Query khác nhau thế nào?
22. Pagination và Sorting trong Spring Data JPA?
23. Optimistic Lock và Pessimistic Lock khác nhau thế nào?
24. `@Version` có tác dụng gì?

# 5. Database và SQL

### Database cơ bản

1. RDBMS và NoSQL khác nhau thế nào? Khi nào dùng cái nào?
   - RDBMS (MySQL, PostgreSQL): dữ liệu dạng bảng, quan hệ qua khóa, ràng buộc và transaction ACID. Hợp thanh toán, đơn hàng, số dư, dữ liệu cần nhất quán ngay.
   - NoSQL (Redis, MongoDB, Cassandra): schema linh hoạt hoặc tối ưu một kiểu truy cập. Hợp cache, log, dữ liệu đổi schema liên tục, ghi rất lớn và chấp nhận eventual consistency.
   - Trong backend Java, nguồn sự thật của nghiệp vụ thường là RDBMS. Redis đứng cạnh để cache và khóa phân tán, không thay transaction của database.

2. Schema, Table, Row và Column là gì?
   - Schema: nhóm các bảng, view, index của một miền dữ liệu.
   - Table: một thực thể, ví dụ `users`, `orders`.
   - Row: một bản ghi. Column: một thuộc tính của bản ghi.
   - Ứng dụng nói chuyện với database bằng SQL. ORM (JPA/Hibernate) sinh SQL, không bỏ được mô hình bảng.

3. Primary Key, Foreign Key, Unique, `NOT NULL` và `CHECK` khác nhau thế nào?
   - Primary Key: định danh duy nhất một dòng, không `NULL`, mỗi bảng một khóa. InnoDB dùng khóa này làm clustered index.
   - Unique: các giá trị không trùng, nhưng được phép nhiều `NULL` (hành vi chính xác tùy engine). Unique không đóng vai trò định danh dòng.
   - Foreign Key: cột trỏ tới Primary Key (hoặc Unique) của bảng khác. Database từ chối dòng mồ côi nếu không khai báo `ON DELETE` phù hợp.
   - `NOT NULL`: cột bắt buộc có giá trị. `CHECK`: giá trị phải thỏa biểu thức, ví dụ `balance >= 0`.

4. `NULL` nghĩa là gì? Vì sao `NULL = NULL` không ra TRUE?
   - `NULL` là "không có giá trị", không phải chuỗi rỗng và không phải 0.
   - So sánh với `NULL` cho kết quả UNKNOWN, không phải TRUE. Điều kiện `WHERE` chỉ giữ dòng TRUE, nên dòng UNKNOWN bị loại.
   - Kiểm tra bằng `IS NULL` / `IS NOT NULL`. Gộp giá trị null bằng `COALESCE(col, 0)`.
   - `NOT IN (1, NULL)` gần như không trả dòng nào, vì so sánh với `NULL` thành UNKNOWN. Muốn phủ định an toàn thì dùng `NOT EXISTS`.

5. Chuẩn hóa 1NF, 2NF, 3NF là gì? Khi nào denormalize?
   - 1NF: mỗi ô một giá trị, không nhét danh sách vào một cột.
   - 2NF: không có cột phụ thuộc vào một phần của khóa tổ hợp. Ví dụ bảng điểm `(student_id, course_id)` thì tên sinh viên không được đứng ở đây.
   - 3NF: cột không khóa không phụ thuộc lẫn nhau. Thành phố không nên suy ra từ cột mã bưu điện nằm cùng bảng khách hàng nếu mã bưu điện không phải khóa.
   - Denormalize khi đọc áp đảo ghi và JOIN quá đắt: lưu `customer_name` trên `orders`, lưu bảng tổng hợp doanh thu theo ngày. Phải chấp nhận cập nhật nhiều chỗ và có cách đồng bộ.

6. `CHAR`, `VARCHAR` và `TEXT` khác nhau thế nào?
   - `CHAR(n)`: độ dài cố định, phù hợp mã ngắn có độ dài ổn định (`country_code`).
   - `VARCHAR(n)`: độ dài thay đổi, kiểu mặc định cho chuỗi nghiệp vụ.
   - `TEXT`: chuỗi rất dài. Không nên index cả cột. Không dùng để lưu file; lưu đường dẫn object storage.

7. `DELETE`, `TRUNCATE` và `DROP` khác nhau thế nào?
   - `DELETE`: xóa từng dòng, chạy trigger, ghi log từng dòng, có `WHERE`, rollback được trong transaction. Chậm trên bảng lớn.
   - `TRUNCATE`: xóa toàn bộ dữ liệu, reset identity ở nhiều engine, ít log hơn, thường không chạy trigger từng dòng. Implicit commit ở MySQL.
   - `DROP`: xóa luôn cấu trúc bảng, index, constraint.

8. View là gì?
   - Câu `SELECT` được đặt tên. Truy vấn view là chạy lại câu đó, dữ liệu không được lưu riêng (trừ materialized view).
   - Dùng để che bớt cột nhạy cảm hoặc đóng gói một JOIN cố định. View phức tạp lồng nhau làm optimizer khó đọc và khó index.

9. Stored Procedure có nên dùng trong Spring Boot không?
   - Procedure nhét nghiệp vụ vào database: khó review, khó test, khó version cùng code Java.
   - Hợp tác vụ sát dữ liệu, xử lý theo lô lớn ngay trong DB. Nghiệp vụ API thông thường nên nằm ở service, database giữ ràng buộc và SQL.

10. SQL Injection là gì? Cách phòng tránh?
    - Người dùng chèn SQL vào input, ví dụ `' OR '1'='1`, để đổi nghĩa câu lệnh.
    - Dùng prepared statement / bind parameter (`?`, `:id`). JPA và `JdbcTemplate` bind sẵn nếu không nối chuỗi.
    - Không nối input vào `ORDER BY`, tên cột, tên bảng. Nếu bắt buộc động, map qua whitelist.
    - Quyền DB của ứng dụng chỉ đủ dùng: không cấp `DROP`, không dùng account admin.

### Index

Index là cấu trúc phụ, thường là B-Tree, để tìm dòng theo giá trị cột mà không quét cả bảng. Mỗi `INSERT`, `UPDATE`, `DELETE` phải sửa thêm index, nên index là đánh đổi giữa đọc nhanh và ghi chậm hơn.

1. Index hoạt động như thế nào?
   - Không có index: full table scan, đọc lần lượt, khoảng O(n).
   - B-Tree: chia khoảng giá trị theo từng tầng. Tìm một giá trị hoặc một khoảng (`>`, `<`, `BETWEEN`) khoảng O(log n).
   - InnoDB lưu dòng của bảng trên clustered index của Primary Key. Secondary index không giữ cả dòng; leaf của nó giữ giá trị khóa phụ và Primary Key. Database dò secondary index rồi lookup tiếp sang clustered index.

2. Khi nào nên tạo Index?
   - Cột lặp lại trong `WHERE`, `JOIN`, `ORDER BY`, `GROUP BY`.
   - Cột chọn lọc cao: nhiều giá trị khác nhau, ví dụ `email`, `order_code`, `user_id`.
   - Foreign key, để JOIN và kiểm tra ràng buộc không phải quét bảng.
   - Cặp cột của một màn hình cụ thể: danh sách đơn của một user theo thời gian.

3. Khi nào không tạo Index?
   - Bảng vài trăm dòng: scan rẻ hơn chi phí dò cây.
   - Cột ít giá trị (`status` chỉ có 2–3 trạng thái) nếu không đứng cùng cột chọn lọc cao.
   - Cột hầu như không nằm trong điều kiện lọc nhưng bị cập nhật liên tục.
   - Index mới có leftmost prefix trùng index đã tồn tại.

4. Nhiều Index gây hại gì?
   - Ghi chậm vì mỗi lần sửa phải cân bằng lại nhiều cây.
   - Chiếm disk và bộ nhớ buffer pool, dữ liệu nóng bị đẩy ra.
   - Optimizer có thêm plan để chọn sai.

5. Clustered Index và Non-clustered Index khác nhau thế nào?
   - Clustered: lá của cây chính là dữ liệu bảng, sắp theo khóa. InnoDB mỗi bảng có một clustered index, mặc định là Primary Key. Không khai báo khóa thì InnoDB tự tạo khóa ẩn.
   - Non-clustered (secondary): cây riêng. Lá chứa key của index cộng con trỏ tới dòng; ở InnoDB con trỏ đó là Primary Key.
   - Vì vậy Primary Key nên ngắn, tăng dần và ổn định (`BIGINT` identity hoặc snowflake). Khóa ngẫu nhiên kiểu UUID phiên bản 4 làm insert phân tán khắp cây và phân mảnh.

6. B-Tree Index là gì? Khác Hash Index thế nào?
   - B-Tree cân bằng, mỗi node chứa nhiều key. Hỗ trợ `=`, range, prefix `LIKE 'abc%'`, và `ORDER BY` đúng chiều key.
   - Hash Index chỉ tốt cho `=`. Không range, không sort. Không phải index mặc định của MySQL/PostgreSQL.

7. Composite Index là gì? Vì sao thứ tự cột quan trọng?
   - Một index trên nhiều cột, ví dụ `(user_id, created_at)`.
   - Leftmost prefix: index này phục vụ `user_id = ?` và `user_id = ? AND created_at > ?`. Chỉ có `created_at` thì không đi được từ gốc cây này.
   - Cột so sánh bằng (`=`, `IN`) đặt trước. Cột range hoặc cột `ORDER BY` đặt sau. Range ở cột giữa sẽ chặn các cột phía sau dùng index.
   - Ví dụ danh sách đơn: `WHERE user_id = ? AND status = ? ORDER BY created_at DESC` hợp index `(user_id, status, created_at)`.

8. Covering Index là gì?
   - Mọi cột query cần đã nằm trong index, database không lookup về bảng.
   - `INDEX (user_id, status)` phủ được `SELECT status FROM orders WHERE user_id = ?`.
   - `EXPLAIN` của MySQL hiện `Using index` trong cột Extra khi đó là covering index.

9. Những cách viết khiến Index bị bỏ qua?
   - Bọc cột bằng hàm: `WHERE YEAR(created_at) = 2024`, `WHERE LOWER(email) = 'a@b.com'`. Sửa thành range `created_at >= '2024-01-01' AND created_at < '2025-01-01'`, hoặc lưu sẵn cột đã chuẩn hóa.
   - `LIKE '%abc'`. `LIKE 'abc%'` vẫn dùng được B-Tree.
   - Lệch kiểu: cột số so với chuỗi, cột thời gian so với pattern không cùng kiểu. Bind đúng kiểu ở JDBC.
   - `OR` trên hai cột khác nhau. Cân nhắc `UNION ALL` mỗi nhánh một index.
   - `!=`, `NOT IN`, `NOT LIKE` thường không thu hẹp được khoảng trên cây.
   - Điều kiện đúng rất ít dòng nhưng query trả gần hết bảng: optimizer chọn scan vì lookup từng dòng còn đắt hơn.

10. Cardinality, Selectivity và statistics là gì?
    - Cardinality: số giá trị khác nhau của cột hoặc của index.
    - Selectivity: phần dòng bị loại bởi điều kiện. Càng chọn lọc, index càng có lợi.
    - Optimizer dựa vào statistics. Thống kê cũ làm nó ước lượng sai và bỏ index. Chạy `ANALYZE` sau khi nạp dữ liệu lớn hoặc phân phối thay đổi mạnh.

11. Đọc `EXPLAIN` như thế nào?
    - `type = ALL`: full scan. `type = ref` / `range` / `eq_ref`: đang đi theo index. `rows`: số dòng ước lượng, không phải số dòng trả về cho client.
    - Extra đáng chú ý: `Using filesort` (phải sắp riêng), `Using temporary` (bảng tạm cho `GROUP BY`/`DISTINCT`), `Using index` (covering).
    - `EXPLAIN` là plan dự kiến. `EXPLAIN ANALYZE` chạy câu lệnh và báo thời gian cùng số dòng thật. Ước lượng và thực tế lệch xa thì xem lại statistics hoặc dữ liệu lệch.

### Câu lệnh SELECT

Thứ tự logic khi thực thi một câu `SELECT`, khác thứ tự các mệnh đề được viết:

`FROM` (gồm `JOIN`) → `WHERE` → `GROUP BY` → `HAVING` → window function → `SELECT` → `DISTINCT` → `ORDER BY` → `LIMIT` / `OFFSET`

Vì `SELECT` chạy sau `WHERE` và `GROUP BY`, alias trong `SELECT` không dùng được ở `WHERE`. Alias dùng được ở `ORDER BY`.

1. Vì sao hạn chế `SELECT *`?
   - Kéo cột thừa qua network và vào bộ nhớ ứng dụng.
   - Khó thành covering index.
   - Thêm cột ở bảng làm đổi dữ liệu trả về mà code không chủ đích.
   - JOIN nhiều bảng dễ trùng tên cột, mapping ORM hoặc `ResultSet` lấy nhầm.

2. `WHERE` và `HAVING` khác nhau thế nào?
   - `WHERE` lọc từng dòng trước khi gom nhóm, không dùng hàm aggregate.
   - `HAVING` lọc sau `GROUP BY`, nên viết được `HAVING COUNT(*) > 1` hoặc `HAVING SUM(amount) > 1000`.
   - Điều kiện lọc được bằng `WHERE` thì để ở `WHERE`, để nhóm ít dòng hơn.

3. `DISTINCT` khác `GROUP BY` thế nào?
   - `DISTINCT` bỏ các dòng trùng trên đúng các cột đang chọn.
   - `GROUP BY` dùng khi cần gom rồi tính `COUNT`, `SUM`, `AVG`, `MAX`.
   - `SELECT DISTINCT a, b` gần với `GROUP BY a, b` khi không có aggregate, nhưng `GROUP BY` nói rõ ý định gom nhóm.

4. `UNION` và `UNION ALL` khác nhau thế nào?
   - `UNION` gộp rồi loại trùng, phải sort hoặc hash.
   - `UNION ALL` nối kết quả, giữ dòng trùng, rẻ hơn. Dùng khi hai nhánh đã loại trừ nhau hoặc cần giữ trùng.

5. `IN` và `EXISTS` khác nhau thế nào?
   - `IN (subquery)` so giá trị cột với một tập.
   - `EXISTS` hỏi subquery có ít nhất một dòng không, và có thể dừng ở dòng khớp đầu tiên.
   - `NOT IN` gặp `NULL` trong tập con sẽ loại hết kết quả. `NOT EXISTS` không dính bẫy này.
   - Tập giá trị nhỏ, cố định thì `IN (:ids)` ổn. Tập lớn hoặc cần tương quan theo dòng ngoài thì `EXISTS` hoặc JOIN.

6. Subquery và JOIN chọn thế nào?
   - Cần cột của cả hai bảng: JOIN, kèm index trên cột nối.
   - Chỉ cần biết "có hay không": `EXISTS`.
   - Scalar subquery trong danh sách `SELECT` chạy theo từng dòng ngoài và dễ thành N+1 ở mức SQL. Gom một lần bằng JOIN hoặc CTE rồi mới tính.

7. `GROUP BY` và `ONLY_FULL_GROUP_BY` là gì?
   - Gom các dòng cùng giá trị để tính aggregate: số đơn theo user, doanh thu theo ngày.
   - `ONLY_FULL_GROUP_BY`: cột có trong `SELECT` mà không nằm trong hàm aggregate thì phải có trong `GROUP BY`. Tắt mode này sẽ lấy một giá trị bất kỳ của cột không gom, kết quả không xác định.

8. `COUNT(*)`, `COUNT(col)` và `COUNT(DISTINCT col)` khác nhau thế nào?
   - `COUNT(*)` đếm dòng, kể cả dòng toàn `NULL`.
   - `COUNT(col)` bỏ dòng có `col` là `NULL`.
   - `COUNT(DISTINCT col)` đếm số giá trị khác nhau, tốn bộ nhớ hơn vì phải khử trùng.
   - `COUNT(*)` không đếm "số dòng không null của một cột". Cần ý đó thì đếm đúng cột.

9. Window function khác `GROUP BY` thế nào?
   - `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `SUM() OVER (PARTITION BY ...)` tính trên cửa sổ nhưng vẫn giữ từng dòng.
   - `GROUP BY` sụt còn một dòng mỗi nhóm.
   - Lấy đơn mới nhất của mỗi user: `ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC)` rồi lọc `rn = 1`. `RANK` giữ đồng hạng; `ROW_NUMBER` luôn duy nhất trong partition.

10. Phân trang `LIMIT` / `OFFSET` và keyset pagination?
    - `LIMIT 20 OFFSET 100000` vẫn phải đọc và bỏ 100.000 dòng phía trước. Trang càng sâu càng chậm, và bị trùng hoặc mất dòng nếu có insert mới trong lúc chuyển trang.
    - Keyset: nhớ mốc trang trước, `WHERE (created_at, id) < (:lastCreatedAt, :lastId) ORDER BY created_at DESC, id DESC LIMIT 20`. Cần index đúng cụm cột sort.
    - Offset hợp trang đầu và tập nhỏ. Dữ liệu lớn, cuộn vô hạn thì dùng keyset.

### JOIN

JOIN ghép dòng của hai bảng theo một điều kiện. Số dòng ra phụ thuộc loại JOIN và quan hệ một-một hay một-nhiều. Một user có nhiều order thì INNER JOIN ra nhiều dòng cho cùng user đó.

1. Có những loại JOIN nào?
   - `INNER JOIN`: chỉ cặp khớp cả hai phía.
   - `LEFT JOIN`: giữ mọi dòng bảng trái. Bảng phải không khớp thì các cột phải là `NULL`.
   - `RIGHT JOIN`: giữ mọi dòng bảng phải. Cùng nghĩa với LEFT JOIN nếu đổi chỗ hai bảng. Viết LEFT để chiều "bảng chính" luôn nằm bên trái.
   - `FULL OUTER JOIN`: giữ dòng không khớp của cả hai phía. MySQL không có cú pháp này; mô phỏng bằng LEFT JOIN cộng phần bên phải không khớp, rồi `UNION`.
   - `CROSS JOIN`: mọi cặp giữa hai bảng. Quên điều kiện JOIN cũng ra tích Descartes và làm nổ số dòng.
   - Self JOIN: một bảng ghép với chính nó qua alias, ví dụ nhân viên với quản lý.

2. INNER JOIN và LEFT JOIN khác nhau ở kết quả nào?
   - INNER loại dòng trái không có cặp.
   - LEFT giữ dòng trái. Muốn "bên trái chưa có bên phải" thì thêm `AND right_table.id IS NULL`.
   - Đếm user kể cả user chưa có đơn phải dùng LEFT JOIN. INNER JOIN làm mất user chưa mua.

3. Điều kiện đặt ở `ON` hay `WHERE`?
   - `ON` quyết định hai dòng có ghép được không.
   - INNER JOIN: đưa điều kiện sang `WHERE` không đổi kết quả.
   - LEFT JOIN: điều kiện của bảng phải đặt ở `WHERE` sẽ xóa các dòng trái bị `NULL`, JOIN biến thành INNER.
   - Muốn vừa giữ mọi dòng trái vừa chỉ ghép một phần dòng phải: đặt điều kiện bảng phải trong `ON`.

```sql
-- Giữ mọi user. User không có order ACTIVE vẫn có mặt, cột order là NULL.
SELECT u.id, o.id
FROM users u
LEFT JOIN orders o
  ON o.user_id = u.id
 AND o.status = 'ACTIVE';

-- Chỉ còn user có ít nhất một order ACTIVE.
SELECT u.id, o.id
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.status = 'ACTIVE';
```

4. Database JOIN bằng thuật toán nào?
   - Nested Loop: lấy từng dòng phía ngoài, dò phía trong. Nhanh khi phía trong có index trên cột JOIN.
   - Hash Join: dựng bảng băm từ phía nhỏ, dò phía lớn. Hợp equi-join (`=`) khi không có index phù hợp. PostgreSQL và MySQL 8 trở đi dùng được.
   - Merge Join: hai phía đã sắp theo khóa thì trộn một lượt. Hợp khoảng dữ liệu lớn đã có index đúng thứ tự.
   - Việc chọn plan là của optimizer. Index trên cột `ON` của phía trong là cách làm Nested Loop rẻ.

5. Nhiều JOIN một-nhiều thì kết quả phình thế nào?
   - `users → orders → order_items`: một user thành rất nhiều dòng. `COUNT` hoặc `SUM` trực tiếp trên kết quả này bị tính trùng.
   - Gom bảng con trước, rồi JOIN kết quả đã còn một dòng mỗi khóa:

```sql
SELECT u.id, COALESCE(s.total_amount, 0) AS total_amount
FROM users u
LEFT JOIN (
    SELECT user_id, SUM(amount) AS total_amount
    FROM orders
    GROUP BY user_id
) s ON s.user_id = u.id;
```

6. Self JOIN dùng lúc nào?
   - Cùng bảng, vai trò khác nhau: `employees e JOIN employees m ON e.manager_id = m.id`.
   - Tìm cặp trùng: JOIN bảng với chính nó theo cột nghi trùng, kèm `a.id < b.id` để mỗi cặp chỉ ra một lần.
   - So hai mốc của cùng một khóa: đơn sau và đơn ngay trước của một user.

7. `USING` khác `ON` thế nào?
   - `ON a.user_id = b.id`: tường minh, hai cột khác tên vẫn viết được.
   - `USING (user_id)`: hai bảng cùng tên cột, kết quả chỉ giữ một cột `user_id`.

8. JOIN và N+1 gặp nhau ở đâu?
   - Một câu lấy danh sách cha, rồi mỗi phần tử cha phát một câu lấy con: N+1.
   - Một câu JOIN lấy hết cặp cha-con, hoặc một câu `IN` theo tập id cha, rồi ghép trong bộ nhớ ứng dụng.
   - JOIN trả sản phẩm Cartesian khi một cha có nhiều con ở hai collection. Hibernate thường tách query (`@BatchSize`, fetch riêng từng bag) để tránh nhân dòng.

### Transaction, ACID và cô lập

1. ACID là gì?
   - Atomicity: các bước cùng commit hoặc cùng rollback. Chuyển tiền trừ A và cộng B là một đơn vị.
   - Consistency: ràng buộc (khóa, `CHECK`, foreign key) đúng trước và sau giao dịch.
   - Isolation: giao dịch đồng thời không nhìn thấy trạng thái dở của nhau theo mức cô lập đã chọn.
   - Durability: commit xong thì còn sau sự cố, nhờ write-ahead log được ghi xuống đĩa trước khi trả thành công.

2. Transaction là gì?
   - Một nhóm câu lệnh `BEGIN` … `COMMIT` hoặc `ROLLBACK`.
   - Trong Spring, `@Transactional` mở transaction ở đầu method và commit khi method trả về bình thường. Runtime exception mặc định gây rollback.

3. Bốn mức Isolation?
   - Read Uncommitted: được đọc dữ liệu chưa commit. Hầu như không dùng.
   - Read Committed: chỉ đọc dữ liệu đã commit. Đọc lại cùng một dòng vẫn có thể thấy giá trị mới. PostgreSQL mặc định mức này.
   - Repeatable Read: các lần đọc cùng một dòng trong một transaction thấy cùng giá trị. MySQL InnoDB mặc định mức này và dùng next-key lock nên phantom cũng bị chặn trong nhiều trường hợp.
   - Serializable: giao dịch chạy như lần lượt. An toàn nhất, tranh chấp và chờ khóa nhiều nhất.

4. Dirty Read, Non-repeatable Read và Phantom Read là gì?
   - Dirty Read: đọc bản chưa commit, bản đó có thể bị rollback. Xảy ra ở Read Uncommitted.
   - Non-repeatable Read: trong một transaction, đọc lại cùng một dòng ra giá trị khác vì transaction khác đã commit `UPDATE`.
   - Phantom Read: cùng một `WHERE`, lần sau thấy thêm hoặc mất dòng vì transaction khác đã commit `INSERT` hoặc `DELETE`.

5. Lost Update là gì?
   - Hai transaction cùng đọc số dư 100, mỗi bên ghi một kết quả tính từ 100, một lần cập nhật biến mất.
   - Cách xử lý sát dữ liệu: `UPDATE accounts SET balance = balance - :amount WHERE id = :id AND balance >= :amount`. Số dòng cập nhật bằng 0 thì không đủ tiền hoặc không tồn tại.
   - Hoặc khóa dòng `SELECT ... FOR UPDATE` trong transaction. Hoặc optimistic lock bằng cột `version`: `UPDATE ... SET balance = ?, version = version + 1 WHERE id = ? AND version = ?`.

### Tối ưu câu SQL

1. Quy trình khi một câu SQL chậm?
   - Lấy câu SQL thật, kể cả tham số. Đo thời gian database riêng khỏi thời gian ứng dụng.
   - `EXPLAIN` / `EXPLAIN ANALYZE`: full scan, filesort, temporary, ước lượng lệch thực tế.
   - Đối chiếu index với cột trong `WHERE`, `JOIN`, `ORDER BY`. Sửa hàm bọc cột, lệch kiểu, `SELECT *`, `OFFSET` sâu.
   - Nhìn số dòng sau từng JOIN. Aggregate bảng con trước nếu đang bị nhân bản ghi.
   - Bật slow query log để bắt câu lặp lại, không tối ưu từ một lần chạy tay.

2. Vì sao đã có Index mà query vẫn chậm?
   - Index không phủ đúng leftmost prefix của điều kiện thực tế.
   - Điều kiện khớp quá nhiều dòng, optimizer chọn scan hoặc chọn index rồi lookup hàng triệu dòng.
   - Phải `filesort` / tạo bảng tạm vì `ORDER BY` và `GROUP BY` không trùng thứ tự index.
   - Khóa ngoại và index phụ làm một giao dịch ghi chờ lock. Chậm do chờ, không phải do thiếu index.
   - Statistics cũ, hoặc lần đầu gọi phải đọc dữ liệu từ đĩa vì chưa nằm trong buffer pool.

3. Bảng 10 triệu dòng, một query mất 5 giây thì xử lý thế nào?
   - Xem plan trước, không thêm index cảm tính.
   - Thu hẹp cột trả về và điều kiện lọc. Index đúng cụm `(điều kiện bằng, cột sort)`.
   - Bỏ `OFFSET` lớn. Tách báo cáo sang bảng tổng hợp hoặc replica đọc.
   - Nếu vẫn phải quét phần lớn bảng thì index không cứu được; đổi cách truy cập (lọc theo ngày, partition, bảng archive).

4. Tìm bản ghi trùng?

```sql
SELECT email, COUNT(*) AS dup
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

5. Nhiều request cùng cập nhật một tài khoản thì tránh lost update thế nào?
   - Một câu `UPDATE` có điều kiện số dư, kiểm tra số dòng bị ảnh hưởng.
   - Không đọc số dư lên ứng dụng rồi ghi đè bằng giá trị đã tính ở JVM.
   - Giữ transaction ngắn. Khóa hàng theo cùng một thứ tự nếu một luồng sửa nhiều tài khoản, để tránh deadlock.

6. Thiết kế database cho thương mại điện tử, những bảng và index cốt lõi?
   - `users (id PK, email UNIQUE)`.
   - `products (id PK)`, `inventory (product_id PK, quantity)` để trừ kho bằng một câu `UPDATE` có điều kiện.
   - `orders (id PK, user_id, status, created_at)` với index `(user_id, created_at)` và `(status, created_at)` nếu vận hành lọc theo trạng thái.
   - `order_items (id PK, order_id, product_id, quantity, price)` với index `(order_id)`. Giá lưu trên dòng đơn, không lấy giá hiện tại của sản phẩm.
   - `payments (id PK, order_id, idempotency_key UNIQUE, status)` để request thanh toán lặp không trừ tiền hai lần.
   - Đơn đã chốt là dữ liệu lịch sử: tên, giá, địa chỉ tại thời điểm mua được sao vào đơn. Đổi catalog sau này không được đổi đơn cũ.

# 6. Spring Security và Authentication

1. Authentication và Authorization khác nhau thế nào?
2. Spring Security hoạt động như thế nào?
3. Security Filter Chain là gì?
4. JWT là gì?
5. JWT gồm những thành phần nào?
6. Access Token và Refresh Token khác nhau thế nào?
7. JWT có được mã hóa không?
8. Làm sao để revoke JWT?
9. OAuth 2.0 là gì?
10. OAuth 2.0 và OpenID Connect khác nhau thế nào?
11. Role-Based Access Control (RBAC) là gì?
12. Password nên được mã hóa như thế nào?
13. BCrypt hoạt động như thế nào?
14. CSRF là gì?
15. CORS và CSRF khác nhau thế nào?
16. Làm thế nào để phân quyền theo API?
17. Làm thế nào để xử lý token hết hạn?

# 7. Backend Architecture và System Design

What Are The Main Components Of Microservices at Lavon Sotelo blog

Client-Server Architecture Explained

Must-Know Software Architecture Patterns

1. Monolithic và Microservices khác nhau thế nào?
2. Khi nào nên sử dụng Microservices?
3. Ưu và nhược điểm của Microservices?
4. API Gateway là gì?
5. Service Discovery là gì?
6. Load Balancer là gì?
7. Reverse Proxy là gì?
8. Horizontal Scaling và Vertical Scaling khác nhau thế nào?
9. Stateless và Stateful Service là gì?
10. Distributed System là gì?
11. CAP Theorem là gì?
12. Event-Driven Architecture là gì?
13. Synchronous và Asynchronous Communication khác nhau thế nào?
14. Circuit Breaker Pattern là gì?
15. Retry Pattern là gì?
16. Saga Pattern là gì?
17. CQRS là gì?
18. Eventual Consistency là gì?
19. Idempotency là gì?
20. Rate Limiting là gì?

### Câu hỏi System Design thực tế

- Thiết kế hệ thống đăng nhập và xác thực người dùng.
- Thiết kế hệ thống E-commerce.
- Thiết kế hệ thống đặt vé xem phim.
- Thiết kế hệ thống chuyển tiền giữa hai tài khoản.
- Thiết kế hệ thống thông báo Notification.
- Thiết kế hệ thống URL Shortener.
- Thiết kế hệ thống Chat Real-time.
- Thiết kế hệ thống quản lý đơn hàng.
- Thiết kế hệ thống xử lý hàng triệu request mỗi ngày.

# 8. Redis, Kafka và Message Queue

### Redis

1. Redis là gì? Tại sao Redis nhanh?
2. Redis hỗ trợ những kiểu dữ liệu nào?
3. Redis Cache hoạt động như thế nào?
4. Cache Aside Pattern là gì?
5. Write Through và Write Behind khác nhau thế nào?
6. Cache Invalidation là gì?
7. Cache Penetration, Cache Breakdown và Cache Avalanche là gì?
8. Redis Persistence gồm những cơ chế nào?
9. Redis Pub/Sub là gì?
10. Redis Distributed Lock hoạt động như thế nào?
11. Redis có thể sử dụng để chống duplicate request không?

### Kafka / RabbitMQ

1. Message Queue là gì?
2. Kafka và RabbitMQ khác nhau thế nào?
3. Producer và Consumer là gì?
4. Kafka Topic và Partition là gì?
5. Consumer Group là gì?
6. Offset là gì?
7. Kafka đảm bảo thứ tự message như thế nào?
8. At-most-once, At-least-once và Exactly-once là gì?
9. Dead Letter Queue là gì?
10. Retry Message nên được thiết kế như thế nào?
11. Làm thế nào tránh xử lý một message nhiều lần?
12. Kafka có thể đảm bảo exactly-once end-to-end không?

# 9. Docker, Linux, Git và CI/CD

1. Docker là gì?
2. Docker Image và Container khác nhau thế nào?
3. Dockerfile là gì?
4. Docker Compose dùng để làm gì?
5. Docker Volume là gì?
6. Kubernetes giải quyết vấn đề gì?
7. Pod, Deployment và Service trong Kubernetes là gì?
8. Linux process và thread khác nhau thế nào?
9. Các lệnh Linux thường dùng để kiểm tra CPU, RAM?
10. Làm sao kiểm tra port đang được sử dụng?
11. Làm thế nào để xem log ứng dụng?
12. Git merge và rebase khác nhau thế nào?
13. Git cherry-pick là gì?
14. CI/CD là gì?
15. Blue-Green Deployment và Rolling Deployment khác nhau thế nào?

# 10. Câu hỏi tình huống thực tế Backend

Đây là nhóm câu hỏi rất quan trọng vì nhà tuyển dụng thường muốn biết bạn có thực sự từng làm backend hay chỉ học lý thuyết.

1. API của bạn đột nhiên response mất 5 giây thay vì 200ms. Bạn debug thế nào?
2. Một API bị gọi liên tục khiến database quá tải. Bạn xử lý thế nào?
3. Hai người dùng cùng mua sản phẩm cuối cùng trong kho. Làm sao đảm bảo chỉ một người mua thành công?
4. Client gửi request thanh toán nhiều lần do timeout. Làm sao tránh trừ tiền nhiều lần?
5. Một service gọi sang service khác bị timeout. Bạn xử lý thế nào?
6. Làm sao để đảm bảo dữ liệu không bị mất khi ứng dụng restart?
7. Nếu một transaction thực hiện 5 bước và bước thứ 4 thất bại thì xử lý thế nào?
8. Làm sao xử lý một API trả về 100.000 records?
9. Làm sao xử lý memory leak trong ứng dụng Spring Boot?
10. Làm sao xử lý khi Kafka Consumer bị lag?
11. Nếu Redis bị down thì hệ thống của bạn hoạt động thế nào?
12. Làm sao bảo vệ API trước lượng request tăng đột biến?
13. Làm thế nào để log và trace một request xuyên qua nhiều Microservices?
14. Làm thế nào đảm bảo hai service cập nhật dữ liệu nhất quán?
15. Nếu production bị lỗi nhưng local không tái hiện được thì bạn làm gì?

# 11. Bài tập coding thường gặp

| Bài tập | Độ khó |
| --- | --- |
| Đảo ngược String | Easy |
| Kiểm tra chuỗi Palindrome | Easy |
| Tìm phần tử trùng lặp trong Array | Easy |
| Tìm số xuất hiện nhiều nhất | Easy |
| Tìm Two Sum | Easy |
| Kiểm tra Anagram | Easy |
| Tìm phần tử lớn thứ 2 | Easy |
| Implement LRU Cache | Medium |
| Implement Thread-safe Singleton | Medium |
| Producer-Consumer Problem | Medium |
| Merge Intervals | Medium |
| Tìm Longest Substring Without Repeating Characters | Medium |
| Implement Rate Limiter | Hard |
| Thiết kế Concurrent HashMap đơn giản | Hard |

# 12. Lộ trình ôn phỏng vấn đề xuất

Nếu mục tiêu là Java Backend Developer, mình đề xuất thứ tự ưu tiên:

1. Java Core + Collections
   OOP, String, HashMap, Exception, Stream API.
   Ưu tiên cao
2. Spring Boot + Spring MVC
   DI, IoC, Bean Lifecycle, REST API, Exception Handling.
   Ưu tiên cao
3. JPA + Hibernate + SQL
   Transaction, N+1, Index, Locking, Query Optimization.
   Ưu tiên cao
4. Spring Security + JWT
   Authentication, Authorization, OAuth2.
   Ưu tiên tiếp theo
5. Redis + Kafka + Microservices
   Caching, Messaging, Distributed System.
   Ưu tiên tiếp theo
6. System Design + Concurrency
   Scalability, Thread Pool, Distributed Lock, Idempotency.