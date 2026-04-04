import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true, // Gör att 'describe', 'it', 'expect' finns tillgängliga globalt (som i Jest)
        environment: 'node',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html']
        }
    }
});
