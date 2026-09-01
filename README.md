# BC2 Sell-through Report

Power BI-style seasonal product report prototype built with React 18, strict TypeScript, Vite, and Recharts. The interface preserves Power BI interaction patterns while applying Wizeline and Weis visual identity.

## Commands

```bash
npm install
npm run dev
npm run build
npm run test
npm run lint
```

## Password gate

The report is wrapped in a client-side password screen. The initial demo password is `BC2demo`. You may override it locally or in Vercel:

```bash
VITE_ACCESS_PASSWORD=BC2demo
```

For Vercel, add `VITE_ACCESS_PASSWORD` under **Project Settings → Environment Variables** for the environments you deploy, then redeploy. Access is remembered in `sessionStorage` and can be cleared with the **Lock** button in the report header.

This gate is appropriate only for controlling access to a demo. Vite embeds `VITE_` variables in the browser bundle, so it does not protect sensitive data from a determined user. For real security, enable Vercel Deployment Protection or move authentication and protected data behind a server-side session.

## Data map

- `src/data/domain.ts`: domain types.
- `src/data/season.ts`: current and previous seasons, price ranges, item detail, and rankings.
- `src/data/report.ts`: coverage metadata, monthly purchases, categories, and FEB mix.
- `src/lib/weekly.ts`: declared logistic reconstruction of weekly curves.
- `src/lib/metrics.ts`: derived measures and totals.
- `src/lib/projection.ts`: pure scenario engine and calculated calibration.
- `src/lib/sellThru.ts`: risk thresholds.
- `src/lib/format.ts`: consistent currency, unit, and percentage formatting.

## Recording coverage

| Status | Pages |
|---|---|
| Full | Purch Trend Overview YoY; Purchase Trend by Cat; Purchase Category vs FEB; Scan Data Matrix - Overview; Dynamic Projection Model; Scan Combo Graph; Scan Price Range - Suggested; Top 10 Percent |
| Partial | Scan by Week |
| None | Customer Select; Purch This Year; Scan Data KPI's; Side by Side - Scan Categories; Top 10 Dollars; Scan by item by wk; Showroom Purchases; Purchases by SubCat/Brand; Purchases by Port; By Week YOY; Showroom Scan Data |

`Purchase Detail` y `Scan Data Summary` are full drill-through pages and do not appear in the original Pages pane. `none` pages show an inference and missing data; the `partial` page distinguishes reconstructed values from observed points.

## Replacing hardcoded data with a real source

Keep `SubcategoryRow`, `PriceRangeRow`, and `ItemRow` as contracts at the application boundary. Add an adapter in `src/data/` that converts source responses into these types and validates numbers, nulls, dates, and names before exposing them to pages. URLs and credentials must use Vite environment variables and must never be committed to the repository.

To keep visuals independent from transport, the adapter should return the same collections currently exported by `season.ts`. Replace static imports with a query hook that models `loading`, `error`, and `success`. Keep derived measures in `lib/`: the API should provide facts, not calculated percentages. Add contract tests with anonymized fixtures and compare control totals before enabling the source in production. For large datasets, add item-detail pagination and server-side aggregation while keeping the projection engine pure for immediate local scenarios.
