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
    // build: {
    //     rollupOptions: {
    //         external: [
    //             'assets/css/app.min.css',
    //             'assets/css/preloader.min.css',
    //             'assets/css/bootstrap.min.css',
    //             'assets/css/icons.min.css',
    //             'assets/libs/jquery/jquery.min.js',
    //             'assets/libs/bootstrap/js/bootstrap.bundle.min.js',
    //             'assets/libs/metismenu/metisMenu.min.js',
    //             'assets/libs/simplebar/simplebar.min.js',
    //             'assets/libs/node-waves/waves.min.js',
    //             'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js',
    //             'assets/libs/pace-js/pace.min.js',
    //             'assets/libs/apexcharts/apexcharts.min.js',
    //             'assets/libs/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.min.js',
    //             'assets/libs/admin-resources/jquery.vectormap/maps/jquery-jvectormap-world-mill-en.js',
    //         ]
    //     }
    // }
    
})


