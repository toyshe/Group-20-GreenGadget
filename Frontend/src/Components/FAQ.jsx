import Faq from "react-faq-component";

export default function FAQ(){

    const data = {
        title: "Frequently asked questions",
        rows: [
            {
                title: "What is the purpose of the app?",
                content: "The purpose of the app is to help people find a good local shop to buy and sell their items. It is also to allow user to be able to send their old electronics for repair and trade them in if not needed"
            },
            {
                title: "Who can sign up?",
                content: "Anyone can. This website is catered towards average customers but also people who own tech businesses"
            },
            {
                title: "How do I sign up?",
                content: "To sign up, click on the sign up button on the top right hand corner of the page. You will then be taken to a page where you can enter your details. Once you have entered your details, click on the sign up button"
            },
            {
                title: "How do I view the electronics page?",
                content: "To view the electronics page, either click on the menu tab on the left hand of the page and click on All items or to view a specific item, simply search the name using the search engine"
            }
        ]
    }

    const styles = {
        titleTextColor: 'blue',
        rowTitleColor: 'blue'
    }

    const config = {
        animate: true,
        arrowIcon: 'V',
        tabFocus: true
    }

    return (
        <div>
            <Faq data={data} styles={styles} config={config} />
        </div>
    )
}