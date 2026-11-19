import { defineConfig } from 'astro/config';

// Đổi `site` thành https://<username>.github.io trước khi bật GitHub Pages.
// `base` là tên repository. Ví dụ repo `interview` thì giữ `/interview`.
export default defineConfig({
  site: 'https://example.github.io',
  base: '/interview',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
    },
  },
});
