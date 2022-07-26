import React, { Component } from 'react';

import config from 'Constants';

import SimilarCarsCard from 'Components/Project/SimilarCarsCard';
import HomepageCarouselBox from 'Components/Project/HomePageCarousel';
import { CardWithTabs } from 'Components/Project/Common/CardWithTabs';

import { GetAsyncData, GetAsyncPostData, IsSet } from 'Common/CommonFunctions';

import ModelRelatedNews from 'Components/Project/model-news';

import Tab from 'Approot/components/Project/Common/Tab';
import Apiconfig from 'Apiconfig';

import SearchBy from 'Components/Project/SearchBy'
import {setCookie,getCookie} from 'Common/CommonFunctions'
import { sort_category } from 'Common/CommonFunctions';
import Constants from 'Constants';
import RenderAds from 'Components/Project/Common/RenderAds';
import { CreateNewsUrl, CreateVehicleHomeUrl, CreateFilterUrlByFilter } from 'Approot/common/urlFunctions';
// import { Bling as GPT } from 'react-gpt';
// GPT.enableSingleRequest();


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

            section: 'tractor',
            isMobile: this.props.Config.IsMobile,
            POPULAR_CAR_MODELS:
                this.props.InitialData.popular_models &&
                this.props.InitialData.popular_models.data &&
                this.props.InitialData.popular_models.data.length > 0
                    ? this.props.InitialData.popular_models
                    : [],

            UPCOMING_CAR_MODELS: [],
            POPULAR_CAR_REVIEW: {},
            UPCOMING_CAR_REVIEW: {},
            UPCOMING_CAR_RATING: {},
            modelArr2:
                this.props.InitialData.getPopularCars && this.props.InitialData.getPopularCars.data
                    ? this.props.InitialData.getPopularCars.data
                    : [],

            latestModelArr2:
                this.props.InitialData.getLatestCar && this.props.InitialData.getLatestCar.data
                    ? this.props.InitialData.getLatestCar.data
                    : [],

            POPULAR_BIKE_MODELS:
                this.props.InitialData.popular_bike_models &&
                this.props.InitialData.popular_bike_models.data &&
                this.props.InitialData.popular_bike_models.data.length > 0
                    ? this.props.InitialData.popular_bike_models
                    : [],

            POPULAR_BUS_MODELS:
                this.props.InitialData.popular_bus_models &&
                this.props.InitialData.popular_bus_models.data &&
                this.props.InitialData.popular_bus_models.data.length > 0
                    ? this.props.InitialData.popular_bus_models
                    : [],
            POPULAR_LIGHT_VEHICLE_MODELS: IsSet(this.props.InitialData.popular_light_vehicle_models) && IsSet(this.props.InitialData.popular_light_vehicle_models.data) ? this.props.InitialData.popular_light_vehicle_models: [],

            UPCOMING_BIKE_MODELS: [],
            POPULAR_BIKE_REVIEW: {},
            UPCOMING_BIKE_REVIEW: {},
            UPCOMING_BIKE_RATING: {},
            POPULAR_SCOOTER_MODELS:
                this.props.InitialData.popular_scooter_models &&
                this.props.InitialData.popular_scooter_models.data &&
                this.props.InitialData.popular_scooter_models.data.length > 0
                    ? this.props.InitialData.popular_scooter_models.data
                    : [],

            UPCOMING_SCOOTER_MODELS: [],
            POPULAR_SCOOTER_REVIEW: {},
            UPCOMING_SCOOTER_REVIEW: {},
            UPCOMING_SCOOTER_RATING: {},
            POPULAR_CYCLE_MODELS:
                this.props.InitialData.popular_cycle_models &&
                this.props.InitialData.popular_cycle_models.data &&
                this.props.InitialData.popular_cycle_models.data.length > 0
                    ? this.props.InitialData.popular_cycle_models.data
                    : [],
         

            brandArr2:
                this.props.InitialData.brandArr2 &&
                this.props.InitialData.brandArr2.data.length > 0
                    ? this.props.InitialData.brandArr2.data
                    : [],
            brandArr3:
                this.props.InitialData.brandArr3 &&
                this.props.InitialData.brandArr3.data.length > 0
                    ? this.props.InitialData.brandArr3.data
                    : [],
            brandArr4:
            this.props.InitialData.brandArr4 &&
            this.props.InitialData.brandArr4.data.length > 0
                ? this.props.InitialData.brandArr4.data
                : [],
            brandArr5: IsSet(this.props.InitialData.brandArr5) && IsSet(this.props.InitialData.brandArr5.data) ? this.props.InitialData.brandArr5.data : [],
  
            
            ELECTRIC_CAR_MODELS:
                this.props.InitialData.popular_electric_car_models &&
                this.props.InitialData.popular_electric_car_models.data &&
                this.props.InitialData.popular_electric_car_models.data.length > 0
                    ? this.props.InitialData.popular_electric_car_models.data
                    : [],
            ELECTRIC_BIKE_MODELS:
                this.props.InitialData.popular_electric_bike_models &&
                this.props.InitialData.popular_electric_bike_models.data &&
                this.props.InitialData.popular_electric_bike_models.data.length > 0
                    ? this.props.InitialData.popular_electric_bike_models.data
                    : [],
            ELECTRIC_SCOOTER_MODELS:
                this.props.InitialData.popular_electric_scooter_models &&
                this.props.InitialData.popular_electric_scooter_models.data &&
                this.props.InitialData.popular_electric_scooter_models.data.length > 0
                    ? this.props.InitialData.popular_electric_scooter_models.data
                    : [],
            VIDEO_REVIEWS:
                this.props.InitialData.VIDEO_REVIEWS && this.props.InitialData.VIDEO_REVIEWS['VideoReview'] &&
                this.props.InitialData.VIDEO_REVIEWS['VideoReview'].results &&
                this.props.InitialData.VIDEO_REVIEWS['VideoReview'].results.length > 0
                    ? this.props.InitialData.VIDEO_REVIEWS
                    : [],

           
            
            EXPERT_REVIEW: [],
            BUYERS_GUIDE: [],

            MAKE_LIST: {
                CAR: [],
                BIKE: [],
                SCOOTER: []
            },

            CAR_TAB: 1,
            BIKE_TAB: 1,
            SCOOTER_TAB: 1,

            MAKE_TAB: 1,
            NEWS_TAB: 1,

            inputSearch: '',
            selectedUrl: '',
            autoSuggestList: [],

            tab: 'popular_car',
            CAR_MAKES:
                this.props.InitialData.car_makes &&
                this.props.InitialData.car_makes.data &&
                this.props.InitialData.car_makes.data.length > 0
                    ? this.props.InitialData.car_makes.data
                    : [],
            Page: this.props.Page
        };
        this.handleSectionSelect = this.handleSectionSelect.bind(this);

     
        // Upcoming Models
        this.getUpcomingCarModels = this.getUpcomingCarModels.bind(this);
        this.getUpcomingBikeModels = this.getUpcomingBikeModels.bind(this);
        this.getUpcomingScooterModels = this.getUpcomingScooterModels.bind(this);

        this.getExpertReview = this.getExpertReview.bind(this);
        this.getBuyersGuide = this.getBuyersGuide.bind(this);

        this.selectMakeItem = this.selectMakeItem.bind(this);
        this.searchMakeItem = this.searchMakeItem.bind(this);
        this.getBodyType = this.getBodyType.bind(this)
    }

    componentDidMount() {
        
        this.getUpcomingCarModels();
        this.getUpcomingBikeModels();
        this.getUpcomingScooterModels();


        /* Set utm landing page url */
        if (typeof this.props.query !== 'undefined') {
            const pageURI = this.props.query;
            if (
                pageURI['utm_campaign'] !== 'undefined' &&
                typeof pageURI['utm_campaign'] !== 'undefined'
            ) {
                const urlLandingPage = config.BASE_HREF;
            
                const cookieLandingPage = getCookie('urlLandingPage');
                if (cookieLandingPage !== urlLandingPage) {
                    setCookie('urlLandingPage', urlLandingPage);
                }
            }
        }
    }

    handleSectionSelect(e) {
        this.setState({ section: e.target.value });
    }

    async getUpcomingCarModels() {
        // const requestConfig = {
        //     method: 'POST',
        //     url: `${Apiconfig.BASE_HREF}/models`,
        //     data: {
        //         vehicle_type: 'car',
        //         status: 3
        //     },
        //     headers: { 'Content-Type': 'application/json' }
        // };
        let url = `${Apiconfig.BASE_HREF}/models`;

        // const response = await makeRequest(requestConfig);
        const response = await GetAsyncPostData(url);
        const data = response.data.data;
        this.setState({
            UPCOMING_CAR_MODELS: data,
            UPCOMING_CAR_REVIEW: response.data.reviews,
            UPCOMING_CAR_RATING: response.data.rating
        });
    }

    async getUpcomingBikeModels() {
        // const requestConfig = {
        //     method: 'POST',
        //     url: `${Apiconfig.BASE_HREF}/models`,
        //     data: {
        //         vehicle_type: 'bike',
        //         status: 3
        //     },
        //     headers: { 'Content-Type': 'application/json' }
        // };

        // const response = await makeRequest(requestConfig);
        const response = await GetAsyncPostData(`${Apiconfig.BASE_HREF}/models`);
        const data = response.data.data;
        this.setState({
            UPCOMING_BIKE_MODELS: data,
            UPCOMING_BIKE_REVIEW: response.data.reviews,
            UPCOMING_BIKE_RATING: response.data.rating
        });
    }

    async getUpcomingScooterModels() {
        // const requestConfig = {
        //     method: 'POST',
        //     url: `${Apiconfig.BASE_HREF}/models`,
        //     data: {
        //         vehicle_type: 'scooter',
        //         status: 3
        //     },
        //     headers: { 'Content-Type': 'application/json' }
        // };

        // const response = await makeRequest(requestConfig);
        const response = await GetAsyncPostData(`${Apiconfig.BASE_HREF}/models`);
        
        const data = response.data.data;
        this.setState({
            UPCOMING_SCOOTER_MODELS: data,
            UPCOMING_SCOOTER_REVIEW: response.data.reviews,
            UPCOMING_SCOOTER_RATING: response.data.rating
        });
    }

    async getExpertReview() {
        const CATEGORY_EXPERT_REVIEW = 'expert-reviews';
        const API_URL = `${Apiconfig.BASE_HREF}/article/news-review/all?category=${CATEGORY_EXPERT_REVIEW}&limit=4`;

        // const requestConfig = {
        //     method: 'GET',
        //     url: API_URL
        // };

        // const response = await makeRequest(requestConfig);
        const response = await GetAsyncData(API_URL);
        
        const articles = response.data.posts;
        this.setState({ EXPERT_REVIEW: articles });
    }

    async getBuyersGuide() {
        const CATEGORY_BUYERS_GUIDE = 'buyers-guide';
        const API_URL = `${Apiconfig.BASE_HREF}/article/news-review/all?category=${CATEGORY_BUYERS_GUIDE}&limit=4`;

        // const requestConfig = {
        //     method: 'GET',
        //     url: API_URL
        // };

        // const response = await makeRequest(requestConfig);
        const response = await GetAsyncData(API_URL);
        
        const articles = response.data.posts;
        this.setState({ BUYERS_GUIDE: articles });
    }

    handleBannerClick(url) {
        window.open(url, '_blank');
        //window.location.href = url;
    }

    selectMakeItem(selectedModel, selectedUrl) {
        this.setState({
            inputSearch: selectedModel,
            selectedUrl: selectedUrl,
            autoSuggestList: ''
        });
    }

    searchMakeItem() {
        window.location.href = config.BASE_HREF + '/' + this.state.selectedUrl;
    }

    getBodyType = () => {
        var sort = sort_category(this.state.category)
        var arr = ['Popular']
        for(const element of sort)
        {
            let slug = (element[0].replace(' ','-')).toLowerCase()
            arr.push(slug)
        }   
        
        return arr    
    };

    getBusBodyType = () => {
        var sort = sort_category(this.state.busCategory)
        var arr = ['Popular']
        for(const element of sort)
        {

            let slug = (element[0].replace(' ','-').replace('school', 'school/staff')).toLowerCase()

            arr.push(slug[0].toUpperCase()+slug.slice(1))
        }   
        
        return arr    
    };

    modelarrBusBodyType =() => {
        var sort = sort_category(this.state.busCategory)
        var arr = [this.state.POPULAR_BUS_MODELS]
        for(const element of sort)
        arr.push(element[1]);
 
        return arr
    }

    modelarrBodyType =() => {
        var sort = sort_category(this.state.category)
        
        var arr = [this.state.POPULAR_BIKE_MODELS]
        for(const element of sort)
            arr.push(element[1]);
 
        return arr
    }

    getTractorBodyType = () => {
        var sort = sort_category(this.state.features)

        var arr = ['Popular']
        for(const element of sort)
        {
            let slug = element[0].replace('tractor_','').replace('_', ' ')
            arr.push(slug)
        }   
        
        return arr    
    };

    modelarrTractorBodyType =() => {
        var sort = sort_category(this.state.features)
        var arr = [this.state.POPULAR_CAR_MODELS]
        for(const element of sort){
               arr.push(element[1]);          
            }
        return arr
    }



    render() {
        const truckMakeByCity = IsSet(this.props.InitialData.makeByPrice) && this.props.InitialData.makeByPrice && this.props.InitialData.makeByPrice.truck ? this.props.InitialData.makeByPrice.truck : ''
        const tractorMakeByCity = IsSet(this.props.InitialData.makeByPrice) && this.props.InitialData.makeByPrice && this.props.InitialData.makeByPrice.tractor ? this.props.InitialData.makeByPrice.tractor : ''
        const busMakeByCity = IsSet(this.props.InitialData.makeByPrice) && this.props.InitialData.makeByPrice && this.props.InitialData.makeByPrice.bus ? this.props.InitialData.makeByPrice.bus : ''
        const lightVehicleMakeByCity = IsSet(this.props.InitialData.makeByPrice) && this.props.InitialData.makeByPrice && this.props.InitialData.makeByPrice['light-vehicle'] ? this.props.InitialData.makeByPrice['light-vehicle'] : ''
        
        const sectionName =
            this.state.section.charAt(0).toUpperCase() + this.state.section.slice(1);
        // const searchPlaceholder = `Type ${sectionName} Name or Brand`;
        const BannerList = IsSet(this.props.InitialData.BannerList) ? this.props.InitialData.BannerList : []
        const bannerData = []
        const desktopBanner =[]
        const bannerUrl = []
        const mobileBanner =[]
        const NEWS_CATEGORY_TRACTOR= IsSet(this.props.InitialData[Constants.CATEGORY_TRACTOR]) ? this.props.InitialData[Constants.CATEGORY_TRACTOR] : [];
        const NEWS_CATEGORY_BUS= IsSet(this.props.InitialData[Constants.CATEGORY_BUS]) ? this.props.InitialData[Constants.CATEGORY_BUS] : [];
        const NEWS_CATEGORY_TRUCK= IsSet(this.props.InitialData[Constants.CATEGORY_TRUCK]) ? this.props.InitialData[Constants.CATEGORY_TRUCK] : [];
        const IsAmp = this.props.InitialData && this.props.InitialData.AmpData.IsAmp? this.props.InitialData.AmpData.IsAmp:0;

        const getTractorFilters = IsSet(this.props.InitialData.getTractorFilters) ? this.props.InitialData.getTractorFilters : {}
        const getTruckFilters = IsSet(this.props.InitialData.getTruckFilters) ? this.props.InitialData.getTruckFilters : {}
        const getBusFilters = IsSet(this.props.InitialData.getBusFilters) ? this.props.InitialData.getBusFilters : {}
        const getThreeWheelerFilters = IsSet(this.props.InitialData.getThreeWheelerFilters) ? this.props.InitialData.getThreeWheelerFilters : {}
        const getThreeWheelerModelsArr=()=>{
            const ModelsArr = []
            if(IsSet(getThreeWheelerFilters) && getThreeWheelerFilters["body_type"] && getThreeWheelerFilters["body_type"]["e-rickshaw"]){
                
                ModelsArr.push({'electric_three_wheeler':getThreeWheelerFilters["body_type"]["e-rickshaw"]})
            }
            if(IsSet(this.state.POPULAR_LIGHT_VEHICLE_MODELS) && this.state.POPULAR_LIGHT_VEHICLE_MODELS['data']){
                
                ModelsArr.push({'popular_three_wheeler':this.state.POPULAR_LIGHT_VEHICLE_MODELS['data']})
            }
            if(IsSet(getThreeWheelerFilters) && getThreeWheelerFilters["budget"] && getThreeWheelerFilters["budget"]["data"]){
                
                ModelsArr.push({'under_2_lakh_three_wheeler':getThreeWheelerFilters["budget"]["data"]})
            }
            if(IsSet(getThreeWheelerFilters) && getThreeWheelerFilters["tonnage"] && getThreeWheelerFilters["tonnage"]["data"]){
                
                ModelsArr.push({'under_2_ton_three_wheeler':getThreeWheelerFilters["tonnage"]["data"]})
            }
            if(IsSet(getThreeWheelerFilters) && getThreeWheelerFilters["power"] && getThreeWheelerFilters["power"]["data"]){
                
                ModelsArr.push({'under_5_ton_three_wheeler':getThreeWheelerFilters["power"]["data"]})
            }
            if(IsSet(this.state.POPULAR_LIGHT_VEHICLE_MODELS) && this.state.POPULAR_LIGHT_VEHICLE_MODELS['data']){
                
                ModelsArr.push({'passenger_three_wheeler':this.state.POPULAR_LIGHT_VEHICLE_MODELS['data']})
            }
            return ModelsArr
        }
        const getThreeWheelerModelTab=()=>{
            const tabData = []
            
            if(IsSet(getThreeWheelerFilters) && getThreeWheelerFilters["body_type"] && getThreeWheelerFilters["body_type"]["e-rickshaw"]){
                tabData.push({"name":"Electric 3 Wheelers","value":"electric_three_wheeler", "footerLink":`${CreateFilterUrlByFilter("three-wheeler","body_type","e-rickshaw")}`,"footerText":"View more passenger three wheelers"})
            }
            if(IsSet(this.state.POPULAR_LIGHT_VEHICLE_MODELS) && this.state.POPULAR_LIGHT_VEHICLE_MODELS['data']){
                tabData.push({"name":"Popular 3 Wheelers","value":"popular_three_wheeler","footerLink":`${CreateVehicleHomeUrl("three-wheeler")}`,"footerText":"View more popular three wheelers"})
            }
            if(IsSet(getThreeWheelerFilters) && getThreeWheelerFilters["budget"] && getThreeWheelerFilters["budget"]["data"]){
                tabData.push({"name":"Under 2 Lakh","value":"under_2_lakh_three_wheeler", "footerLink":`${CreateFilterUrlByFilter("three-wheeler","budget","100000-200000")}`,"footerText":"View more under 2 Lakh three wheelers"})
            }
            if(IsSet(getThreeWheelerFilters) && getThreeWheelerFilters["tonnage"] && getThreeWheelerFilters["tonnage"]["data"]){
                tabData.push({"name":"Under 2 Ton","value":"under_2_ton_three_wheeler", "footerLink":`${CreateFilterUrlByFilter("three-wheeler","tonnage","0-2")}`,"footerText":"View more under 2 ton three wheelers"})
            }
            if(IsSet(getThreeWheelerFilters) && getThreeWheelerFilters["power"] && getThreeWheelerFilters["power"]["data"]){
                tabData.push({"name":"Under 5 HP","value":"under_5_ton_three_wheeler", "footerLink":`${CreateFilterUrlByFilter("three-wheeler","power","0-5")}`,"footerText":"View more under 5 HP three wheelers"})
            }
            if(IsSet(getThreeWheelerFilters) && getThreeWheelerFilters["power"] && getThreeWheelerFilters["body_type"]["auto-rickshaw"]){
                tabData.push({"name":"Passenger 3 Wheelers","value":"passenger_three_wheeler", "footerLink":`${CreateFilterUrlByFilter("three-wheeler","body_type","auto-rickshaw")}`,"footerText":"View more auto rickshaw three wheelers"})
            }
            return tabData
        }
        const getBusModelTab=()=>{
            
            const tabData = []
            if(IsSet(this.state.POPULAR_BUS_MODELS) && this.state.POPULAR_BUS_MODELS['data']){
                tabData.push({"name":"Popular Buses","value":"popular_bus","footerLink":`${CreateVehicleHomeUrl("bus")}`,"footerText":"View more popular buses"})
            }
            if(IsSet(getBusFilters) && getBusFilters["body_type"] && getBusFilters["body_type"]["school-staff"]){
                tabData.push({"name":"School Buses","value":"school_bus","footerLink":`${CreateFilterUrlByFilter("bus","body_type","school-staff")}`,"footerText":"View more school/staff buses"})
            }
            if(IsSet(getBusFilters) && getBusFilters["body_type"] && getBusFilters["body_type"]["electric"]){
                tabData.push({"name":"Electric Buses","value":"electric_bus", "footerLink":`${CreateFilterUrlByFilter("bus","body_type","electric")}`,"footerText":"View more electric buses"})
            }
            if(IsSet(getBusFilters) && getBusFilters["body_type"] && IsSet(getBusFilters["body_type"]["passenger"])){
                console.log("to checo",getBusFilters["body_type"]["passenger"])
                tabData.push({"name":"Passenger Vans","value":"passenger_vans", "footerLink":`${CreateFilterUrlByFilter("bus","body_type","passenger")}`,"footerText":"View more passenger vans"})
            }
            if(IsSet(getBusFilters) && getBusFilters["seating"] && getBusFilters["seating"]["data"]){
                tabData.push({"name":"Under 20 Seater","value":"20_sealter", "footerLink":`${CreateFilterUrlByFilter("bus","seating_capacity","0-20")}`,"footerText":"View more under 20 seater buses"})
            }
            if(IsSet(getBusFilters) && getBusFilters["budget"] && getBusFilters["budget"]["data"]){
                tabData.push({"name":"Under 10 Lakh","value":"under_10_lakh_bus", "footerLink":`${CreateFilterUrlByFilter("bus","budget","100000-500000")}`,"footerText":"View more under 10 Lakh buses"})
            }
            return tabData
        }
        const getBusModelsArr=()=>{    
            const ModelsArr = []
            if(IsSet(this.state.POPULAR_BUS_MODELS) && this.state.POPULAR_BUS_MODELS['data']){
                
                ModelsArr.push({'popular_bus':this.state.POPULAR_BUS_MODELS['data']})
            }
            if(IsSet(getBusFilters) && getBusFilters["body_type"] && getBusFilters["body_type"]["school-staff"]){
                
                ModelsArr.push({'school_bus':getBusFilters["body_type"]["school-staff"]})
            }
            if(IsSet(getBusFilters) && getBusFilters["body_type"] && getBusFilters["body_type"]["electric"]){
                
                ModelsArr.push({'electric_bus':getBusFilters["body_type"]["electric"]})
            }
            if(IsSet(getBusFilters) && getBusFilters["body_type"] && getBusFilters["body_type"]["passenger"]){
                
                ModelsArr.push({'passenger_vans':getBusFilters["body_type"]["passenger"]})
            }
            if(IsSet(getBusFilters) && getBusFilters["seating"] && getBusFilters["seating"]["data"]){
                
                ModelsArr.push({'20_sealter':getBusFilters["seating"]["data"]})
            }
            if(IsSet(getBusFilters) && getBusFilters["budget"] && getBusFilters["budget"]["data"]){
                
                ModelsArr.push({'under_10_lakh_bus':getBusFilters["budget"]["data"]})
            }
            return ModelsArr
        }
        const getTruckModelTab=()=>{
            
            const tabData = []
            if(Constants.AD_MODEL && Constants.AD_MODEL.STATUS && Constants.AD_MODEL.SPONSERED_TAB ){
                tabData.push({"name":Constants.AD_MODEL.SPONSERED_TAB.TAB_NAME,"value":Constants.AD_MODEL.SPONSERED_TAB.TAB_NAME_VALUE,"is_sponsered":true})
            }
            if(IsSet(this.state.POPULAR_BIKE_MODELS) && this.state.POPULAR_BIKE_MODELS['data']){
                tabData.push({"name":"Popular Trucks","value":"popular_truck", "footerLink":`${CreateVehicleHomeUrl("truck")}`,"footerText":"View more popular trucks"})
            }
            if(IsSet(getTruckFilters) && getTruckFilters["body_type"] && getTruckFilters["body_type"]["pickup"]){
                tabData.push({"name":"Pickup","value":"pickup", "footerLink":`${CreateFilterUrlByFilter("truck","body_type","pickup")}`,"footerText":"View more pickup trucks"})
            }
            if(IsSet(getTruckFilters) && getTruckFilters["fuel_type"] && getTruckFilters["fuel_type"]["data"]){
                tabData.push({"name":"Electric Trucks","value":"electric_truck", "footerLink":`${CreateFilterUrlByFilter("truck","fuel_type","electric")}`,"footerText":"View more electric trucks"})
            }
            if(IsSet(getTruckFilters) && getTruckFilters["tonnage"] && getTruckFilters["tonnage"]["data"]){
                tabData.push({"name":"Under 10 ton","value":"under_10_ton", "footerLink":`${CreateFilterUrlByFilter("truck","tonnage","0-10")}`,"footerText":"View more under 10 ton trucks"})
            }
            if(IsSet(getTruckFilters) && getTruckFilters["body_type"] && getTruckFilters["body_type"]["dumper"]){
                tabData.push({"name":"Tippers","value":"tippers", "footerLink":`${CreateFilterUrlByFilter("truck","body_type","dumper")}`,"footerText":"View more tippers trucks"})
            }
            return tabData
        }
        const getTruckModelsArr=()=>{
  
            const ModelsArr = []
            if(Constants.AD_MODEL && Constants.AD_MODEL.STATUS && Constants.AD_MODEL.SPONSERED_TAB ){
                
                ModelsArr.push({[Constants.AD_MODEL.SPONSERED_TAB.TAB_NAME_VALUE]:Constants.AD_MODEL.SPONSERED_TAB.CARDS_DATA})
            }
            if(IsSet(this.state.POPULAR_BIKE_MODELS) && this.state.POPULAR_BIKE_MODELS['data']){
                ModelsArr.push({'popular_truck':this.state.POPULAR_BIKE_MODELS['data']})
            }
            if(IsSet(getTruckFilters) && getTruckFilters["body_type"] && getTruckFilters["body_type"]["pickup"]){
                
                ModelsArr.push({'pickup':getTruckFilters["body_type"]["pickup"]})
            }
            if(IsSet(getTruckFilters) && getTruckFilters["fuel_type"] && getTruckFilters["fuel_type"]["data"]){
                
                ModelsArr.push({'electric_truck':getTruckFilters["fuel_type"]["data"]})
            }
            if(IsSet(getTruckFilters) && getTruckFilters["tonnage"] && getTruckFilters["tonnage"]["data"]){
                
                ModelsArr.push({'under_10_ton':getTruckFilters["tonnage"]["data"]})
            }
            if(IsSet(getTruckFilters) && getTruckFilters["body_type"] && getTruckFilters["body_type"]["dumper"]){
                
                ModelsArr.push({'tippers':getTruckFilters["body_type"]["dumper"]})
            }
            return ModelsArr
        }
        const getModelTab=()=>{
            const tabData = []
            if(IsSet(this.state.POPULAR_CAR_MODELS) && this.state.POPULAR_CAR_MODELS['data']){
                tabData.push({"name":"Popular Tractors","value":"popular_tractors", "footerLink":`${CreateVehicleHomeUrl("tractor")}`,"footerText":"View more popular tractors"})
            }
            if(IsSet(getTractorFilters) && getTractorFilters["wheel_drive"] && IsSet(getTractorFilters["wheel_drive"]["2wd"])){
                tabData.push({"name":"2WD","value":"2wd", "footerLink":`${CreateFilterUrlByFilter("tractor","wheel_drive","2wd")}`,"footerText":"View more 2WD tractors"})
            }
            if(IsSet(getTractorFilters) && getTractorFilters["wheel_drive"] && IsSet(getTractorFilters["wheel_drive"]["4wd"])){
                tabData.push({"name":"4WD","value":"4wd", "footerLink":`${CreateFilterUrlByFilter("tractor","wheel_drive","4wd")}`,"footerText":"View more 4WD tractors"})
            }
            if(IsSet(getTractorFilters) && getTractorFilters["features"] && IsSet(getTractorFilters["features"]["data"])){
                tabData.push({"name":"AC Cabin","value":"ac_cabin", "footerLink":`${CreateFilterUrlByFilter("tractor","features","ac_cabin")}`,"footerText":"View more AC cabin tractors"})
            }
            if(IsSet(getTractorFilters) && getTractorFilters["power"] && IsSet(getTractorFilters["power"]["data"])){
                tabData.push({"name":"Under 30 HP","value":"under_30_hp", "footerLink":`${CreateFilterUrlByFilter("tractor","power","0-30")}`,"footerText":"View more under 30 HP tractors"})
            }
            if(IsSet(getTractorFilters) && getTractorFilters["budget"] && IsSet(getTractorFilters["budget"]["data"])){
                tabData.push({"name":"Under 5 Lakh","value":"under_5_lakh", "footerLink":`${CreateFilterUrlByFilter("tractor","budget","100000-500000")}`,"footerText":"View more under 5 Lakh tractors"})
            }

         
                                      
            return tabData
        }
        const getModelsArr=()=>{
            const ModelsArr = []
            if(IsSet(this.state.POPULAR_CAR_MODELS) && this.state.POPULAR_CAR_MODELS['data']){
                ModelsArr.push({'popular_tractors':this.state.POPULAR_CAR_MODELS['data']})
            }
            if(IsSet(getTractorFilters) && getTractorFilters["wheel_drive"] && IsSet(getTractorFilters["wheel_drive"]["2wd"])){
                ModelsArr.push({'2wd':getTractorFilters["wheel_drive"]["2wd"]})
            }
            if(IsSet(getTractorFilters) && getTractorFilters["wheel_drive"] && IsSet(getTractorFilters["wheel_drive"]["4wd"])){
                ModelsArr.push({'4wd':getTractorFilters["wheel_drive"]["4wd"]})
            }
            if(IsSet(getTractorFilters) && getTractorFilters["features"] && IsSet(getTractorFilters["features"]["data"])){
                
                ModelsArr.push({'ac_cabin':getTractorFilters["features"]["data"]})
            }
            if(IsSet(getTractorFilters) && getTractorFilters["power"] && IsSet(getTractorFilters["power"]["data"])){
                
                ModelsArr.push({'under_30_hp':getTractorFilters["power"]["data"]})
            }
            if(IsSet(getTractorFilters) && getTractorFilters["budget"] && IsSet(getTractorFilters["budget"]["data"])){
                
                ModelsArr.push({'under_5_lakh':getTractorFilters["budget"]["data"]})
            }
            
            return ModelsArr
        }
        const getBrandsTab=()=>{
            const tabData = []
            if(IsSet(this.state.brandArr2)){
                tabData.push({"name":"Tractor","value":"tractor_brands", "footerText":""})
            }
            if(IsSet(this.state.brandArr3)){
                tabData.push({"name":"Truck","value":"truck_brands", "footerText":""})
            }
            if(IsSet(this.state.brandArr4)){
                tabData.push({"name":"Bus","value":"bus_brands", "footerText":""})
            }
            if(IsSet(this.state.brandArr5)){
                tabData.push({"name":"3 Wheelers","value":"three_wheelers_brands","footerText":""})
            }
            return tabData
            
        }
        
        const getBrandsArr=()=>{
            const brandsArr = []
            if(IsSet(this.state.brandArr2)){
                brandsArr.push({'tractor_brands':this.state.brandArr2})
            }
            if(IsSet(this.state.brandArr3)){
                brandsArr.push({'truck_brands':this.state.brandArr3})
            }
            if(IsSet(this.state.brandArr4)){
                brandsArr.push({'bus_brands':this.state.brandArr4})
            }
            if(IsSet(this.state.brandArr5)){
                brandsArr.push({'three_wheelers_brands':this.state.brandArr5})
            }
            return brandsArr
        }
        const getNewsTab =()=>{
            const tabData=[]
    
            if(IsSet(NEWS_CATEGORY_TRACTOR)){
                tabData.push({"name":`Tractor News`, "value":`tractor_news`,"footerLink":CreateNewsUrl("news","tractor-news")})
            }
            if(IsSet(NEWS_CATEGORY_TRUCK)){
                tabData.push({"name":`Truck News`, "value":`truck_news`,"footerLink":CreateNewsUrl("news","truck-news")})
            }
            if(IsSet(NEWS_CATEGORY_BUS)){
                tabData.push({"name":`Bus News`, "value":`bus_news`,"footerLink":CreateNewsUrl("news","bus-news")})
            }
            return tabData
        }
        const getNEwsArr =()=>{
            const newsArr = []
            if(IsSet(NEWS_CATEGORY_TRACTOR)){
                newsArr.push({'tractor_news':NEWS_CATEGORY_TRACTOR.posts})
            }
            if(IsSet(NEWS_CATEGORY_TRUCK)){
                newsArr.push({'truck_news':NEWS_CATEGORY_TRUCK.posts})
            }
            if(IsSet(NEWS_CATEGORY_BUS)){
                newsArr.push({'bus_news':NEWS_CATEGORY_BUS.posts})
            }
            return newsArr
        }
        // console.log('LATEST_NEWS',LATEST_NEWS)
        IsSet(BannerList) && IsSet(BannerList.results) ? BannerList.results.map((slide)=>{
          
            if(this.state.isMobile){
                bannerData.push(slide)
                mobileBanner.push(config.IMG_URL+slide.mobileimageurl)
                bannerUrl.push(slide.mobile_landing_page)
            }else{
                bannerData.push(slide)
                desktopBanner.push(config.IMG_URL+slide.imageurl)
                bannerUrl.push(slide.landing_page)
            }

           
        }):''
        // const mobileBanner=desktopBanner
        
        const { isMobile } = this.state;
       
        let banners = [];
        if (isMobile) {
            banners = mobileBanner;
        } else {
            banners = desktopBanner;
        }
       
        return (
            <>
                <HomepageCarouselBox
                    banners={banners}
                    isMobile={this.state.isMobile}
                    bannerUrl={bannerUrl}
                    showSpecialBanner={false}
                    IsAmp = {IsAmp}
                    brands={{"truck":this.state.brandArr3,"tractor":this.state.brandArr2,"bus":this.state.brandArr4,"three-wheeler":this.state.brandArr5}}
                    configObj={{'bannerData':bannerData}}
                />
                <div className="utm-container">
                    <div className="utm-row modelflex">
                        <div className="utm-col-xs-12 utm-col-sm-12 utm-col-md-9 utm-col-lg-9">

                        {/* {IsSet(this.state.POPULAR_BIKE_MODELS) && <Tab
                            TabContentName = 'modelCardWithTabs'
                            TabHeader = {getTruckModelTab()}
                            ConfigObj = {{"footer":true,'headingText':`New Trucks In India`, "section":"truck", isMobile:this.props.isMobile, subSource:"Popular", "getWithCards":true, "carcarusalHeight":"360", "newcarindia":true}}
                            Source="HomePage"
                            modelArr={getTruckModelsArr()}
                            IsAmp={IsAmp}
                
                        />} */}

{/* <SearchBy
                            SearchType = "Category"
                            Section = 'truck'
                            Source="HomePage"
                            carousalClass="flex-center"
                            colClass = "utm-col-xs-4 utm-col-sm-4 utm-col-md-4 utm-col-lg-2"
                            IsAmp={IsAmp}
                            /> */}
                        {/* {IsSet(truckMakeByCity) ? (
                                <CardWithTabs
                                heading="Truck Dealers in Popular Cities"
                                isMobile={this.state.isMobile}
                                SearchType = "City"
                                section="truck"
                                modelArr={{
                                    truck: [
                                        truckMakeByCity['hyderabad'],
                                        truckMakeByCity['indore'],
                                        truckMakeByCity['patna'],
                                        truckMakeByCity['chandigarh'],
                                        truckMakeByCity['chennai'],
                                        truckMakeByCity['lucknow']
                                    ]
                                }}
                                Source="HomePage"
                                footer={config.BASE_HREF + '/truck-dealers'}
                                TabName={{ truck: ['Hyderabad','Indore', 'Patna','Chandigarh','Chennai','Lucknow'] }}
                                configObj={{'subSource':'Dealer'}}
                                IsAmp={IsAmp}
                            />

                            ) : ('')} */}


                        {IsSet(this.state.POPULAR_CAR_MODELS) && <Tab
                            TabContentName = 'modelCardWithTabs'
                            TabHeader = {getModelTab()}
                            ConfigObj = {{"footer":true,'headingText':`New Tractors In India`, "section":"tractor", isMobile:this.props.isMobile, subSource:"Popular", "getWithCards":true, "carcarusalHeight":"360"}}
                            Source="HomePage"
                            modelArr={getModelsArr()}
                            IsAmp={IsAmp}
                
                        />}
                        {/* {IsSet(this.state.POPULAR_CAR_MODELS) ? (
                                <CardWithTabs
                                heading="New Tractors In India"
                                isMobile={this.state.isMobile}
                                SearchType = "Category"
                                section="tractor"
                                modelArr={{
                                    tractor: [
                                        // this.state.POPULAR_CAR_MODELS['data'],
                                        this.state.POPULAR_CAR_MODELS['data'],
                                        getTractorFilters["wheel_drive"]["2wd"],
                                        getTractorFilters["wheel_drive"]["4wd"],
                                        getTractorFilters["features"]["data"],
                                        getTractorFilters["power"]["data"],
                                        getTractorFilters["budget"]["data"],
                                        
                                    ]
                                }}
                                Source="HomePage_Popular"
                                footer={config.BASE_HREF + '/tractors'}
                                TabName={{ tractor: ['Popular Tractors', '2WD','4WD','AC Cabin','Under 30 HP', "Under 5 Lakh"] }}
                                // configObj={{'subSource':'Dealer'}}
                                IsAmp={IsAmp}
                            />

                            ) : ('')} */}

                            {/* {IsSet(this.state.POPULAR_CAR_MODELS) ? (
                                  <SimilarCarsCard
                                  IsMobile={this.state.isMobile}
                                  Section="tractor"
                                  SimilarModels={this.state.POPULAR_CAR_MODELS}
                                  Source="HomePage"
                                  showfooter={true}
                                  footerText = "View all Popular Tractors"
                                  footer="/tractors"
                                  configObj={{'subSource':'Popular'}}
                                  IsAmp = {IsAmp}
                                 
                              />
                            ):('')}
                             */}

                     
                             {/* {this.state.brandArr2 && this.state.isMobile ?(
                            <SearchBy
                            SearchType="Brand"
                            brandsArr2={this.state.brandArr2}
                            Section='tractor'
                            Source="HomePage"
                            colClass = "utm-col-xs-4 utm-col-sm-4 utm-col-md-4 utm-col-lg-2"
                            configObj={{'subSource':'Brand'}}
                            IsAmp={IsAmp}
                        />
                        ):('')} */}
                        <SearchBy
                            SearchType = "Features"
                            Section = 'tractor'
                            Source="HomePage"
                            carousalClass="flex-center"
                            colClass = "utm-col-xs-4 utm-col-sm-4 utm-col-md-4 utm-col-lg-2"
                            IsAmp={IsAmp}
                            />
                            <RenderAds
                                source="HomePage"
                                section="all"
                                isMobile={this.state.isMobile}
                                pos={0}
                                AdSection={'all'}
                                view="2"
                                IsAmp={IsAmp}
                            />
                            {IsSet(tractorMakeByCity) ? (
                                <CardWithTabs
                                heading="Tractor Dealers in Popular Cities"
                                isMobile={this.state.isMobile}
                                SearchType = "City"
                                section="tractor"
                                modelArr={{
                                    tractor: [
                                        tractorMakeByCity['hyderabad'],
                                        tractorMakeByCity['indore'],
                                        tractorMakeByCity['patna'],
                                        tractorMakeByCity['chandigarh'],
                                        tractorMakeByCity['chennai'],
                                        tractorMakeByCity['lucknow']
                                    ]
                                }}
                                Source="HomePage"
                                footer={config.BASE_HREF + '/tractor-dealers'}
                                TabName={{ tractor: ['Hyderabad','Indore', 'Patna','Chandigarh','Chennai','Lucknow'] }}
                                configObj={{'subSource':'Dealer'}}
                                IsAmp={IsAmp}
                                
                            />

                            ) : ('')}
                         

                            {/* {IsSet(this.state.POPULAR_BIKE_MODELS) ? (
                                    <SimilarCarsCard
                                    IsMobile={this.state.isMobile}
                                    Section="truck"
                                    SimilarModels={this.state.POPULAR_BIKE_MODELS}
                                    Source="HomePage"
                                    showfooter={true}
                                    footerText = "View all Popular Trucks"
                                    footer="/trucks"
                                    configObj={{'subSource':'Popular'}}
                                    IsAmp={IsAmp}
                                   
                                />
                            ) : ('')} */}

           

                        {/* {IsSet(this.state.POPULAR_BIKE_MODELS) ? (
                                <CardWithTabs
                                heading="New Trucks In India"
                                isMobile={this.state.isMobile}
                                SearchType = "Category"
                                section="truck"
                                modelArr={{
                                    truck: [
                                        this.state.POPULAR_BIKE_MODELS['data'],
                                        getTruckFilters["body_type"]["pickup"],
                                        getTruckFilters["fuel_type"]["data"],
                                        // this.state.POPULAR_BIKE_MODELS['data'],
                                        getTruckFilters["tonnage"]["data"],
                                        getTruckFilters["body_type"]["dumper"],
                                        
                                    ]
                                }}
                                Source="HomePage_Popular"
                                footer={config.BASE_HREF + '/trucks'}
                                TabName={{ truck: ['Popular Tractors', 'Pickup','Electric Trucks', "Under 10 ton", "Tippers"] }}
                                // configObj={{'subSource':'Dealer'}}
                                IsAmp={IsAmp}
                            />

                            ) : ('')} */}


                          


                            {/* {this.state.brandArr3 && this.state.isMobile ?(
                            <SearchBy
                            SearchType="Brand"
                            brandsArr2={this.state.brandArr3}
                            Section='truck'
                            Source="HomePage"
                            colClass = "utm-col-xs-4 utm-col-sm-4 utm-col-md-4 utm-col-lg-2"
                            configObj={{'subSource':'Brand'}}
                            IsAmp={IsAmp}
                        />
                        ):('')} */}

                       
                          

                           
                            {/* {IsSet(this.state.POPULAR_BUS_MODELS) ? (
                                  <SimilarCarsCard
                                  IsMobile={this.state.isMobile}
                                  Section="bus"
                                  SimilarModels={this.state.POPULAR_BUS_MODELS}
                                  Source="HomePage"
                                  showfooter={true}
                                  footerText = "View all Popular Buses"
                                  footer="/buses"
                                  configObj={{'subSource':'Popular'}}
                                  IsAmp={IsAmp}
                                 
                              />
                            ) : ('')} */}
{/* 
                    {IsSet(this.state.POPULAR_BUS_MODELS) && <Tab
                            TabContentName = 'modelCardWithTabs'
                            TabHeader = {getBusModelTab()}
                            ConfigObj = {{"footer":true,'headingText':`New Buses In India`, "section":"bus", isMobile:this.props.isMobile, subSource:"Popular", "getWithCards":true, "carcarusalHeight":"360"}}
                            Source="HomePage"
                            modelArr={getBusModelsArr()}
                            IsAmp={IsAmp}
                
                        />} */}

                            {/* {IsSet(this.state.POPULAR_BUS_MODELS) ? (
                                <CardWithTabs
                                heading="New Buses In India"
                                isMobile={this.state.isMobile}
                                SearchType = "Category"
                                section="bus"
                                modelArr={{
                                    bus: [
                                        this.state.POPULAR_BUS_MODELS['data'],
                                        getBusFilters["body_type"]['school-staff'],
                                        getBusFilters["body_type"]['electric'],
                                        getBusFilters["body_type"]['passenger'],
                                        getBusFilters['seating']["data"],
                                        getBusFilters['budget']['data'],
                                        // this.state.POPULAR_BUS_MODELS['data'],
                                        
                                    ]
                                }}
                                Source="HomePage_Popular"
                                footer={config.BASE_HREF + '/buses'}
                                TabName={{ bus: ['Popular Buses', 'School Buses','Electric Buses','Passenger Vans','< 20 Seater', "Under 10 Lakh"] }}
                                // configObj={{'subSource':'Dealer'}}
                               
                                IsAmp={IsAmp}
                            />

                            ) : ('')} */}
                            

                        {/* {this.state.brandArr4 && this.state.isMobile ?(
                            <SearchBy
                            SearchType="Brand"
                            brandsArr2={this.state.brandArr4}
                            Section='bus'
                            Source="HomePage"
                            colClass = "utm-col-xs-4 utm-col-sm-4 utm-col-md-4 utm-col-lg-2"
                            configObj={{'subSource':'Brand'}}
                            IsAmp={IsAmp}
                        />
                        ):('')} */}

                            {/* <SearchBy
                            SearchType = "Category"
                            Section = 'bus'
                            Source="HomePage"
                            carousalClass="flex-center"
                            colClass = "utm-col-xs-4 utm-col-sm-4 utm-col-md-4 utm-col-lg-2"
                            IsAmp={IsAmp}
                            />
                       <RenderAds
                                source="HomePage"
                                section="all"
                                isMobile={this.state.isMobile}
                                pos={0}
                                AdSection={'all'}
                                view="2"
                                IsAmp={IsAmp}
                            /> */}

{/*                             
                       {IsSet(busMakeByCity) ? (
                                <CardWithTabs
                                heading="Bus Dealers in Popular Cities"
                                isMobile={this.state.isMobile}
                                SearchType = "City"
                                section="bus"
                                modelArr={{
                                    bus: [
                                        busMakeByCity['hyderabad'],
                                        busMakeByCity['indore'],
                                        busMakeByCity['patna'],
                                        busMakeByCity['chandigarh'],
                                        busMakeByCity['chennai'],
                                        busMakeByCity['lucknow']
                                    ]
                                }}
                                Source="HomePage"
                                footer={config.BASE_HREF + '/bus-dealers'}
                                TabName={{ bus: ['Hyderabad','Indore', 'Patna','Chandigarh','Chennai','Lucknow'] }}
                                configObj={{'subSource':'Dealer'}}
                                IsAmp={IsAmp}
                            />

                            ) : ('')} */}
                          
                          {/* {IsSet(this.state.POPULAR_LIGHT_VEHICLE_MODELS) ? (
                                  <SimilarCarsCard
                                  IsMobile={this.state.isMobile}
                                  Section="three-wheeler"
                                  SimilarModels={this.state.POPULAR_LIGHT_VEHICLE_MODELS}
                                  Source="HomePage"
                                  showfooter={true}
                                  footerText = "View all Popular 3 Wheelers"
                                  footer="/three-wheeler"
                                  configObj={{'subSource':'Popular'}}
                                  IsAmp = {IsAmp}
                                 
                              />
                            ):('')} */}

{/* {IsSet(this.state.POPULAR_BUS_MODELS) && <Tab
                            TabContentName = 'modelCardWithTabs'
                            TabHeader = {getThreeWheelerModelTab()}
                            ConfigObj = {{"footer":true,'headingText':`New Three Wheelers In India`, "section":"three-wheeler", isMobile:this.props.isMobile, subSource:"Popular", "getWithCards":true, "carcarusalHeight":"360"}}
                            Source="HomePage"
                            modelArr={getThreeWheelerModelsArr()}
                            IsAmp={IsAmp}
                
                        />} */}
                        {/* {IsSet(this.state.POPULAR_LIGHT_VEHICLE_MODELS) ? (
                                <CardWithTabs
                                heading="New Three Wheelers In India"
                                isMobile={this.state.isMobile}
                                SearchType = "Category"
                                section="three-wheeler"
                                modelArr={{
                                    "three-wheeler": [
                                        getThreeWheelerFilters['body_type']["e-rickshaw"],
                                        this.state.POPULAR_LIGHT_VEHICLE_MODELS['data'],
                                        // this.state.POPULAR_LIGHT_VEHICLE_MODELS['data'],
                                        getThreeWheelerFilters["budget"]['data'],
                                        getThreeWheelerFilters["tonnage"]['data'],
                                        getThreeWheelerFilters["power"]['data'],
                                        this.state.POPULAR_LIGHT_VEHICLE_MODELS['data'],
                                        this.state.POPULAR_LIGHT_VEHICLE_MODELS['data']
                                    ]
                                }}
                                Source="HomePage_Popular"
                                footer={config.BASE_HREF + '/three-wheeler'}
                                TabName={{ "three-wheeler": ['Electric 3 Wheelers', 'Popular 3 Wheelers','Under 2 Lakh','Under 2 Ton', "Under 5 HP", "Passenger 3 Wheelers"] }}
                                // configObj={{'subSource':'Dealer'}}
                                IsAmp={IsAmp}
                            />

                            ) : ('')} */}
                        {/* {this.state.brandArr5 && this.state.isMobile ?(
                            <SearchBy
                            SearchType="Brand"
                            brandsArr2={this.state.brandArr5}
                            Section='three-wheeler'
                            Source="HomePage"
                            colClass = "utm-col-xs-4 utm-col-sm-4 utm-col-md-4 utm-col-lg-2"
                            configObj={{'subSource':'Brand'}}
                            IsAmp={IsAmp}
                        />
                        ):('')} */}

                            {/* {IsSet(lightVehicleMakeByCity) ? (
                                <CardWithTabs
                                heading="Three Wheeler Dealers in Popular Cities"
                                isMobile={this.state.isMobile}
                                SearchType = "City"
                                section="three-wheeler"
                                modelArr={{
                                    'three-wheeler': [
                                        lightVehicleMakeByCity['hyderabad'],
                                        lightVehicleMakeByCity['indore'],
                                        lightVehicleMakeByCity['patna'],
                                        lightVehicleMakeByCity['chandigarh'],
                                        lightVehicleMakeByCity['chennai'],
                                        lightVehicleMakeByCity['lucknow']
                                    ]
                                }}
                                Source="HomePage"
                                footer={config.BASE_HREF + '/three-wheeler-dealers'}
                                TabName={{ 'three-wheeler': ['Hyderabad','Indore', 'Patna','Chandigarh','Chennai','Lucknow'] }}
                                configObj={{'subSource':'Dealer'}}
                                IsAmp={IsAmp}
                            />

                            ) : ('')} */}
                            
                         

                            {(IsSet(this.state.brandArr2) || IsSet(this.state.brandArr3) || IsSet(this.state.brandArr4) || IsSet(this.state.brandArr5)) && (this.state.isMobile) && <Tab
                            TabContentName = 'BrandCardWithTabs'
                            TabHeader = {getBrandsTab()}
                            ConfigObj = {{"footer":false,'headingText':`Search By Brands`, "section":this.state.section, isMobile:this.props.isMobile, subSource:"Brands", "getWithCards":true, "carcarusalHeight":"360"}}
                            Source="HomePage"
                            modelArr={getBrandsArr()}
                            IsAmp={IsAmp}
                
                        />}


                    {(IsSet(NEWS_CATEGORY_TRACTOR.posts) || IsSet(NEWS_CATEGORY_TRUCK.posts) || IsSet(NEWS_CATEGORY_BUS.posts)) && <Tab
                        TabContentName = 'NewsCardWithTabs'
                        TabHeader = {getNewsTab()}
                        ConfigObj = {{'headingText':`Latest news`, "section":this.state.section, isMobile:this.props.isMobile, subSource:"News", "getWithCards":true, "carcarusalHeight":"360"}}
                        Source="HomePage"
                        modelArr={getNEwsArr()}
                        IsAmp={IsAmp}
              
                    />}
                              {/* {NEWS_CATEGORY_TRACTOR ? (  
                            <ModelRelatedNews
                                Category="news"
                                modelDisplayName={'Tractor'}
                                modelNews={NEWS_CATEGORY_TRACTOR.posts}
                                Source="HomePage"
                                footer={config.BASE_HREF + '/news/tractor-news'}
                                // modelSlug={this.state.ModelSlug}
                                // makeSlug={this.state.MakeSlug}
                                isMobile={isMobile}
                                section="news"
                                IsAmp={IsAmp}
                                configObj={{'subSource':'News'}}
                            />) : ('')}

                              {NEWS_CATEGORY_TRUCK ? (  
                            <ModelRelatedNews
                                Category="news"
                                modelDisplayName={'Truck'}
                                modelNews={NEWS_CATEGORY_TRUCK.posts}
                                Source="HomePage"
                                footer={config.BASE_HREF + '/news/truck-news'}
                                // modelSlug={this.state.ModelSlug}
                                // makeSlug={this.state.MakeSlug}
                                isMobile={isMobile}
                                section="news"
                                IsAmp={IsAmp}
                                configObj={{'subSource':'News'}}
                            />) : ('')}

                        {NEWS_CATEGORY_BUS ? (  
                            <ModelRelatedNews
                                Category="news"
                                modelDisplayName={'Bus'}
                                modelNews={NEWS_CATEGORY_BUS.posts}
                                Source="HomePage"
                                footer={config.BASE_HREF + '/news/bus-news'}
                                // modelSlug={this.state.ModelSlug}
                                // makeSlug={this.state.MakeSlug}
                                isMobile={isMobile}
                                section="news"
                                IsAmp={IsAmp}
                                configObj={{'subSource':'News'}}
                            />) : ('')} */}



                        </div>
                        {!this.state.isMobile ?(
                        <div className="utm-col-xs-12 utm-col-sm-12 utm-col-md-3 utm-col-lg-3 resultbox">
                        {/* {this.state.brandArr3 ?(
                            <SearchBy
                            SearchType="Brand"
                            brandsArr2={this.state.brandArr3}
                            Section='truck'
                            Source="HomePage"
                            colClass = "utm-col-xs-4 utm-col-sm-4 utm-col-md-4 utm-col-lg-6"
                            configObj={{'subSource':'Brand'}}
                            IsAmp={IsAmp}
                        />
                        ):('')} */}
                        {this.state.brandArr2  ?(
                            <SearchBy
                            SearchType="Brand"
                            brandsArr2={this.state.brandArr2}
                            Section='tractor'
                            Source="HomePage"
                            colClass = "utm-col-xs-4 utm-col-sm-4 utm-col-md-4 utm-col-lg-6"
                            configObj={{'subSource':'Brand'}}
                            IsAmp={IsAmp}
                        />
                        ):('')}
{/*                     
                        {this.state.brandArr4 ?(
                            <SearchBy
                            SearchType="Brand"
                            brandsArr2={this.state.brandArr4}
                            Section='bus'
                            Source="HomePage"
                            colClass = "utm-col-xs-4 utm-col-sm-4 utm-col-md-4 utm-col-lg-6"
                            configObj={{'subSource':'Brand'}}
                            IsAmp={IsAmp}
                        />
                        ):('')} */}

                        {/* {this.state.brandArr5 ?(
                            <SearchBy
                            SearchType="Brand"
                            brandsArr2={this.state.brandArr5}
                            Section='three-wheeler'
                            Source="HomePage"
                            colClass = "utm-col-xs-4 utm-col-sm-4 utm-col-md-4 utm-col-lg-6"
                            configObj={{'subSource':'Brand'}}
                            IsAmp={IsAmp}
                        />
                        ):('')} */}

                                {/* <RenderAds
                                source="HomePage"
                                section="all"
                                isMobile={this.state.isMobile}
                                pos={1}
                                AdSection={'all'}
                                view="2"
                                IsAmp={IsAmp}
                            /> */}
                             <RenderAds
                                source="HomePage"
                                section="all"
                                isMobile={this.state.isMobile}
                                pos={2}
                                AdSection={'all'}
                                view="2"
                                IsAmp={IsAmp}
                                OthersClass={"customsticky"}
                            />
                        </div>

                        ):('')}
                        
                     
                    </div>
                </div>
            </>
        );
    }
}

export default HomePage;
