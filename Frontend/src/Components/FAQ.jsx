import Faq from "react-faq-component";
import "./faq.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";


export default function FAQ(){
    const Electronicsportal = <span>Electronics</span>;
    const navigate = useNavigate()

    useEffect(() => {
        document.getElementById("electronics-link").addEventListener("click", () => {
        navigate('/electronics')})});

    useEffect(() => {
        document.getElementById("sell-item-link").addEventListener("click", () => {
        navigate('/sell-item')})});

    useEffect(() => {
        document.getElementById("repair-link").addEventListener("click", () => {
        navigate('/repair')})});

        useEffect(() => {
            document.getElementById("support-link").addEventListener("click", () => {
            navigate('/support')})});



    const data = {
        title: "Frequently asked questions",
        rows: [
            {
                title: "What is the purpose of the app?",
                content: "The purpose of the app is to help people find a good local shop to buy and sell their items. It is also to allow user to be able to send their old electronics for repair and trade them in if not needed, allowing users to give value to their unwanted electronics."
            },
            {
                title: "Who can sign up?",
                content: `Anyone can. This website is catered towards average customers but also people who own tech businesses. Anyone can be create a customer account.`
            },
            {
                title: "How do I sign up?",
                content: "To sign up, click on the sign up button on the top right hand corner of the page. You will then be taken to a page where you can enter your details. Once you have entered your details, click on the sign up button. From then on you will have an account registered with us and will be able to log in by clicking the 'Login' button and entering your login details."
            },
            {
                title: "How do I view the electronics page?",
                content: `To view the <a class="extrnal-link" id="electronics-link" click={ElectronicsportalClick}>Electronics page</a>, either click on the menu tab on the left hand of the page and click on All items or to view a specific item, simply search the name using the search engine`
            },
            {
                title: "How do I list my items  for sale?",
                content: `To view the <a class="extrnal-link" id="sell-item-link" click={ElectronicsportalClick}>Sell Items page</a>,
                 click on the menu tab on the left hand of the page and click on sell items. Now you will sent to a page from which your items, can be listed for sale. 
                 Disclamer this process will only work if you have a seller account. If you are still confused about the process
                 <a href="#sell-items-help" class="internal-link" id="sell-items-help-link">click here</a>.`
            },
            {
                title: "How do I list my items for repairs?",
                content: `To view the <a class="extrnal-link" id="repair-link" click={ElectronicsportalClick}>Repairs page</a>,
                 click on the menu tab on the left hand of the page and click on Repair. Now you will sent to a page from which your items,
                 can be listed as needing along with your contact details and th issue description. 
                 Disclamer this process will only work if you have a seller account. If you are still confused about the process
                 <a href="#sell-items-help" class="internal-link" id="repair-items-help-link">click here</a>.`
            },
            {
                title: "I need extra support and have a pressing issue.",
                content: `To view the <a class="extrnal-link" id="support-link" click={ElectronicsportalClick}>Support page</a>,
                 click on the menu tab on the left hand of the page and click on support.
                  From there you can enter your name and email and subit a message for our customer support.`
            },
            {
                title: 'Sell Items Help',
                content: `<span id="sell-items-help"></span>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Voluptates rem molestias ipsum nulla libero optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quidem obcaecati distinctio aliquam alias, fugit facere cupiditate dolor deserunt veniam dolorem ex vel dolores explicabo tempora placeat sapiente. Illo, error?.`
            },
            {
                title: 'Repair Items Help',
                content: `<span id="repair-items-help"></span>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Voluptates rem molestias ipsum nulla libero optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quidem obcaecati distinctio aliquam alias, fugit facere cupiditate dolor deserunt veniam dolorem ex vel dolores explicabo tempora placeat sapiente. Illo, error?.`
            }
        ]
    }

    const styles = {
        titleTextColor: 'blue',
        rowTitleColor: 'darkblue'
    }

    const config = {
        animate: true,
        arrowIcon: <span className="faq-icon">V</span>,
        tabFocus: true
    }

    return (
        <div>
            <Helmet>
                <title>Greengadget | FAQ</title>
                <meta name="description" content="Find answers to frequently asked questions. 
                Get the information you need to make your shopping experience smooth and enjoyable."/> 
            </Helmet>
            <Faq data={data} styles={styles} config={config} />
        </div>
    )
}