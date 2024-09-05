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
    // base: '/winpps/' // for production only
    // build: {
    //     rollupOptions: {
    //         external: [
    //             'https://www.mobile-masala.com/winpps/assets/css/app.min.css',
    //             'https://www.mobile-masala.com/winpps/assets/css/preloader.min.css',
    //             'https://www.mobile-masala.com/winpps/assets/css/bootstrap.min.css',
    //             'https://www.mobile-masala.com/winpps/assets/css/icons.min.css',
    //             'https://www.mobile-masala.com/winpps/assets/libs/jquery/jquery.min.js',
    //             'https://www.mobile-masala.com/winpps/assets/libs/bootstrap/js/bootstrap.bundle.min.js',
    //             'https://www.mobile-masala.com/winpps/assets/libs/metismenu/metisMenu.min.js',
    //             'https://www.mobile-masala.com/winpps/assets/libs/simplebar/simplebar.min.js',
    //             'https://www.mobile-masala.com/winpps/assets/libs/node-waves/waves.min.js',
    //             'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js',
    //             'https://www.mobile-masala.com/winpps/assets/libs/pace-js/pace.min.js',
    //             'https://www.mobile-masala.com/winpps/assets/libs/apexcharts/apexcharts.min.js',
    //             'https://www.mobile-masala.com/winpps/assets/libs/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.min.js',
    //             'https://www.mobile-masala.com/winpps/assets/libs/admin-resources/jquery.vectormap/maps/jquery-jvectormap-world-mill-en.js',
    //         ]
    //     }
    // }
    
})


