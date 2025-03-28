// orval.config.ts
import { defineConfig } from 'orval';

export default defineConfig({
    demoApi: {
        input: './openapi.yaml',
        output: {
            mode: 'tags-split', // or 'single' for a single file
            target: './src/api/__generated__',
            schemas: './src/api/__generated__/schemas',
            client: 'react-query',
            override: {
                mutator: {
                    path: './src/api/customFetcher.ts',
                    name: 'customFetcher',
                },
            },
        },
    },
});