# Kiwiburn Constitution

Draft constitution for Kiwiburn Incorporated under the Incorporated Societies Act 2022.

The constitution itself lives in [`kiwiburn-constitution.md`](kiwiburn-constitution.md).

## Building the PDF

The `publish/` tool renders the constitution as a styled A4 PDF with a Kiwiburn cover page.

Requires Node.js 24+ (runs TypeScript natively) and pnpm.

```sh
cd publish
pnpm install
pnpm run publish
```

This writes `kiwiburn-constitution.pdf` next to the markdown file. PDFs are gitignored.

To render a different file or output path:

```sh
pnpm run publish <input.md> <output.pdf>
```

## Making changes

Edit `kiwiburn-constitution.md` and open a pull request. Keep the draft line under the title current (e.g. `Draft v2 - <date>`) — it appears on the PDF cover and page header.
