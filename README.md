# Interview

Ngân hàng câu hỏi phỏng vấn Java backend. Site tĩnh, build bằng Astro, host được trên GitHub Pages.

## Chạy local

```bash
npm install
npm run dev
```

Mở `http://localhost:4321/interview/`.

Danh sách nằm bên trái, nội dung câu hỏi mở ngay bên phải. Mỗi nhóm, ví dụ DI & IoC, được gập lại; bấm tên nhóm để xổ câu hỏi. Độ khó và nhóm câu hỏi cũng có menu xổ xuống. Ô vuông cạnh mỗi câu đánh dấu đã học. Vòng tròn ở đầu mỗi chủ đề đếm số câu đã học. Dữ liệu này nằm trong trình duyệt, không ghi lên server.

**Thêm câu hỏi** và **Sửa** mở editor Markdown toàn màn hình, có bản xem trước và sơ đồ Mermaid. **Lưu** commit file Markdown lên GitHub. **Xóa** cũng commit việc xóa file. Lần đầu chưa có token, trang hỏi token, chủ repo, tên repo và nhánh, rồi giữ trong trình duyệt. Token không được ghi vào project.

Commit dùng đúng một dạng:

- thêm: `docs(questions): add "tiêu đề"`
- sửa: `docs(questions): update "tiêu đề"`
- xóa: `docs(questions): remove "tiêu đề"`

## Thêm một câu hỏi

1. Copy `src/content/questions/_template.md` vào thư mục topic, ví dụ `src/content/questions/database/ten-cau.md`.
2. Sửa `title`, `topic`, `section`, `level` (`intern`, `junior`, `mid`, `senior`) và `tags`. Tag đầu tiên là nhóm hiển thị trong topic. Các tag sau dùng để lọc.
3. Đặt `order` lớn hơn số `order` cao nhất đang có, để câu mới nằm cuối danh sách.
4. Viết câu trả lời bên dưới frontmatter. Khối code cần tên ngôn ngữ: ` ```java `, ` ```sql `, ` ```json `, ` ```yaml `.
5. `topic` chỉ được là một trong các giá trị: Java Core, JVM, Spring, JPA & Hibernate, Database, Security, System Design, Redis & Kafka, DevOps, Tình huống, Coding.

File `_template.md` không được đưa vào trang. Xóa một câu hỏi bằng cách xóa file Markdown của câu đó rồi commit.

`new.md` là bản lưu gốc. `node scripts/import-new-md.mjs` sinh lại toàn bộ file câu hỏi và ghi đè chỉnh sửa thủ công trong các thư mục topic. Chỉ chạy lại khi muốn nhập lại từ đầu.

## GitHub Pages

Repo này không chứa GitHub token, PAT hay deploy key. Đừng commit `.env` hoặc file khóa.

Workflow dùng `GITHUB_TOKEN` do GitHub tự cấp lúc chạy, không phải một key ghi trong source.

1. Trong `astro.config.mjs`, đổi `site` thành `https://<username>.github.io` và `base` thành `/<tên-repo>`.
2. Push nhánh `main`. Nếu máy chưa đăng nhập GitHub, dùng key của bạn ngay trong phiên lệnh đó. Không ghi key vào project.
3. Trên GitHub: Settings, Pages, Build and deployment, Source: GitHub Actions.
