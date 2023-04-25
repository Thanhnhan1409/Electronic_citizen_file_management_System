import vue from 'vue';

import Search from '@/components/Search/Search.vue';
import Tableft from '@/components/Layouts/Tableft.vue';
import Navbar from '@/components/Layouts/Navbar.vue';
import PopupConfirm from '@/components/Notifications/PopupConfirm.vue';
import Notification from '@/components/Notifications/Notification.vue';
import AddAccount from '@/components/Users/AddAccount.vue'
import FooterPage from "@/components/Layouts/FooterPage.vue";
import InforCitizenNew from '@/components/Users/InforCitizenNew.vue';
import Criminalrecord from '@/components/Users/Criminalrecord.vue';
import ListInforCitizen from '@/components/Users/ListInforCitizen.vue';
import InforPoli from '@/components/Users/InforPoli.vue';
import LandingPage from '@/components/LandingPages/LandingPage.vue';


vue.component('PopupConfirm',PopupConfirm)
vue.component('AddAccount',AddAccount)
vue.component('Tableft',Tableft)
vue.component('InforCitizenNew',InforCitizenNew)
vue.component('Criminalrecord',Criminalrecord)
vue.component('ListInforCitizen',ListInforCitizen)
vue.component('Search',Search)
vue.component('InforPoli',InforPoli)
vue.component('Navbar',Navbar)
vue.component('Notification', Notification)
vue.component('FooterPage',FooterPage)
vue.component('LandingPage',LandingPage)


