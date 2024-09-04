import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';


// Load environment variables based on the current environment
const envFiles = {
    development: '.env.local',
    production: '.env.prod',
};

dotenv.config({ path: envFiles[process.env.NODE_ENV] });

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    publicDir: 'public', // Include assets directory
    build: {
        outDir: 'dist',
        // Change the output directory if needed
        minify: true, // Enable minification for production
    },
})
