
// DOM Handle
export const kt_aside_mobile_toggle = ( options ) => {

    if (window.innerWidth>991) {
        
        // console.log('==========kt_aside_mobile_toggle called========', options);
        let header_brand = document.querySelector('.header-brand') // left sidebar without .header-brand
        let kt_aside = document.querySelector('#kt_aside') // left sidebar without .header-brand
        let kt_header = document.querySelector('#kt_header')
        let kt_content = document.querySelector('#kt_content')
        let kt_content_container_card = document.querySelector('#kt_content_container .card')
        let kt_footer = document.querySelector('#kt_footer')  // footer
        let header_logo = document.querySelector('#header-logo')  // header_logo
        let top_navbar_middle_container = document.querySelector('#top-navbar-middle-container')  
        let kt_aside_menu_wrapper = document.querySelector('#kt_aside_menu_wrapper')  
        let kt_aside_menu_menu_item = document.querySelector('#kt_aside_menu .menu-item');  
        
        
        if (options?.fullpage==1) 
        {
            kt_aside.classList.add('d-menu-mini', 'w-desktop-73px')
            kt_content_container_card.classList.remove('wrapper')
            kt_header.classList.remove('wrapper')
            kt_content.classList.add('ms-desktop-73px')
            kt_footer.classList.remove('wrapper')
            kt_footer.classList.add('ms-desktop-73px')
            header_brand.classList.add('w-desktop-73px')
            top_navbar_middle_container.classList.add('ms-desktop-73px')
            kt_aside_menu_wrapper.classList.remove('px-2')
            header_logo.classList.add('d-desktop-none')
            // menu_item_menu_accordion_collapse()
        }
        else if (options?.fullpage==0) 
        {
            kt_aside.classList.remove('d-menu-mini', 'w-desktop-73px')
            kt_content_container_card.classList.add('wrapper')
            kt_header.classList.add('wrapper')
            kt_content.classList.remove('ms-desktop-73px')
            kt_footer.classList.add('wrapper')
            kt_footer.classList.remove('ms-desktop-73px')
            header_brand.classList.remove('w-desktop-73px')
            top_navbar_middle_container.classList.remove('ms-desktop-73px')
            kt_aside_menu_wrapper.classList.add('px-2')
            header_logo.classList.remove('d-desktop-none')
        }
        else if (options?.is_left_sidebar) 
        {
            kt_aside.classList.remove('d-menu-mini', 'w-desktop-73px')
            setTimeout(() => {
                document.querySelector('#kt_content_container .card').classList.add('wrapper')
                kt_header.classList.add('wrapper')
            }, 100);
            kt_content.classList.remove('ms-desktop-73px')
            kt_footer.classList.add('wrapper')
            kt_footer.classList.remove('ms-desktop-73px')
            header_brand.classList.remove('w-desktop-73px')
            top_navbar_middle_container.classList.remove('ms-desktop-73px')
            kt_aside_menu_wrapper.classList.add('px-2')
            header_logo.classList.remove('d-desktop-none')
        }
        else
        {
            if (kt_aside.classList.contains('d-menu-mini')) 
            {
                kt_aside.classList.remove('d-menu-mini', 'w-desktop-73px')
                kt_content_container_card.classList.add('wrapper')
                kt_header.classList.add('wrapper')
                kt_content.classList.remove('ms-desktop-73px')
                kt_footer.classList.add('wrapper')
                kt_footer.classList.remove('ms-desktop-73px')
                header_brand.classList.remove('w-desktop-73px')
                top_navbar_middle_container.classList.remove('ms-desktop-73px')
                kt_aside_menu_wrapper.classList.add('px-2')
                header_logo.classList.remove('d-desktop-none')
            }
            else
            {
                kt_aside.classList.add('d-menu-mini', 'w-desktop-73px')
                kt_content_container_card.classList.remove('wrapper')
                kt_header.classList.remove('wrapper')
                kt_content.classList.add('ms-desktop-73px')
                kt_footer.classList.remove('wrapper')
                kt_footer.classList.add('ms-desktop-73px')
                header_brand.classList.add('w-desktop-73px')
                top_navbar_middle_container.classList.add('ms-desktop-73px')
                kt_aside_menu_wrapper.classList.remove('px-2')
                header_logo.classList.add('d-desktop-none')

                // menu_item_menu_accordion_collapse()
            }
        }

    
        // console.log(document.querySelector('#kt_aside'), document.querySelector('#kt_content_container .card'), document.querySelector('#kt_footer'));
    }
}



export const menu_item_menu_accordion_collapse = () => {
    
    setTimeout(() => {
        let kt_aside = document.querySelector('#kt_aside') // left sidebar without .header-brand
        console.log(kt_aside.classList);
        if (kt_aside.classList.contains('d-menu-mini')) 
        {
            // console.log('========has=======');
            // let menu_item_menu_accordion = document.querySelectorAll('.menu-item.menu-accordion')
            // menu_item_menu_accordion.forEach(element => {
            //     element.classList.remove('hover', 'show')
            // }); 
        }
        
    }, 300)


}


export const sidebar_mouse_over_out= (e) => {
    if (e.type=="mouseover") {
        kt_aside_mobile_toggle({fullpage: 0})
    }
    else if (e.type=="mouseout") {
        kt_aside_mobile_toggle({fullpage: 1})
    }
}